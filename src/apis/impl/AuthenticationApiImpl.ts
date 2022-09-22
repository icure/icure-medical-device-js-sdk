import {AuthenticationProcess} from "../../models/AuthenticationProcess";
import {AuthenticationResult} from "../../models/AuthenticationResult";
import {AuthenticationApi} from "../AuthenticationApi";
import {v4 as uuid} from 'uuid';
import {Device, HealthcareParty, Patient, retry, User} from "@icure/api";
import {medTechApi, MedTechApi} from "../medTechApi";
import {MessageGatewayApi} from "../MessageGatewayApi";
import {Notification, NotificationTypeEnum} from "../../models/Notification";
import {Sanitizer} from "../../services/Sanitizer";
import {ErrorHandler} from "../../services/ErrorHandler";

class ApiInitialisationResult {
  constructor(user: User, token: string, keyPair?: [string, string]) {
    this.user = user;
    this.token = token;
    this.keyPair = keyPair;
  }

  user: User
  token: string
  keyPair?: [string, string]
}

export class AuthenticationApiImpl implements AuthenticationApi {

  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  private readonly iCureBasePath: string;
  private readonly msgGtwUrl: string;
  private readonly authProcessId: string;
  private readonly msgGtwSpecId: string;
  private readonly messageGatewayApi: MessageGatewayApi;
  private readonly errorHandler: ErrorHandler;
  private readonly sanitizer: Sanitizer

  constructor(
    messageGatewayApi: MessageGatewayApi,
    iCureBasePath: string,
    msgGtwUrl: string,
    msgGtwSpecId: string,
    authProcessId: string,
    errorHandler: ErrorHandler,
    sanitizer: Sanitizer,
    fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
      ? window.fetch
      : typeof self !== 'undefined'
        ? self.fetch
        : fetch,
  ) {
    this.iCureBasePath = iCureBasePath;
    this.msgGtwUrl = msgGtwUrl;
    this.msgGtwSpecId = msgGtwSpecId;
    this.authProcessId = authProcessId;
    this.fetchImpl = fetchImpl;
    this.messageGatewayApi = messageGatewayApi;
    this.errorHandler = errorHandler;
    this.sanitizer = sanitizer
  }

  async startAuthentication(healthcareProfessionalId: string | undefined, firstName: string, lastName: string, recaptcha: string, bypassTokenCheck: boolean = false, email?: string, mobilePhone?: string): Promise<AuthenticationProcess | null> {

    if (!email && !mobilePhone) {
      throw this.errorHandler.createErrorWithMessage(`In order to start authentication of a user, you should at least provide its email OR its mobilePhone`)
    }

    if (!!mobilePhone && !!this.sanitizer.validateMobilePhone(mobilePhone)) {
      throw this.errorHandler.createErrorWithMessage(`Invalid mobile phone number provided`)
    }

    if (!!email && !!this.sanitizer.validateEmail(email)) {
      throw this.errorHandler.createErrorWithMessage(`Invalid email provided`)
    }

    const requestId = await this.messageGatewayApi.startProcess(
      this.authProcessId,
      {
        'g-recaptcha-response': recaptcha,
        'firstName': firstName,
        'lastName': lastName,
        'from': email ?? mobilePhone,
        'email': email,
        'mobilePhone': mobilePhone,
        'hcpId': healthcareProfessionalId
      }
    );

    if (!!requestId) {
      return new AuthenticationProcess({requestId, login: (email ?? mobilePhone)!, bypassTokenCheck: bypassTokenCheck});
    }

    throw this.errorHandler.createErrorWithMessage(`Could not start authentication process for user ${email ?? mobilePhone}`)
  }

  async completeAuthentication(process: AuthenticationProcess, validationCode: string, dataOwnerKeyPair: [string, string] | undefined, tokenAndKeyPairProvider: (groupId: string, userId: string) => ([string, [string, string]] | undefined)): Promise<AuthenticationResult | null> {
    const result = await this.messageGatewayApi.validateProcess(process.requestId, validationCode)
      .catch((e) => {
        if (process.bypassTokenCheck) {
          return true
        }
        throw e
      })

    if (result) {
      const [api, apiInitialisationResult]: [MedTechApi, ApiInitialisationResult] = await retry(
        () => this.initApiAndUserAuthenticationToken(process.login, validationCode, tokenAndKeyPairProvider)
      )

      const dataOwnerInitialisedKeyPair = apiInitialisationResult.keyPair ?? dataOwnerKeyPair;
      if (!dataOwnerInitialisedKeyPair) {
        throw this.errorHandler.createErrorWithMessage(`A keypair must be provided either directly or through the provider`)
      }
      const authenticatedApi: MedTechApi = await this.initUserCrypto(api, apiInitialisationResult.token, apiInitialisationResult.user, dataOwnerInitialisedKeyPair);

      return new AuthenticationResult({
        medTechApi: authenticatedApi,
        keyPair: dataOwnerInitialisedKeyPair,
        token: apiInitialisationResult.token,
        groupId: apiInitialisationResult.user.groupId!,
        userId: apiInitialisationResult.user.id
      });
    }

    throw this.errorHandler.createErrorWithMessage(`Could not complete authentication process for user ${process.login}`)
  }

  async authenticateAndAskAccessToItsExistingData(userLogin: string, shortLivedToken: string, dataOwnerKeyPair: [string, string] | undefined, tokenAndKeyPairProvider: (groupId: string, userId: string) => ([string, [string, string]] | undefined)): Promise<AuthenticationResult | null> {
    const authenticationResult = await this.initUserTokenAndCrypto(userLogin, shortLivedToken, dataOwnerKeyPair, tokenAndKeyPairProvider);

    const loggedUser = await authenticationResult.medTechApi.userApi.getLoggedUser();
    if (!loggedUser) {
      throw this.errorHandler.createErrorWithMessage(`Could not retrieve logged user`)

    } else if (!!loggedUser.patientId) {
      const patientDataOwner = await authenticationResult.medTechApi.patientApi.getPatient(loggedUser.patientId);
      if (!patientDataOwner) throw this.errorHandler.createErrorWithMessage(`Patient with id ${loggedUser.patientId} does not exist`);

      const delegates = Object.entries(patientDataOwner.systemMetaData?.delegations ?? {})
        .map( (keyValue) => Array.from(keyValue[1]))
        .flat()
        .filter((delegation) => !!delegation.delegatedTo)
        .filter((delegation) => delegation.delegatedTo != patientDataOwner.id!)
        .map( (delegation) => delegation.delegatedTo!)

      for (const delegate of delegates) {
        const accessNotification = await authenticationResult.medTechApi.notificationApi.createOrModifyNotification(
          new Notification({
            id: uuid(),
            status: "pending",
            author: loggedUser.id,
            responsible: loggedUser.patientId,
            type: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS
          }),
          delegate
        );
        //TODO Return which delegates were warned to share back info & add retry mechanism
        if (!accessNotification) throw this.errorHandler.createErrorWithMessage(`Cannot create a notification to Healthcare Professional with id ${delegate}`)
      }

    } else if (!!loggedUser.healthcarePartyId) {
      const hcpDataOwner = await authenticationResult.medTechApi.healthcareProfessionalApi.getHealthcareProfessional(loggedUser.healthcarePartyId);
      if (!hcpDataOwner) throw this.errorHandler.createErrorWithMessage(`Healthcare Professional with id ${loggedUser.healthcarePartyId} does not exist`);

    } else if (!!loggedUser.deviceId) {
      const hcpDataOwner = await authenticationResult.medTechApi.medicalDeviceApi.getMedicalDevice(loggedUser.deviceId);
      if (!hcpDataOwner) throw this.errorHandler.createErrorWithMessage(`Medical Device with id ${loggedUser.deviceId} does not exist`);

    } else {
      throw this.errorHandler.createErrorWithMessage(`User with id ${loggedUser.id} is not Data Owner (either a patient, a healthcare professional or a medical device)`)
    }

    return authenticationResult;
  }

  async initUserTokenAndCrypto(login: string, token: string, dataOwnerKeyPair: [string, string] | undefined, tokenAndKeyPairProvider: (groupId: string, userId: string) => ([string, [string, string]] | undefined)): Promise<AuthenticationResult> {
    const [api, apiInitialisationResult]: [MedTechApi, ApiInitialisationResult] = await retry(
      () => this.initApiAndUserAuthenticationToken(login, token, tokenAndKeyPairProvider)
    )

    const dataOwnerInitialisedKeyPair = apiInitialisationResult.keyPair ?? dataOwnerKeyPair;
    if (!dataOwnerInitialisedKeyPair) {
      throw this.errorHandler.createErrorWithMessage('A keypair must be provided either directly or through the provider')
    }
    const authenticatedApi: MedTechApi = await this.initUserCrypto(api, apiInitialisationResult.token, apiInitialisationResult.user, dataOwnerInitialisedKeyPair);

    return new AuthenticationResult({
      medTechApi: authenticatedApi,
      keyPair: dataOwnerInitialisedKeyPair,
      token: apiInitialisationResult.token,
      groupId: apiInitialisationResult.user.groupId!,
      userId: apiInitialisationResult.user.id
    });
  }

  async initApiAndUserAuthenticationToken(login: string, validationCode: string, tokenAndKeyPairProvider: (groupId: string, userId: string) => ([string, [string, string]] | undefined)): Promise<[MedTechApi, ApiInitialisationResult]> {
    const api = await medTechApi()
      .withICureBasePath(this.iCureBasePath)
      .withUserName(login)
      .withPassword(validationCode)
      .withMsgGtwUrl(this.msgGtwUrl)
      .withMsgGtwSpecId(this.msgGtwSpecId)
      .withAuthProcessId(this.authProcessId)
      .withCrypto(require('crypto').webcrypto)
      .build();

    try {
      const user = await api.baseApi.userApi.getCurrentUser();
      if (user == null) {
        throw this.errorHandler.createErrorWithMessage(`Your validation code ${validationCode} is expired - Couldn't login new user`);
      }

      const [providedToken, keyPair] = tokenAndKeyPairProvider(user.groupId!, user.id!) ?? [undefined, undefined];

      const token = providedToken ?? await api.userApi.createToken(user.id!, 3600 * 24 * 365 * 10);
      if (token == null) {
        throw this.errorHandler.createErrorWithMessage(`Your validation code ${validationCode} is expired - Couldn't create new secured token`);
      }

      return [api, new ApiInitialisationResult(user, token, keyPair)];
    } catch (e) {
      throw e
    }
  }

  async initUserCrypto(api: MedTechApi, token: string, user: User, patientKeyPair: [string, string]): Promise<MedTechApi> {
    const dataOwnerId = user.healthcarePartyId ?? user.patientId ?? user.deviceId;
    if (!dataOwnerId) {
      throw this.errorHandler.createErrorWithMessage("Invalid user, no data owner id")
    }

    const authenticatedApi = await medTechApi(api)
      .withPassword(token)
      .build();

    await authenticatedApi.addKeyPair(dataOwnerId, {privateKey: patientKeyPair[0], publicKey: patientKeyPair[1]})

    const dataOwner = await authenticatedApi.baseApi.cryptoApi.getDataOwner(dataOwnerId);
    if (dataOwner == null) {
      throw this.errorHandler.createErrorWithMessage("Your user is not a data owner");
    }

    if (dataOwner.dataOwner.publicKey == undefined) {
      await this.updateUserToAddNewlyCreatedPublicKey(dataOwner.type, dataOwner.dataOwner, patientKeyPair, authenticatedApi, user);
    } else if (dataOwner.dataOwner.publicKey != patientKeyPair[1]) {
      //TODO User lost his key
    }

    return authenticatedApi;
  }

  private async updateUserToAddNewlyCreatedPublicKey(dataOwnerType: string, dataOwner: Patient | Device | HealthcareParty, patientKeyPair: [string, string], authenticatedApi: MedTechApi, user: User) {
    dataOwner.publicKey = patientKeyPair[1];

    if (dataOwnerType === 'patient') {
      await authenticatedApi.baseApi.patientApi.modifyPatientRaw(dataOwner)
    } else if (dataOwnerType === 'hcp') {
      await authenticatedApi.baseApi.healthcarePartyApi.modifyHealthcareParty(dataOwner)
    } else if (dataOwnerType === 'device') {
      await authenticatedApi.baseApi.deviceApi.updateDevice(dataOwner)
    } else {
      console.log(`Could not update user ${dataOwner.id} because it is not a data owner (and so, is not authorized to access protected data)`);
    }

    authenticatedApi.baseApi.cryptoApi.emptyHcpCache(dataOwner.id!)

    if (user.patientId != null) {
      await this.initPatientDelegationsAndSave(authenticatedApi, user);
    }
  }

  async initPatientDelegationsAndSave(apiWithNewKeyPair: MedTechApi, user: User) {
    const patientToUpdate = await apiWithNewKeyPair.baseApi.patientApi.getPatientRaw(user.patientId!)
      .then((patient) => apiWithNewKeyPair.baseApi.patientApi.initDelegations(patient, user))
      .then(async (patientWithDelegations) => {
        const currentPatient = await apiWithNewKeyPair.baseApi.patientApi.getPatientRaw(user.patientId!)
        return new Patient({...currentPatient, delegations: Object.assign(patientWithDelegations.delegations ?? {}, currentPatient.delegations)});
      })
      .then((patientWithDelegations) => apiWithNewKeyPair.baseApi.patientApi.initEncryptionKeys(user, patientWithDelegations))

    await apiWithNewKeyPair.baseApi.patientApi.modifyPatientWithUser(user, patientToUpdate)
    apiWithNewKeyPair.baseApi.cryptoApi.emptyHcpCache(patientToUpdate.id!)
  }
}

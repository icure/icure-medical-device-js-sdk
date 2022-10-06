import {AuthenticationProcess} from "../../models/AuthenticationProcess";
import {AuthenticationResult} from "../../models/AuthenticationResult";
import {AuthenticationApi} from "../AuthenticationApi";
import {v4 as uuid} from 'uuid';
import {medTechApi, MedTechApi} from "../medTechApi";
import {MessageGatewayApi} from "../MessageGatewayApi";
import {Notification, NotificationTypeEnum} from "../../models/Notification";
import {Sanitizer} from "../../services/Sanitizer";
import {ErrorHandler} from "../../services/ErrorHandler";
import {retry} from "@icure/api";
import {User} from "../../models/User";

class ApiInitialisationResult {
  constructor(user: User, token: string, keyPair?: [string, string]) {
    this.user = user
    this.token = token
    this.keyPair = keyPair
  }

  user: User
  token: string
  keyPair?: [string, string]
}

export class AuthenticationApiImpl implements AuthenticationApi {

  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  private readonly iCureBasePath: string;
  private readonly authProcessByEmailId: string
  private readonly authProcessBySmsId: string
  private readonly messageGatewayApi: MessageGatewayApi
  private readonly errorHandler: ErrorHandler;
  private readonly sanitizer: Sanitizer

  constructor(
    messageGatewayApi: MessageGatewayApi,
    iCureBasePath: string,
    authProcessByEmailId: string,
    authProcessBySmsId: string,
    errorHandler: ErrorHandler,
    sanitizer: Sanitizer,
    fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
      ? window.fetch
      : typeof self !== 'undefined'
      ? self.fetch
      : fetch,
  ) {
    this.iCureBasePath = iCureBasePath;
    this.messageGatewayApi = messageGatewayApi
    this.authProcessByEmailId = authProcessByEmailId
    this.authProcessBySmsId = authProcessBySmsId
    this.fetchImpl = fetchImpl;
    this.messageGatewayApi = messageGatewayApi;
    this.errorHandler = errorHandler;
    this.sanitizer = sanitizer
  }

  async startAuthentication(
    healthcareProfessionalId: string | undefined,
    firstName: string,
    lastName: string,
    recaptcha: string,
    bypassTokenCheck: boolean = false,
    email?: string,
    mobilePhone?: string
  ): Promise<AuthenticationProcess | null> {
    if (!email && !mobilePhone) {
      throw this.errorHandler.createErrorWithMessage(`In order to start authentication of a user, you should at least provide its email OR its mobilePhone`)
    }

    const processId = email != undefined ? this.authProcessByEmailId : this.authProcessBySmsId

    const requestId = await this.messageGatewayApi.startProcess(processId, {
      'g-recaptcha-response': recaptcha,
      firstName: firstName,
      lastName: lastName,
      from: email != undefined ? this.sanitizer.validateEmail(email) : this.sanitizer.validateMobilePhone(mobilePhone!),
      email: email,
      mobilePhone: mobilePhone,
      hcpId: healthcareProfessionalId,
    })

    if (!!requestId) {
      return new AuthenticationProcess({ requestId, login: (email ?? mobilePhone)!, bypassTokenCheck: bypassTokenCheck })
    }

    throw this.errorHandler.createErrorWithMessage(`iCure could not start the authentication process ${processId} for user ${email ?? mobilePhone}. Try again later`)
  }

  async completeAuthentication(
    process: AuthenticationProcess,
    validationCode: string,
    dataOwnerKeyPair: [string, string] | undefined,
    tokenAndKeyPairProvider: (groupId: string, userId: string) => [string, [string, string]] | undefined
  ): Promise<AuthenticationResult | null> {
    const result = await this.messageGatewayApi.validateProcess(process.requestId, validationCode).catch((e) => {
      if (process.bypassTokenCheck) {
        return true
      }
      throw e
    })

    if (result) {
      const [api, apiInitialisationResult]: [MedTechApi, ApiInitialisationResult] = await retry(() =>
        this.initApiAndUserAuthenticationToken(process.login, validationCode, tokenAndKeyPairProvider)
      )

      const dataOwnerInitialisedKeyPair = apiInitialisationResult.keyPair ?? dataOwnerKeyPair
      if (!dataOwnerInitialisedKeyPair) {
        throw this.errorHandler.createErrorWithMessage(`A keypair must be provided either directly or through the provider`)
      }

      const authenticatedApi: MedTechApi = await this._initUserCryptoAndAddItToApi(api, apiInitialisationResult.token, dataOwnerInitialisedKeyPair)

      return new AuthenticationResult({
        medTechApi: authenticatedApi,
        keyPair: dataOwnerInitialisedKeyPair,
        token: apiInitialisationResult.token,
        groupId: apiInitialisationResult.user.groupId!,
        userId: apiInitialisationResult.user.id,
      })
    }

    throw this.errorHandler.createErrorWithMessage(`iCure could not complete authentication process with requestId ${process.requestId}`)
  }

  async authenticateAndAskAccessToItsExistingData(
    userLogin: string,
    shortLivedToken: string,
    dataOwnerKeyPair: [string, string] | undefined,
    tokenAndKeyPairProvider: (groupId: string, userId: string) => [string, [string, string]] | undefined
  ): Promise<AuthenticationResult | null> {
    const authenticationResult = await this.initUserTokenAndCrypto(userLogin, shortLivedToken, dataOwnerKeyPair, tokenAndKeyPairProvider)

    const loggedUser = await authenticationResult.medTechApi.userApi.getLoggedUser()
    if (!loggedUser) {
      throw this.errorHandler.createErrorWithMessage(`Impossible to log the new user and find their information. Try again to authenticate them`)

    } else if (!!loggedUser.patientId) {
      const patientDataOwner = await authenticationResult.medTechApi.patientApi.getPatient(loggedUser.patientId)
      if (!patientDataOwner) throw this.errorHandler.createErrorWithMessage(`Impossible to find the patient ${loggedUser.patientId} apparently linked to the user ${loggedUser.id}. Are you sure this patientId is correct ?`)

      const delegates = Object.entries(patientDataOwner.systemMetaData?.delegations ?? {})
        .map((keyValue) => Array.from(keyValue[1]))
        .flat()
        .filter((delegation) => !!delegation.delegatedTo)
        .filter((delegation) => delegation.delegatedTo != patientDataOwner.id!)
        .map((delegation) => delegation.delegatedTo!)

      for (const delegate of delegates) {
        const accessNotification = await authenticationResult.medTechApi.notificationApi.createOrModifyNotification(
          new Notification({
            id: uuid(),
            status: 'pending',
            author: loggedUser.id,
            responsible: loggedUser.patientId,
            type: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS,
          }),
          delegate
        )
        //TODO Return which delegates were warned to share back info & add retry mechanism
        if (!accessNotification) console.error(`iCure could not create a notification to healthcare party ${delegate} to ask access back to ${loggedUser.patientId} data. Make sure to create a notification for the healthcare party so that he gives back access to ${loggedUser.patientId} data.`)
      }
    } else if (!!loggedUser.healthcarePartyId) {
      const hcpDataOwner = await authenticationResult.medTechApi.healthcareProfessionalApi.getHealthcareProfessional(loggedUser.healthcarePartyId).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
      if (!hcpDataOwner) throw this.errorHandler.createErrorWithMessage(`Impossible to find the healthcare party ${loggedUser.healthcarePartyId} apparently linked to user ${loggedUser.id}. Are you sure this healthcarePartyId is correct ?`)
    } else if (!!loggedUser.deviceId) {
      const hcpDataOwner = await authenticationResult.medTechApi.medicalDeviceApi.getMedicalDevice(loggedUser.deviceId).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
      if (!hcpDataOwner) throw this.errorHandler.createErrorWithMessage(`Impossible to find the device ${loggedUser.deviceId} apparently linked to the user ${loggedUser.id}. Are you sure this deviceId is correct ?`)
    } else {
      throw this.errorHandler.createErrorWithMessage(`User with id ${loggedUser.id} is not a Data Owner. To be a Data Owner, your user needs to have either patientId, healthcarePartyId or deviceId filled in`)
    }

    return authenticationResult
  }

  async initUserTokenAndCrypto(
    login: string,
    token: string,
    dataOwnerKeyPair: [string, string] | undefined,
    tokenAndKeyPairProvider: (groupId: string, userId: string) => [string, [string, string]] | undefined
  ): Promise<AuthenticationResult> {
    const [api, apiInitialisationResult]: [MedTechApi, ApiInitialisationResult] = await retry(() =>
      this.initApiAndUserAuthenticationToken(login, token, tokenAndKeyPairProvider)
    )

    const dataOwnerInitialisedKeyPair = apiInitialisationResult.keyPair ?? dataOwnerKeyPair
    if (!dataOwnerInitialisedKeyPair) {
      throw this.errorHandler.createErrorWithMessage('A keypair must be provided either directly or through the provider')
    }
    const authenticatedApi: MedTechApi = await this._initUserCryptoAndAddItToApi(api, apiInitialisationResult.token, dataOwnerInitialisedKeyPair)

    return new AuthenticationResult({
      medTechApi: authenticatedApi,
      keyPair: dataOwnerInitialisedKeyPair,
      token: apiInitialisationResult.token,
      groupId: apiInitialisationResult.user.groupId!,
      userId: apiInitialisationResult.user.id,
    })
  }

  async initApiAndUserAuthenticationToken(
    login: string,
    validationCode: string,
    tokenAndKeyPairProvider: (groupId: string, userId: string) => [string, [string, string]] | undefined
  ): Promise<[MedTechApi, ApiInitialisationResult]> {
    const api = await medTechApi()
      .withICureBasePath(this.iCureBasePath)
      .withUserName(login)
      .withPassword(validationCode)
      .withCrypto(require('crypto').webcrypto)
      .build()

    try {
      const user = await api.userApi.getLoggedUser()
      if (user == null) {
        throw this.errorHandler.createErrorWithMessage(`Your validation code ${validationCode} expired. Start a new authentication process for your user`)
      }

      const [providedToken, keyPair] = tokenAndKeyPairProvider(user.groupId!, user.id!) ?? [undefined, undefined]

      const token = providedToken ?? (await api.userApi.createToken(user.id!, 3600 * 24 * 365 * 10))
      if (token == null) {
        throw this.errorHandler.createErrorWithMessage(`Your validation code ${validationCode} expired. Start a new authentication process for your user`)
      }

      return [api, new ApiInitialisationResult(user, token, keyPair)]
    } catch (e) {
      throw e
    }
  }

  private async _initUserCryptoAndAddItToApi(api: MedTechApi, token: string, dataOwnerKeyPair: [string, string]): Promise<MedTechApi> {
    const authenticatedApi = await medTechApi(api).withPassword(token).build()

    await authenticatedApi.initUserCrypto(true, { privateKey: dataOwnerKeyPair[0], publicKey: dataOwnerKeyPair[1] })
    return authenticatedApi
  }
}

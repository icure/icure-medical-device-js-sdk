import {AuthenticationProcess} from "../../models/AuthenticationProcess";
import {AuthenticationResult} from "../../models/AuthenticationResult";
import {AuthenticationApi} from "../AuthenticationApi";
import {v4 as uuid} from 'uuid';
import {Patient, retry, User, XHR} from "@icure/api";
import {medTechApi, MedTechApi} from "../medTechApi";
import Header = XHR.Header;

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
  constructor(iCureBasePath: string, authServerUrl: string, authProcessId: string,
              fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
                ? window.fetch
                : typeof self !== 'undefined'
                  ? self.fetch
                  : fetch
  ) {
    this.iCureBasePath = iCureBasePath;
    this.authServerUrl = authServerUrl;
    this.authProcessId = authProcessId;
    this.fetchImpl = fetchImpl;
  }


  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  private readonly iCureBasePath: string;
  private readonly authServerUrl: string;
  private readonly authProcessId: string;

  async startAuthentication(healthcareProfessionalId: string | undefined, firstName: string, lastName: string, email: string, recaptcha: string, mobilePhone?: string): Promise<AuthenticationProcess | null> {
    const requestId = uuid()

    const res = await XHR.sendCommand('POST',
      `${this.authServerUrl}/process/${this.authProcessId}/${requestId}`,
      [new Header('Content-type', 'application/json')],
      {
        'g-recaptcha-response': recaptcha,
        'firstName': firstName,
        'lastName': lastName,
        'from': email,
        'mobilePhone': mobilePhone,
        'hcpId': healthcareProfessionalId
      },
      this.fetchImpl,
      "text/plain")

    if (res.statusCode < 400) {
      return new AuthenticationProcess({requestId, login: email});
    }

    return null;
  }

  async completeAuthentication(process: AuthenticationProcess, validationCode: string, dataOwnerKeyPair: [string, string] | undefined, tokenAndKeyPairProvider: (groupId: string, userId: string) => ([string, [string, string]] | undefined)): Promise<AuthenticationResult | null> {
    const res = await XHR.sendCommand('GET',
      `${this.authServerUrl}/process/validate/${process.requestId}-${validationCode}`,
      [],
      undefined,
      this.fetchImpl)

    if (res.statusCode < 400) {
      const [api, apiInitialisationResult]: [MedTechApi, ApiInitialisationResult] = await retry(
        () => this.initApiAndUserAuthenticationToken(process, validationCode, tokenAndKeyPairProvider)
      )

      const dataOwnerInitialisedKeyPair = apiInitialisationResult.keyPair ?? dataOwnerKeyPair;
      if (!dataOwnerInitialisedKeyPair) {
        throw Error('A keypair must be provided either directly or through the provider')
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

    return null
  }

  async initApiAndUserAuthenticationToken(process: AuthenticationProcess, validationCode: string, tokenAndKeyPairProvider: (groupId: string, userId: string) => ([string, [string, string]] | undefined)): Promise<[MedTechApi, ApiInitialisationResult]> {
    const api = medTechApi()
      .withICureBasePath(this.iCureBasePath)
      .withUserName(process.login)
      .withPassword(validationCode)
      .withAuthServerUrl(this.authServerUrl)
      .withAuthProcessId(this.authProcessId)
      .build();

    try {
      const user = await api.baseApi.userApi.getCurrentUser();
      if (user == null) {
        throw Error("Your validation code is expired");
      }

      const [providedToken, keyPair] = tokenAndKeyPairProvider(user.groupId!, user.id!) ?? [undefined, undefined];

      const token = providedToken ?? await api.userApi.createToken(user.id!, 3600 * 24 * 365 * 10);
      if (token == null) {
        throw Error("Your validation code is expired");
      }

      return [api, new ApiInitialisationResult(user, token, keyPair)];
    } catch (e) {
      throw Error("Your validation code is expired");
    }
  }

  async initUserCrypto(api: MedTechApi, token: string, user: User, patientKeyPair: [string, string]): Promise<MedTechApi> {
    const dataOwnerId = user.healthcarePartyId ?? user.patientId ?? user.deviceId;

    if (!dataOwnerId) {
      throw Error("Invalid user, no data owner id")
    }

    const authenticatedApi = medTechApi(api)
      .withPassword(token)
      .build();

    await authenticatedApi.addKeyPair(dataOwnerId, {privateKey: patientKeyPair[0], publicKey: patientKeyPair[1]})

    const dataOwner = await api.baseApi.cryptoApi.getDataOwner(dataOwnerId);
    if (dataOwner == null) {
      throw Error("Your user is not a data owner");
    }

    if (dataOwner.dataOwner.publicKey == null) {
      dataOwner.dataOwner.publicKey = patientKeyPair[1];
      const modifiedDataOwner = dataOwner.type === 'patient' ?
        await authenticatedApi.baseApi.patientApi.modifyPatientRaw(dataOwner.dataOwner) :
        'hcp' ?
          await authenticatedApi.baseApi.healthcarePartyApi.modifyHealthcareParty(dataOwner.dataOwner) :
          'device' ?
            await authenticatedApi.baseApi.deviceApi.updateDevice(dataOwner.dataOwner) : dataOwner.dataOwner

      if (user.patientId != null) {
        await this.initPatientDelegationsAndSave(authenticatedApi, modifiedDataOwner as Patient, user);
      }
    } else if (dataOwner.dataOwner.publicKey != patientKeyPair[1]) {
      //TODO User lost his key
    }

    return authenticatedApi;
  }

  async initPatientDelegationsAndSave(apiWithNewKeyPair: MedTechApi, modPat: Patient, user: User) {
    await apiWithNewKeyPair.baseApi.patientApi.modifyPatientWithUser(
      user,
      await apiWithNewKeyPair.baseApi.cryptoApi.addDelegationsAndEncryptionKeys(
        null,
        {...(await apiWithNewKeyPair.baseApi.patientApi.getPatientWithUser(user, user.patientId!))},
        user.patientId!,
        user.patientId!,
        null,
        null
      )
    )
  }
}

import {
  Api,
  hex2ua,
  IccAccesslogXApi,
  IccAgendaApi,
  IccAuthApi,
  IccCalendarItemXApi,
  IccClassificationXApi,
  IccCodeXApi,
  IccContactXApi,
  IccCryptoXApi,
  IccDeviceApi,
  IccDocumentXApi,
  IccEntityrefApi,
  IccFormXApi,
  IccGroupApi,
  IccHcpartyXApi,
  IccHelementXApi,
  IccInsuranceApi,
  IccInvoiceXApi,
  IccMessageXApi,
  IccPatientXApi,
  IccReceiptXApi,
  IccTimeTableXApi,
  IccUserXApi,
  KeyStorageFacade,
  KeyStorageImpl,
  LocalStorageImpl,
  pkcs8ToJwk,
  spkiToJwk,
  StorageFacade,
} from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { DataSampleApi } from './DataSampleApi'
import { HealthcareProfessionalApi } from './HealthcareProfessionalApi'
import { MedicalDeviceApi } from './MedicalDeviceApi'
import { HealthcareElementApi } from './HealthcareElementApi'
import { PatientApi } from './PatientApi'
import { UserApi } from './UserApi'
import { CodingApi } from './CodingApi'
import { DataSampleApiImpl } from './impl/DataSampleApiImpl'
import { CodingApiImpl } from './impl/CodingApiImpl'
import { MedicalDeviceApiImpl } from './impl/MedicalDeviceApiImpl'
import { PatientApiImpl } from './impl/PatientApiImpl'
import { UserApiImpl } from './impl/UserApiImpl'
import { HealthcareElementApiImpl } from './impl/HealthcareElementApiImpl'
import { HealthcareProfessionalApiImpl } from './impl/HealthcareProfessionalApiImpl'
import { AuthenticationApi } from './AuthenticationApi'
import { AuthenticationApiImpl } from './impl/AuthenticationApiImpl'
import { IccMaintenanceTaskXApi } from '@icure/api/icc-x-api/icc-maintenance-task-x-api'
import { NotificationApiImpl } from './impl/NotificationApiImpl'
import { NotificationApi } from './NotificationApi'
import { MessageGatewayApi } from './MessageGatewayApi'
import { MessageGatewayApiImpl } from './impl/MessageGatewayApiImpl'
import { ErrorHandlerImpl } from '../services/impl/ErrorHandlerImpl'
import { ErrorHandler } from '../services/ErrorHandler'
import { Sanitizer } from '../services/Sanitizer'
import { SanitizerImpl } from '../services/impl/SanitizerImpl'
import { DataOwnerApiImpl } from './impl/DataOwnerApiImpl'
import { DataOwnerApi } from './DataOwnerApi'
import { ICURE_CLOUD_URL, MSG_GW_CLOUD_URL } from '../../index'
import { formatICureApiUrl } from '../util'

export class MedTechApi {
  private readonly _codingApi: CodingApi
  private readonly _userApi: UserApi
  private readonly _patientApi: PatientApi
  private readonly _healthcareElementApi: HealthcareElementApi
  private readonly _notificationApi: NotificationApi
  private readonly _medicalDeviceApi: MedicalDeviceApi
  private readonly _healthcareProfessionalApi: HealthcareProfessionalApi
  private readonly _dataSampleApi: DataSampleApi
  private readonly _dataOwnerApi: DataOwnerApi
  private readonly _cryptoApi: IccCryptoXApi

  private readonly _iCureBaseUrl: string
  private readonly _username: string
  private readonly _password: string

  private readonly _authenticationApi: AuthenticationApi | undefined
  private readonly _messageGatewayApi: MessageGatewayApi | undefined
  private readonly _errorHandler: ErrorHandler
  private readonly _sanitizer: Sanitizer
  private readonly _storage: StorageFacade<string>
  private readonly _keyStorage: KeyStorageFacade
  private readonly _baseApi: {
    cryptoApi: IccCryptoXApi
    authApi: IccAuthApi
    userApi: IccUserXApi
    codeApi: IccCodeXApi
    patientApi: IccPatientXApi
    healthcarePartyApi: IccHcpartyXApi
    accessLogApi: IccAccesslogXApi
    contactApi: IccContactXApi
    healthcareElementApi: IccHelementXApi
    deviceApi: IccDeviceApi
    documentApi: IccDocumentXApi
    formApi: IccFormXApi
    invoiceApi: IccInvoiceXApi
    insuranceApi: IccInsuranceApi
    messageApi: IccMessageXApi
    entityReferenceApi: IccEntityrefApi
    receiptApi: IccReceiptXApi
    calendarItemApi: IccCalendarItemXApi
    classificationApi: IccClassificationXApi
    timetableApi: IccTimeTableXApi
    groupApi: IccGroupApi
    maintenanceTaskApi: IccMaintenanceTaskXApi
    dataOwnerApi: IccDataOwnerXApi
  }

  constructor(
    api: {
      cryptoApi: IccCryptoXApi
      authApi: IccAuthApi
      codeApi: IccCodeXApi
      userApi: IccUserXApi
      patientApi: IccPatientXApi
      healthcarePartyApi: IccHcpartyXApi
      deviceApi: IccDeviceApi
      accessLogApi: IccAccesslogXApi
      contactApi: IccContactXApi
      healthcareElementApi: IccHelementXApi
      documentApi: IccDocumentXApi
      formApi: IccFormXApi
      invoiceApi: IccInvoiceXApi
      insuranceApi: IccInsuranceApi
      messageApi: IccMessageXApi
      entityReferenceApi: IccEntityrefApi
      receiptApi: IccReceiptXApi
      agendaApi: IccAgendaApi
      calendarItemApi: IccCalendarItemXApi
      classificationApi: IccClassificationXApi
      timetableApi: IccTimeTableXApi
      groupApi: IccGroupApi
      maintenanceTaskApi: IccMaintenanceTaskXApi
      dataOwnerApi: IccDataOwnerXApi
    },
    basePath: string,
    username: string,
    password: string,
    msgGtwUrl: string | undefined = undefined,
    msgGtwSpecId: string | undefined = undefined,
    authProcessByEmailId: string | undefined = undefined,
    authProcessBySmsId: string | undefined = undefined,
    storage?: StorageFacade<string>,
    keyStorage?: KeyStorageFacade
  ) {
    this._iCureBaseUrl = basePath
    this._username = username
    this._password = password

    this._errorHandler = new ErrorHandlerImpl()
    this._sanitizer = new SanitizerImpl(this._errorHandler)

    this._storage = storage || new LocalStorageImpl()
    this._keyStorage = keyStorage || new KeyStorageImpl(this._storage)

    this._messageGatewayApi =
      msgGtwUrl && msgGtwSpecId
        ? new MessageGatewayApiImpl(msgGtwUrl, msgGtwSpecId, this._errorHandler, this._sanitizer, username, password)
        : undefined
    this._authenticationApi =
      authProcessByEmailId && authProcessBySmsId && this._messageGatewayApi
        ? new AuthenticationApiImpl(
            this._messageGatewayApi,
            basePath,
            authProcessByEmailId,
            authProcessBySmsId,
            this._errorHandler,
            this._sanitizer,
            api.cryptoApi.crypto,
            this._storage,
            this._keyStorage
          )
        : undefined
    this._dataSampleApi = new DataSampleApiImpl(api, this._errorHandler, basePath, username, password)
    this._codingApi = new CodingApiImpl(api, this._errorHandler)
    this._medicalDeviceApi = new MedicalDeviceApiImpl(api, this._errorHandler)
    this._patientApi = new PatientApiImpl(api, this._errorHandler, basePath, username, password)
    this._userApi = new UserApiImpl(api, this._messageGatewayApi, this._errorHandler, this._sanitizer, basePath, username, password)
    this._healthcareElementApi = new HealthcareElementApiImpl(api, this._errorHandler, basePath, username, password)

    this._healthcareProfessionalApi = new HealthcareProfessionalApiImpl(api, this._errorHandler)
    this._notificationApi = new NotificationApiImpl(api, this._errorHandler, basePath, username, password)
    this._dataOwnerApi = new DataOwnerApiImpl(api, this._errorHandler, this._keyStorage)

    this._baseApi = api
    this._cryptoApi = api.cryptoApi
  }

  get codingApi(): CodingApi {
    return this._codingApi
  }

  get userApi(): UserApi {
    return this._userApi
  }

  get patientApi(): PatientApi {
    return this._patientApi
  }

  get healthcareElementApi(): HealthcareElementApi {
    return this._healthcareElementApi
  }

  get notificationApi(): NotificationApi {
    return this._notificationApi
  }

  get medicalDeviceApi(): MedicalDeviceApi {
    return this._medicalDeviceApi
  }

  get healthcareProfessionalApi(): HealthcareProfessionalApi {
    return this._healthcareProfessionalApi
  }

  get dataSampleApi(): DataSampleApi {
    return this._dataSampleApi
  }

  get dataOwnerApi(): DataOwnerApi {
    return this._dataOwnerApi
  }

  get cryptoApi(): IccCryptoXApi {
    return this._cryptoApi
  }

  get authenticationApi(): AuthenticationApi {
    if (!this._authenticationApi) {
      throw Error(
        "authenticationApi couldn't be initialized. Make sure you provided the following arguments : msgGwUrl, msgGwSpecId, and at least one of authProcessByEmailId and authProcessBySMSId"
      )
    }

    return this._authenticationApi
  }

  get iCureBaseUrl(): string {
    return this._iCureBaseUrl
  }

  get username(): string {
    return this._username
  }

  get password(): string {
    return this._password
  }

  get storage(): StorageFacade<string> {
    return this._storage
  }

  get keyStorage(): KeyStorageFacade {
    return this._keyStorage
  }

  async addKeyPair(dataOwnerId: string, keyPair: { publicKey: string; privateKey: string }): Promise<void> {
    const jwk = {
      publicKey: spkiToJwk(hex2ua(keyPair.publicKey)),
      privateKey: pkcs8ToJwk(hex2ua(keyPair.privateKey)),
    }
    await this.cryptoApi.cacheKeyPair(jwk)
    await this._keyStorage.storeKeyPair(`${dataOwnerId}.${keyPair.publicKey.slice(-32)}`, jwk)
  }

  async initUserCrypto(keyPair?: { publicKey: string; privateKey: string }): Promise<{ publicKey: string; privateKey: string }[]> {
    const currentUser = await this.userApi.getLoggedUser()
    return await this._dataOwnerApi.initCryptoFor(currentUser, keyPair)
  }
}

export class MedTechApiBuilder {
  private iCureBaseUrl?: string = ICURE_CLOUD_URL
  private userName?: string
  private password?: string
  private crypto?: Crypto

  private msgGwUrl?: string = MSG_GW_CLOUD_URL
  private msgGwSpecId?: string
  private authProcessByEmailId?: string
  private authProcessBySmsId?: string
  private _preventCookieUsage: boolean = false
  private _storage?: StorageFacade<string>
  private _keyStorage?: KeyStorageFacade

  withICureBaseUrl(newICureBaseUrl: string): MedTechApiBuilder {
    this.iCureBaseUrl = formatICureApiUrl(newICureBaseUrl)
    return this
  }

  withUserName(newUserName: string): MedTechApiBuilder {
    this.userName = newUserName
    return this
  }

  withPassword(newPassword: string): MedTechApiBuilder {
    this.password = newPassword
    return this
  }

  withMsgGwUrl(newMsgGwUrl: string | undefined): MedTechApiBuilder {
    this.msgGwUrl = newMsgGwUrl
    return this
  }

  withMsgGwSpecId(newSpecId: string | undefined): MedTechApiBuilder {
    this.msgGwSpecId = newSpecId
    return this
  }

  withAuthProcessByEmailId(authProcessByEmailId: string): MedTechApiBuilder {
    this.authProcessByEmailId = authProcessByEmailId
    return this
  }

  withAuthProcessBySmsId(authProcessBySmsId: string): MedTechApiBuilder {
    this.authProcessBySmsId = authProcessBySmsId
    return this
  }

  withCrypto(newCrypto: Crypto): MedTechApiBuilder {
    this.crypto = newCrypto
    return this
  }

  preventCookieUsage(): MedTechApiBuilder {
    this._preventCookieUsage = true
    return this
  }

  withStorage(storage: StorageFacade<string>): MedTechApiBuilder {
    this._storage = storage
    return this
  }

  withKeyStorage(keyStorage: KeyStorageFacade): MedTechApiBuilder {
    this._keyStorage = keyStorage
    return this
  }

  async build(): Promise<MedTechApi> {
    if (this.iCureBaseUrl == undefined) {
      throw new Error('iCureBaseUrl is required')
    }
    if (this.userName == undefined) {
      throw new Error('userName is required')
    }
    if (this.password == undefined) {
      throw new Error('password is required')
    }

    return Api(
      this.iCureBaseUrl,
      this.userName,
      this.password,
      this.crypto,
      fetch,
      this._preventCookieUsage,
      undefined,
      this._storage,
      this._keyStorage
    ).then(
      (api) =>
        new MedTechApi(
          api,
          this.iCureBaseUrl!,
          this.userName!,
          this.password!,
          this.msgGwUrl,
          this.msgGwSpecId,
          this.authProcessByEmailId,
          this.authProcessBySmsId,
          this._storage,
          this._keyStorage
        )
    )
  }
}

export const medTechApi = (api?: MedTechApi) => {
  const apiBuilder = new MedTechApiBuilder()
  if (api) {
    return apiBuilder
      .withICureBaseUrl(api.iCureBaseUrl)
      .withCrypto(api.cryptoApi.crypto)
      .withUserName(api.username)
      .withPassword(api.password)
      .withStorage(api.storage)
      .withKeyStorage(api.keyStorage)
  }

  return apiBuilder
}

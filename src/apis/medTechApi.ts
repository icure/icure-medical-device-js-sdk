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
  IccUserXApi
} from "@icure/api";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {DataSampleApi} from "./DataSampleApi";
import {HealthcareProfessionalApi} from "./HealthcareProfessionalApi";
import {MedicalDeviceApi} from "./MedicalDeviceApi";
import {HealthcareElementApi} from "./HealthcareElementApi";
import {PatientApi} from "./PatientApi";
import {UserApi} from "./UserApi";
import {CodingApi} from "./CodingApi";
import {DataSampleApiImpl} from "./impl/DataSampleApiImpl";
import {CodingApiImpl} from "./impl/CodingApiImpl";
import {MedicalDeviceApiImpl} from "./impl/MedicalDeviceApiImpl";
import {PatientApiImpl} from "./impl/PatientApiImpl";
import {UserApiImpl} from "./impl/UserApiImpl";
import {HealthcareElementApiImpl} from "./impl/HealthcareElementApiImpl";
import {HealthcareProfessionalApiImpl} from "./impl/HealthcareProfessionalApiImpl";
import {AuthenticationApi} from "./AuthenticationApi";
import {AuthenticationApiImpl} from "./impl/AuthenticationApiImpl";
import {IccMaintenanceTaskXApi} from "@icure/api/icc-x-api/icc-maintenance-task-x-api";
import {NotificationApiImpl} from "./impl/NotificationApiImpl";
import {NotificationApi} from "./NotificationApi";
import {MessageGatewayApi} from "./MessageGatewayApi";
import {MessageGatewayApiImpl} from "./impl/MessageGatewayApiImpl";
import {ErrorHandlerImpl} from "../services/impl/ErrorHandlerImpl";
import {ErrorHandler} from "../services/ErrorHandler";
import {Sanitizer} from "../services/Sanitizer";
import {SanitizerImpl} from "../services/impl/SanitizerImpl";


export class MedTechApi {
  private readonly _codingApi: CodingApi;
  private readonly _userApi: UserApi;
  private readonly _patientApi: PatientApi;
  private readonly _healthcareElementApi: HealthcareElementApi;
  private readonly _notificationApi: NotificationApi;
  private readonly _medicalDeviceApi: MedicalDeviceApi;
  private readonly _healthcareProfessionalApi: HealthcareProfessionalApi;
  private readonly _dataSampleApi: DataSampleApi;
  private readonly _cryptoApi: IccCryptoXApi;
  private readonly _basePath: string;
  private readonly _username: string | undefined;
  private readonly _password: string | undefined;
  private readonly _msgGtwUrl: string | undefined;
  private readonly _authProcessId: string | undefined;
  private readonly _msgGtwSpecId: string | undefined;
  private readonly _authenticationApi: AuthenticationApi | undefined;
  private readonly _messageGatewayApi: MessageGatewayApi | undefined;
  private readonly _errorHandler: ErrorHandler = new ErrorHandlerImpl();
  private readonly _sanitizer: Sanitizer = new SanitizerImpl();
  private readonly _baseApi: { cryptoApi: IccCryptoXApi; authApi: IccAuthApi; userApi: IccUserXApi; codeApi: IccCodeXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; accessLogApi: IccAccesslogXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; deviceApi: IccDeviceApi; documentApi: IccDocumentXApi; formApi: IccFormXApi; invoiceApi: IccInvoiceXApi; insuranceApi: IccInsuranceApi; messageApi: IccMessageXApi; entityReferenceApi: IccEntityrefApi; receiptApi: IccReceiptXApi; calendarItemApi: IccCalendarItemXApi; classificationApi: IccClassificationXApi; timetableApi: IccTimeTableXApi; groupApi: IccGroupApi, maintenanceTaskApi: IccMaintenanceTaskXApi, dataOwnerApi: IccDataOwnerXApi };

  constructor(api: { cryptoApi: IccCryptoXApi; authApi: IccAuthApi; codeApi: IccCodeXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; deviceApi: IccDeviceApi; accessLogApi: IccAccesslogXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; documentApi: IccDocumentXApi; formApi: IccFormXApi; invoiceApi: IccInvoiceXApi; insuranceApi: IccInsuranceApi; messageApi: IccMessageXApi; entityReferenceApi: IccEntityrefApi; receiptApi: IccReceiptXApi; agendaApi: IccAgendaApi; calendarItemApi: IccCalendarItemXApi; classificationApi: IccClassificationXApi; timetableApi: IccTimeTableXApi; groupApi: IccGroupApi, maintenanceTaskApi: IccMaintenanceTaskXApi, dataOwnerApi: IccDataOwnerXApi },
              basePath: string,
              username: string | undefined,
              password: string | undefined,
              msgGtwUrl: string | undefined = undefined,
              msgGtwSpecId: string | undefined = undefined,
              authProcessId: string | undefined = undefined,
  ) {
    this._basePath = basePath;
    this._username = username;
    this._password = password;
    this._msgGtwUrl = msgGtwUrl;
    this._authProcessId = authProcessId;
    this._msgGtwSpecId = msgGtwSpecId;
    this._messageGatewayApi = msgGtwUrl && msgGtwSpecId ? new MessageGatewayApiImpl(msgGtwUrl, msgGtwSpecId, this._errorHandler, this._sanitizer, username, password) : undefined;
    this._authenticationApi = msgGtwUrl && authProcessId && msgGtwSpecId && this._messageGatewayApi ? new AuthenticationApiImpl(this._messageGatewayApi, basePath, msgGtwUrl, msgGtwSpecId, authProcessId, this._errorHandler, this._sanitizer) : undefined;
    this._dataSampleApi = new DataSampleApiImpl(api, this._errorHandler, basePath, username, password);
    this._codingApi = new CodingApiImpl(api, this._errorHandler);
    this._medicalDeviceApi = new MedicalDeviceApiImpl(api, this._errorHandler);
    this._patientApi = new PatientApiImpl(api, this._errorHandler, basePath, username, password);
    this._baseApi = api;
    this._userApi = new UserApiImpl(api, this._messageGatewayApi, this._errorHandler, basePath, username, password);
    this._healthcareElementApi = new HealthcareElementApiImpl(api, this._errorHandler);
    this._healthcareProfessionalApi = new HealthcareProfessionalApiImpl(api, this._errorHandler);
    this._notificationApi = new NotificationApiImpl(api, this._errorHandler);
    this._cryptoApi = api.cryptoApi;
  }

  get codingApi(): CodingApi {
    return this._codingApi;
  }

  get userApi(): UserApi {
    return this._userApi;
  }

  get patientApi(): PatientApi {
    return this._patientApi;
  }

  get healthcareElementApi(): HealthcareElementApi {
    return this._healthcareElementApi;
  }

  get notificationApi(): NotificationApi {
    return this._notificationApi;
  }

  get medicalDeviceApi(): MedicalDeviceApi {
    return this._medicalDeviceApi;
  }

  get healthcareProfessionalApi(): HealthcareProfessionalApi {
    return this._healthcareProfessionalApi;
  }

  get dataSampleApi(): DataSampleApi {
    return this._dataSampleApi;
  }

  get cryptoApi(): IccCryptoXApi {
    return this._cryptoApi;
  }

  get authenticationApi(): AuthenticationApi {
    if (!this._authenticationApi) {
      throw Error("authenticationApi couldn't be initialized. Make sure you provided the following arguments : msgGtwUrl, authProcessId and msgGtwSpecId")
    }

    return this._authenticationApi;
  }

  get basePath(): string {
    return this._basePath;
  }

  get username(): string | undefined {
    return this._username;
  }

  get password(): string | undefined {
    return this._password;
  }

  get msgGtwUrl(): string | undefined {
    return this._msgGtwUrl;
  }

  get authProcessId(): string | undefined {
    return this._authProcessId;
  }

  get baseApi(): { cryptoApi: IccCryptoXApi; authApi: IccAuthApi; userApi: IccUserXApi; codeApi: IccCodeXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; accessLogApi: IccAccesslogXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; deviceApi: IccDeviceApi; documentApi: IccDocumentXApi; formApi: IccFormXApi; invoiceApi: IccInvoiceXApi; insuranceApi: IccInsuranceApi; messageApi: IccMessageXApi; entityReferenceApi: IccEntityrefApi; receiptApi: IccReceiptXApi; calendarItemApi: IccCalendarItemXApi; classificationApi: IccClassificationXApi; timetableApi: IccTimeTableXApi; groupApi: IccGroupApi } {
    return this._baseApi;
  }

  async addKeyPair(keyId: string, keyPair: {publicKey: string, privateKey: string}): Promise<void> {
    await this.cryptoApi.RSA.storeKeyPair(keyId, {
      publicKey: this.cryptoApi.utils.spkiToJwk(hex2ua(keyPair.publicKey)),
      privateKey: this.cryptoApi.utils.pkcs8ToJwk(hex2ua(keyPair.privateKey))
    })
  }
}

export class MedTechApiBuilder {
  private iCureBasePath?: string;
  private userName?: string;
  private password?: string;
  private crypto?: Crypto;
  private msgGtwUrl?: string;
  private msgGtwSpecId?: string;
  private authProcessId?: string;
  private _preventCookieUsage: boolean = false;

  withICureBasePath(newICureBasePath: string): MedTechApiBuilder {
    this.iCureBasePath = newICureBasePath;
    return this;
  }

  withUserName(newUserName: string): MedTechApiBuilder {
    this.userName = newUserName;
    return this;
  }

  withPassword(newPassword: string): MedTechApiBuilder {
    this.password = newPassword;
    return this;
  }

  withMsgGtwUrl(newMsgGtwUrl: string | undefined): MedTechApiBuilder {
    this.msgGtwUrl = newMsgGtwUrl;
    return this;
  }


  withMsgGtwSpecId(newSpecId: string | undefined): MedTechApiBuilder {
    this.msgGtwSpecId = newSpecId;
    return this;
  }

  withAuthProcessId(newAuthProcessId: string | undefined): MedTechApiBuilder {
    this.authProcessId = newAuthProcessId;
    return this;
  }


  withCrypto(newCrypto: Crypto): MedTechApiBuilder {
    this.crypto = newCrypto;
    return this;
  }

  preventCookieUsage(): MedTechApiBuilder {
    this._preventCookieUsage = true;
    return this;
  }

  async build() : Promise<MedTechApi> {
    return Api(this.iCureBasePath!, this.userName!, this.password!, this.crypto, fetch, this._preventCookieUsage).then(api => {
      return new MedTechApi(
        api,
        this.iCureBasePath!,
        this.userName,
        this.password,
        this.msgGtwUrl,
        this.msgGtwSpecId,
        this.authProcessId
      );
    });
  }
}

export const medTechApi = (api?: MedTechApi) => {
  const apiBuilder = new MedTechApiBuilder();
  if (api) {
    const apiBuilder1 = apiBuilder.withICureBasePath(api.basePath).withCrypto(api.cryptoApi.crypto)
    const apiBuilder2 = api.username ? apiBuilder1.withUserName(api.username) : apiBuilder1
    return api.password ? apiBuilder2.withPassword(api.password) : apiBuilder2
  }

  return apiBuilder;
}

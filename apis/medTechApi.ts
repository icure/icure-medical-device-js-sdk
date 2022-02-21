import {Api, apiHeaders, IccAuthApi, IccCodeXApi, IccDocumentXApi, IccPatientXApi, IccUserXApi} from "@icure/api";
import {IccDeviceApi} from "@icure/api/icc-api/api/IccDeviceApi";
import {IccContactXApi} from "@icure/api/icc-x-api/icc-contact-x-api";
import {IccCryptoXApi} from "@icure/api/icc-x-api/icc-crypto-x-api";
import {DataSampleApi} from "./DataSampleApi";
import {HealthcareProfessionalApi} from "./HealthcareProfessionalApi";
import {MedicalDeviceApi} from "./MedicalDeviceApi";
import {HealthcareElementApi} from "./HealthcareElementApi";
import {PatientApi} from "./PatientApi";
import {UserApi} from "./UserApi";
import {CodingApi} from "./CodingApi";
import {IccHcpartyXApi} from "@icure/api/icc-x-api/icc-hcparty-x-api";
import {IccAccesslogXApi} from "@icure/api/icc-x-api/icc-accesslog-x-api";
import {IccHelementXApi} from "@icure/api/icc-x-api/icc-helement-x-api";
import {IccFormXApi} from "@icure/api/icc-x-api/icc-form-x-api";
import {IccInvoiceXApi} from "@icure/api/icc-x-api/icc-invoice-x-api";
import {IccEntityrefApi, IccGroupApi, IccInsuranceApi} from "@icure/api/icc-api";
import {IccMessageXApi} from "@icure/api/icc-x-api/icc-message-x-api";
import {IccReceiptXApi} from "@icure/api/icc-x-api/icc-receipt-x-api";
import {IccCalendarItemXApi} from "@icure/api/icc-x-api/icc-calendar-item-x-api";
import {IccClassificationXApi} from "@icure/api/icc-x-api/icc-classification-x-api";
import {IccTimeTableXApi} from "@icure/api/icc-x-api/icc-time-table-x-api";
import {DataSampleApiImpl} from "./impl/DataSampleApiImpl";
import {CodingApiImpl} from "./impl/CodingApiImpl";
import {MedicalDeviceApiImpl} from "./impl/MedicalDeviceApiImpl";
import {PatientApiImpl} from "./impl/PatientApiImpl";
import {UserApiImpl} from "./impl/UserApiImpl";
import {HealthcareElementApiImpl} from "./impl/HealthcareElementApiImpl";
import {HealthcareProfessionalApiImpl} from "./impl/HealthcareProfessionalApiImpl";

class MedTechApi {
  private readonly _codingApi: CodingApi;
  private readonly _userApi: UserApi;
  private readonly _patientApi: PatientApi;
  private readonly _healthcareElementApi: HealthcareElementApi;
  private readonly _medicalDeviceApi: MedicalDeviceApi;
  private readonly _healthcareProfessionalApi: HealthcareProfessionalApi;
  private readonly _dataSampleApi: DataSampleApi;

  constructor(api: {
    cryptoApi: IccCryptoXApi;
    authApi: IccAuthApi;
    userApi: IccUserXApi;
    patientApi: IccPatientXApi;
    healthcarePartyApi: IccHcpartyXApi;
    accessLogApi: IccAccesslogXApi;
    contactApi: IccContactXApi;
    healthcareElementApi: IccHelementXApi;
    documentApi: IccDocumentXApi;
    formApi: IccFormXApi;
    invoiceApi: IccInvoiceXApi;
    insuranceApi: IccInsuranceApi;
    messageApi: IccMessageXApi;
    entityReferenceApi: IccEntityrefApi;
    receiptApi: IccReceiptXApi;
    calendarItemApi: IccCalendarItemXApi;
    classificationApi: IccClassificationXApi;
    timetableApi: IccTimeTableXApi;
    groupApi: IccGroupApi;
  }, iccDeviceApi: IccDeviceApi, iccCodeApi: IccCodeXApi) {
    this._dataSampleApi = new DataSampleApiImpl(api);
    this._codingApi = new CodingApiImpl(iccCodeApi);
    this._medicalDeviceApi = new MedicalDeviceApiImpl(iccDeviceApi);
    this._patientApi = new PatientApiImpl(api);
    this._userApi = new UserApiImpl(api);
    this._healthcareElementApi = new HealthcareElementApiImpl(api);
    this._healthcareProfessionalApi = new HealthcareProfessionalApiImpl(api);
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

  get medicalDeviceApi(): MedicalDeviceApi {
    return this._medicalDeviceApi;
  }

  get healthcareProfessionalApi(): HealthcareProfessionalApi {
    return this._healthcareProfessionalApi;
  }

  get dataSampleApi(): DataSampleApi {
    return this._dataSampleApi;
  }
}

class MedTechApiBuilder {
  private iCureBasePath?: string;
  private userName?: string;
  private password?: string;
  private crypto?: Crypto;

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

  withCrypto(newCrypto: Crypto): MedTechApiBuilder {
    this.crypto = newCrypto;
    return this;
  }

  build() : MedTechApi {
    const api = Api(this.iCureBasePath!, this.userName!, this.password!, this.crypto!);
    const headers = apiHeaders(this.userName!, this.password!)

    return new MedTechApi(api,
      new IccDeviceApi(this.iCureBasePath!, headers),
      new IccCodeXApi(this.iCureBasePath!, headers)
    );
  }
}

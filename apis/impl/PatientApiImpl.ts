import {Patient} from "../../models/Patient";
import {Filter} from "../../models/Filter";
import {PaginatedListPatient} from "../../models/PaginatedListPatient";
import {PatientApi} from "../PatientApi";
import {IccCryptoXApi} from "@icure/api/icc-x-api/icc-crypto-x-api";
import {IccContactXApi} from "@icure/api/icc-x-api/icc-contact-x-api";
import {IccHelementXApi} from "@icure/api/icc-x-api/icc-helement-x-api";
import {IccHcpartyXApi} from "@icure/api/icc-x-api/icc-hcparty-x-api";
import {IccAuthApi, IccCodeApi, IccDocumentXApi, IccPatientXApi, IccUserXApi} from "@icure/api";
import {PatientDtoMapper} from "../../mappers/patient";

class PatientApiImpl implements PatientApi {
  userApi: IccUserXApi;
  patientApi: IccPatientXApi;

  constructor(api: { cryptoApi: IccCryptoXApi; codeApi: IccCodeApi, authApi: IccAuthApi; userApi: IccUserXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; documentApi: IccDocumentXApi; }) {
    this.userApi = api.userApi;
    this.patientApi = api.patientApi;
  }

  async createOrModifyPatient(patient: Patient): Promise<Patient> {
    let currentUser = await this.userApi.getCurrentUser();

    let createdOrUpdatedPatient = patient.rev
      ? await this.patientApi.modifyPatientWithUser(currentUser, PatientDtoMapper.toPatientDto(patient))
      : await this.patientApi.createPatientWithUser(currentUser, PatientDtoMapper.toPatientDto(patient))

    if (createdOrUpdatedPatient) {
      return PatientDtoMapper.toPatient(createdOrUpdatedPatient)!;
    }

    throw Error(`Could not create / modify patient ${patient.id} with user ${currentUser.id}`)
  }

  async deletePatient(patientId: string): Promise<string> {
    let deletedId = (await this.patientApi.deletePatient(patientId))
      .map((docIdentifier) => docIdentifier.id!)
      .pop();

    if (deletedId) {
      return deletedId;
    }

    throw Error(`Could not delete patient ${patientId}`)
  }

  async getPatient(patientId: string): Promise<Patient> {
    let currentUser = await this.userApi.getCurrentUser();
    let foundPatient = await this.patientApi.getPatientWithUser(currentUser, patientId);

    if (foundPatient) {
      return PatientDtoMapper.toPatient(foundPatient)!;
    }

    throw Error(`Could not find patient ${patientId} with user ${currentUser.id}`)
  }

    async filterPatients(filter: Filter, nextPatientId?: string, limit?: number): Promise<PaginatedListPatient> {
        return Promise.resolve(new PaginatedListPatient({}));
    }

    async matchPatients(filter: Filter): Promise<Array<string>> {
        return Promise.resolve([]);
    }
}

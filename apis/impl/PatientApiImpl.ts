import {Patient} from "../../models/Patient";
import {PaginatedListPatient} from "../../models/PaginatedListPatient";
import {PatientApi} from "../PatientApi";
import {IccCryptoXApi} from "@icure/api/icc-x-api/icc-crypto-x-api";
import {IccContactXApi} from "@icure/api/icc-x-api/icc-contact-x-api";
import {IccHelementXApi} from "@icure/api/icc-x-api/icc-helement-x-api";
import {IccHcpartyXApi} from "@icure/api/icc-x-api/icc-hcparty-x-api";
import {FilterChainPatient, IccAuthApi, IccCodeApi, IccDocumentXApi, IccPatientXApi, IccUserXApi} from "@icure/api";
import {FilterMapper} from "../../mappers/filter";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {Filter} from "../../filter/Filter";
import {PatientMapper} from "../../mappers/patient";

export class PatientApiImpl implements PatientApi {
  userApi: IccUserXApi;
  patientApi: IccPatientXApi;

  constructor(api: { cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; documentApi: IccDocumentXApi; }) {
    this.userApi = api.userApi;
    this.patientApi = api.patientApi;
  }

  async createOrModifyPatient(patient: Patient): Promise<Patient> {
    let currentUser = await this.userApi.getCurrentUser();

    let createdOrUpdatedPatient = patient.rev
      ? await this.patientApi.modifyPatientWithUser(currentUser, PatientMapper.toPatientDto(patient))
      : await this.patientApi.createPatientWithUser(currentUser, PatientMapper.toPatientDto(patient))

    if (createdOrUpdatedPatient) {
      return PatientMapper.toPatient(createdOrUpdatedPatient)!;
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
      return PatientMapper.toPatient(foundPatient)!;
    }

    throw Error(`Could not find patient ${patientId} with user ${currentUser.id}`)
  }

  async filterPatients(filter: Filter<Patient>, nextPatientId?: string, limit?: number): Promise<PaginatedListPatient> {
    return PaginatedListMapper.toPaginatedListPatient(await this.patientApi.filterPatientsBy(undefined, nextPatientId, limit, undefined, undefined, undefined, new FilterChainPatient({
      filter: FilterMapper.toAbstractFilterDto<Patient>(filter, 'Patient')
    })))!
  }

  async matchPatients(filter: Filter<Patient>): Promise<Array<string>> {
    return await this.patientApi.matchPatientsBy(FilterMapper.toAbstractFilterDto<Patient>(filter, 'Patient'));
  }
}

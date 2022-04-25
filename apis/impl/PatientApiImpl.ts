import {Patient} from "../../models/Patient";
import {PaginatedListPatient} from "../../models/PaginatedListPatient";
import {PatientApi} from "../PatientApi";
import {FilterChainPatient, IccDocumentXApi, IccPatientXApi, IccUserXApi, IccContactXApi, IccCryptoXApi} from "@icure/api";
import {FilterMapper} from "../../mappers/filter";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {Filter} from "../../filter/Filter";
import {PatientMapper} from "../../mappers/patient";
import {Connection, ConnectionImpl} from "../../models/Connection";
import {subscribeToEntityEvents} from "../../utils/rsocket";

export class PatientApiImpl implements PatientApi {
  private readonly userApi: IccUserXApi;
  private readonly patientApi: IccPatientXApi;

  private readonly basePath: string;
  private readonly username?: string;
  private readonly password?: string;

  constructor(api: { cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; documentApi: IccDocumentXApi; },
              basePath: string,
              username: string | undefined,
              password: string | undefined) {
    this.basePath = basePath;
    this.username = username;
    this.password = password;
    this.userApi = api.userApi;
    this.patientApi = api.patientApi;
  }

  async createOrModifyPatient(patient: Patient): Promise<Patient> {
    let currentUser = await this.userApi.getCurrentUser();

    let createdOrUpdatedPatient = patient.rev
      ? await this.patientApi.modifyPatientWithUser(currentUser, PatientMapper.toPatientDto(patient))
      : await this.patientApi.createPatientWithUser(currentUser, await this.patientApi.newInstance(currentUser, PatientMapper.toPatientDto(patient)))

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

  async subscribeToPatientEvents(eventTypes: ("CREATE" | "UPDATE" | "DELETE")[], filter: Filter<Patient> | undefined, eventFired: (patient: Patient) => Promise<void>): Promise<Connection> {
    let currentUser = await this.userApi.getCurrentUser();
    return await subscribeToEntityEvents(this.basePath, this.username!, this.password!, "Patient", eventTypes, filter, eventFired, async encrypted => (await this.patientApi.decrypt(currentUser, [encrypted]))[0]).then((rs) => new ConnectionImpl(rs))
  }
}

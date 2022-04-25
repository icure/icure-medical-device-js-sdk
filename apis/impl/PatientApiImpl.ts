import {Patient} from '../../models/Patient';
import {PaginatedListPatient} from '../../models/PaginatedListPatient';
import {PatientApi} from '../PatientApi';
import {FilterChainPatient, IccDocumentXApi, IccPatientXApi, IccUserXApi, IccContactXApi, IccCryptoXApi} from '@icure/api';
import {FilterMapper} from '../../mappers/filter';
import {PaginatedListMapper} from '../../mappers/paginatedList';
import {Filter} from '../../filter/Filter';
import {PatientMapper} from '../../mappers/patient';
import { Connection, ConnectionImpl } from '../../models/Connection';
import {subscribeToEntityEvents} from '../../utils/rsocket';

export class PatientApiImpl implements PatientApi {
  private readonly userApi: IccUserXApi;
  private readonly patientApi: IccPatientXApi;
  private readonly cryptoApi: IccCryptoXApi;

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
    this.cryptoApi = api.cryptoApi;
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

  async giveAccessTo(patient: Patient, delegatedTo: string): Promise<Patient> {
    const currentUser = await this.userApi.getCurrentUser()
    const dataOwnerId = this.userApi.getDataOwnerOf(currentUser)
    const patientToModify = PatientMapper.toPatientDto(patient)!

    if (patientToModify.delegations == undefined || patientToModify.delegations[delegatedTo].length == 0) {
      throw Error(`User ${currentUser.id} may not access patient information`)
    }

    return await this.cryptoApi.extractPreferredSfk(patientToModify, dataOwnerId, true)
      .then((secretKey) => {
        if (!secretKey) {
          throw Error(`User ${currentUser.id} could not decrypt secret info of patient ${patientToModify.id}`)
        }
        return secretKey
      })
      .then((secretKey) => this.cryptoApi.addDelegationsAndEncryptionKeys(null, patientToModify, dataOwnerId, delegatedTo, secretKey, null))
      .then((patientWithNewDelegations) => this.cryptoApi.extractEncryptionsSKs(patientWithNewDelegations, dataOwnerId))
      .then((encKeys) => {
        if (encKeys.extractedKeys.length == 0) {
          throw Error(`User ${currentUser.id} could not decrypt secret info of patient ${patientToModify.id}`)
        }

        return encKeys.extractedKeys.shift()!
      })
      .then((encKey) => this.cryptoApi.addDelegationsAndEncryptionKeys(null, patientToModify, dataOwnerId, delegatedTo, null, encKey))
      .then((patientWithUpdatedAccesses) => this.patientApi.modifyPatientWithUser(currentUser, patientWithUpdatedAccesses))
      .then((updatedPatient) => {
        if (!updatedPatient) {
          throw Error(`Impossible to givve access to ${delegatedTo} to patient ${patientToModify.id} information`)
        }

        return PatientMapper.toPatient(updatedPatient)!
      })
  }

  async subscribeToPatientEvents(eventTypes: ("CREATE" | "UPDATE" | "DELETE")[], filter: Filter<Patient> | undefined, eventFired: (patient: Patient) => Promise<void>): Promise<Connection> {
    let currentUser = await this.userApi.getCurrentUser();
    return await subscribeToEntityEvents(this.basePath, this.username!, this.password!, "Patient", eventTypes, filter, eventFired, async encrypted => (await this.patientApi.decrypt(currentUser, [encrypted]))[0]).then((rs) => new ConnectionImpl(rs))
  }
}

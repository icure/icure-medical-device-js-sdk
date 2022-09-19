import {Patient} from '../../models/Patient'
import {PaginatedListPatient} from '../../models/PaginatedListPatient'
import {PatientApi} from '../PatientApi'
import {
  FilterChainPatient,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccPatientXApi,
  IccUserXApi,
  Patient as PatientDto
} from '@icure/api'
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {FilterMapper} from '../../mappers/filter'
import {PaginatedListMapper} from '../../mappers/paginatedList'
import {Filter} from '../../filter/Filter'
import {PatientMapper} from '../../mappers/patient'
import {Connection, ConnectionImpl} from '../../models/Connection'
import {subscribeToEntityEvents} from '../../utils/rsocket'
import {SharingResult, SharingStatus} from "../../utils/interfaces";

export class PatientApiImpl implements PatientApi {
  private readonly userApi: IccUserXApi
  private readonly patientApi: IccPatientXApi
  private readonly cryptoApi: IccCryptoXApi
  private readonly dataOwnerApi: IccDataOwnerXApi

  private readonly basePath: string
  private readonly username?: string
  private readonly password?: string

  constructor(
    api: { cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; dataOwnerApi: IccDataOwnerXApi; documentApi: IccDocumentXApi },
    basePath: string,
    username: string | undefined,
    password: string | undefined
  ) {
    this.basePath = basePath
    this.username = username
    this.password = password
    this.userApi = api.userApi
    this.patientApi = api.patientApi
    this.cryptoApi = api.cryptoApi
    this.dataOwnerApi = api.dataOwnerApi
  }

  async createOrModifyPatient(patient: Patient): Promise<Patient> {
    let currentUser = await this.userApi.getCurrentUser()

    let createdOrUpdatedPatient = patient.rev
      ? await this.patientApi.modifyPatientWithUser(currentUser, PatientMapper.toPatientDto(patient))
      : await this.patientApi.createPatientWithUser(currentUser, await this.patientApi.newInstance(currentUser, PatientMapper.toPatientDto(patient)))

    if (createdOrUpdatedPatient) {
      return PatientMapper.toPatient(createdOrUpdatedPatient)!
    }

    throw Error(`Could not create / modify patient ${patient.id} with user ${currentUser.id}`)
  }

  async deletePatient(patientId: string): Promise<string> {
    let deletedId = (await this.patientApi.deletePatient(patientId)).map((docIdentifier) => docIdentifier.id!).pop()

    if (deletedId) {
      return deletedId
    }

    throw Error(`Could not delete patient ${patientId}`)
  }

  async getPatient(patientId: string): Promise<Patient> {
    let currentUser = await this.userApi.getCurrentUser()
    let foundPatient = await this.patientApi.getPatientWithUser(currentUser, patientId)

    if (foundPatient) {
      return PatientMapper.toPatient(foundPatient)!
    }

    throw Error(`Could not find patient ${patientId} with user ${currentUser.id}`)
  }

  async filterPatients(filter: Filter<Patient>, nextPatientId?: string, limit?: number): Promise<PaginatedListPatient> {
    return PaginatedListMapper.toPaginatedListPatient(
      await this.patientApi.filterPatientsBy(
        undefined,
        nextPatientId,
        limit,
        undefined,
        undefined,
        undefined,
        new FilterChainPatient({
          filter: FilterMapper.toAbstractFilterDto<Patient>(filter, 'Patient'),
        })
      )
    )!
  }

  matchPatients(filter: Filter<Patient>): Promise<Array<string>> {
    return this.patientApi.matchPatientsBy(FilterMapper.toAbstractFilterDto<Patient>(filter, 'Patient'))
  }

  async giveAccessTo(patient: Patient, delegatedTo: string): Promise<Patient> {
    const currentUser = await this.userApi.getCurrentUser()
    const dataOwnerId = this.dataOwnerApi.getDataOwnerOf(currentUser)
    const patientToModify = PatientMapper.toPatientDto(patient)!

    if (patientToModify.delegations == undefined || !patientToModify.delegations[dataOwnerId] || patientToModify.delegations[dataOwnerId].length == 0) {
      throw Error(`User ${currentUser.id} may not access patient information`)
    }

    if (patientToModify.delegations[delegatedTo] != undefined) {
      return patient;
    }

    return this.cryptoApi
      .extractDelegationsSFKs(patientToModify, dataOwnerId)
      .then((delKeys) => {
        if (delKeys.extractedKeys.length == 0) {
          throw Error(`User ${currentUser.id} could not decrypt secret info of patient ${patient.id}`)
        }

        return delKeys.extractedKeys.shift()!
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
      .then(async (patientWithUpdatedAccesses) => {
        const currentPatient = await this.patientApi.getPatientWithUser(currentUser, patientWithUpdatedAccesses.id!)
        const patientToUpdate = new PatientDto({...currentPatient,
          delegations: patientWithUpdatedAccesses.delegations,
          encryptionKeys: patientWithUpdatedAccesses.encryptionKeys
        })
        return this.patientApi.modifyPatientWithUser(currentUser, patientToUpdate);
      })
      .then((updatedPatient) => {
        if (!updatedPatient) {
          throw Error(`Impossible to give access to ${delegatedTo} to patient ${patientToModify.id} information`)
        }

        return PatientMapper.toPatient(updatedPatient)!
      })
  }

  async giveAccessToAllDataOf(patientId: string): Promise<SharingResult> {
    const currentUser = await this.userApi.getCurrentUser()
    if (!currentUser){
      throw new Error("There is no user currently logged in");
    }
    if (!this.dataOwnerApi.getDataOwnerOf(currentUser)){
      throw new Error("Current User is not a Data Owner");
    }
    return this.patientApi.share(
      currentUser,
      patientId,
      this.dataOwnerApi.getDataOwnerOf(currentUser),
      [patientId],
      { [patientId]: ["all"] }
    ).then( res => {
      return {
        patient: !!res?.patient ? PatientMapper.toPatient(res.patient) : undefined,
        statuses: {
          dataSamples: !!res?.statuses.contacts ? (res.statuses.contacts as SharingStatus) : undefined,
          healthcareElements: !!res?.statuses.healthElements ? (res.statuses.healthElements as SharingStatus) : undefined,
          patient: !!res?.statuses.patient ? (res.statuses.patient as SharingStatus) : undefined
        }
      }
    });
  }

  async subscribeToPatientEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<Patient> | undefined,
    eventFired: (patient: Patient) => Promise<void>,
    options: {keepAlive?: number, lifetime?: number, connectionMaxRetry?: number, connectionRetryIntervalMs?: number } = {}
  ): Promise<Connection> {
    let currentUser = await this.userApi.getCurrentUser()
    return subscribeToEntityEvents(
      this.basePath,
      this.username!,
      this.password!,
      'Patient',
      eventTypes,
      filter,
      eventFired,
      options,
      async (encrypted) => (await this.patientApi.decrypt(currentUser, [encrypted]))[0]
    ).then((rs) => new ConnectionImpl(rs))
  }
}

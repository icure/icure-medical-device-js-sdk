import { EncryptedPatient, Patient, PotentiallyEncryptedPatient } from '../../models/Patient'
import { PaginatedListPatient } from '../../models/PaginatedListPatient'
import { PatientApi } from '../PatientApi'
import { FilterChainPatient, IccContactXApi, IccCryptoXApi, IccDocumentXApi, IccPatientXApi, IccUserXApi, Patient as PatientDto } from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { FilterMapper } from '../../mappers/filter'
import { PaginatedListMapper } from '../../mappers/paginatedList'
import { Filter } from '../../filter/Filter'
import { PatientMapper } from '../../mappers/patient'
import { Connection, ConnectionImpl } from '../../models/Connection'
import { subscribeToEntityEvents } from '../../utils/rsocket'
import { SharingResult, SharingStatus } from '../../utils/interfaces'
import { ErrorHandler } from '../../services/ErrorHandler'
import { extendMany, findAndDecryptPotentiallyUnknownKeysForDelegate } from '../../utils/crypto'

export class PatientApiImpl implements PatientApi {
  private readonly userApi: IccUserXApi
  private readonly patientApi: IccPatientXApi
  private readonly cryptoApi: IccCryptoXApi
  private readonly dataOwnerApi: IccDataOwnerXApi

  private readonly errorHandler: ErrorHandler

  private readonly basePath: string
  private readonly username?: string
  private readonly password?: string

  constructor(
    api: {
      cryptoApi: IccCryptoXApi
      userApi: IccUserXApi
      patientApi: IccPatientXApi
      contactApi: IccContactXApi
      dataOwnerApi: IccDataOwnerXApi
      documentApi: IccDocumentXApi
    },
    errorHandler: ErrorHandler,
    basePath: string,
    username: string | undefined,
    password: string | undefined
  ) {
    this.basePath = basePath
    this.username = username
    this.password = password
    this.errorHandler = errorHandler
    this.userApi = api.userApi
    this.patientApi = api.patientApi
    this.cryptoApi = api.cryptoApi
    this.dataOwnerApi = api.dataOwnerApi
  }

  async createOrModifyPatient(patient: Patient): Promise<Patient> {
    const dto = PatientMapper.toPatientDto(patient)
    if (!dto) throw this.errorHandler.createErrorWithMessage(`Could not convert patient to DTO.\n${JSON.stringify(patient)}`)
    return this._createOrModifyPatient(dto)
  }

  async modifyEncryptedPatient(modifiedPatient: EncryptedPatient): Promise<EncryptedPatient> {
    const dto = PatientMapper.toPatientDto(modifiedPatient)
    if (!dto) throw this.errorHandler.createErrorWithMessage(`Could not convert patient to DTO.\n${JSON.stringify(modifiedPatient)}`)
    return this._createOrModifyPatient(dto)
  }

  private async _createOrModifyPatient(patientDto: PatientDto) {
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    const createdOrUpdatedPatient = patientDto.rev
      ? await this.patientApi.modifyPatientWithUser(currentUser, patientDto).catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
      : await this.patientApi.createPatientWithUser(currentUser, await this.patientApi.newInstance(currentUser, patientDto)).catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })

    if (createdOrUpdatedPatient) {
      return PatientMapper.toPatient(createdOrUpdatedPatient)!
    }

    throw this.errorHandler.createErrorWithMessage(`Could not create / modify patient ${patientDto.id} with user ${currentUser.id}`)
  }

  async deletePatient(patientId: string): Promise<string> {
    const deletedId = (
      await this.patientApi.deletePatient(patientId).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    )
      .map((docIdentifier) => docIdentifier.id!)
      .pop()

    if (deletedId) {
      return deletedId
    }

    throw this.errorHandler.createErrorWithMessage(`Could not delete patient ${patientId}`)
  }

  async getPatient(patientId: string): Promise<Patient> {
    return (await this._getPatient(patientId, true)) as Patient
  }

  getPatientAndTryDecrypt(patientId: string): Promise<PotentiallyEncryptedPatient> {
    return this._getPatient(patientId, false)
  }

  private async _getPatient(patientId: string, requireDecrypted: boolean): Promise<PotentiallyEncryptedPatient> {
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    const foundPatient = await this.patientApi.getPotentiallyEncryptedPatientWithUser(currentUser, patientId).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    if (foundPatient) {
      if (foundPatient.decrypted) {
        return PatientMapper.toPatient(foundPatient.patient)!
      } else if (requireDecrypted) {
        throw this.errorHandler.createErrorWithMessage(`Could not decrypt patient ${patientId} with current user ${currentUser.id}`)
      } else {
        return PatientMapper.toEncryptedPatient(foundPatient.patient)!
      }
    }

    throw this.errorHandler.createErrorWithMessage(`Could not find patient ${patientId} with current user ${currentUser.id}`)
  }

  async filterPatients(filter: Filter<Patient>, nextPatientId?: string, limit?: number): Promise<PaginatedListPatient> {
    return PaginatedListMapper.toPaginatedListPatient(
      await this.patientApi
        .filterPatientsBy(
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
        .catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
    )!
  }

  matchPatients(filter: Filter<Patient>): Promise<Array<string>> {
    return this.patientApi.matchPatientsBy(FilterMapper.toAbstractFilterDto<Patient>(filter, 'Patient')).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
  }

  async giveAccessTo(patient: Patient, delegatedTo: string): Promise<Patient> {
    return PatientMapper.toPatient(await this._giveAccessTo(PatientMapper.toPatientDto(patient)!, delegatedTo))!
  }

  async giveAccessToPotentiallyEncrypted(patient: PotentiallyEncryptedPatient, delegatedTo: string): Promise<PotentiallyEncryptedPatient> {
    if (patient instanceof Patient) {
      return this.giveAccessTo(patient, delegatedTo)
    } else {
      return PatientMapper.toEncryptedPatient(await this._giveAccessTo(PatientMapper.toPatientDto(patient)!, delegatedTo))!
    }
  }

  private async _giveAccessTo(patient: PatientDto, delegatedTo: string): Promise<PatientDto> {
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    const dataOwnerId = this.dataOwnerApi.getDataOwnerOf(currentUser)

    if (patient.id !== dataOwnerId && !(patient.delegations?.[dataOwnerId]?.length ?? 0)) {
      throw this.errorHandler.createErrorWithMessage(
        `User ${currentUser.id} may not access patient information. Check that the patient is owned by/shared to the actual user ${currentUser.id}.`
      )
    }

    const newSecretIds = await findAndDecryptPotentiallyUnknownKeysForDelegate(
      this.cryptoApi,
      patient.id!,
      dataOwnerId,
      delegatedTo,
      patient.delegations ?? {}
    )
    const newEncryptionKey = (
      await findAndDecryptPotentiallyUnknownKeysForDelegate(this.cryptoApi, patient.id!, dataOwnerId, delegatedTo, patient.encryptionKeys ?? {})
    )[0]

    if (!newSecretIds.length && !newEncryptionKey) {
      return patient
    }

    const patientWithUpdatedAccesses = await extendMany(this.cryptoApi, dataOwnerId, delegatedTo, patient, null, newSecretIds, newEncryptionKey)
    const updatedPatient = await this.patientApi.modifyPatientWithUser(currentUser, patientWithUpdatedAccesses)
    if (!updatedPatient) {
      throw this.errorHandler.createErrorWithMessage(`Impossible to give access to ${delegatedTo} to patient ${patient.id} information`)
    }

    return updatedPatient
  }

  async giveAccessToAllDataOf(patientId: string): Promise<SharingResult> {
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    if (!currentUser) {
      throw this.errorHandler.createErrorWithMessage(
        'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
      )
    }
    if (!this.dataOwnerApi.getDataOwnerOf(currentUser)) {
      throw this.errorHandler.createErrorWithMessage(
        'The current user is not a data owner. You must been either a patient, a device or a healthcare professional to call this method.'
      )
    }
    return this.patientApi
      .share(currentUser, patientId, this.dataOwnerApi.getDataOwnerOf(currentUser), [patientId], { [patientId]: ['all'] })
      .then((res) => {
        return {
          patient: !!res?.patient ? PatientMapper.toPatient(res.patient) : undefined,
          statuses: {
            dataSamples: !!res?.statuses.contacts ? (res.statuses.contacts as SharingStatus) : undefined,
            healthcareElements: !!res?.statuses.healthElements ? (res.statuses.healthElements as SharingStatus) : undefined,
            patient: !!res?.statuses.patient ? (res.statuses.patient as SharingStatus) : undefined,
          },
        }
      })
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
  }

  async subscribeToPatientEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<Patient> | undefined,
    eventFired: (patient: Patient) => Promise<void>,
    options: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number } = {}
  ): Promise<Connection> {
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
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
    )
      .then((rs) => new ConnectionImpl(rs))
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
  }
}

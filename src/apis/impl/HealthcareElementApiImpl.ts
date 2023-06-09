import { HealthcareElement } from '../../models/HealthcareElement'
import { Filter } from '../../filter/Filter'
import { PaginatedListHealthcareElement } from '../../models/PaginatedListHealthcareElement'
import { HealthcareElementApi } from '../HealthcareElementApi'
import {
  DocIdentifier,
  FilterChainHealthElement,
  HealthElement,
  IccAuthApi,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHcpartyXApi,
  IccHelementXApi,
  IccPatientXApi,
  IccUserXApi,
  PaginatedListHealthElement,
  Patient as PatientDto,
  User,
  User as UserDto,
} from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { forceUuid } from '../../mappers/utils'
import { PaginatedListMapper } from '../../mappers/paginatedList'
import { FilterMapper } from '../../mappers/filter'
import { HealthcareElementMapper } from '../../mappers/healthcareElement'
import { firstOrNull } from '../../utils/functionalUtils'
import { Patient } from '../../models/Patient'
import { HealthcareElementFilter } from '../../filter'
import { ErrorHandler } from '../../services/ErrorHandler'
import { Connection, ConnectionImpl } from '../../models/Connection'
import { subscribeToEntityEvents } from '../../utils/websocket'

export class HealthcareElementApiImpl implements HealthcareElementApi {
  private readonly userApi: IccUserXApi
  private readonly heApi: IccHelementXApi
  private readonly patientApi: IccPatientXApi
  private readonly cryptoApi: IccCryptoXApi
  private readonly authApi: IccAuthApi
  private readonly dataOwnerApi: IccDataOwnerXApi
  private readonly errorHandler: ErrorHandler

  private readonly basePath: string
  private readonly username?: string
  private readonly password?: string

  constructor(
    api: {
      cryptoApi: IccCryptoXApi
      authApi: IccAuthApi
      userApi: IccUserXApi
      patientApi: IccPatientXApi
      contactApi: IccContactXApi
      dataOwnerApi: IccDataOwnerXApi
      documentApi: IccDocumentXApi
      healthcarePartyApi: IccHcpartyXApi
      healthcareElementApi: IccHelementXApi
    },
    errorHandler: ErrorHandler,
    basePath: string,
    username: string | undefined,
    password: string | undefined
  ) {
    this.basePath = basePath
    this.username = username
    this.password = password
    this.authApi = api.authApi
    this.userApi = api.userApi
    this.heApi = api.healthcareElementApi
    this.patientApi = api.patientApi
    this.cryptoApi = api.cryptoApi
    this.dataOwnerApi = api.dataOwnerApi
    this.errorHandler = errorHandler
  }

  async createOrModifyHealthcareElement(healthcareElement: HealthcareElement, patientId?: string): Promise<HealthcareElement> {
    const currentUser = (await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })) as User
    const patient = patientId
      ? await this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
      : undefined

    let createdOrUpdateHealthElement
    if (healthcareElement.rev) {
      createdOrUpdateHealthElement = await this.heApi
        .modifyHealthElementWithUser(currentUser, HealthcareElementMapper.toHealthElementDto(healthcareElement))
        .catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
    } else if (patient) {
      createdOrUpdateHealthElement = await this.heApi.createHealthElementWithUser(
        currentUser,
        (await this.heApi.newInstance(currentUser, patient, HealthcareElementMapper.toHealthElementDto(healthcareElement)).catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })) as HealthElement
      )
    } else throw this.errorHandler.createErrorWithMessage('In order to create a new healthcare element, you must provide the patientId')

    if (createdOrUpdateHealthElement) {
      return HealthcareElementMapper.toHealthcareElement(createdOrUpdateHealthElement)!
    }

    throw this.errorHandler.createErrorWithMessage(`Could not create / modify healthElement ${healthcareElement.id}`)
  }

  async createOrModifyHealthcareElements(healthcareElements: Array<HealthcareElement>, patientId?: string): Promise<Array<HealthcareElement>> {
    const heToCreate = healthcareElements.filter((he) => !he.rev)
    const heToUpdate = healthcareElements.filter((he) => !!he.rev)
    const currentUser = (await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })) as User
    const patient = patientId
      ? await this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
      : undefined

    if (!heToUpdate.every((he) => he.id != null && forceUuid(he.id))) {
      throw this.errorHandler.createErrorWithMessage('Error while updating: HealthcareElement id should be provided as an UUID v4 (String)')
    }

    if (!patient && heToCreate.length > 0) {
      throw this.errorHandler.createErrorWithMessage('Error while creating: patientId should be provided to create new healthcare elements')
    }

    const hesCreated = await Promise.all(
      heToCreate.map((he) => HealthcareElementMapper.toHealthElementDto(he)).map((he) => this.heApi.newInstance(currentUser, patient, he))
    )
      .then((healthElementsToCreate) => this.heApi.createHealthElementsWithUser(currentUser, healthElementsToCreate))
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    const hesUpdated = await this.heApi
      .modifyHealthElementsWithUser(
        currentUser,
        heToUpdate.map((he) => HealthcareElementMapper.toHealthElementDto(he))
      )
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })

    return [...hesCreated, ...hesUpdated].map((he) => HealthcareElementMapper.toHealthcareElement(he))
  }

  async deleteHealthcareElement(id: string): Promise<string> {
    const deletedHeRev = firstOrNull(
      (await this.heApi.deleteHealthElements(id).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })) as Array<DocIdentifier>
    )?.rev
    if (deletedHeRev) {
      return deletedHeRev
    }
    throw this.errorHandler.createErrorWithMessage(`An error occurred when deleting this HealthcareElement. Id: ${id}`)
  }

  async filterHealthcareElement(
    filter: Filter<HealthcareElement>,
    nextHealthElementId?: string,
    limit?: number
  ): Promise<PaginatedListHealthcareElement> {
    const currentUser = (await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })) as User

    return PaginatedListMapper.toPaginatedListHealthcareElement(
      (await this.heApi
        .filterByWithUser(
          currentUser,
          nextHealthElementId,
          limit,
          new FilterChainHealthElement({
            filter: FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement'),
          })
        )
        .catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })) as PaginatedListHealthElement | undefined
    )!
  }

  async getHealthcareElement(id: string): Promise<HealthcareElement> {
    const currentUser = (await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })) as User
    return HealthcareElementMapper.toHealthcareElement(
      (await this.heApi.getHealthElementWithUser(currentUser, id).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })) as HealthElement
    )
  }

  async matchHealthcareElement(filter: Filter<HealthcareElement>): Promise<Array<string>> {
    return this.heApi.matchHealthElementsBy(FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement')).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
  }

  async _getPatientOfHealthElement(currentUser: UserDto, healthElementDto: HealthElement): Promise<PatientDto | undefined> {
    const patientId = await this._getPatientIdOfHealthElement(currentUser, healthElementDto)
    if (patientId) {
      return this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    } else {
      return undefined
    }
  }

  async _getPatientIdOfHealthElement(currentUser: UserDto, healthElement: HealthElement): Promise<string | undefined> {
    return (await this.heApi.decryptPatientIdOf(healthElement))[0]
  }

  async giveAccessTo(healthcareElement: HealthcareElement, delegatedTo: string): Promise<HealthcareElement> {
    const shared = await this.heApi.shareWith(delegatedTo, HealthcareElementMapper.toHealthElementDto(healthcareElement))
    return HealthcareElementMapper.toHealthcareElement(shared)
  }

  async concatenateFilterResults(
    filter: Filter<HealthcareElement>,
    nextId?: string | undefined,
    limit?: number | undefined,
    accumulator: Array<HealthcareElement> = []
  ): Promise<Array<HealthcareElement>> {
    const paginatedHealthcareElements = await this.filterHealthcareElement(filter, nextId, limit)
    return !paginatedHealthcareElements.nextKeyPair?.startKeyDocId
      ? accumulator.concat(paginatedHealthcareElements.rows)
      : this.concatenateFilterResults(
          filter,
          paginatedHealthcareElements.nextKeyPair.startKeyDocId,
          limit,
          accumulator.concat(paginatedHealthcareElements.rows)
        )
  }

  async getHealthcareElementsForPatient(patient: Patient): Promise<Array<HealthcareElement>> {
    const user = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    if (!user) {
      throw this.errorHandler.createErrorWithMessage(
        'There is no user currently logged in. You must call this method from an authenticated MedTechApi.'
      )
    }
    const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(user)
    if (!dataOwnerId) {
      throw this.errorHandler.createErrorWithMessage(
        'The current user is not a data owner. You must been either a patient, a device or a healthcare professional to call this method.'
      )
    }
    const filter = await new HealthcareElementFilter().forDataOwner(dataOwnerId).forPatients(this.cryptoApi, [patient]).build()
    return await this.concatenateFilterResults(filter)
  }

  async subscribeToHealthcareElementEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<HealthcareElement> | undefined,
    eventFired: (dataSample: HealthcareElement) => Promise<void>,
    options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number } = {}
  ): Promise<Connection> {
    const currentUser = await this.userApi.getCurrentUser()

    return subscribeToEntityEvents(
      this.basePath,
      this.authApi,
      'HealthcareElement',
      eventTypes,
      filter,
      eventFired,
      options,
      async (encrypted) => (await this.heApi.decrypt(this.dataOwnerApi.getDataOwnerIdOf(currentUser), [encrypted]))[0]
    ).then((rs) => new ConnectionImpl(rs))
  }
}

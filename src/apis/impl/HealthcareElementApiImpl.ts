import {HealthcareElement} from '../../models/HealthcareElement'
import {Filter} from '../../filter/Filter'
import {PaginatedListHealthcareElement} from '../../models/PaginatedListHealthcareElement'
import {HealthcareElementApi} from '../HealthcareElementApi'
import {
  FilterChainPatient,
  HealthElement,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHcpartyXApi,
  IccHelementXApi,
  IccPatientXApi,
  IccUserXApi,
  Patient as PatientDto,
  User as UserDto,
} from '@icure/api'
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {forceUuid} from '../../mappers/utils'
import {PaginatedListMapper} from '../../mappers/paginatedList'
import {FilterMapper} from '../../mappers/filter'
import {HealthcareElementMapper} from '../../mappers/healthcareElement'
import {firstOrNull} from '../../utils/functionalUtils'
import {Patient} from "../../models/Patient";
import {HealthcareElementFilter} from "../../filter";

export class HealthcareElementApiImpl implements HealthcareElementApi {
  private readonly userApi: IccUserXApi
  private readonly heApi: IccHelementXApi
  private readonly patientApi: IccPatientXApi
  private readonly cryptoApi: IccCryptoXApi
  private readonly dataOwnerApi: IccDataOwnerXApi
  private readonly errorHandler: ErrorHandler

  constructor(
    api: {
      cryptoApi: IccCryptoXApi
      userApi: IccUserXApi
      patientApi: IccPatientXApi
      contactApi: IccContactXApi
      dataOwnerApi: IccDataOwnerXApi
      documentApi: IccDocumentXApi
      healthcarePartyApi: IccHcpartyXApi
      healthcareElementApi: IccHelementXApi
    },
    errorHandler: ErrorHandler,
  ) {
    this.userApi = api.userApi
    this.heApi = api.healthcareElementApi
    this.patientApi = api.patientApi
    this.cryptoApi = api.cryptoApi
    this.dataOwnerApi = api.dataOwnerApi
    this.errorHandler = errorHandler
  }

  async createOrModifyHealthcareElement(healthcareElement: HealthcareElement, patientId?: string): Promise<HealthcareElement> {
    const currentUser = await this.userApi.getCurrentUser().catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    const patient = patientId ? await this.patientApi.getPatientWithUser(currentUser, patientId).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }) : undefined

    let createdOrUpdateHealthElement
    if (healthcareElement.rev) {
      createdOrUpdateHealthElement = await this.heApi.modifyHealthElementWithUser(
        currentUser,
        HealthcareElementMapper.toHealthElementDto(healthcareElement)
      ).catch(e => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    } else if (patient) {
      createdOrUpdateHealthElement = await this.heApi.createHealthElementWithUser(
        currentUser,
        await this.heApi.newInstance(currentUser, patient, HealthcareElementMapper.toHealthElementDto(healthcareElement), true).catch(e => {
          throw this.errorHandler.createErrorFromAny(e)
        })
      )
    }

    if (createdOrUpdateHealthElement) {
      return HealthcareElementMapper.toHealthcareElement(createdOrUpdateHealthElement)!
    }

    throw this.errorHandler.createErrorWithMessage(`Could not create / modify healthElement ${healthcareElement.id}`)
  }

  async createOrModifyHealthcareElements(healthcareElements: Array<HealthcareElement>, patientId?: string): Promise<Array<HealthcareElement>> {
    const heToCreate = healthcareElements.filter((he) => !he.rev)
    const heToUpdate = healthcareElements.filter((he) => !!he.rev)
    const currentUser = await this.userApi.getCurrentUser().catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    const patient = patientId ? await this.patientApi.getPatientWithUser(currentUser, patientId).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }) : undefined

    if (!heToUpdate.every((he) => he.id != null && forceUuid(he.id))) {
      throw this.errorHandler.createErrorWithMessage('Update id should be provided as an UUID')
    }

    if (!patient && heToCreate.length > 0) {
      throw this.errorHandler.createErrorWithMessage('Patient id should be provided to create new healthcare elements')
    }

    const hesCreated = await Promise.all(
      heToCreate.map((he) => HealthcareElementMapper.toHealthElementDto(he)).map((he) => this.heApi.newInstance(currentUser, patient, he, true))
    ).then((healthElementsToCreate) => this.heApi.createHealthElementsWithUser(currentUser, healthElementsToCreate))
      .catch(e => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    const hesUpdated = await this.heApi.modifyHealthElementsWithUser(
      currentUser,
      heToUpdate.map((he) => HealthcareElementMapper.toHealthElementDto(he))
    ).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    return [...hesCreated, ...hesUpdated].map((he) => HealthcareElementMapper.toHealthcareElement(he))
  }

  async deleteHealthcareElement(id: string): Promise<string> {
    const deletedHeRev = firstOrNull(await this.heApi.deleteHealthElements(id).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }))?.rev
    if (deletedHeRev) {
      return deletedHeRev
    }
    throw this.errorHandler.createErrorWithMessage(`Could not delete healthElement ${id}`)
  }

  async filterHealthcareElement(
    filter: Filter<HealthcareElement>,
    nextHealthElementId?: string,
    limit?: number
  ): Promise<PaginatedListHealthcareElement> {
    return PaginatedListMapper.toPaginatedListHealthcareElement(
      await this.heApi.filterHealthElementsBy(
        nextHealthElementId,
        limit,
        new FilterChainPatient({
          filter: FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement'),
        })
      ).catch(e => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    )!
  }

  async getHealthcareElement(id: string): Promise<HealthcareElement> {
    const currentUser = await this.userApi.getCurrentUser().catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    return HealthcareElementMapper.toHealthcareElement(await this.heApi.getHealthElementWithUser(currentUser, id).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }))
  }

  async matchHealthcareElement(filter: Filter<HealthcareElement>): Promise<Array<string>> {
    return this.heApi.matchHealthElementsBy(FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement')).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })
  }

  async _getPatientOfHealthElement(
    currentUser: UserDto,
    healthElementDto: HealthElement
  ): Promise<PatientDto | undefined> {
    const patientId = await this._getPatientIdOfHealthElement(currentUser, healthElementDto);
    if (patientId) {
      return this.patientApi.getPatientWithUser(currentUser, patientId).catch(e => {
        throw this.errorHandler.createErrorFromAny(e)
      });
    } else {
      return undefined;
    }
  }

  async _getPatientIdOfHealthElement(
    currentUser: UserDto,
    healthElement: HealthElement
  ): Promise<string | undefined> {
    const keysFromDeleg =
      await this.cryptoApi.extractKeysHierarchyFromDelegationLikes(
        this.dataOwnerApi.getDataOwnerOf(currentUser),
        healthElement.id!,
        healthElement.cryptedForeignKeys!
      );
    return keysFromDeleg
      .map((key) =>
        key.extractedKeys.length > 0 ? key.extractedKeys[0] : undefined
      )
      .find((key) => key != undefined);
  }

  async giveAccessTo(healthcareElement: HealthcareElement, delegatedTo: string): Promise<HealthcareElement> {
    const currentUser = await this.userApi.getCurrentUser().catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    const dataOwnerId = this.dataOwnerApi.getDataOwnerOf(currentUser)
    const healthElementToModify = HealthcareElementMapper.toHealthElementDto(healthcareElement)!

    if (healthElementToModify.delegations == undefined || healthElementToModify.delegations[dataOwnerId].length == 0) {
      throw this.errorHandler.createErrorWithMessage(`User ${currentUser.id} may not access healthcare element`)
    }

    if (healthElementToModify.delegations[delegatedTo] != undefined) {
      return healthcareElement;
    }

    const healthcareElementPatient = await this._getPatientOfHealthElement(currentUser, healthElementToModify)
    if (healthcareElementPatient == undefined) {
      throw this.errorHandler.createErrorWithMessage(`User ${currentUser.id} may not access healthcare element ${healthElementToModify.id}`)
    }

    return this.cryptoApi
      .extractDelegationsSFKs(healthElementToModify, dataOwnerId)
      .then((delKeys) => {
        if (delKeys.extractedKeys.length == 0) {
          throw this.errorHandler.createErrorWithMessage(`User ${currentUser.id} could not decrypt secret info of healthcare element ${healthElementToModify.id}`)
        }
        return delKeys.extractedKeys.shift()!
      })
      .then(async (secretKey) => {
        const newKeys = await this.cryptoApi.extendedDelegationsAndCryptedForeignKeys(healthElementToModify, healthcareElementPatient, dataOwnerId, delegatedTo, secretKey);
        return new HealthElement({
          ...healthElementToModify,
          delegations: newKeys.delegations,
          cryptedForeignKeys: newKeys.cryptedForeignKeys
        })
      })
      .then(async (heWithNewDelegationsAndCryptedFKeys) => {
        return {
          he: heWithNewDelegationsAndCryptedFKeys,
          encKeys: await this.cryptoApi.extractEncryptionsSKs(heWithNewDelegationsAndCryptedFKeys, dataOwnerId)
        }
      })
      .then(({he, encKeys}) => {
        if (encKeys.extractedKeys.length == 0) {
          throw this.errorHandler.createErrorWithMessage(`User ${currentUser.id} could not decrypt secret info of healthcare element ${healthElementToModify.id}`)
        }

        return {he: he, encKey: encKeys.extractedKeys.shift()!}
      })
      .then(({
               he,
               encKey
             }) => this.cryptoApi.addDelegationsAndEncryptionKeys(null, he, dataOwnerId, delegatedTo, null, encKey))
      .then((healthElementWithUpdatedAccesses) => this.heApi.modifyHealthElementWithUser(currentUser, healthElementWithUpdatedAccesses))
      .then((updatedHealthElement) => {
        if (!updatedHealthElement) {
          throw this.errorHandler.createErrorWithMessage(`Impossible to give access to ${delegatedTo} to healthcare element ${healthElementToModify.id} information`)
        }

        return HealthcareElementMapper.toHealthcareElement(updatedHealthElement)!
      })
  }

  async concatenateFilterResults(filter: Filter<HealthcareElement>, nextId?: string | undefined, limit?: number | undefined, accumulator: Array<HealthcareElement> = []): Promise<Array<HealthcareElement>> {
    const paginatedHealthcareElements = await this.filterHealthcareElement(filter, nextId, limit);
    return !paginatedHealthcareElements.nextKeyPair?.startKeyDocId
      ? accumulator.concat(paginatedHealthcareElements.rows)
      : this.concatenateFilterResults(filter, paginatedHealthcareElements.nextKeyPair.startKeyDocId, limit, accumulator.concat(paginatedHealthcareElements.rows))
  }

  async getHealthcareElementsForPatient(patient: Patient): Promise<Array<HealthcareElement>> {
    const user = await this.userApi.getCurrentUser().catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    });
    if (!user) {
      throw this.errorHandler.createErrorWithMessage("There is no user currently logged in")
    }
    const dataOwnerId = this.dataOwnerApi.getDataOwnerOf(user);
    if (!dataOwnerId) {
      throw this.errorHandler.createErrorWithMessage("There is no user currently logged in")
    }
    const filter = await new HealthcareElementFilter()
      .forDataOwner(dataOwnerId)
      .forPatients(this.cryptoApi, [patient])
      .build()
    return await this.concatenateFilterResults(filter);
  }
}

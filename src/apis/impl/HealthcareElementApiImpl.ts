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
import {DataSampleFilter, HealthcareElementFilter} from "../../filter";

export class HealthcareElementApiImpl implements HealthcareElementApi {
  private readonly userApi: IccUserXApi
  private readonly heApi: IccHelementXApi
  private readonly patientApi: IccPatientXApi
  private readonly cryptoApi: IccCryptoXApi
  private readonly dataOwnerApi: IccDataOwnerXApi

  constructor(api: {
    cryptoApi: IccCryptoXApi
    userApi: IccUserXApi
    patientApi: IccPatientXApi
    contactApi: IccContactXApi
    dataOwnerApi: IccDataOwnerXApi
    documentApi: IccDocumentXApi
    healthcarePartyApi: IccHcpartyXApi
    healthcareElementApi: IccHelementXApi
  }) {
    this.userApi = api.userApi
    this.heApi = api.healthcareElementApi
    this.patientApi = api.patientApi
    this.cryptoApi = api.cryptoApi
    this.dataOwnerApi = api.dataOwnerApi
  }

  async createOrModifyHealthcareElement(healthcareElement: HealthcareElement, patientId?: string): Promise<HealthcareElement> {
    const currentUser = await this.userApi.getCurrentUser()
    const patient = patientId ? await this.patientApi.getPatientWithUser(currentUser, patientId) : undefined

    let createdOrUpdateHealthElement
    if (healthcareElement.rev) {
      createdOrUpdateHealthElement = await this.heApi.modifyHealthElementWithUser(
        currentUser,
        HealthcareElementMapper.toHealthElementDto(healthcareElement)
      )
    } else if (patient) {
      createdOrUpdateHealthElement = await this.heApi.createHealthElementWithUser(
        currentUser,
        await this.heApi.newInstance(currentUser, patient, HealthcareElementMapper.toHealthElementDto(healthcareElement), true)
      )
    }

    if (createdOrUpdateHealthElement) {
      return HealthcareElementMapper.toHealthcareElement(createdOrUpdateHealthElement)!
    }

    throw Error(`Could not create / modify healthElement ${healthcareElement.id}`)
  }

  async createOrModifyHealthcareElements(healthcareElements: Array<HealthcareElement>, patientId?: string): Promise<Array<HealthcareElement>> {
    const heToCreate = healthcareElements.filter((he) => !he.rev)
    const heToUpdate = healthcareElements.filter((he) => !!he.rev)
    const currentUser = await this.userApi.getCurrentUser()
    const patient = patientId ? await this.patientApi.getPatientWithUser(currentUser, patientId) : undefined

    if (!heToUpdate.every((he) => he.id != null && forceUuid(he.id))) {
      throw Error('Update id should be provided as an UUID')
    }

    if (!patient && heToCreate.length > 0) {
      throw Error('patientId is required when creating a new healthcare element')
    }

    const hesCreated = await Promise.all(
      heToCreate.map((he) => HealthcareElementMapper.toHealthElementDto(he)).map((he) => this.heApi.newInstance(currentUser, patient, he, true))
    ).then((healthElementsToCreate) => this.heApi.createHealthElementsWithUser(currentUser, healthElementsToCreate))
    const hesUpdated = await this.heApi.modifyHealthElementsWithUser(
      currentUser,
      heToUpdate.map((he) => HealthcareElementMapper.toHealthElementDto(he))
    )

    return [...hesCreated, ...hesUpdated].map((he) => HealthcareElementMapper.toHealthcareElement(he))
  }

  async deleteHealthcareElement(id: string): Promise<string> {
    const deletedHeRev = firstOrNull(await this.heApi.deleteHealthElements(id))?.rev
    if (deletedHeRev) {
      return deletedHeRev
    }
    throw Error(`Could not delete healthcare element ${id}`)
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
      )
    )!
  }

  async getHealthcareElement(id: string): Promise<HealthcareElement> {
    const currentUser = await this.userApi.getCurrentUser()
    return HealthcareElementMapper.toHealthcareElement(await this.heApi.getHealthElementWithUser(currentUser, id))
  }

  async matchHealthcareElement(filter: Filter<HealthcareElement>): Promise<Array<string>> {
    return this.heApi.matchHealthElementsBy(FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement'))
  }

  async _getPatientOfHealthElement(
    currentUser: UserDto,
    healthElementDto: HealthElement
  ): Promise<PatientDto | undefined> {
    let patientId = await this._getPatientIdOfHealthElement(currentUser, healthElementDto);
    if (patientId) {
      return this.patientApi.getPatientWithUser(currentUser, patientId);
    } else {
      return undefined;
    }
  }

  async _getPatientIdOfHealthElement(
    currentUser: UserDto,
    healthElement: HealthElement
  ): Promise<string | undefined> {
    let keysFromDeleg =
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
    const currentUser = await this.userApi.getCurrentUser()
    const dataOwnerId = this.dataOwnerApi.getDataOwnerOf(currentUser)
    const healthElementToModify = HealthcareElementMapper.toHealthElementDto(healthcareElement)!

    if (healthElementToModify.delegations == undefined || healthElementToModify.delegations[dataOwnerId].length == 0) {
      throw Error(`User ${currentUser.id} may not access healthcare element information`)
    }

    if (healthElementToModify.delegations[delegatedTo] != undefined) {
      return healthcareElement;
    }

    const healthcareElementPatient = await this._getPatientOfHealthElement(currentUser, healthElementToModify)
    if (healthcareElementPatient == undefined) {
      throw Error(`User ${currentUser.id} may not access patient identifier of healthcare element ${healthElementToModify.id}`)
    }

    return this.cryptoApi
      .extractDelegationsSFKs(healthElementToModify, dataOwnerId)
      .then((delKeys) => {
        if (delKeys.extractedKeys.length == 0) {
          throw Error(`User ${currentUser.id} could not decrypt secret info of healthcare element ${healthElementToModify.id}`)
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
          throw Error(`User ${currentUser.id} could not decrypt secret info of healthcare element ${healthElementToModify.id}`)
        }

        return {he: he, encKey: encKeys.extractedKeys.shift()!}
      })
      .then(({he, encKey}) => this.cryptoApi.addDelegationsAndEncryptionKeys(null, he, dataOwnerId, delegatedTo, null, encKey))
      .then((healthElementWithUpdatedAccesses) => this.heApi.modifyHealthElementWithUser(currentUser, healthElementWithUpdatedAccesses))
      .then((updatedHealthElement) => {
        if (!updatedHealthElement) {
          throw Error(`Impossible to give access to ${delegatedTo} to healthcare element ${healthElementToModify.id} information`)
        }

        return HealthcareElementMapper.toHealthcareElement(updatedHealthElement)!
      })
  }

  async getHealthcareElementsForPatient(patient: Patient): Promise<PaginatedListHealthcareElement> {
    return this.userApi.getCurrentUser().then( user => {
      if (!user) throw new Error("There is no user currently logged in");
      const dataOwnerId = user.healthcarePartyId ?? user.patientId ?? user.deviceId;
      if (!dataOwnerId) throw new Error("User is not a Data Owner");
      return new HealthcareElementFilter()
        .forDataOwner(dataOwnerId)
        .forPatients(this.cryptoApi, [patient])
        .build()
        .then( filter => {
          return this.filterHealthcareElement(filter);
        })
    });
  }

}

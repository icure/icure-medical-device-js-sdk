import {HealthcareElement} from "../../models/HealthcareElement";
import {Filter} from "../../filter/Filter";
import {PaginatedListHealthcareElement} from "../../models/PaginatedListHealthcareElement";
import {HealthcareElementApi} from "../HealthcareElementApi";
import {FilterChainPatient, IccDocumentXApi, IccPatientXApi, IccUserXApi, IccHcpartyXApi, IccCryptoXApi, IccContactXApi, IccHelementXApi} from "@icure/api";
import {forceUuid} from "../../mappers/utils";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {HealthcareElementMapper} from "../../mappers/healthcareElement";
import {firstOrNull} from "../../utils/functionalUtils";

export class HealthcareElementApiImpl implements HealthcareElementApi {
  private readonly userApi: IccUserXApi;
  private readonly heApi: IccHelementXApi;
  private readonly patientApi: IccPatientXApi;
  private readonly cryptoApi: IccCryptoXApi;

  constructor(api: { cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; documentApi: IccDocumentXApi; healthcarePartyApi: IccHcpartyXApi, healthcareElementApi: IccHelementXApi}) {
    this.userApi = api.userApi;
    this.heApi = api.healthcareElementApi;
    this.patientApi = api.patientApi;
    this.cryptoApi = api.cryptoApi;
  }

  async createOrModifyHealthcareElement(healthcareElement: HealthcareElement, patientId?: string): Promise<HealthcareElement> {
    const currentUser = await this.userApi.getCurrentUser();
    const patient = patientId ? await this.patientApi.getPatientWithUser(currentUser, patientId) : undefined

    let createdOrUpdateHealthElement;
    if (healthcareElement.rev) {
      createdOrUpdateHealthElement = await this.heApi.modifyHealthElementWithUser(currentUser, HealthcareElementMapper.toHealthElementDto(healthcareElement));
    } else if (patient) {
      createdOrUpdateHealthElement = await this.heApi.createHealthElementWithUser(currentUser, await this.heApi.newInstance(currentUser, patient, HealthcareElementMapper.toHealthElementDto(healthcareElement), true));
    }

    if (createdOrUpdateHealthElement) {
      return HealthcareElementMapper.toHealthcareElement(createdOrUpdateHealthElement)!;
    }

    throw Error(`Could not create / modify healthElement ${healthcareElement.id}`)
  }

  async createOrModifyHealthcareElements(healthcareElements: Array<HealthcareElement>, patientId?: string): Promise<Array<HealthcareElement>> {
    const heToCreate = healthcareElements.filter(he => !he.rev)
    const heToUpdate = healthcareElements.filter(he => !!he.rev)
    const currentUser = await this.userApi.getCurrentUser();
    const patient = patientId ? await this.patientApi.getPatientWithUser(currentUser, patientId) : undefined

    if (!heToUpdate.every(he => he.id != null && forceUuid(he.id))) {
      throw Error("Update id should be provided as an UUID");
    }

    if (!patient && heToCreate.length > 0) {
      throw Error("patientId is required when creating a new healthcare element");
    }

    const hesCreated = await Promise.all(heToCreate
      .map((he) => HealthcareElementMapper.toHealthElementDto(he))
      .map((he) => this.heApi.newInstance(currentUser, patient, he, true))
    )
      .then((healthElementsToCreate) => this.heApi.createHealthElementsWithUser(currentUser, healthElementsToCreate))
    const hesUpdated = await this.heApi.modifyHealthElementsWithUser(currentUser, heToUpdate.map(he => HealthcareElementMapper.toHealthElementDto(he)))

    return [...hesCreated, ...hesUpdated].map(he => HealthcareElementMapper.toHealthcareElement(he))
  }

  async deleteHealthcareElement(id: string): Promise<string> {
    const deletedHeRev = firstOrNull(await this.heApi.deleteHealthElements(id))?.rev
    if (deletedHeRev) {
      return deletedHeRev
    }
    throw Error(`Could not delete healthcare element ${id}`)
  }

  async filterHealthcareElement(filter: Filter<HealthcareElement>, nextHealthElementId?: string, limit?: number): Promise<PaginatedListHealthcareElement> {
    return PaginatedListMapper.toPaginatedListHealthcareElement(await this.heApi.filterHealthElementsBy(nextHealthElementId, limit, new FilterChainPatient({
      filter: FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement')
    })))!
  }

  async getHealthcareElement(id: string): Promise<HealthcareElement> {
    return HealthcareElementMapper.toHealthcareElement(await this.heApi.getHealthElement(id))
  }

  async matchHealthcareElement(filter: Filter<HealthcareElement>): Promise<Array<string>> {
    return this.heApi.matchHealthElementsBy(FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement'));
  }

  async giveAccessTo(healthcareElement: HealthcareElement, delegatedTo: string): Promise<HealthcareElement> {
    const currentUser = await this.userApi.getCurrentUser()
    const dataOwnerId = this.userApi.getDataOwnerOf(currentUser)
    const healthElementToModify = HealthcareElementMapper.toHealthElementDto(healthcareElement)!

    if (healthElementToModify.delegations == undefined || healthElementToModify.delegations[delegatedTo].length == 0) {
      throw Error(`User ${currentUser.id} may not access health element information`)
    }

    return await this.cryptoApi.extractPreferredSfk(healthElementToModify, dataOwnerId, true)
      .then((secretKey) => {
        if (!secretKey) {
          throw Error(`User ${currentUser.id} could not decrypt secret info of health element ${healthElementToModify.id}`)
        }
        return secretKey
      })
      .then((secretKey) => this.cryptoApi.addDelegationsAndEncryptionKeys(null, healthElementToModify, dataOwnerId, delegatedTo, secretKey, null))
      .then((patientWithNewDelegations) => this.cryptoApi.extractEncryptionsSKs(patientWithNewDelegations, dataOwnerId))
      .then((encKeys) => {
        if (encKeys.extractedKeys.length == 0) {
          throw Error(`User ${currentUser.id} could not decrypt secret info of health element ${healthElementToModify.id}`)
        }

        return encKeys.extractedKeys.shift()!
      })
      .then((encKey) => this.cryptoApi.addDelegationsAndEncryptionKeys(null, healthElementToModify, dataOwnerId, delegatedTo, null, encKey))
      .then((healthElementWithUpdatedAccesses) => this.heApi.modifyHealthElementWithUser(currentUser, healthElementWithUpdatedAccesses))
      .then((updatedHealthElement) => {
        if (!updatedHealthElement) {
          throw Error(`Impossible to give access to ${delegatedTo} to health element ${healthElementToModify.id} information`)
        }

        return HealthcareElementMapper.toHealthcareElement(updatedHealthElement)!
      })
  }
}

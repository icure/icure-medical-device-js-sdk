import {HealthcareProfessional} from "../../models/HealthcareProfessional";
import {Filter} from "../../filter/Filter";
import {PaginatedListHealthcareProfessional} from "../../models/PaginatedListHealthcareProfessional";
import {HealthcareProfessionalApi} from "../HealthcareProfessionalApi";
import {
  FilterChainHealthcareParty,
  IccDocumentXApi,
  IccPatientXApi,
  IccUserXApi,
  IccCryptoXApi,
  IccHcpartyXApi,
  IccContactXApi,
  IccHelementXApi
} from "@icure/api";
import {HealthcareProfessionalMapper} from "../../mappers/healthcareProfessional";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {firstOrNull} from "../../utils/functionalUtils";

export class HealthcareProfessionalApiImpl implements HealthcareProfessionalApi {
  userApi: IccUserXApi;
  hcpApi: IccHcpartyXApi;

  constructor(api: { cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; documentApi: IccDocumentXApi; healthcarePartyApi: IccHcpartyXApi, healthcareElementApi: IccHelementXApi}) {
    this.userApi = api.userApi;
    this.hcpApi = api.healthcarePartyApi;
  }

  async createOrModifyHealthcareProfessional(healthcareProfessional: HealthcareProfessional): Promise<HealthcareProfessional> {
    let createdOrModifyHealthcareParty = healthcareProfessional.rev
      ? await this.hcpApi.modifyHealthcareParty(HealthcareProfessionalMapper.toHealthcarePartyDto(healthcareProfessional))
      : await this.hcpApi.createHealthcareParty(HealthcareProfessionalMapper.toHealthcarePartyDto(healthcareProfessional))

    if (createdOrModifyHealthcareParty) {
      return HealthcareProfessionalMapper.toHealthcareProfessional(createdOrModifyHealthcareParty)!;
    }

    throw Error(`Could not create / modify healthcare professional ${healthcareProfessional.id}`)
  }

  async deleteHealthcareProfessional(hcpId: string): Promise<string> {
    const deletedHcpRev = firstOrNull(await this.hcpApi.deleteHealthcareParties(hcpId))?.rev
    if (deletedHcpRev) {
      return deletedHcpRev
    }
    throw Error(`Could not delete healthcare professional ${hcpId}`)
  }

  async filterHealthcareProfessionalBy(filter: Filter<HealthcareProfessional>, nextHcpId?: string, limit?: number): Promise<PaginatedListHealthcareProfessional> {
    return PaginatedListMapper.toPaginatedListHealthcareProfessional(await this.hcpApi.filterHealthPartiesBy(nextHcpId, limit, new FilterChainHealthcareParty({
      filter: FilterMapper.toAbstractFilterDto<HealthcareProfessional>(filter, 'HealthcareProfessional')
    })))!
  }

  async getHealthcareProfessional(hcpId: string): Promise<HealthcareProfessional> {
    return HealthcareProfessionalMapper.toHealthcareProfessional(await this.hcpApi.getHealthcareParty(hcpId, false))
  }

  async matchHealthcareProfessionalBy(filter: Filter<HealthcareProfessional>): Promise<Array<string>> {
    return await this.hcpApi.matchHealthcarePartiesBy(FilterMapper.toAbstractFilterDto<HealthcareProfessional>(filter, 'HealthcareProfessional'));
  }
}

import {HealthcareProfessional} from "../../models/HealthcareProfessional";
import {Filter} from "../../filter/Filter";
import {PaginatedListHealthcareProfessional} from "../../models/PaginatedListHealthcareProfessional";
import {HealthcareProfessionalApi} from "../HealthcareProfessionalApi";
import {
  FilterChainHealthcareParty,
  IccAuthApi,
  IccCodeApi,
  IccDocumentXApi,
  IccPatientXApi,
  IccUserXApi
} from "@icure/api";
import {IccCryptoXApi} from "@icure/api/icc-x-api/icc-crypto-x-api";
import {IccHcpartyXApi} from "@icure/api/icc-x-api/icc-hcparty-x-api";
import {IccContactXApi} from "@icure/api/icc-x-api/icc-contact-x-api";
import {IccHelementXApi} from "@icure/api/icc-x-api/icc-helement-x-api";
import {HealthcareProfessionalMapper} from "../../mappers/healthcareProfessional";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {firstOrNull} from "../../utils/functionalUtils";

class HealthcareProfessionalApiImpl implements HealthcareProfessionalApi {
  userApi: IccUserXApi;
  hcpApi: IccHcpartyXApi;

  constructor(api: { cryptoApi: IccCryptoXApi; codeApi: IccCodeApi, authApi: IccAuthApi; userApi: IccUserXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; documentApi: IccDocumentXApi; }) {
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

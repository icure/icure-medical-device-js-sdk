import {HealthcareProfessional} from "../../models/HealthcareProfessional";
import {Filter} from "../../filter/Filter";
import {PaginatedListHealthcareProfessional} from "../../models/PaginatedListHealthcareProfessional";
import {HealthcareProfessionalApi} from "../HealthcareProfessionalApi";
import {
  FilterChainHealthcareParty,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHcpartyXApi,
  IccHelementXApi,
  IccPatientXApi,
  IccUserXApi
} from "@icure/api";
import {HealthcareProfessionalMapper} from "../../mappers/healthcareProfessional";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {firstOrNull} from "../../utils/functionalUtils";
import {ErrorHandler} from "../../services/ErrorHandler";

export class HealthcareProfessionalApiImpl implements HealthcareProfessionalApi {
  private readonly userApi: IccUserXApi;
  private readonly hcpApi: IccHcpartyXApi;
  private readonly errorHandler: ErrorHandler;

  constructor(api: { cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; documentApi: IccDocumentXApi; healthcarePartyApi: IccHcpartyXApi, healthcareElementApi: IccHelementXApi }, errorHandler: ErrorHandler) {
    this.userApi = api.userApi;
    this.hcpApi = api.healthcarePartyApi;
    this.errorHandler = errorHandler;
  }

  async createOrModifyHealthcareProfessional(healthcareProfessional: HealthcareProfessional): Promise<HealthcareProfessional> {
    const createdOrModifyHealthcareParty = healthcareProfessional.rev
      ? await this.hcpApi.modifyHealthcareParty(HealthcareProfessionalMapper.toHealthcarePartyDto(healthcareProfessional)).catch(e => {
        throw this.errorHandler.createErrorFromAny(e)
      })
      : await this.hcpApi.createHealthcareParty(HealthcareProfessionalMapper.toHealthcarePartyDto(healthcareProfessional)).catch(e => {
        throw this.errorHandler.createErrorFromAny(e)
      })

    if (createdOrModifyHealthcareParty) {
      return HealthcareProfessionalMapper.toHealthcareProfessional(createdOrModifyHealthcareParty)!;
    }

    throw this.errorHandler.createErrorWithMessage(`Could not create or modify healthcare professional ${healthcareProfessional.id}`)
  }

  async deleteHealthcareProfessional(hcpId: string): Promise<string> {
    const deletedHcpRev = firstOrNull(await this.hcpApi.deleteHealthcareParties(hcpId).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }))?.rev
    if (deletedHcpRev) {
      return deletedHcpRev
    }
    throw this.errorHandler.createErrorWithMessage(`Could not delete healthcare professional ${hcpId}`)
  }

  async filterHealthcareProfessionalBy(filter: Filter<HealthcareProfessional>, nextHcpId?: string, limit?: number): Promise<PaginatedListHealthcareProfessional> {
    return PaginatedListMapper.toPaginatedListHealthcareProfessional(await this.hcpApi.filterHealthPartiesBy(nextHcpId, limit, new FilterChainHealthcareParty({
      filter: FilterMapper.toAbstractFilterDto<HealthcareProfessional>(filter, 'HealthcareProfessional')
    })).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }))!
  }

  async getHealthcareProfessional(hcpId: string): Promise<HealthcareProfessional> {
    return HealthcareProfessionalMapper.toHealthcareProfessional(await this.hcpApi.getHealthcareParty(hcpId, false).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }))
  }

  async matchHealthcareProfessionalBy(filter: Filter<HealthcareProfessional>): Promise<Array<string>> {
    return await this.hcpApi.matchHealthcarePartiesBy(FilterMapper.toAbstractFilterDto<HealthcareProfessional>(filter, 'HealthcareProfessional')).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    });
  }
}

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

export class HealthcareProfessionalApiImpl implements HealthcareProfessionalApi {
  private readonly userApi: IccUserXApi;
  private readonly hcpApi: IccHcpartyXApi;
  private readonly errorHandler: ErrorHandler;
  private readonly sanitizer: Sanitizer;

  constructor(api: { cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; documentApi: IccDocumentXApi; healthcarePartyApi: IccHcpartyXApi, healthcareElementApi: IccHelementXApi }, errorHandler: ErrorHandler, sanitizer: Sanitizer) {
    this.userApi = api.userApi;
    this.hcpApi = api.healthcarePartyApi;
    this.errorHandler = errorHandler;
    this.sanitizer = sanitizer;
  }

  async createOrModifyHealthcareProfessional(healthcareProfessional: HealthcareProfessional): Promise<HealthcareProfessional> {
    try {
      const createdOrModifyHealthcareParty = healthcareProfessional.rev
        ? await this.hcpApi.modifyHealthcareParty(HealthcareProfessionalMapper.toHealthcarePartyDto(healthcareProfessional))
        : await this.hcpApi.createHealthcareParty(HealthcareProfessionalMapper.toHealthcarePartyDto(healthcareProfessional))

      if (createdOrModifyHealthcareParty) {
        return HealthcareProfessionalMapper.toHealthcareProfessional(createdOrModifyHealthcareParty)!;
      }

      throw this.errorHandler.createErrorWithMessage(`Could not create or modify healthcare professional ${healthcareProfessional.id}`)
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e);
      }
      throw e;
    }
  }

  async deleteHealthcareProfessional(hcpId: string): Promise<string> {
    try {
      const deletedHcpRev = firstOrNull(await this.hcpApi.deleteHealthcareParties(hcpId))?.rev
      if (deletedHcpRev) {
        return deletedHcpRev
      }
      throw this.errorHandler.createErrorWithMessage(`Could not delete healthcare professional ${hcpId}`)
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e);
      }
      throw e;
    }
  }

  async filterHealthcareProfessionalBy(filter: Filter<HealthcareProfessional>, nextHcpId?: string, limit?: number): Promise<PaginatedListHealthcareProfessional> {
    try {
      return PaginatedListMapper.toPaginatedListHealthcareProfessional(await this.hcpApi.filterHealthPartiesBy(nextHcpId, limit, new FilterChainHealthcareParty({
        filter: FilterMapper.toAbstractFilterDto<HealthcareProfessional>(filter, 'HealthcareProfessional')
      })))!
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e);
      }
      throw e;
    }
  }

  async getHealthcareProfessional(hcpId: string): Promise<HealthcareProfessional> {
    try {
      return HealthcareProfessionalMapper.toHealthcareProfessional(await this.hcpApi.getHealthcareParty(hcpId, false))
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e);
      }
      throw e;
    }
  }

  async matchHealthcareProfessionalBy(filter: Filter<HealthcareProfessional>): Promise<Array<string>> {
    try {
      return await this.hcpApi.matchHealthcarePartiesBy(FilterMapper.toAbstractFilterDto<HealthcareProfessional>(filter, 'HealthcareProfessional'));
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e);
      }
      throw e;
    }
  }
}

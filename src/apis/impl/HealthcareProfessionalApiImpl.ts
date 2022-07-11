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
  IccUserXApi, MaintenanceTask
} from "@icure/api";
import {HealthcareProfessionalMapper} from "../../mappers/healthcareProfessional";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {firstOrNull} from "../../utils/functionalUtils";
import {IccMaintenanceTaskXApi} from "@icure/api/icc-x-api/icc-maintenance-task-x-api";

export class HealthcareProfessionalApiImpl implements HealthcareProfessionalApi {
  private readonly userApi: IccUserXApi;
  private readonly hcpApi: IccHcpartyXApi;
  private readonly maintenanceApi: IccMaintenanceTaskXApi;

  constructor(api: { cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; documentApi: IccDocumentXApi; healthcarePartyApi: IccHcpartyXApi, healthcareElementApi: IccHelementXApi, maintenanceTaskApi: IccMaintenanceTaskXApi}) {
    this.userApi = api.userApi;
    this.hcpApi = api.healthcarePartyApi;
    this.maintenanceApi = api.maintenanceTaskApi;
  }

  async createMaintenanceTask(hcpId: string | undefined, userId: string | undefined): Promise<MaintenanceTask> {
    if(userId === undefined) throw Error("Cannot create delegation for an undefined user");
    return this.userApi.getUser(userId).then( user => {
      if(hcpId === undefined) throw Error("Cannot create delegation for an undefined hcpId");
      return this.maintenanceApi.newInstance(user, {}, undefined, [hcpId])
    });
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

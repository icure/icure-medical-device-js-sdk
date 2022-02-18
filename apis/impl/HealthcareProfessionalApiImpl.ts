import {HealthcareProfessional} from "../../models/HealthcareProfessional";
import {Filter} from "../../models/Filter";
import {PaginatedListHealthcareProfessional} from "../../models/PaginatedListHealthcareProfessional";
import {HealthcareProfessionalApi} from "../HealthcareProfessionalApi";

class HealthcareProfessionalApiImpl implements HealthcareProfessionalApi {
  createOrModifyHealthcareProfessional(healthcareProfessional: HealthcareProfessional): Promise<HealthcareProfessional> {
    return Promise.resolve(undefined);
  }

  deleteHealthcareProfessional(hcpId: string): Promise<string> {
    return Promise.resolve("");
  }

    filterHealthcareProfessionalBy(filter: Filter, nextHcpId?: string, limit?: number): Promise<PaginatedListHealthcareProfessional> {
        return Promise.resolve(undefined);
    }

    getHealthcareProfessional(hcpId: string): Promise<HealthcareProfessional> {
        return Promise.resolve(undefined);
    }

    matchHealthcareProfessionalBy(filter: Filter): Promise<Array<string>> {
        return Promise.resolve(undefined);
    }
}

import {HealthcareElement} from "../../models/HealthcareElement";
import {Filter} from "../../models/Filter";
import {PaginatedListHealthcareElement} from "../../models/PaginatedListHealthcareElement";
import {HealthcareElementApi} from "../HealthcareElementApi";

class HealthcareElementApiImpl implements HealthcareElementApi {
  createOrModifyHealthcareElement(healthcareElement: HealthcareElement): Promise<HealthcareElement> {
    return Promise.resolve(undefined);
  }

  createOrModifyHealthcareElements(healthcareElement: Array<HealthcareElement>): Promise<Array<HealthcareElement>> {
    return Promise.resolve(undefined);
  }

    deleteHealthcareElement(id: string): Promise<string> {
        return Promise.resolve("");
    }

    filterHealthcareElement(filter: Filter): Promise<PaginatedListHealthcareElement> {
        return Promise.resolve(undefined);
    }

    getHealthcareElement(id: string): Promise<HealthcareElement> {
        return Promise.resolve(undefined);
    }

    matchHealthcareElement(filter: Filter): Promise<Array<string>> {
        return Promise.resolve(undefined);
    }
}

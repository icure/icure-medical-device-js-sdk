import {Filter} from "../Filter";
import {HealthcareElement} from "../../models/HealthcareElement";

export interface HealthcareElementByIdsFilter extends Filter<HealthcareElement> {
    description?: string
    ids: string[]
  '$type': 'HealthcareElementByIdsFilter'

}

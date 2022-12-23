import {Filter} from "../Filter";
import {HealthcareProfessional} from "../../models/HealthcareProfessional";

export interface HealthcareProfessionalByNameFilter extends Filter<HealthcareProfessional> {
    description?: string
    name: string
    descending?: boolean
  '$type': 'HealthcareProfessionalByNameFilter'
}

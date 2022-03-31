import {Filter} from "../Filter";
import {HealthcareProfessional} from "../../models/HealthcareProfessional";

export interface HealthcareProfessionalByIdsFilter extends Filter<HealthcareProfessional> {
    description?: string
    ids: string[]
  '$type': 'HealthcareProfessionalByIdsFilter'
}

import {Filter} from "../Filter";
import {HealthcareProfessional} from "../../models/HealthcareProfessional";

export interface HealthcareProfessionalByLabelCodeFilter extends Filter<HealthcareProfessional> {
    codeCode?: string
    codeType?: string
    description?: string
    labelCode?: string
    labelType?: string
    '$type': 'HealthcareProfessionalByLabelCodeFilter'
}

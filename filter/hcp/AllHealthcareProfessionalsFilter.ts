import {HealthcareProfessional} from "../../models/HealthcareProfessional";
import {Filter} from "../Filter";

export interface AllHealthcareProfessionalsFilter extends Filter<HealthcareProfessional> {
    description?: string
}

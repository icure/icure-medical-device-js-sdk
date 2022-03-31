import {Filter} from "../Filter";
import {Patient} from "../../models/Patient";

export interface PatientByIdsFilter extends Filter<Patient> {
    description?: string
    ids: string[]
  '$type': 'PatientByIdsFilter'
}

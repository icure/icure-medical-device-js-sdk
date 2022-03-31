import {Filter} from "../Filter";
import {Patient} from "../../models/Patient";

export interface PatientByHealthcarePartyDateOfBirthBetweenFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId?: string
    minDateOfBirth?: number
    maxDateOfBirth?: number
  '$type': 'PatientByHealthcarePartyDateOfBirthBetweenFilter'
}

import {Patient} from "../../models/Patient";
import {Filter} from "../Filter";
import {Identifier} from "../../models/Identifier";
export interface PatientByHealthcarePartyIdentifiersFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId?: string
    identifiers: Identifier[]
  '$type': 'PatientByHealthcarePartyIdentifiersFilter'
}

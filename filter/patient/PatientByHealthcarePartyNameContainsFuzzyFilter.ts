import {Filter} from "../Filter";
import {Patient} from "../../models/Patient";

export interface PatientByHealthcarePartyNameContainsFuzzyFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId: string
    searchString?: string
}

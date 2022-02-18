import {Filter} from "../Filter";
import {Patient} from "../../models/Patient";

export interface PatientByHealthcarePartySsinsFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId?: string
    minDateOfBirth?: number
    maxDateOfBirth?: number
}

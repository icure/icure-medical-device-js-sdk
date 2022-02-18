import {Filter} from "../Filter";
import {Patient, PatientGenderEnum} from "../../models/Patient";

export interface PatientByHealthcarePartyGenderEducationProfessionFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId?: string
    gender?: PatientGenderEnum
    education?: string
    profession?: string
}

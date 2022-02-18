import {Filter} from "../Filter";
import {Patient} from "../../models/Patient";

export interface PatientByHealthcarePartyFilter extends Filter<Patient> {
    description?: string 
    hcpId: string
}

import {Filter} from "../Filter";
import {HealthcareElement} from "../../models/HealthcareElement";

export interface HealthcareElementByHealthcarePartyPatientFilter extends Filter<HealthcareElement> {
    description?: string 
    healthcarePartyId?: string 
    patientSecretForeignKeys: string[]
}

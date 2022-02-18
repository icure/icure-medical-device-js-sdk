import {Filter} from "../Filter";
import {HealthcareElement} from "../../models/HealthcareElement";

export interface HealthcareElementByHealthcarePartyLabelCodeFilter extends Filter<HealthcareElement> {
    codeCode?: string 
    codeType?: string 
    description?: string 
    healthcarePartyId?: string 
    status?: number 
    tagCode?: string 
    tagType?: string 
}

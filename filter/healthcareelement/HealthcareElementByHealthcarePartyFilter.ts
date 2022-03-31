import {Filter} from "../Filter";
import {HealthcareElement} from "../../models/HealthcareElement";

export interface HealthcareElementByHealthcarePartyFilter extends Filter<HealthcareElement> {
    description?: string
    healthcarePartyId: string
  '$type': 'HealthcareElementByHealthcarePartyFilter'

}

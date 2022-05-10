import {HealthcareElement} from "../../models/HealthcareElement";
import {Filter} from "../Filter";
import {Identifier} from "../../models/Identifier";

export interface HealthcareElementByHealthcarePartyIdentifiersFilter extends Filter<HealthcareElement> {
    description?: string
    healthcarePartyId?: string
    identifiers: Identifier[]
  '$type': 'HealthcareElementByHealthcarePartyIdentifiersFilter'
}

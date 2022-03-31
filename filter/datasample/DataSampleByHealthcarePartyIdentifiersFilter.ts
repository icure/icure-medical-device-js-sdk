import {DataSample} from "../../models/DataSample";
import {Filter} from "../Filter";
import {Identifier} from "../../models/Identifier";
export interface DataSampleByHealthcarePartyIdentifiersFilter extends Filter<DataSample> {
    description?: string
    healthcarePartyId?: string
    identifiers: Identifier[]
  '$type': 'DataSampleByHealthcarePartyIdentifiersFilter'
}

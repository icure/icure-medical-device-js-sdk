import {DataSample} from "../../models/DataSample";
import {Filter} from "../Filter";

export interface DataSampleByHealthcarePartyHealthcareElementIdsFilter extends Filter<DataSample> {
  description?: string
  healthcarePartyId?: string
  healthcareElementIds?: Array<string>
  '$type': 'DataSampleByHealthcarePartyHealthcareElementIdsFilter'
}

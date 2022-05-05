import {DataSample} from "../../models/DataSample";
import {Filter} from "../Filter";

export interface DataSampleByHealthcarePartyHealthElementIdsFilter extends Filter<DataSample> {
  description?: string
  healthcarePartyId?: string
  healthElementIds?: Array<string>
  '$type': 'DataSampleByHealthcarePartyHealthElementIdsFilter'
}

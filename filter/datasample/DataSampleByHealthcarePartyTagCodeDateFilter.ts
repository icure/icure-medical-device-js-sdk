import {Filter} from "../Filter";
import {DataSample} from "../../models/DataSample";

export interface DataSampleByHealthcarePartyTagCodeDateFilter extends Filter<DataSample> {
  description?: string
  healthcarePartyId?: string
  patientSecretForeignKey?: string
  status?: number
  tagCode?: string
  tagType?: string
  codeCode?: string
  codeType?: string
  startValueDate?: number
  endValueDate?: number
  '$type': 'DataSampleByHealthcarePartyTagCodeDateFilter'
}

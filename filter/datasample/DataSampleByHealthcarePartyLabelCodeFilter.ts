import {Filter} from "../Filter";
import {DataSample} from "../../models/DataSample";

export interface DataSampleByHealthcarePartyLabelCodeFilter extends Filter<DataSample> {
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
}

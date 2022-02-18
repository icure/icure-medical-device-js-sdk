import {Filter} from "../Filter";
import {DataSample} from "../../models/DataSample";

export interface DataSampleByHealthcarePartyFilter extends Filter<DataSample> {
    description?: string 
    hcpId: string
}

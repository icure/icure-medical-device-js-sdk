import {Filter} from "../Filter";
import {DataSample} from "../../models/DataSample";

export interface DataSampleByIdsFilter extends Filter<DataSample> {
    description?: string
    ids: string[]
  '$type': 'DataSampleByIdsFilter'
}

import {Coding} from "../../models/Coding";
import {Filter} from "../Filter";

export interface CodingByRegionTypeLabelFilter extends Filter<Coding> {
    description?: string
    label?: string
    language?: string
    region?: string
    type?: string
}

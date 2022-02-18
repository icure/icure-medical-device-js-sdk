import {Coding} from "../../models/Coding";
import {Filter} from "../Filter";

export interface CodingByIdsFilter extends Filter<Coding> {
    description?: string
    ids: string[]
}

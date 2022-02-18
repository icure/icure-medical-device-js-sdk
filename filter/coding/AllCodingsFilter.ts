import {Coding} from "../../models/Coding";
import {Filter} from "../Filter";

export interface AllCodingsFilter extends Filter<Coding> {
    description?: string
}

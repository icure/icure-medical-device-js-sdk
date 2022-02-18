import {Filter} from "./Filter";

export interface IntersectionFilter<O> extends Filter<O> {
    description?: string
    filters: Filter<O>[]
}

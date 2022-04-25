import {Filter} from "./Filter";

export interface UnionFilter<O> extends Filter<O> {
    description?: string
    filters: Filter<O>[]
    '$type': 'UnionFilter'
}

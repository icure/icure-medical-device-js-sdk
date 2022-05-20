import {Filter} from "./Filter";

export interface ComplementFilter<O> extends Filter<O> {
    description?: string
    subSet: Filter<O>
    superSet: Filter<O>
    '$type': 'ComplementFilter'
}

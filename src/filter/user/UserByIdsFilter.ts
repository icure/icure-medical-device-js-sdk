import {Filter} from "../Filter";
import {User} from "../../models/User";

export interface UserByIdsFilter extends Filter<User> {
    description?: string
    ids: string[]
  '$type': 'UserByIdsFilter'
}

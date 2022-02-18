import {User} from "../../models/User";
import {Filter} from "../Filter";

export interface AllUsersFilter extends Filter<User> {
    description?: string
}

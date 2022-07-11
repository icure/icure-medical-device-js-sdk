import {Filter} from "../Filter";
import {User} from "../../models/User";

export interface UserByPatientIdFilter extends Filter<User> {
    description?: string
    patientId: string
  '$type': 'UserByPatientIdFilter'
}

import {Filter} from "../Filter";
import {User} from "../../models/User";

export interface UsersByPatientIdFilter extends Filter<User> {
    description?: string
    patientId: string
    '$type': 'UsersByPatientIdFilter'
}

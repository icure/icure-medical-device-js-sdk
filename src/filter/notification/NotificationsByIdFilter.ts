import {Filter} from "../Filter";
import {Notification} from "../../models/Notification";

export interface NotificationsByIdFilter extends Filter<Notification>{
  description?: string
  ids: string[]
  '$type': 'NotificationsByIdFilter'
}

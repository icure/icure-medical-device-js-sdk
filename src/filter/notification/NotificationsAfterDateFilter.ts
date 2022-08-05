import {Filter} from "../Filter";
import {Notification} from "../../models/Notification";

export interface NotificationsAfterDateFilter extends Filter<Notification> {
  description?: string
  date: number
  '$type': 'NotificationsAfterDateFilter'
}

import {Filter} from "../Filter";
import {Notification} from "../../models/Notification";

export interface NotificationsByHcPartyAndTypeFilter extends Filter<Notification> {
  description?: string
  healthcarePartyId?: string
  type?: string
  '$type': 'NotificationsByHcPartyAndTypeFilter'
}

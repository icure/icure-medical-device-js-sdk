import {Notification} from "../models/Notification";
import {Filter} from "../filter/Filter";

export interface NotificationApi {

  createOrModifyNotification(notification: Notification): Promise<Notification>;

  getNotification(notificationId: string): Promise<Notification>;

  filterNotifications(filter: Filter<Notification>): void; // TODO add NotificationPaginatedList

  deleteNotification(notificationId: string): Promise<string>;

  deleteNotifications(requestBody: Array<string>): Promise<Array<string>>;

}

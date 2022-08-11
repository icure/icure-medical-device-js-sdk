import {Notification} from "../models/Notification";
import {Filter} from "../filter/Filter";
import {PaginatedListNotification} from "../models/PaginatedListNotification";

export interface NotificationApi {
  /**
   * This method creates a Notification if the rev field is undefined, otherwise it updates an existing one.
   * @param notification the Notification to create or modify.
   * @param delegate the id of the Healthcare Party to delegate.
   * @return a Promise containing the Notification or undefined if something goes wrong.
   */
  createOrModifyNotification(notification: Notification, delegate?: string): Promise<Notification | undefined>;

  /**
   * This method deletes the Notification with the provided id.
   * @param notificationId the id of the Notification to delete
   * @return a Promise containing the id of the Notification or undefined if something goes wrong.
   */
  deleteNotification(notificationId: string): Promise<string | undefined>;

  /**
   * Filters are complex selectors that are built by combining basic building blocks. This method returns a paginated list of Notification (with a cursor that lets you query the following items).
   * Load patients from the database by filtering them using the provided [filter].
   * @param filter The Filter object that describes which condition(s) the elements which the ids should be returned must fulfill
   * @param nextPatientId The id of the first patient in the next page
   * @param limit The number of patients to return in the queried page
   * @return a Promise containing the PaginatedList of Notification objects
   */
  filterNotifications(filter: Filter<Notification>, nextNotificationId?: string, limit?: number): Promise<PaginatedListNotification>

  /**
   * This method returns a Promise containing the Notification with the specified id.
   * @param notificationId the id of the Notification to retrieve.
   * @return a Promise containing the Notification or undefined if something goes wrong.
   */
  getNotification(notificationId: string): Promise<Notification | undefined>;
}
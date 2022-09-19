import {MaintenanceTaskStatusEnum, Notification} from '../models/Notification'
import {Filter} from '../filter/Filter'
import {PaginatedListNotification} from '../models/PaginatedListNotification'
import {Connection} from "../models/Connection";

export interface NotificationApi {
  /**
   * This method creates a Notification if the rev field is undefined, otherwise it updates an existing one.
   * @param notification the Notification to create or modify.
   * @param delegate the id of the Healthcare Party to delegate.
   * @return a Promise containing the Notification or undefined if something goes wrong.
   */
  createOrModifyNotification(notification: Notification, delegate?: string): Promise<Notification | undefined>

  /**
   * This method deletes the Notification with the provided id.
   * @param notificationId the id of the Notification to delete
   * @return a Promise containing the id of the Notification or undefined if something goes wrong.
   */
  deleteNotification(notificationId: string): Promise<string | undefined>

  /**
   * Filters are complex selectors that are built by combining basic building blocks. This method returns a paginated list of Notification (with a cursor that lets you query the following items).
   * Load notifications from the database by filtering them using the provided [filter].
   * @param filter The Filter object that describes which condition(s) the elements which the ids should be returned must fulfill
   * @param nextNotificationId The id of the first notification in the next page
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

  /**
   * Gets all the Notifications with status "pending" that the current dataOwner can access
   * @return an Array of the Notifications matching those criteria
   */
  getPendingNotifications(): Promise<Array<Notification>>;

  /**
   * Updates the status of a Notification.
   * @param notification the Notification to update
   * @param newStatus the new status
   * @return the updated Notification
   */
  updateNotificationStatus(notification: Notification, newStatus: MaintenanceTaskStatusEnum): Promise<Notification | undefined>;

  /**
   * Opens a WebSocket Connection in order to receive all the Notification corresponding to specific filter criteria.
   * @param eventTypes Type of event you would like to listen. It can be CREATE, UPDATE or DELETE
   * @param filter Filter criteria to filter to the notification you would like to receive
   * @param eventFired Action applied each time you receive a notification through the WebSocket
   * @param options Options to configure the WebSocket.
   *    - keepAlive : How long to keep connection alive (ms);
   *    - lifetime : How long to keep the WebSocket alive (ms);
   *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
   *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
   */
  subscribeToNotificationEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<Notification>,
    eventFired: (dataSample: Notification) => Promise<void>,
    options?: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
  ): Promise<Connection>
}

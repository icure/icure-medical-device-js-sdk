import {NotificationApi} from "../NotificationApi";
import {Notification} from "../../models/Notification";
import {FilterChainMaintenanceTask, IccHcpartyXApi, IccUserXApi, MaintenanceTask, User} from "@icure/api";
import {IccMaintenanceTaskXApi} from "@icure/api/icc-x-api/icc-maintenance-task-x-api";
import {NotificationMapper} from "../../mappers/notification";
import {PaginatedListNotification} from "../../models/PaginatedListNotification";
import {Filter} from "../../filter/Filter";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {systemMetaDataEncryptedEquality} from "../../utils/equality";
import {Connection, ConnectionImpl} from "../../models/Connection";
import {subscribeToEntityEvents} from "../../utils/rsocket";

export class NotificationApiImpl implements NotificationApi {

  private readonly userApi: IccUserXApi;
  private readonly maintenanceTaskApi: IccMaintenanceTaskXApi;
  private readonly hcpApi: IccHcpartyXApi;


  private readonly basePath: string
  private readonly username?: string
  private readonly password?: string

  constructor(
    api: { userApi: IccUserXApi; maintenanceTaskApi: IccMaintenanceTaskXApi, healthcarePartyApi: IccHcpartyXApi },
    basePath: string,
    username: string | undefined,
    password: string | undefined
  ) {
    this.basePath = basePath
    this.username = username
    this.password = password
    this.userApi = api.userApi;
    this.maintenanceTaskApi = api.maintenanceTaskApi;
    this.hcpApi = api.healthcarePartyApi;
  }

  async createOrModifyNotification(notification: Notification, delegate?: string): Promise<Notification | undefined> {
    return this.userApi.getCurrentUser().then(user => {
      if (!user) throw new Error("There is no user currently logged in");
      const notificationPromise = !notification?.rev ? this.createNotification(notification, user, delegate)
        : this.updateNotification(notification, user);
      return notificationPromise.then((createdTask) => {
        return NotificationMapper.toNotification(createdTask as MaintenanceTask);
      });
    });
  }

  private async updateNotification(notification: Notification, user: User): Promise<any> {
    if (!notification.id) throw new Error("Invalid notification");
    const existingNotification = await this.getNotification(notification.id);
    if (!existingNotification) throw new Error("Cannot modify a non-existing Notification");
    if (existingNotification.rev !== notification.rev) throw new Error("Cannot modify rev field");
    else if (existingNotification.created !== notification.created) throw new Error("Cannot modify created field");
    else if (existingNotification.endOfLife !== notification.endOfLife) throw new Error("Cannot modify endOfLife field");
    else if (existingNotification.deletionDate !== notification.deletionDate) throw new Error("Cannot modify deletionDate field");
    else if (existingNotification.modified !== notification.modified) throw new Error("Cannot modify modified field");
    else if (existingNotification.author !== notification.author) throw new Error("Cannot modify  author field");
    else if (existingNotification.responsible !== notification.responsible) throw new Error("Cannot modify responsible field");
    else if (existingNotification.type !== notification.type) throw new Error("Cannot modify type field");
    else if (!systemMetaDataEncryptedEquality(existingNotification.systemMetaData, notification.systemMetaData)) throw new Error("Cannot modify systemMetaData field");
    const inputMaintenanceTask = NotificationMapper.toMaintenanceTaskDto(notification);
    return this.maintenanceTaskApi.modifyMaintenanceTaskWithUser(user, inputMaintenanceTask);
  }

  async deleteNotification(notificationId: string): Promise<string | undefined> {
    return this.userApi.getCurrentUser().then(user => {
      if (!user) throw new Error("There is no user currently logged in");
      return this.maintenanceTaskApi.deleteMaintenanceTaskWithUser(user, notificationId).then(identifiers => {
        if (!identifiers || identifiers.length == 0) return undefined;
        return identifiers[0].id;
      });
    });
  }

  async filterNotifications(filter: Filter<Notification>, nextNotificationId?: string, limit?: number): Promise<PaginatedListNotification> {
    return this.userApi.getCurrentUser().then(user => {
      if (!user) throw new Error("There is no user currently logged in");
      return this.maintenanceTaskApi.filterMaintenanceTasksByWithUser(
        user,
        nextNotificationId,
        limit,
        new FilterChainMaintenanceTask({
          filter: FilterMapper.toAbstractFilterDto(filter, 'Notification')
        })
      ).then(paginatedList => {
        return PaginatedListMapper.toPaginatedListNotification(paginatedList)!
      });
    });
  }

  async getNotification(notificationId: string): Promise<Notification | undefined> {
    return this.userApi.getCurrentUser().then(user => {
      if (!user) throw new Error("There is no user currently logged in");
      return this.maintenanceTaskApi.getMaintenanceTaskWithUser(user, notificationId).then(task => {
        return NotificationMapper.toNotification(task)
      });
    });
  }

  async subscribeToNotificationEvents(
    eventTypes: ("CREATE" | "UPDATE" | "DELETE")[],
    filter: Filter<Notification>,
    eventFired: (dataSample: Notification) => Promise<void>,
    options: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number } = {}
  ): Promise<Connection> {
    return subscribeToEntityEvents(
      this.basePath,
      this.username!,
      this.password!,
      'Notification',
      eventTypes,
      filter,
      eventFired,
      options,
    ).then((rs) => new ConnectionImpl(rs))
  }

  private async createNotification(notification: Notification, user: User, delegate?: string): Promise<any> {
    if (!delegate) throw new Error("No delegate provided for Notification creation");
    const inputMaintenanceTask = NotificationMapper.toMaintenanceTaskDto(notification);
    return this.maintenanceTaskApi.newInstance(user, inputMaintenanceTask, [delegate])
      .then(task => {
        return this.maintenanceTaskApi.createMaintenanceTaskWithUser(user, task);
      });
  }

}

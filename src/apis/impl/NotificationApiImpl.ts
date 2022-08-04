import {NotificationApi} from "../NotificationApi";
import {Notification} from "../../models/Notification";
import {
  FilterChainMaintenanceTask,
  FilterChainService,
  IccHcpartyXApi,
  IccUserXApi, MaintenanceTask
} from "@icure/api";
import {IccMaintenanceTaskXApi} from "@icure/api/icc-x-api/icc-maintenance-task-x-api";
import {notificationMapper} from "../../mappers/notification";
import {PaginatedListNotification} from "../../models/PaginatedListNotification";
import {Filter} from "../../filter/Filter";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";

export class NotificationApiImpl implements NotificationApi {

  private readonly userApi: IccUserXApi;
  private readonly maintenanceTaskApi: IccMaintenanceTaskXApi;
  private readonly hcpApi: IccHcpartyXApi;

  constructor(api: { userApi: IccUserXApi; maintenanceTaskApi: IccMaintenanceTaskXApi, healthcarePartyApi: IccHcpartyXApi}) {
    this.userApi = api.userApi;
    this.maintenanceTaskApi = api.maintenanceTaskApi;
    this.hcpApi = api.healthcarePartyApi;
  }

  async createOrModifyNotification(notification: Notification, delegate?: string): Promise<Notification | undefined> {
    return this.userApi.getCurrentUser().then( user => {
      if(!user) throw new Error("There is no user currently logged in user");
      const inputMaintenanceTask = notificationMapper.toMaintenanceTaskDto(notification);
      if(!inputMaintenanceTask?.rev) {
        if(!delegate) throw new Error("No delegate provided for Notification creation");
        return this.maintenanceTaskApi.newInstance(user, inputMaintenanceTask, [delegate])
          .then( task => {
            return this.maintenanceTaskApi.createMaintenanceTaskWithUser(user, task).then( (createdTask) => {
              return notificationMapper.toNotification(createdTask as MaintenanceTask);
            });
          })
      } else {
        return this.maintenanceTaskApi.modifyMaintenanceTaskWithUser(user, inputMaintenanceTask).then( (createdTask) => {
          return notificationMapper.toNotification(createdTask as MaintenanceTask);
        });
      }
    });
  }

  async deleteNotification(notificationId: string): Promise<string | undefined> {
    return this.maintenanceTaskApi.deleteMaintenanceTask(notificationId).then( identifiers => {
      if(!identifiers || identifiers.length == 0) return undefined;
      return identifiers[0].id;
    });
  }

  async filterNotifications(filter: Filter<Notification>, nextNotificationId?: string, limit?: number): Promise<PaginatedListNotification> {
    return this.userApi.getCurrentUser().then( user => {
      if (!user) throw new Error("There is no user currently logged in user");
      return this.maintenanceTaskApi.filterMaintenanceTasksByWithUser(
        user,
        nextNotificationId,
        limit,
        new FilterChainMaintenanceTask({
          filter: FilterMapper.toAbstractFilterDto(filter, 'Notification')
        })
      ).then( paginatedList => {
        return PaginatedListMapper.toPaginatedListNotification(paginatedList)!
      });
    });
  }

  async getNotification(notificationId: string): Promise<Notification | undefined> {
    return this.userApi.getCurrentUser().then( user => {
      if(!user) throw new Error("There is no user currently logged in user");
      return this.maintenanceTaskApi.getMaintenanceTaskWithUser(user, notificationId).then( task => {
        return notificationMapper.toNotification(task)
      });
    });
  }

}

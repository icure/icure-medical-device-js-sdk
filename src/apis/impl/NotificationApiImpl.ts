import { NotificationApi } from '../NotificationApi'
import { MaintenanceTaskStatusEnum, Notification } from '../../models/Notification'
import { FilterChainMaintenanceTask, IccAuthApi, IccHcpartyXApi, IccUserXApi, MaintenanceTask, User } from '@icure/api'
import { IccMaintenanceTaskXApi } from '@icure/api/icc-x-api/icc-maintenance-task-x-api'
import { NotificationMapper } from '../../mappers/notification'
import { PaginatedListNotification } from '../../models/PaginatedListNotification'
import { Filter } from '../../filter/Filter'
import { PaginatedListMapper } from '../../mappers/paginatedList'
import { FilterMapper } from '../../mappers/filter'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { ErrorHandler } from '../../services/ErrorHandler'
import { Connection, ConnectionImpl } from '../../models/Connection'
import { subscribeToEntityEvents } from '../../utils/websocket'
import { deepEquality } from '../../utils/equality'
import { AccessLevelEnum } from '../../models/SecureDelegation'
import { NoOpFilter } from '../../filter/dsl/filterDsl'

export class NotificationApiImpl implements NotificationApi {
  private readonly dataOwnerApi: IccDataOwnerXApi
  private readonly userApi: IccUserXApi
  private readonly authApi: IccAuthApi
  private readonly maintenanceTaskApi: IccMaintenanceTaskXApi
  private readonly hcpApi: IccHcpartyXApi
  private readonly errorHandler: ErrorHandler

  private readonly basePath: string
  private readonly username?: string
  private readonly password?: string

  constructor(
    api: {
      userApi: IccUserXApi
      authApi: IccAuthApi
      maintenanceTaskApi: IccMaintenanceTaskXApi
      healthcarePartyApi: IccHcpartyXApi
      dataOwnerApi: IccDataOwnerXApi
    },
    errorHandler: ErrorHandler,
    basePath: string,
    username: string | undefined,
    password: string | undefined
  ) {
    this.basePath = basePath
    this.username = username
    this.password = password
    this.authApi = api.authApi

    this.dataOwnerApi = api.dataOwnerApi
    this.userApi = api.userApi
    this.maintenanceTaskApi = api.maintenanceTaskApi
    this.hcpApi = api.healthcarePartyApi
    this.errorHandler = errorHandler
  }

  async createOrModifyNotification(notification: Notification, delegate?: string): Promise<Notification | undefined> {
    return this.userApi
      .getCurrentUser()
      .then((user) => {
        if (!user)
          throw this.errorHandler.createErrorWithMessage(
            'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
          )
        const notificationPromise = !notification?.rev
          ? this._createNotification(notification, user, delegate)
          : this._updateNotification(notification, user)
        return notificationPromise.then((createdTask) => {
          return NotificationMapper.toNotification(createdTask as MaintenanceTask)
        })
      })
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
  }

  async deleteNotification(notificationId: string): Promise<string | undefined> {
    return this.userApi
      .getCurrentUser()
      .then((user) => {
        if (!user) throw new Error('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
        return this.maintenanceTaskApi.deleteMaintenanceTaskWithUser(user, notificationId).then((identifiers) => {
          if (!identifiers || identifiers.length == 0) return undefined
          return identifiers[0].id
        })
      })
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
  }

  async filterNotifications(filter: Filter<Notification>, nextNotificationId?: string, limit?: number): Promise<PaginatedListNotification> {
    if (NoOpFilter.isNoOp(filter)) {
      return new PaginatedListNotification({ totalSize: 0, pageSize: 0, rows: [] })
    } else {
      return this.userApi.getCurrentUser().then((user) => {
        if (!user)
          throw this.errorHandler.createErrorWithMessage(
            'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
          )
        return this.maintenanceTaskApi
          .filterMaintenanceTasksByWithUser(
            user,
            nextNotificationId,
            limit,
            new FilterChainMaintenanceTask({
              filter: FilterMapper.toAbstractFilterDto(filter, 'Notification'),
            })
          )
          .then((paginatedList) => {
            return PaginatedListMapper.toPaginatedListNotification(paginatedList)!
          })
          .catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
          })
      })
    }
  }

  async getNotification(notificationId: string): Promise<Notification | undefined> {
    return this.userApi
      .getCurrentUser()
      .then((user) => {
        if (!user)
          throw this.errorHandler.createErrorWithMessage(
            'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
          )
        return this.maintenanceTaskApi.getMaintenanceTaskWithUser(user, notificationId).then((task) => {
          return NotificationMapper.toNotification(task)
        })
      })
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
  }

  async getPendingNotificationsAfter(fromDate?: number): Promise<Array<Notification>> {
    const user = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    if (!user) {
      throw this.errorHandler.createErrorWithMessage(
        'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
      )
    }
    if (!this.dataOwnerApi.getDataOwnerIdOf(user)) {
      throw this.errorHandler.createErrorWithMessage(
        'The current user is not a data owner. You must been either a patient, a device or a healthcare professional to call this method.'
      )
    }
    const filter = {
      healthcarePartyId: this.dataOwnerApi.getDataOwnerIdOf(user),
      date: fromDate,
      $type: 'NotificationsAfterDateFilter',
    }
    return (await this.concatenateFilterResults(filter)).filter((it) => it.status === 'pending')
  }

  async concatenateFilterResults(
    filter: Filter<Notification>,
    nextId?: string | undefined,
    limit?: number | undefined,
    accumulator: Array<Notification> = []
  ): Promise<Array<Notification>> {
    const paginatedNotifications = await this.filterNotifications(filter, nextId, limit)
    return !paginatedNotifications.nextKeyPair?.startKeyDocId
      ? accumulator.concat(paginatedNotifications.rows)
      : this.concatenateFilterResults(
          filter,
          paginatedNotifications.nextKeyPair.startKeyDocId,
          limit,
          accumulator.concat(paginatedNotifications.rows)
        )
  }

  private _findAfterDateFilterValue(fromDate?: number): number {
    if (fromDate != undefined) {
      return fromDate
    }

    return new Date().getTime() - 1000 * 60 * 60 * 24 * 30
  }

  async updateNotificationStatus(notification: Notification, newStatus: MaintenanceTaskStatusEnum): Promise<Notification | undefined> {
    notification.status = newStatus
    return this.createOrModifyNotification(notification)
  }

  async subscribeToNotificationEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<Notification>,
    eventFired: (dataSample: Notification) => Promise<void>,
    options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number } = {}
  ): Promise<Connection> {
    const currentUser = await this.userApi.getCurrentUser()

    return subscribeToEntityEvents(
      this.basePath,
      this.authApi,
      'Notification',
      eventTypes,
      filter,
      eventFired,
      options,
      async (encrypted) => (await this.maintenanceTaskApi.decrypt(currentUser, [encrypted]))[0]
    ).then((rs) => new ConnectionImpl(rs))
  }

  private async _updateNotification(notification: Notification, user: User): Promise<any> {
    if (!notification.id) throw this.errorHandler.createErrorWithMessage('Invalid notification')
    const existingNotification = await this.getNotification(notification.id)
    if (!existingNotification) throw this.errorHandler.createErrorWithMessage('Cannot modify a non-existing Notification')
    if (existingNotification.rev !== notification.rev) throw this.errorHandler.createErrorWithMessage('Cannot modify rev field')
    else if (existingNotification.created !== notification.created) throw this.errorHandler.createErrorWithMessage('Cannot modify created field')
    else if (existingNotification.endOfLife !== notification.endOfLife)
      throw this.errorHandler.createErrorWithMessage('Cannot modify endOfLife field')
    else if (existingNotification.deletionDate !== notification.deletionDate)
      throw this.errorHandler.createErrorWithMessage('Cannot modify deletionDate field')
    else if (existingNotification.modified !== notification.modified) throw this.errorHandler.createErrorWithMessage('Cannot modify modified field')
    else if (existingNotification.author !== notification.author) throw this.errorHandler.createErrorWithMessage('Cannot modify  author field')
    else if (existingNotification.responsible !== notification.responsible)
      throw this.errorHandler.createErrorWithMessage('Cannot modify responsible field')
    else if (existingNotification.type !== notification.type) throw this.errorHandler.createErrorWithMessage('Cannot modify type field')
    else if (!deepEquality(existingNotification.systemMetaData, notification.systemMetaData))
      throw this.errorHandler.createErrorWithMessage('Cannot modify systemMetaData field')
    const inputMaintenanceTask = NotificationMapper.toMaintenanceTaskDto(notification)
    return this.maintenanceTaskApi.modifyMaintenanceTaskWithUser(user, inputMaintenanceTask).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
  }

  private async _createNotification(notification: Notification, user: User, delegate?: string): Promise<any> {
    if (!delegate)
      throw this.errorHandler.createErrorWithMessage(
        'No delegate provided for Notification creation. You must provide a delegate to create a Notification. The delegate is the id of the data owner you want to notify.'
      )
    const inputMaintenanceTask = NotificationMapper.toMaintenanceTaskDto(notification)
    return this.maintenanceTaskApi
      .newInstance(user, inputMaintenanceTask, { additionalDelegates: { [delegate]: AccessLevelEnum.WRITE } })
      .then((task) => {
        return this.maintenanceTaskApi.createMaintenanceTaskWithUser(user, task)
      })
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
  }
}

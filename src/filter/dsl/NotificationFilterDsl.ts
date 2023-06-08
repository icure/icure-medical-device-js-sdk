import {Filter} from "../Filter";
import {DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder} from "./filterDsl";
import {Notification, NotificationTypeEnum} from "../../models/Notification";
import {MedTechApi} from "../../apis/MedTechApi";
import {IntersectionFilter} from "../IntersectionFilter";
import {NotificationsAfterDateFilter} from "../notification/NotificationsAfterDateFilter";

interface BaseNotificationFilterBuilder<F> {
  /**
   * Includes all the notifications with the specified ids.
   * @param ids the ids of the codes.
   */
  byIds(ids: string[]): F

  /**
   * Includes all the notifications with the specified type.
   * @param type the type of the notification.
   */
  withType(type: NotificationTypeEnum): F

  /**
   * Includes all the notfications created after the specified timestamp
   * @param fromDate the timestamp.
   */
  afterDate(fromDate: number): F
}

export class NotificationFilter implements DataOwnerFilterBuilder<Notification, NotificationFilterWithDataOwner> {
  forDataOwner(api: MedTechApi, dataOwnerId: string): NotificationFilterWithDataOwner {
    return new NotificationFilterWithDataOwner(api, dataOwnerId)
  }

  forSelf(api: MedTechApi): NotificationFilterWithDataOwner {
    return new NotificationFilterWithDataOwner(api)
  }
}

class NotificationFilterWithDataOwner
  extends SortableFilterBuilder<Notification, NotificationFilterSortStepDecorator>
  implements BaseNotificationFilterBuilder<NotificationFilterWithDataOwner>, FilterBuilder<Notification>
{
  _dataOwnerId: Promise<string>

  constructor(
    private api: MedTechApi,
    dataOwnerId?: string
  ) {
    super();
    this._dataOwnerId = !!dataOwnerId
      ? Promise.resolve(dataOwnerId)
      : api.userApi.getLoggedUser().then( u => api.dataOwnerApi.getDataOwnerIdOf(u))
  }

  get sort(): NotificationFilterSortStepDecorator {
    return new NotificationFilterSortStepDecorator(this)
  }

  byIds(ids: string[]): NotificationFilterWithDataOwner {
    this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: ids, $type: 'NotificationsByIdFilter' }), "ids")
    return this
  }

  withType(type: NotificationTypeEnum): NotificationFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        type: type,
        $type: 'NotificationsByHcPartyAndTypeFilter',
      }
    })
    this._builderAccumulator.addSingletonFilter(filter)
    return this
  }

  afterDate(fromDate: number): NotificationFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        date: fromDate,
        $type: 'NotificationsByHcPartyAndTypeFilter',
      }
    })
    this._builderAccumulator.addSingletonFilter(filter)
    return this
  }


  async build(): Promise<Filter<Notification>> {
    const filters = await this._builderAccumulator.getAndSortFilters()

    if(filters.some(f => f instanceof NoOpFilter)) {
      console.warn("Warning: the filter you built cannot be resolved and will return no entity")
      return new NoOpFilter()
    } else if (filters.length > 1) {
      return {
        filters: filters,
        $type: 'IntersectionFilter',
      } as IntersectionFilter<Notification>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { healthcarePartyId: await this._dataOwnerId, date: 0, $type: 'NotificationsAfterDateFilter' } as NotificationsAfterDateFilter
    }
  }
}

type NonSortableNotificationFilter = BaseNotificationFilterBuilder<NotificationFilterWithDataOwner> & FilterBuilder<Notification>

class NotificationFilterSortStepDecorator
  implements Omit<BaseNotificationFilterBuilder<NonSortableNotificationFilter>, "getDataOwner"> {

  constructor(
    private notificationFilter: NotificationFilterWithDataOwner
  ) {}

  byIds(ids: string[]): NonSortableNotificationFilter {
    this.notificationFilter.byIds(ids)
    this.notificationFilter._builderAccumulator.lastElementIsSortKey()
    return this.notificationFilter
  }

  withType(type: NotificationTypeEnum): NonSortableNotificationFilter {
    this.notificationFilter.withType(type)
    this.notificationFilter._builderAccumulator.lastElementIsSortKey()
    return this.notificationFilter
  }

  afterDate(fromDate: number): NonSortableNotificationFilter {
    this.notificationFilter.afterDate(fromDate)
    this.notificationFilter._builderAccumulator.lastElementIsSortKey()
    return this.notificationFilter
  }
}

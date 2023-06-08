import {User} from "../../models/User";
import {Filter} from "../Filter";
import {UserByIdsFilter} from "../user/UserByIdsFilter";
import {UsersByPatientIdFilter} from "../user/UsersByPatientIdFilter";
import {IntersectionFilter} from "../IntersectionFilter";
import {AllUsersFilter} from "../user/AllUsersFilter";
import {FilterBuilder, NoOpFilter, SortableFilterBuilder} from "./filterDsl";
import {MedTechApi} from "../../apis/MedTechApi";
import {SortableFilterBuilderAccumulator} from "./SortableFilterBuilderAccumulator";

interface BaseUserFilterBuilder<F> {
  /**
   * Includes all the users with the specified ids.
   * @param byIds the ids of the users.
   */
  byIds(byIds: string[]): F

  /**
   * Includes all the users with the specified patient id.
   * @param patientId the patient id to filter.
   */
  byPatientId(patientId: string): F
}

export class UserFilter
  extends SortableFilterBuilder<User, UserFilterSortStepDecorator>
  implements BaseUserFilterBuilder<UserFilter>, FilterBuilder<User>
{

  constructor(private api: MedTechApi) {
    super();
  }

  get sort():UserFilterSortStepDecorator {
    return new UserFilterSortStepDecorator(this)
  }

  byIds(byIds: string[]): UserFilter {
    this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'UserByIdsFilter' }), "ids")
    return this
  }

  byPatientId(patientId: string): UserFilter {
    this._builderAccumulator.addSingletonFilter(Promise.resolve({ patientId: patientId, $type: 'UsersByPatientIdFilter' }))
    return this
  }

  async build(): Promise<Filter<User>> {
    const filters = await this._builderAccumulator.getAndSortFilters()

    if(filters.some(f => f instanceof NoOpFilter)) {
      console.warn("Warning: the filter you built cannot be resolved and will return no entity")
      return new NoOpFilter()
    } else if (filters.length > 1) {
      return {
        filters: filters,
        $type: 'IntersectionFilter',
      } as IntersectionFilter<User>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { $type: 'AllUsersFilter' } as AllUsersFilter
    }
  }
}

type NonSortableUserFilter = BaseUserFilterBuilder<UserFilter> & FilterBuilder<User>

class UserFilterSortStepDecorator implements BaseUserFilterBuilder<NonSortableUserFilter> {

  constructor(
    private userFilter: UserFilter
  ) {}

  byIds(byIds: string[]): NonSortableUserFilter {
    this.userFilter.byIds(byIds)
    this.userFilter._builderAccumulator.lastElementIsSortKey()
    return this.userFilter
  }

  byPatientId(patientId: string): NonSortableUserFilter {
    this.userFilter.byPatientId(patientId)
    this.userFilter._builderAccumulator.lastElementIsSortKey()
    return this.userFilter
  }

}

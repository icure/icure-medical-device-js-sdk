import {FilterBuilder, NoOpFilter, SortableFilterBuilder} from "./filterDsl";
import {HealthcareProfessional} from "../../models/HealthcareProfessional";
import {HealthcareProfessionalByLabelCodeFilter} from "../hcp/HealthcareProfessionalByLabelCodeFilter";
import {Filter} from "../Filter";
import {IntersectionFilter} from "../IntersectionFilter";
import {AllHealthcareProfessionalsFilter} from "../hcp/AllHealthcareProfessionalsFilter";
import {HealthcareProfessionalByNameFilter} from "../hcp/HealthcareProfessionalByNameFilter";
import {HealthcareProfessionalByIdsFilter} from "../hcp/HealthcareProfessionalByIdsFilter";
import {MedTechApi} from "../../apis/MedTechApi";

interface BaseHealthcareProfessionalFilterBuilder<F> {
  /**
   * Includes all the healthcare professionals with the specified ids.
   * @param byIds the ids of the healthcare professionals.
   */
  byIds(byIds: string[]): F

  /**
   * Includes all the healthcare professionals that have the label or the code specified. At least one of the parameters
   * must be not null.
   * @param labelType the type of the label, if undefined it will be ignored.
   * @param labelCode the code of the label, if undefined it will be ignored.
   * @param codeType the type of the code, if undefined it will be ignored.
   * @param codeCode the code of the code, if undefined it will be ignored.
   */
  byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): F

  /**
   * Includes all the healthcare professionals which name includes the string passed as parameter.
   * @param searchString the name of the healthcare professionals
   */
  byMatches(searchString: string): F
}

export class HealthcareProfessionalFilter
  extends SortableFilterBuilder<HealthcareProfessional, HealthcareProfessionalFilterSortStepDecorator>
  implements BaseHealthcareProfessionalFilterBuilder<HealthcareProfessionalFilter>, FilterBuilder<HealthcareProfessional>
{

  constructor(_: MedTechApi) {
    super();
  }

  get sort(): HealthcareProfessionalFilterSortStepDecorator {
    return new HealthcareProfessionalFilterSortStepDecorator(this)
  }

  byIds(byIds: string[]): HealthcareProfessionalFilter {
    this._builderAccumulator.addByIdsFilter(
      Promise.resolve({ ids: byIds, $type: 'HealthcareProfessionalByIdsFilter' }),
      "ids"
    )
    return this
  }

  byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): HealthcareProfessionalFilter {
    if(!labelType && !labelCode && !codeType && !codeCode) {
      throw Error("To instantiate the filter, you must specify at least one of these parameters: labelType, labelCode, codeType, or codeCode")
    }
    this._builderAccumulator.addFilter(Promise.resolve({
      labelType,
      labelCode,
      codeType,
      codeCode,
      $type: 'HealthcareProfessionalByLabelCodeFilter',
    }))
    return this
  }

  byMatches(searchString: string): HealthcareProfessionalFilter {
    this._builderAccumulator.addFilter(Promise.resolve({ name: searchString, $type: 'HealthcareProfessionalByNameFilter' }))
    return this
  }

  async build(): Promise<Filter<HealthcareProfessional>> {
    const filters = await this._builderAccumulator.getAndSortFilters()

    if(filters.some(f => NoOpFilter.isNoOp(f))) {
      console.warn("Warning: the filter you built cannot be resolved and will return no entity")
      return new NoOpFilter()
    } else if (filters.length > 1) {
      return {
        filters: filters,
        $type: 'IntersectionFilter',
      } as IntersectionFilter<HealthcareProfessional>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { $type: 'AllHealthcareProfessionalsFilter' } as AllHealthcareProfessionalsFilter
    }
  }
}

type NonSortableHealthcareProfessionalFilter = BaseHealthcareProfessionalFilterBuilder<HealthcareProfessionalFilter> & FilterBuilder<HealthcareProfessional>

class HealthcareProfessionalFilterSortStepDecorator
  implements BaseHealthcareProfessionalFilterBuilder<NonSortableHealthcareProfessionalFilter> {

  constructor(
    private healthcareProfessionalFilter: HealthcareProfessionalFilter
  ) {}

  byIds(byIds: string[]): NonSortableHealthcareProfessionalFilter {
    this.healthcareProfessionalFilter.byIds(byIds)
    this.healthcareProfessionalFilter._builderAccumulator.lastElementIsSortKey()
    return this.healthcareProfessionalFilter
  }

  byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): NonSortableHealthcareProfessionalFilter {
    this.healthcareProfessionalFilter.byLabelCodeFilter(labelType, labelCode, codeType, codeCode)
    this.healthcareProfessionalFilter._builderAccumulator.lastElementIsSortKey()
    return this.healthcareProfessionalFilter
  }

  byMatches(searchString: string): NonSortableHealthcareProfessionalFilter {
    this.healthcareProfessionalFilter.byMatches(searchString)
    this.healthcareProfessionalFilter._builderAccumulator.lastElementIsSortKey()
    return this.healthcareProfessionalFilter
  }

}

import { FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { Coding } from '../../models/Coding'
import { CodingByRegionTypeLabelFilter } from '../coding/CodingByRegionTypeLabelFilter'
import { Filter } from '../Filter'
import { AllCodingsFilter } from '../coding/AllCodingsFilter'
import { IntersectionFilter } from '@icure/api'
import { CodingByIdsFilter } from '../coding/CodingByIdsFilter'
import { MedTechApi } from '../../apis/MedTechApi'

interface BaseCodingFilterBuilder<F> {
  /**
   * Includes all the codes with the specified ids.
   * @param byIds the ids of the codes.
   */
  byIds(byIds: string[]): F

  /**
   * Includes all the codes with the specified region, language, type, and label.
   * At least one of the parameters must be specified.
   * @param region the region of the code, if undefined it will be ignored.
   * @param language the language of the code, if undefined it will be ignored.
   * @param type the type of the code, if undefined it will be ignored.
   * @param label the label of the code, if undefined it will be ignored.
   */
  byRegionLanguageTypeLabel(region?: string, language?: string, type?: string, label?: string): F
}

export class CodingFilter
  extends SortableFilterBuilder<Coding, CodingFilterSortStepDecorator>
  implements BaseCodingFilterBuilder<CodingFilter>, FilterBuilder<Coding>
{
  constructor(_: MedTechApi) {
    super()
  }

  get sort(): CodingFilterSortStepDecorator {
    return new CodingFilterSortStepDecorator(this)
  }

  byIds(byIds: string[]): CodingFilter {
    this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'CodingByIdsFilter' }), 'ids')
    return this
  }

  byRegionLanguageTypeLabel(region?: string, language?: string, type?: string, label?: string): CodingFilter {
    if (!region && !language && !type && !label) {
      throw Error('To instantiate the filter, you must specify at least one of these parameters: labelType, labelCode, codeType, or codeCode')
    }
    this._builderAccumulator.addFilter(Promise.resolve({ region, type, language, label, $type: 'CodingByRegionTypeLabelFilter' }))
    return this
  }

  async build(): Promise<Filter<Coding>> {
    const filters = await this._builderAccumulator.getAndSortFilters()

    if (filters.some((f) => NoOpFilter.isNoOp(f))) {
      console.warn('Warning: the filter you built cannot be resolved and will return no entity')
      return new NoOpFilter()
    } else if (filters.length > 1) {
      return {
        filters: filters,
        $type: 'IntersectionFilter',
      } as IntersectionFilter<Coding>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { $type: 'AllCodingsFilter' } as AllCodingsFilter
    }
  }
}

type NonSortableCodingFilter = BaseCodingFilterBuilder<CodingFilter> & FilterBuilder<CodingFilter>

class CodingFilterSortStepDecorator implements BaseCodingFilterBuilder<NonSortableCodingFilter> {
  constructor(private codingFilter: CodingFilter) {}

  byIds(byIds: string[]): NonSortableCodingFilter {
    this.codingFilter.byIds(byIds)
    this.codingFilter._builderAccumulator.setLastElementAsSortKey()
    return this.codingFilter
  }

  byRegionLanguageTypeLabel(region?: string, language?: string, type?: string, label?: string): NonSortableCodingFilter {
    this.codingFilter.byRegionLanguageTypeLabel(region, language, type, label)
    this.codingFilter._builderAccumulator.setLastElementAsSortKey()
    return this.codingFilter
  }
}

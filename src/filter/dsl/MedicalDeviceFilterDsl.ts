import { FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { AllMedicalDevicesFilter } from '../medicaldevice/AllMedicalDevicesFilter'
import { MedicalDevice } from '../../models/MedicalDevice'
import { IntersectionFilter } from '@icure/api'
import { Filter } from '../Filter'
import { MedicalDeviceByIdsFilter } from '../medicaldevice/MedicalDeviceByIdsFilter'
import { MedTechApi } from '../../apis/MedTechApi'

interface BaseMedicalDeviceFilterBuilder<F> {
  /**
   * Includes all the medical devices with the specified ids.
   * @param byIds the ids of the medical devices.
   */
  byIds(byIds: string[]): F
}

export class MedicalDeviceFilter
  extends SortableFilterBuilder<MedicalDevice, MedicalDeviceFilterSortStepDecorator>
  implements BaseMedicalDeviceFilterBuilder<MedicalDeviceFilter>, FilterBuilder<MedicalDevice>
{
  constructor(_: MedTechApi) {
    super()
  }

  get sort(): MedicalDeviceFilterSortStepDecorator {
    return new MedicalDeviceFilterSortStepDecorator(this)
  }

  byIds(byIds: string[]): MedicalDeviceFilter {
    this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'MedicalDeviceByIdsFilter' }), 'ids')
    return this
  }

  async build(): Promise<Filter<MedicalDevice>> {
    const filters = await this._builderAccumulator.getAndSortFilters()

    if (filters.some((f) => NoOpFilter.isNoOp(f))) {
      console.warn('Warning: the filter you built cannot be resolved and will return no entity')
      return new NoOpFilter()
    } else if (filters.length > 1) {
      return {
        filters: filters,
        $type: 'IntersectionFilter',
      } as IntersectionFilter<MedicalDevice>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { $type: 'AllMedicalDevicesFilter' } as AllMedicalDevicesFilter
    }
  }
}

type NonSortableMedicalDeviceFilter = BaseMedicalDeviceFilterBuilder<MedicalDeviceFilter> & FilterBuilder<MedicalDevice>

class MedicalDeviceFilterSortStepDecorator implements BaseMedicalDeviceFilterBuilder<NonSortableMedicalDeviceFilter> {
  constructor(private medicalDeviceFilter: MedicalDeviceFilter) {}

  byIds(byIds: string[]): NonSortableMedicalDeviceFilter {
    this.medicalDeviceFilter.byIds(byIds)
    this.medicalDeviceFilter._builderAccumulator.lastElementIsSortKey()
    return this.medicalDeviceFilter
  }
}

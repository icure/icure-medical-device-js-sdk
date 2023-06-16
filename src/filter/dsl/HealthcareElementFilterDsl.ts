import { Identifier } from '../../models/Identifier'
import { HealthcareElementByHealthcarePartyLabelCodeFilter } from '../healthcareelement/HealthcareElementByHealthcarePartyLabelCodeFilter'
import { IntersectionFilter } from '@icure/api'
import { PotentiallyEncryptedPatient } from '../../models/Patient'
import { HealthcareElement } from '../../models/HealthcareElement'
import { Filter } from '../Filter'
import { MedTechApi } from '../../apis/MedTechApi'
import { DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { HealthcareElementByIdsFilter } from '../healthcareelement/HealthcareElementByIdsFilter'
import { HealthcareElementByHealthcarePartyIdentifiersFilter } from '../healthcareelement/HealthcareElementByHealthcarePartyIdentifiersFilter'
import { HealthcareElementByHealthcarePartyPatientFilter } from '../healthcareelement/HealthcareElementByHealthcarePartyPatientFilter'
import { HealthcareElementByHealthcarePartyFilter } from '../healthcareelement/HealthcareElementByHealthcarePartyFilter'
import { PatientMapper } from '../../mappers/patient'

export class HealthcareElementFilter implements DataOwnerFilterBuilder<HealthcareElement, HealthcareElementFilterWithDataOwner> {
  constructor(private api: MedTechApi) {}

  forDataOwner(dataOwnerId: string): HealthcareElementFilterWithDataOwner {
    return new HealthcareElementFilterWithDataOwner(this.api, dataOwnerId)
  }

  forSelf(): HealthcareElementFilterWithDataOwner {
    return new HealthcareElementFilterWithDataOwner(this.api)
  }
}

interface BaseHealthcareElementFilterBuilder<F> {
  /**
   * Includes all the healthcare elements with the specified ids.
   * @param byIds the ids of the healthcare elements.
   */
  byIds(byIds: string[]): F

  /**
   * Includes all the healthcare elements that have at least one of the specified identifiers.
   * @param identifiers
   */
  byIdentifiers(identifiers: Identifier[]): F

  /**
   * Includes all the healthcare elements that have the label or the code specified. At least one of the parameters
   * must be not null.
   * @param labelType the type of the label, if undefined it will be ignored.
   * @param labelCode the code of the label, if undefined it will be ignored.
   * @param codeType the type of the code, if undefined it will be ignored.
   * @param codeCode the code of the code, if undefined it will be ignored.
   */
  byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): F

  /**
   * Includes all the healthcare elements that were created for the patients passed as parameter.
   * @param patients
   */
  forPatients(patients: PotentiallyEncryptedPatient[]): F
}

export class HealthcareElementFilterWithDataOwner
  extends SortableFilterBuilder<HealthcareElement, MedicalDeviceFilterSortStepDecorator>
  implements BaseHealthcareElementFilterBuilder<HealthcareElementFilterWithDataOwner>, FilterBuilder<HealthcareElement>
{
  _dataOwnerId: Promise<string>

  constructor(private api: MedTechApi, dataOwnerId?: string) {
    super()
    this._dataOwnerId = !!dataOwnerId ? Promise.resolve(dataOwnerId) : api.userApi.getLoggedUser().then((u) => api.dataOwnerApi.getDataOwnerIdOf(u))
  }

  get sort(): MedicalDeviceFilterSortStepDecorator {
    return new MedicalDeviceFilterSortStepDecorator(this)
  }

  getDataOwner() {
    return this._dataOwnerId
  }

  byIds(byIds: string[]): HealthcareElementFilterWithDataOwner {
    this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'HealthcareElementByIdsFilter' }), 'ids')
    return this
  }

  byIdentifiers(identifiers: Identifier[]): HealthcareElementFilterWithDataOwner {
    const filter = this._dataOwnerId.then((id) => {
      return {
        healthcarePartyId: id,
        identifiers: identifiers,
        $type: 'HealthcareElementByHealthcarePartyIdentifiersFilter',
      }
    })
    this._builderAccumulator.addFilter(filter)
    return this
  }

  byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): HealthcareElementFilterWithDataOwner {
    if (!labelType && !labelCode && !codeType && !codeCode) {
      throw Error('To instantiate the filter, you must specify at least one of these parameters: labelType, labelCode, codeType, or codeCode')
    }
    this._builderAccumulator.addFilter(
      Promise.resolve({
        tagType: labelType,
        tagCode: labelCode,
        codeType,
        codeCode,
        $type: 'HealthcareElementByHealthcarePartyLabelCodeFilter',
      })
    )
    return this
  }

  forPatients(patients: PotentiallyEncryptedPatient[]): HealthcareElementFilterWithDataOwner {
    const filter = this._dataOwnerId.then((id) => {
      return Promise.all(
        patients.map((p) => this.api.cryptoApi.xapi.secretIdsOf({ entity: PatientMapper.toPatientDto(p)!, type: 'Patient' }, undefined))
      )
        .then((sfksForPatients) => sfksForPatients.flat())
        .then((sfks) => {
          return {
            healthcarePartyId: id,
            patientSecretForeignKeys: sfks,
            $type: 'HealthcareElementByHealthcarePartyPatientFilter',
          }
        })
    })
    this._builderAccumulator.addByIdsFilter(filter, 'patientSecretForeignKeys')
    return this
  }

  async build(): Promise<Filter<HealthcareElement>> {
    const filters = await this._builderAccumulator.getAndSortFilters()

    if (filters.some((f) => NoOpFilter.isNoOp(f))) {
      console.warn('Warning: the filter you built cannot be resolved and will return no entity')
      return new NoOpFilter()
    } else if (filters.length > 1) {
      return {
        filters: filters,
        $type: 'IntersectionFilter',
      } as IntersectionFilter<HealthcareElement>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return {
        healthcarePartyId: await this._dataOwnerId,
        $type: 'HealthcareElementByHealthcarePartyFilter',
      } as HealthcareElementByHealthcarePartyFilter
    }
  }
}

type NonSortableHealthcareElementFilter = BaseHealthcareElementFilterBuilder<HealthcareElementFilterWithDataOwner> & FilterBuilder<HealthcareElement>

class MedicalDeviceFilterSortStepDecorator implements BaseHealthcareElementFilterBuilder<NonSortableHealthcareElementFilter> {
  constructor(private healthcareElementFilter: HealthcareElementFilterWithDataOwner) {}

  byIds(byIds: string[]): NonSortableHealthcareElementFilter {
    this.healthcareElementFilter.byIds(byIds)
    this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
    return this.healthcareElementFilter
  }

  byIdentifiers(identifiers: Identifier[]): NonSortableHealthcareElementFilter {
    this.healthcareElementFilter.byIdentifiers(identifiers)
    this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
    return this.healthcareElementFilter
  }

  byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): NonSortableHealthcareElementFilter {
    this.healthcareElementFilter.byLabelCodeFilter(labelType, labelCode, codeType, codeCode)
    this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
    return this.healthcareElementFilter
  }

  forPatients(patients: PotentiallyEncryptedPatient[]): NonSortableHealthcareElementFilter {
    this.healthcareElementFilter.forPatients(patients)
    this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
    return this.healthcareElementFilter
  }
}

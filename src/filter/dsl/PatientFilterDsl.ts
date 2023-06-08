import {Patient, PatientGenderEnum} from "../../models/Patient";
import {Identifier} from "../../models/Identifier";
import {addDays, format} from "date-fns";
import {Filter} from "../Filter";
import {PatientByIdsFilter} from "../patient/PatientByIdsFilter";
import {PatientByHealthcarePartyIdentifiersFilter} from "../patient/PatientByHealthcarePartyIdentifiersFilter";
import {PatientByHealthcarePartySsinsFilter} from "../patient/PatientByHealthcarePartySsinsFilter";
import {PatientByHealthcarePartyDateOfBirthBetweenFilter} from "../patient/PatientByHealthcarePartyDateOfBirthBetweenFilter";
import {
  PatientByHealthcarePartyGenderEducationProfessionFilter
} from "../patient/PatientByHealthcarePartyGenderEducationProfessionFilter";
import {PatientByHealthcarePartyNameContainsFuzzyFilter} from "../patient/PatientByHealthcarePartyNameContainsFuzzyFilter";
import {IntersectionFilter} from "../IntersectionFilter";
import {PatientByHealthcarePartyFilter} from "../patient/PatientByHealthcarePartyFilter";
import {
  DataOwnerFilterBuilder,
  FilterBuilder, NoOpFilter,
  SortableFilterBuilder,
} from "./filterDsl";
import {MedTechApi} from "../../apis/MedTechApi";

export class PatientFilter implements DataOwnerFilterBuilder<Patient, PatientFilterWithDataOwner> {
  forDataOwner(api: MedTechApi, dataOwnerId: string): PatientFilterWithDataOwner {
    return new PatientFilterWithDataOwner(api, dataOwnerId)
  }

  forSelf(api: MedTechApi): PatientFilterWithDataOwner {
    return new PatientFilterWithDataOwner(api)
  }
}

interface BasePatientFilterBuilder<F> {
  /**
   * @return the current Data Owner id or throws an exception if not yet specified.
   */
  getDataOwner(): Promise<string>

  /**
   * Includes all the patients with the specified ids.
   * @param byIds the ids of the patients.
   */
  byIds(byIds: string[]): F

  /**
   * Includes all the patients that have at least one of the specified identifiers.
   * @param identifiers
   */
  byIdentifiers(identifiers: Identifier[]): F

  /**
   * Includes all the patients which gender, education, and profession are the ones specified.
   * @param gender the gender of the patients to include.
   * @param education the education of the patients to include. If undefined, it will be ignored.
   * @param profession the profession of the patients to include. If undefined, it will be ignored.
   */
  byGenderEducationProfession(gender: PatientGenderEnum, education?: string, profession?: string): F

  /**
   * Includes all the patients which SSIN is the one specified
   * @param withSsins the SSINs to include.
   */
  withSsins(withSsins: string[]): F

  /**
   * Includes all the patients which age is the one specified.
   * @param age the age of the patients to include.
   */
  ofAge(age: number): F

  /**
   * Includes all the patients which date of births is in the specified range.
   * @param from the start date in YYYYMMDD format.
   * @param to the end date in YYYYMMDD format.
   */
  dateOfBirthBetween(from: number, to: number): F

  /**
   * Includes all the patients which first name, last name, maiden name or spouse name matches, even partially,
   * the string passed as parameter.
   * @param searchString
   */
  containsFuzzy(searchString: string): F
}

class PatientFilterWithDataOwner
  extends SortableFilterBuilder<Patient, PatientFilterSortStepDecorator>
  implements BasePatientFilterBuilder<PatientFilterWithDataOwner>, FilterBuilder<Patient>
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

  get sort():PatientFilterSortStepDecorator {
    return new PatientFilterSortStepDecorator(this)
  }

  getDataOwner() {
    return this._dataOwnerId
  }

  byIds(byIds: string[]): PatientFilterWithDataOwner {
    this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'PatientByIdsFilter' }), "ids")
    return this
  }

  byIdentifiers(identifiers: Identifier[]): PatientFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        identifiers: identifiers,
        $type: 'PatientByHealthcarePartyIdentifiersFilter',
      }
    })
    this._builderAccumulator.addFilter(filter)
    return this
  }

  byGenderEducationProfession(gender: PatientGenderEnum, education?: string, profession?: string): PatientFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        gender: gender,
        education: education,
        profession: profession,
        $type: 'PatientByHealthcarePartyGenderEducationProfessionFilter',
      }
    })
    this._builderAccumulator.addFilter(filter)
    return this
  }

  withSsins(withSsins: string[]): PatientFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        ssins: withSsins,
        $type: 'PatientByHealthcarePartySsinsFilter',
      }
    })
    this._builderAccumulator.addByIdsFilter(filter, "ssins")
    return this
  }

  ofAge(age: number): PatientFilterWithDataOwner {
    const now = new Date()
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        minDateOfBirth: parseInt(format(addDays(new Date(now.getFullYear() - age - 1, now.getMonth(), now.getDay()), 1), 'yyyyMMdd')),
        maxDateOfBirth: parseInt(format(new Date(now.getFullYear() - age, now.getMonth(), now.getDay()), 'yyyyMMdd')),
        $type: 'PatientByHealthcarePartyDateOfBirthBetweenFilter',
      }
    })
    this._builderAccumulator.addSingletonFilter(filter)
    return this
  }

  dateOfBirthBetween(from: number, to: number): PatientFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        minDateOfBirth: from,
        maxDateOfBirth: to,
        $type: 'PatientByHealthcarePartyDateOfBirthBetweenFilter',
      }
    })
    this._builderAccumulator.addFilter(filter)
    return this
  }

  containsFuzzy(searchString: string): PatientFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        searchString: searchString,
        $type: 'PatientByHealthcarePartyNameContainsFuzzyFilter',
      }
    })
    this._builderAccumulator.addFilter(filter)
    return this
  }

  async build(): Promise<Filter<Patient>> {
    const filters = await this._builderAccumulator.getAndSortFilters()

    if(filters.some(f => f instanceof NoOpFilter)) {
      console.warn("Warning: the filter you built cannot be resolved and will return no entity")
      return new NoOpFilter()
    } else if (filters.length > 1) {
      return {
        filters: filters,
        $type: 'IntersectionFilter'
      } as IntersectionFilter<Patient>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { healthcarePartyId: await this._dataOwnerId, $type: 'PatientByHealthcarePartyFilter' } as PatientByHealthcarePartyFilter
    }
  }
}

type NonSortablePatientFilter = BasePatientFilterBuilder<PatientFilterWithDataOwner> & FilterBuilder<Patient>

class PatientFilterSortStepDecorator implements Omit<BasePatientFilterBuilder<NonSortablePatientFilter>, "getDataOwner"> {

  constructor(
    private patientFilter: PatientFilterWithDataOwner
  ) {}

  byIds(byIds: string[]): NonSortablePatientFilter {
    this.patientFilter.byIds(byIds)
    this.patientFilter._builderAccumulator.lastElementIsSortKey()
    return this.patientFilter
  }

  byIdentifiers(identifiers: Identifier[]):NonSortablePatientFilter {
    this.patientFilter.byIdentifiers(identifiers)
    this.patientFilter._builderAccumulator.lastElementIsSortKey()
    return this.patientFilter
  }

  byGenderEducationProfession(gender: PatientGenderEnum, education?: string, profession?: string): NonSortablePatientFilter {
    this.patientFilter.byGenderEducationProfession(gender, education, profession)
    this.patientFilter._builderAccumulator.lastElementIsSortKey()
    return this.patientFilter
  }

  withSsins(withSsins: string[]): NonSortablePatientFilter {
    this.patientFilter.withSsins(withSsins)
    this.patientFilter._builderAccumulator.lastElementIsSortKey()
    return this.patientFilter
  }

  ofAge(age: number): NonSortablePatientFilter {
    this.patientFilter.ofAge(age)
    this.patientFilter._builderAccumulator.lastElementIsSortKey()
    return this.patientFilter
  }

  dateOfBirthBetween(from: number, to: number): NonSortablePatientFilter {
    this.patientFilter.dateOfBirthBetween(from, to)
    this.patientFilter._builderAccumulator.lastElementIsSortKey()
    return this.patientFilter
  }

  containsFuzzy(searchString: string): NonSortablePatientFilter {
    this.patientFilter.containsFuzzy(searchString)
    this.patientFilter._builderAccumulator.lastElementIsSortKey()
    return this.patientFilter
  }

}

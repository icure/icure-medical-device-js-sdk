import {Filter} from "./Filter";
import {Coding} from "../models/Coding";
import {DataSample} from "../models/DataSample";
import {HealthcareElement} from "../models/HealthcareElement";
import {HealthcareProfessional} from "../models/HealthcareProfessional";
import {MedicalDevice} from "../models/MedicalDevice";
import {Patient, PatientGenderEnum} from "../models/Patient";
import {User} from "../models/User";
import {UserByIdsFilter} from "./user/UserByIdsFilter";
import {UnionFilter} from "./UnionFilter";
import {IntersectionFilter} from "./IntersectionFilter";
import {AllUsersFilter} from "./user/AllUsersFilter";
import {Identifier} from "../models/Identifier";

import { addDays, format } from 'date-fns'
import {PatientByIdsFilter} from "./patient/PatientByIdsFilter";
import {PatientByHealthcarePartyIdentifiersFilter} from "./patient/PatientByHealthcarePartyIdentifiersFilter";
import {
  Delegation,
  IccCryptoXApi,
  PatientByHcPartyAndSsinsFilter,
  PatientByHcPartyDateOfBirthBetweenFilter
} from "@icure/api";
import {PatientByHealthcarePartyGenderEducationProfessionFilter} from "./patient/PatientByHealthcarePartyGenderEducationProfessionFilter";
import {PatientByHealthcarePartyDateOfBirthBetweenFilter} from "./patient/PatientByHealthcarePartyDateOfBirthBetweenFilter";
import {PatientByHealthcarePartyNameContainsFuzzyFilter} from "./patient/PatientByHealthcarePartyNameContainsFuzzyFilter";
import {PatientByHealthcarePartyFilter} from "./patient/PatientByHealthcarePartyFilter";
import {HealthcareProfessionalByIdsFilter} from "./hcp/HealthcareProfessionalByIdsFilter";
import {AllHealthcareProfessionalsFilter} from "./hcp/AllHealthcareProfessionalsFilter";
import {MedicalDeviceByIdsFilter} from "./medicaldevice/MedicalDeviceByIdsFilter";
import {AllMedicalDevicesFilter} from "./medicaldevice/AllMedicalDevicesFilter";
import {HealthcareElementByHealthcarePartyLabelCodeFilter} from "./healthcareelement/HealthcareElementByHealthcarePartyLabelCodeFilter";
import {HealthcareElementByIdsFilter} from "./healthcareelement/HealthcareElementByIdsFilter";
import {HealthcareElementByHealthcarePartyIdentifiersFilter} from "./healthcareelement/HealthcareElementByHealthcarePartyIdentifiersFilter";
import {HealthcareElementByHealthcarePartyFilter} from "./healthcareelement/HealthcareElementByHealthcarePartyFilter";
import {HealthcareElementByHealthcarePartyPatientFilter} from "./healthcareelement/HealthcareElementByHealthcarePartyPatientFilter";
import {CodingByRegionTypeLabelFilter} from "./coding/CodingByRegionTypeLabelFilter";
import {CodingByIdsFilter} from "./coding/CodingByIdsFilter";
import {AllCodingsFilter} from "./coding/AllCodingsFilter";
import {DataSampleByHealthcarePartyLabelCodeFilter} from "./datasample/DataSampleByHealthcarePartyLabelCodeFilter";

interface FilterBuilder<T> {
  build(): Promise<Filter<T>> ;
}

class UserFilter implements FilterBuilder<User> {
  _byIds?: String[]
  _union?: UserFilter[]
  _intersection?: UserFilter[]

 byIds(byIds: String[]):   UserFilter {
    this._byIds = byIds;
    return this;
  }

 union(filters: UserFilter[]):   UserFilter {
    this._union = filters;
    return this;
  }

 intersection(filters: UserFilter[]):   UserFilter {
    this._intersection = filters;
    return this;
  }

async build(): Promise<Filter<User>> {
    const filters = [
      this._byIds && ({ids: this._byIds, '$type':'UserByIdsFilter'} as UserByIdsFilter),
      this._union && ({filters: await Promise.all(this._union.map((f) => f.build())), '$type':'UnionFilter'} as UnionFilter<User>),
      this._intersection && ({filters: await Promise.all(this._intersection.map((f) => f.build())), '$type':'IntersectionFilter'} as IntersectionFilter<User>),
    ].filter((x) => !!x) as Filter<User>[];

    if (!filters.length) {
      return {'$type':'AllUsersFilter'} as AllUsersFilter;
    } else if (filters.length == 1) {
        return filters[0];
    } else {
      return ({ filters }) as IntersectionFilter<User>
    }
  }
}



class PatientFilter implements FilterBuilder<Patient> {
  _forHcp?: HealthcareProfessional

  getHcp() {
    return this._forHcp
  }

  _byIds?: String[]
  _byIdentifiers?: Identifier[]
  _withSsins?: String[]
  _dateOfBirthBetween?: [number, number];
  _byGenderEducationProfession?: [PatientGenderEnum, String | undefined, String | undefined];
  _containsFuzzy?: string;
  _union?: PatientFilter[]
  _intersection?: PatientFilter[]

  forHcp(hcp: HealthcareProfessional): PatientFilter {
    this._forHcp = hcp;
    return this;
  }

  byIds(byIds: String[]): PatientFilter {
    this._byIds = byIds;
    return this;
  }

  byIdentifiers(identifiers: Identifier[]): PatientFilter {
    this._byIdentifiers = identifiers;
    return this;
  }

  byGenderEducationProfession(gender: PatientGenderEnum, education?: string, profession?: string): PatientFilter {
    this._byGenderEducationProfession = [gender, education, profession];
    return this;
  }

  withSsins(withSsins: String[]): PatientFilter {
    this._withSsins = withSsins;
    return this;
  }

  ofAge(age: number): PatientFilter {
    const now = new Date();
    return this.dateOfBirthBetween(
      parseInt(format(addDays(new Date(now.getFullYear() - age - 1, now.getMonth(), now.getDay()), 1), 'yyyyMMdd')),
      parseInt(format(new Date(now.getFullYear() - age, now.getMonth(), now.getDay()), 'yyyyMMdd'))
    );
  }

  dateOfBirthBetween(from: number, to: number): PatientFilter {
    this._dateOfBirthBetween = [from, to];
    return this;
  }

  containsFuzzy(searchString: string): PatientFilter {
    this._containsFuzzy = searchString;
    return this;
  }

  union(filters: PatientFilter[]): PatientFilter {
    this._union = filters;
    return this;
  }

  intersection(filters: PatientFilter[]): PatientFilter {
    this._intersection = filters;
    return this;
  }

  async build(): Promise<Filter<Patient>> {
    if (this._forHcp == null) {
      throw Error("Hcp must be set for patient filter.");
    }
    const hp = this._forHcp!;

    const filters = [
      this._byIds && ({ids: this._byIds, '$type':'PatientByIdsFilter'} as PatientByIdsFilter),
      this._byIdentifiers && ({
        healthcarePartyId: hp.id,
        identifiers: this._byIdentifiers
      , '$type':'PatientByHealthcarePartyIdentifiersFilter'} as PatientByHealthcarePartyIdentifiersFilter),
      this._withSsins && ({
        healthcarePartyId: hp.id,
        identifiers: this._byIdentifiers
      , '$type':'PatientByHealthcarePartyDateOfBirthBetweenFilter'} as PatientByHealthcarePartyDateOfBirthBetweenFilter),
      this._dateOfBirthBetween && ({
        healthcarePartyId: hp.id,
        identifiers: this._byIdentifiers
      , '$type':'PatientByHealthcarePartyGenderEducationProfessionFilter'} as PatientByHealthcarePartyGenderEducationProfessionFilter),
      this._byGenderEducationProfession && ({
        healthcarePartyId: hp.id,
        identifiers: this._byIdentifiers
      , '$type':'PatientByHealthcarePartyNameContainsFuzzyFilter'} as PatientByHealthcarePartyNameContainsFuzzyFilter),
      this._containsFuzzy && ({
        healthcarePartyId: hp.id,
        identifiers: this._byIdentifiers
      , '$type':'PatientByHealthcarePartyIdentifiersFilter'} as PatientByHealthcarePartyIdentifiersFilter),
      this._union && ({filters: await Promise.all(this._union.map((f) => f.build())), '$type':'UnionFilter'} as UnionFilter<Patient>),
      this._intersection && ({filters: await Promise.all(this._intersection.map((f) => f.build())), '$type':'IntersectionFilter'} as IntersectionFilter<Patient>),
    ].filter((x) => !!x) as Filter<Patient>[];


    if (!filters.length) {
      return {healthcarePartyId: hp.id!, '$type':'PatientByHealthcarePartyFilter'} as PatientByHealthcarePartyFilter;
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return ({filters}) as IntersectionFilter<Patient>
    }

  }
}

class HealthcareProfessionalFilter implements FilterBuilder<HealthcareProfessional> {
  _byIds?: String[]
  _union?: HealthcareProfessionalFilter[]
  _intersection?: HealthcareProfessionalFilter[]

 byIds(byIds: String[]):   HealthcareProfessionalFilter {
    this._byIds = byIds;
    return this;
  }

 union(filters: HealthcareProfessionalFilter[]):   HealthcareProfessionalFilter {
    this._union = filters;
    return this;
  }

 intersection(filters: HealthcareProfessionalFilter[]):   HealthcareProfessionalFilter {
    this._intersection = filters;
    return this;
  }

  async build(): Promise<Filter<HealthcareProfessional>> {
    const filters = [
      this._byIds && ({ids: this._byIds, '$type':'HealthcareProfessionalByIdsFilter'} as HealthcareProfessionalByIdsFilter),
      this._union && ({filters: await Promise.all(this._union.map((f) => f.build())), '$type':'UnionFilter'} as UnionFilter<HealthcareProfessional>),
      this._intersection && ({filters: await Promise.all(this._intersection.map((f) => f.build())), '$type':'IntersectionFilter'} as IntersectionFilter<HealthcareProfessional>),
    ].filter((x) => !!x) as Filter<HealthcareProfessional>[];

    if (!filters.length) {
      return {'$type':'AllHealthcareProfessionalsFilter'} as AllHealthcareProfessionalsFilter;
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return ({ filters }) as IntersectionFilter<HealthcareProfessional>
    }
  }
}

class MedicalDeviceFilter implements FilterBuilder<MedicalDevice> {
  _byIds?: String[]
  _union?: MedicalDeviceFilter[]
  _intersection?: MedicalDeviceFilter[]

 byIds(byIds: String[]):   MedicalDeviceFilter {
    this._byIds = byIds;
    return this;
  }

 union(filters: MedicalDeviceFilter[]):   MedicalDeviceFilter {
    this._union = filters;
    return this;
  }

 intersection(filters: MedicalDeviceFilter[]):   MedicalDeviceFilter {
    this._intersection = filters;
    return this;
  }


  async build(): Promise<Filter<MedicalDevice>> {
    const filters = [
      this._byIds && ({ids: this._byIds, '$type':'MedicalDeviceByIdsFilter'} as MedicalDeviceByIdsFilter),
      this._union && ({filters: await Promise.all(this._union.map((f) => f.build())), '$type':'UnionFilter'} as UnionFilter<MedicalDevice>),
      this._intersection && ({filters: await Promise.all(this._intersection.map((f) => f.build())), '$type':'IntersectionFilter'} as IntersectionFilter<MedicalDevice>),
    ].filter((x) => !!x) as Filter<MedicalDevice>[];

    if (!filters.length) {
      return {'$type':'AllMedicalDevicesFilter'} as AllMedicalDevicesFilter;
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return ({ filters }) as IntersectionFilter<MedicalDevice>
    }
  }
}

class HealthcareElementFilter implements FilterBuilder<HealthcareElement> {
  _forHcp?: HealthcareProfessional
  getHcp() { return this._forHcp}

  _byIds?: String[]
  _byIdentifiers?: Identifier[]
  _byTagCodeFilter?: HealthcareElementByHealthcarePartyLabelCodeFilter
  _forPatients?: [IccCryptoXApi, Patient[]]
  _union?: HealthcareElementFilter[]
  _intersection?: HealthcareElementFilter[]

 forHcp(hcp: HealthcareProfessional):   HealthcareElementFilter {
    this._forHcp = hcp;
    return this;
  }

 byIds(byIds: String[]):   HealthcareElementFilter {
    this._byIds = byIds;
    return this;
  }

 byIdentifiers(identifiers: Identifier[]):   HealthcareElementFilter {
    this._byIdentifiers = identifiers;
    return this;
  }

  byTagCodeFilter(tagType?: string, tagCode?: string, codeType?: string, codeCode?: string): HealthcareElementFilter {
    this._byTagCodeFilter = {tagType, tagCode, codeType, codeCode, '$type':'HealthcareElementByHealthcarePartyLabelCodeFilter'} as HealthcareElementByHealthcarePartyLabelCodeFilter
    return this;
  }

  forPatients(crypto: IccCryptoXApi, patients: Patient[]): HealthcareElementFilter  {
    this._forPatients = [crypto, patients];
    return this;
  }

 union(filters: HealthcareElementFilter[]):   HealthcareElementFilter {
    this._union = filters;
    return this;
  }

 intersection(filters: HealthcareElementFilter[]):   HealthcareElementFilter {
    this._intersection = filters;
    return this;
  }

  async build(): Promise<Filter<HealthcareElement>> {
    if (this._forHcp == null) {
      throw Error("Hcp must be set for patient filter.");
    }
    const hp = this._forHcp!;
    const filters = [
      this._byIds && ({ids: this._byIds, '$type':'HealthcareElementByIdsFilter'} as HealthcareElementByIdsFilter),
      this._byIdentifiers && ({
        healthcarePartyId: hp.id,
        identifiers: this._byIdentifiers
      , '$type':'HealthcareElementByHealthcarePartyIdentifiersFilter'} as HealthcareElementByHealthcarePartyIdentifiersFilter),
      this._byTagCodeFilter,
      this._forPatients && ({
        healthcarePartyId: hp.id,
        patientSecretForeignKeys: (await Promise.all(
          this._forPatients[1].map(async (p) =>
            (await this._forPatients![0].extractKeysHierarchyFromDelegationLikes(hp.id!, p.id!, Object.entries(p.systemMetaData!.delegations!)
              .map(([k, v]) => [k, Array.from(v)] as [string, Delegation[]]).reduce((m, [k, v]) => {m[k] = v; return m}, {} as {[key: string]: Delegation[]})
            )).map((x) => x.extractedKeys))
        )).reduce((t,v) => t.concat(v[1]) ,[] as string[])
      , '$type':'HealthcareElementByHealthcarePartyPatientFilter'} as HealthcareElementByHealthcarePartyPatientFilter),
      this._union && ({filters: await Promise.all(this._union.map((f) => f.build())), '$type':'UnionFilter'} as UnionFilter<HealthcareElement>),
      this._intersection && ({filters: await Promise.all(this._intersection.map((f) => f.build())), '$type':'IntersectionFilter'} as IntersectionFilter<HealthcareElement>),
    ].filter((x) => !!x) as Filter<HealthcareElement>[];

    if (!filters.length) {
      return {healthcarePartyId: hp.id!, '$type':'HealthcareElementByHealthcarePartyFilter'} as HealthcareElementByHealthcarePartyFilter;
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return ({filters}) as IntersectionFilter<HealthcareElement>
    }

  }
}

class CodingFilter implements FilterBuilder<Coding> {
  _byIds?: String[]
  _byRegionTypeLabelLanguageFilter?: CodingByRegionTypeLabelFilter;
  _union?: CodingFilter[]
  _intersection?: CodingFilter[]

 byIds(byIds: String[]):   CodingFilter {
    this._byIds = byIds;
    return this;
  }

  byRegionTypeLabelLanguage(
      region?: string,
      type?: string,
      language?: string,
      label?: string) : CodingFilter {
    this._byRegionTypeLabelLanguageFilter = {region, type, language, label, '$type':'CodingByRegionTypeLabelFilter'} as CodingByRegionTypeLabelFilter
    return this;
  }

 union(filters: CodingFilter[]):   CodingFilter {
    this._union = filters;
    return this;
  }

 intersection(filters: CodingFilter[]):   CodingFilter {
    this._intersection = filters;
    return this;
  }


  async build(): Promise<Filter<Coding>> {
    const filters = [
      this._byIds && ({ids: this._byIds, '$type':'CodingByIdsFilter'} as CodingByIdsFilter),
      this._byRegionTypeLabelLanguageFilter,
      this._union && ({filters: await Promise.all(this._union.map((f) => f.build())), '$type':'UnionFilter'} as UnionFilter<Coding>),
      this._intersection && ({filters: await Promise.all(this._intersection.map((f) => f.build())), '$type':'IntersectionFilter'} as IntersectionFilter<Coding>),
    ].filter((x) => !!x) as Filter<Coding>[];

    if (!filters.length) {
      return {'$type':'AllCodingsFilter'} as AllCodingsFilter;
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return ({ filters }) as IntersectionFilter<Coding>
    }
  }
}


class DataSampleFilter implements FilterBuilder<DataSample> {
  _forHcp?: HealthcareProfessional
  getHcp() { return this._forHcp}

  _byIds?: String[]
  _byIdentifiers?: Identifier[]
  _byTagCodeDateFilter?: DataSampleByHealthcarePartyLabelCodeFilter;
  _forPatients?: [IccCryptoXApi, Patient[]]
  _union?: DataSampleFilter[]
  _intersection?: DataSampleFilter[]

 forHcp(hcp: HealthcareProfessional):   DataSampleFilter {
    this._forHcp = hcp;
    return this;
  }

 byIds(byIds: String[]):   DataSampleFilter {
    this._byIds = byIds;
    return this;
  }

 byIdentifiers(identifiers: Identifier[]):   DataSampleFilter {
    this._byIdentifiers = identifiers;
    return this;
  }

  byTagCodeFilter(tagType?: string, tagCode?: string, codeType?: string, codeCode?: string, startValueDate?: number, endValueDate?: number): DataSampleFilter {
    this._byTagCodeDateFilter = {tagType, tagCode, codeType, codeCode, startValueDate, endValueDate, '$type':'DataSampleByHealthcarePartyLabelCodeFilter'} as DataSampleByHealthcarePartyLabelCodeFilter
    return this;
  }

  forPatients(crypto: IccCryptoXApi, patients: Patient[]): DataSampleFilter {
    this._forPatients = [crypto, patients];
    return this;
  }

 union(filters: DataSampleFilter[]):   DataSampleFilter {
    this._union = filters;
    return this;
  }

 intersection(filters: DataSampleFilter[]):   DataSampleFilter {
    this._intersection = filters;
    return this;
  }

  async build(): Promise<Filter<HealthcareElement>> {
    if (this._forHcp == null) {
      throw Error("Hcp must be set for patient filter.");
    }
    const hp = this._forHcp!;
    const filters = [
      this._byIds && ({ids: this._byIds, '$type':'HealthcareElementByIdsFilter'} as HealthcareElementByIdsFilter),
      this._byIdentifiers && ({
        healthcarePartyId: hp.id,
        identifiers: this._byIdentifiers
      , '$type':'HealthcareElementByHealthcarePartyIdentifiersFilter'} as HealthcareElementByHealthcarePartyIdentifiersFilter),
      this._byTagCodeDateFilter,
      this._forPatients && ({
        healthcarePartyId: hp.id,
        patientSecretForeignKeys: (await Promise.all(
          this._forPatients[1].map(async (p) =>
            (await this._forPatients![0].extractKeysHierarchyFromDelegationLikes(hp.id!, p.id!, Object.entries(p.systemMetaData!.delegations!)
              .map(([k, v]) => [k, Array.from(v)] as [string, Delegation[]]).reduce((m, [k, v]) => {m[k] = v; return m}, {} as {[key: string]: Delegation[]})
            )).map((x) => x.extractedKeys))
        )).reduce((t,v) => t.concat(v[1]) ,[] as string[])
      , '$type':'HealthcareElementByHealthcarePartyPatientFilter'} as HealthcareElementByHealthcarePartyPatientFilter),
      this._union && ({filters: await Promise.all(this._union.map((f) => f.build())), '$type':'UnionFilter'} as UnionFilter<HealthcareElement>),
      this._intersection && ({filters: await Promise.all(this._intersection.map((f) => f.build())), '$type':'IntersectionFilter'} as IntersectionFilter<HealthcareElement>),
    ].filter((x) => !!x) as Filter<HealthcareElement>[];

    if (!filters.length) {
      return {healthcarePartyId: hp.id!, '$type':'HealthcareElementByHealthcarePartyFilter'} as HealthcareElementByHealthcarePartyFilter;
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return ({filters}) as IntersectionFilter<HealthcareElement>
    }

  }
}

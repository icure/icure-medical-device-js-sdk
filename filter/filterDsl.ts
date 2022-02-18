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
      this._byIds && ({ids: this._byIds} as UserByIdsFilter),
      await this._union && ({filters: this._union} as UnionFilter<User>),
      await this._intersection && ({filters: this._union} as IntersectionFilter<User>),
    ].filter((x) => !!x) as Filter<User>[];

    if (!filters.length) {
      return {} as AllUsersFilter;
    } else if (filters.length == 1) {
        return filters[0];
    } else {
      return ({ filters }) as IntersectionFilter<User>
    }
  }
}



class PatientFilter implements FilterBuilder<Patient> {
  _forHcp?: HealthcareProfessional
  getHcp() { return this._forHcp }

  _byIds?: String[]
  _byIdentifiers?: Identifier[]
  _withSsins?: String[]
  _dateOfBirthBetween?: [number, number];
  _byGenderEducationProfession?: [PatientGenderEnum, String | undefined, String | undefined];
  _containsFuzzy?: string;
  _union?: PatientFilter[]
  _intersection?: PatientFilter[]

 forHcp(hcp: HealthcareProfessional):   PatientFilter {
    this._forHcp = hcp;
    return this;
  }

 byIds(byIds: String[]):   PatientFilter {
    this._byIds = byIds;
    return this;
  }

 byIdentifiers(identifiers: Identifier[]):   PatientFilter {
    this._byIdentifiers = identifiers;
    return this;
  }

  byGenderEducationProfession(gender: PatientGenderEnum, education?: string, profession?: string): PatientFilter {
    this._byGenderEducationProfession = [gender, education, profession];
    return this;
  }

 withSsins(withSsins: String[]):   PatientFilter {
    this._withSsins = withSsins;
    return this;
  }

 ofAge(age: number):   PatientFilter {
    const now = Date.now();
    return dateOfBirthBetween(
        DateTime(now.year - age - 1, now.month, now.day).add(Duration(days: 1)),
        DateTime(now.year - age, now.month, now.day)
    );
  }

  PatientFilter dateOfBirthBetween(DateTime from, DateTime to) {
    this._dateOfBirthBetween = Tuple2(from, to);
    return this;
  }

 containsFuzzy(searchString: String):   PatientFilter {
    this._containsFuzzy = searchString;
    return this;
  }

 union(filters: PatientFilter[]):   PatientFilter {
    this._union = filters;
    return this;
  }

 intersection(filters: PatientFilter[]):   PatientFilter {
    this._intersection = filters;
    return this;
  }

async build(): Promise<Filter<Patient>> {
    if (_forHcp == null) {
      throw FormatException("Hcp must be set for patient filter.");
    }
    final HealthcareProfessional hp = _forHcp!;

    const filters = [
      _byIds && PatientByIdsFilter(ids: v.toList())),
      _byIdentifiers && PatientByHcPartyAndIdentifiersFilter(healthcarePartyId: hp.id!, identifiers: v.toList())),
      _withSsins && PatientByHcPartyAndSsinsFilter(healthcarePartyId: hp.id!, ssins: v.toList())),
      _dateOfBirthBetween && PatientByHcPartyDateOfBirthBetweenFilter(healthcarePartyId: hp.id!, minDateOfBirth: v.item1?.toFuzzy(), maxDateOfBirth: v.item2?.toFuzzy())),
      _byGenderEducationProfession && PatientByHcPartyGenderEducationProfessionFilter(healthcarePartyId: hp.id!, gender: v.item1, education: v.item2, profession: v.item3)),
      _containsFuzzy && PatientByHcPartyNameContainsFuzzyFilter(healthcarePartyId: hp.id!, searchString: v)),
      await _union && UnionFilter<Patient>(filters:await Future.wait(v.map((f) async => await f.forHcp(f.hcp ?? hp).build()).toList()))),
      await _intersection && IntersectionFilter<Patient>(filters:await Future.wait(v.map((f) async => await f.forHcp(f.hcp ?? hp).build()).toList())))
    ].whereType<Filter<Patient>>().toList();

    if (filters.isEmpty) {
      return PatientByHcPartyFilter(healthcarePartyId: hp.id!);
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return IntersectionFilter(filters: filters);
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
      _byIds && HealthcareProfessionalByIdsFilter(ids: v)),
      await _union && UnionFilter<HealthcareProfessional>(filters:await Future.wait(v.map((f) async => await f.build()).toList()))),
      await _intersection && IntersectionFilter<HealthcareProfessional>(filters:await Future.wait(v.map((f) async => await f.build()).toList())))
    ].whereType<Filter<HealthcareProfessional>>().toList();

    if (filters.isEmpty) {
      return AllHealthcareProfessionalsFilter();
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return IntersectionFilter(filters: filters);
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
      _byIds && MedicalDeviceByIdsFilter(ids: v)),
      await _union && UnionFilter<MedicalDevice>(filters:await Future.wait(v.map((f) async => await f.build()).toList()))),
      await _intersection && IntersectionFilter<MedicalDevice>(filters:await Future.wait(v.map((f) async => await f.build()).toList())))
    ].whereType<Filter<MedicalDevice>>().toList();

    if (filters.isEmpty) {
      return AllMedicalDevicesFilter();
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return IntersectionFilter(filters: filters);
    }
  }
}

class HealthcareElementFilter implements FilterBuilder<HealthcareElement> {
  _forHcp?: HealthcareProfessional
  getHcp() { return this._forHcp}

  _byIds?: String[]
  _byIdentifiers?: Identifier[]
  HealthcareElementByHcPartyTagCodeFilter? _byTagCodeFilter;
  Tuple2<Crypto, Patient>[]? _forPatients;

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

  HealthcareElementFilter byTagCodeFilter({
    String? tagType = null,
    String? tagCode = null,
    String? codeType = null,
    String? codeNumber = null,
    int? status = null}) {
    this._byTagCodeFilter = HealthcareElementByHcPartyTagCodeFilter(tagType: tagType, tagCode: tagCode, codeType: codeType, codeNumber: codeNumber, status: status);
    return this;
  }

  HealthcareElementFilter forPatients(Crypto crypto, Patient[] patients) {
    this._forPatients = Tuple2(crypto, patients);
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
    if (_forHcp == null) {
      throw FormatException("Hcp must be set for patient filter.");
    }
    final HealthcareProfessional hp = _forHcp!;

    const filters = [
      _byIds && HealthcareElementByIdsFilter(ids: v)),
      _byIdentifiers && HealthcareElementByHcPartyIdentifiersFilter(healthcarePartyId: hp.id!, identifiers: v.toList())),
      _byTagCodeFilter && v.healthcarePartyId = hp.id!),
      await _forPatients && HealthcareElementByHcPartyPatientFilter(healthcarePartyId: hp.id!, patientSecretForeignKeys: (await Future.wait(v.item2.map((p) => v.item1.decryptEncryptionKeys(hp.id!, (p.systemMetaData?.delegations ?? {}).map((k,v) => MapEntry(k, v.map((d)=> d.toDelegationDto()).toSet())))))).toSet().flatten())),
      await _union && UnionFilter<HealthcareElement>(filters:await Future.wait(v.map((f) async => await f.forHcp(f.hcp ?? hp).build()).toList()))),
      await _intersection && IntersectionFilter<HealthcareElement>(filters:await Future.wait(v.map((f) async => await f.forHcp(f.hcp ?? hp).build()).toList())))
    ].whereType<Filter<HealthcareElement>>().toList();

    if (filters.isEmpty) {
      return HealthcareElementByHcPartyFilter(hcpId: hp.id!);
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return IntersectionFilter(filters: filters);
    }
  }
}


class CodingFilter implements FilterBuilder<Coding> {
  _byIds?: String[]
  CodingByRegionTypeLabelLanguageFilter? _byRegionTypeLabelLanguageFilter;
  _union?: CodingFilter[]
  _intersection?: CodingFilter[]

 byIds(byIds: String[]):   CodingFilter {
    this._byIds = byIds;
    return this;
  }

  CodingFilter byRegionTypeLabelLanguage({
      String? region = null,
      String? type = null,
      String? language = null,
      String? label = null}) {
    this._byRegionTypeLabelLanguageFilter = CodingByRegionTypeLabelLanguageFilter(region: region, type: type, language: language, label: label);
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
      _byIds && CodingByIdsFilter(ids: v)),
      _byRegionTypeLabelLanguageFilter && v),
      await _union && UnionFilter<Coding>(filters:await Future.wait(v.map((f) async => await f.build()).toList()))),
      await _intersection && IntersectionFilter<Coding>(filters:await Future.wait(v.map((f) async => await f.build()).toList())))
    ].whereType<Filter<Coding>>().toList();

    if (filters.isEmpty) {
      return AllCodingsFilter();
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return IntersectionFilter(filters: filters);
    }
  }
}


class DataSampleFilter implements FilterBuilder<DataSample> {
  _forHcp?: HealthcareProfessional
  getHcp() { return this._forHcp}

  _byIds?: String[]
  _byIdentifiers?: Identifier[]
  DataSampleByHcPartyTagCodeDateFilter? _byTagCodeDateFilter;
  Tuple2<Crypto, Patient>[]? _forPatients;
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

  DataSampleFilter byTagCodeDateFilter({
    String? tagType = null,
    String? tagCode = null,
    String? codeType = null,
    String? codeCode = null,
    int? startValueDate = null,
    int? endValueDate = null,
  }) {
    this._byTagCodeDateFilter = DataSampleByHcPartyTagCodeDateFilter(tagType: tagType, tagCode: tagCode, codeType: codeType, codeCode: codeCode, startValueDate: startValueDate, endValueDate: endValueDate);
    return this;
  }

  DataSampleFilter forPatients(Crypto crypto, Patient[] patients) {
    this._forPatients = Tuple2(crypto, patients);
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

async build(): Promise<Filter<DataSample>> {
    if (_forHcp == null) {
      throw FormatException("Hcp must be set for patient filter.");
    }
    final HealthcareProfessional hp = _forHcp!;

    const filters = [
      _byIds && DataSampleByIdsFilter(ids: v)),
      _byIdentifiers && DataSampleByHcPartyIdentifiersFilter(healthcarePartyId: hp.id!, identifiers: v.toList())),
      _byTagCodeDateFilter && v.healthcarePartyId = hp.id!),
      await _forPatients && DataSampleBySecretForeignKeys(healthcarePartyId: hp.id!, patientSecretForeignKeys: (await Future.wait(v.item2.map((p) => v.item1.decryptEncryptionKeys(hp.id!, (p.systemMetaData?.delegations ?? {}).map((k,v) => MapEntry(k, v.map((d)=> d.toDelegationDto()).toSet())))))).toSet().flatten())),
      await _union && UnionFilter<DataSample>(filters:await Future.wait(v.map((f) async => await f.forHcp(f.hcp ?? hp).build()).toList()))),
      await _intersection && IntersectionFilter<DataSample>(filters:await Future.wait(v.map((f) async => await f.forHcp(f.hcp ?? hp).build()).toList())))
    ].whereType<Filter<DataSample>>().toList();

    if (filters.isEmpty) {
      return DataSampleByHcPartyFilter(hcpId: hp.id!);
    } else if (filters.length == 1) {
      return filters[0];
    } else {
      return IntersectionFilter(filters: filters);
    }
  }
}

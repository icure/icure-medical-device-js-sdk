import 'package:icure_dart_sdk/api.dart' as api;
import 'package:icure_medical_device_dart_sdk/api.dart';

import 'identifier.dart';
import 'patient.dart';

extension FilterMapper<F> on Filter<F> {
  api.AbstractFilterDto<T> toAbstractFilterDto<T>() {
      if (F == Coding || T == api.CodeDto) {
        return (this as Filter<Coding>).toAbstractFilterCodeDto() as api.AbstractFilterDto<T>;
      }
      if (F == DataSample || T == api.ServiceDto) {
        return (this as Filter<DataSample>).toAbstractFilterServiceDto() as api.AbstractFilterDto<T>;
      }
      if (F == MedicalDevice || T == api.DeviceDto) {
        return (this as Filter<MedicalDevice>).toAbstractFilterDeviceDto() as api.AbstractFilterDto<T>;
      }
      if (F == HealthcareProfessional || T == api.HealthcarePartyDto) {
        return (this as Filter<HealthcareProfessional>).toAbstractFilterHealthcarePartyDto() as api.AbstractFilterDto<T>;
      }
      if (F == HealthcareElement || T == api.HealthElementDto) {
        return (this as Filter<HealthcareElement>).toAbstractFilterHealthElementDto() as api.AbstractFilterDto<T>;
      }
      if (F == Patient || T == api.PatientDto) {
        return (this as Filter<Patient>).toAbstractFilterPatientDto() as api.AbstractFilterDto<T>;
      }
      if (F == User || T == api.UserDto) {
        return (this as Filter<User>).toAbstractFilterUserDto() as api.AbstractFilterDto<T>;
      }
      throw FormatException("No mapper for ${F} -> ${T}");
  }
}

extension CodingFilterMapper on Filter<Coding>{
  api.AbstractFilterDto<api.CodeDto> toAbstractFilterCodeDto() {
    if (this is ComplementFilter<Coding>) {
      return (this as ComplementFilter<Coding>).toComplementFilterDto();
    }
    if (this is UnionFilter<Coding>) {
      return (this as UnionFilter<Coding>).toUnionFilterDto();
    }
    if (this is IntersectionFilter<Coding>) {
      return (this as IntersectionFilter<Coding>).toIntersectionFilterDto();
    }
    if (this is AllCodingsFilter) {
      return (this as AllCodingsFilter).toAllCodesFilterDto();
    }
    if (this is CodingByIdsFilter) {
      return (this as CodingByIdsFilter).toCodeByIdsFilterDto();
    }
    if (this is CodingByRegionTypeLabelLanguageFilter) {
      return (this as CodingByRegionTypeLabelLanguageFilter).toCodeByRegionTypeLabelLanguageFilterDto();
    }
    throw FormatException("No mapper for ${this}");
  }
}

extension ComplementCodingFilterMapper on ComplementFilter<Coding> {
  api.ComplementFilter<api.CodeDto> toComplementFilterDto() =>
      api.ComplementFilter<api.CodeDto>(
          desc: this.description, superSet: this.superSet?.toAbstractFilterCodeDto()
      );
}

extension UnionCodingFilterMapper on UnionFilter<Coding> {
  api.UnionFilter<api.CodeDto> toUnionFilterDto() =>
      api.UnionFilter<api.CodeDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterCodeDto()).toList()
      );
}

extension IntersectionCodingFilterMapper on IntersectionFilter<Coding> {
  api.IntersectionFilter<api.CodeDto> toIntersectionFilterDto() =>
      api.IntersectionFilter<api.CodeDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterCodeDto()).toList()
      );
}

extension AllCodingsFilterMapper on AllCodingsFilter {
  api.AllCodesFilter toAllCodesFilterDto() => api.AllCodesFilter(desc: this.description);
}
extension CodingByIdsFilterMapper on CodingByIdsFilter {
  api.CodeByIdsFilter toCodeByIdsFilterDto() => api.CodeByIdsFilter(desc: this.description, ids: this.ids);
}

extension CodingByRegionTypeLabelLanguageFilterMapper on CodingByRegionTypeLabelLanguageFilter {
  api.CodeByRegionTypeLabelLanguageFilter toCodeByRegionTypeLabelLanguageFilterDto() =>
      api.CodeByRegionTypeLabelLanguageFilter(
          desc: this.description,
          region: this.region,
          type: this.type,
          language: this.language,
          label: this.label
      );
}


extension DataSampleFilterMapper on Filter<DataSample>{
  api.AbstractFilterDto<api.ServiceDto> toAbstractFilterServiceDto() {
    if (this is ComplementFilter<DataSample>) {
      return (this as ComplementFilter<DataSample>).toComplementFilterDto();
    }
    if (this is UnionFilter<DataSample>) {
      return (this as UnionFilter<DataSample>).toUnionFilterDto();
    }
    if (this is IntersectionFilter<DataSample>) {
      return (this as IntersectionFilter<DataSample>).toIntersectionFilterDto();
    }
    if (this is DataSampleByHcPartyFilter) {
      return (this as DataSampleByHcPartyFilter).toServiceByHcPartyFilterDto();
    }
    if (this is DataSampleByHcPartyIdentifiersFilter) {
      return (this as DataSampleByHcPartyIdentifiersFilter).toServiceByHcPartyIdentifiersFilterDto();
    }
    if (this is DataSampleByHcPartyTagCodeDateFilter) {
      return (this as DataSampleByHcPartyTagCodeDateFilter).toServiceByHcPartyTagCodeDateFilterDto();
    }
    if (this is DataSampleByIdsFilter) {
      return (this as DataSampleByIdsFilter).toServiceByIdsFilterDto();
    }
    if (this is DataSampleBySecretForeignKeys) {
      return (this as DataSampleBySecretForeignKeys).toServiceBySecretForeignKeysDto();
    }
    throw FormatException("No mapper for ${this}");
  }
}

extension ComplementDataSampleFilterMapper on ComplementFilter<DataSample> {
  api.ComplementFilter<api.ServiceDto> toComplementFilterDto() =>
      api.ComplementFilter<api.ServiceDto>(
          desc: this.description, superSet: this.superSet?.toAbstractFilterServiceDto()
      );
}

extension UnionDataSampleFilterMapper on UnionFilter<DataSample> {
  api.UnionFilter<api.ServiceDto> toUnionFilterDto() =>
      api.UnionFilter<api.ServiceDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterServiceDto()).toList()
      );
}

extension IntersectionDataSampleFilterMapper on IntersectionFilter<DataSample> {
  api.IntersectionFilter<api.ServiceDto> toIntersectionFilterDto() =>
      api.IntersectionFilter<api.ServiceDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterServiceDto()).toList()
      );
}

extension DataSampleByHcPartyFilterMapper on DataSampleByHcPartyFilter {
  api.ServiceByHcPartyFilter toServiceByHcPartyFilterDto() => api.ServiceByHcPartyFilter(desc: this.description);
}
extension DataSampleByHcPartyIdentifiersFilterMapper on DataSampleByHcPartyIdentifiersFilter {
  api.ServiceByHcPartyIdentifiersFilter toServiceByHcPartyIdentifiersFilterDto() =>
      api.ServiceByHcPartyIdentifiersFilter(
          desc: this.description, healthcarePartyId: this.healthcarePartyId, identifiers: this.identifiers.map((it) => it.toIdentifierDto()).toList()
      );
}
extension DataSampleByHcPartyTagCodeDateFilterMapper on DataSampleByHcPartyTagCodeDateFilter {
  api.ServiceByHcPartyTagCodeDateFilter toServiceByHcPartyTagCodeDateFilterDto() =>
      api.ServiceByHcPartyTagCodeDateFilter(
          desc: this.description,
          healthcarePartyId: this.healthcarePartyId,
          patientSecretForeignKey: this.patientSecretForeignKey,
          tagType: this.tagType,
          tagCode: this.tagCode,
          codeType: this.codeType,
          codeCode: this.codeCode,
          startValueDate: this.startValueDate,
          endValueDate: this.endValueDate
      );
}
extension DataSampleByIdsFilterMapper on DataSampleByIdsFilter {
  api.ServiceByIdsFilter toServiceByIdsFilterDto() => api.ServiceByIdsFilter(desc: this.description, ids: this.ids);
}
extension DataSampleBySecretForeignKeysMapper on DataSampleBySecretForeignKeys {
  api.ServiceBySecretForeignKeys toServiceBySecretForeignKeysDto() => api.ServiceBySecretForeignKeys(
      desc: this.description, healthcarePartyId: this.healthcarePartyId, patientSecretForeignKeys: this.patientSecretForeignKeys
  );
}

extension MedicalDeviceFilterMapper on Filter<MedicalDevice>{
  api.AbstractFilterDto<api.DeviceDto> toAbstractFilterDeviceDto() {
    if (this is ComplementFilter<MedicalDevice>) {
      return (this as ComplementFilter<MedicalDevice>).toComplementFilterDto();
    }
    if (this is UnionFilter<MedicalDevice>) {
      return (this as UnionFilter<MedicalDevice>).toUnionFilterDto();
    }
    if (this is IntersectionFilter<MedicalDevice>) {
      return (this as IntersectionFilter<MedicalDevice>).toIntersectionFilterDto();
    }
    if (this is AllMedicalDevicesFilter) {
      return (this as AllMedicalDevicesFilter).toAllDevicesFilterDto();
    }
    if (this is MedicalDeviceByIdsFilter) {
      return (this as MedicalDeviceByIdsFilter).toDeviceByIdsFilterDto();
    }
    throw FormatException("No mapper for ${this}");
  }
}

extension ComplementMedicalDeviceFilterMapper on ComplementFilter<MedicalDevice> {
  api.ComplementFilter<api.DeviceDto> toComplementFilterDto() =>
      api.ComplementFilter<api.DeviceDto>(
          desc: this.description, superSet: this.superSet?.toAbstractFilterDeviceDto()
      );
}

extension UnionMedicalDeviceFilterMapper on UnionFilter<MedicalDevice> {
  api.UnionFilter<api.DeviceDto> toUnionFilterDto() =>
      api.UnionFilter<api.DeviceDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterDeviceDto()).toList()
      );
}

extension IntersectionMedicalDeviceFilterMapper on IntersectionFilter<MedicalDevice> {
  api.IntersectionFilter<api.DeviceDto> toIntersectionFilterDto() =>
      api.IntersectionFilter<api.DeviceDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterDeviceDto()).toList()
      );
}

extension AllMedicalDevicesFilterMapper on AllMedicalDevicesFilter {
  api.AllDevicesFilter toAllDevicesFilterDto() =>
      api.AllDevicesFilter(desc: this.description);
}
extension MedicalDeviceByIdsFilterMapper on MedicalDeviceByIdsFilter {
  api.DeviceByIdsFilter toDeviceByIdsFilterDto() =>
      api.DeviceByIdsFilter(desc: this.description, ids: this.ids);
}

extension HealthcareProfessionalFilterMapper on Filter<HealthcareProfessional>{
  api.AbstractFilterDto<api.HealthcarePartyDto> toAbstractFilterHealthcarePartyDto() {
    if (this is ComplementFilter<HealthcareProfessional>) {
      return (this as ComplementFilter<HealthcareProfessional>).toComplementFilterDto();
    }
    if (this is UnionFilter<HealthcareProfessional>) {
      return (this as UnionFilter<HealthcareProfessional>).toUnionFilterDto();
    }
    if (this is IntersectionFilter<HealthcareProfessional>) {
      return (this as IntersectionFilter<HealthcareProfessional>).toIntersectionFilterDto();
    }
    if (this is AllHealthcareProfessionalsFilter) {
      return (this as AllHealthcareProfessionalsFilter).toAllHealthcarePartiesFilterDto();
    }
    if (this is HealthcareProfessionalByIdsFilter) {
      return (this as HealthcareProfessionalByIdsFilter).toHealthcarePartyByIdsFilterDto();
    }
    throw FormatException("No mapper for ${this}");
  }
}

extension ComplementHealthcareProfessionalFilterMapper on ComplementFilter<HealthcareProfessional> {
  api.ComplementFilter<api.HealthcarePartyDto> toComplementFilterDto() =>
      api.ComplementFilter<api.HealthcarePartyDto>(
          desc: this.description, superSet: this.superSet?.toAbstractFilterHealthcarePartyDto()
      );
}

extension UnionHealthcareProfessionalFilterMapper on UnionFilter<HealthcareProfessional> {
  api.UnionFilter<api.HealthcarePartyDto> toUnionFilterDto() =>
      api.UnionFilter<api.HealthcarePartyDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterHealthcarePartyDto()).toList()
      );
}

extension IntersectionHealthcareProfessionalFilterMapper on IntersectionFilter<HealthcareProfessional> {
  api.IntersectionFilter<api.HealthcarePartyDto> toIntersectionFilterDto() =>
      api.IntersectionFilter<api.HealthcarePartyDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterHealthcarePartyDto()).toList()
      );
}

extension AllHealthcareProfessionalsFilterMapper on AllHealthcareProfessionalsFilter {
  api.AllHealthcarePartiesFilter toAllHealthcarePartiesFilterDto() =>
      api.AllHealthcarePartiesFilter(desc: this.description);
}
extension HealthcareProfessionalByIdsFilterMapper on HealthcareProfessionalByIdsFilter {
  api.HealthcarePartyByIdsFilter toHealthcarePartyByIdsFilterDto() =>
      api.HealthcarePartyByIdsFilter(desc: this.description, ids: this.ids);
}

extension HealthcareElementFilterMapper on Filter<HealthcareElement>{
  api.AbstractFilterDto<api.HealthElementDto> toAbstractFilterHealthElementDto() {
    if (this is ComplementFilter<HealthcareElement>) {
      return (this as ComplementFilter<HealthcareElement>).toComplementFilterDto();
    }
    if (this is UnionFilter<HealthcareElement>) {
      return (this as UnionFilter<HealthcareElement>).toUnionFilterDto();
    }
    if (this is IntersectionFilter<HealthcareElement>) {
      return (this as IntersectionFilter<HealthcareElement>).toIntersectionFilterDto();
    }
    if (this is HealthcareElementByHcPartyFilter) {
      return (this as HealthcareElementByHcPartyFilter).toHealthElementByHcPartyFilterDto();
    }
    if (this is HealthcareElementByHcPartyIdentifiersFilter) {
      return (this as HealthcareElementByHcPartyIdentifiersFilter).toHealthElementByHcPartyIdentifiersFilterDto();
    }
    if (this is HealthcareElementByHcPartyPatientFilter) {
      return (this as HealthcareElementByHcPartyPatientFilter).toHealthElementByHcPartySecretForeignKeysFilterDto();
    }
    if (this is HealthcareElementByHcPartyTagCodeFilter) {
      return (this as HealthcareElementByHcPartyTagCodeFilter).toHealthElementByHcPartyTagCodeFilterDto();
    }
    if (this is HealthcareElementByIdsFilter) {
      return (this as HealthcareElementByIdsFilter).toHealthElementByIdsFilterDto();
    }
    throw FormatException("No mapper for ${this}");
  }
}

extension ComplementHealthcareElementFilterMapper on ComplementFilter<HealthcareElement> {
  api.ComplementFilter<api.HealthElementDto> toComplementFilterDto() =>
      api.ComplementFilter<api.HealthElementDto>(
          desc: this.description, superSet: this.superSet?.toAbstractFilterHealthElementDto()
      );
}

extension UnionHealthcareElementFilterMapper on UnionFilter<HealthcareElement> {
  api.UnionFilter<api.HealthElementDto> toUnionFilterDto() =>
      api.UnionFilter<api.HealthElementDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterHealthElementDto()).toList()
      );
}

extension IntersectionHealthcareElementFilterMapper on IntersectionFilter<HealthcareElement> {
  api.IntersectionFilter<api.HealthElementDto> toIntersectionFilterDto() =>
      api.IntersectionFilter<api.HealthElementDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterHealthElementDto()).toList()
      );
}

extension HealthcareElementByHcPartyFilterMapper on HealthcareElementByHcPartyFilter {
  api.HealthElementByHcPartyFilter toHealthElementByHcPartyFilterDto() =>
      api.HealthElementByHcPartyFilter(desc: this.description, hcpId: this.hcpId);
}

extension HealthcareElementByHcPartyIdentifiersFilterMapper on HealthcareElementByHcPartyIdentifiersFilter {
  api.HealthElementByHcPartyIdentifiersFilter toHealthElementByHcPartyIdentifiersFilterDto() =>
      api.HealthElementByHcPartyIdentifiersFilter(
          desc: this.description,
          healthcarePartyId: this.healthcarePartyId,
          identifiers: this.identifiers.map((it) => it.toIdentifierDto()).toList()
      );
}

extension HealthcareElementByHcPartySecretForeignKeysFilterMapper on HealthcareElementByHcPartyPatientFilter {
  api.HealthElementByHcPartySecretForeignKeysFilter toHealthElementByHcPartySecretForeignKeysFilterDto() =>
      api.HealthElementByHcPartySecretForeignKeysFilter(
          desc: this.description,
          healthcarePartyId: this.healthcarePartyId,
          patientSecretForeignKeys: this.patientSecretForeignKeys
      );
}

extension HealthcareElementByHcPartyTagCodeFilterMapper on HealthcareElementByHcPartyTagCodeFilter {
  api.HealthElementByHcPartyTagCodeFilter toHealthElementByHcPartyTagCodeFilterDto() =>
      api.HealthElementByHcPartyTagCodeFilter(
          desc: this.description,
          healthcarePartyId: this.healthcarePartyId,
          codeType: this.codeType,
          codeCode: this.codeNumber,
          tagType: this.tagType,
          tagCode: this.tagCode,
          status: this.status
      );
}

extension HealthcareElementByIdsFilterMapper on HealthcareElementByIdsFilter {
  api.HealthElementByIdsFilter toHealthElementByIdsFilterDto() =>
      api.HealthElementByIdsFilter(desc: this.description, ids: this.ids);
}

extension UserFilterMapper on Filter<User>{
  api.AbstractFilterDto<api.UserDto> toAbstractFilterUserDto() {
    if (this is ComplementFilter<User>) {
      return (this as ComplementFilter<User>).toComplementFilterDto();
    }
    if (this is UnionFilter<User>) {
      return (this as UnionFilter<User>).toUnionFilterDto();
    }
    if (this is IntersectionFilter<User>) {
      return (this as IntersectionFilter<User>).toIntersectionFilterDto();
    }
    if (this is AllUsersFilter) {
      return (this as AllUsersFilter).toAllUsersFilterDto();
    }
    if (this is UserByIdsFilter) {
      return (this as UserByIdsFilter).toUserByIdsFilterDto();
    }
    throw FormatException("No mapper for ${this}");
  }
}

extension ComplementUserFilterMapper on ComplementFilter<User> {
  api.ComplementFilter<api.UserDto> toComplementFilterDto() =>
      api.ComplementFilter<api.UserDto>(
          desc: this.description, superSet: this.superSet?.toAbstractFilterUserDto()
      );
}

extension UnionUserFilterMapper on UnionFilter<User> {
  api.UnionFilter<api.UserDto> toUnionFilterDto() =>
      api.UnionFilter<api.UserDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterUserDto()).toList()
      );
}

extension IntersectionUserFilterMapper on IntersectionFilter<User> {
  api.IntersectionFilter<api.UserDto> toIntersectionFilterDto() =>
      api.IntersectionFilter<api.UserDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterUserDto()).toList()
      );
}

extension AllUsersFilterMapper on AllUsersFilter {
  api.AllUsersFilter toAllUsersFilterDto() =>
      api.AllUsersFilter(desc: this.description);
}

extension UserByIdsFilterMapper on UserByIdsFilter {
  api.UserByIdsFilter toUserByIdsFilterDto() =>
      api.UserByIdsFilter(desc: this.description, ids: this.ids);
}


extension PatientFilterMapper on Filter<Patient>{
  api.AbstractFilterDto<api.PatientDto> toAbstractFilterPatientDto() {
    if (this is ComplementFilter<Patient>) {
      return (this as ComplementFilter<Patient>).toComplementFilterDto();
    }
    if (this is UnionFilter<Patient>) {
      return (this as UnionFilter<Patient>).toUnionFilterDto();
    }
    if (this is IntersectionFilter<Patient>) {
      return (this as IntersectionFilter<Patient>).toIntersectionFilterDto();
    }
    if (this is PatientByHcPartyFilter) {
      return (this as PatientByHcPartyFilter).toPatientByHcPartyFilterDto();
    }
    if (this is PatientByHcPartyAndIdentifiersFilter) {
      return (this as PatientByHcPartyAndIdentifiersFilter).toPatientByHcPartyAndIdentifiersFilterDto();
    }
    if (this is PatientByHcPartyAndSsinsFilter) {
      return (this as PatientByHcPartyAndSsinsFilter).toPatientByHcPartyAndSsinsFilterDto();
    }
    if (this is PatientByHcPartyDateOfBirthBetweenFilter) {
      return (this as PatientByHcPartyDateOfBirthBetweenFilter).toPatientByHcPartyDateOfBirthBetweenFilterDto();
    }
    if (this is PatientByHcPartyNameContainsFuzzyFilter) {
      return (this as PatientByHcPartyNameContainsFuzzyFilter).toPatientByHcPartyNameContainsFuzzyFilterDto();
    }
    if (this is PatientByHcPartyGenderEducationProfessionFilter) {
      return (this as PatientByHcPartyGenderEducationProfessionFilter).toPatientByHcPartyGenderEducationProfessionDto();
    }
    if (this is PatientByIdsFilter) {
      return (this as PatientByIdsFilter).toPatientByIdsFilterDto();
    }
    throw FormatException("No mapper for ${this}");
  }
}

extension ComplementPatientFilterMapper on ComplementFilter<Patient> {
  api.ComplementFilter<api.PatientDto> toComplementFilterDto() =>
      api.ComplementFilter<api.PatientDto>(
          desc: this.description, superSet: this.superSet?.toAbstractFilterPatientDto()
      );
}

extension UnionPatientFilterMapper on UnionFilter<Patient> {
  api.UnionFilter<api.PatientDto> toUnionFilterDto() =>
      api.UnionFilter<api.PatientDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterPatientDto()).toList()
      );
}

extension IntersectionPatientFilterMapper on IntersectionFilter<Patient> {
  api.IntersectionFilter<api.PatientDto> toIntersectionFilterDto() =>
      api.IntersectionFilter<api.PatientDto>(
          desc: this.description, filters: this.filters.map((it) => it.toAbstractFilterPatientDto()).toList()
      );
}

extension PatientByHcPartyFilterMapper on PatientByHcPartyFilter {
  api.PatientByHcPartyFilter toPatientByHcPartyFilterDto() =>
      api.PatientByHcPartyFilter(desc: this.description, healthcarePartyId: this.healthcarePartyId);
}

extension PatientByHcPartyAndIdentifiersFilterMapper on PatientByHcPartyAndIdentifiersFilter {
  api.PatientByHcPartyAndIdentifiersFilter toPatientByHcPartyAndIdentifiersFilterDto() =>
      api.PatientByHcPartyAndIdentifiersFilter(
          desc: this.description,
          healthcarePartyId: this.healthcarePartyId,
          identifiers: this.identifiers.map((it) => it.toIdentifierDto()).toList()
      );
}

extension PatientByHcPartyAndSsinsFilterMapper on PatientByHcPartyAndSsinsFilter {
  api.PatientByHcPartyAndSsinsFilter toPatientByHcPartyAndSsinsFilterDto() =>
      api.PatientByHcPartyAndSsinsFilter(
          desc: this.description,
          healthcarePartyId: this.healthcarePartyId,
          ssins: this.ssins ?? []
      );
}

extension PatientByHcPartyDateOfBirthBetweenFilterMapper on PatientByHcPartyDateOfBirthBetweenFilter {
  api.PatientByHcPartyDateOfBirthBetweenFilter toPatientByHcPartyDateOfBirthBetweenFilterDto() =>
      api.PatientByHcPartyDateOfBirthBetweenFilter(
          desc: this.description,
          healthcarePartyId: this.healthcarePartyId,
          minDateOfBirth: this.minDateOfBirth,
          maxDateOfBirth: this.maxDateOfBirth
      );
}

extension PatientByIdsFilterMapper on PatientByIdsFilter {
  api.PatientByIdsFilter toPatientByIdsFilterDto() =>
      api.PatientByIdsFilter(desc: this.description, ids: this.ids);
}

extension PatientByHcPartyNameContainsFuzzyFilterMapper on PatientByHcPartyNameContainsFuzzyFilter {
  api.PatientByHcPartyNameContainsFuzzyFilter toPatientByHcPartyNameContainsFuzzyFilterDto() =>
      api.PatientByHcPartyNameContainsFuzzyFilter(
          desc: this.description,
          healthcarePartyId: this.healthcarePartyId,
          searchString: this.searchString
      );
}

extension PatientByHcPartyGenderEducationProfessionMapper on PatientByHcPartyGenderEducationProfessionFilter {
  api.PatientByHcPartyGenderEducationProfession toPatientByHcPartyGenderEducationProfessionDto() =>
      api.PatientByHcPartyGenderEducationProfession(
          desc: this.description,
          healthcarePartyId: this.healthcarePartyId,
          gender: this.gender?.toGender(),
          education: this.education,
          profession: this.profession,
      );
}

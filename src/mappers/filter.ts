import {Filter} from "../filter/Filter";
import {
  AbstractFilter,
  AbstractFilterCode,
  AbstractFilterDevice,
  AbstractFilterHealthcareParty,
  AbstractFilterHealthElement,
  AbstractFilterPatient,
  AbstractFilterService,
  AbstractFilterUser,
  AllCodesFilter as AllCodesFilterDto,
  AllDevicesFilter as AllDevicesFilterDto,
  AllHealthcarePartiesFilter as AllHealthcarePartiesFilterDto,
  AllUsersFilter as AllUsersFilterDto,
  Code as CodeDto,
  CodeByIdsFilter as CodeByIdsFilterDto,
  CodeByRegionTypeLabelLanguageFilter as CodeByRegionTypeLabelLanguageFilterDto,
  ComplementFilter as ComplementFilterDto,
  Device as DeviceDto,
  DeviceByIdsFilter as DeviceByIdsFilterDto,
  HealthcareParty as HealthcarePartyDto,
  HealthcarePartyByIdsFilter as HealthcarePartyByIdsFilterDto,
  HealthElement as HealthElementDto,
  HealthElementByHcPartyFilter as HealthElementByHcPartyFilterDto,
  HealthElementByHcPartyIdentifiersFilter as HealthElementByHcPartyIdentifiersFilterDto,
  HealthElementByHcPartySecretForeignKeysFilter as HealthElementByHcPartySecretForeignKeysFilterDto,
  HealthElementByHcPartyTagCodeFilter as HealthElementByHcPartyTagCodeFilterDto,
  HealthElementByIdsFilter as HealthElementByIdsFilterDto,
  IntersectionFilter as IntersectionFilterDto,
  Patient as PatientDto,
  PatientByHcPartyAndIdentifiersFilter as PatientByHcPartyAndIdentifiersFilterDto,
  PatientByHcPartyAndSsinsFilter as PatientByHcPartyAndSsinsFilterDto,
  PatientByHcPartyDateOfBirthBetweenFilter as PatientByHcPartyDateOfBirthBetweenFilterDto,
  PatientByHcPartyFilter as PatientByHcPartyFilterDto,
  PatientByHcPartyGenderEducationProfession as PatientByHcPartyGenderEducationProfessionDto,
  PatientByHcPartyNameContainsFuzzyFilter as PatientByHcPartyNameContainsFuzzyFilterDto,
  PatientByIdsFilter as PatientByIdsFilterDto,
  Service as ServiceDto,
  ServiceByHcPartyFilter as ServiceByHcPartyFilterDto,
  ServiceByHcPartyHealthElementIdsFilter,
  ServiceByHcPartyIdentifiersFilter as ServiceByHcPartyIdentifiersFilterDto,
  ServiceByHcPartyTagCodeDateFilter as ServiceByHcPartyTagCodeDateFilterDto,
  ServiceByIdsFilter,
  ServiceBySecretForeignKeys as ServiceBySecretForeignKeysDto,
  UnionFilter as UnionFilterDto,
  User as UserDto,
  UserByIdsFilter as UserByIdsFilterDto,
} from "@icure/api";
import {Coding} from "../models/Coding";
import {ComplementFilter} from "../filter/ComplementFilter";
import {UnionFilter} from "../filter/UnionFilter";
import {IntersectionFilter} from "../filter/IntersectionFilter";
import {AllCodingsFilter} from "../filter/coding/AllCodingsFilter";
import {CodingByIdsFilter} from "../filter/coding/CodingByIdsFilter";
import {CodingByRegionTypeLabelFilter} from "../filter/coding/CodingByRegionTypeLabelFilter";
import {DataSample} from "../models/DataSample";
import {DataSampleByIdsFilter} from "../filter/datasample/DataSampleByIdsFilter";
import {
  DataSampleByHealthcarePartyTagCodeDateFilter
} from "../filter/datasample/DataSampleByHealthcarePartyTagCodeDateFilter";
import {DataSampleByHealthcarePartyFilter} from "../filter/datasample/DataSampleByHealthcarePartyFilter";
import {
  DataSampleByHealthcarePartyIdentifiersFilter
} from "../filter/datasample/DataSampleByHealthcarePartyIdentifiersFilter";
import {DataSampleByHealthcarePartyPatientFilter} from "../filter/datasample/DataSampleByHealthcarePartyPatientFilter";
import {MedicalDevice} from "../models/MedicalDevice";
import {MedicalDeviceByIdsFilter} from "../filter/medicaldevice/MedicalDeviceByIdsFilter";
import {AllMedicalDevicesFilter} from "../filter/medicaldevice/AllMedicalDevicesFilter";
import {
  HealthcareElementByHealthcarePartyFilter
} from "../filter/healthcareelement/HealthcareElementByHealthcarePartyFilter";
import {
  HealthcareElementByHealthcarePartyIdentifiersFilter
} from "../filter/healthcareelement/HealthcareElementByHealthcarePartyIdentifiersFilter";
import {
  HealthcareElementByHealthcarePartyPatientFilter
} from "../filter/healthcareelement/HealthcareElementByHealthcarePartyPatientFilter";
import {
  HealthcareElementByHealthcarePartyLabelCodeFilter
} from "../filter/healthcareelement/HealthcareElementByHealthcarePartyLabelCodeFilter";
import {HealthcareElementByIdsFilter} from "../filter/healthcareelement/HealthcareElementByIdsFilter";
import {HealthcareElement} from "../models/HealthcareElement";
import {IdentifierDtoMapper} from "./identifier";
import {HealthcareProfessional} from "../models/HealthcareProfessional";
import {AllHealthcareProfessionalsFilter} from "../filter/hcp/AllHealthcareProfessionalsFilter";
import {HealthcareProfessionalByIdsFilter} from "../filter/hcp/HealthcareProfessionalByIdsFilter";
import {User} from "../models/User";
import {UserByIdsFilter} from "../filter/user/UserByIdsFilter";
import {AllUsersFilter} from "../filter/user/AllUsersFilter";
import {Patient} from "../models/Patient";
import {PatientByHealthcarePartyFilter} from "../filter/patient/PatientByHealthcarePartyFilter";
import {PatientByHealthcarePartyIdentifiersFilter} from "../filter/patient/PatientByHealthcarePartyIdentifiersFilter";
import {PatientByHealthcarePartySsinsFilter} from "../filter/patient/PatientByHealthcarePartySsinsFilter";
import {
  PatientByHealthcarePartyDateOfBirthBetweenFilter
} from "../filter/patient/PatientByHealthcarePartyDateOfBirthBetweenFilter";
import {
  PatientByHealthcarePartyNameContainsFuzzyFilter
} from "../filter/patient/PatientByHealthcarePartyNameContainsFuzzyFilter";
import {
  PatientByHealthcarePartyGenderEducationProfessionFilter
} from "../filter/patient/PatientByHealthcarePartyGenderEducationProfessionFilter";
import {PatientByIdsFilter} from "../filter/patient/PatientByIdsFilter";
import {
  DataSampleByHealthcarePartyHealthcareElementIdsFilter
} from "../filter/datasample/DataSampleByHealthcarePartyHealthcareElementIdsFilter";
import toIdentifierDto = IdentifierDtoMapper.toIdentifierDto;
import {UserByPatientIdFilter} from "../filter/user/UserByPatientIdFilter";


export namespace FilterMapper {
  export function toAbstractFilterDto<DataSample>(filter: Filter<DataSample>, input: "DataSample"): AbstractFilterService
  export function toAbstractFilterDto<Coding>(filter: Filter<Coding>, input: "Coding"): AbstractFilterCode
  export function toAbstractFilterDto<MedicalDevice>(filter: Filter<MedicalDevice>, input: "MedicalDevice"): AbstractFilterDevice
  export function toAbstractFilterDto<HealthcareProfessional>(filter: Filter<HealthcareProfessional>, input: "HealthcareProfessional"): AbstractFilterHealthcareParty
  export function toAbstractFilterDto<HealthcareElement>(filter: Filter<HealthcareElement>, input: "HealthcareElement"): AbstractFilterHealthElement
  export function toAbstractFilterDto<Patient>(filter: Filter<Patient>, input: "Patient"): AbstractFilterPatient
  export function toAbstractFilterDto<User>(filter: Filter<User>, input: "User"): AbstractFilterUser
  export function toAbstractFilterDto<T>(filter: Filter<T>, input: "DataSample" | "Coding" | "MedicalDevice" | "HealthcareProfessional" | "HealthcareElement" | "Patient" | "User"):
    AbstractFilter<ServiceDto | CodeDto | DeviceDto | HealthcarePartyDto | HealthElementDto | PatientDto | UserDto> {
    const res = input === "DataSample" ? toAbstractFilterServiceDto(filter) :
      input === "Coding" ? toAbstractFilterCodeDto(filter) :
        input === "MedicalDevice" ? toAbstractFilterDeviceDto(filter) :
          input === "HealthcareProfessional" ? toAbstractFilterHealthcarePartyDto(filter) :
            input === "HealthcareElement" ? toAbstractFilterHealthElementDto(filter) :
              input === "Patient" ? toAbstractFilterPatientDto(filter) :
                input === "User" ? toAbstractFilterUserDto(filter) : null;
    if (!res) {
      throw Error("Filter is not recognized");
    }
    return res
  }

  function toAbstractFilterCodeDto(filter: Filter<Coding>): AbstractFilter<CodeDto> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterCodeDto(filter as ComplementFilter<Coding>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterCodeDto(filter as UnionFilter<Coding>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterCodeDto(filter as IntersectionFilter<Coding>);
    }
    if (filter['$type'] === 'AllCodingsFilter') {
      return toAllCodesFilterDto();
    }
    if (filter['$type'] === 'CodingByIdsFilter') {
      return toCodeByIdsFilterDto(filter as CodingByIdsFilter);
    }
    if (filter['$type'] === 'CodingByRegionTypeLabelLanguageFilter') {
      return toCodeByRegionTypeLabelLanguageFilterDto(filter as CodingByRegionTypeLabelFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toAllCodesFilterDto = () => new AllCodesFilterDto({});

  const toComplementFilterCodeDto = (filter: ComplementFilter<Coding>) =>
    new ComplementFilterDto<CodeDto>(toAbstractFilterCodeDto(filter.superSet), toAbstractFilterCodeDto(filter.subSet));

  const toUnionFilterCodeDto = (filter: UnionFilter<Coding>) =>
    new UnionFilterDto<CodeDto>(filter.filters.map((it) => toAbstractFilterCodeDto(it)));

  const toIntersectionFilterCodeDto = (filter: IntersectionFilter<Coding>) =>
    new IntersectionFilterDto<CodeDto>(filter.filters.map((it) => toAbstractFilterCodeDto(it)));


  const toCodeByIdsFilterDto = (filter: CodingByIdsFilter) => new CodeByIdsFilterDto({
    desc: filter.description,
    ids: filter.ids
  });

  const toCodeByRegionTypeLabelLanguageFilterDto = (filter: CodingByRegionTypeLabelFilter) =>
    new CodeByRegionTypeLabelLanguageFilterDto({
      desc: filter.description,
      region: filter.region,
      type: filter.type,
      language: filter.language,
      label: filter.label
    })


  function toAbstractFilterServiceDto(filter: Filter<DataSample>): AbstractFilter<ServiceDto> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterServiceDto(filter as ComplementFilter<DataSample>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterServiceDto(filter as UnionFilter<DataSample>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterServiceDto(filter as IntersectionFilter<DataSample>);
    }
    if (filter['$type'] === 'DataSampleByHealthcarePartyFilter') {
      return toServiceByHcPartyFilterDto(filter as DataSampleByHealthcarePartyFilter);
    }
    if (filter['$type'] === 'DataSampleByHealthcarePartyIdentifiersFilter') {
      return toServiceByHcPartyIdentifiersFilterDto(filter as DataSampleByHealthcarePartyIdentifiersFilter);
    }
    if (filter['$type'] === 'DataSampleByHealthcarePartyHealthcareElementIdsFilter') {
      return toServiceByHcPartyHealthElementIdsFilterDto(filter as DataSampleByHealthcarePartyHealthcareElementIdsFilter);
    }
    if (filter['$type'] === 'DataSampleByHealthcarePartyTagCodeDateFilter') {
      return toServiceByHcPartyTagCodeDateFilterDto(filter as DataSampleByHealthcarePartyTagCodeDateFilter);
    }
    if (filter['$type'] === 'DataSampleByIdsFilter') {
      return toServiceByIdsFilterDto(filter as DataSampleByIdsFilter);
    }
    if (filter['$type'] === 'DataSampleByHealthcarePartyPatientFilter') {
      return toServiceBySecretForeignKeysDto(filter as DataSampleByHealthcarePartyPatientFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterServiceDto = (filter: ComplementFilter<DataSample>) =>
    new ComplementFilterDto<ServiceDto>(toAbstractFilterServiceDto(filter.superSet), toAbstractFilterServiceDto(filter.subSet));

  const toUnionFilterServiceDto = (filter: UnionFilter<DataSample>) =>
    new UnionFilterDto<ServiceDto>(filter.filters.map((it) => toAbstractFilterServiceDto(it)));

  const toIntersectionFilterServiceDto = (filter: IntersectionFilter<DataSample>) =>
    new IntersectionFilterDto<ServiceDto>(filter.filters.map((it) => toAbstractFilterServiceDto(it)));


  const toServiceByIdsFilterDto = (filter: DataSampleByIdsFilter) =>
    new ServiceByIdsFilter({
      desc: filter.description,
      ids: filter.ids
    })

  const toServiceByHcPartyHealthElementIdsFilterDto = (filter: DataSampleByHealthcarePartyHealthcareElementIdsFilter) =>
    new ServiceByHcPartyHealthElementIdsFilter({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      healthElementIds: filter.healthcareElementIds
    })

  const toServiceByHcPartyIdentifiersFilterDto = (filter: DataSampleByHealthcarePartyIdentifiersFilter) =>
    new ServiceByHcPartyIdentifiersFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      identifiers: filter.identifiers.map((it) => toIdentifierDto(it))
    })

  const toServiceByHcPartyTagCodeDateFilterDto = (filter: DataSampleByHealthcarePartyTagCodeDateFilter) =>
    new ServiceByHcPartyTagCodeDateFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      patientSecretForeignKey: filter.patientSecretForeignKey,
      tagType: filter.tagType,
      tagCode: filter.tagCode,
      codeType: filter.codeType,
      codeCode: filter.codeCode,
      startValueDate: filter.startValueDate,
      endValueDate: filter.endValueDate
    })


  const toServiceByHcPartyFilterDto = (filter: DataSampleByHealthcarePartyFilter) => new ServiceByHcPartyFilterDto({
    desc: filter.description,
    healthcarePartyId: filter.hcpId
  })

  const toServiceBySecretForeignKeysDto = (filter: DataSampleByHealthcarePartyPatientFilter) => new ServiceBySecretForeignKeysDto({
    desc: filter.description,
    healthcarePartyId: filter.healthcarePartyId,
    patientSecretForeignKeys: filter.patientSecretForeignKeys
  });

  function toAbstractFilterDeviceDto(filter: Filter<MedicalDevice>): AbstractFilter<DeviceDto> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterDeviceDto(filter as ComplementFilter<MedicalDevice>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterDeviceDto(filter as UnionFilter<MedicalDevice>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterDeviceDto(filter as IntersectionFilter<MedicalDevice>);
    }
    if (filter['$type'] === 'AllMedicalDevicesFilter') {
      return toAllDevicesFilterDto(filter as AllMedicalDevicesFilter);
    }
    if (filter['$type'] === 'MedicalDeviceByIdsFilter') {
      return toDeviceByIdsFilterDto(filter as MedicalDeviceByIdsFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterDeviceDto = (filter: ComplementFilter<MedicalDevice>) =>
    new ComplementFilterDto<DeviceDto>(toAbstractFilterDeviceDto(filter.superSet), toAbstractFilterDeviceDto(filter.subSet));

  const toUnionFilterDeviceDto = (filter: UnionFilter<MedicalDevice>) =>
    new UnionFilterDto<DeviceDto>(filter.filters.map((it) => toAbstractFilterDeviceDto(it)))

  const toIntersectionFilterDeviceDto = (filter: IntersectionFilter<MedicalDevice>) =>
    new IntersectionFilterDto<DeviceDto>(filter.filters.map((it) => toAbstractFilterDeviceDto(it)))

  const toAllDevicesFilterDto = (filter: AllMedicalDevicesFilter) => new AllDevicesFilterDto({})

  const toDeviceByIdsFilterDto = (filter: MedicalDeviceByIdsFilter) =>
    new DeviceByIdsFilterDto({desc: filter.description, ids: filter.ids})

  function toAbstractFilterHealthcarePartyDto(filter: Filter<HealthcareProfessional>): AbstractFilter<HealthcarePartyDto> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterHealthcarePartyDto(filter as ComplementFilter<HealthcareProfessional>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterHealthcarePartyDto(filter as UnionFilter<HealthcareProfessional>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterHealthcarePartyDto(filter as IntersectionFilter<HealthcareProfessional>);
    }
    if (filter['$type'] === 'AllHealthcareProfessionalsFilter') {
      return toAllHealthcarePartiesFilterDto(filter as AllHealthcareProfessionalsFilter);
    }
    if (filter['$type'] === 'HealthcareProfessionalByIdsFilter') {
      return toHealthcarePartyByIdsFilterDto(filter as HealthcareProfessionalByIdsFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterHealthcarePartyDto = (filter: ComplementFilter<HealthcareProfessional>) =>
    new ComplementFilterDto<HealthcarePartyDto>(toAbstractFilterHealthcarePartyDto(filter.superSet), toAbstractFilterHealthcarePartyDto(filter.subSet));

  const toUnionFilterHealthcarePartyDto = (filter: UnionFilter<HealthcareProfessional>) =>
    new UnionFilterDto<HealthcarePartyDto>(filter.filters.map((it) => toAbstractFilterHealthcarePartyDto(it)))

  const toIntersectionFilterHealthcarePartyDto = (filter: IntersectionFilter<HealthcareProfessional>) =>
    new IntersectionFilterDto<HealthcarePartyDto>(filter.filters.map((it) => toAbstractFilterHealthcarePartyDto(it)));

  const toAllHealthcarePartiesFilterDto = (filter: AllHealthcareProfessionalsFilter) => new AllHealthcarePartiesFilterDto({})

  const toHealthcarePartyByIdsFilterDto = (filter: HealthcareProfessionalByIdsFilter) =>
    new HealthcarePartyByIdsFilterDto({desc: filter.description, ids: filter.ids})


  function toAbstractFilterHealthElementDto(filter: Filter<HealthcareElement>): AbstractFilter<HealthElementDto> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterHealthElementDto(filter as ComplementFilter<HealthcareElement>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterHealthElementDto(filter as UnionFilter<HealthcareElement>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterHealthElementDto(filter as IntersectionFilter<HealthcareElement>);
    }
    if (filter['$type'] === 'HealthcareElementByHealthcarePartyFilter') {
      return toHealthElementByHcPartyFilterDto(filter as HealthcareElementByHealthcarePartyFilter);
    }
    if (filter['$type'] === 'HealthcareElementByHealthcarePartyIdentifiersFilter') {
      return toHealthElementByHcPartyIdentifiersFilterDto(filter as HealthcareElementByHealthcarePartyIdentifiersFilter);
    }
    if (filter['$type'] === 'HealthcareElementByHealthcarePartyPatientFilter') {
      return toHealthElementByHcPartySecretForeignKeysFilterDto(filter as HealthcareElementByHealthcarePartyPatientFilter);
    }
    if (filter['$type'] === 'HealthcareElementByHealthcarePartyLabelCodeFilter') {
      return toHealthElementByHcPartyTagCodeFilterDto(filter as HealthcareElementByHealthcarePartyLabelCodeFilter);
    }
    if (filter['$type'] === 'HealthcareElementByIdsFilter') {
      return toHealthElementByIdsFilterDto(filter as HealthcareElementByIdsFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterHealthElementDto = (filter: ComplementFilter<HealthcareElement>) =>
    new ComplementFilterDto<HealthElementDto>(toAbstractFilterHealthElementDto(filter.superSet), toAbstractFilterHealthElementDto(filter.subSet));

  const toUnionFilterHealthElementDto = (filter: UnionFilter<HealthcareElement>) =>
    new UnionFilterDto<HealthElementDto>(filter.filters.map((it) => toAbstractFilterHealthElementDto(it)))

  const toIntersectionFilterHealthElementDto = (filter: IntersectionFilter<HealthcareElement>) =>
    new IntersectionFilterDto<HealthElementDto>(filter.filters.map((it) => toAbstractFilterHealthElementDto(it)));

  const toHealthElementByHcPartyFilterDto = (filter: HealthcareElementByHealthcarePartyFilter) =>
    new HealthElementByHcPartyFilterDto({desc: filter.description, hcpId: filter.healthcarePartyId});

  const toHealthElementByHcPartyIdentifiersFilterDto = (filter: HealthcareElementByHealthcarePartyIdentifiersFilter) =>
    new HealthElementByHcPartyIdentifiersFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      identifiers: filter.identifiers.map((it) => toIdentifierDto(it))
    });

  const toHealthElementByHcPartySecretForeignKeysFilterDto = (filter: HealthcareElementByHealthcarePartyPatientFilter) =>
    new HealthElementByHcPartySecretForeignKeysFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      patientSecretForeignKeys: filter.patientSecretForeignKeys
    });

  const toHealthElementByHcPartyTagCodeFilterDto = (filter: HealthcareElementByHealthcarePartyLabelCodeFilter) =>
    new HealthElementByHcPartyTagCodeFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      codeType: filter.codeType,
      codeCode: filter.codeCode,
      tagType: filter.tagType,
      tagCode: filter.tagCode,
      status: filter.status
    });

  const toHealthElementByIdsFilterDto = (filter: HealthcareElementByIdsFilter) =>
    new HealthElementByIdsFilterDto({desc: filter.description, ids: filter.ids});

  function toAbstractFilterUserDto(filter: Filter<User>): AbstractFilter<UserDto> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterUserDto(filter as ComplementFilter<User>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterUserDto(filter as UnionFilter<User>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterUserDto(filter as IntersectionFilter<User>);
    }
    if (filter['$type'] === 'AllUsersFilter') {
      return toAllUsersFilterDto(filter as AllUsersFilter);
    }
    if (filter['$type'] === 'UserByIdsFilter') {
      return toUserByIdsFilterDto(filter as UserByIdsFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterUserDto = (filter: ComplementFilter<User>) =>
    new ComplementFilterDto<UserDto>(toAbstractFilterUserDto(filter.superSet), toAbstractFilterUserDto(filter.subSet));

  const toUnionFilterUserDto = (filter: UnionFilter<User>) =>
    new UnionFilterDto<UserDto>(filter.filters.map((it) => toAbstractFilterUserDto(it)))

  const toIntersectionFilterUserDto = (filter: IntersectionFilter<User>) =>
    new IntersectionFilterDto<UserDto>(filter.filters.map((it) => toAbstractFilterUserDto(it)));

  const toAllUsersFilterDto = (filter: AllUsersFilter) =>
    new AllUsersFilterDto({desc: filter.description})


  const toUserByIdsFilterDto = (filter: UserByIdsFilter) =>
    new UserByIdsFilterDto({desc: filter.description, ids: filter.ids})


  function toAbstractFilterPatientDto(filter: Filter<Patient>): AbstractFilter<PatientDto> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterPatientDto(filter as ComplementFilter<Patient>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterPatientDto(filter as UnionFilter<Patient>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterPatientDto(filter as IntersectionFilter<Patient>);
    }
    if (filter['$type'] === 'PatientByHcPartyFilter') {
      return toPatientByHcPartyFilterDto(filter as PatientByHealthcarePartyFilter);
    }
    if (filter['$type'] === 'PatientByHcPartyAndIdentifiersFilter') {
      return toPatientByHcPartyAndIdentifiersFilterDto(filter as PatientByHealthcarePartyIdentifiersFilter);
    }
    if (filter['$type'] === 'PatientByHcPartyAndSsinsFilter') {
      return toPatientByHcPartyAndSsinsFilterDto(filter as PatientByHealthcarePartySsinsFilter);
    }
    if (filter['$type'] === 'PatientByHcPartyDateOfBirthBetweenFilter') {
      return toPatientByHcPartyDateOfBirthBetweenFilterDto(filter as PatientByHealthcarePartyDateOfBirthBetweenFilter);
    }
    if (filter['$type'] === 'PatientByHcPartyNameContainsFuzzyFilter') {
      return toPatientByHcPartyNameContainsFuzzyFilterDto(filter as PatientByHealthcarePartyNameContainsFuzzyFilter);
    }
    if (filter['$type'] === 'PatientByHcPartyGenderEducationProfessionFilter') {
      return toPatientByHcPartyGenderEducationProfessionDto(filter as PatientByHealthcarePartyGenderEducationProfessionFilter);
    }
    if (filter['$type'] === 'PatientByIdsFilter') {
      return toPatientByIdsFilterDto(filter as PatientByIdsFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterPatientDto = (filter: ComplementFilter<Patient>) =>
    new ComplementFilterDto<PatientDto>(toAbstractFilterPatientDto(filter.superSet), toAbstractFilterPatientDto(filter.subSet));

  const toUnionFilterPatientDto = (filter: UnionFilter<Patient>) =>
    new UnionFilterDto<PatientDto>(filter.filters.map((it) => toAbstractFilterPatientDto(it)))

  const toIntersectionFilterPatientDto = (filter: IntersectionFilter<Patient>) =>
    new IntersectionFilterDto<PatientDto>(filter.filters.map((it) => toAbstractFilterPatientDto(it)));

  const toPatientByHcPartyFilterDto = (filter: PatientByHealthcarePartyFilter) =>
    new PatientByHcPartyFilterDto({desc: filter.description, healthcarePartyId: filter.healthcarePartyId})


  const toPatientByHcPartyAndIdentifiersFilterDto = (filter: PatientByHealthcarePartyIdentifiersFilter) =>
    new PatientByHcPartyAndIdentifiersFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      identifiers: filter.identifiers.map((it) => toIdentifierDto(it))
    })
  ;

  const toPatientByHcPartyAndSsinsFilterDto = (filter: PatientByHealthcarePartySsinsFilter) =>
    new PatientByHcPartyAndSsinsFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      ssins: filter.ssins ?? []
    })
  ;

  const toPatientByHcPartyDateOfBirthBetweenFilterDto = (filter: PatientByHealthcarePartyDateOfBirthBetweenFilter) =>
    new PatientByHcPartyDateOfBirthBetweenFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      minDateOfBirth: filter.minDateOfBirth,
      maxDateOfBirth: filter.maxDateOfBirth})


const toPatientByIdsFilterDto = (filter: PatientByIdsFilter) =>
  new PatientByIdsFilterDto({desc: filter.description, ids: filter.ids})


const toPatientByHcPartyNameContainsFuzzyFilterDto = (filter: PatientByHealthcarePartyNameContainsFuzzyFilter) =>
  new PatientByHcPartyNameContainsFuzzyFilterDto({
    desc: filter.description,
    healthcarePartyId: filter.healthcarePartyId,
    searchString: filter.searchString
  })
;

const toPatientByHcPartyGenderEducationProfessionDto = (filter: PatientByHealthcarePartyGenderEducationProfessionFilter) =>
  new PatientByHcPartyGenderEducationProfessionDto({
    desc: filter.description,
    healthcarePartyId: filter.healthcarePartyId,
    gender: filter.gender,
    education: filter.education, profession: filter.profession,
})
}

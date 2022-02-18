import {Patient} from "../models/Patient";
import {Patient as PatientDto} from "@icure/api";
import {forceUuid, map, mapReduce, mapSet, toMapSetTransform} from "./utils";
import {IdentifierDtoMapper} from "./identifier";
import {CodeStubDtoMapper} from "./CodeStubCodingReference";
import {PersonNameDtoMapper} from "./personName";
import {PatientHealthCarePartyDtoMapper} from "./patientHealthcareParty";
import {PropertyStubMapper} from "./property";
import {SystemMetaDataOwnerEncrypted} from "../models/SystemMetaDataOwnerEncrypted";
import {AddressMapper} from "./Address";
import {DelegationMapper} from "./Delegation";
import {PartnershipDtoMapper} from "./partnership";


export namespace PatientDtoMapper {
  import toIdentifier = IdentifierDtoMapper.toIdentifier;
  import toCodeStub = CodeStubDtoMapper.toCodeStub;
  import toPersonNameDto = PersonNameDtoMapper.toPersonNameDto;
  import toCodingReference = CodeStubDtoMapper.toCodingReference;
  import toPersonName = PersonNameDtoMapper.toPersonName;
  import toPatientHealthCareParty = PatientHealthCarePartyDtoMapper.toPatientHealthCareParty;
  import toProperty = PropertyStubMapper.toProperty;
  import toPropertyStubDto = PropertyStubMapper.toPropertyStubDto;
  import toPatientHealthCarePartyDto = PatientHealthCarePartyDtoMapper.toPatientHealthCarePartyDto;
  import toAddressDto = AddressMapper.toAddressDto;
  import toDelegation = DelegationMapper.toDelegation;
  import toPartnershipDto = PartnershipDtoMapper.toPartnershipDto;
  import toDelegationDto = DelegationMapper.toDelegationDto;
  import toPartnership = PartnershipDtoMapper.toPartnership;
  import toAddress = AddressMapper.toAddress;
  export const toPatient = (obj?: PatientDto) => obj ? new Patient({
    id: obj.id,
    identifiers: map(obj.identifier, toIdentifier),
    labels: mapSet(new Set(obj.tags), toCodingReference),
    codes: mapSet(new Set(obj.codes), toCodingReference),
    names: map(obj.names, toPersonName),
    languages: obj.languages,
    addresses: map(obj.addresses, toAddress),
    mergedIds: new Set(obj.mergedIds),
    active: obj.active,
    deactivationReason: obj.deactivationReason,
    partnerships: map(obj.partnerships, toPartnership),
    patientHealthCareParties: map(obj.patientHealthCareParties, toPatientHealthCareParty),
    patientProfessions: map(obj.patientProfessions, toCodingReference),
    parameters: obj.parameters,
    properties: mapSet(new Set(obj.properties), toProperty),
    rev: obj.rev,
    created: obj.created,
    modified: obj.modified,
    author: obj.author,
    responsible: obj.responsible,
    endOfLife: obj.endOfLife,
    deletionDate: obj.deletionDate,
    firstName: obj.firstName,
    lastName: obj.lastName,
    companyName: obj.companyName,
    civility: obj.civility,
    gender: obj.gender,
    birthSex: obj.birthSex,
    mergeToPatientId: obj.mergeToPatientId,
    alias: obj.alias,
    ssin: obj.ssin,
    maidenName: obj.maidenName,
    spouseName: obj.spouseName,
    partnerName: obj.partnerName,
    personalStatus: obj.personalStatus,
    dateOfBirth: obj.dateOfBirth,
    dateOfDeath: obj.dateOfDeath,
    placeOfBirth: obj.placeOfBirth,
    placeOfDeath: obj.placeOfDeath,
    deceased: obj.deceased,
    education: obj.education,
    profession: obj.profession,
    note: obj.note,
    administrativeNote: obj.administrativeNote,
    nationality: obj.nationality,
    race: obj.race,
    ethnicity: obj.ethnicity,
    picture: obj.picture,
    externalId: obj.externalId,
    systemMetaData: new SystemMetaDataOwnerEncrypted({
      hcPartyKeys: obj.hcPartyKeys,
      privateKeyShamirPartitions: obj.privateKeyShamirPartitions,
      secretForeignKeys: obj.secretForeignKeys,
      cryptedForeignKeys: toMapSetTransform(obj.cryptedForeignKeys, toDelegation),
      delegations: toMapSetTransform(obj.delegations, toDelegation),
      encryptionKeys: toMapSetTransform(obj.encryptionKeys, toDelegation),
    })
  }) : undefined;

  export const toPatientDto = (obj?: Patient) => obj ? new PatientDto({
    id: forceUuid(obj.id),
    identifier: obj.identifiers,
    tags: mapSet(obj.labels, toCodeStub),
    codes: mapSet(obj.codes, toCodeStub),
    names: map(obj.names, toPersonNameDto),
    languages: obj.languages,
    addresses: map(obj.addresses, toAddressDto),
    mergedIds: obj.mergedIds,
    active: obj.active,
    deactivationReason: obj.deactivationReason,
    partnerships: map(obj.partnerships, toPartnershipDto),
    patientHealthCareParties: map(obj.patientHealthCareParties, toPatientHealthCarePartyDto),
    patientProfessions: map(obj.patientProfessions, toCodeStub),
    parameters: obj.parameters,
    properties: mapSet(obj.properties, toPropertyStubDto),
    rev: obj.rev,
    created: obj.created,
    modified: obj.modified,
    author: obj.author,
    responsible: obj.responsible,
    endOfLife: obj.endOfLife,
    deletionDate: obj.deletionDate,
    firstName: obj.firstName,
    lastName: obj.lastName,
    companyName: obj.companyName,
    civility: obj.civility,
    gender: obj.gender,
    birthSex: obj.birthSex,
    mergeToPatientId: obj.mergeToPatientId,
    alias: obj.alias,
    ssin: obj.ssin,
    maidenName: obj.maidenName,
    spouseName: obj.spouseName,
    partnerName: obj.partnerName,
    personalStatus: obj.personalStatus,
    dateOfBirth: obj.dateOfBirth,
    dateOfDeath: obj.dateOfDeath,
    placeOfBirth: obj.placeOfBirth,
    placeOfDeath: obj.placeOfDeath,
    deceased: obj.deceased,
    education: obj.education,
    profession: obj.profession,
    note: obj.note,
    administrativeNote: obj.administrativeNote,
    nationality: obj.nationality,
    race: obj.race,
    ethnicity: obj.ethnicity,
    picture: obj.picture,
    externalId: obj.externalId,
    hcPartyKeys: obj.systemMetaData?.hcPartyKeys,
    privateKeyShamirPartitions: obj.systemMetaData?.privateKeyShamirPartitions,
    secretForeignKeys: obj.systemMetaData?.secretForeignKeys,
    cryptedForeignKeys: toMapSetTransform(obj.systemMetaData?.cryptedForeignKeys, toDelegationDto),
    delegations: toMapSetTransform(obj.systemMetaData?.delegations, toDelegationDto),
    encryptionKeys: toMapSetTransform(obj.systemMetaData?.encryptionKeys, toDelegationDto),
  }) : undefined;
}

import {Patient} from "../models/Patient";
import {Patient as PatientDto} from "@icure/api";
import {forceUuid, map, mapSet, mapSetToArray, toMapArrayTransform, toMapSetTransform} from "./utils";
import {IdentifierDtoMapper} from "./identifier";
import {CodeStubDtoMapper} from "./codeStubCodingReference";
import {PersonNameDtoMapper} from "./personName";
import {PatientHealthCarePartyDtoMapper} from "./patientHealthcareParty";
import {PropertyStubMapper} from "./property";
import {SystemMetaDataOwnerEncrypted} from "../models/SystemMetaDataOwnerEncrypted";
import {AddressMapper} from "./address";
import {DelegationMapper} from "./delegation";
import {PartnershipDtoMapper} from "./partnership";

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

export namespace PatientMapper {

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
      publicKey: obj.publicKey,
      hcPartyKeys: obj.hcPartyKeys,
      privateKeyShamirPartitions: obj.privateKeyShamirPartitions,
      secretForeignKeys: obj.secretForeignKeys,
      cryptedForeignKeys: toMapSetTransform(obj.cryptedForeignKeys, toDelegation),
      delegations: toMapSetTransform(obj.delegations, toDelegation),
      encryptionKeys: toMapSetTransform(obj.encryptionKeys, toDelegation),
      aesExchangeKeys: obj.aesExchangeKeys,
      transferKeys: obj.transferKeys
    })
  }) : undefined;

  export const toPatientDto = (obj?: Patient) => obj ? new PatientDto({
    id: forceUuid(obj.id),
    identifier: obj.identifiers,
    tags: mapSetToArray(obj.labels, toCodeStub),
    codes: mapSetToArray(obj.codes, toCodeStub),
    names: map(obj.names, toPersonNameDto),
    languages: obj.languages,
    addresses: map(obj.addresses, toAddressDto),
    mergedIds: mapSetToArray(obj.mergedIds, (id) => id),
    active: obj.active,
    deactivationReason: obj.deactivationReason,
    partnerships: map(obj.partnerships, toPartnershipDto),
    patientHealthCareParties: map(obj.patientHealthCareParties, toPatientHealthCarePartyDto),
    patientProfessions: map(obj.patientProfessions, toCodeStub),
    parameters: obj.parameters,
    properties: mapSetToArray(obj.properties, toPropertyStubDto),
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
    publicKey: obj.systemMetaData?.publicKey,
    hcPartyKeys: obj.systemMetaData?.hcPartyKeys,
    privateKeyShamirPartitions: obj.systemMetaData?.privateKeyShamirPartitions,
    secretForeignKeys: obj.systemMetaData?.secretForeignKeys,
    cryptedForeignKeys: toMapArrayTransform(obj.systemMetaData?.cryptedForeignKeys, toDelegationDto),
    delegations: toMapArrayTransform(obj.systemMetaData?.delegations, toDelegationDto),
    encryptionKeys: toMapArrayTransform(obj.systemMetaData?.encryptionKeys, toDelegationDto),
    aesExchangeKeys: obj.systemMetaData?.aesExchangeKeys,
    transferKeys: obj.systemMetaData?.transferKeys
  }) : undefined;
}

import {HealthcareParty} from "@icure/api";
import {HealthcareProfessional} from "../models/HealthcareProfessional";
import {SystemMetaDataOwner} from "../models/SystemMetaDataOwner";
import {forceUuid, map, mapSet, mapSetToArray} from "./utils";
import {PersonNameDtoMapper} from "./personName";
import {AddressMapper} from "./address";
import {CodeStubDtoMapper} from "./codeStubCodingReference";
import {PropertyStubMapper} from "./property";

export namespace HealthcareProfessionalMapper {

  import toPersonName = PersonNameDtoMapper.toPersonName;
  import toAddress = AddressMapper.toAddress;
  import toCodingReference = CodeStubDtoMapper.toCodingReference;
  import toProperty = PropertyStubMapper.toProperty;
  import toCodeStub = CodeStubDtoMapper.toCodeStub;
  import toAddressDto = AddressMapper.toAddressDto;
  import toPropertyStubDto = PropertyStubMapper.toPropertyStubDto;
  import toPersonNameDto = PersonNameDtoMapper.toPersonNameDto;

  export const toHealthcareProfessional = (obj: HealthcareParty) => new HealthcareProfessional({
    id: obj.id,
    created: obj.created,
    modified: obj.modified,
    labels: mapSet(new Set(obj.tags), toCodingReference),
    codes: mapSet(new Set(obj.codes), toCodingReference),
    names: map(obj.names, toPersonName),
    addresses: map(obj.addresses, toAddress),
    languages: obj.languages,
    properties: new Set(map(obj.properties, toProperty)),
    rev: obj.rev,
    deletionDate: obj.deletionDate,
    name: obj.name,
    lastName: obj.lastName,
    firstName: obj.firstName,
    gender: obj.gender,
    civility: obj.civility,
    speciality: obj.speciality,
    specialityCodes: mapSet(new Set(obj.specialityCodes), toCodingReference),
    parentId: obj.parentId,
    picture: obj.picture,
    notes: obj.notes,
    systemMetaData: new SystemMetaDataOwner({
      publicKey: obj.publicKey,
      hcPartyKeys: obj.hcPartyKeys,
      privateKeyShamirPartitions: obj.privateKeyShamirPartitions,
      aesExchangeKeys: obj.aesExchangeKeys,
      transferKeys: obj.transferKeys
    })
  });

  export const toHealthcarePartyDto = (obj: HealthcareProfessional) => new HealthcareParty({
    id: forceUuid(obj.id),
    created: obj.created,
    modified: obj.modified,
    tags: mapSetToArray(obj.labels, toCodeStub),
    codes: mapSetToArray(obj.codes, toCodeStub),
    names: map(obj.names, toPersonNameDto),
    addresses: map(obj.addresses, toAddressDto),
    languages: obj.languages,
    properties: mapSetToArray(obj.properties, toPropertyStubDto),
    rev: obj.rev,
    deletionDate: obj.deletionDate,
    name: obj.name,
    lastName: obj.lastName,
    firstName: obj.firstName,
    gender: obj.gender,
    civility: obj.civility,
    speciality: obj.speciality,
    specialityCodes: mapSetToArray(obj.specialityCodes, toCodeStub),
    parentId: obj.parentId,
    picture: obj.picture,
    notes: obj.notes,
    publicKey: obj.systemMetaData?.publicKey,
    hcPartyKeys: obj.systemMetaData?.hcPartyKeys,
    privateKeyShamirPartitions: obj.systemMetaData?.privateKeyShamirPartitions,
    aesExchangeKeys: obj.systemMetaData?.aesExchangeKeys,
    transferKeys: obj.systemMetaData?.transferKeys
  });
}

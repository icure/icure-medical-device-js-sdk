import {HealthcareParty} from "@icure/api";
import {HealthcareProfessional} from "../models/HealthcareProfessional";
import {SystemMetaDataOwner} from "../models/SystemMetaDataOwner";
import {map, mapSet} from "./utils";
import {PersonNameDtoMapper} from "./personName";
import {AddressMapper} from "./address";
import {CodeStubDtoMapper} from "./codeStubCodingReference";
import {PropertyStubMapper} from "./property";

export namespace HealthcareProfessionalMapper {
  
  import toPersonName = PersonNameDtoMapper.toPersonName;
  import toAddress = AddressMapper.toAddress;
  import toCodingReference = CodeStubDtoMapper.toCodingReference;
  import toProperty = PropertyStubMapper.toProperty;

  const toHealthcareProfessional = (dto: HealthcareParty) => new HealthcareProfessional({
      id: dto.id,
      names: map(dto.names, toPersonName),
      addresses: map(dto.addresses, toAddress),
      languages: dto.languages,
      specialityCodes: new Set(map(dto.specialityCodes, toCodingReference)),
      properties: new Set(map(dto.properties, toProperty)),
      rev: dto.rev,
      deletionDate: dto.deletionDate,
      name: dto.name,
      lastName: dto.lastName,
      firstName: dto.firstName,
      gender: dto.gender,
      civility: dto.civility,
      speciality: dto.speciality,
      parentId: dto.parentId,
      picture: dto.picture,
      notes: dto.notes,
      systemMetaData: new SystemMetaDataOwner({
        hcPartyKeys: dto.hcPartyKeys,
        privateKeyShamirPartitions: dto.privateKeyShamirPartitions,
      })
  });

  const toHealthcarePartyDto = (obj: HealthcareProfessional) => new HealthcareParty({
    id: obj.id,
    names: map(obj.names, toPersonName),
    addresses: map(obj.addresses, toAddress),
    languages: obj.languages,
    specialityCodes: mapSet(obj.specialityCodes, toCodingReference),
    properties: mapSet(obj.properties, toProperty),
    rev: obj.rev,
    deletionDate: obj.deletionDate,
    name: obj.name,
    lastName: obj.lastName,
    firstName: obj.firstName,
    gender: obj.gender,
    civility: obj.civility,
    speciality: obj.speciality,
    parentId: obj.parentId,
    picture: obj.picture,
    notes: obj.notes,
    hcPartyKeys: obj.systemMetaData?.hcPartyKeys,
    privateKeyShamirPartitions: obj.systemMetaData?.privateKeyShamirPartitions
  });
}

import {HealthcareElement} from "../models/HealthcareElement";
import {HealthElement} from "@icure/api";
import {forceUuid, map, mapSet, toMapSetTransform} from "./utils";
import {SystemMetaDataEncrypted} from "../models/SystemMetaDataEncrypted";
import {DelegationMapper} from "./delegation";
import {IdentifierDtoMapper} from "./identifier";
import {CodeStubDtoMapper} from "./codeStubCodingReference";

export namespace HealthcareElementMapper {
  import toCodingReference = CodeStubDtoMapper.toCodingReference;
  import toDelegation = DelegationMapper.toDelegation;
  import toIdentifierDto = IdentifierDtoMapper.toIdentifierDto;
  import toCodeStub = CodeStubDtoMapper.toCodeStub;
  import toDelegationDto = DelegationMapper.toDelegationDto;
  import toIdentifier = IdentifierDtoMapper.toIdentifier;

  export const toHealthcareElement = (dto: HealthElement) =>
    new HealthcareElement({
      id: dto.id,
      identifiers: map(dto.identifiers, toIdentifier),
      codes: mapSet(new Set(dto.codes), toCodingReference),
      tags: mapSet(new Set(dto.tags), toCodingReference),
      rev: dto.rev,
      created: dto.created,
      modified: dto.modified,
      author: dto.author,
      responsible: dto.responsible,
      medicalLocationId: dto.medicalLocationId,
      endOfLife: dto.endOfLife,
      deletionDate: dto.deletionDate,
      healthElementId: dto.healthElementId,
      valueDate: dto.valueDate,
      openingDate: dto.openingDate,
      closingDate: dto.closingDate,
      description: dto.descr,
      note: dto.note,
      systemMetaData: new SystemMetaDataEncrypted({
        secretForeignKeys: dto.secretForeignKeys,
        cryptedForeignKeys: toMapSetTransform(dto.cryptedForeignKeys, toDelegation),
        delegations: toMapSetTransform(dto.delegations, toDelegation),
        encryptionKeys: toMapSetTransform(dto.encryptionKeys, toDelegation),
      })
    });

  export const toHealthElementDto = (obj: HealthcareElement) =>
    new HealthElement({
      id: forceUuid(obj.id),
      identifiers: map(obj.identifiers, toIdentifierDto),
      tags: mapSet(obj.tags, toCodeStub),
      codes: mapSet(obj.codes, toCodeStub),
      rev: obj.rev,
      created: obj.created,
      modified: obj.modified,
      author: obj.author,
      responsible: obj.responsible,
      medicalLocationId: obj.medicalLocationId,
      endOfLife: obj.endOfLife,
      deletionDate: obj.deletionDate,
      healthElementId: obj.healthElementId,
      valueDate: obj.valueDate,
      openingDate: obj.openingDate,
      closingDate: obj.closingDate,
      descr: obj.description,
      note: obj.note,
      relevant: true,
      status: 0,
      secretForeignKeys: obj.systemMetaData?.secretForeignKeys,
      cryptedForeignKeys: toMapSetTransform(obj.systemMetaData?.cryptedForeignKeys, toDelegationDto),
      delegations: toMapSetTransform(obj.systemMetaData?.delegations, toDelegationDto),
      encryptionKeys: toMapSetTransform(obj.systemMetaData?.encryptionKeys, toDelegationDto),
    });
}

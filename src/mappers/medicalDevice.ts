import { Device } from '@icure/api'
import { MedicalDevice } from '../models/MedicalDevice'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner'
import { forceUuid, map, mapSetToArray } from './utils'
import { CodeStubDtoMapper } from './codeStubCodingReference'
import { PropertyStubMapper } from './property'
import {IdentifierDtoMapper} from "./identifier";

export namespace MedicalDeviceMapper {
  import toCodingReference = CodeStubDtoMapper.toCodingReference
  import toProperty = PropertyStubMapper.toProperty
  import toPropertyStubDto = PropertyStubMapper.toPropertyStubDto;
  import toIdentifierDto = IdentifierDtoMapper.toIdentifierDto;
  import toCodeStub = CodeStubDtoMapper.toCodeStub;
  import toIdentifier = IdentifierDtoMapper.toIdentifier;

  export const toMedicalDevice = (dto: Device) =>
    new MedicalDevice({
      id: dto.id,
      author: dto.author,
      responsible: dto.responsible,
      endOfLife: dto.endOfLife,
      identifiers: map(dto.identifiers, toIdentifier),
      labels: new Set(map(dto.tags, toCodingReference)),
      codes: new Set(map(dto.codes, toCodingReference)),
      properties: new Set(map(dto.properties, toProperty)),
      rev: dto.rev,
      deletionDate: dto.deletionDate,
      name: dto.name,
      externalId: dto.externalId,
      parentId: dto.parentId,
      picture: dto.picture,
      type: dto.type,
      brand: dto.brand,
      model: dto.model,
      serialNumber: dto.serialNumber,
      created: dto.created,
      modified: dto.modified,
      systemMetaData: new SystemMetaDataOwner({
        publicKey: dto.publicKey,
        hcPartyKeys: dto.hcPartyKeys,
        privateKeyShamirPartitions: dto.privateKeyShamirPartitions,
        aesExchangeKeys: dto.aesExchangeKeys,
        transferKeys: dto.transferKeys,
      }),
    })

  export const toDeviceDto = (obj: MedicalDevice) =>
    new Device({
      id: forceUuid(obj.id),
      author: obj.author,
      responsible: obj.responsible,
      endOfLife: obj.endOfLife,
      identifier: map(obj.identifiers, toIdentifierDto),
      tags: mapSetToArray(obj.labels, toCodeStub),
      codes: mapSetToArray(obj.codes, toCodeStub),
      properties: mapSetToArray(obj.properties, toPropertyStubDto),
      rev: obj.rev,
      deletionDate: obj.deletionDate,
      name: obj.name,
      externalId: obj.externalId,
      parentId: obj.parentId,
      picture: obj.picture,
      type: obj.type,
      brand: obj.brand,
      model: obj.model,
      serialNumber: obj.serialNumber,
      created: obj.created,
      modified: obj.modified,
      publicKey: obj.systemMetaData?.publicKey,
      hcPartyKeys: obj.systemMetaData?.hcPartyKeys,
      privateKeyShamirPartitions: obj.systemMetaData?.privateKeyShamirPartitions,
      aesExchangeKeys: obj.systemMetaData?.aesExchangeKeys,
      transferKeys: obj.systemMetaData?.transferKeys,
    })
}

import { Device } from '@icure/api'
import { MedicalDevice } from '../models/MedicalDevice'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner'
import { forceUuid, map, mapSetToArray } from './utils'
import { CodeStubDtoMapper } from './codeStubCodingReference'
import { PropertyStubMapper } from './property'
import { SystemMetaDataMapper } from './metadata'

export namespace MedicalDeviceMapper {
  import toCodingReference = CodeStubDtoMapper.toCodingReference
  import toProperty = PropertyStubMapper.toProperty
  import toSystemMetaDataOwner = SystemMetaDataMapper.toSystemMetaDataOwner
  import toSystemMetaDataOwnerDto = SystemMetaDataMapper.toSystemMetaDataOwnerDto

  export const toMedicalDevice = (dto: Device) =>
    new MedicalDevice({
      id: dto.id,
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
      systemMetaData: toSystemMetaDataOwner(dto),
    })

  export const toDeviceDto = (obj: MedicalDevice) =>
    new Device({
      id: forceUuid(obj.id),
      tags: mapSetToArray(obj.labels, toCodingReference),
      codes: mapSetToArray(obj.codes, toCodingReference),
      properties: mapSetToArray(obj.properties, toProperty),
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
      ...(obj.systemMetaData ? toSystemMetaDataOwnerDto(obj.systemMetaData) : {}),
    })
}

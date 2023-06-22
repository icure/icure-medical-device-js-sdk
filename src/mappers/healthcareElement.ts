import { HealthcareElement } from '../models/HealthcareElement'
import { HealthElement } from '@icure/api'
import { forceUuid, map, mapSet, mapSetToArray, toMapArrayTransform, toMapSetTransform } from './utils'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted'
import { DelegationMapper } from './delegation'
import { IdentifierDtoMapper } from './identifier'
import { CodeStubDtoMapper } from './codeStubCodingReference'
import { SecurityMetaData } from '../models/SecurityMetaData'
import { SystemMetaDataMapper } from './metadata'

export namespace HealthcareElementMapper {
  import toCodingReference = CodeStubDtoMapper.toCodingReference
  import toDelegation = DelegationMapper.toDelegation
  import toIdentifierDto = IdentifierDtoMapper.toIdentifierDto
  import toCodeStub = CodeStubDtoMapper.toCodeStub
  import toDelegationDto = DelegationMapper.toDelegationDto
  import toIdentifier = IdentifierDtoMapper.toIdentifier
  import toSystemMetaDataEncrypted = SystemMetaDataMapper.toSystemMetaDataEncrypted
  import toSystemMetaDataEncryptedDto = SystemMetaDataMapper.toSystemMetaDataEncryptedDto

  export const toHealthcareElement = (dto: HealthElement) =>
    new HealthcareElement({
      id: dto.id,
      identifiers: map(dto.identifiers, toIdentifier),
      codes: mapSet(new Set(dto.codes), toCodingReference),
      labels: mapSet(new Set(dto.tags), toCodingReference),
      rev: dto.rev,
      created: dto.created,
      modified: dto.modified,
      author: dto.author,
      responsible: dto.responsible,
      medicalLocationId: dto.medicalLocationId,
      endOfLife: dto.endOfLife,
      deletionDate: dto.deletionDate,
      healthcareElementId: dto.healthElementId ?? dto.id,
      valueDate: dto.valueDate,
      openingDate: dto.openingDate,
      closingDate: dto.closingDate,
      description: dto.descr,
      note: dto.note,
      systemMetaData: toSystemMetaDataEncrypted(dto),
    })

  export const toHealthElementDto = (obj: HealthcareElement) => {
    const id = forceUuid(obj.id)
    return new HealthElement({
      id: id,
      identifiers: map(obj.identifiers, toIdentifierDto),
      tags: mapSetToArray(obj.labels, toCodeStub),
      codes: mapSetToArray(obj.codes, toCodeStub),
      rev: obj.rev,
      created: obj.created,
      modified: obj.modified,
      author: obj.author,
      responsible: obj.responsible,
      medicalLocationId: obj.medicalLocationId,
      endOfLife: obj.endOfLife,
      deletionDate: obj.deletionDate,
      healthElementId: obj.healthcareElementId ?? id,
      valueDate: obj.valueDate,
      openingDate: obj.openingDate,
      closingDate: obj.closingDate,
      descr: obj.description,
      note: obj.note,
      relevant: true,
      status: 0,
      ...(obj.systemMetaData ? toSystemMetaDataEncryptedDto(obj.systemMetaData) : {}),
    })
  }
}

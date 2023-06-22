import { HealthcareParty } from '@icure/api'
import { HealthcareProfessional } from '../models/HealthcareProfessional'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner'
import { forceUuid, map, mapSet, mapSetToArray } from './utils'
import { PersonNameDtoMapper } from './personName'
import { AddressMapper } from './address'
import { CodeStubDtoMapper } from './codeStubCodingReference'
import { PropertyStubMapper } from './property'
import { SystemMetaDataMapper } from './metadata'

export namespace HealthcareProfessionalMapper {
  import toPersonName = PersonNameDtoMapper.toPersonName
  import toAddress = AddressMapper.toAddress
  import toCodingReference = CodeStubDtoMapper.toCodingReference
  import toProperty = PropertyStubMapper.toProperty
  import toCodeStub = CodeStubDtoMapper.toCodeStub
  import toSystemMetaDataOwner = SystemMetaDataMapper.toSystemMetaDataOwner
  import toSystemMetaDataOwnerDto = SystemMetaDataMapper.toSystemMetaDataOwnerDto

  export const toHealthcareProfessional = (obj: HealthcareParty) =>
    new HealthcareProfessional({
      id: obj.id,
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
      parentId: obj.parentId,
      picture: obj.picture,
      notes: obj.notes,
      systemMetaData: toSystemMetaDataOwner(obj),
    })

  export const toHealthcarePartyDto = (obj: HealthcareProfessional) =>
    new HealthcareParty({
      id: forceUuid(obj.id),
      tags: mapSetToArray(obj.labels, toCodeStub),
      codes: mapSetToArray(obj.codes, toCodeStub),
      names: map(obj.names, toPersonName),
      addresses: map(obj.addresses, toAddress),
      languages: obj.languages,
      properties: mapSetToArray(obj.properties, toProperty),
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
      ...(obj.systemMetaData ? toSystemMetaDataOwnerDto(obj.systemMetaData) : {}),
    })
}

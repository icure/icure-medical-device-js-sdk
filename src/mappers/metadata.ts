import { EncryptedEntityStub, SecurityMetadata as SecurityMetadataDto, SecureDelegation as SecureDelegationDto } from '@icure/api'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted'
import { mapSetToArray, toMap, toMapArrayTransform, toMapSetTransform, toMapTransform } from './utils'
import { SecurityMetaData } from '../models/SecurityMetaData'
import { DelegationMapper } from './delegation'
import { AccessLevelEnum, SecureDelegation } from '../models/SecureDelegation'
import { DataOwnerOrStub } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner'
import { SystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted'
import { filterUndefined } from '../utils/filterUndefined'
import { Delegation } from '@icure/api/icc-api/model/Delegation'
import { SecurityMetadata } from '@icure/api/icc-api/model/SecurityMetadata'

export namespace SystemMetaDataMapper {
  import toDelegation = DelegationMapper.toDelegation
  import AccessLevelEnumDto = SecureDelegationDto.AccessLevelEnum
  import toDelegationDto = DelegationMapper.toDelegationDto

  export const toSystemMetaDataEncrypted = (dto: EncryptedEntityStub) =>
    new SystemMetaDataEncrypted(filterUndefined(toSystemMetaDataOwnerEncrypted(dto)))

  export const toSystemMetaDataOwner = (dto: DataOwnerOrStub) => new SystemMetaDataOwner(filterUndefined(toISystemMetaDataOwner(dto)))

  export const toSystemMetaDataOwnerEncrypted = (dto: EncryptedEntityStub & DataOwnerOrStub) =>
    new SystemMetaDataOwnerEncrypted(
      filterUndefined({
        ...toISystemMetaDataOwner(dto),
        ...toISystemMetaDataEncrypted(dto),
      })
    )

  export const toSystemMetaDataOwnerDto = (obj: SystemMetaDataOwner) => ({
    publicKey: obj.publicKey,
    publicKeysForOaepWithSha256: Array.from(obj.publicKeysForOaepWithSha256),
    aesExchangeKeys: obj.aesExchangeKeys,
    hcPartyKeys: obj.hcPartyKeys,
    privateKeyShamirPartitions: obj.privateKeyShamirPartitions,
    transferKeys: obj.transferKeys,
  })

  export const toSystemMetaDataEncryptedDto = (obj: SystemMetaDataEncrypted) => ({
    secretForeignKeys: obj.secretForeignKeys,
    cryptedForeignKeys: toMapArrayTransform(obj.cryptedForeignKeys, toDelegationDto),
    delegations: toMapArrayTransform(obj.delegations, toDelegationDto),
    encryptionKeys: toMapArrayTransform(obj.encryptionKeys, toDelegationDto),
    encryptedSelf: obj.encryptedSelf,
    securityMetadata: obj.securityMetadata ? toSecurityMetaDataDto(obj.securityMetadata) : undefined,
  })

  export const toSystemMetaDataOwnerEncryptedDto = (obj: SystemMetaDataOwnerEncrypted) => ({
    ...toSystemMetaDataOwnerDto(obj),
    ...toSystemMetaDataEncryptedDto(obj),
  })

  const toISystemMetaDataOwner = (dto: DataOwnerOrStub) => ({
    publicKey: dto.publicKey,
    publicKeysForOaepWithSha256: new Set(dto.publicKeysForOaepWithSha256 ?? []),
    aesExchangeKeys: dto.aesExchangeKeys,
    hcPartyKeys: dto.hcPartyKeys,
    privateKeyShamirPartitions: dto.privateKeyShamirPartitions,
    transferKeys: dto.transferKeys,
  })

  const toISystemMetaDataEncrypted = (dto: EncryptedEntityStub) => ({
    secretForeignKeys: dto.secretForeignKeys,
    cryptedForeignKeys: toMapSetTransform(dto.cryptedForeignKeys, toDelegation),
    delegations: toMapSetTransform(dto.delegations, toDelegation),
    encryptionKeys: toMapSetTransform(dto.encryptionKeys, toDelegation),
    encryptedSelf: dto.encryptedSelf,
    securityMetadata: dto.securityMetadata ? toSecurityMetaData(dto.securityMetadata) : undefined,
  })

  const toSecurityMetaData = (dto: SecurityMetadataDto) =>
    new SecurityMetaData(
      filterUndefined({
        secureDelegations: toMapTransform(dto.secureDelegations, toSecureDelegation),
        keysEquivalences: dto.keysEquivalences,
      })
    )

  const toSecurityMetaDataDto = (obj: SecurityMetaData) =>
    new SecurityMetadataDto({
      secureDelegations: toMapTransform(obj.secureDelegations, toSecureDelegationDto),
      keysEquivalences: obj.keysEquivalences,
    })

  const toSecureDelegation = (dto: SecureDelegationDto) =>
    new SecureDelegation(
      filterUndefined({
        delegate: dto.delegate,
        delegator: dto.delegator,
        secretIds: new Set(dto.secretIds ?? []),
        encryptionKeys: new Set(dto.encryptionKeys ?? []),
        owningEntityIds: new Set(dto.owningEntityIds ?? []),
        parentDelegations: new Set(dto.parentDelegations ?? []),
        exchangeDataId: dto.exchangeDataId,
        encryptedExchangeDataId: dto.encryptedExchangeDataId,
        permissions: toAccessLevel(dto.permissions),
      })
    )

  const toSecureDelegationDto = (obj: SecureDelegation) =>
    new SecureDelegationDto({
      delegate: obj.delegate,
      delegator: obj.delegator,
      secretIds: [...obj.secretIds],
      encryptionKeys: [...obj.encryptionKeys],
      owningEntityIds: [...obj.owningEntityIds],
      parentDelegations: [...obj.parentDelegations],
      exchangeDataId: obj.exchangeDataId,
      encryptedExchangeDataId: obj.encryptedExchangeDataId,
      permissions: toAccessLevelDto(obj.permissions),
    })

  const toAccessLevel = (dto: AccessLevelEnumDto) => {
    switch (dto) {
      case AccessLevelEnumDto.READ:
        return AccessLevelEnum.READ
      case AccessLevelEnumDto.WRITE:
        return AccessLevelEnum.WRITE
      default:
        throw new Error(`Unrecognized access level: ${dto}`)
    }
  }

  const toAccessLevelDto = (obj: AccessLevelEnum) => {
    switch (obj) {
      case AccessLevelEnum.READ:
        return AccessLevelEnumDto.READ
      case AccessLevelEnum.WRITE:
        return AccessLevelEnumDto.WRITE
      default:
        throw new Error(`Unrecognized access level: ${obj}`)
    }
  }
}

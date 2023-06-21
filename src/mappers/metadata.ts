import { EncryptedEntityStub } from '@icure/api'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted'
import { mapSetToArray, toMap, toMapArrayTransform, toMapSetTransform } from './utils'
import { DelegationMapper } from './delegation'
import { DataOwnerOrStub } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner'
import { SystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted'
import { filterUndefined } from '../utils/filterUndefined'

export namespace SystemMetaDataMapper {
  import toDelegation = DelegationMapper.toDelegation
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
  })
}

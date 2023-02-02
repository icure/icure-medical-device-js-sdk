import { IccCryptoXApi, Delegation, EncryptedEntity, EncryptedParentEntity, EncryptedEntityStub } from '@icure/api'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted'
import { SystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted'

/**
 * @internal this function is meant for internal use only.
 */
export function systemMetadataToEncryptedEntityStub(metadata: SystemMetaDataEncrypted | SystemMetaDataOwnerEncrypted): EncryptedEntityStub {
  const marshalled = metadata.marshal()
  return {
    ...marshalled,
    delegations: Object.fromEntries(Object.entries(marshalled.delegations ?? {}).map(([k, v]) => [k, [...v]])),
    encryptionKeys: Object.fromEntries(Object.entries(marshalled.encryptionKeys ?? {}).map(([k, v]) => [k, [...v]])),
    cryptedForeignKeys: Object.fromEntries(Object.entries(marshalled.cryptedForeignKeys ?? {}).map(([k, v]) => [k, [...v]])),
  }
}

import { IccCryptoXApi, Delegation, EncryptedEntity, EncryptedParentEntity } from '@icure/api'

/**
 * @internal this function is meant for internal use only.
 */
export async function findAndDecryptPotentiallyUnknownKeysForDelegate(
  cryptoApi: IccCryptoXApi,
  objectId: string,
  myId: string,
  delegateId: string,
  delegations: { [key: string]: Delegation[] }
): Promise<string[]> {
  const allDecrypted = await cryptoApi.extractKeysFromDelegationsForHcpHierarchy(myId, objectId, delegations)
  const meAndDelegateKeys: { [dataOwner: string]: Delegation[] } = {}
  const delegateToMeKeys = (delegations[myId] ?? []).filter((element) => element.owner == delegateId)
  const meToDelegateKeys = (delegations[delegateId] ?? []).filter((element) => element.owner == myId)
  if (delegateToMeKeys.length) {
    meAndDelegateKeys[myId] = delegateToMeKeys
  }
  if (meToDelegateKeys.length) {
    meAndDelegateKeys[delegateId] = meToDelegateKeys
  }
  const decryptedForDelegate = await cryptoApi.extractKeysFromDelegationsForHcpHierarchy(myId, objectId, meAndDelegateKeys)
  const filterOutSet = new Set(decryptedForDelegate.extractedKeys)
  return allDecrypted.extractedKeys.filter((x) => !filterOutSet.has(x))
}

/**
 * @internal this function is meant for internal use only.
 */
export async function addManyDelegationKeys<T extends EncryptedEntity>(
  cryptoApi: IccCryptoXApi,
  myId: string,
  delegateId: string,
  entity: T,
  parent: EncryptedParentEntity | null,
  secretIds: string[],
  encryptionKey: string | null
): Promise<T> {
  if (!secretIds.length && !encryptionKey && !parent) return entity
  let latestUpdate = await cryptoApi.addDelegationsAndEncryptionKeys(parent, entity, myId, delegateId, secretIds[0], encryptionKey)
  for (let i = 1; i < secretIds.length; i++) {
    latestUpdate = await cryptoApi.addDelegationsAndEncryptionKeys(null, latestUpdate, myId, delegateId, secretIds[i], null)
  }
  return latestUpdate
}

import { hex2ua, KeyStorageFacade, pkcs8ToJwk, spkiToJwk, StorageFacade } from '@icure/api'
import { DefaultStorageEntryKeysFactory } from '@icure/api/icc-x-api/storage/DefaultStorageEntryKeysFactory'
import { IcureStorageFacade } from '@icure/api/icc-x-api/storage/IcureStorageFacade'
import { StorageEntryKeysFactory } from '@icure/api/icc-x-api/storage/StorageEntryKeysFactory'
import { KeyPair } from '@icure/api/icc-x-api/crypto/RSA'
import { UserDetails } from '@icure/test-setup/types'

export class TestStorage implements StorageFacade<string> {
  readonly data = new Map<string, string>()

  async getItem(key: string): Promise<string | undefined> {
    return this.data.get(key)
  }

  async removeItem(key: string): Promise<void> {
    this.data.delete(key)
  }

  async setItem(key: string, valueToStore: string): Promise<void> {
    this.data.set(key, valueToStore)
  }
}

export class TestKeyStorage implements KeyStorageFacade {
  readonly data = new Map<string, any>()

  async deleteKeypair(key: string): Promise<void> {
    this.data.delete(key)
  }

  async getKeypair(key: string): Promise<{ publicKey: JsonWebKey; privateKey: JsonWebKey } | undefined> {
    return this.data.get(key)
  }

  async getPrivateKey(key: string): Promise<JsonWebKey | undefined> {
    return (await this.getKeypair(key))?.privateKey
  }

  async getPublicKey(key: string): Promise<JsonWebKey | undefined> {
    return (await this.getKeypair(key))?.publicKey
  }

  async storeKeyPair(key: string, keyPair: { publicKey: JsonWebKey; privateKey: JsonWebKey }): Promise<void> {
    this.data.set(key, keyPair)
  }

  async storePrivateKey(key: string, privateKey: JsonWebKey): Promise<void> {
    this.data.set(key, privateKey)
  }

  async storePublicKey(key: string, publicKey: JsonWebKey): Promise<void> {
    this.data.set(key, publicKey)
  }
}

export async function testStorageWithKeys(
  keyFactory: StorageEntryKeysFactory,
  data: { dataOwnerId: string; pairs: { keyPair: KeyPair<string> }[] }[]
): Promise<{ keyStorage: KeyStorageFacade; storage: StorageFacade<string> }> {
  const keyStorage = new TestKeyStorage()
  const storage = new TestStorage()
  const icureStorage = new IcureStorageFacade(keyStorage, storage, keyFactory)
  for (const { dataOwnerId, pairs } of data) {
    for (const pair of pairs) {
      await icureStorage.saveKey(
        dataOwnerId,
        pair.keyPair.publicKey.slice(-32),
        {
          privateKey: pkcs8ToJwk(hex2ua(pair.keyPair.privateKey)),
          publicKey: spkiToJwk(hex2ua(pair.keyPair.publicKey)),
        },
        true
      )
    }
  }
  return { keyStorage, storage }
}

export async function testStorageForUser(credentials: UserDetails): Promise<{ keyStorage: KeyStorageFacade; storage: StorageFacade<string> }> {
  return await testStorageWithKeys(new DefaultStorageEntryKeysFactory(), [
    {
      dataOwnerId: credentials.dataOwnerId,
      pairs: [{ keyPair: { publicKey: credentials.publicKey, privateKey: credentials.privateKey } }],
    },
  ])
}

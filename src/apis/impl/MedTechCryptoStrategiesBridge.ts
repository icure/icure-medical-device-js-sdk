import { CryptoStrategies } from '@icure/api/icc-x-api/crypto/CryptoStrategies'
import { MedTechCryptoStrategies } from '../../services/MedTechCryptoStrategies'
import { DataOwnerWithType as DataOwnerWithTypeDto, hex2ua, ua2hex } from '@icure/api'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { KeyPair } from '@icure/api/icc-x-api/crypto/RSA'
import { DataOwnerMapper } from '../../mappers/dataOwner'
import { CryptoActorStubWithType } from '@icure/api/icc-api/model/CryptoActorStub'
import KeyVerificationBehaviour = MedTechCryptoStrategies.KeyVerificationBehaviour
import { hexPublicKeysOf } from '@icure/api/icc-x-api/crypto/utils'

export class MedTechCryptoStrategiesBridge implements CryptoStrategies {
  constructor(private readonly medtechStrategies: MedTechCryptoStrategies) {}

  async generateNewKeyForDataOwner(self: DataOwnerWithTypeDto, cryptoPrimitives: CryptoPrimitives): Promise<KeyPair<CryptoKey> | boolean> {
    const canGenerate = await this.medtechStrategies.allowNewKeyPairGeneration(DataOwnerMapper.toDataOwnerWithType(self))
    if (canGenerate) {
      const newKey = await cryptoPrimitives.RSA.generateKeyPair()
      await this.medtechStrategies.notifyKeyPairGeneration({
        privateKey: ua2hex(await cryptoPrimitives.RSA.exportKey(newKey.privateKey, 'pkcs8')),
        publicKey: ua2hex(await cryptoPrimitives.RSA.exportKey(newKey.publicKey, 'spki')),
      })
      return newKey
    } else return false
  }

  async recoverAndVerifySelfHierarchyKeys(
    keysData: {
      dataOwner: DataOwnerWithTypeDto
      unknownKeys: string[]
      unavailableKeys: string[]
    }[],
    cryptoPrimitives: CryptoPrimitives
  ): Promise<{
    [dataOwnerId: string]: {
      recoveredKeys: {
        [keyPairFingerprint: string]: KeyPair<CryptoKey>
      }
      keyAuthenticity: {
        [keyPairFingerprint: string]: boolean
      }
    }
  }> {
    if (keysData.length !== 1) {
      throw new Error('Internal error: data owners of MedTech api should have no hierarchy.')
    }
    const missingKeys = keysData[0].unavailableKeys
    const unverifiedKeys = keysData[0].unknownKeys
    const { recoveredKeyPairs, verifiedKeys } = await this.medtechStrategies.recoverAndVerifyKeys(
      DataOwnerMapper.toDataOwnerWithType(keysData[0].dataOwner),
      missingKeys,
      unverifiedKeys
    )
    const missingKeysSet = new Set(missingKeys)
    const unverifiedKeysSet = new Set(unverifiedKeys)
    if (recoveredKeyPairs.some(({ publicKey }) => !missingKeysSet.has(publicKey))) {
      throw new Error('Recovered keys should only contain keys which were originally missing')
    }
    if (Object.keys(verifiedKeys).some((publicKey) => !unverifiedKeysSet.has(publicKey))) {
      throw new Error('Verified keys should only contain keys which were originally unverified')
    }
    if (
      unverifiedKeys.some(
        (unverifiedKey) => !verifiedKeys[unverifiedKey] && !recoveredKeyPairs.find((recoveredKeyPair) => recoveredKeyPair.publicKey === unverifiedKey)
      )
    ) {
      throw new Error('Verified keys should contain an entry for each unverified key which was not recovered')
    }
    if (
      recoveredKeyPairs.some(
        (recoveredKeyPair) =>
          verifiedKeys[recoveredKeyPair.publicKey] && verifiedKeys[recoveredKeyPair.publicKey] !== KeyVerificationBehaviour.MARK_VERIFIED
      )
    ) {
      throw new Error('Recovered keys should considered as verified.')
    }
    const existingKeys = hexPublicKeysOf(keysData[0].dataOwner)
    return Promise.resolve({
      [keysData[0].dataOwner.dataOwner.id!]: {
        recoveredKeys: Object.fromEntries(
          await Promise.all(
            recoveredKeyPairs.map(async (x): Promise<[string, KeyPair<CryptoKey>]> => {
              if (!existingKeys.has(x.publicKey)) throw new Error('Internal error: recovered key should be an existing key')
              return [x.publicKey.slice(-32), await cryptoPrimitives.RSA.importKeyPair('pkcs8', hex2ua(x.privateKey), 'spki', hex2ua(x.publicKey))]
            })
          )
        ),
        keyAuthenticity: Object.fromEntries(
          Object.entries(verifiedKeys)
            .filter(([, b]) => b !== KeyVerificationBehaviour.TEMPORARILY_UNVERIFIED)
            .map(([k, b]) => {
              if (b === KeyVerificationBehaviour.MARK_VERIFIED) {
                return [k.slice(-32), true]
              } else if (b === KeyVerificationBehaviour.MARK_UNVERIFIED) {
                return [k.slice(-32), false]
              } else throw new Error(`Unexpected key verification behaviour ${b}`)
            })
        ),
      },
    })
  }

  async verifyDelegatePublicKeys(delegate: CryptoActorStubWithType, publicKeys: string[], cryptoPrimitives: CryptoPrimitives): Promise<string[]> {
    return await this.medtechStrategies.verifyDelegatePublicKeys(delegate.stub.id, publicKeys, cryptoPrimitives)
  }
}

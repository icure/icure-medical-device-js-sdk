import { CryptoStrategies } from '@icure/api/icc-x-api/crypto/CryptoStrategies'
import { MedTechCryptoStrategies } from '../../services/MedTechCryptoStrategies'
import { DataOwnerWithType as DataOwnerWithTypeDto, hex2ua, ua2hex } from '@icure/api'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { KeyPair, ShaVersion } from '@icure/api/icc-x-api/crypto/RSA'
import { DataOwnerMapper } from '../../mappers/dataOwner'
import { fingerprintV1, hexPublicKeysWithSha1Of, hexPublicKeysWithSha256Of } from '@icure/api/icc-x-api/crypto/utils'
import { CryptoActorStubWithType } from '@icure/api/icc-api/model/CryptoActorStub'
import KeyVerificationBehaviour = MedTechCryptoStrategies.KeyVerificationBehaviour

export class MedTechCryptoStrategiesBridge implements CryptoStrategies {
  constructor(private readonly medtechStrategies: MedTechCryptoStrategies) {}

  async generateNewKeyForDataOwner(self: DataOwnerWithTypeDto, cryptoPrimitives: CryptoPrimitives): Promise<KeyPair<CryptoKey> | boolean> {
    const canGenerate = await this.medtechStrategies.allowNewKeyPairGeneration(DataOwnerMapper.toDataOwnerWithType(self))
    if (canGenerate) {
      const newKey = await cryptoPrimitives.RSA.generateKeyPair('sha-256')
      await this.medtechStrategies.notifyKeyPairGeneration({
        privateKey: ua2hex(await cryptoPrimitives.RSA.exportKey(newKey.privateKey, 'pkcs8')),
        publicKey: ua2hex(await cryptoPrimitives.RSA.exportKey(newKey.publicKey, 'spki')),
      })
      return newKey
    } else return false
  }

  async recoverAndVerifySelfHierarchyKeys(
    keysData: {
      dataOwnerInfo: DataOwnerWithTypeDto
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
      DataOwnerMapper.toDataOwnerWithType(keysData[0].dataOwnerInfo),
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
    const existingKeysSha1 = hexPublicKeysWithSha1Of(keysData[0].dataOwnerInfo)
    const existingKeysSha256 = hexPublicKeysWithSha256Of(keysData[0].dataOwnerInfo)
    return Promise.resolve({
      [keysData[0].dataOwnerInfo.dataOwner.id!]: {
        recoveredKeys: Object.fromEntries(
          await Promise.all(
            recoveredKeyPairs.map(async (x): Promise<[string, KeyPair<CryptoKey>]> => {
              let hashAlgorithm: ShaVersion
              if (existingKeysSha1.has(x.publicKey)) {
                hashAlgorithm = 'sha-1'
              } else if (existingKeysSha256.has(x.publicKey)) {
                hashAlgorithm = 'sha-256'
              } else throw new Error('Internal error: recovered key should be an existing key')
              return [
                fingerprintV1(x.publicKey),
                await cryptoPrimitives.RSA.importKeyPair('pkcs8', hex2ua(x.privateKey), 'spki', hex2ua(x.publicKey), hashAlgorithm),
              ]
            })
          )
        ),
        keyAuthenticity: Object.fromEntries(
          Object.entries(verifiedKeys)
            .filter(([, b]) => b !== KeyVerificationBehaviour.TEMPORARILY_UNVERIFIED)
            .map(([k, b]) => {
              if (b === KeyVerificationBehaviour.MARK_VERIFIED) {
                return [fingerprintV1(k), true]
              } else if (b === KeyVerificationBehaviour.MARK_UNVERIFIED) {
                return [fingerprintV1(k), false]
              } else throw new Error(`Unexpected key verification behaviour ${b}`)
            })
        ),
      },
    })
  }

  async verifyDelegatePublicKeys(delegate: CryptoActorStubWithType, publicKeys: string[], cryptoPrimitives: CryptoPrimitives): Promise<string[]> {
    return await this.medtechStrategies.verifyDelegatePublicKeys(delegate.stub.id, publicKeys, cryptoPrimitives)
  }

  dataOwnerRequiresAnonymousDelegation(dataOwner: CryptoActorStubWithType): boolean {
    return this.medtechStrategies.dataOwnerRequiresAnonymousDelegation(dataOwner.stub.id, DataOwnerMapper.toDataOwnerType(dataOwner.type))
  }
}

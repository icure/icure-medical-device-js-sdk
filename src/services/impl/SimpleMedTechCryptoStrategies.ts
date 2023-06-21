import { MedTechCryptoStrategies } from '../MedTechCryptoStrategies'
import { KeyPair } from '@icure/api/icc-x-api/crypto/RSA'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { DataOwnerTypeEnum, DataOwnerWithType } from '../../models/DataOwner'

/**
 * Implementation of med-tech crypto strategies which uses pre-loaded keys for initialisation and puts full trust on the
 * server in regard to public keys.
 *
 * The pre-loaded keys are used during the initialisation as recovered keys if some keys could not be found
 * automatically by the api initialisation procedure. There is no need to provide keys from the key storage if they
 * were stored at standard entries, nor keys recovered from transfer keys and/or shamir splits, as these will be
 * automatically loaded by the initialisation procedure.
 */
export class SimpleMedTechCryptoStrategies implements MedTechCryptoStrategies {
  /**
   * If a new key pair was initialised during api initialisation this will return the generated keypair.
   */
  get generatedKeyPair(): KeyPair<string> | undefined {
    return this._generatedKeyPair ? { ...this._generatedKeyPair } : undefined
  }
  private _generatedKeyPair: KeyPair<string> | undefined

  /**
   * Builds a new instance of simple med-tech crypto strategies:
   * @param availableKeys pre-loaded available keys which may not be contained yet in the key storage. Will be also
   * considered as verified.
   * @param anonymousDataOwnerTypes data owner types which require anonymous delegations
   */
  constructor(private readonly availableKeys: KeyPair<string>[], private readonly anonymousDataOwnerTypes: Set<DataOwnerTypeEnum>) {}

  allowNewKeyPairGeneration(self: DataOwnerWithType): Promise<boolean> {
    return Promise.resolve(true)
  }

  recoverAndVerifyKeys(
    self: DataOwnerWithType,
    missingKeys: string[],
    unverifiedKeys: string[]
  ): Promise<{
    recoveredKeyPairs: KeyPair<string>[]
    verifiedKeys: { [p: string]: MedTechCryptoStrategies.KeyVerificationBehaviour }
  }> {
    const availableKeysByPublic = Object.fromEntries(this.availableKeys.map((keyPair) => [keyPair.publicKey, keyPair] as [string, KeyPair<string>]))
    const recoveredKeyPairs = missingKeys.flatMap((missingKey) => {
      const availableKey = availableKeysByPublic[missingKey]
      return availableKey ? [availableKey] : []
    })
    const recoveredPublicKeysSet = new Set(recoveredKeyPairs.map((keyPair) => keyPair.publicKey))
    const verifiedKeys = Object.fromEntries(
      unverifiedKeys
        .filter((unverifiedKey) => !recoveredPublicKeysSet.has(unverifiedKey))
        .map(
          (unverifiedKey) =>
            [
              unverifiedKey,
              !!availableKeysByPublic[unverifiedKey]
                ? MedTechCryptoStrategies.KeyVerificationBehaviour.MARK_VERIFIED
                : MedTechCryptoStrategies.KeyVerificationBehaviour.TEMPORARILY_UNVERIFIED,
            ] as [string, MedTechCryptoStrategies.KeyVerificationBehaviour]
        )
    )
    return Promise.resolve({ recoveredKeyPairs, verifiedKeys })
  }

  async notifyKeyPairGeneration(keyPair: KeyPair<string>): Promise<void> {
    if (!!this._generatedKeyPair) throw new Error('A new key pair was already created')
    this._generatedKeyPair = keyPair
  }

  verifyDelegatePublicKeys(delegateId: string, publicKeys: string[], cryptoPrimitives: CryptoPrimitives): Promise<string[]> {
    return Promise.resolve(publicKeys)
  }
}

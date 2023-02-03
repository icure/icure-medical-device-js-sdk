import { MedTechCryptoStrategies } from '../MedTechCryptoStrategies'
import { KeyPair } from '@icure/api/icc-x-api/crypto/RSA'
import { DataOwner } from '../../apis/impl/DataOwnerApiImpl'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { hexPublicKeysOf } from '@icure/api/icc-x-api/crypto/utils'

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
   * Builds a new instance of simple med-tech crypto strategies using the provided pre-loaded keys.
   */
  constructor(private readonly availableKeys: KeyPair<string>[]) {}

  allowNewKeyPairGeneration(self: DataOwner): Promise<boolean> {
    return Promise.resolve(true)
  }

  recoverKeys(self: DataOwner, missingKeys: string[]): Promise<KeyPair<string>[]> {
    return Promise.resolve(this.availableKeys)
  }

  async notifyKeyPairGeneration(keyPair: KeyPair<string>): Promise<void> {
    if (!!this._generatedKeyPair) throw new Error('A new key pair was already created')
    this._generatedKeyPair = keyPair
  }

  verifyDelegatePublicKeys(delegate: DataOwner, publicKeys: string[], cryptoPrimitives: CryptoPrimitives): Promise<string[]> {
    return Promise.resolve(publicKeys)
  }
}

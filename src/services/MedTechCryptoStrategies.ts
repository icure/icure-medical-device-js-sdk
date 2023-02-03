import { DataOwner } from '../apis/impl/DataOwnerApiImpl'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { KeyPair } from '@icure/api/icc-x-api/crypto/RSA'

/**
 * Allows to customise the behaviour of the med tech api to better suit your needs.
 *
 * An important task which should be done in these crypto strategies is public key verification: in general there is no
 * guarantee that the public keys stored in the iCure database are authentic, i.e. created by the data owner they are
 * associated to. This is because the database admins or a malicious attacker may have added his own public keys to the
 * data owner's public keys.
 * Sharing any kind of data using unverified public keys could potentially cause a data leak: this is why when creating
 * new exchange keys or when creating recovery data only verified keys will be considered. Unverified keys can still be
 * safely used for decryption of data.
 */
export interface MedTechCryptoStrategies {
  /**
   * Method called during initialisation if the current data owner declared some keys which could not be found on
   * initialisation of the api.
   * @param self the current data owner.
   * @param missingKeys hex-encoded spki representation of public keys which could not be found for the current data
   * owner.
   * @return all recovered keys.
   */
  recoverKeys(self: DataOwner, missingKeys: string[]): Promise<KeyPair<string>[]>

  /**
   * Method called during the initialisation of the medtech API. For the correct initialisation of the api at least key
   * pair must be available for the logged data  owner. If no key is available the api initialisation will call this
   * method to determine if it is allowed to create new key pairs.
   * @param self the current data owner.
   * @return true if the api initialisation can generate a new key pair, false if not; if false the api initialisation
   * will fail.
   */
  allowNewKeyPairGeneration(self: DataOwner): Promise<boolean>

  /**
   * Method called when a new key pair is generated. Will be called only once during the initialisation of the api and
   * won't ever be called afterwards.
   * @param keyPair the generated key pair in hex-encoded spki format.
   */
  notifyKeyPairGeneration(keyPair: KeyPair<string>): Promise<void>

  /**
   * Verifies if the public keys of a data owner which will be the delegate of a new exchange key do actually belong to
   * the person the data owner represents. This method is not called when the delegate would be the current data owner
   * for the api.
   *
   * The user will have to obtain the verified public keys of the delegate from outside iCure, for example by email with
   * another hcp, by checking the personal website of the other user, or by scanning verification qr codes at the doctor
   * office...
   *
   * As long as one of the public keys is verified the creation of a new exchange key will succeed. If no public key is
   * verified the operation will fail.
   * @param delegate the potential data owner delegate.
   * @param publicKeys public keys requiring verification, in spki hex-encoded format.
   * @param cryptoPrimitives cryptographic primitives you can use to support the process.
   * @return all verified public keys, in spki hex-encoded format.
   */
  verifyDelegatePublicKeys(delegate: DataOwner, publicKeys: string[], cryptoPrimitives: CryptoPrimitives): Promise<string[]>
}

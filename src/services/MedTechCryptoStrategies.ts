import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { KeyPair } from '@icure/api/icc-x-api/crypto/RSA'
import { DataOwnerTypeEnum, DataOwnerWithType } from '../models/DataOwner'
import { CryptoActorStubWithType } from '@icure/api/icc-api/model/CryptoActorStub'

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
   * Method called during initialisation if the api could not find and/or verify some key pairs for the current data
   * owner. This method allows you to implement custom key recovery methods and to support iCure's key recovery methods
   * by verifying keys.
   *
   * Any key recovered automatically by iCure will only be used for the decryption of data and not for the encryption of
   * new data. Verified keys instead will be used for both encryption and decryption (if the private key is also
   * available); additionally regardless of the availability of the private key verified keys will be used also to
   * automatically improve the metadata for iCure's key recovery methods.
   *
   * @param self the current data owner.
   * @param missingKeys hex-encoded spki representation of public keys which could not be found for the current data
   * owner. May overlap with {@link unverifiedKeys}.
   * @param unverifiedKeys hex-encoded spki representation of public keys which could not be verified as authentic. May
   * overlap with {@link missingKeys}.
   * @return
   * an object containing:
   * - `recoveredKeyPairs`: all recovered key pairs. They will automatically be considered as verified.
   * - `verifiedKeys`: an object associating each key of {@link unverifiedKeys} to the
   *   {@link MedTechCryptoStrategies.KeyVerificationBehaviour verification behaviour} for that key. All unverified keys
   *   which are not also recovered must be included here.
   */
  recoverAndVerifyKeys(
    self: DataOwnerWithType,
    missingKeys: string[],
    unverifiedKeys: string[]
  ): Promise<{
    recoveredKeyPairs: KeyPair<string>[]
    verifiedKeys: { [publicKey: string]: MedTechCryptoStrategies.KeyVerificationBehaviour }
  }>

  /**
   * Method called during the initialisation of the medtech API. For the correct initialisation of the api at least key
   * pair must be available for the logged data  owner. If no key is available the api initialisation will call this
   * method to determine if it is allowed to create new key pairs.
   * @param self the current data owner.
   * @return true if the api initialisation can generate a new key pair, false if not; if false the api initialisation
   * will fail.
   */
  allowNewKeyPairGeneration(self: DataOwnerWithType): Promise<boolean>

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
   * @param delegateId the potential data owner delegate id.
   * @param publicKeys public keys requiring verification, in spki hex-encoded format.
   * @param cryptoPrimitives cryptographic primitives you can use to support the process.
   * @return all verified public keys, in spki hex-encoded format.
   */
  verifyDelegatePublicKeys(delegateId: string, publicKeys: string[], cryptoPrimitives: CryptoPrimitives): Promise<string[]>

  /**
   * Specifies if a data owner requires anonymous delegations, i.e. his id should not appear unencrypted in entities
   * which he can access or else it could leak information. This should be the case for example for patient data owners.
   * @param dataOwnerId id of a data owner.
   * @param dataOwnerType type of the data owner with id {@link dataOwnerId}.
   * @return true if the delegations for the provided data owner should be anonymous.
   */
  dataOwnerRequiresAnonymousDelegation(dataOwnerId: string, dataOwnerType: DataOwnerTypeEnum): boolean
}

export namespace MedTechCryptoStrategies {
  /**
   * Specifies how the api should treat unverified key pairs for the data owner.
   */
  export enum KeyVerificationBehaviour {
    /**
     * The key pair will be marked as unverified and this result will be stored locally. Future instantiation of the api
     * with access to the same local storage (StorageFacade) will consider the key as unverified, without asking again
     * the crypto strategies for verification of the key.
     */
    MARK_UNVERIFIED = 'MARK_UNVERIFIED',
    /**
     * The key will be considered as unverified for this instance of the medtech api. Future instantiation of the api
     * will ask again for the verification of the key.
     */
    TEMPORARILY_UNVERIFIED = 'TEMPORARILY_UNVERIFIED',
    /**
     * The key pair will be marked as verified and this result will be stored locally. Future instantiation of the api
     * with access to the same local storage (StorageFacade) will consider the key as verified, without asking again
     * the crypto strategies for verification of the key.
     */
    MARK_VERIFIED = 'MARK_VERIFIED',
  }
}

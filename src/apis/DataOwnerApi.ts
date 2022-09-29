import { User } from '../models/User'

export interface DataOwnerApi {
  /**
   * Returns the data owner id of the provided user
   * @param user User for which we want to know the data owner id
   */
  getDataOwnerIdOf(user: User): string

  /**
   * Creates an RSA KeyPair for the provided user and updates its related DataOwner with the generated public key.
   * In the case of a Patient DataOwner, this service also creates a Patient Delegation, giving the patient access to
   * its own information.
   *
   * @param user The User for which we want to create a keyPair
   * @param overwriteExistingKeys When this flag is set to true, the service will create and assign a new RSA Key Pair
   * to the user, even if he already has one. This should therefore be activated ONLY when the user lost his key or starts
   * the solution on a new terminal. This flag is false by default.
   * @param userKeyPair KeyPair to use to init the cryptography scheme of a user. If no keyPair is provided,
   * the service will create one
   *
   * @return The response will contain the RSA keyPair generated for the provided user;
   */
  initCryptoFor(
    user: User,
    overwriteExistingKeys: boolean,
    userKeyPair?: { publicKey: string; privateKey: string }
  ): Promise<{ publicKey: string; privateKey: string }>
}

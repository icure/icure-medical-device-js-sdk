import { AuthenticationProcess } from '../models/AuthenticationProcess'
import { AuthenticationResult } from '../models/AuthenticationResult'

/**
 * The AuthenticationApi interface provides methods to authenticate and register users.
 */
export interface AuthenticationApi {
  /**
   * Starts the authentication of a user by sending him/her a validation code by email and/or by SMS.
   * Use this service if you would like to register or login your user in the iCure system.
   *
   * Provide at least one authentication tool (email and/or phoneNumber) to start the process.
   *
   * @param recaptcha To authenticate through iCure, we ask you to implement the reCAPTCHA v3 (Check {@link https://developers.google.com/recaptcha/docs/v3}).
   * This argument corresponds to the resulting key of the recaptcha procedure.
   *
   * @param email The email to use to authenticate the user
   * @param phoneNumber The phone number to use to authenticate the user
   *
   * @param firstName The firstname of the user to authenticate (Mandatory for registration only)
   * @param lastName The lastname of the user to authenticate (Mandatory for registration only)
   * @param healthcareProfessionalId The id of the healthcare professional inviting the user to register.
   * Use the id of the hcp in charge of the database where you want to add this new user. (Mandatory for registration only)
   *
   * @param bypassTokenCheck Prevent the token check during the validation process. Activates this flag **ONLY** for
   * dedicated use cases and users, like the submission on the Apple / Google Store. (false by default)
   *
   * @param validationCodeLength The length of the validation code to send to the user. (6 by default)
   * @return The AuthenticationProcess information needed to complete the authentication in the completeAuthentication service
   */
  startAuthentication(
    recaptcha: string,
    email?: string,
    phoneNumber?: string,
    firstName?: string,
    lastName?: string,
    healthcareProfessionalId?: string,
    bypassTokenCheck?: boolean,
    validationCodeLength?: number
  ): Promise<AuthenticationProcess>

  /**
   * Completes the authentication process of a user, by verifying the provided validation code and :
   * - In the case of a sign-up, create the user data;
   * - In the case of a login, re-generate keys if needed (new keys different from previous ones);
   * @param process The AuthenticationProcess previously provided in the startAuthentication service
   * @param validationCode The validation code the user received by email/mobile phone
   * @param getUserKeypair Lambda providing the user RSA Keypair. Get it from where you stored it previously or
   * generate a new one if user lost it (See AnonymousMedTechApi.generateRSAKeypair()).
   *
   * @return The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
   * user.
   */
  completeAuthentication(process: AuthenticationProcess, validationCode: string): Promise<AuthenticationResult>

  /**
   * Completes the authentication process of a user created from a Patient.
   * - It creates the private and public key for the user
   * - It creates a long-lived authentication token
   * - Send a Notification to all the delegated HCP to ask for access to the data of the Patient
   * @param userLogin The login of the user
   * @param shortLivedToken The short-lived authentication token created by the HCP
   * @param getUserKeypair Lambda providing the user RSA Keypair. Get it from where you stored it previously or
   * generate a new one if user lost it (See AnonymousMedTechApi.generateRSAKeypair()).
   *
   * @return The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
   * user.
   */
  authenticateAndAskAccessToItsExistingData(userLogin: string, shortLivedToken: string): Promise<AuthenticationResult>
}

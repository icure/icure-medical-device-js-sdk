import {AuthenticationProcess} from "../models/AuthenticationProcess";
import {AuthenticationResult} from "../models/AuthenticationResult";

/**
 * The AuthenticationApi interface provides methods to authenticate and register users.
 */
export interface AuthenticationApi {

  /**
   * Starts the authentication of a user by sending him/her a validation code by email and/or mobile phone.
   * Use this service if you would like to sign-up or login your user
   *
   * @param healthcareProfessionalId The id of the healthcare professional that wants to invite the user for its authentication.
   * Use the id of the hcp in charge of the database where you want to add this new user
   * @param firstName The firstname of the user to authenticate
   * @param lastName The lastname of the user to authenticate
   * @param email The email of the user to authenticate
   * @param recaptcha The recaptcha key used during authentication process
   * @param mobilePhone The mobile phone of the user to authenticate
   * @param bypassTokenCheck Prevent the token check during the validation process
   * @return The AuthenticationProcess information needed to complete the authentication in the completeAuthentication service
   */
  startAuthentication(
    healthcareProfessionalId: string | undefined,
    firstName: string,
    lastName: string,
    recaptcha: string,
    bypassTokenCheck?: boolean,
    email?: string,
    mobilePhone?: string
  ): Promise<AuthenticationProcess|null>

  /**
   * Completes the authentication process of a user, by verifying the provided validation code and :
   * - In the case of a sign-up, create the user data;
   * - In the case of a login, re-generate keys if needed (new keys different from previous ones);
   * @param process The AuthenticationProcess previously provided in the startAuthentication service
   * @param validationCode The validation code the user received by email/mobile phone
   * @param userKeyPair The key pair [private, public] that will be used by the user to encrypt/decrypt data;
   * @param tokenAndKeyPairProvider A custom function to generate an authentication token and a key pair for user
   *
   * @return The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
   * user.
   */
  completeAuthentication(
    process: AuthenticationProcess,
    validationCode: string,
    userKeyPair: [string, string] | undefined,
    tokenAndKeyPairProvider: (groupId: string, userId: string) => [string, [string, string]] | undefined
  ): Promise<AuthenticationResult|null>

  /**
   * Completes the authentication process of a user created from a Patient.
   * - It creates the private and public key for the user
   * - It creates a long-lived authentication token
   * - Send a Notification to all the delegated HCP to ask for access to the data of the Patient
   * @param userLogin The login of the user
   * @param shortLivedToken The short-lived authentication token created by the HCP
   * @param userKeyPair The key pair [private, public] that will be used by the user to encrypt/decrypt data;
   * @param tokenAndKeyPairProvider A custom function to generate an authentication token and a key pair for user
   *
   * @return The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
   * user.
   */
  authenticateAndAskAccessToItsExistingData(
    userLogin: string,
    shortLivedToken: string,
    userKeyPair: [string, string] | undefined,
    tokenAndKeyPairProvider: (groupId: string, userId: string) => [string, [string, string]] | undefined
  ): Promise<AuthenticationResult|null>
}

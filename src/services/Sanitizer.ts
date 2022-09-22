export interface Sanitizer {

  /**
   * Function that validates an email address.
   * The regex used to validate the email address follows RFC 5322.
   * @param email The email address to validate
   * @return The email address if it is valid, null otherwise
   */
  validateEmail(email: string): string | null;

  /**
   * Function that validates a mobile phone number.
   * The regex used to validate the mobile phone number follows E.164.
   * @param mobilePhone The mobile phone number to validate
   * @return The mobile phone number if it is valid, null otherwise
   */
  validateMobilePhone(mobilePhone: string): string | null;
}

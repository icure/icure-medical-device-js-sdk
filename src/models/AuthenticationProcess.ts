
export class AuthenticationProcess {
  constructor(json: { requestId: string; bypassTokenCheck: boolean; login: string }) {
    Object.assign(this as AuthenticationProcess, json)
  }

  /**
   * Id of this process used later for reference
   */
  'requestId': string;
  /**
   * Login information
   */
  'login': string;
  /**
   * Bypass Token Check
   */
  'bypassTokenCheck': boolean;
}

interface IAuthenticationProcess {
  'requestId'?: string;
  'bypassTokenCheck'?: boolean;
  'login'?: string;
}

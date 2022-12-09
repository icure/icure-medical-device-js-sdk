
export class AuthenticationProcess {
  constructor(json: IAuthenticationProcess) {
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

  marshal(): IAuthenticationProcess {
    return {
      ...this,
    }
  }
}

interface IAuthenticationProcess {
  'requestId'?: string;
  'bypassTokenCheck'?: boolean;
  'login'?: string;
}


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

}

interface IAuthenticationProcess {
  'requestId'?: string;
  'login'?: string;
}


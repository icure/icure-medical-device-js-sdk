import {AuthenticationProcess} from "../models/AuthenticationProcess";
import {AuthenticationResult} from "../models/AuthenticationResult";

export interface AuthenticationApi {
  startAuthentication(
    healthcareProfessionalId: string | undefined, firstName: string, lastName: string, email: string, recaptcha: string, mobilePhone?: string
  ): Promise<AuthenticationProcess|null>

  completeAuthentication(
    process: AuthenticationProcess, validationCode: string, patientKeyPair: [string, string] | undefined, tokenAndKeyPairProvider: (groupId: string, userId: string) => [string, [string, string]] | undefined
  ): Promise<AuthenticationResult|null>

}


import {EmailMessageFactory, SMSMessageFactory} from "../utils/gatewayMessageFactory";
import {XHR} from "@icure/api";

export interface MessageGatewayApi {

  sendEmail(emailFactory: EmailMessageFactory): void;

  sendSMS(smsFactory: SMSMessageFactory): void;

  startAuthenticationProcess(requestId: string, healthcareProfessionalId: string | undefined, firstName: string, lastName: string, email: string, recaptcha: string, mobilePhone?: string): Promise<XHR.Data | null>;

  validateAuthenticationProcess(requestId: string, validationCode: String): Promise<XHR.Data | null>;
}

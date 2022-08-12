import {EmailMessageFactory, SMSMessageFactory} from "../utils/gatewayMessageFactory";
import {XHR} from "@icure/api";

export interface MessageGatewayApi {

  sendEmail(recipientEmail: string, emailFactory: EmailMessageFactory): Promise<XHR.Data | null>;

  sendSMS(recipientMobileNumber: string, smsFactory: SMSMessageFactory): Promise<XHR.Data | null>;

  startAuthenticationProcess(requestId: string, healthcareProfessionalId: string | undefined, firstName: string, lastName: string, email: string, recaptcha: string, mobilePhone?: string): Promise<XHR.Data | null>;

  validateAuthenticationProcess(requestId: string, validationCode: String): Promise<XHR.Data | null>;
}

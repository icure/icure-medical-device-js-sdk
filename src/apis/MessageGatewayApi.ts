import {XHR} from "@icure/api";
import {EmailMessage, SMSMessage} from "../utils/gatewayMessageFactory";

export interface MessageGatewayApi {

  sendEmail(recipientEmail: string, email: EmailMessage): Promise<XHR.Data | null>;

  sendSMS(recipientMobileNumber: string, sms: SMSMessage): Promise<XHR.Data | null>;

  startAuthenticationProcess(requestId: string, healthcareProfessionalId: string | undefined, firstName: string, lastName: string, email: string, recaptcha: string, mobilePhone?: string): Promise<XHR.Data | null>;

  validateAuthenticationProcess(requestId: string, validationCode: String): Promise<XHR.Data | null>;
}

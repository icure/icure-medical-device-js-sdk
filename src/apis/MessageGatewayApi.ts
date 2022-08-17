import {XHR} from "@icure/api";
import {AuthenticationProcessBody, EmailMessage, SMSMessage} from "../utils/messageGatewayUtils";

export interface MessageGatewayApi {

  sendEmail(recipientEmail: string, email: EmailMessage): Promise<XHR.Data | null>;

  sendSMS(recipientMobileNumber: string, sms: SMSMessage): Promise<XHR.Data | null>;

  startProcess(requestId: string, processBody: AuthenticationProcessBody): Promise<XHR.Data | null>;

  validateProcess(requestId: string, validationCode: string): Promise<XHR.Data | null>;
}

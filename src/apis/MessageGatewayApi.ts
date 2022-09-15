import {XHR} from "@icure/api";
import {AuthenticationProcessBody, EmailMessage, SMSMessage} from "../utils/msgGtwMessageFactory";

export interface MessageGatewayApi {

  sendEmail(recipientEmail: string, email: EmailMessage): Promise<XHR.Data | null>;

  sendSMS(recipientMobileNumber: string, sms: SMSMessage): Promise<XHR.Data | null>;

  startProcess(processId: string, requestId: string, processBody: AuthenticationProcessBody): Promise<XHR.Data | null>;

  validateProcess(requestId: string, validationCode: string): Promise<XHR.Data | null>;
}

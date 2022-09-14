import {AuthenticationProcessBody, EmailMessage, SMSMessage} from "../utils/messageGatewayUtils";

export interface MessageGatewayApi {

  sendEmail(recipientEmail: string, email: EmailMessage): Promise<boolean>;

  sendSMS(recipientMobileNumber: string, sms: SMSMessage): Promise<boolean>;

  startProcess(processId: string, processBody: AuthenticationProcessBody): Promise<string>;

  validateProcess(requestId: string, validationCode: string): Promise<boolean>;
}

import {MessageGatewayApi} from "../MessageGatewayApi";
import {AuthenticationProcessBody, EmailMessage, SMSMessage} from "../../utils/messageGatewayUtils";
import {XHR} from "@icure/api";
import Header = XHR.Header;

export class MessageGatewayApiImpl implements MessageGatewayApi {

  constructor(
    msgGtwUrl: string,
    specId: string,
    username?: string,
    password?: string,
    fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
      ? window.fetch
      : typeof self !== 'undefined'
        ? self.fetch
        : fetch
  ) {
    this.fetchImpl = fetchImpl;
    this.msgGtwUrl = msgGtwUrl;
    this.specId = specId;
    this.authHeader = (!!username && !!password) ? new Header(
      "Authorization",
      "Basic "+Buffer.from(`${username}:${password}`).toString('base64')
    ) : null;
    this.headers = [new Header("Content-Type", "application/json")]
  }

  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  private readonly msgGtwUrl: string;
  private readonly specId: string;
  private readonly authHeader: XHR.Header | null;
  private readonly headers: Header[];

  async sendEmail(recipientEmail: string, email: EmailMessage): Promise<XHR.Data | null> {
    if (!this.authHeader) return null;
    const res = await XHR.sendCommand('POST',
      `${this.msgGtwUrl}/${this.specId}/email/to/${recipientEmail}`,
      this.headers.concat([this.authHeader]),
      email,
      this.fetchImpl
    );

    if (res.statusCode < 400) return res;
    else throw new Error(`Message Gateway returned error response ${res.statusCode}`);
  }

  async sendSMS(recipientMobileNumber: string, sms: SMSMessage): Promise<XHR.Data | null> {
    if (!this.authHeader) return null;
    const res = await XHR.sendCommand('POST',
      `${this.msgGtwUrl}/${this.specId}/sms/to/${recipientMobileNumber}`,
      this.headers.concat([this.authHeader]),
      sms,
      this.fetchImpl
    );

    if (res.statusCode < 400) return res;
    else throw new Error(`Message Gateway returned error response ${res.statusCode}`);
  }

  async startProcess(processId: string, requestId: string, processBody: AuthenticationProcessBody): Promise<XHR.Data | null> {
    const res = await XHR.sendCommand('POST',
      `${this.msgGtwUrl}/${this.specId}/process/${processId}/${requestId}`,
      this.headers,
      processBody,
      this.fetchImpl,
      "text/plain"
    )

    if (res.statusCode < 400) return res;
    else throw new Error(`Message Gateway returned error response ${res.statusCode}`);
  }

  async validateProcess(requestId: string, validationCode: string): Promise<XHR.Data | null> {
    const res = await XHR.sendCommand('GET',
      `${this.msgGtwUrl}/${this.specId}/process/validate/${requestId}-${validationCode}`,
      [],
      undefined,
      this.fetchImpl
    )

    if (res.statusCode < 400) return res;
    else throw new Error(`Message Gateway returned error response ${res.statusCode}`);
  }

}
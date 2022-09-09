import {MessageGatewayApi} from "../MessageGatewayApi";
import {AuthenticationProcessBody, EmailMessage, SMSMessage} from "../../utils/messageGatewayUtils";
import {XHR} from "@icure/api";
import Header = XHR.Header;

export class MessageGatewayApiImpl implements MessageGatewayApi {

  constructor(
    authServerUrl: string,
    authProcessId?: string,
    username?: string,
    password?: string,
    fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
      ? window.fetch
      : typeof self !== 'undefined'
        ? self.fetch
        : fetch
  ) {
    this.fetchImpl = fetchImpl;
    this.authProcessId = authProcessId;
    this.authServerUrl = authServerUrl;
    this.authHeader = (!!username && !!password) ? new Header(
      "Authorization",
      "Basic "+Buffer.from(`${username}:${password}`).toString('base64')
    ) : null;
    this.headers = [new Header("Content-Type", "application/json")]
  }

  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  private readonly authProcessId: string | undefined;
  private readonly authServerUrl: string;
  private readonly authHeader: XHR.Header | null;
  private readonly headers: Header[];

  async sendEmail(recipientEmail: string, email: EmailMessage): Promise<XHR.Data | null> {
    if (!this.authHeader) return null;
    const res = await XHR.sendCommand('POST',
      `${this.authServerUrl}/email/to/${recipientEmail}`,
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
      `${this.authServerUrl}/sms/to/${recipientMobileNumber}`,
      this.headers.concat([this.authHeader]),
      sms,
      this.fetchImpl
    );

    if (res.statusCode < 400) return res;
    else throw new Error(`Message Gateway returned error response ${res.statusCode}`);
  }

  async startProcess(requestId: string, processBody: AuthenticationProcessBody): Promise<XHR.Data | null> {
    if (!this.authProcessId) return null;
    const res = await XHR.sendCommand('POST',
      `${this.authServerUrl}/process/${this.authProcessId}/${requestId}`,
      this.headers,
      processBody,
      this.fetchImpl,
      "text/plain"
    )

    if (res.statusCode < 400) return res;
    else throw new Error(`Message Gateway returned error response ${res.statusCode}`);
  }

  async validateProcess(requestId: string, validationCode: string): Promise<XHR.Data | null> {
    if (!this.authProcessId) return null;
    const res = await XHR.sendCommand('GET',
      `${this.authServerUrl}/process/validate/${requestId}-${validationCode}`,
      [],
      undefined,
      this.fetchImpl
    )

    if (res.statusCode < 400) return res;
    else throw new Error(`Message Gateway returned error response ${res.statusCode}`);
  }

}

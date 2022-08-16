import {MessageGatewayApi} from "../MessageGatewayApi";
import {EmailMessage, SMSMessage} from "../../utils/gatewayMessageFactory";
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

  async sendEmail(recipientEmail: string, email: EmailMessage, anonymous: boolean): Promise<XHR.Data | null> {
    if (!this.authHeader && !anonymous) return null;
    const headers = anonymous ? this.headers : this.headers.concat([this.authHeader!])
    const res = await XHR.sendCommand('POST',
      `${this.authServerUrl}/email/to/${recipientEmail}`,
      headers,
      email,
      this.fetchImpl
    );

    return res.statusCode < 400 ? res : null;
  }

  async sendSMS(recipientMobileNumber: string, sms: SMSMessage, anonymous: boolean): Promise<XHR.Data | null> {
    if (!this.authHeader && !anonymous) return null;
    const headers = anonymous ? this.headers : this.headers.concat([this.authHeader!])
    const res = await XHR.sendCommand('POST',
      `${this.authServerUrl}/email/to/${recipientMobileNumber}`,
      headers,
      sms,
      this.fetchImpl
    );

    return res.statusCode < 400 ? res : null;
  }

  async startAuthenticationProcess(requestId: string, healthcareProfessionalId: string | undefined, firstName: string, lastName: string, email: string, recaptcha: string, mobilePhone?: string): Promise<XHR.Data | null> {
    if (!this.authProcessId) return null;
    const res = await XHR.sendCommand('POST',
      `${this.authServerUrl}/process/${this.authProcessId}/${requestId}`,
      this.headers,
      {
        'g-recaptcha-response': recaptcha,
        'firstName': firstName,
        'lastName': lastName,
        'from': email,
        'mobilePhone': mobilePhone,
        'hcpId': healthcareProfessionalId
      },
      this.fetchImpl,
      "text/plain"
    )

    return res.statusCode < 400 ? res : null;
  }

  async validateAuthenticationProcess(requestId: string, validationCode: String): Promise<XHR.Data | null> {
    if (!this.authProcessId) return null;
    const res = await XHR.sendCommand('GET',
      `${this.authServerUrl}/process/validate/${requestId}-${validationCode}`,
      [],
      undefined,
      this.fetchImpl
    )

    return res.statusCode < 400 ? res : null;

  }

}

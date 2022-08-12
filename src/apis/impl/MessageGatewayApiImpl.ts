import {MessageGatewayApi} from "../MessageGatewayApi";
import {EmailMessage, SMSMessage} from "../../utils/gatewayMessageFactory";
import {XHR} from "@icure/api";
import Header = XHR.Header;

export class MessageGatewayApiImpl implements MessageGatewayApi {

  constructor(
    authProcessId: string,
    authServerUrl: string,
    username: string,
    password: string,
    fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
      ? window.fetch
      : typeof self !== 'undefined'
        ? self.fetch
        : fetch
  ) {
    this.fetchImpl = fetchImpl;
    this.authProcessId = authProcessId;
    this.authServerUrl = authServerUrl;
    this.authHeader = new Header(
      "Authorization",
      Buffer.from(`${username}:${password}`).toString('base64')
    )
  }

  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  private readonly authProcessId: string;
  private readonly authServerUrl: string;
  private readonly authHeader: XHR.Header;

  async sendEmail(recipientEmail: string, email: EmailMessage): Promise<XHR.Data | null> {
    const res = await XHR.sendCommand('POST',
      `${this.authServerUrl}/ic/email/to/${recipientEmail}`,
      [
        this.authHeader
      ],
      email,
      this.fetchImpl
    );

    return res.statusCode < 400 ? res : null;
  }

  async sendSMS(recipientMobileNumber: string, sms: SMSMessage): Promise<XHR.Data | null> {

    const res = await XHR.sendCommand('POST',
      `${this.authServerUrl}/ic/email/to/${recipientMobileNumber}`,
      [
        this.authHeader
      ],
      sms,
      this.fetchImpl
    );

    return res.statusCode < 400 ? res : null;
  }

  async startAuthenticationProcess(requestId: string, healthcareProfessionalId: string | undefined, firstName: string, lastName: string, email: string, recaptcha: string, mobilePhone?: string): Promise<XHR.Data | null> {
    const res = await XHR.sendCommand('POST',
      `${this.authServerUrl}/process/${this.authProcessId}/${requestId}`,
      [new Header('Content-type', 'application/json')],
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
    const res = await XHR.sendCommand('GET',
      `${this.authServerUrl}/process/validate/${requestId}-${validationCode}`,
      [],
      undefined,
      this.fetchImpl
    )

    return res.statusCode < 400 ? res : null;

  }

}

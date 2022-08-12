import {MessageGatewayApi} from "../MessageGatewayApi";
import {EmailMessageFactory, SMSMessageFactory} from "../../utils/gatewayMessageFactory";
import {XHR} from "@icure/api";
import Header = XHR.Header;

export class MessageGatewayApiImpl implements MessageGatewayApi {

  constructor(
    authProcessId: string,
    authServerUrl: string,
    fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
      ? window.fetch
      : typeof self !== 'undefined'
        ? self.fetch
        : fetch
  ) {
    this.fetchImpl = fetchImpl;
    this.authProcessId = authProcessId;
    this.authServerUrl = authServerUrl;
  }

  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  private readonly authProcessId: string;
  private readonly authServerUrl: string;

  sendEmail(emailFactory: EmailMessageFactory): void {
  }

  sendSMS(smsFactory: SMSMessageFactory): void {
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
      "text/plain")

    return res.statusCode < 400 ? res : null;
  }

  async validateAuthenticationProcess(requestId: string, validationCode: String): Promise<XHR.Data | null> {
    const res = await XHR.sendCommand('GET',
      `${this.authServerUrl}/process/validate/${requestId}-${validationCode}`,
      [],
      undefined,
      this.fetchImpl)

    return res.statusCode < 400 ? res : null;

  }

}

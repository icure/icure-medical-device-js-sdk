import {MessageGatewayApi} from "../MessageGatewayApi";
import {AuthenticationProcessBody, EmailMessage, SMSMessage} from "../../utils/msgGtwMessageFactory";
import {XHR} from "@icure/api";
import {v4 as uuid} from "uuid";
import {ErrorHandler} from "../../services/ErrorHandler";
import {Sanitizer} from "../../services/Sanitizer";
import Header = XHR.Header;

export class MessageGatewayApiImpl implements MessageGatewayApi {


  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  private readonly msgGtwUrl: string;
  private readonly specId: string;
  private readonly authHeader: XHR.Header | null;
  private readonly headers: Header[];
  private readonly errorHandler: ErrorHandler;
  private readonly sanitizer: Sanitizer;

  constructor(
    msgGtwUrl: string,
    specId: string,
    errorHandler: ErrorHandler,
    sanitizer: Sanitizer,
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
      "Basic " + Buffer.from(`${username}:${password}`).toString('base64')
    ) : null;
    this.headers = [new Header("Content-Type", "application/json")];
    this.errorHandler = errorHandler;
    this.sanitizer = sanitizer;
  }

  async sendEmail(recipientEmail: string, email: EmailMessage): Promise<boolean> {
    if (!this.authHeader) return false;

    const emailTo = this.sanitizer.validateEmail(recipientEmail)

    if (!emailTo) {
      throw this.errorHandler.createErrorWithMessage(`Invalid email address ${recipientEmail}`)
    }

    const res = await XHR.sendCommand('POST',
      `${this.msgGtwUrl}/${this.specId}/email/to/${emailTo}`,
      this.headers.concat([this.authHeader]),
      email,
      this.fetchImpl
    ).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    });

    if (res.statusCode < 400) {
      return true;
    } else {
      throw this.errorHandler.createErrorWithMessage(`Message Gateway returned error response ${res.statusCode}`)
    }
  }

  async sendSMS(recipientMobileNumber: string, sms: SMSMessage): Promise<boolean> {
    if (!this.authHeader) return false;

    const mobileNumber = this.sanitizer.validateMobilePhone(recipientMobileNumber)

    if (!mobileNumber) {
      throw this.errorHandler.createErrorWithMessage(`Invalid mobile number ${recipientMobileNumber}`)
    }

    const res = await XHR.sendCommand('POST',
      `${this.msgGtwUrl}/${this.specId}/sms/to/${mobileNumber}`,
      this.headers.concat([this.authHeader]),
      sms,
      this.fetchImpl
    ).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    });

    if (res.statusCode < 400) {
      return true;
    } else {
      throw this.errorHandler.createErrorWithMessage(`Message Gateway returned error response ${res.statusCode}`)
    }
  }

  async startProcess(processId: string, processBody: AuthenticationProcessBody): Promise<string> {
    const requestId = uuid()

    const res = await XHR.sendCommand('POST',
      `${this.msgGtwUrl}/${this.specId}/process/${processId}/${requestId}`,
      this.headers,
      processBody,
      this.fetchImpl,
      "text/plain"
    ).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    if (res.statusCode < 400) {
      return requestId;
    } else {
      throw this.errorHandler.createErrorWithMessage(`Message Gateway returned error response ${res.statusCode}`)
    }
  }

  async validateProcess(requestId: string, validationCode: string): Promise<boolean> {
    const res = await XHR.sendCommand('GET',
      `${this.msgGtwUrl}/${this.specId}/process/validate/${requestId}-${validationCode}`,
      [],
      undefined,
      this.fetchImpl
    ).catch(reason => {
      throw this.errorHandler.createError(reason)
    })

    if (res.statusCode < 400) {
      return true;
    } else {
      throw this.errorHandler.createErrorWithMessage(`Message Gateway returned error response ${res.statusCode}`)
    }
  }

}

import {XHR} from "@icure/api";
import XHRError = XHR.XHRError;

class ErrorHandlerImpl extends ErrorHandler {
  public createError(error: Error): Error {
    switch (error.constructor) {
      case XHRError:
        return this.handleXHRError(error as XHRError);
      default:
        return error;
    }
  }

  private handleXHRError(xhrError: XHR.XHRError, message?: string): Error {
    return new Error(
      `
      ${xhrError.statusCode} - ${message ?? xhrError.message}\

      X-Request-Id: ${xhrError.headers.get("X-Request-Id")}\
      URL: ${xhrError.url}
      `
    );
  }
}

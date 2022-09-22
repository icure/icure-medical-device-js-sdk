export abstract class ErrorHandler {
  public createErrorWithMessage(message: string): Error {
    return this.createError(Error(message));
  }

  public createError(error: Error): Error {
    return error;
  }

  public createErrorFromAny(reason: any): Error {
    if (reason instanceof Error) {
      return this.createError(reason);
    }
    if (typeof reason === 'string') {
      return this.createErrorWithMessage(reason);
    }
    throw reason
  }
}

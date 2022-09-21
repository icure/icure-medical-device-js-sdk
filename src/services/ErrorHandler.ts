abstract class ErrorHandler {
  public createErrorWithMessage(message: string): Error {
    return this.createError(Error(message));
  }

  public createError(error: Error): Error {
    return error;
  }
}

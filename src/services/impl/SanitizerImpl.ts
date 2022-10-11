import { Sanitizer } from '../Sanitizer'
import { ErrorHandler } from '../ErrorHandler'

export class SanitizerImpl implements Sanitizer {
  private readonly errorHandler: ErrorHandler

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler
  }

  validateEmail(email?: string): string {
    const regex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (email?.match(regex)) {
      return email
    }
    throw this.errorHandler.createErrorWithMessage(
      'Invalid email address. Provided email must satisfy the format RFC5322 : local-part@domain.extension'
    )
  }

  validateMobilePhone(mobilePhone?: string): string {
    const regex = /^\+[1-9][0-9]{3,14}$/
    if (mobilePhone?.match(regex)) {
      return mobilePhone
    }
    throw this.errorHandler.createErrorWithMessage('Invalid phone number. Provided mobile phone must satisfy the following format : +XXXXXXXXX')
  }
}

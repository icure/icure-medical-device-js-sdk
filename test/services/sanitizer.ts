import 'mocha';
import {expect} from "chai";
import {SanitizerImpl} from "../../src/services/impl/SanitizerImpl";
import {ErrorHandlerImpl} from "../../src/services/impl/ErrorHandlerImpl";

describe('Sanitizer', () => {
  const sanitizer = new SanitizerImpl(new ErrorHandlerImpl());

  it('should validate email', () => {
    expect(sanitizer.validateEmail('test@icure.com'), 'Email should be valid').to.eq('test@icure.com')
    expect(sanitizer.validateEmail('test+123@icure.com'), 'Email should be valid').to.eq('test+123@icure.com')
    expect(sanitizer.validateEmail('Test@icure.com'), 'Email with caps should be valid, email is case insensitive').to.eq('Test@icure.com')
    expect(() => sanitizer.validateEmail('johnwick')).to.throw("Invalid email address. Provided email must satisfy the format RFC5322 : local-part@domain.extension", 'Email without @ and provider should be invalid');
    expect(() => sanitizer.validateEmail('johnwick@')).to.throw("Invalid email address. Provided email must satisfy the format RFC5322 : local-part@domain.extension", 'Email without provider should be invalid');
    expect(() => sanitizer.validateEmail('johnwick@thecontinental')).to.throw("Invalid email address. Provided email must satisfy the format RFC5322 : local-part@domain.extension", 'Email without [.xxx] should be invalid');
    expect(() => sanitizer.validateEmail('johnwick@thecontinental.')).to.throw("Invalid email address. Provided email must satisfy the format RFC5322 : local-part@domain.extension", 'Email without .[xxx] should be invalid');
  });
  it('should validate mobile phone', () => {
    expect(sanitizer.validateMobilePhone('+32470123456'), 'Mobile phone with national identifier should be valid').to.eq('+32470123456')
    expect(sanitizer.validateMobilePhone('+324701234567890'), 'Mobile phone with national identifier and up to 15 digits should be valid').to.eq('+324701234567890')
    expect(() => sanitizer.validateMobilePhone('0470123456')).to.throw("Invalid phone number. Provided mobile phone must satisfy the following format : +XXXXXXXXX", 'Mobile phone with national identifier should be valid');
    expect(() => sanitizer.validateMobilePhone('+3247012345678901')).to.throw("Invalid phone number. Provided mobile phone must satisfy the following format : +XXXXXXXXX", 'Mobile phone with national identifier and more than 15 digits should be invalid');
    expect(() => sanitizer.validateMobilePhone('+32470123456789a')).to.throw("Invalid phone number. Provided mobile phone must satisfy the following format : +XXXXXXXXX", 'Mobile phone with national identifier and non numeric characters should be invalid');
  });
});

import 'mocha';
import {expect} from "chai";
import {SanitizerImpl} from "../../src/services/impl/SanitizerImpl";
import {ErrorHandlerImpl} from "../../src/services/impl/ErrorHandlerImpl";

describe('Sanitizer', () => {
  const sanitizer = new SanitizerImpl(new ErrorHandlerImpl());

  it('should validate email', () => {
    expect(sanitizer.validateEmail('test@icure.com')).to.not.throw(undefined, 'Email should be valid');
    expect(sanitizer.validateEmail('test+123@icure.com')).to.not.throw(undefined, 'Email should be valid');
    expect(sanitizer.validateEmail('Test@icure.com')).to.not.throw(undefined, 'Email with caps should be valid, email is case insensitive');
    expect(sanitizer.validateEmail('johnwick')).to.throw(undefined, 'Email without @ and provider should be invalid');
    expect(sanitizer.validateEmail('johnwick@')).to.throw(undefined, 'Email without provider should be invalid');
    expect(sanitizer.validateEmail('johnwick@thecontinental')).to.throw(undefined, 'Email without [.xxx] should be invalid');
    expect(sanitizer.validateEmail('johnwick@thecontinental.')).to.throw(undefined, 'Email without .[xxx] should be invalid');
  });
  it('should validate mobile phone', () => {
    expect(sanitizer.validateMobilePhone('0470123456')).to.throw(undefined, 'Mobile phone with national identifier should be valid');
    expect(sanitizer.validateMobilePhone('+32470123456')).to.not.throw(undefined, 'Mobile phone with national identifier should be valid');
    expect(sanitizer.validateMobilePhone('+32470123456')).to.not.throw(undefined, 'Mobile phone with national identifier should be valid');
    expect(sanitizer.validateMobilePhone('+324701234567890')).to.not.throw(undefined, 'Mobile phone with national identifier and up to 15 digits should be valid');
    expect(sanitizer.validateMobilePhone('+3247012345678901')).to.throw(undefined, 'Mobile phone with national identifier and more than 15 digits should be invalid');
    expect(sanitizer.validateMobilePhone('+32470123456789a')).to.throw(undefined, 'Mobile phone with national identifier and non numeric characters should be invalid');
  });
});

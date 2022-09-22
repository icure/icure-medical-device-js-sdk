import 'mocha';
import {assert} from "chai";
import {SanitizerImpl} from "../../src/services/impl/SanitizerImpl";

describe('Sanitizer', () => {
  const sanitizer = new SanitizerImpl();

  it('should validate email', () => {
    assert(sanitizer.validateEmail('test@icure.com') != null, 'Email should be valid');
    assert(sanitizer.validateEmail('test+123@icure.com') != null, 'Email should be valid');
    assert(sanitizer.validateEmail('Test@icure.com') != null, 'Email with caps should be valid, email is case insensitive');
    assert(sanitizer.validateEmail('johnwick') == null, 'Email without @ and provider should be invalid');
    assert(sanitizer.validateEmail('johnwick@') == null, 'Email without provider should be invalid');
    assert(sanitizer.validateEmail('johnwick@thecontinental') == null, 'Email without [.xxx] should be invalid');
    assert(sanitizer.validateEmail('johnwick@thecontinental.') == null, 'Email without .[xxx] should be invalid');
  });
  it('should validate mobile phone', () => {
    assert(sanitizer.validateMobilePhone('0470123456') == null, 'Mobile phone without national identifier should be invalid');
    assert(sanitizer.validateMobilePhone('+32470123456') != null, 'Mobile phone with national identifier should be valid');
    assert(sanitizer.validateMobilePhone('+324701234567890') != null, 'Mobile phone with national identifier and up to 15 digits should be valid');
    assert(sanitizer.validateMobilePhone('+3247012345678901') == null, 'Mobile phone with national identifier and more than 15 digits should be invalid');
    assert(sanitizer.validateMobilePhone('+32470123456789a') == null, 'Mobile phone with national identifier and non numeric characters should be invalid');
  });
});

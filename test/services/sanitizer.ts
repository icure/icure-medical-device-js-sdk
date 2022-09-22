import 'mocha';
import {assert} from "chai";
import {SanitizerImpl} from "../../src/services/impl/SanitizerImpl";

describe('Sanitizer', () => {
  const sanitizer = new SanitizerImpl();

  it('should validate email', () => {
    assert(sanitizer.validateEmail('test@icure.com') != null);
    assert(sanitizer.validateEmail('test+123@icure.com') != null);
    assert(sanitizer.validateEmail('Test@icure.com') == null);
    assert(sanitizer.validateEmail('johnwick') == null);
  });
  it('should validate mobile phone', () => {
    assert(sanitizer.validateMobilePhone('0470123456') == null);
    assert(sanitizer.validateMobilePhone('+32470123456') != null);
  });
});

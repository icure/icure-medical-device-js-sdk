import 'mocha';

import {AuthenticationProcess} from '../../src/models/AuthenticationProcess';
import {assert} from "chai";

function newAuthenticationProcess(): AuthenticationProcess {
  return new AuthenticationProcess({
    requestId: "requestId",
    bypassTokenCheck: true,
    login: "login",
  });
}

describe('AuthenticationProcess model test', () => {
  it('Marshalling/Unmarshalling of AuthenticationProcess model - Success', () => {
    const address = newAuthenticationProcess()
    const marshalledAuthenticationProcess = address.marshal()
    const unmarshalledAuthenticationProcess = new AuthenticationProcess(marshalledAuthenticationProcess)
    assert.deepEqual(address, unmarshalledAuthenticationProcess)
  });
});

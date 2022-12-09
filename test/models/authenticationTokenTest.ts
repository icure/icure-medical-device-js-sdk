import 'mocha';

import {AuthenticationToken} from '../../src/models/AuthenticationToken';
import {assert} from "chai";

export function newAuthenticationToken(): AuthenticationToken {
  return new AuthenticationToken({
    token: "token",
    creationTime: 123,
    validity: 456,
  });
}

describe('AuthenticationToken model test', () => {
  it('Marshalling/Unmarshalling of AuthenticationToken model - Success', () => {
    const address = newAuthenticationToken()
    const marshalledAuthenticationToken = address.marshal()
    const unmarshalledAuthenticationToken = new AuthenticationToken(marshalledAuthenticationToken)
    assert.deepEqual(address, unmarshalledAuthenticationToken)
  });
});

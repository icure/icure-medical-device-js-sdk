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
    const authenticationToken = newAuthenticationToken()
    const marshalledAuthenticationToken = authenticationToken.marshal()
    const unmarshalledAuthenticationToken = new AuthenticationToken(JSON.parse(JSON.stringify(marshalledAuthenticationToken)))
    assert.deepEqual(authenticationToken, unmarshalledAuthenticationToken)
    assert.deepEqual(authenticationToken, new AuthenticationToken(authenticationToken))
  });
});

import 'mocha';

import {assert} from "chai";
import {AuthenticationTokenMapper} from "../../src/mappers/authenticationToken";
import {newAuthenticationToken} from "../models/authenticationTokenTest";

describe('AuthenticationToken mapper test', () => {
  it('Mapping/Unmapping of AuthenticationToken model - Success', () => {
    const authenticationToken = newAuthenticationToken()
    const mappedAuthenticationToken = AuthenticationTokenMapper.toAuthenticationTokenDto(authenticationToken)
    assert.deepEqual(AuthenticationTokenMapper.toAuthenticationToken(mappedAuthenticationToken), authenticationToken)
  });
});


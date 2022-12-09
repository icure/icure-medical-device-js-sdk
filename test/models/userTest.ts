import 'mocha';

import {User} from '../../src/models/User';
import {assert} from "chai";
import {newProperty} from "./propertyTest";
import {newAuthenticationToken} from "./authenticationTokenTest";

export function newUser(): User {
  return new User({
    id: "id",
    rev: "rev",
    deletionDate: 123,
    created: 456,
    name: "name",
    properties: new Set([newProperty()]),
    roles: new Set(["roles"]),
    login: "login",
    passwordHash: "passwordHash",
    secret: "secret",
    use2fa: true,
    groupId: "groupId",
    healthcarePartyId: "healthcarePartyId",
    patientId: "patientId",
    deviceId: "deviceId",
    sharingDataWith: { all: new Set(["sharingDataWith"]) },
    email: "email",
    mobilePhone: "mobilePhone",
    authenticationTokens: {"key":newAuthenticationToken()},
  });
}

describe('User model test', () => {
  it('Marshalling/Unmarshalling of User model - Success', () => {
    const address = newUser()
    const marshalledUser = address.marshal()
    const unmarshalledUser = new User(marshalledUser)
    assert.deepEqual(address, unmarshalledUser)
  });
});

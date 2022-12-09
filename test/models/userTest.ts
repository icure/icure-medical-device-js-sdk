import 'mocha';

import {v4 as uuid} from 'uuid';
import {User} from '../../src/models/User';
import {assert} from "chai";
import {newProperty} from "./propertyTest";
import {newAuthenticationToken} from "./authenticationTokenTest";

export function newUser(): User {
  return new User({
    id: uuid(),
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
    const user = newUser()
    const marshalledUser = user.marshal()
    const unmarshalledUser = new User(JSON.parse(JSON.stringify(marshalledUser)))
    assert.deepEqual(unmarshalledUser, user)
    assert.deepEqual(new User(user), user)
  });
});

import 'mocha';

import {Delegation} from '../../src/models/Delegation';
import {assert} from "chai";

export function newDelegation(): Delegation {
  return new Delegation({
    tags: ["tags"],
    owner: "owner",
    delegatedTo: "delegatedTo",
    key: "key",
  });
}

describe('Delegation model test', () => {
  it('Marshalling/Unmarshalling of Delegation model - Success', () => {
    const address = newDelegation()
    const marshalledDelegation = address.marshal()
    const unmarshalledDelegation = new Delegation(marshalledDelegation)
    assert.deepEqual(address, unmarshalledDelegation)
  });
});

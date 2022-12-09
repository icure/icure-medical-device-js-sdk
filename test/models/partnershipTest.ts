import 'mocha';

import {Partnership} from '../../src/models/Partnership';
import {assert} from "chai";

export function newPartnership(): Partnership {
  return new Partnership({
    type: "primary_contact",
    status: "active",
    partnerId: "partnerId",
  });
}

describe('Partnership model test', () => {
  it('Marshalling/Unmarshalling of Partnership model - Success', () => {
    const address = newPartnership()
    const marshalledPartnership = address.marshal()
    const unmarshalledPartnership = new Partnership(marshalledPartnership)
    assert.deepEqual(address, unmarshalledPartnership)
  });
});

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
    const partnership = newPartnership()
    const marshalledPartnership = partnership.marshal()
    const unmarshalledPartnership = new Partnership(JSON.parse(JSON.stringify(marshalledPartnership)))
    assert.deepEqual(partnership, unmarshalledPartnership)
    assert.deepEqual(partnership, new Partnership(partnership))
  });
});

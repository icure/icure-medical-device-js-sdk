import 'mocha';

import {Telecom} from '../../src/models/Telecom';
import {assert} from "chai";

export function newTelecom(): Telecom {
  return new Telecom({
    telecomType: "mobile",
    telecomNumber: "telecomNumber",
    telecomDescription: "telecomDescription",
  });
}

describe('Telecom model test', () => {
  it('Marshalling/Unmarshalling of Telecom model - Success', () => {
    const address = newTelecom()
    const marshalledTelecom = address.marshal()
    const unmarshalledTelecom = new Telecom(marshalledTelecom)
    assert.deepEqual(address, unmarshalledTelecom)
  });
});

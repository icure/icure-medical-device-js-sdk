import 'mocha';

import {CodingReference} from '../../src/models/CodingReference';
import {assert} from "chai";

export function newCodingReference(): CodingReference {
  return new CodingReference({
    id: "id",
    type: "type",
    code: "code",
    version: "version",
  });
}

describe('CodingReference model test', () => {
  it('Marshalling/Unmarshalling of CodingReference model - Success', () => {
    const address = newCodingReference()
    const marshalledCodingReference = address.marshal()
    const unmarshalledCodingReference = new CodingReference(marshalledCodingReference)
    assert.deepEqual(address, unmarshalledCodingReference)
  });
});

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
    const codingReference = newCodingReference()
    const marshalledCodingReference = codingReference.marshal()
    const unmarshalledCodingReference = new CodingReference(JSON.parse(JSON.stringify(marshalledCodingReference)))
    assert.deepEqual(codingReference, unmarshalledCodingReference)
    assert.deepEqual(codingReference, new CodingReference(codingReference))
  });
});

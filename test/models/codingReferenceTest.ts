import 'mocha';

import {v4 as uuid} from 'uuid';
import {CodingReference} from '../../src/models/CodingReference';
import {assert} from "chai";

export function newCodingReference(): CodingReference {
  return new CodingReference({
    id: uuid(),
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
    assert.deepEqual(unmarshalledCodingReference, codingReference)
    assert.deepEqual(new CodingReference(codingReference), codingReference)
  });
});

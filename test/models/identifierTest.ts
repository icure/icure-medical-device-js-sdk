import 'mocha';

import {v4 as uuid} from 'uuid';
import {Identifier} from '../../src/models/Identifier';
import {assert} from "chai";
import {newCodingReference} from "./codingReferenceTest";

export function newIdentifier(): Identifier {
  return new Identifier({
    id: uuid(),
    assigner: "assigner",
    start: "start",
    end: "end",
    system: "system",
    type: newCodingReference(),
    use: "use",
    value: "value",
  });
}

describe('Identifier model test', () => {
  it('Marshalling/Unmarshalling of Identifier model - Success', () => {
    const identifier = newIdentifier()
    const marshalledIdentifier = identifier.marshal()
    const unmarshalledIdentifier = new Identifier(JSON.parse(JSON.stringify(marshalledIdentifier)))
    assert.deepEqual(unmarshalledIdentifier, identifier)
    assert.deepEqual(new Identifier(identifier), identifier)
  });
});

import 'mocha';

import {PersonName} from '../../src/models/PersonName';
import {assert} from "chai";

export function newPersonName(): PersonName {
  return new PersonName({
    lastName: "lastName",
    firstNames: ["firstNames"],
    start: 123,
    end: 456,
    prefix: ["prefix"],
    suffix: ["suffix"],
    text: "text",
    use: "official",
  });
}

describe('PersonName model test', () => {
  it('Marshalling/Unmarshalling of PersonName model - Success', () => {
    const personName = newPersonName()
    const marshalledPersonName = personName.marshal()
    const unmarshalledPersonName = new PersonName(JSON.parse(JSON.stringify(marshalledPersonName)))
    assert.deepEqual(personName, unmarshalledPersonName)
    assert.deepEqual(personName, new PersonName(personName))
  });
});

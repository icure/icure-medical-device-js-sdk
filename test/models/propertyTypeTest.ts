import 'mocha';

import {PropertyType} from '../../src/models/PropertyType';
import {assert} from "chai";

export function newPropertyType(): PropertyType {
  return new PropertyType({
    identifier: "identifier",
    type: "STRING",
  });
}

describe('PropertyType model test', () => {
  it('Marshalling/Unmarshalling of PropertyType model - Success', () => {
    const address = newPropertyType()
    const marshalledPropertyType = address.marshal()
    const unmarshalledPropertyType = new PropertyType(marshalledPropertyType)
    assert.deepEqual(address, unmarshalledPropertyType)
  });
});

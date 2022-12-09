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
    const propertyType = newPropertyType()
    const marshalledPropertyType = propertyType.marshal()
    const unmarshalledPropertyType = new PropertyType(JSON.parse(JSON.stringify(marshalledPropertyType)))
    assert.deepEqual(propertyType, unmarshalledPropertyType)
    assert.deepEqual(propertyType, new PropertyType(propertyType))
  });
});

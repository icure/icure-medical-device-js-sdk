import 'mocha';

import {assert} from "chai";
import {PropertyStubMapper} from "../../src/mappers/property";
import {newProperty} from "../models/propertyTest";

describe('Property mapper test', () => {
  it('Mapping/Unmapping of Property model - Success', () => {
    const property = newProperty()
    const mappedProperty = PropertyStubMapper.toPropertyStubDto(property)
    assert.deepEqual(PropertyStubMapper.toProperty(mappedProperty), property)
  });
});


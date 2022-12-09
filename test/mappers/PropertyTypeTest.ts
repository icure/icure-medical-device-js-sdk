import 'mocha';

import {assert} from "chai";
import {PropertyTypeStubMapper} from "../../src/mappers/propertyType";
import {newPropertyType} from "../models/propertyTypeTest";

describe('PropertyType mapper test', () => {
  it('Mapping/Unmapping of PropertyType model - Success', () => {
    const propertyType = newPropertyType()
    const mappedPropertyType = PropertyTypeStubMapper.toPropertyTypeStubDto(propertyType)
    assert.deepEqual(PropertyTypeStubMapper.toPropertyType(mappedPropertyType), propertyType)
  });
});


import 'mocha';

import {assert} from "chai";
import {TypedValueObjectMapper} from "../../src/mappers/typedValueObject";
import {newTypedValueObject} from "../models/typedValueObjectTest";

describe('TypedValueObject mapper test', () => {
  it('Mapping/Unmapping of TypedValueObject model - Success', () => {
    const typedValueObject = newTypedValueObject()
    const mappedTypedValueObject = TypedValueObjectMapper.toTypedValueDtoObject(typedValueObject)
    assert.deepEqual(TypedValueObjectMapper.toTypedValueObject(mappedTypedValueObject), typedValueObject)
  });
});


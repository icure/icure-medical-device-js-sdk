import {PropertyStub} from "@icure/api";
import {Property} from "../models/Property";
import {PropertyTypeStubMapper} from "./propertyType";
import {TypedValueObjectMapper} from "./typedValueObject";

export namespace PropertyStubMapper {
  import toPropertyType = PropertyTypeStubMapper.toPropertyType;
  import toPropertyTypeStubDto = PropertyTypeStubMapper.toPropertyTypeStubDto;

  import toTypedValueObject = TypedValueObjectMapper.toTypedValueObject;
  import toTypedValueDtoObject = TypedValueObjectMapper.toTypedValueDtoObject;

  export const toProperty = (obj?: PropertyStub) => obj ? new Property({
    id: obj.id,
    type: toPropertyType(obj.type),
    typedValue: toTypedValueObject(obj.typedValue),
    deleted: obj.deletionDate,
  }) : undefined;

  export const toPropertyStubDto = (obj?: Property) => obj ? new PropertyStub({
    id: obj.id,
    type: toPropertyTypeStubDto(obj.type),
    typedValue: toTypedValueDtoObject(obj.typedValue),
    deletionDate: obj.deleted,
  }) : undefined;
}

import {TypedValueObject} from "../models/TypedValueObject";
import {TypedValueObject as TypedValueDtoObject} from "@icure/api";

export namespace TypedValueObjectMapper {
  export const toTypedValueObject = (obj?: TypedValueDtoObject) => obj ? new TypedValueObject({
    type: obj.type,
    booleanValue: obj.booleanValue,
    integerValue: obj.integerValue,
    doubleValue: obj.doubleValue,
    stringValue: obj.stringValue,
    dateValue: obj.dateValue,
  }) : undefined;

  export const toTypedValueDtoObject = (obj?: TypedValueObject) => obj ? new TypedValueDtoObject({
    type: obj.type,
    booleanValue: obj.booleanValue,
    integerValue: obj.integerValue,
    doubleValue: obj.doubleValue,
    stringValue: obj.stringValue,
    dateValue: obj.dateValue,
  }) : undefined;
}

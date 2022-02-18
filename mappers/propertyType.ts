import {PropertyTypeStub} from "@icure/api";
import {PropertyType} from "../models/PropertyType";

export namespace PropertyTypeStubMapper {
export const toPropertyType = (obj: PropertyTypeStub) => new PropertyType({
  identifier: obj.identifier,
  type: toPropertyTypeType(obj.type),
});

    export const toPropertyTypeStubDto = (obj: PropertyType) => new PropertyTypeStub({
      identifier: obj.identifier,
      type: toPropertyTypeStubDtoType(obj.type),
    });

}

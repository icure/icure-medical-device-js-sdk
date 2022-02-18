import {PropertyTypeStub} from "@icure/api";
import {PropertyType} from "../models/PropertyType";

export namespace PropertyTypeStubMapper {
export const toPropertyType = (obj?: PropertyTypeStub) => obj ? new PropertyType({
  identifier: obj.identifier,
  type: obj.type,
}) : undefined;

    export const toPropertyTypeStubDto = (obj?: PropertyType) => obj ? new PropertyTypeStub({
      identifier: obj.identifier,
      type: obj.type,
    }) : undefined;

}

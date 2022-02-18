import {CodingReference} from "../models/CodingReference";
import {CodeStub} from "@icure/api";

export namespace CodeStubDtoMapper {
  export const toCodingReference = (obj?: CodeStub) => obj ? new CodingReference({
    id: obj.id ?? `${obj.type}|${obj.code}|${obj.version}`,
    type: obj.type,
    code: obj.code,
    version: obj.version,
  }) : undefined;

  export const toCodeStub = (obj?: CodingReference) => obj ?new CodeStub({
    id: obj.id,
    type: obj.type,
    code: obj.code,
    version: obj.version,
  }) : undefined;


}

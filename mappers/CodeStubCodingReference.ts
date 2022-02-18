import {CodingReference} from "../models/CodingReference";
import {CodeStub} from "@icure/api";

namespace CodeStubDtoMapper {
  export const toCodingReference = (dto: CodeStub) => new CodingReference({
    id: dto.id ?? `${dto.type}|${dto.code}|${dto.version}`,
    type: dto.type,
    code: dto.code,
    version: dto.version,
  });

  export const toCodeStub = (obj: CodingReference) => new CodeStub({
    id: obj.id,
    type: obj.type,
    code: obj.code,
    version: obj.version,
  });


}

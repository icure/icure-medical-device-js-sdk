import {Identifier} from "../models/Identifier";
import {Identifier as IdentifierDto} from "@icure/api";
import {CodeStubDtoMapper} from "./CodeStubCodingReference";

export namespace IdentifierDtoMapper {
  import toCodingReference = CodeStubDtoMapper.toCodingReference;
  import toCodeStub = CodeStubDtoMapper.toCodeStub;
  export const toIdentifier = (obj?: IdentifierDto) => obj ? new Identifier({
        id: obj.id,
        assigner: obj.assigner,
        start: obj.start,
        end: obj.end,
        system: obj.system,
        type: toCodingReference(obj.type),
        use: obj.use,
  }) : undefined;

  export const toIdentifierDto = (obj?: Identifier) => obj ? new IdentifierDto({
        id: obj.id,
        assigner: obj.assigner,
        start: obj.start,
        end: obj.end,
        system: obj.system,
        type: toCodeStub(obj.type),
        use: obj.use,
  }) : undefined;
}

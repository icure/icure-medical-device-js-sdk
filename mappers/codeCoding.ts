import {Code} from "@icure/api";
import {Coding} from "../models/Coding";
import {isCodeId, toMapSet} from "./utils";

export namespace CodingMapper {
  export const toCoding = (dto: Code) =>
    new Coding({
      id: dto.id,
      qualifiedLinks: dto.qualifiedLinks,
      searchTerms: toMapSet(dto.searchTerms),
      rev: dto.rev,
      type: dto.type,
      code: dto.code,
      version: dto.version,
      description: dto.label,
    });

  export const toCode = (obj: Coding) =>
    new Code({
      id: isCodeId(obj.id) ? obj.id : `${obj.type}|${obj.code}|${obj.version}`,
      qualifiedLinks: obj.qualifiedLinks,
      searchTerms: toMapSet(obj.searchTerms),
      rev: obj.rev,
      type: obj.type,
      code: obj.code,
      version: obj.version,
      label: obj.description
    });
}


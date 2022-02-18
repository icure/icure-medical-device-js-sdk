import {Code} from "@icure/api";
import {Coding} from "../models/Coding";
import {forceCodeId} from "./utils";

export namespace CodingMapper {
  export const toCoding = (dto: Code) =>
    new Coding({
      id: dto.id,
      qualifiedLinks: dto.qualifiedLinks,
      searchTerms: dto.searchTerms,
      rev: dto.rev,
      type: dto.type,
      code: dto.code,
      version: dto.version,
      description: dto.label,
    });

  export const toCode = (obj: Coding) =>
    new Code({
      id: forceCodeId(obj.id),
      qualifiedLinks: obj.qualifiedLinks,
      searchTerms: obj.searchTerms,
      rev: obj.rev,
      type: obj.type,
      code: obj.code,
      version: obj.version,
      label: obj.description
    });
}


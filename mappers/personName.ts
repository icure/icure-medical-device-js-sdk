import {PersonName} from "../models/PersonName";
import {PersonName as PersonNameDto} from "@icure/api";

export namespace PersonNameDtoMapper {
  export const toPersonName = (obj?: PersonNameDto) => obj ? new PersonName({
    firstNames: obj.firstNames,
    prefix: obj.prefix,
    suffix: obj.suffix,
    lastName: obj.lastName,
    start: obj.start,
    end: obj.end,
    text: obj.text,
    use: obj.use,
  }) : undefined;

  export const toPersonNameDto = (obj?: PersonName) => obj ? new PersonNameDto({
    firstNames: obj.firstNames,
    prefix: obj.prefix,
    suffix: obj.suffix,
    lastName: obj.lastName,
    start: obj.start,
    end: obj.end,
    text: obj.text,
    use: obj.use,
  }) : undefined;
}

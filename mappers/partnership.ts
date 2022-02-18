import {Partnership} from "../models/Partnership";
import {Partnership as PartnershipDto} from "@icure/api";

export namespace PartnershipDtoMapper {
  export const toPartnership = (obj?: PartnershipDto) => obj ? new Partnership({
  type: obj.type,
  status: obj.status,
  partnerId: obj.partnerId,
}) : undefined;

  export const toPartnershipDto = (obj?: Partnership) => obj ? new PartnershipDto({
    type: obj.type,
    status: obj.status,
    partnerId: obj.partnerId,
  }) : undefined;
}

import {Delegation as DelegationDto} from "@icure/api";
import {Delegation} from "../models/Delegation";

export namespace DelegationMapper {
  export const toDelegation = (dto: DelegationDto) => new Delegation({
    tags: dto.tags,
    owner: dto.owner,
    delegatedTo: dto.delegatedTo,
    key: dto.key
  });

  export const toDelegationDto = (obj: Delegation) => new DelegationDto({
    tags: obj.tags,
    owner: obj.owner,
    delegatedTo: obj.delegatedTo,
    key: obj.key
  });
}

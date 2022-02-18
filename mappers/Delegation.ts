import {Delegation as DelegationDto} from "@icure/api";
import {Delegation} from "../models/Delegation";

export namespace DelegationMapper {
  const toDelegationDto = (dto: DelegationDto) => new Delegation({
    tags: dto.tags,
    owner: dto.owner,
    delegatedTo: dto.delegatedTo,
    key: dto.key
  });

  const toDelegation = (obj: Delegation) => new DelegationDto({
    tags: obj.tags,
    owner: obj.owner,
    delegatedTo: obj.delegatedTo,
    key: obj.key
  });
}

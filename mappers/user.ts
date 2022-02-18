import {AuthenticationToken, User as UserDto} from "@icure/api";
import {v4 as uuid} from 'uuid';
import {User} from "../models/User";
import {forceUuid, map, mapReduce, mapSet, toMapSet} from "./utils";

namespace UserMapper {
   const toUser = (dto: UserDto) =>
      new User({
        id: dto.id,
        properties: new Set(map(dto.properties, toProperty)),
        roles: new Set(dto.roles),
        autoDelegations: toMapSet(dto.autoDelegations),
        rev: dto.rev,
        deletionDate: dto.deletionDate,
        created: dto.created,
        name: dto.name,
        login: dto.login,
        passwordHash: dto.passwordHash,
        secret: dto.secret,
        use2fa: dto.use2fa,
        groupId: dto.groupId,
        healthcarePartyId: dto.healthcarePartyId,
        patientId: dto.patientId,
        deviceId: dto.deviceId,
        email: dto.email,
        mobilePhone: dto.mobilePhone,
      });

  const toUserDto = (obj: User) =>
      new UserDto({
        id: forceUuid(obj.id),
        properties: mapSet(obj.properties, toPropertyStubDto),
        roles: obj.roles,
        autoDelegations: obj.autoDelegations,
        authenticationTokens: mapReduce(obj.authenticationTokens, toAuthenticationTokenDto),
        rev: obj.rev,
        deletionDate: obj.deletionDate,
        created: obj.created,
        name: obj.name,
        login: obj.login,
        passwordHash: obj.passwordHash,
        secret: obj.secret,
        use2fa: obj.use2fa,
        groupId: obj.groupId,
        healthcarePartyId: obj.healthcarePartyId,
        patientId: obj.patientId,
        deviceId: obj.deviceId,
        email: obj.email,
        mobilePhone: obj.mobilePhone,
      });
}

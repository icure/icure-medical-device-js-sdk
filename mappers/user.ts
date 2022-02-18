import {AuthenticationToken, User as BaseUser} from "@icure/api";
import {v4 as uuid} from 'uuid';
import {User} from "../models/User";
import {forceUuid, mapReduce} from "./utils";

namespace UserMapper {
   const toUser = (dto: BaseUser) =>
      new BaseUser({
        id: dto.id,
        properties: dto.properties?.map((it) => it.toProperty()).toSet(),
        roles: dto.roles,
        autoDelegations: dto.autoDelegations,
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
      new BaseUser({
        id: forceUuid(obj.id),
        properties: new Set(Array.of(obj.properties.values).map((it) => toPropertyStubDto(it))),
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

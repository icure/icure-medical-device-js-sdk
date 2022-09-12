import {User as UserDto} from "@icure/api";
import {SharedDataType, User} from "../models/User";
import {forceUuid, map, mapReduce, mapSetToArray, toMapSet} from "./utils";
import {PropertyStubMapper} from "./property";
import {AuthenticationTokenMapper} from "./authenticationToken";

export namespace UserMapper {
  import toPropertyStubDto = PropertyStubMapper.toPropertyStubDto;
  import toProperty = PropertyStubMapper.toProperty;
  import toAuthenticationTokenDto = AuthenticationTokenMapper.toAuthenticationTokenDto;
  import toAuthenticationToken = AuthenticationTokenMapper.toAuthenticationToken;

  export const toUser = (obj?: UserDto) => obj ?
      new User({
        id: obj.id,
        properties: new Set(map(obj.properties, toProperty)),
        roles: new Set(obj.roles),
        sharingDataWith: toMapSet(obj.autoDelegations) as { [key in SharedDataType]: Set<string>; } | undefined,
        authenticationTokens: mapReduce(obj.authenticationTokens, toAuthenticationToken),
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
      }) : undefined;

  export const toUserDto = (obj?: User) => obj ?
      new UserDto({
        id: forceUuid(obj.id),
        properties: mapSetToArray(obj.properties, toPropertyStubDto),
        roles: [...obj?.roles ?? []],
        autoDelegations: obj.sharingDataWith,
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
      }) : undefined;
}

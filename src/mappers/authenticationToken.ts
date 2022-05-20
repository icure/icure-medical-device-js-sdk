import {AuthenticationToken as AuthenticationTokenDto} from "@icure/api";
import {AuthenticationToken} from "../models/AuthenticationToken";

export namespace AuthenticationTokenMapper {
  export const toAuthenticationToken = (dto: AuthenticationTokenDto) =>
    new AuthenticationToken({
      token: dto.token,
      creationTime: dto.creationTime,
      validity: dto.validity,
    });

  export const toAuthenticationTokenDto = (obj: AuthenticationToken) =>
    new AuthenticationTokenDto({
      token: obj.token,
      creationTime: obj.creationTime,
      validity: obj.validity,
    });
}

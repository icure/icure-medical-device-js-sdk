import {AuthenticationToken as AuthenticationTokenDto} from "@icure/api";
import {AuthenticationToken} from "../models/AuthenticationToken";

namespace AuthenticationTokenMapper {
  const toAuthenticationToken = (dto: AuthenticationTokenDto) =>
    new AuthenticationToken({
      token: dto.token,
      creationTime: dto.creationTime,
      validity: dto.validity,
    });

  const toAuthenticationTokenDto = (obj: AuthenticationToken) =>
    new AuthenticationTokenDto({
      token: obj.token,
      creationTime: obj.creationTime,
      validity: obj.validity,
    });
}

import {User} from "../../models/User";
import {PaginatedListUser} from "../../models/PaginatedListUser";
import {UserApi} from "../UserApi";
import {
  FilterChainUser,
  IccAuthApi,
  IccCodeApi,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHcpartyXApi,
  IccHelementXApi,
  IccPatientXApi,
  IccUserApi,
  IccUserXApi
} from "@icure/api";
import {IccDeviceApi} from "@icure/api/icc-api/api/IccDeviceApi";
import {UserMapper} from "../../mappers/user";
import {forceUuid} from "../../mappers/utils";
import {FilterMapper} from "../../mappers/filter";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import toAbstractFilterDto = FilterMapper.toAbstractFilterDto;
import toPaginatedListUser = PaginatedListMapper.toPaginatedListUser;
import {Filter} from "../../filter/Filter";

class UserApiImpl implements UserApi {
  private userApi: IccUserApi;

  constructor(api: { cryptoApi: IccCryptoXApi; codeApi: IccCodeApi, authApi: IccAuthApi; userApi: IccUserXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; documentApi: IccDocumentXApi; deviceApi: IccDeviceApi; }) {
    this.userApi = api.userApi
  }

  async checkTokenValidity(userId: string, token: string): Promise<boolean> {
    return await this.userApi.checkTokenValidity(userId, token)
  }

  async createOrModifyUser(user: User): Promise<User> {
    const {toUserDto, toUser} = UserMapper;
    if (user.rev != null) {
      const createdUser = await this.userApi.createUser(toUserDto(user));
      if (createdUser != undefined) {
        return toUser(createdUser)!;
      }
      throw new Error("Couldn't create user")
    }

    const updatedUser = await this.userApi.modifyUser(toUserDto(user));
    if (updatedUser != undefined) {
      return toUser(updatedUser)!
    }
    throw new Error("Couldn't update user")
  }

  async createToken(userId: string): Promise<string> {
    return await this.userApi.getToken(userId, forceUuid(), 3600 * 24 * 30);
  }

  async deleteUser(userId: string): Promise<string> {
    const deletedUserRev = await this.userApi.deleteUser(userId);
    if (deletedUserRev != undefined) {
      return deletedUserRev!.rev!;
    }
    throw new Error("Invalid user id");
  }

  async filterUsers(filter: Filter<User>, nextUserId?: string, limit?: number): Promise<PaginatedListUser> {
    return toPaginatedListUser(await this.userApi.filterUsersBy(nextUserId, limit, new FilterChainUser({
      filter: toAbstractFilterDto<User>(filter, 'User')
    })))!
  }

  async getLoggedUser(): Promise<User> {
    return UserMapper.toUser(await this.userApi.getCurrentUser()!)!
  }

  async getUser(userId: string): Promise<User> {
    return UserMapper.toUser(await this.userApi.getUser(userId))!;
  }

  async matchUsers(filter: Filter<User>): Promise<Array<string>> {
    return await this.userApi.matchUsersBy( toAbstractFilterDto<User>(filter, 'User'));
  }
}

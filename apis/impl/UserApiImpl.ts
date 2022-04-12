import {User} from "../../models/User";
import {PaginatedListUser} from "../../models/PaginatedListUser";
import {UserApi} from "../UserApi";
import {
  FilterChainUser,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccPatientXApi,
  IccUserApi,
  IccUserXApi,
  User as IccUser
} from "@icure/api";
import {UserMapper} from "../../mappers/user";
import {forceUuid} from "../../mappers/utils";
import {FilterMapper} from "../../mappers/filter";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {Filter} from "../../filter/Filter";
import {Connection} from "../../models/Connection";
import {subscribeToEntityEvents} from "../../utils/rsocket";

export class UserApiImpl implements UserApi {
  private userApi: IccUserApi;
  private username: string | undefined;
  private basePath: string;
  private password: string | undefined;

  constructor(api: { cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; documentApi: IccDocumentXApi },
              basePath: string,
              username: string | undefined,
              password: string | undefined) {
    this.basePath = basePath;
    this.username = username;
    this.password = password;
    this.userApi = api.userApi
  }

  async checkTokenValidity(userId: string, token: string): Promise<boolean> {
    return this.userApi.checkTokenValidity(userId, token)
  }

  async createOrModifyUser(user: User): Promise<User> {
    if (!user.rev) {
      const createdUser = await this.userApi.createUser(UserMapper.toUserDto(user));
      if (createdUser != undefined) {
        return UserMapper.toUser(createdUser)!;
      }
      throw new Error("Couldn't create user")
    }

    const updatedUser = await this.userApi.modifyUser(UserMapper.toUserDto(user));
    if (updatedUser != undefined) {
      return UserMapper.toUser(updatedUser)!
    }
    throw new Error("Couldn't update user")
  }

  async createToken(userId: string, durationInSeconds?: number): Promise<string> {
    return this.userApi.getToken(userId, forceUuid(), durationInSeconds ?? 3600 * 24 * 30);
  }

  async deleteUser(userId: string): Promise<string> {
    const deletedUserRev = await this.userApi.deleteUser(userId);
    if (deletedUserRev) {
      return deletedUserRev.rev!;
    }
    throw new Error("Invalid user id");
  }

  async filterUsers(filter: Filter<User>, nextUserId?: string, limit?: number): Promise<PaginatedListUser> {
    return PaginatedListMapper.toPaginatedListUser(await this.userApi.filterUsersBy(nextUserId, limit, new FilterChainUser({
      filter: FilterMapper.toAbstractFilterDto<User>(filter, 'User')
    })))!
  }

  async getLoggedUser(): Promise<User> {
    return UserMapper.toUser(await this.userApi.getCurrentUser())!
  }

  async getUser(userId: string): Promise<User> {
    return UserMapper.toUser(await this.userApi.getUser(userId))!;
  }

  async matchUsers(filter: Filter<User>): Promise<Array<string>> {
    return this.userApi.matchUsersBy(FilterMapper.toAbstractFilterDto<User>(filter, 'User'));
  }

  subscribeToUserEvents(eventTypes: ("CREATE" | "UPDATE" | "DELETE")[], filter: Filter<User> | undefined, eventFired: (patient: User) => void): Promise<Connection> {
    return subscribeToEntityEvents(this.basePath, this.username!, this.password!, "User", eventTypes, filter, eventFired)
  }

}

//TODO Put in the other SDK
export class ExtendedUser extends IccUser {

  dataOwnerId(): string {
    let dataOwnerId = this.healthcarePartyId
      ?? this.patientId
      ?? this.deviceId

      if (dataOwnerId == undefined) {
        throw new Error(`User ${this.id} is not a valid data owner`);
      }

      return dataOwnerId
  }
}

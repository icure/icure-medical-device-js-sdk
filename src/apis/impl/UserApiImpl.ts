import {User} from "../../models/User";
import {PaginatedListUser} from "../../models/PaginatedListUser";
import {UserApi} from "../UserApi";
import {
  AllUsersFilter,
  FilterChainUser,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccPatientXApi,
  IccUserApi,
  IccUserXApi
} from "@icure/api";
import {UserMapper} from "../../mappers/user";
import {forceUuid} from "../../mappers/utils";
import {FilterMapper} from "../../mappers/filter";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {Filter} from "../../filter/Filter";
import {Connection, ConnectionImpl} from "../../models/Connection";
import {subscribeToEntityEvents} from "../../utils/rsocket";
import { Patient } from "../../models/Patient";
import {v4 as uuid} from 'uuid';
import {Address, AddressAddressTypeEnum} from "../../models/Address";
import {Telecom, TelecomTelecomTypeEnum} from "../../models/Telecom";
import {UsersByPatientIdFilter} from "../../filter/user/UsersByPatientIdFilter";

export class UserApiImpl implements UserApi {
  private readonly userApi: IccUserApi;
  private readonly username: string | undefined;
  private readonly basePath: string;
  private readonly password: string | undefined;

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

  async getUserByEmail(email:string): Promise<User> {
    return UserMapper.toUser(await this.userApi.getUserByEmail(email))!;
  }

  async matchUsers(filter: Filter<User>): Promise<Array<string>> {
    return this.userApi.matchUsersBy(FilterMapper.toAbstractFilterDto<User>(filter, 'User'));
  }

  filteredContactsFromAddresses(addresses: Array<Address>, telecomType: TelecomTelecomTypeEnum, addressType?: AddressAddressTypeEnum): Telecom | undefined {
    return addresses
      .filter( address => address.addressType === addressType &&
        address.telecoms.filter( telecom => telecom.telecomType === telecomType).length > 0)
      .map( address => address.telecoms.filter( telecom => telecom.telecomType === telecomType).pop())
      .filter( telecom => !!telecom)[0];
  }

  async newUserFromPatient(patient: Patient): Promise<User> {
    // return this.matchUsers(({
    //   patientId: patient.id,
    //   '$type': 'UsersByPatientIdFilter'
    // } as UsersByPatientIdFilter)).then (r => {
    //  if (r.length > 0) throw new Error("There is already a user associated to this patient");

    return new Promise( (resolve, reject) => {
      const contact = [
        this.filteredContactsFromAddresses(patient.addresses, "email", "home"),  // Check for the home email
        this.filteredContactsFromAddresses(patient.addresses, "mobile", "home"), // Check for the home mobile
        this.filteredContactsFromAddresses(patient.addresses, "email", "work"),  // Check for the work email
        this.filteredContactsFromAddresses(patient.addresses, "mobile", "work"), // Check for the work mobile
        this.filteredContactsFromAddresses(patient.addresses, "email"),                    // Check for any email
        this.filteredContactsFromAddresses(patient.addresses, "mobile")                    // Check for any mobile
      ].filter(contact => !!contact)[0]

      if (contact === undefined) throw new Error("No email or mobile phone information provided in patient");
      if (patient.firstName === undefined) throw new Error("No first name provided in patient");
      if (patient.lastName === undefined) throw new Error("No last name provided in patient");

      // return new User({
      resolve( new User({
        created: new Date().getTime(),
        name: patient.firstName + patient.lastName,
        login: contact.telecomNumber,
        patientId: patient.id,
        email: contact.telecomType == "email" ? contact.telecomNumber : undefined,
        mobilePhone: contact.telecomType == "mobile" ? contact.telecomNumber : undefined,

      })
      )
    });

  }

  subscribeToUserEvents(
    eventTypes: ("CREATE" | "UPDATE" | "DELETE")[],
    filter: Filter<User> | undefined,
    eventFired: (patient: User) => Promise<void>,
    options: {keepAlive?: number, lifetime?: number } = {}
  ): Promise<Connection> {
    return subscribeToEntityEvents(this.basePath, this.username!, this.password!, "User", eventTypes, filter, eventFired, options).then((rs) => new ConnectionImpl(rs))
  }

}

import {User} from "../../models/User";
import {PaginatedListUser} from "../../models/PaginatedListUser";
import {UserApi} from "../UserApi";
import {
  FilterChainUser,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHcpartyXApi,
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
import {Patient} from "../../models/Patient";
import {UserFilter} from "../../filter";
import {filteredContactsFromAddresses} from "../../utils/addressUtils";
import {MessageGatewayApi} from "../MessageGatewayApi";
import {EmailMessageFactory, SMSMessageFactory} from "../../utils/messageGatewayUtils";

export class UserApiImpl implements UserApi {
  private readonly userApi: IccUserApi;
  private readonly hcpApi: IccHcpartyXApi
  private readonly username: string | undefined;
  private readonly basePath: string;
  private readonly password: string | undefined;
  private readonly messageGatewayApi: MessageGatewayApi | undefined;

  constructor(api: { healthcarePartyApi: IccHcpartyXApi, cryptoApi: IccCryptoXApi; userApi: IccUserXApi; patientApi: IccPatientXApi; contactApi: IccContactXApi; documentApi: IccDocumentXApi },
              messageGatewayApi: MessageGatewayApi | undefined,
              basePath: string,
              username: string | undefined,
              password: string | undefined) {
    this.basePath = basePath;
    this.username = username;
    this.password = password;
    this.userApi = api.userApi;
    this.hcpApi = api.healthcarePartyApi;
    this.messageGatewayApi = messageGatewayApi;
  }

  async checkTokenValidity(userId: string, token: string): Promise<boolean> {
    return this.userApi.checkTokenValidity(userId, token)
  }

  async createAndInviteUser(patient: Patient, messageFactory: SMSMessageFactory | EmailMessageFactory, tokenDuration = 48 * 60 * 60): Promise<User> {
    if (!this.messageGatewayApi) {
      throw new Error("Can not invite a user, as no msgGtwUrl and/or specId have been provided : Make sure to call .withMsgGtwUrl and .withMsgGtwSpecId when creating your MedTechApi")
    }

    // Checks that the Patient has all the required information
    if (!patient.id) throw new Error("Patient does not have a valid id")

    // Checks that no Users already exist for the Patient
    const existingUsers = await this.filterUsers(
      await new UserFilter()
        .byPatientId(patient.id)
        .build()
    );
    if(!!existingUsers && existingUsers.rows.length > 0) throw new Error("A User already exists for this Patient");

    // Gets the preferred contact information
    const contact = [
      filteredContactsFromAddresses(patient.addresses, "email", "home"),  // Check for the home email
      filteredContactsFromAddresses(patient.addresses, "mobile", "home"), // Check for the home mobile
      filteredContactsFromAddresses(patient.addresses, "email", "work"),  // Check for the work email
      filteredContactsFromAddresses(patient.addresses, "mobile", "work"), // Check for the work mobile
      filteredContactsFromAddresses(patient.addresses, "email"),                     // Check for any email
      filteredContactsFromAddresses(patient.addresses, "mobile")                     // Check for any mobile
    ].filter(contact => !!contact)[0];
    if (!contact) throw new Error("No email or mobile phone information provided in patient");

    // Creates the user
    const createdUser = await this.createOrModifyUser(
      new User({
        created: new Date().getTime(),
        name: contact.telecomNumber,
        login: contact.telecomNumber,
        patientId: patient.id,
        email: contact.telecomType == "email" ? contact.telecomNumber : undefined,
        mobilePhone: contact.telecomType == "mobile" ? contact.telecomNumber : undefined,
      })
    );
    if (!createdUser || !createdUser.id || !createdUser.login) throw new Error("Something went wrong during User creation");

    // Gets a short-lived authentication token
    const shortLivedToken = await this.createToken(createdUser.id, tokenDuration);
    if (!shortLivedToken) throw new Error("Something went wrong while creating a token for the User");

    const messagePromise = !!createdUser.email
      ? this.messageGatewayApi?.sendEmail(createdUser.login, (messageFactory as EmailMessageFactory).get(
          createdUser,
          shortLivedToken))
      : this.messageGatewayApi?.sendSMS(createdUser.login, (messageFactory as SMSMessageFactory).get(
          createdUser,
          shortLivedToken))

    if (!(await messagePromise)) throw new Error("Something went wrong contacting the Message Gateway");

    return createdUser;
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

  subscribeToUserEvents(
    eventTypes: ("CREATE" | "UPDATE" | "DELETE")[],
    filter: Filter<User> | undefined,
    eventFired: (user: User) => Promise<void>,
    options: {keepAlive?: number, lifetime?: number, connectionMaxRetry?: number, connectionRetryIntervalMs?: number } = {}
  ): Promise<Connection> {
    return subscribeToEntityEvents(this.basePath, this.username!, this.password!, "User", eventTypes, filter, eventFired, options)
      .then((rs) => new ConnectionImpl(rs))
  }

}

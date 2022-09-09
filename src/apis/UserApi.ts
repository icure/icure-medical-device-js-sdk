import {Filter} from '../filter/Filter';
import {PaginatedListUser} from '../models/PaginatedListUser';
import {User} from '../models/User';
import {Connection} from "../models/Connection";
import {Patient} from "../models/Patient";
import {EmailMessageFactory, SMSMessageFactory} from "../utils/messageGatewayUtils";

export interface UserApi {
  /**
   * Checks that the provided token is (still) valid for the provided user id (or user login).
   * Check token validity for a user.
   * @param userId The UUID that identifies the user uniquely
   * @param token The token that will be checked
   */
  checkTokenValidity(userId: string, token: string): Promise<boolean>
  /**
   * Creates a User from an existing patient with a short-lived authentication token. It sends an invitation with the
   * credentials and the link to complete the signup.
   * @param patient the Patient to create the user for.
   * @param messageFactory a MessageFactory that generates an EmailMessage or a SMSMessage.
   * @param tokenDuration the validity duration of the short-lived token, in seconds (default 48 hours)
   */
  createAndInviteUser(patient: Patient, messageFactory: SMSMessageFactory | EmailMessageFactory, tokenDuration?: number): Promise<User>;

  /**
   * A user must have a login, an email or a mobilePhone defined, a user should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an user, you must ensure that the rev obtained when getting or creating the user is present as the rev is used to guarantee that the user has not been modified by a third party.
   * Create a new user or modify an existing one.
   * @param user The user that must be created in the database.
   */
  createOrModifyUser(user: User): Promise<User>
  /**
   * A token is used to authenticate the user. It is just like a password but it is destined to be used by programs instead of humans. Tokens have a limited validity period (one month).
   * Create a token for a user.
   * @param userId The UUID that identifies the user uniquely
   * @param durationInSeconds the validity duration of the token, in seconds
   */
  createToken(userId: string, durationInSeconds?: number): Promise<string>
  /**
   * Deletes the user identified by the provided unique userId.
   * Delete an existing user.
   * @param userId The UUID that uniquely identifies the user to be deleted.
   */
  deleteUser(userId: string): Promise<string>
  /**
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns a paginated list of users (with a cursor that lets you query the following items).
   * Load users from the database by filtering them using the provided Filter.
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   * @param nextUserId The id of the first User in the next page
   * @param limit The number of users to return in the queried page
   */
  filterUsers(filter: Filter<User>, nextUserId?: string, limit?: number): Promise<PaginatedListUser>
  /**
   * When you make a call to the server, an authentication token is used to identify you. This call returns the complete User object that corresponds to your authentication credentials.
   * Get the details of the logged User.
   */
  getLoggedUser(): Promise<User>
  /**
   * Each user is uniquely identified by a user id. The user id is a UUID. This userId is the preferred method to retrieve one specific user.
   * Get a User by id.
   * @param userId The UUID that identifies the user uniquely
   */
  getUser(userId: string): Promise<User>

  /**
   * Get a User by email.
   *
   * Each user is uniquely identified by an email
   *
   * @param email The email that identifies the user uniquely
   */
  getUserByEmail(email: string): Promise<User>

  /**
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns the list of the ids of the users matching the filter.
   * Load user ids from the database by filtering them using the provided Filter.
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   */
  matchUsers(filter: Filter<User>): Promise<Array<string>>

  /**
   * Opens a WebSocket Connection in order to receive all the Users corresponding to specific filter criteria.
   * @param eventTypes Type of event you would like to listen. It can be CREATE, UPDATE or DELETE
   * @param filter Filter criteria to filter to the users you would like to receive
   * @param eventFired Action applied each time you receive a user through the WebSocket
   * @param options Options to configure the WebSocket.
   *    - keepAlive : How long to keep connection alive (ms);
   *    - lifetime : How long to keep the WebSocket alive (ms);
   *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
   *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
   */
  subscribeToUserEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<User>,
    eventFired: (user: User) => Promise<void>,
    options?: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
  ): Promise<Connection>
}

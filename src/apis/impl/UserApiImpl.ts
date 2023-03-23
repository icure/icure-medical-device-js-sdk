import { SharedDataType, User } from '../../models/User'
import { PaginatedListUser } from '../../models/PaginatedListUser'
import { UserApi } from '../UserApi'
import {
  FilterChainUser,
  IccAuthApi,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHcpartyXApi,
  IccPatientXApi,
  IccUserApi,
  IccUserXApi,
} from '@icure/api'
import { UserMapper } from '../../mappers/user'
import { forceUuid } from '../../mappers/utils'
import { FilterMapper } from '../../mappers/filter'
import { PaginatedListMapper } from '../../mappers/paginatedList'
import { Filter } from '../../filter/Filter'
import { Connection, ConnectionImpl } from '../../models/Connection'
import { subscribeToEntityEvents } from '../../utils/websocket'
import { Patient } from '../../models/Patient'
import { UserFilter } from '../../filter'
import { filteredContactsFromAddresses } from '../../utils/addressUtils'
import { MessageGatewayApi } from '../MessageGatewayApi'
import { EmailMessageFactory, SMSMessageFactory } from '../../utils/msgGtwMessageFactory'
import { ErrorHandler } from '../../services/ErrorHandler'
import { Sanitizer } from '../../services/Sanitizer'

export class UserApiImpl implements UserApi {
  private readonly userApi: IccUserApi
  private readonly authApi: IccAuthApi
  private readonly hcpApi: IccHcpartyXApi
  private readonly username: string | undefined
  private readonly basePath: string
  private readonly password: string | undefined
  private readonly messageGatewayApi: MessageGatewayApi | undefined
  private readonly errorHandler: ErrorHandler
  private readonly sanitizer: Sanitizer

  constructor(
    api: {
      healthcarePartyApi: IccHcpartyXApi
      cryptoApi: IccCryptoXApi
      authApi: IccAuthApi
      userApi: IccUserXApi
      patientApi: IccPatientXApi
      contactApi: IccContactXApi
      documentApi: IccDocumentXApi
    },
    messageGatewayApi: MessageGatewayApi | undefined,
    errorHandler: ErrorHandler,
    sanitizer: Sanitizer,
    basePath: string,
    username: string | undefined,
    password: string | undefined
  ) {
    this.basePath = basePath
    this.username = username
    this.password = password
    this.authApi = api.authApi
    this.errorHandler = errorHandler
    this.sanitizer = sanitizer
    this.userApi = api.userApi
    this.hcpApi = api.healthcarePartyApi
    this.messageGatewayApi = messageGatewayApi
  }

  async checkTokenValidity(userId: string, token: string): Promise<boolean> {
    return this.userApi.checkTokenValidity(userId, token).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
  }

  async createAndInviteUser(patient: Patient, messageFactory: SMSMessageFactory | EmailMessageFactory, tokenDuration = 48 * 60 * 60): Promise<User> {
    if (!this.messageGatewayApi) {
      throw this.errorHandler.createErrorWithMessage(
        'Can not invite a user, as no msgGtwUrl and/or specId have been provided : Make sure to call .withMsgGtwUrl and .withMsgGtwSpecId when creating your MedTechApi'
      )
    }

    // Checks that the Patient has all the required information
    if (!patient.id) throw this.errorHandler.createErrorWithMessage('Patient does not have a valid id')

    // Checks that no Users already exist for the Patient
    const existingUsers = await this.filterUsers(await new UserFilter().byPatientId(patient.id).build())
    if (!!existingUsers && existingUsers.rows.length > 0) throw this.errorHandler.createErrorWithMessage('A User already exists for this Patient')

    // Gets the preferred contact information
    const contact = [
      filteredContactsFromAddresses(patient.addresses, 'email', 'home'), // Check for the home email
      filteredContactsFromAddresses(patient.addresses, 'mobile', 'home'), // Check for the home mobile
      filteredContactsFromAddresses(patient.addresses, 'email', 'work'), // Check for the work email
      filteredContactsFromAddresses(patient.addresses, 'mobile', 'work'), // Check for the work mobile
      filteredContactsFromAddresses(patient.addresses, 'email'), // Check for any email
      filteredContactsFromAddresses(patient.addresses, 'mobile'), // Check for any mobile
    ].filter((contact) => !!contact)[0]
    if (!contact) throw this.errorHandler.createErrorWithMessage('No email or mobile phone information provided in patient')

    // Creates the user
    const createdUser = await this.createOrModifyUser(
      new User({
        created: new Date().getTime(),
        name: contact.telecomNumber,
        login: contact.telecomNumber,
        patientId: patient.id,
        email: contact.telecomType == 'email' ? contact.telecomNumber : undefined,
        mobilePhone: contact.telecomType == 'mobile' ? contact.telecomNumber : undefined,
      })
    )
    if (!createdUser || !createdUser.id || !createdUser.login)
      throw this.errorHandler.createErrorWithMessage('Something went wrong during User creation')

    // Gets a short-lived authentication token
    const shortLivedToken = await this.createToken(createdUser.id, tokenDuration)
    if (!shortLivedToken) throw this.errorHandler.createErrorWithMessage('Something went wrong while creating a token for the User')

    const messagePromise = !!createdUser.email
      ? this.messageGatewayApi?.sendEmail(createdUser.login, (messageFactory as EmailMessageFactory).get(createdUser, shortLivedToken)).catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
      : this.messageGatewayApi?.sendSMS(createdUser.login, (messageFactory as SMSMessageFactory).get(createdUser, shortLivedToken)).catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })

    if (!(await messagePromise)) throw this.errorHandler.createErrorWithMessage('Something went wrong contacting the Message Gateway')

    return createdUser
  }

  async createOrModifyUser(user: User): Promise<User> {
    if (!user.rev) {
      const createdUser = await this.userApi.createUser(UserMapper.toUserDto(user)).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
      if (createdUser != undefined) {
        return UserMapper.toUser(createdUser)!
      }
      throw this.errorHandler.createErrorWithMessage("Couldn't create user")
    }

    const updatedUser = await this.userApi.modifyUser(UserMapper.toUserDto(user)).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    if (updatedUser != undefined) {
      return UserMapper.toUser(updatedUser)!
    }
    throw this.errorHandler.createErrorWithMessage("Couldn't update user")
  }

  async createToken(userId: string, durationInSeconds?: number): Promise<string> {
    return this.userApi.getToken(userId, forceUuid(), durationInSeconds ?? 3600 * 24 * 30).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
  }

  async deleteUser(userId: string): Promise<string> {
    const deletedUserRev = await this.userApi.deleteUser(userId)
    if (deletedUserRev) {
      return deletedUserRev.rev!
    }
    throw this.errorHandler.createErrorWithMessage('Invalid user id')
  }

  async filterUsers(filter: Filter<User>, nextUserId?: string, limit?: number): Promise<PaginatedListUser> {
    return PaginatedListMapper.toPaginatedListUser(
      await this.userApi
        .filterUsersBy(
          nextUserId,
          limit,
          new FilterChainUser({
            filter: FilterMapper.toAbstractFilterDto<User>(filter, 'User'),
          })
        )
        .catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
    )!
  }

  async getLoggedUser(): Promise<User> {
    return UserMapper.toUser(
      await this.userApi.getCurrentUser().catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    )!
  }

  async getUser(userId: string): Promise<User> {
    return UserMapper.toUser(
      await this.userApi.getUser(userId).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    )!
  }

  async getUserByEmail(email: string): Promise<User> {
    return UserMapper.toUser(
      await this.userApi.getUserByEmail(this.sanitizer.validateEmail(email)).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    )!
  }

  async matchUsers(filter: Filter<User>): Promise<Array<string>> {
    return this.userApi.matchUsersBy(FilterMapper.toAbstractFilterDto<User>(filter, 'User')).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
  }

  subscribeToUserEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<User> | undefined,
    eventFired: (user: User) => Promise<void>,
    options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number } = {}
  ): Promise<Connection> {
    return subscribeToEntityEvents(
      this.basePath,
      async () => await this.authApi.token('GET', '/ws/v1/notification'),
      'User',
      eventTypes,
      filter,
      eventFired,
      options
    )
      .then((rs) => new ConnectionImpl(rs))
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
  }

  async shareAllFutureDataWith(dataOwnerIds: string[], type?: SharedDataType): Promise<User> {
    const user = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    if (!user) {
      throw this.errorHandler.createErrorWithMessage(
        'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
      )
    }

    let newDataSharing
    const currentAutoDelegationsForType = user.autoDelegations?.[type ?? 'all']
    if (currentAutoDelegationsForType) {
      const delegationsToAdd = dataOwnerIds.filter((item) => !currentAutoDelegationsForType.includes(item))
      if (delegationsToAdd.length > 0) {
        newDataSharing = Object.entries(user.autoDelegations ?? []).reduce((accumulator, [key, values]) => {
          return { ...accumulator, [key]: [...new Set(Array.of(...values, ...(type === key ? delegationsToAdd : [])))] }
        }, {})
      } else {
        return UserMapper.toUser(user)!!
      }
    } else {
      newDataSharing = {
        ...Object.entries(user.autoDelegations ?? {}).reduce((accumulator, [key, values]) => {
          return { ...accumulator, [key]: [...values] }
        }, {}),
        [type ?? 'all']: dataOwnerIds,
      }
    }

    const updatedUserDto = await this.userApi
      .modifyUser({
        ...user,
        autoDelegations: newDataSharing,
      })
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })

    if (updatedUserDto != undefined) {
      return UserMapper.toUser(updatedUserDto)!
    }

    throw this.errorHandler.createErrorWithMessage("Couldn't add data sharing to user")
  }

  async stopSharingDataWith(dataOwnerIds: string[], type?: SharedDataType): Promise<User> {
    const user = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    if (!user) {
      throw this.errorHandler.createErrorWithMessage(
        'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
      )
    }

    const delegationsToRemove = user.autoDelegations?.[type ?? 'all']?.filter((item) => dataOwnerIds.indexOf(item) >= 0)

    if (delegationsToRemove === undefined || delegationsToRemove.length === 0) {
      return UserMapper.toUser(user)!!
    }

    const newDataSharing = Object.entries(user.autoDelegations ?? {}).reduce((accumulator, [key, values]) => {
      return {
        ...accumulator,
        [key]: type === key ? [...values].filter((v) => !delegationsToRemove.includes(v)) : [...values],
      }
    }, {})

    const updatedUserDto = await this.userApi
      .modifyUser({
        ...user,
        autoDelegations: newDataSharing,
      })
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })

    if (updatedUserDto != undefined) {
      return UserMapper.toUser(updatedUserDto)!
    }
    throw this.errorHandler.createErrorWithMessage("Couldn't remove data sharing of user")
  }
}

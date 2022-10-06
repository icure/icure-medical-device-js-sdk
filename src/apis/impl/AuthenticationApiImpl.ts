import { AuthenticationProcess } from '../../models/AuthenticationProcess'
import { AuthenticationResult } from '../../models/AuthenticationResult'
import { User } from '../../models/User'

import { AuthenticationApi } from '../AuthenticationApi'
import { v4 as uuid } from 'uuid'
import { retry } from '@icure/api'
import { medTechApi, MedTechApi } from '../MedTechApi'
import { MessageGatewayApi } from '../MessageGatewayApi'
import { Notification, NotificationTypeEnum } from '../../models/Notification'

export class AuthenticationApiImpl implements AuthenticationApi {
  constructor(
    messageGatewayApi: MessageGatewayApi,
    iCureBasePath: string,
    authProcessByEmailId: string,
    authProcessBySmsId: string,
    fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
      ? window.fetch
      : typeof self !== 'undefined'
        ? self.fetch
        : fetch
  ) {
    this.iCureBasePath = iCureBasePath
    this.messageGatewayApi = messageGatewayApi
    this.authProcessByEmailId = authProcessByEmailId
    this.authProcessBySmsId = authProcessBySmsId
    this.fetchImpl = fetchImpl
  }

  private readonly iCureBasePath: string
  private readonly authProcessByEmailId: string
  private readonly authProcessBySmsId: string
  private readonly messageGatewayApi: MessageGatewayApi
  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>

  async startAuthentication(
    recaptcha: string,
    email?: string,
    phoneNumber?: string,
    firstName: string = '',
    lastName: string = '',
    healthcareProfessionalId: string = '',
    bypassTokenCheck: boolean = false,
  ): Promise<AuthenticationProcess> {
    if (!email && !phoneNumber) {
      throw Error(`In order to start authentication of a user, you should at least provide its email OR its phone number`)
    }

    const requestId = await this.messageGatewayApi.startProcess(email != undefined ? this.authProcessByEmailId : this.authProcessBySmsId, {
      'g-recaptcha-response': recaptcha,
      firstName: firstName,
      lastName: lastName,
      from: email ?? phoneNumber,
      email: email,
      mobilePhone: phoneNumber,
      hcpId: healthcareProfessionalId,
    })

    if (!!requestId) {
      return new AuthenticationProcess({ requestId, login: (email ?? phoneNumber)!, bypassTokenCheck: bypassTokenCheck })
    }

    throw Error(`Could not start authentication of user ${email ?? phoneNumber}`)
  }


  async completeAuthentication(
    process: AuthenticationProcess,
    validationCode: string,
    getUserKeypair: ((userId: string) => Promise<{ privateKey: string, publicKey: string }>),
  ): Promise<AuthenticationResult> {
    const result = await this.messageGatewayApi.validateProcess(process.requestId, validationCode).catch((e) => {
      if (process.bypassTokenCheck) {
        return true
      }
      throw e
    })

    if (result) {
      return this._initUserAuthTokenAndCrypto(process.login, validationCode, getUserKeypair)
    }

    throw Error(`Could not validate authentication of user ${process.login}`)
  }

  async authenticateAndAskAccessToItsExistingData(
    userLogin: string,
    shortLivedToken: string,
    getUserKeypair: ((userId: string) => Promise<{ privateKey: string, publicKey: string }>),
  ): Promise<AuthenticationResult> {
    const authenticationResult = await this._initUserAuthTokenAndCrypto(userLogin, shortLivedToken, getUserKeypair)

    const loggedUser = await authenticationResult.medTechApi.userApi.getLoggedUser()
    if (!loggedUser) {
      throw new Error('User log in failed')
    } else if (!!loggedUser.patientId) {
      const patientDataOwner = await authenticationResult.medTechApi.patientApi.getPatient(loggedUser.patientId)
      if (!patientDataOwner) throw new Error(`Patient with id ${loggedUser.patientId} does not exist`)

      const delegates = Object.entries(patientDataOwner.systemMetaData?.delegations ?? {})
        .map((keyValue) => Array.from(keyValue[1]))
        .flat()
        .filter((delegation) => !!delegation.delegatedTo)
        .filter((delegation) => delegation.delegatedTo != patientDataOwner.id!)
        .map((delegation) => delegation.delegatedTo!)

      for (const delegate of delegates) {
        const accessNotification = await authenticationResult.medTechApi.notificationApi.createOrModifyNotification(
          new Notification({
            id: uuid(),
            status: 'pending',
            author: loggedUser.id,
            responsible: loggedUser.patientId,
            type: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS,
          }),
          delegate
        )
        //TODO Return which delegates were warned to share back info & add retry mechanism
        if (!accessNotification) throw new Error(`Cannot create a notification to Healthcare Professional with id ${delegate}`)
      }
    } else if (!!loggedUser.healthcarePartyId) {
      const hcpDataOwner = await authenticationResult.medTechApi.healthcareProfessionalApi.getHealthcareProfessional(loggedUser.healthcarePartyId)
      if (!hcpDataOwner) throw new Error(`Healthcare Professional with id ${loggedUser.healthcarePartyId} does not exist`)
    } else if (!!loggedUser.deviceId) {
      const hcpDataOwner = await authenticationResult.medTechApi.medicalDeviceApi.getMedicalDevice(loggedUser.deviceId)
      if (!hcpDataOwner) throw new Error(`Medical Device with id ${loggedUser.deviceId} does not exist`)
    } else {
      throw new Error('User is not a Data Owner')
    }

    return authenticationResult
  }

  private async _initUserAuthTokenAndCrypto(
    login: string,
    token: string,
    getUserKeypair: ((userId: string) => Promise<{ privateKey: string, publicKey: string }>)
  ): Promise<AuthenticationResult> {
    const { authenticatedApi, user } = await retry(() =>
      this._generateAndAssignAuthenticationToken(login, token)
    )

    const userKeyPair = await getUserKeypair(user.id!)
    await authenticatedApi.initUserCrypto(true, userKeyPair)

    return new AuthenticationResult({
      medTechApi: authenticatedApi,
      keyPair: userKeyPair,
      token: authenticatedApi.password,
      groupId: user.groupId!,
      userId: user.id,
    })
  }

  private async _generateAndAssignAuthenticationToken(
    login: string,
    validationCode: string
  ): Promise<{ authenticatedApi: MedTechApi, user: User }> {
    const api = await medTechApi()
      .withICureBaseUrl(this.iCureBasePath)
      .withUserName(login)
      .withPassword(validationCode)
      .withCrypto(require('crypto').webcrypto)
      .build()

    const user = await api.userApi.getLoggedUser()
    if (user == null) {
      throw Error(`Your validation code ${validationCode} is expired - Couldn't login new user`)
    }

    const token = await api.userApi.createToken(user.id!, 3600 * 24 * 365 * 10)
    if (token == null) {
      throw Error(`Your validation code ${validationCode} is expired - Couldn't create new secured token`)
    }

    return {
      authenticatedApi: await medTechApi(api).withPassword(token).build(),
      user: user
    }
  }
}

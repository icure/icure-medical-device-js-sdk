import { AuthenticationProcess } from '../../models/AuthenticationProcess'
import { AuthenticationResult } from '../../models/AuthenticationResult'
import { AuthenticationApi } from '../AuthenticationApi'
import { v4 as uuid } from 'uuid'
import { medTechApi, MedTechApi } from '../MedTechApi'
import { MessageGatewayApi } from '../MessageGatewayApi'
import { Notification, NotificationTypeEnum } from '../../models/Notification'
import { Sanitizer } from '../../services/Sanitizer'
import { ErrorHandler } from '../../services/ErrorHandler'
import { KeyStorageFacade, retry, StorageFacade, ua2hex } from '@icure/api'
import { User } from '../../models/User'
import { RecaptchaType } from '../../models/RecaptchaType'
import * as Crypto from 'crypto'
import { KeyPair } from '@icure/api/icc-x-api/crypto/RSA'
import { MedTechCryptoStrategies } from '../../services/MedTechCryptoStrategies'
import { PatientMapper } from '../../mappers/patient'

export class AuthenticationApiImpl implements AuthenticationApi {
  private readonly fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  private readonly iCureBasePath: string
  private readonly authProcessByEmailId: string | undefined
  private readonly authProcessBySmsId: string | undefined
  private readonly messageGatewayApi: MessageGatewayApi
  private readonly errorHandler: ErrorHandler
  private readonly sanitizer: Sanitizer
  private readonly crypto: Crypto
  private readonly storage: StorageFacade<string>
  private readonly keyStorage: KeyStorageFacade
  private readonly cryptoStrategies: MedTechCryptoStrategies

  constructor(
    messageGatewayApi: MessageGatewayApi,
    iCureBasePath: string,
    authProcessByEmailId: string | undefined,
    authProcessBySmsId: string | undefined,
    errorHandler: ErrorHandler,
    sanitizer: Sanitizer,
    crypto: Crypto,
    storage: StorageFacade<string>,
    keyStorage: KeyStorageFacade,
    cryptoStrategies: MedTechCryptoStrategies,
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
    this.crypto = crypto
    this.fetchImpl = fetchImpl
    this.messageGatewayApi = messageGatewayApi
    this.errorHandler = errorHandler
    this.sanitizer = sanitizer
    this.storage = storage
    this.keyStorage = keyStorage
    this.cryptoStrategies = cryptoStrategies
  }

  async startAuthentication(
    recaptcha: string,
    email?: string,
    phoneNumber?: string,
    firstName: string = '',
    lastName: string = '',
    healthcareProfessionalId: string = '',
    bypassTokenCheck: boolean = false,
    validationCodeLength: number = 6,
    recaptchaType: RecaptchaType = 'recaptcha'
  ): Promise<AuthenticationProcess> {
    if (!email && !phoneNumber) {
      throw this.errorHandler.createErrorWithMessage(
        `In order to start authentication of a user, you should at least provide its email OR its phone number`
      )
    }

    if ((!!email && !this.authProcessByEmailId) || (!!phoneNumber && !this.authProcessBySmsId)) {
      throw this.errorHandler.createErrorWithMessage(
        `In order to start a user authentication with an email, you need to instantiate the API with a authProcessByEmailId. If you want to start the authentication with a phone number, then you need to instantiate the API with a authProcessBySmsId`
      )
    }

    const processId = !!email && !!this.authProcessByEmailId ? this.authProcessByEmailId : this.authProcessBySmsId

    const requestId = await this.messageGatewayApi.startProcess(
      processId!,
      {
        'g-recaptcha-response': recaptchaType === 'recaptcha' ? recaptcha : undefined,
        'friendly-captcha-response': recaptchaType === 'friendly-captcha' ? recaptcha : undefined,
        firstName: firstName,
        lastName: lastName,
        from: email != undefined ? this.sanitizer.validateEmail(email) : this.sanitizer.validateMobilePhone(phoneNumber!),
        email: email,
        mobilePhone: phoneNumber,
        hcpId: healthcareProfessionalId,
      },
      validationCodeLength
    )

    if (!!requestId) {
      return new AuthenticationProcess({ requestId, login: (email ?? phoneNumber)!, bypassTokenCheck: bypassTokenCheck })
    }

    throw this.errorHandler.createErrorWithMessage(
      `iCure could not start the authentication process ${processId} for user ${email ?? phoneNumber}. Try again later`
    )
  }

  async completeAuthentication(process: AuthenticationProcess, validationCode: string): Promise<AuthenticationResult> {
    const result = await this.messageGatewayApi.validateProcess(process.requestId, validationCode).catch((e) => {
      if (process.bypassTokenCheck) {
        return true
      }
      throw e
    })

    if (result) {
      return this._initUserAuthTokenAndCrypto(process.login, validationCode)
    }

    throw this.errorHandler.createErrorWithMessage(
      `iCure could not complete authentication process with requestId ${process.requestId}. Try again later.`
    )
  }

  async authenticateAndAskAccessToItsExistingData(userLogin: string, shortLivedToken: string): Promise<AuthenticationResult> {
    const authenticationResult = await this._initUserAuthTokenAndCrypto(userLogin, shortLivedToken)

    const loggedUser = await authenticationResult.medTechApi.userApi.getLoggedUser()
    if (!loggedUser) {
      throw this.errorHandler.createErrorWithMessage(
        `There is no user currently logged in. You must call this method from an authenticated MedTechApi`
      )
    } else if (!!loggedUser.patientId) {
      const patientDataOwner = await authenticationResult.medTechApi.patientApi.getPatientAndTryDecrypt(loggedUser.patientId)
      if (!patientDataOwner)
        throw this.errorHandler.createErrorWithMessage(
          `Impossible to find the patient ${loggedUser.patientId} apparently linked to the user ${loggedUser.id}. Are you sure this patientId is correct ?`
        )

      const delegatesInfo = await authenticationResult.medTechApi.cryptoApi.entities.getDataOwnersWithAccessTo(
        PatientMapper.toPatientDto(patientDataOwner)!
      )
      const delegates = Object.keys(delegatesInfo.permissionsByDataOwnerId)

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
        if (!accessNotification)
          console.error(
            `iCure could not create a notification to healthcare party ${delegate} to ask access back to ${loggedUser.patientId} data. Make sure to create a notification for the healthcare party so that he gives back access to ${loggedUser.patientId} data.`
          )
      }
    } else if (!!loggedUser.healthcarePartyId) {
      const hcpDataOwner = await authenticationResult.medTechApi.healthcareProfessionalApi
        .getHealthcareProfessional(loggedUser.healthcarePartyId)
        .catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
      if (!hcpDataOwner)
        throw this.errorHandler.createErrorWithMessage(
          `Impossible to find the healthcare party ${loggedUser.healthcarePartyId} apparently linked to user ${loggedUser.id}. Are you sure this healthcarePartyId is correct ?`
        )
    } else if (!!loggedUser.deviceId) {
      const hcpDataOwner = await authenticationResult.medTechApi.medicalDeviceApi.getMedicalDevice(loggedUser.deviceId).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
      if (!hcpDataOwner)
        throw this.errorHandler.createErrorWithMessage(
          `Impossible to find the device ${loggedUser.deviceId} apparently linked to the user ${loggedUser.id}. Are you sure this deviceId is correct ?`
        )
    } else {
      throw this.errorHandler.createErrorWithMessage(
        `User with id ${loggedUser.id} is not a Data Owner. To be a Data Owner, your user needs to have either patientId, healthcarePartyId or deviceId filled in`
      )
    }

    return authenticationResult
  }

  private async _initUserAuthTokenAndCrypto(login: string, token: string): Promise<AuthenticationResult> {
    const { authenticatedApi, user } = await retry(() => this._generateAndAssignAuthenticationToken(login, token), 5, 3000)

    const userKeyPairs: KeyPair<string>[] = []
    for (const keyPair of Object.values(authenticatedApi.cryptoApi.userKeysManager.getDecryptionKeys())) {
      userKeyPairs.push({
        publicKey: ua2hex(await authenticatedApi.cryptoApi.primitives.RSA.exportKey(keyPair.publicKey, 'spki')),
        privateKey: ua2hex(await authenticatedApi.cryptoApi.primitives.RSA.exportKey(keyPair.privateKey, 'pkcs8')),
      })
    }

    return new AuthenticationResult({
      medTechApi: authenticatedApi,
      keyPairs: userKeyPairs,
      token: authenticatedApi.password,
      groupId: user.groupId!,
      userId: user.id,
    })
  }

  private async _generateAndAssignAuthenticationToken(login: string, validationCode: string): Promise<{ authenticatedApi: MedTechApi; user: User }> {
    const api = await medTechApi()
      .withICureBaseUrl(this.iCureBasePath)
      .withUserName(login)
      .withPassword(validationCode)
      .withCrypto(this.crypto)
      .withStorage(this.storage)
      .withKeyStorage(this.keyStorage)
      .withCryptoStrategies(this.cryptoStrategies)
      .build()

    const user = await api.userApi.getLoggedUser()
    if (!user) {
      throw this.errorHandler.createErrorWithMessage(
        `Your validation code ${validationCode} expired. Start a new authentication process for your user`
      )
    }

    const token = await api.userApi.createToken(user.id!, 3600 * 24 * 365 * 10)
    if (!token) {
      throw this.errorHandler.createErrorWithMessage(
        `Your validation code ${validationCode} expired. Start a new authentication process for your user`
      )
    }

    return {
      authenticatedApi: await medTechApi(api).withPassword(token).build(),
      user: user,
    }
  }
}

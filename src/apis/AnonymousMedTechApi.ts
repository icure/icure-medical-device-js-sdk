import { AuthenticationApi } from './AuthenticationApi'
import { AuthenticationApiImpl } from './impl/AuthenticationApiImpl'
import { Api, IccCryptoXApi } from '@icure/api'
import { MessageGatewayApiImpl } from './impl/MessageGatewayApiImpl'
import { ErrorHandlerImpl } from '../services/impl/ErrorHandlerImpl'
import { ErrorHandler } from '../services/ErrorHandler'
import { Sanitizer } from '../services/Sanitizer'
import { SanitizerImpl } from '../services/impl/SanitizerImpl'

export class AnonymousMedTechApi {
  private readonly _iCureUrlPath: string
  private readonly _msgGtwUrl: string
  private readonly _msgGtwSpecId: string
  private readonly _authenticationApi: AuthenticationApi
  private readonly _cryptoApi: IccCryptoXApi
  private readonly _errorHandler: ErrorHandler
  private readonly _sanitizer: Sanitizer

  constructor(
    iCureUrlPath: string,
    msgGtwUrl: string,
    msgGtwSpecId: string,
    authProcessByEmailId: string,
    authProcessBySmsId: string,
    api: { cryptoApi: IccCryptoXApi }
  ) {
    this._iCureUrlPath = iCureUrlPath
    this._msgGtwUrl = msgGtwUrl
    this._msgGtwSpecId = msgGtwSpecId

    this._errorHandler = new ErrorHandlerImpl()
    this._sanitizer = new SanitizerImpl(this._errorHandler)

    this._authenticationApi = new AuthenticationApiImpl(
      new MessageGatewayApiImpl(msgGtwUrl, msgGtwSpecId, this._errorHandler, this._sanitizer),
      this._iCureUrlPath,
      authProcessByEmailId,
      authProcessBySmsId,
      this._errorHandler,
      this._sanitizer
    )
    this._cryptoApi = api.cryptoApi
  }

  get cryptoApi(): IccCryptoXApi {
    return this._cryptoApi
  }

  get authenticationApi(): AuthenticationApi {
    return this._authenticationApi
  }
}

export class AnonymousMedTechApiBuilder {
  private iCureUrlPath: string
  private authSpecId: string | undefined
  private msgGtwUrl: string
  private msgGtwSpecId: string | undefined
  private authProcessByEmailId: string | undefined
  private authProcessBySmsId: string | undefined
  private crypto?: Crypto
  private _preventCookieUsage: boolean = false

  constructor() {
    this.iCureUrlPath = 'https://kraken.icure.dev/rest/v2'
    this.msgGtwUrl = 'https://msg-gw.icure.cloud'
    this.msgGtwSpecId = undefined
    this.authSpecId = undefined
    this.authProcessByEmailId = undefined
    this.authProcessBySmsId = undefined
  }

  withICureUrlPath(iCureUrlPath: string): AnonymousMedTechApiBuilder {
    this.iCureUrlPath = iCureUrlPath
    return this
  }

  withMsgGtwUrl(msgGtwUrl: string): AnonymousMedTechApiBuilder {
    this.msgGtwUrl = msgGtwUrl
    return this
  }

  withMsgGtwSpecId(msgGtwSpecId: string): AnonymousMedTechApiBuilder {
    this.msgGtwSpecId = msgGtwSpecId
    return this
  }

  withAuthProcessByEmailId(authProcessByEmailId: string): AnonymousMedTechApiBuilder {
    this.authProcessByEmailId = authProcessByEmailId
    return this
  }

  withAuthProcessBySmsId(authProcessBySmsId: string): AnonymousMedTechApiBuilder {
    this.authProcessBySmsId = authProcessBySmsId
    return this
  }

  withCrypto(crypto: Crypto): AnonymousMedTechApiBuilder {
    this.crypto = crypto
    return this
  }

  preventCookieUsage(): AnonymousMedTechApiBuilder {
    this._preventCookieUsage = true
    return this
  }

  async build(): Promise<AnonymousMedTechApi> {
    return Api(this.iCureUrlPath!, null!, null!, this.crypto, fetch, this._preventCookieUsage).then((api) => {
      if (!this.authProcessByEmailId) {
        throw new Error('authProcessIdByEmail is required')
      }
      if (!this.authProcessBySmsId) {
        throw new Error('authProcessIdBySms is required')
      }
      if (!this.msgGtwSpecId) {
        throw new Error('msgGtwSpecId is required')
      }
      return new AnonymousMedTechApi(this.iCureUrlPath, this.msgGtwUrl, this.msgGtwSpecId, this.authProcessByEmailId, this.authProcessBySmsId, api)
    })
  }
}

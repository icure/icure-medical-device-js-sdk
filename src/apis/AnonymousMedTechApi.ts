import { AuthenticationApi } from './AuthenticationApi'
import { AuthenticationApiImpl } from './impl/AuthenticationApiImpl'
import { Api, IccCryptoXApi, KeyStorageFacade, KeyStorageImpl, LocalStorageImpl, StorageFacade, ua2hex } from '@icure/api'
import { MessageGatewayApiImpl } from './impl/MessageGatewayApiImpl'
import { ErrorHandlerImpl } from '../services/impl/ErrorHandlerImpl'
import { ErrorHandler } from '../services/ErrorHandler'
import { Sanitizer } from '../services/Sanitizer'
import { SanitizerImpl } from '../services/impl/SanitizerImpl'
import { ICURE_CLOUD_URL, MSG_GW_CLOUD_URL } from '../../index'

export class AnonymousMedTechApi {
  private readonly _iCureUrlPath: string
  private readonly _msgGwUrl: string
  private readonly _msgGwSpecId: string
  private readonly _authenticationApi: AuthenticationApi
  private readonly _cryptoApi: IccCryptoXApi
  private readonly _errorHandler: ErrorHandler
  private readonly _sanitizer: Sanitizer

  constructor(
    iCureUrlPath: string,
    msgGwUrl: string,
    msgGwSpecId: string,
    authProcessByEmailId: string,
    authProcessBySmsId: string,
    api: { cryptoApi: IccCryptoXApi },
    storage: StorageFacade<string>,
    keyStorage: KeyStorageFacade
  ) {
    this._iCureUrlPath = iCureUrlPath
    this._msgGwUrl = msgGwUrl
    this._msgGwSpecId = msgGwSpecId

    this._errorHandler = new ErrorHandlerImpl()
    this._sanitizer = new SanitizerImpl(this._errorHandler)

    this._authenticationApi = new AuthenticationApiImpl(
      new MessageGatewayApiImpl(msgGwUrl, msgGwSpecId, this._errorHandler, this._sanitizer),
      this._iCureUrlPath,
      authProcessByEmailId,
      authProcessBySmsId,
      this._errorHandler,
      this._sanitizer,
      api.cryptoApi.crypto,
      storage,
      keyStorage
    )
    this._cryptoApi = api.cryptoApi
  }

  get cryptoApi(): IccCryptoXApi {
    return this._cryptoApi
  }

  get authenticationApi(): AuthenticationApi {
    return this._authenticationApi
  }

  async generateRSAKeypair(): Promise<{ privateKey: string; publicKey: string }> {
    const { publicKey, privateKey } = await this.cryptoApi.RSA.generateKeyPair()
    const publicKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(publicKey, 'spki'))
    const privateKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(privateKey, 'pkcs8'))

    return { privateKey: privateKeyHex, publicKey: publicKeyHex }
  }
}

export class AnonymousMedTechApiBuilder {
  private iCureBaseUrl: string = ICURE_CLOUD_URL
  private msgGwUrl: string = MSG_GW_CLOUD_URL
  private msgGwSpecId?: string
  private authProcessByEmailId?: string
  private authProcessBySmsId?: string
  private _preventCookieUsage: boolean = false
  private crypto?: Crypto
  private storage?: StorageFacade<string>
  private keyStorage?: KeyStorageFacade

  withICureBaseUrl(newICureBaseUrl: string): AnonymousMedTechApiBuilder {
    this.iCureBaseUrl = newICureBaseUrl.search('/rest/v[1-2]') == -1 ? newICureBaseUrl + '/rest/v2' : newICureBaseUrl
    return this
  }

  withMsgGwUrl(msgGwUrl: string): AnonymousMedTechApiBuilder {
    this.msgGwUrl = msgGwUrl
    return this
  }

  withMsgGwSpecId(msgGwSpecId: string): AnonymousMedTechApiBuilder {
    this.msgGwSpecId = msgGwSpecId
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

  withStorage(storage: StorageFacade<string>): AnonymousMedTechApiBuilder {
    this.storage = storage
    return this
  }

  withKeyStorage(keyStorage: KeyStorageFacade): AnonymousMedTechApiBuilder {
    this.keyStorage = keyStorage
    return this
  }

  preventCookieUsage(): AnonymousMedTechApiBuilder {
    this._preventCookieUsage = true
    return this
  }

  async build(): Promise<AnonymousMedTechApi> {
    if (!this.authProcessByEmailId) {
      throw new Error('authProcessIdByEmail is required')
    }
    if (!this.authProcessBySmsId) {
      throw new Error('authProcessIdBySms is required')
    }
    if (!this.msgGwSpecId) {
      throw new Error('msgGtwSpecId is required')
    }

    const _storage = this.storage ?? new LocalStorageImpl()
    const _keyStorage = this.keyStorage ?? new KeyStorageImpl(_storage)

    return Api(this.iCureBaseUrl, null!, null!, this.crypto, fetch, this._preventCookieUsage, undefined, _storage, _keyStorage).then(
      (api) =>
        new AnonymousMedTechApi(
          this.iCureBaseUrl,
          this.msgGwUrl!,
          this.msgGwSpecId!,
          this.authProcessByEmailId!,
          this.authProcessBySmsId!,
          api,
          _storage,
          _keyStorage
        )
    )
  }
}

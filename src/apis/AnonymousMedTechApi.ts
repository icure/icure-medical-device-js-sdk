import { AuthenticationApi } from './AuthenticationApi'
import { AuthenticationApiImpl } from './impl/AuthenticationApiImpl'
import { KeyStorageFacade, KeyStorageImpl, LocalStorageImpl, StorageFacade } from '@icure/api'
import { MessageGatewayApiImpl } from './impl/MessageGatewayApiImpl'
import { ErrorHandlerImpl } from '../services/impl/ErrorHandlerImpl'
import { ErrorHandler } from '../services/ErrorHandler'
import { Sanitizer } from '../services/Sanitizer'
import { SanitizerImpl } from '../services/impl/SanitizerImpl'
import { ICURE_CLOUD_URL, MSG_GW_CLOUD_URL } from '../../index'
import { formatICureApiUrl } from '../util'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { MedTechCryptoStrategies } from '../services/MedTechCryptoStrategies'

export class AnonymousMedTechApi {
  private readonly _iCureUrlPath: string
  private readonly _msgGwUrl: string
  private readonly _msgGwSpecId: string
  private readonly _authenticationApi: AuthenticationApi
  private readonly _errorHandler: ErrorHandler
  private readonly _sanitizer: Sanitizer

  constructor(
    iCureUrlPath: string,
    msgGwUrl: string,
    msgGwSpecId: string,
    authProcessByEmailId: string | undefined,
    authProcessBySmsId: string | undefined,
    storage: StorageFacade<string>,
    keyStorage: KeyStorageFacade,
    private readonly cryptoPrimitives: CryptoPrimitives,
    private readonly cryptoStrategies: MedTechCryptoStrategies
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
      cryptoPrimitives.crypto,
      storage,
      keyStorage,
      this.cryptoStrategies
    )
  }

  get authenticationApi(): AuthenticationApi {
    return this._authenticationApi
  }
}

export class AnonymousMedTechApiBuilder {
  private iCureBaseUrl: string = ICURE_CLOUD_URL
  private msgGwUrl: string = MSG_GW_CLOUD_URL
  private msgGwSpecId?: string
  private authProcessByEmailId?: string
  private authProcessBySmsId?: string
  private crypto?: Crypto
  private storage?: StorageFacade<string>
  private keyStorage?: KeyStorageFacade
  private cryptoStrategies?: MedTechCryptoStrategies

  withICureBaseUrl(newICureBaseUrl: string): AnonymousMedTechApiBuilder {
    this.iCureBaseUrl = formatICureApiUrl(newICureBaseUrl)
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

  withCryptoStrategies(strategies: MedTechCryptoStrategies): AnonymousMedTechApiBuilder {
    this.cryptoStrategies = strategies
    return this
  }

  async build(): Promise<AnonymousMedTechApi> {
    const iCureBaseUrl = this.iCureBaseUrl
    const msgGwUrl = this.msgGwUrl
    const msgGwSpecId = this.msgGwSpecId
    const authProcessByEmailId = this.authProcessByEmailId
    const authProcessBySmsId = this.authProcessBySmsId
    const cryptoStrategies = this.cryptoStrategies
    if (!authProcessByEmailId && !authProcessBySmsId) {
      throw new Error('At least one between authProcessIdBySms and authProcessByEmailId is required')
    }
    if (!msgGwSpecId) {
      throw new Error('msgGtwSpecId is required')
    }
    if (!cryptoStrategies) {
      throw new Error('cryptoStrategies is required')
    }

    const storage = this.storage ?? new LocalStorageImpl()
    const keyStorage = this.keyStorage ?? new KeyStorageImpl(storage)

    return new AnonymousMedTechApi(
      iCureBaseUrl,
      msgGwUrl,
      msgGwSpecId,
      authProcessByEmailId,
      authProcessBySmsId,
      storage,
      keyStorage,
      new CryptoPrimitives(this.crypto),
      cryptoStrategies
    )
  }
}

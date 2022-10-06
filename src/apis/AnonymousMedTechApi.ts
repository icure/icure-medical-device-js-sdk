import { AuthenticationApi } from './AuthenticationApi'
import { AuthenticationApiImpl } from './impl/AuthenticationApiImpl'
import {Api, IccCryptoXApi, ua2hex} from '@icure/api'
import { MessageGatewayApiImpl } from './impl/MessageGatewayApiImpl'
import {ICURE_CLOUD_URL, MSG_GW_CLOUD_URL} from "../../index";

export class AnonymousMedTechApi {
  private readonly _iCureUrlPath: string
  private readonly _msgGwUrl: string
  private readonly _msgGwSpecId: string
  private readonly _authenticationApi: AuthenticationApi
  private readonly _cryptoApi: IccCryptoXApi

  constructor(
    iCureUrlPath: string,
    msgGwUrl: string,
    msgGwSpecId: string,
    authProcessByEmailId: string,
    authProcessBySmsId: string,
    api: { cryptoApi: IccCryptoXApi }
  ) {
    this._iCureUrlPath = iCureUrlPath
    this._msgGwUrl = msgGwUrl
    this._msgGwSpecId = msgGwSpecId

    this._authenticationApi = new AuthenticationApiImpl(
      new MessageGatewayApiImpl(msgGwUrl, msgGwSpecId),
      this._iCureUrlPath,
      authProcessByEmailId,
      authProcessBySmsId
    )
    this._cryptoApi = api.cryptoApi
  }

  get cryptoApi(): IccCryptoXApi {
    return this._cryptoApi
  }

  get authenticationApi(): AuthenticationApi {
    return this._authenticationApi
  }

  async generateRSAKeypair(): Promise<{ privateKey: string, publicKey: string }> {
    const { publicKey, privateKey } = await this.cryptoApi.RSA.generateKeyPair()
    const publicKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(publicKey, 'spki'))
    const privateKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(privateKey, 'pkcs8'))

    return { privateKey: privateKeyHex, publicKey: publicKeyHex}
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

  withICureBaseUrl(newICureBaseUrl: string): AnonymousMedTechApiBuilder {
    this.iCureBaseUrl = (newICureBaseUrl.search('/rest/v[1-2]') == -1) ? newICureBaseUrl + '/rest/v2' : newICureBaseUrl
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

    return Api(this.iCureBaseUrl, null!, null!, this.crypto, fetch, this._preventCookieUsage)
      .then((api) => new AnonymousMedTechApi(this.iCureBaseUrl, this.msgGwUrl!, this.msgGwSpecId!, this.authProcessByEmailId!, this.authProcessBySmsId!, api))
  }
}

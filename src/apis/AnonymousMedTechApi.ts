import {AuthenticationApi} from "./AuthenticationApi";
import {AuthenticationApiImpl} from "./impl/AuthenticationApiImpl";
import {Api, IccCryptoXApi} from "@icure/api";
import {MessageGatewayApiImpl} from "./impl/MessageGatewayApiImpl";

export class AnonymousMedTechApi {
  private readonly _iCureUrlPath: string;
  private readonly _msgGtwUrl: string;
  private readonly _authProcessId: string;
  private readonly _msgGtwSpecId: string;
  private readonly _authenticationApi: AuthenticationApi;
  private readonly _cryptoApi: IccCryptoXApi;

  constructor(
    iCureUrlPath: string,
    msgGtwUrl: string,
    msgGtwSpecId: string,
    authProcessId: string,
    api: { cryptoApi: IccCryptoXApi }
  ) {
    this._iCureUrlPath = iCureUrlPath;
    this._msgGtwUrl = msgGtwUrl;
    this._msgGtwSpecId = msgGtwSpecId;
    this._authProcessId = authProcessId;

    this._authenticationApi = new AuthenticationApiImpl(
      new MessageGatewayApiImpl(msgGtwUrl, msgGtwSpecId),
      this._iCureUrlPath,
      this._msgGtwUrl,
      this._msgGtwSpecId,
      this._authProcessId
    );
    this._cryptoApi = api.cryptoApi;
  }

  get cryptoApi(): IccCryptoXApi {
    return this._cryptoApi;
  }

  get authenticationApi(): AuthenticationApi {
    return this._authenticationApi;
  }
}

export class AnonymousMedTechApiBuilder {
  private iCureUrlPath: string;
  private authSpecId: string | undefined;
  private msgGtwUrl: string;
  private msgGtwSpecId: string | undefined;
  private authProcessId: string | undefined;
  private crypto?: Crypto;
  private _preventCookieUsage: boolean = false;

  constructor() {
    this.iCureUrlPath = "https://kraken.icure.dev/rest/v2";
    this.msgGtwUrl = "https://msg-gw.icure.cloud";
    this.msgGtwSpecId = undefined;
    this.authSpecId = undefined;
    this.authProcessId = undefined;
  }

  withICureUrlPath(iCureUrlPath: string): AnonymousMedTechApiBuilder {
    this.iCureUrlPath = iCureUrlPath;
    return this;
  }

  withMsgGtwUrl(msgGtwUrl: string): AnonymousMedTechApiBuilder {
    this.msgGtwUrl = msgGtwUrl;
    return this;
  }

  withMsgGtwSpecId(msgGtwSpecId: string): AnonymousMedTechApiBuilder {
    this.msgGtwSpecId = msgGtwSpecId;
    return this;
  }

  withAuthSpecId(authSpecId: string): AnonymousMedTechApiBuilder {
    this.authSpecId = authSpecId;
    return this;
  }

  withAuthProcessId(authProcessId: string): AnonymousMedTechApiBuilder {
    this.authProcessId = authProcessId;
    return this;
  }

  withCrypto(crypto: Crypto): AnonymousMedTechApiBuilder {
    this.crypto = crypto;
    return this;
  }

  preventCookieUsage(): AnonymousMedTechApiBuilder {
    this._preventCookieUsage = true;
    return this;
  }

  async build(): Promise<AnonymousMedTechApi> {
    return Api(this.iCureUrlPath!, null!, null!, this.crypto, fetch, this._preventCookieUsage).then( api => {
      if (!this.authProcessId) {
        throw new Error("authProcessId is required");
      }
      if (!this.msgGtwSpecId) {
        throw new Error("msgGtwSpecId is required");
      }
      return new AnonymousMedTechApi(
        this.iCureUrlPath,
        this.msgGtwUrl,
        this.msgGtwSpecId,
        this.authProcessId,
        api
      );
    });
  }
}

import {AuthenticationApi} from "./AuthenticationApi";
import {AuthenticationApiImpl} from "./impl/AuthenticationApiImpl";
import {Api, IccCryptoXApi} from "@icure/api";

export class AnonymousMedTechApi {
  private readonly _iCureUrlPath: string;
  private readonly _authServerUrl: string;
  private readonly _authProcessId: string;
  private readonly _authenticationApi: AuthenticationApi;
  private readonly _cryptoApi: IccCryptoXApi;

  constructor(
    iCureUrlPath: string,
    authServerUrl: string,
    authProcessId: string,
    api: { cryptoApi: IccCryptoXApi }
  ) {
    this._iCureUrlPath = iCureUrlPath;
    this._authServerUrl = authServerUrl;
    this._authProcessId = authProcessId;

    this._authenticationApi = new AuthenticationApiImpl(
      this._iCureUrlPath,
      this._authServerUrl,
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
  private authServerUrl: string;
  private authProcessId: string | undefined;
  private crypto?: Crypto;

  constructor() {
    this.iCureUrlPath = "https://kraken.icure.dev/rest/v2";
    this.authServerUrl = "https://msg-gw.icure.cloud/";
    this.authProcessId = undefined;
  }

  withICureUrlPath(iCureUrlPath: string): AnonymousMedTechApiBuilder {
    this.iCureUrlPath = iCureUrlPath;
    return this;
  }

  withAuthServerUrl(authServerUrl: string): AnonymousMedTechApiBuilder {
    this.authServerUrl = authServerUrl;
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

  async build(): Promise<AnonymousMedTechApi> {
    return Api(this.iCureUrlPath!, null!, null!, this.crypto).then( api => {
      if (!this.authProcessId) {
        throw new Error("authProcessId is required");
      }
      return new AnonymousMedTechApi(
        this.iCureUrlPath,
        this.authServerUrl,
        this.authProcessId,
        api
      );
    });
  }
}

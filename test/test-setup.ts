import {
  bootstrapOssKraken,
  retry,
  setup,
  setupCouchDb,
  checkIfDockerIsOnline,
  bootstrapCloudKraken,
  createGroup,
  createMasterHcp,
  createPatient,
  createHealthcareParty,
  createDevice
} from "@icure/test-setup";
import {Api, Apis, hex2ua} from "@icure/api";
import {webcrypto} from "crypto";

export interface EnvInitializer {
  execute(): void;
}

export interface EnvComponent {
  create(dataOwnerApi: Apis): void;
}

export class SafeguardInitializer implements EnvInitializer {

  private executed = false;

  constructor(
    private initializer?: EnvInitializer
  ) {}

  async execute() {
    if(!!this.initializer && !this.executed) {
      await this.initializer.execute();
      this.executed = true;
    }
  }
}

export class DockerComposeInitializer implements EnvInitializer {

  constructor(
    private couchDbUrl: string,
    private scratchDir: string,
    private compose: string,
    private profiles: string[] = [],
    private initializer?: EnvInitializer
  ) {}

  async execute() {
    if(!!this.initializer) await this.initializer.execute();
    await setup(this.scratchDir, this.compose, this.profiles);
    await setupCouchDb(this.couchDbUrl);
    await retry( async () => {
      if (!(await checkIfDockerIsOnline(this.scratchDir, this.compose))) throw new Error("Docker not ready");
    });
  }

}

export class OssInitializer implements EnvInitializer {

  constructor(
    private initializer: EnvInitializer | null,
    private userId: string,
    private couchDbUrl?: string,
    private login?: string,
    private passwordHash?: string,
  ) {}

  async execute() {
    if(!!this.initializer) await this.initializer.execute();
    await bootstrapOssKraken(this.userId, this.login, this.passwordHash, this.couchDbUrl);
  }

}

export class KrakenInitializer implements EnvInitializer {

  constructor(
    private initializer: EnvInitializer | null,
    private userId: string,
    private couchDbUrl?: string,
    private login?: string,
    private passwordHash?: string,
    private masterGroupId?: string,
    private masterGroupPassword?: string,
  ) {}

  async execute() {
    if(!!this.initializer) await this.initializer.execute();
    await bootstrapCloudKraken(this.userId, this.login, this.passwordHash, this.masterGroupId, this.masterGroupPassword, this.couchDbUrl);
  }
}

export class GroupInitializer implements EnvInitializer {

  constructor(
    private initializer: EnvInitializer | null,
    private adminLogin: string,
    private adminPassword: string,
    private groupId: string,
    private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
    private backendUrl?: string
  ) {}

  async execute() {
    if(!!this.initializer) await this.initializer.execute();
    await createGroup(this.adminLogin, this.adminPassword, this.groupId, this.fetchImpl, this,this.backendUrl);
  }
}

export class NewMasterUserInitializerComposite implements EnvInitializer, EnvComponent {

  private componentLeaves: EnvComponent[] = []

  constructor(
    private initializer: EnvInitializer | null,
    private adminLogin: string,
    private adminPassword: string,
    private groupId: string,
    private backendUrl: string,
    private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  ) {}

  async execute() {
    if(!!this.initializer) await this.initializer.execute();
    const masterCredentials = await createMasterHcp(this.adminLogin, this.adminPassword, this.groupId, this.fetchImpl, this.backendUrl);
    const api = await Api(this.backendUrl, masterCredentials.login, masterCredentials.password, webcrypto as any, fetch);
    api.cryptoApi.RSA.storeKeyPair(masterCredentials.hcpId, {
      publicKey: api.cryptoApi.utils.spkiToJwk(hex2ua(masterCredentials.publicKey)),
      privateKey: api.cryptoApi.utils.pkcs8ToJwk(hex2ua(masterCredentials.privateKey))
    });
    await this.create(api);
  }

  async create(dataOwnerApi: Apis) {
    await Promise.all(this.componentLeaves.map(async (component) => {
      await component.create(dataOwnerApi);
    }))
  }

  add(component: EnvComponent) {
    this.componentLeaves = [...this.componentLeaves, component];
  }
}

export class OldMasterUserInitializerComposite implements EnvInitializer, EnvComponent {

  private componentLeaves: EnvComponent[] = []

  constructor(
    private initializer: EnvInitializer | null,
    private masterLogin: string,
    private masterPassword: string,
    private masterHcpId: string,
    private publicKey: string,
    private privateKey: string,
    private backendUrl: string,
    private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  ) {}

  async execute() {
    if(!!this.initializer) await this.initializer.execute();
    const api = await Api(this.backendUrl, this.masterLogin, this.masterPassword, webcrypto as any, this.fetchImpl);
    api.cryptoApi.RSA.storeKeyPair(this.masterHcpId, {
      publicKey: api.cryptoApi.utils.spkiToJwk(hex2ua(this.publicKey)),
      privateKey: api.cryptoApi.utils.pkcs8ToJwk(hex2ua(this.privateKey))
    });
    await this.create(api);
  }

  async create(dataOwnerApi: Apis) {
    await Promise.all(this.componentLeaves.map(async (component) => {
      await component.create(dataOwnerApi);
    }))
  }

  add(component: EnvComponent) {
    this.componentLeaves = [...this.componentLeaves, component];
  }
}

export class CreatePatientComponent implements EnvComponent {

  constructor(
    private login: string,
    private authToken: string,
    private publicKey: string,
    private privateKey: string,
  ) {}

  async create(dataOwnerApi: Apis) {
    await createPatient(dataOwnerApi, this.login, this.authToken, this.publicKey, this.privateKey);
  }

}

export class CreateHcpComponent implements EnvComponent {

  constructor(
    private login: string,
    private authToken: string,
    private publicKey: string
  ) {}

  async create(dataOwnerApi: Apis) {
    await createHealthcareParty(dataOwnerApi, this.login, this.authToken, this.publicKey);
  }

}

export class createDeviceComponent implements EnvComponent {

  constructor(
    private login: string,
    private authToken: string,
    private publicKey: string
  ) {}

  async create(dataOwnerApi: Apis) {
    await createDevice(dataOwnerApi, this.login, this.authToken, this.publicKey);
  }

}

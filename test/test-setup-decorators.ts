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
import {TestVars, UserDetails} from "./test-utils";

export interface EnvInitializer {
  execute(env: TestVars): Promise<TestVars>;
}

export interface EnvComponent {
  create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}>;
}

export class SafeguardInitializer implements EnvInitializer {

  private testVars: TestVars | undefined;

  constructor(
    private initializer: EnvInitializer
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    if(!this.testVars) {
      this.testVars = await this.initializer.execute(env);
    }
    return this.testVars;
  }
}

export class DockerComposeInitializer implements EnvInitializer {

  constructor(
    private scratchDir: string,
    private profiles: string[] = [],
    private initializer?: EnvInitializer
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    await setup(this.scratchDir, env.composeFileUrl, this.profiles);
    await setupCouchDb(env.couchDbUrl);
    await retry( async () => {
      if (!(await checkIfDockerIsOnline(this.scratchDir, env.composeFileUrl))) throw new Error("Docker not ready");
    });
    return !!updatedEnvs ? updatedEnvs : env;
  }

}

export class OssInitializer implements EnvInitializer {

  constructor(
    private initializer: EnvInitializer | null,
    private passwordHash?: string,
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    await bootstrapOssKraken(env.adminId, env.adminLogin, this.passwordHash, env.couchDbUrl);
    return !!updatedEnvs ? updatedEnvs : env;
  }

}

export class KrakenInitializer implements EnvInitializer {

  constructor(
    private initializer: EnvInitializer | null,
    private passwordHash?: string,
    private masterGroupId?: string,
    private masterGroupPassword?: string,
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    await bootstrapCloudKraken(env.adminId, env.adminLogin, this.passwordHash, this.masterGroupId, this.masterGroupPassword, env.couchDbUrl);
    return !!updatedEnvs ? updatedEnvs : env;
  }
}

export class GroupInitializer implements EnvInitializer {

  constructor(
    private initializer: EnvInitializer | null,
    private groupId: string,
    private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    await createGroup(env.adminLogin, env.adminPassword, this.groupId, this.fetchImpl, env.iCureUrl);
    return !!updatedEnvs ? updatedEnvs : env;
  }
}

export abstract class CreationComposite implements EnvComponent {
  private componentLeaves: { [key: string]: EnvComponent } = {}

  async create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}> {
    return Promise.all(
      Object.keys(this.componentLeaves).map( async (key): Promise<{ [key: string]: UserDetails }> => {
        const result = await this.componentLeaves[key].create(dataOwnerApi);
        return { [key]: result["leafResult"] }
      })
    ).then( (dataOwners) => {
      return dataOwners.reduce(
        (previous, current) => { return {...previous, ...current} },
        {});
    });
  }

  add(component: EnvComponent, label: string) {
    this.componentLeaves = {...this.componentLeaves, [label]: component};
  }

}

export class NewMasterUserInitializerComposite extends CreationComposite implements EnvInitializer {

  constructor(
    private initializer: EnvInitializer | null,
    private groupId: string,
    private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  ) { super(); }

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    const masterCredentials = await createMasterHcp(env.adminLogin, env.adminPassword, this.groupId, this.fetchImpl, env.iCureUrl);
    const api = await Api(env.iCureUrl, masterCredentials.login, masterCredentials.password, webcrypto as any, fetch);
    api.cryptoApi.RSA.storeKeyPair(masterCredentials.hcpId, {
      publicKey: api.cryptoApi.utils.spkiToJwk(hex2ua(masterCredentials.publicKey)),
      privateKey: api.cryptoApi.utils.pkcs8ToJwk(hex2ua(masterCredentials.privateKey))
    });
    const createdUsers = await this.create(api);
    return !!updatedEnvs
      ? {...updatedEnvs, dataOwnerDetails: { ...updatedEnvs.dataOwnerDetails, ...createdUsers }}
      : {...env, dataOwnerDetails: { ...env.dataOwnerDetails, ...createdUsers }}
  }
}

export class OldMasterUserInitializerComposite extends CreationComposite implements EnvInitializer {
  constructor(
    private initializer: EnvInitializer | null,
    private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  ) { super(); }

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    const api = await Api(env.iCureUrl, env.masterHcp?.user!, env.masterHcp?.password!, webcrypto as any, this.fetchImpl);
    api.cryptoApi.RSA.storeKeyPair(env.masterHcpId!, {
      publicKey: api.cryptoApi.utils.spkiToJwk(hex2ua(env.masterHcp?.publicKey!)),
      privateKey: api.cryptoApi.utils.pkcs8ToJwk(hex2ua(env.masterHcp?.privateKey!))
    });
    const createdUsers = await this.create(api);
    return !!updatedEnvs
      ? {...updatedEnvs, dataOwnerDetails: { ...updatedEnvs.dataOwnerDetails, ...createdUsers }}
      : {...env, dataOwnerDetails: { ...env.dataOwnerDetails, ...createdUsers }}
  }
}

export class CreatePatientComponent implements EnvComponent {

  constructor(
    private login: string,
    private authToken: string,
    private publicKey: string,
    private privateKey: string
  ) {}

  async create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}> {
    const details = await createPatient(dataOwnerApi, this.login, this.authToken, this.publicKey, this.privateKey);
    return {
      "leafResult": {
        user: this.login,
        password: details.password,
        publicKey: this.publicKey,
        privateKey: this.privateKey
      }
    }
  }

}

export class CreateHcpComponent implements EnvComponent {

  constructor(
    private login: string,
    private authToken: string,
    private publicKey: string,
    private privateKey: string,
  ) {}

  async create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}> {
    const details = await createHealthcareParty(dataOwnerApi, this.login, this.authToken, this.publicKey);
    return {
      "leafResult": {
        user: this.login,
        password: details.password,
        publicKey: this.publicKey,
        privateKey: this.privateKey
      }
    }
  }

}

export class createDeviceComponent implements EnvComponent {

  constructor(
    private login: string,
    private authToken: string,
    private publicKey: string,
    private privateKey: string,
  ) {}

  async create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}> {
    const details = await createDevice(dataOwnerApi, this.login, this.authToken, this.publicKey);
    return {
      "leafResult": {
        user: this.login,
        password: details.password,
        publicKey: this.publicKey,
        privateKey: this.privateKey
      }
    }
  }

}

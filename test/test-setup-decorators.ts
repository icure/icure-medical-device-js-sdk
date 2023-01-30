import { bootstrapOssKraken, retry, setup, setupCouchDb, checkIfDockerIsOnline, bootstrapCloudKraken } from '@icure/test-setup'
import { Api, Apis, hex2ua, pkcs8ToJwk, spkiToJwk } from '@icure/test-setup-api'
import { webcrypto } from 'crypto'
import { TestVars, UserDetails } from './test-utils'
import { createGroup } from '@icure/test-setup/groups'
import { createDeviceUser, createHealthcarePartyUser, createMasterHcpUser, createPatientUser } from '@icure/test-setup/creation'
import { v4 as uuid } from 'uuid'

/**
 * Base interface for the decorator classes.
 * The execute method gets a set of environment variables and returns a copy that could be modified
 * The steps are executed in a FIFO fashion (the first istantiated is the first executed) except for the
 * SafeguardInitializer
 */
export interface EnvInitializer {
  execute(env: TestVars): Promise<TestVars>
}

/**
 * Base interface for the composite classes
 */
export interface EnvComponent {
  create(dataOwnerApi: Apis): Promise<{ [key: string]: UserDetails }>
}

/**
 * This decorator class ensures that the execute method is called only once.
 * Any other call after the first will only return the variables as modified by the first call.
 */
export class SafeguardInitializer implements EnvInitializer {
  private testVars: TestVars | undefined

  constructor(private initializer: EnvInitializer) {}

  async execute(env: TestVars): Promise<TestVars> {
    if (!this.testVars) {
      this.testVars = await this.initializer.execute(env)
    }
    return this.testVars
  }
}

/**
 * This step calls the original execute method and decorates it by describing the setting used
 */
export class DescribeInitializer implements EnvInitializer {
  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   */
  constructor(private initializer?: EnvInitializer) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : env
    let lines = ['Setting up the test stack using the following options:']
    lines.push(`Launching on: ${updatedEnvs.testEnvironment.toUpperCase()}`)
    if (updatedEnvs.testEnvironment === 'docker') {
      lines.push(`Using docker compose file: ${updatedEnvs.composeFileUrl}`)
    } else {
      lines.push(`With Kraken @ ${updatedEnvs.iCureUrl}`)
      lines.push(`With CouchDB @ ${updatedEnvs.couchDbUrl}`)
      lines.push(`With Message Gateway @ ${updatedEnvs.msgGtwUrl}`)
    }
    if (updatedEnvs.backendType === 'kraken') {
      lines.push(`With group id: ${updatedEnvs.testGroupId}`)
    }
    lines.push(`With backend version ${updatedEnvs.backendType.toUpperCase()}`)
    lines.push(`Using master HCP with login ${updatedEnvs.masterHcp!.user}`)

    const maxLen = lines.reduce(function (previous, current) {
      return current.length > previous ? current.length : previous
    }, 0)
    console.log('#'.repeat(maxLen + 4))
    console.log(`#${' '.repeat(maxLen + 2)}#`)
    lines.forEach((line) => {
      console.log(`# ${line}${' '.repeat(maxLen - line.length)} #`)
    })
    console.log(`#${' '.repeat(maxLen + 2)}#`)
    console.log('#'.repeat(maxLen + 4))
    return updatedEnvs
  }
}

/**
 * This step calls the original execute method and decorates it by setting up the docker with the given parameters.
 */
export class DockerComposeInitializer implements EnvInitializer {
  /**
   * Constructor method
   *
   * @param scratchDir the directory where to save the docker compose file
   * @param profiles the profiles for the docker compose file
   * @param initializer a previous step of the initialization pipeline
   */
  constructor(private scratchDir: string, private profiles: string[] = [], private initializer?: EnvInitializer) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : env
    await setup(this.scratchDir, env.composeFileUrl, ...this.profiles)
    await setupCouchDb(env.couchDbUrl)
    await retry(async () => {
      if (!(await checkIfDockerIsOnline(this.scratchDir, env.composeFileUrl))) throw new Error('Docker not ready')
    })
    return updatedEnvs
  }
}

/**
 * This step calls the original execute method and then decorates it by initializing the OSS Kraken
 */
export class OssInitializer implements EnvInitializer {
  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param passwordHash the password hash for the admin user
   */
  constructor(private initializer: EnvInitializer | null, private passwordHash?: string) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : env
    await bootstrapOssKraken(uuid(), env.adminLogin, this.passwordHash, env.couchDbUrl)
    return updatedEnvs
  }
}

/**
 * This step calls the original execute method and decorates it by initializing the Kraken
 */
export class KrakenInitializer implements EnvInitializer {
  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param passwordHash the password hash for the admin user
   * @param masterGroupId the master group id
   * @param masterGroupPassword the master group password
   */
  constructor(
    private initializer: EnvInitializer | null,
    private passwordHash?: string,
    private masterGroupId?: string,
    private masterGroupPassword?: string
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : env
    await bootstrapCloudKraken(uuid(), env.adminLogin, this.passwordHash, this.masterGroupId, this.masterGroupPassword, env.couchDbUrl)
    return updatedEnvs
  }
}

/**
 * This step calls the original execute method and then decorates it by creating a group.
 */
export class GroupInitializer implements EnvInitializer {
  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param fetchImpl an implementation of the fetch method
   */
  constructor(private initializer: EnvInitializer | null, private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : env
    const api = await Api(updatedEnvs.iCureUrl, updatedEnvs.adminLogin, updatedEnvs.adminPassword, webcrypto as any, this.fetchImpl)
    const doesGroupExists = await api.groupApi.getGroup(updatedEnvs.testGroupId).catch(() => null)
    if (!doesGroupExists) {
      await createGroup(api, updatedEnvs.testGroupId)
    }
    return updatedEnvs
  }
}

/**
 * This step calls the original execute method and then decorates it by creating a new master HCP user in the test group.
 */
export class MasterUserInGroupInitializer implements EnvInitializer {
  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param fetchImpl an implementation of the fetch method
   */
  constructor(private initializer: EnvInitializer | null, private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : env
    const masterCredentials = await createMasterHcpUser(
      updatedEnvs.adminLogin,
      updatedEnvs.adminPassword,
      updatedEnvs.testGroupId,
      this.fetchImpl,
      updatedEnvs.iCureUrl
    )
    return {
      ...updatedEnvs,
      masterHcp: {
        user: masterCredentials.login,
        password: masterCredentials.password,
        publicKey: masterCredentials.publicKey,
        privateKey: masterCredentials.privateKey,
      },
    }
  }
}

/**
 * This step calls the original execute method and then decorates it by creating a new master HCP user that is not in a group.
 */
export class MasterUserInitializer implements EnvInitializer {
  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param fetchImpl an implementation of the fetch method
   */
  constructor(private initializer: EnvInitializer | null, private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : env
    const api = await Api(env.iCureUrl, env.adminLogin, env.adminPassword, webcrypto as any, this.fetchImpl)
    const masterLogin = `master-${uuid().substring(0, 8)}@icure.com`
    const masterCredentials = await createHealthcarePartyUser(api, masterLogin, uuid())
    return {
      ...updatedEnvs,
      masterHcp: {
        user: masterCredentials.login,
        password: masterCredentials.password,
        publicKey: masterCredentials.publicKey,
        privateKey: masterCredentials.privateKey,
      },
    }
  }
}

/**
 * This class is part both of the composite and the decorator hierarchy.
 * It calls the original execute method, then decorates it by creating an instance of the ICC API for an existing
 * master HCP with the credentials passed in the env parameter, and finally use the master HCP to create all the other
 * users passed in the add method of the composite.
 */
export class UserInitializerComposite implements EnvInitializer, EnvComponent {
  private components: EnvComponent[] = []

  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param fetchImpl an implementation of the fetch method
   */
  constructor(private initializer: EnvInitializer | null, private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : env
    const api = await Api(updatedEnvs.iCureUrl, updatedEnvs.masterHcp?.user!, updatedEnvs.masterHcp?.password!, webcrypto as any, this.fetchImpl)
    const masterUser = await api.userApi.getUserByEmail(updatedEnvs.masterHcp?.user!)
    const jwk = {
      publicKey: spkiToJwk(hex2ua(updatedEnvs.masterHcp!.publicKey!)),
      privateKey: pkcs8ToJwk(hex2ua(updatedEnvs.masterHcp!.privateKey!)),
    }
    await api.cryptoApi.cacheKeyPair(jwk)
    await api.cryptoApi.keyStorage.storeKeyPair(`${masterUser.healthcarePartyId}.${updatedEnvs.masterHcp!.publicKey.slice(-32)}`, jwk)
    const createdUsers = await this.create(api)
    return { ...updatedEnvs, dataOwnerDetails: { ...updatedEnvs.dataOwnerDetails, ...createdUsers } }
  }

  /**
   * The create methods calls all the create methods of the components, await for all of them to be finished and then
   * combines the results in a single object.
   *
   * @param dataOwnerApi an instance of the ICC Api capable of creating all types of users
   */
  async create(dataOwnerApi: Apis): Promise<{ [key: string]: UserDetails }> {
    return Promise.all(
      this.components.map(async (component): Promise<{ [key: string]: UserDetails }> => {
        const result = await component.create(dataOwnerApi)
        return { [Object.keys(result)[0]]: result[Object.keys(result)[0]] }
      })
    ).then((dataOwners) => {
      return dataOwners.reduce((previous, current) => {
        return { ...previous, ...current }
      }, {})
    })
  }

  /**
   * Adds one component to the components list
   *
   * @param component the component to add
   */
  add(component: EnvComponent) {
    this.components = [...this.components, component]
  }
}

/**
 * Component class to create a new Patient User
 */
export class CreatePatientComponent implements EnvComponent {
  /**
   * Constructor method
   *
   * @param login the login for the user
   * @param authToken the value for the authentication token. NOTE: If you are using the Kraken OSS version, this value won't be taken into account
   * @param publicKey the public key for the user
   * @param privateKey the private key for the user
   */
  constructor(
    private login: string,
    private authToken: string = uuid(),
    private publicKey?: string | undefined,
    private privateKey?: string | undefined
  ) {}

  async create(dataOwnerApi: Apis): Promise<{ [key: string]: UserDetails }> {
    const details = await createPatientUser(
      dataOwnerApi,
      this.login,
      this.authToken,
      this.publicKey,
      this.privateKey,
      dataOwnerApi.patientApi.fetchImpl,
      dataOwnerApi.patientApi.host
    )
    return {
      [this.login]: {
        user: details.login,
        password: details.password,
        publicKey: details.publicKey,
        privateKey: details.privateKey,
      },
    }
  }
}

/**
 * Component class to create a new HCP User
 */
export class CreateHcpComponent implements EnvComponent {
  /**
   * Constructor method
   *
   * @param login the login for the user
   * @param authToken the value for the authentication token. NOTE: If you are using the Kraken OSS version, this value won't be taken into account
   * @param publicKey the public key for the user
   * @param privateKey the private key for the user
   */
  constructor(
    private login: string,
    private authToken: string = uuid(),
    private publicKey?: string | undefined,
    private privateKey?: string | undefined
  ) {}

  async create(dataOwnerApi: Apis): Promise<{ [key: string]: UserDetails }> {
    const details = await createHealthcarePartyUser(dataOwnerApi, this.login, this.authToken, this.publicKey, this.privateKey)
    return {
      [this.login]: {
        user: details.login,
        password: details.password,
        publicKey: details.publicKey,
        privateKey: details.privateKey,
      },
    }
  }
}

/**
 * Component class to create a new Device User
 */
export class createDeviceComponent implements EnvComponent {
  /**
   * Constructor method
   *
   * @param login the login for the user
   * @param authToken the value for the authentication token. NOTE: If you are using the Kraken OSS version, this value won't be taken into account
   * @param publicKey the public key for the user
   * @param privateKey the private key for the user
   */
  constructor(
    private login: string,
    private authToken: string = uuid(),
    private publicKey?: string | undefined,
    private privateKey?: string | undefined
  ) {}

  async create(dataOwnerApi: Apis): Promise<{ [key: string]: UserDetails }> {
    const details = await createDeviceUser(dataOwnerApi, this.login, this.authToken, this.publicKey, this.privateKey)
    return {
      [this.login]: {
        user: details.login,
        password: details.password,
        publicKey: details.publicKey,
        privateKey: details.privateKey,
      },
    }
  }
}

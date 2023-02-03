import { medTechApi, MedTechApi, MedTechApiBuilder } from '../src/apis/MedTechApi'
import { User } from '../src/models/User'
import { webcrypto } from 'crypto'
import { KeyStorageFacade, sleep, StorageFacade } from '@icure/api'
import { AnonymousMedTechApiBuilder } from '../src/apis/AnonymousMedTechApi'
import axios, { Method } from 'axios'
import { Patient, PotentiallyEncryptedPatient } from '../src/models/Patient'
import { assert, expect } from 'chai'
import { HealthcareElement } from '../src/models/HealthcareElement'
import { Content } from '../src/models/Content'
import { DataSample } from '../src/models/DataSample'
import { CodingReference } from '../src/models/CodingReference'
import { tmpdir } from 'os'
import { TextDecoder, TextEncoder } from 'util'
import { EmailMessage, EmailMessageFactory } from '../src/utils/msgGtwMessageFactory'
import { HealthcareProfessional } from '../src/models/HealthcareProfessional'
import { v4 as uuid } from 'uuid'
import {
  CreateHcpComponent,
  CreatePatientComponent,
  DescribeInitializer,
  DockerComposeInitializer,
  EnvInitializer,
  GroupInitializer,
  KrakenInitializer,
  MasterUserInGroupInitializer,
  MasterUserInitializer,
  OssInitializer,
  SafeguardInitializer,
  UserInitializerComposite,
} from './test-setup-decorators'
import { checkIfDockerIsOnline } from '@icure/test-setup'
import { SimpleMedTechCryptoStrategies } from '../src/services/impl/SimpleMedTechCryptoStrategies'
import { Address } from '../src/models/Address'
import { Telecom } from '../src/models/Telecom'

let cachedHcpApi: MedTechApi | undefined
let cachedHcpLoggedUser: User | undefined
let cachedPatient: Patient | undefined
let cachedHealthcareElement: HealthcareElement | undefined
let cachedInitializer: EnvInitializer | undefined

export function getTempEmail(): string {
  return `${uuid().substring(0, 8)}@icure.com`
}

export function setLocalStorage(fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
  ;(global as any).localStorage = new (require('node-localstorage').LocalStorage)(tmpdir(), 5 * 1024 ** 3)
  ;(global as any).fetch = fetch
  ;(global as any).Storage = ''
  ;(global as any).TextDecoder = TextDecoder
  ;(global as any).TextEncoder = TextEncoder
  ;(global as any).headers = Headers
}

export type UserDetails = {
  user: string
  password: string
  publicKey: string
  privateKey: string
}

export type TestVars = {
  iCureUrl: string
  msgGtwUrl: string
  couchDbUrl: string
  composeFileUrl: string
  patAuthProcessId: string
  hcpAuthProcessId: string
  specId: string
  testEnvironment: string
  testGroupId: string
  backendType: string
  adminLogin: string
  adminPassword: string
  masterHcp: UserDetails | undefined
  dataOwnerDetails: { [key: string]: UserDetails }
}

export function getEnvVariables(): TestVars {
  const masterHcpDetails =
    !!process.env.ICURE_TEST_MASTER_LOGIN &&
    !!process.env.ICURE_TEST_MASTER_PWD &&
    !!process.env.ICURE_TEST_MASTER_PRIV &&
    !!process.env.ICURE_TEST_MASTER_PUB
      ? {
          user: process.env.ICURE_TEST_MASTER_LOGIN!,
          password: process.env.ICURE_TEST_MASTER_PWD!,
          privateKey: process.env.ICURE_TEST_MASTER_PRIV!,
          publicKey: process.env.ICURE_TEST_MASTER_PUB!,
        }
      : undefined
  const testGroupId = process.env.ICURE_TEST_GROUP_ID ?? 'test-group'
  return {
    iCureUrl: process.env.ICURE_TS_TEST_URL ?? 'http://127.0.0.1:16044/rest/v1',
    msgGtwUrl: process.env.ICURE_TS_TEST_MSG_GTW_URL ?? 'http://127.0.0.1:8081/msggtw',
    couchDbUrl: process.env.ICURE_COUCHDB_URL ?? 'http://127.0.0.1:15984',
    composeFileUrl: process.env.COMPOSE_FILE_URL ?? 'https://raw.githubusercontent.com/icure/icure-e2e-test-setup/master/docker-compose-cloud.yaml',
    patAuthProcessId: process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ?? `patient${testGroupId}`,
    hcpAuthProcessId: process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ?? `hcp${testGroupId}`,
    specId: process.env.ICURE_TS_TEST_MSG_GTW_SPEC_ID ?? 'ic',
    testEnvironment: process.env.TEST_ENVIRONMENT ?? 'docker',
    testGroupId: testGroupId,
    backendType: process.env.BACKEND_TYPE ?? 'kraken',
    adminLogin: process.env.ICURE_TEST_ADMIN_LOGIN ?? 'john',
    adminPassword: process.env.ICURE_TEST_ADMIN_PWD ?? 'LetMeIn',
    masterHcp: masterHcpDetails,
    dataOwnerDetails: {},
  }
}

export const hcp1Username = process.env.ICURE_TS_TEST_HCP_USER ?? getTempEmail()
export const hcp2Username = process.env.ICURE_TS_TEST_HCP_2_USER ?? getTempEmail()
export const hcp3Username = process.env.ICURE_TS_TEST_HCP_3_USER ?? getTempEmail()
export const patUsername = process.env.ICURE_TS_TEST_PAT_USER ?? getTempEmail()
const registerThrottlingLimit = 10000

export class ICureTestEmail implements EmailMessageFactory {
  dataOwner: HealthcareProfessional | Patient
  link: string
  patient: Patient

  constructor(patient: Patient) {
    this.dataOwner = new HealthcareProfessional({})
    this.link = 'test'
    this.patient = patient
  }

  get(recipient: User, recipientPassword: string): EmailMessage {
    return {
      from: 'nobody@nowhere.boh',
      subject: `${recipient.login}|${recipientPassword}`,
      html: `User: ${recipient.id}`,
    }
  }
}

export async function getEnvironmentInitializer(): Promise<EnvInitializer> {
  if (!cachedInitializer) {
    const env = getEnvVariables()
    const scratchDir = 'test/scratch'
    const isDockerOnline = await checkIfDockerIsOnline(scratchDir, env.composeFileUrl)
    let bootstrapStep = null
    if (env.testEnvironment === 'docker' && !isDockerOnline) {
      const setupStep = new DockerComposeInitializer(scratchDir, ['mock'])
      bootstrapStep = env.backendType === 'oss' ? new OssInitializer(setupStep) : new KrakenInitializer(setupStep)
    }
    const groupStep = env.backendType === 'oss' ? bootstrapStep : new GroupInitializer(bootstrapStep, fetch)
    const masterInitializerClass = env.backendType === 'kraken' ? MasterUserInGroupInitializer : MasterUserInitializer
    const masterStep = !!env.masterHcp ? groupStep : new masterInitializerClass(groupStep, fetch)
    const creationStep = new UserInitializerComposite(masterStep, fetch)
    creationStep.add(new CreateHcpComponent(hcp1Username))
    creationStep.add(new CreateHcpComponent(hcp2Username))
    creationStep.add(new CreateHcpComponent(hcp3Username))
    creationStep.add(new CreatePatientComponent(patUsername))
    const explanationStep = new DescribeInitializer(creationStep)
    cachedInitializer = new SafeguardInitializer(explanationStep)
  }
  return cachedInitializer
}

function returnWithinBoundaries(element: number, upperBound: number, lowerBound: number): number {
  if (element <= upperBound && element >= lowerBound) return element
  else if (element > upperBound) return upperBound
  if (element <= upperBound && element >= lowerBound) return element
  else if (element > upperBound) return upperBound
  else return lowerBound
}

export class TestUtils {
  private static registerAverageWait = 10000
  private static lastRegisterCall = 0

  static async createDefaultPatient(medTechApi: MedTechApi): Promise<Patient> {
    return medTechApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'John',
        lastName: 'Snow',
        note: 'Winter is coming',
      })
    )
  }

  static async createMedTechApiAndLoggedUserFor(
    iCureUrl: string,
    credentials: UserDetails,
    additionalBuilderSteps: (b: MedTechApiBuilder) => MedTechApiBuilder = (b) => b
  ): Promise<{ api: MedTechApi; user: User }> {
    const builderApi = medTechApi()
      .withICureBaseUrl(iCureUrl)
      .withUserName(credentials.user)
      .withPassword(credentials.password)
      .withCrypto(webcrypto as any)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([{ privateKey: credentials.privateKey, publicKey: credentials.publicKey }]))
    const medtechApi = await additionalBuilderSteps(builderApi).build()

    const foundUser = await medtechApi.userApi.getLoggedUser()

    return { api: medtechApi, user: foundUser }
  }

  static async createApiForNewPatient(
    inviter: MedTechApi,
    env: TestVars
  ): Promise<{
    api: MedTechApi
    user: User
  }> {
    const hcpApi = await medTechApi(inviter)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withAuthProcessByEmailId(env!.patAuthProcessId)
      .withAuthProcessBySmsId(env!.patAuthProcessId)
      .build()
    const email = getTempEmail()
    const patientNote = 'He is moon knight'
    const newPatient = await hcpApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Patient',
        lastName: 'User',
        note: patientNote,
        addresses: [
          new Address({
            addressType: 'home',
            description: 'London',
            telecoms: [
              new Telecom({
                telecomType: 'email',
                telecomNumber: email,
              }),
            ],
          }),
        ],
      })
    )

    const messageFactory = new ICureTestEmail(newPatient)
    await hcpApi.userApi.createAndInviteUser(newPatient, messageFactory, 3600)

    // And PAT_1 accepts this invitation and changes his credentials
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.patAuthProcessId)
      .withAuthProcessBySmsId(env!.patAuthProcessId)
      .build()

    const loginAndPassword = (await TestUtils.getEmail(email)).subject!

    // When PAT_1 generates a key pair for himself
    // Then maintenance task is created for HCP_1 in order to give back access to PAT_1 to his data
    // Then PAT_1 is able to log as a user
    const authResult = await anonymousMedTechApi.authenticationApi.authenticateAndAskAccessToItsExistingData(
      loginAndPassword.split('|')[0],
      loginAndPassword.split('|')[1]
    )

    return {
      api: authResult.medTechApi,
      user: await authResult.medTechApi.userApi.getLoggedUser(),
    }
  }

  static async getEmail(email: string): Promise<any> {
    const { msgGtwUrl, specId } = getEnvVariables()
    const emailOptions = {
      method: 'GET' as Method,
      url: `${msgGtwUrl}/${specId}/lastEmail/${email}`,
    }
    const { data: response } = await axios.request(emailOptions)
    return response
  }

  static async signUpUserUsingEmail(
    iCureUrl: string,
    msgGtwUrl: string,
    msgGtwSpecId: string,
    authProcessId: string,
    hcpId: string,
    storage?: StorageFacade<string>,
    keyStorage?: KeyStorageFacade
  ): Promise<{ api: MedTechApi; user: User; token: string }> {
    if (new Date().getTime() - this.lastRegisterCall < registerThrottlingLimit) {
      const throttlingWait = returnWithinBoundaries(
        (registerThrottlingLimit - this.registerAverageWait) * 5 - this.registerAverageWait,
        registerThrottlingLimit,
        0
      )
      await sleep(throttlingWait)
      this.registerAverageWait = this.registerAverageWait + (throttlingWait - this.registerAverageWait) / 5
    }
    this.lastRegisterCall = new Date().getTime()

    const builder = new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(iCureUrl)
      .withMsgGwUrl(msgGtwUrl)
      .withMsgGwSpecId(msgGtwSpecId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(authProcessId)
      .withAuthProcessBySmsId(authProcessId)

    if (storage) {
      builder.withStorage(storage)
    }

    if (keyStorage) {
      builder.withKeyStorage(keyStorage)
    }

    const anonymousMedTechApi = await builder.build()

    const email = getTempEmail()
    const process = await anonymousMedTechApi.authenticationApi.startAuthentication(
      'a58afe0e-02dc-431b-8155-0351140099e4',
      email,
      undefined,
      'Antoine',
      'Duchâteau',
      hcpId,
      false,
      8
    )

    const emails = await TestUtils.getEmail(email)

    const subjectCode = emails.subject!

    //assert(subjectCode.length === 8, 'The subject code should be 8 characters long')

    const result = await anonymousMedTechApi.authenticationApi.completeAuthentication(process!, subjectCode)

    if (result?.medTechApi == undefined) {
      throw Error(`Couldn't sign up user by email for current test`)
    }

    const foundUser = await result.medTechApi.userApi.getLoggedUser()
    assert(result)
    assert(result!.token != null)
    assert(result!.userId != null)

    return { api: result.medTechApi, user: foundUser, token: result.token }
  }

  static async getOrCreateHcpApiAndLoggedUser(iCureUrl: string, credentials: UserDetails): Promise<{ api: MedTechApi; user: User }> {
    if (cachedHcpApi == undefined && cachedHcpLoggedUser == undefined) {
      const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, credentials)
      cachedHcpApi = apiAndUser.api
      cachedHcpLoggedUser = apiAndUser.user
    }

    return { api: cachedHcpApi!, user: cachedHcpLoggedUser! }
  }

  static async getOrCreatePatient(medtechApi: MedTechApi): Promise<Patient> {
    if (cachedPatient == undefined) {
      cachedPatient = await medtechApi.patientApi.createOrModifyPatient(
        new Patient({
          firstName: 'John',
          lastName: 'Snow',
          note: 'Winter is coming',
        })
      )
    }
    return cachedPatient
  }

  static async getOrCreateHealthElement(medtechApi: MedTechApi, patient: Patient): Promise<HealthcareElement> {
    if (cachedHealthcareElement == undefined) {
      cachedHealthcareElement = await medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
        new HealthcareElement({
          note: 'Hero Syndrome',
        }),
        patient!.id!
      )
    }
    return cachedHealthcareElement
  }

  static createDataSampleForPatient(medtechApi: MedTechApi, patient: Patient) {
    return medtechApi.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST' })]),
        content: { en: new Content({ stringValue: 'Hello world' }) },
      })
    )
  }

  static createDataSampleForPatientWithId(medtechApi: MedTechApi, patientId: string) {
    return medtechApi.dataSampleApi.createOrModifyDataSampleFor(
      patientId!,
      new DataSample({
        labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST' })]),
        content: { en: new Content({ stringValue: 'Hello world' }) },
      })
    )
  }

  static createDataSamplesForPatient(medtechApi: MedTechApi, patient: Patient) {
    return medtechApi.dataSampleApi.createOrModifyDataSamplesFor(patient.id!, [
      new DataSample({
        labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST' })]),
        content: { en: new Content({ stringValue: 'Hello world' }) },
      }),
      new DataSample({
        labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST' })]),
        content: { en: new Content({ stringValue: 'Good night world' }) },
      }),
    ])
  }

  static createHealthElementForPatient(medtechApi: MedTechApi, patient: PotentiallyEncryptedPatient) {
    return medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({
        note: 'Hero Syndrome',
      }),
      patient.id!
    )
  }

  static async retrieveHealthcareElementAndExpectError(api: MedTechApi, healthcareElementId: string) {
    try {
      await api.healthcareElementApi.getHealthcareElement(healthcareElementId)
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect(!!e)
    }
  }

  static async retrieveHealthcareElementAndExpectSuccess(api: MedTechApi, healthcareElementId: string) {
    const retrievedHC = await api.healthcareElementApi.getHealthcareElement(healthcareElementId)
    expect(!!retrievedHC).to.eq(true)
    expect(retrievedHC.id).to.eq(healthcareElementId)
  }

  static async retrieveDataSampleAndExpectError(api: MedTechApi, dataSampleId: string) {
    try {
      await api.dataSampleApi.getDataSample(dataSampleId)
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect(!!e)
    }
  }

  static async retrieveDataSampleAndExpectSuccess(api: MedTechApi, dataSampleId: string) {
    const retrievedDataSample = await api.dataSampleApi.getDataSample(dataSampleId)
    expect(!!retrievedDataSample).to.eq(true)
    expect(retrievedDataSample.id).to.eq(dataSampleId)
  }
}

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
import { RecaptchaType } from '../src/models/RecaptchaType'
import { testStorageWithKeys } from './TestStorage'
import { DefaultStorageEntryKeysFactory } from '@icure/api/icc-x-api/storage/DefaultStorageEntryKeysFactory'
import { EnvInitializer } from '@icure/test-setup/decorators'
import { getEnvVariables, UserDetails } from '@icure/test-setup/types'
import { TestEnvironmentBuilder } from '@icure/test-setup/builder'
import { SimpleMedTechCryptoStrategies } from '../src/services/impl/SimpleMedTechCryptoStrategies'
import { DataOwnerTypeEnum } from '../src/models/DataOwner'

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
    const baseEnvironment =
      env.testEnvironment === 'docker' ? new TestEnvironmentBuilder().setUpDockerEnvironment(scratchDir, ['mock']) : new TestEnvironmentBuilder()
    cachedInitializer = await baseEnvironment
      .withGroup(fetch)
      .withMasterUser(fetch)
      .addHcp({ login: hcp1Username })
      .addHcp({ login: hcp2Username })
      .addHcp({ login: hcp3Username })
      .addPatient({ login: patUsername })
      .withSafeguard()
      .withEnvironmentSummary()
      .withUsersSummary()
      .build()
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
    const storage = await testStorageWithKeys(new DefaultStorageEntryKeysFactory(), [
      {
        dataOwnerId: credentials.dataOwnerId,
        pairs: [{ keyPair: { publicKey: credentials.publicKey, privateKey: credentials.privateKey } }],
      },
    ])
    const builderApi = medTechApi()
      .withICureBaseUrl(iCureUrl)
      .withUserName(credentials.user)
      .withPassword(credentials.password)
      .withCrypto(webcrypto as any)
      .withStorage(storage.storage)
      .withKeyStorage(storage.keyStorage)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
    const medtechApi = await additionalBuilderSteps(builderApi).build()

    const foundUser = await medtechApi.userApi.getLoggedUser()

    return { api: medtechApi, user: foundUser }
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

  static async getSMS(phoneNumber: string): Promise<any> {
    const { msgGtwUrl, specId } = getEnvVariables()
    const smsOptions = {
      method: 'GET' as Method,
      url: `${msgGtwUrl}/${specId}/lastSMS/${phoneNumber}`,
    }
    const { data: response } = await axios.request(smsOptions)
    return response
  }

  static async signUpUserUsingEmail(
    iCureUrl: string,
    msgGtwUrl: string,
    msgGtwSpecId: string,
    authProcessId: string,
    hcpId: string,
    recaptcha: string,
    recaptchaType: RecaptchaType,
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
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))

    if (storage) {
      builder.withStorage(storage)
    }

    if (keyStorage) {
      builder.withKeyStorage(keyStorage)
    }

    const anonymousMedTechApi = await builder.build()

    const email = getTempEmail()
    const process = await anonymousMedTechApi.authenticationApi.startAuthentication(
      recaptcha,
      email,
      undefined,
      'Antoine',
      'Duchâteau',
      hcpId,
      false,
      8,
      recaptchaType
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

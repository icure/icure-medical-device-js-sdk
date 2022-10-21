import { medTechApi, MedTechApi } from '../src/apis/MedTechApi'
import { User } from '../src/models/User'
import { webcrypto } from 'crypto'
import { hex2ua, KeyStorageFacade, StorageFacade } from '@icure/api'
import { AnonymousMedTechApiBuilder } from '../src/apis/AnonymousMedTechApi'
import axios, { Method } from 'axios'
import { Patient } from '../src/models/Patient'
import { assert, expect } from 'chai'
import { HealthcareElement } from '../src/models/HealthcareElement'
import { DataSample } from '../src/models/DataSample'
import { CodingReference } from '../src/models/CodingReference'
import { tmpdir } from 'os'
import { TextDecoder, TextEncoder } from 'util'
import { EmailMessage, EmailMessageFactory } from '../src/utils/msgGtwMessageFactory'
import { HealthcareProfessional } from '../src/models/HealthcareProfessional'
import { v4 as uuid } from 'uuid'
import { ICURE_FREE_URL } from '../index'

let cachedHcpApi: MedTechApi | undefined
let cachedHcpLoggedUser: User | undefined
let cachedPatient: Patient | undefined
let cachedHealthcareElement: HealthcareElement | undefined

export function setLocalStorage(fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
  ;(global as any).localStorage = new (require('node-localstorage').LocalStorage)(tmpdir(), 5 * 1024 ** 3)
  ;(global as any).fetch = fetch
  ;(global as any).Storage = ''
  ;(global as any).TextDecoder = TextDecoder
  ;(global as any).TextEncoder = TextEncoder
  ;(global as any).headers = Headers
}

export type TestVars = {
  iCureUrl: string
  msgGtwUrl: string
  patAuthProcessId: string
  authProcessHcpId: string
  specId: string
  hcpUserName: string
  hcpPassword: string
  hcpPrivKey: string
  patUserName: string
  patPassword: string
  patPrivKey: string
  hcp2UserName: string
  hcp2Password: string
  hcp2PrivKey: string
  hcp3UserName: string
  hcp3Password: string
  hcp3PrivKey: string
}

export function getEnvVariables(): TestVars {
  return {
    iCureUrl: process.env.ICURE_TS_TEST_URL ?? 'https://kraken.icure.dev/rest/v1',
    msgGtwUrl: process.env.ICURE_TS_TEST_MSG_GTW_URL ?? 'https://msg-gw.icure.cloud',
    patAuthProcessId: process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ?? '6a355458dbfa392cb5624403190c39e5',
    authProcessHcpId: process.env.ICURE_TS_TEST_AUTH_PROCESS_HCP_ID!,
    specId: process.env.ICURE_TS_TEST_MSG_GTW_SPEC_ID ?? 'ic',
    hcpUserName: process.env.ICURE_TS_TEST_HCP_USER!,
    hcpPassword: process.env.ICURE_TS_TEST_HCP_PWD!,
    hcpPrivKey: process.env.ICURE_TS_TEST_HCP_PRIV_KEY!,
    patUserName: process.env.ICURE_TS_TEST_PAT_USER!,
    patPassword: process.env.ICURE_TS_TEST_PAT_PWD!,
    patPrivKey: process.env.ICURE_TS_TEST_PAT_PRIV_KEY!,
    hcp2UserName: process.env.ICURE_TS_TEST_HCP_2_USER!,
    hcp2Password: process.env.ICURE_TS_TEST_HCP_2_PWD!,
    hcp2PrivKey: process.env.ICURE_TS_TEST_HCP_2_PRIV_KEY!,
    hcp3UserName: process.env.ICURE_TS_TEST_HCP_3_USER!,
    hcp3Password: process.env.ICURE_TS_TEST_HCP_3_PWD!,
    hcp3PrivKey: process.env.ICURE_TS_TEST_HCP_3_PRIV_KEY!,
  }
}

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

export class TestUtils {
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
    userName: string,
    password: string,
    dataOwnerKey: string
  ): Promise<{ api: MedTechApi; user: User }> {
    const medtechApi = await medTechApi()
      .withICureBaseUrl(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build()

    const foundUser = await medtechApi.userApi.getLoggedUser()
    await medtechApi.cryptoApi
      .loadKeyPairsAsTextInBrowserLocalStorage(foundUser.healthcarePartyId ?? foundUser.patientId ?? foundUser.deviceId!, hex2ua(dataOwnerKey))
      .catch((error: any) => {
        console.error('Error: in loadKeyPairsAsTextInBrowserLocalStorage')
        console.error(error)
      })

    return { api: medtechApi, user: foundUser }
  }

  static async getTempEmail(): Promise<string> {
    return `${uuid().substring(0, 8)}@icure.com`
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
  ): Promise<{ api: MedTechApi; user: User }> {
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

    const email = await this.getTempEmail()
    const process = await anonymousMedTechApi.authenticationApi.startAuthentication(
      'a58afe0e-02dc-431b-8155-0351140099e4',
      email,
      undefined,
      'Antoine',
      'Duchâteau',
      hcpId,
      false
    )

    const emails = await TestUtils.getEmail(email)

    const subjectCode = emails.subject!
    const result = await anonymousMedTechApi.authenticationApi.completeAuthentication(process!, subjectCode, () =>
      anonymousMedTechApi.generateRSAKeypair()
    )

    if (result?.medTechApi == undefined) {
      throw Error(`Couldn't sign up user by email for current test`)
    }

    const foundUser = await result.medTechApi.userApi.getLoggedUser()
    await result.medTechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      foundUser.healthcarePartyId ?? foundUser.patientId ?? foundUser.deviceId!,
      hex2ua(result.keyPair.privateKey)
    )
    assert(result)
    assert(result!.token != null)
    assert(result!.userId != null)

    return { api: result.medTechApi, user: foundUser }
  }

  static async getOrCreateHcpApiAndLoggedUser(
    iCureUrl: string,
    hcpUserName: string,
    hcpPassword: string,
    hcpPrivKey: string
  ): Promise<{ api: MedTechApi; user: User }> {
    if (cachedHcpApi == undefined && cachedHcpLoggedUser == undefined) {
      const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
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
        content: { en: { stringValue: 'Hello world' } },
      })
    )
  }

  static createHealthElementForPatient(medtechApi: MedTechApi, patient: Patient) {
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

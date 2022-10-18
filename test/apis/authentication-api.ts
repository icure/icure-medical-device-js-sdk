import { assert, expect } from 'chai'
import 'mocha'
import 'isomorphic-fetch'

import {
  getEnvironmentInitializer,
  getEnvVariables,
  hcp1Username, hcp3Username,
  setLocalStorage,
  TestUtils,
  TestVars
} from '../test-utils'
import { AnonymousMedTechApiBuilder } from '../../src/apis/AnonymousMedTechApi'
import { webcrypto } from 'crypto'
import { medTechApi, MedTechApiBuilder } from '../../src/apis/MedTechApi'
import { hex2ua, StorageFacade } from '@icure/api'
import { NotificationTypeEnum } from '../../src/models/Notification'

setLocalStorage(fetch)

let env: TestVars | undefined;
let hcpId: string | undefined;

describe('Authentication API', () => {

  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    if (env.backendType === "oss") this.skip()

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcpId = hcpApiAndUser.user.healthcarePartyId
  });

  it("AnonymousMedTechApi shouldn't be instantiated if authServerUrl, authProcessId and specId aren't passed", async () => {
    try {
      await new AnonymousMedTechApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withCrypto(webcrypto as any)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withAuthProcessByEmailId(env!.hcpAuthProcessId)
        .withAuthProcessBySmsId(env!.hcpAuthProcessId)
        .build()
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq('msgGtwSpecId is required')
    }

    try {
      const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withCrypto(webcrypto as any)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withAuthProcessByEmailId('fake-process-id')
        .withAuthProcessBySmsId('fake-process-id')
        .build()

      expect(anonymousMedTechApi, "anonymousMedTechApi shouldn't be null").not.null
    } catch (e) {
      expect(true, 'promise should not fail').eq(false)
    }
  })

  it("Impossible to use authenticationApi if msgGtwUrl, msgGtwSpecId and authProcessId haven't been provided", async () => {
    // Given
    let api = await new MedTechApiBuilder()
      .withUserName('fake-user-name')
      .withPassword('fake-pwd')
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId('fake-process-id')
      .withAuthProcessBySmsId('fake-process-id')
      .build()

    try {
      await api.authenticationApi.startAuthentication('recaptcha', 'email', undefined, 'firstname', 'lastname', 'fake-prof-id', false)
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq(
        "authenticationApi couldn't be initialized. Make sure you provided the following arguments : msgGwUrl, msgGwSpecId, authProcessByEmailId and authProcessBySMSId"
      )
    }
  })

  it("User should not be able to start authentication if he didn't provide any email and mobilePhone", async () => {
    // Given
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.hcpAuthProcessId)
      .withAuthProcessBySmsId(env!.hcpAuthProcessId)
      .build()

    // When
    try {
      await anonymousMedTechApi.authenticationApi.startAuthentication(
        'process.env.ICURE_RECAPTCHA',
        undefined,
        undefined,
        'Tom',
        'Gideon',
        env!.hcpAuthProcessId,
        false
      )
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq('In order to start authentication of a user, you should at least provide its email OR its phone number')
    }
  })

  it('User should not be able to start authentication if he provided an empty email and mobilePhone', async () => {
    // Given
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.hcpAuthProcessId)
      .withAuthProcessBySmsId(env!.hcpAuthProcessId)
      .build()

    // When
    try {
      await anonymousMedTechApi.authenticationApi.startAuthentication(
        'process.env.ICURE_RECAPTCHA',
        '',
        '',
        'Tom',
        'Gideon',
        env!.patAuthProcessId,
        false
      )
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq('In order to start authentication of a user, you should at least provide its email OR its phone number')
    }
  })

  it("HCP should be capable of signing up using email", async () => {
    // When
    const hcpApiAndUser = await TestUtils.signUpUserUsingEmail(env!.iCureUrl, env!.msgGtwUrl, env!.specId, env!.hcpAuthProcessId, hcpId!)
    const currentUser = hcpApiAndUser.user

    // Then
    assert(currentUser)
    assert(currentUser.healthcarePartyId != null)

    const currentHcp = await hcpApiAndUser.api.healthcareProfessionalApi.getHealthcareProfessional(currentUser.healthcarePartyId!)
    assert(currentHcp)
    assert(currentHcp.firstName == 'Antoine')
    assert(currentHcp.lastName == 'Duchâteau')
  }).timeout(60000)


  it("Patient should be able to signing up through email", async () => {
    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(env!.iCureUrl, env!.msgGtwUrl, env!.specId, env!.patAuthProcessId, hcpId!)

    // Then
    const currentUser = patApiAndUser.user
    assert(currentUser)
    assert(currentUser.patientId != null)

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(currentUser.patientId!)
    assert(currentPatient)
    assert(currentPatient.firstName == 'Antoine')
    assert(currentPatient.lastName == 'Duchâteau')
  }).timeout(60000)

  it('Patient should be able to signing up through email using a different Storage implementation', async () => {
    // Given
    const patAuthProcessId = process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ?? '6a355458dbfa392cb5624403190c39e5'

    const storage: Record<string, string> = {}

    class MemoryStorage implements StorageFacade<string> {
      async deleteItem(key: string): Promise<void> {
        delete storage[key]
      }

      async getItem(key: string): Promise<string | undefined> {
        return storage[key]
      }

      async setItem(key: string, valueToStore: string): Promise<void> {
        storage[key] = valueToStore
      }
    }

    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, specId, patAuthProcessId, authProcessHcpId, new MemoryStorage())

    // Then
    const currentUser = patApiAndUser.user
    assert(currentUser)
    assert(currentUser.patientId != null)

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(currentUser.patientId!)
    assert(currentPatient)
    assert(currentPatient.firstName == 'Antoine')
    assert(currentPatient.lastName == 'Duchâteau')
    assert(Object.entries(storage).length > 0)
  }).timeout(60000)

  it('A patient may login with a new RSA keypair and access his previous data if he gave access to its new key with his previous private key', async () => {
    // Given
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.patAuthProcessId,
      hcpId!)

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(patApiAndUser.user.patientId!)
    const createdDataSample = await TestUtils.createDataSampleForPatient(patApiAndUser.api, currentPatient)

    // User logs on another device
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.patAuthProcessId)
      .withAuthProcessBySmsId(env!.patAuthProcessId)
      .build()

    const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication(
      'process.env.ICURE_RECAPTCHA',
      patApiAndUser.user.email
    )

    // When
    const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
    const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode, () =>
      anonymousMedTechApi.generateRSAKeypair()
    )

    if (loginAuthResult?.medTechApi == undefined) {
      throw Error(`Couldn't login user ${patApiAndUser.user.email} on the new terminal`)
    }

    const foundUser = await loginAuthResult.medTechApi.userApi.getLoggedUser()
    await loginAuthResult.medTechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      foundUser.healthcarePartyId ?? foundUser.patientId ?? foundUser.deviceId!,
      hex2ua(loginAuthResult.keyPair.privateKey)
    )

    // Then
    // User can create new data
    expect(await TestUtils.createDataSampleForPatient(loginAuthResult.medTechApi, currentPatient)).to.not.be.undefined

    // But can't access previous ones
    try {
      await loginAuthResult.medTechApi.dataSampleApi.getDataSample(createdDataSample.id!)
      expect(true).to.be.equal(
        false,
        "Patient should not be able to get access to his previous data, as his new key can't decrypt corresponding AES Exchange keys"
      )
    } catch (e: any) {
      expect(e.message).to.not.be.empty
    }

    // When he gave access back with his previous key
    patApiAndUser.api.cryptoApi.emptyHcpCache(currentPatient.id!)
    const accessBack = await patApiAndUser.api.dataOwnerApi.giveAccessBackTo(currentPatient.id!, loginAuthResult.keyPair.publicKey)
    expect(accessBack).to.be.true

    // Then
    const updatedApi = await medTechApi(loginAuthResult.medTechApi).build()
    await updatedApi.initUserCrypto(false, loginAuthResult.keyPair)

    const previousDataSample = await updatedApi.dataSampleApi.getDataSample(createdDataSample.id!)
    expect(previousDataSample).to.not.be.undefined
  }).timeout(60000)

  it('A patient may login with a new RSA keypair and access his previous data only when a delegate gave him access back', async () => {
    // Given
    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp3Username])
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.patAuthProcessId,
      hcpId!)

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(patApiAndUser.user.patientId!)
    await patApiAndUser.api.patientApi.giveAccessTo(currentPatient, hcpApiAndUser.user.healthcarePartyId!)

    const createdDataSample = await TestUtils.createDataSampleForPatient(patApiAndUser.api, currentPatient)
    await patApiAndUser.api.dataSampleApi.giveAccessTo(createdDataSample, hcpApiAndUser.user.healthcarePartyId!)

    // User lost his key and logs back
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.patAuthProcessId)
      .withAuthProcessBySmsId(env!.patAuthProcessId)
      .build()

    const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication(
      'process.env.ICURE_RECAPTCHA',
      patApiAndUser.user.email
    )

    // When
    const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
    const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode, () =>
      anonymousMedTechApi.generateRSAKeypair()
    )

    if (loginAuthResult?.medTechApi == undefined) {
      throw Error(`Couldn't login user ${patApiAndUser.user.email} after he lost his RSA keypair`)
    }

    const foundUser = await loginAuthResult.medTechApi.userApi.getLoggedUser()
    await loginAuthResult.medTechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      foundUser.healthcarePartyId ?? foundUser.patientId ?? foundUser.deviceId!,
      hex2ua(loginAuthResult.keyPair.privateKey)
    )

    // Then
    // User can create new data
    expect(await TestUtils.createDataSampleForPatient(loginAuthResult.medTechApi, currentPatient)).to.not.be.undefined

    // But can't access previous ones
    try {
      await loginAuthResult.medTechApi.dataSampleApi.getDataSample(createdDataSample.id!)
      expect(true).to.be.equal(
        false,
        "Patient should not be able to get access to his previous data, as his new key can't decrypt corresponding AES Exchange keys"
      )
    } catch (e: any) {
      expect(e.message).to.not.be.empty
    }

    // When the delegate gave him access back
    // Hcp checks dedicated notification
    const startTimestamp = new Date().getTime() - 100000
    const hcpNotification = (await hcpApiAndUser.api.notificationApi.getPendingNotificationsAfter(startTimestamp)).find(
      (notif) =>
        notif.type === NotificationTypeEnum.KEY_PAIR_UPDATE &&
        notif.properties?.find((prop) => prop.typedValue?.stringValue == currentPatient.id!) != undefined
    )

    expect(hcpNotification).to.not.be.undefined

    const patientId = hcpNotification!.properties?.find((prop) => prop.id == 'dataOwnerConcernedId')
    expect(patientId).to.not.be.undefined
    const patientPubKey = hcpNotification!.properties?.find((prop) => prop.id == 'dataOwnerConcernedPubKey')
    expect(patientPubKey).to.not.be.undefined

    const accessBack = await hcpApiAndUser.api.dataOwnerApi.giveAccessBackTo(
      patientId!.typedValue!.stringValue!,
      patientPubKey!.typedValue!.stringValue!
    )
    expect(accessBack).to.be.true

    // Then
    const updatedApi = await medTechApi(loginAuthResult.medTechApi).build()
    await updatedApi.initUserCrypto(false, loginAuthResult.keyPair)

    const previousDataSample = await updatedApi.dataSampleApi.getDataSample(createdDataSample.id!)
    expect(previousDataSample).to.not.be.undefined
  }).timeout(60000)
})

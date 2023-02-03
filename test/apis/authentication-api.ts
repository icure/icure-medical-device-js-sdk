import { assert, expect, use as chaiUse } from 'chai'
import 'mocha'
import 'isomorphic-fetch'

import { getEnvironmentInitializer, getEnvVariables, hcp1Username, hcp3Username, setLocalStorage, TestUtils, TestVars } from '../test-utils'
import { AnonymousMedTechApiBuilder } from '../../src/apis/AnonymousMedTechApi'
import { webcrypto } from 'crypto'
import { medTechApi, MedTechApiBuilder } from '../../src/apis/MedTechApi'
import { hex2ua, KeyStorageImpl, ua2hex } from '@icure/api'
import { NotificationTypeEnum } from '../../src/models/Notification'
import { MemoryStorage } from './utils/MemoryStorage'
import { setEquality } from '../../src/utils/equality'
import { SimpleMedTechCryptoStrategies } from '../../src/services/impl/SimpleMedTechCryptoStrategies'
chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

let env: TestVars | undefined
let hcpId: string | undefined

describe('Authentication API', () => {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    if (env.backendType === 'oss') this.skip()

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcpId = hcpApiAndUser.user.healthcarePartyId
  })

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

  it('Impossible to use instantiate a med tech api with wrong credentials', async () => {
    expect(
      new MedTechApiBuilder()
        .withUserName('fake-user-name')
        .withPassword('fake-pwd')
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId('fake-process-id')
        .withAuthProcessBySmsId('fake-process-id')
        .build()
    ).to.be.rejected
  }).timeout(60000)

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
        'a58afe0e-02dc-431b-8155-0351140099e4',
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
        'a58afe0e-02dc-431b-8155-0351140099e4',
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

  it('HCP should be capable of signing up using email', async () => {
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

  it('Patient should be able to signing up through email', async () => {
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

  it('Patient should be able to retrieve its keys when re-login', async () => {
    // When
    const { api, user, token } = await TestUtils.signUpUserUsingEmail(env!.iCureUrl, env!.msgGtwUrl, env!.specId, env!.patAuthProcessId, hcpId!)

    // Then
    const currentUser = user
    assert(currentUser)
    assert(currentUser.patientId != null)

    const newMedTechApi = async () =>
      await new MedTechApiBuilder()
        .withUserName(currentUser.login!)
        .withPassword(token)
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(env!.patAuthProcessId)
        .withAuthProcessBySmsId(env!.patAuthProcessId)
        .build()

    const availableKeys = Object.keys(api.cryptoApi.userKeysManager.getDecryptionKeys())

    const newApi = await newMedTechApi()

    const availableKeysInNew = Object.keys(newApi.cryptoApi.userKeysManager.getDecryptionKeys())

    const randomKey = await newApi.cryptoApi.primitives.RSA.generateKeyPair()

    expect(
      medTechApi(newApi)
        .withStorage(new MemoryStorage())
        .withKeyStorage(new KeyStorageImpl(new MemoryStorage()))
        .withCryptoStrategies(
          new SimpleMedTechCryptoStrategies([
            {
              publicKey: ua2hex(await newApi.cryptoApi.primitives.RSA.exportKey(randomKey.publicKey, 'spki')),
              privateKey: ua2hex(await newApi.cryptoApi.primitives.RSA.exportKey(randomKey.privateKey, 'pkcs8')),
            },
          ])
        )
        .build(),
      "Can't instantiate an api with recovered keys which do not match a data owner key."
    ).to.be.rejected

    expect(setEquality(new Set(availableKeys), new Set(availableKeysInNew))).to.equal(true)
  }).timeout(60000)

  it('Patient should be able to signing up through email using a different Storage implementation', async () => {
    // Given
    const memoryStorage = new MemoryStorage()

    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.patAuthProcessId,
      hcpId!,
      memoryStorage
    )

    // Then
    const currentUser = patApiAndUser.user
    assert(currentUser)
    assert(currentUser.patientId != null)

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(currentUser.patientId!)
    assert(currentPatient)
    assert(currentPatient.firstName == 'Antoine')
    assert(currentPatient.lastName == 'Duchâteau')
    assert(Object.entries(memoryStorage.storage).length > 0)
  }).timeout(60000)

  it('A patient may login with a new RSA keypair and access his previous data if he gave access to its new key with his previous private key', async () => {
    // Given
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(env!.iCureUrl, env!.msgGtwUrl, env!.specId, env!.patAuthProcessId, hcpId!)

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
      .withStorage(new MemoryStorage())
      .build()

    const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication(
      'a58afe0e-02dc-431b-8155-0351140099e4',
      patApiAndUser.user.email
    )

    // When
    const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
    const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode)

    if (loginAuthResult?.medTechApi == undefined) {
      throw Error(`Couldn't login user ${patApiAndUser.user.email} on the new terminal`)
    }

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
    await patApiAndUser.api.cryptoApi.forceReload(true)
    await patApiAndUser.api.dataOwnerApi.giveAccessBackTo(currentPatient.id!, loginAuthResult.keyPairs[0].publicKey)

    // Then
    const updatedApi = await medTechApi(loginAuthResult.medTechApi).build()
    expect(Object.keys(updatedApi.cryptoApi.userKeysManager.getDecryptionKeys())).to.have.length(1)

    const previousDataSample = await updatedApi.dataSampleApi.getDataSample(createdDataSample.id!)
    expect(previousDataSample).to.not.be.undefined
  }).timeout(60000)

  it('A patient may login with a new RSA keypair and access his previous data only when a delegate gave him access back', async () => {
    // Given
    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp3Username])
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(env!.iCureUrl, env!.msgGtwUrl, env!.specId, env!.patAuthProcessId, hcpId!)

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
      .withStorage(new MemoryStorage())
      .build()

    const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication(
      'a58afe0e-02dc-431b-8155-0351140099e4',
      patApiAndUser.user.email
    )

    // When
    const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
    const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode)

    if (loginAuthResult?.medTechApi == undefined) {
      throw Error(`Couldn't login user ${patApiAndUser.user.email} after he lost his RSA keypair`)
    }

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

    await hcpApiAndUser.api.dataOwnerApi.giveAccessBackTo(patientId!.typedValue!.stringValue!, patientPubKey!.typedValue!.stringValue!)

    // Then
    const updatedApi = await medTechApi(loginAuthResult.medTechApi).build()
    expect(Object.keys(updatedApi.cryptoApi.userKeysManager.getDecryptionKeys())).to.have.length(1)

    const previousDataSample = await updatedApi.dataSampleApi.getDataSample(createdDataSample.id!)
    expect(previousDataSample).to.not.be.undefined
  }).timeout(120000)
})

import { assert, expect, use as chaiUse } from 'chai'
import 'mocha'
import 'isomorphic-fetch'

import { getEnvironmentInitializer, hcp1Username, hcp3Username, setLocalStorage, TestUtils } from '../test-utils'
import { webcrypto } from 'crypto'
import { MedTechApiBuilder } from '../../src/apis/MedTechApi'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { SimpleMedTechCryptoStrategies } from '../../src/services/impl/SimpleMedTechCryptoStrategies'
import { DataOwnerTypeEnum } from '../../src/models/DataOwner'
import { TestKeyStorage, TestStorage, testStorageForUser } from '../TestStorage'
import { DataOwnerMapper } from '../../src/mappers/dataOwner'
import { AnonymousMedTechApiBuilder } from '../../src/apis/AnonymousMedTechApi'
import { NotificationTypeEnum } from '../../src/models/Notification'

chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

let env: TestVars
let hcpId: string

describe('Authentication API', () => {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    if (env.backendType === 'oss') this.skip()

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcpId = hcpApiAndUser.user.healthcarePartyId!
  })

  it("AnonymousMedTechApi shouldn't be instantiated if authServerUrl, authProcessId and specId aren't passed", async () => {
    await expect(
      new AnonymousMedTechApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withCrypto(webcrypto as any)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withAuthProcessByEmailId(env!.hcpAuthProcessId)
        .withAuthProcessBySmsId(env!.hcpAuthProcessId)
        .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
        .build()
    ).to.be.rejected

    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withCrypto(webcrypto as any)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withAuthProcessByEmailId('fake-process-id')
      .withAuthProcessBySmsId('fake-process-id')
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    expect(anonymousMedTechApi, "anonymousMedTechApi shouldn't be null").to.not.be.null
  })

  it("Impossible to use authenticationApi if msgGtwUrl, msgGtwSpecId and authProcessId haven't been provided", async () => {
    const user = env.dataOwnerDetails[hcp1Username]
    const storage = await testStorageForUser(user)
    // Given
    let api = await new MedTechApiBuilder()
      .withUserName(user.user)
      .withPassword(user.password)
      .withStorage(storage.storage)
      .withKeyStorage(storage.keyStorage)
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId('fake-process-id')
      .withAuthProcessBySmsId('fake-process-id')
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    expect(() => api.authenticationApi).to.throw(Error)
  }).timeout(60000)

  it('Cannot instantiate the API if no AuthProcessId is passed', async () => {
    await expect(
      new AnonymousMedTechApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
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
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    await expect(
      anonymousMedTechApi.authenticationApi.startAuthentication(env!.recaptcha, undefined, undefined, 'Tom', 'Gideon', env!.hcpAuthProcessId, false)
    ).to.be.rejected
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
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    await expect(anonymousMedTechApi.authenticationApi.startAuthentication(env!.recaptcha, '', '', 'Tom', 'Gideon', env!.patAuthProcessId, false)).to
      .be.rejected
  })

  it('User should not be able to start authentication if he provided an email but no AuthProcessByEmailId', async () => {
    // Given
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessBySmsId(env!.hcpAuthProcessId)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    await expect(
      anonymousMedTechApi.authenticationApi.startAuthentication(
        env!.recaptcha,
        'a-fake-email',
        undefined,
        'Tom',
        'Gideon',
        env!.hcpAuthProcessId,
        false
      )
    ).to.be.rejected
  })

  it('User should not be able to start authentication if he provided an sms but no AuthProcessBySMSId', async () => {
    // Given
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.hcpAuthProcessId)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    await expect(
      anonymousMedTechApi.authenticationApi.startAuthentication(
        env!.recaptcha,
        undefined,
        'a-fake-phone-number',
        'Tom',
        'Gideon',
        env!.hcpAuthProcessId,
        false
      )
    ).to.be.rejected
  })

  it('A User should be able to start the authentication by sms', async () => {
    // Given
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessBySmsId(env!.hcpAuthProcessId)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    // When
    const phoneNumber = `+${Math.ceil(Math.random() * 10000000 + 10000000)}`
    await anonymousMedTechApi.authenticationApi.startAuthentication(
      env!.recaptcha,
      undefined,
      phoneNumber,
      'Tom',
      'Gideon',
      env!.hcpAuthProcessId,
      false
    )
    const messages = await TestUtils.getSMS(phoneNumber)
    expect(messages?.message).not.to.be.undefined
  })

  it('HCP should be capable of signing up using email', async () => {
    // When
    const hcpApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.hcpAuthProcessId,
      hcpId!,
      env!.recaptcha,
      'recaptcha'
    )
    const currentUser = hcpApiAndUser.user

    // Then
    assert(currentUser)
    assert(currentUser.healthcarePartyId != null)

    const currentHcp = await hcpApiAndUser.api.healthcareProfessionalApi.getHealthcareProfessional(currentUser.healthcarePartyId!)
    assert(currentHcp)
    assert(currentHcp.firstName == 'Antoine')
    assert(currentHcp.lastName == 'Duchâteau')
  }).timeout(60000)

  it('User should not be able to start authentication if he provided an email but no AuthProcessByEmailId', async () => {
    // Given
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessBySmsId(env!.hcpAuthProcessId)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    // When
    try {
      await anonymousMedTechApi.authenticationApi.startAuthentication(
        env!.recaptcha,
        'a-fake-email',
        undefined,
        'Tom',
        'Gideon',
        env!.hcpAuthProcessId,
        false
      )
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq(
        'In order to start a user authentication with an email, you need to instantiate the API with a authProcessByEmailId. If you want to start the authentication with a phone number, then you need to instantiate the API with a authProcessBySmsId'
      )
    }
  })

  it('User should not be able to start authentication if he provided an sms but no AuthProcessBySMSId', async () => {
    // Given
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.hcpAuthProcessId)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    // When
    try {
      await anonymousMedTechApi.authenticationApi.startAuthentication(
        env!.recaptcha,
        undefined,
        'a-fake-phone-number',
        'Tom',
        'Gideon',
        env!.hcpAuthProcessId,
        false
      )
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq(
        'In order to start a user authentication with an email, you need to instantiate the API with a authProcessByEmailId. If you want to start the authentication with a phone number, then you need to instantiate the API with a authProcessBySmsId'
      )
    }
  })

  it('A User should be able to start the authentication by sms', async () => {
    // Given
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessBySmsId(env!.hcpAuthProcessId)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    // When
    const phoneNumber = `+${Math.ceil(Math.random() * 10000000 + 10000000)}`
    await anonymousMedTechApi.authenticationApi.startAuthentication(
      env!.recaptcha,
      undefined,
      phoneNumber,
      'Tom',
      'Gideon',
      env!.hcpAuthProcessId,
      false
    )
    const messages = await TestUtils.getSMS(phoneNumber)
    expect(messages?.message).not.to.be.undefined
  })

  it('HCP should be capable of signing up using email', async () => {
    // When
    const hcpApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.hcpAuthProcessId,
      hcpId!,
      env!.recaptcha,
      'recaptcha'
    )
    const currentUser = hcpApiAndUser.user

    // Then
    assert(currentUser)
    assert(currentUser.healthcarePartyId != null)

    const currentHcp = await hcpApiAndUser.api.healthcareProfessionalApi.getHealthcareProfessional(currentUser.healthcarePartyId!)
    assert(currentHcp)
    assert(currentHcp.firstName == 'Antoine')
    assert(currentHcp.lastName == 'Duchâteau')
  }).timeout(60000)

  it('HCP should be capable of signing up using email', async () => {
    // When
    const hcpApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.hcpAuthProcessId,
      hcpId!,
      env!.recaptcha,
      'recaptcha'
    )
    const currentUser = hcpApiAndUser.user

    // Then
    assert(currentUser)
    assert(currentUser.healthcarePartyId != null)

    const currentHcp = await hcpApiAndUser.api.healthcareProfessionalApi.getHealthcareProfessional(currentUser.healthcarePartyId!)
    assert(currentHcp)
    assert(currentHcp.firstName == 'Antoine')
    assert(currentHcp.lastName == 'Duchâteau')
  }).timeout(60000)

  it('HCP should be capable of signing up using email with friendlyCaptchaData', async () => {
    // When
    const hcpApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.hcpAuthProcessId,
      hcpId!,
      env!.friendlyCaptchaKey,
      'friendly-captcha',
      undefined,
      undefined
    )
    const currentUser = hcpApiAndUser.user

    // Then
    assert(currentUser)
    assert(currentUser.healthcarePartyId != null)

    const currentHcp = await hcpApiAndUser.api.healthcareProfessionalApi.getHealthcareProfessional(currentUser.healthcarePartyId!)
    assert(currentHcp)
    assert(currentHcp.firstName == 'Antoine')
    assert(currentHcp.lastName == 'Duchâteau')
  }).timeout(60000)

  it('HCP should be capable of signing up using email with friendlyCaptchaData', async () => {
    // When
    const hcpApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.hcpAuthProcessId,
      hcpId!,
      env!.friendlyCaptchaKey,
      'friendly-captcha',
      undefined,
      undefined
    )
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
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.patAuthProcessId,
      hcpId!,
      env!.recaptcha,
      'recaptcha'
    )

    // Then
    const currentUser = patApiAndUser.user
    assert(currentUser)
    assert(currentUser.patientId != null)

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(currentUser.patientId!)
    assert(currentPatient)
    assert(currentPatient.firstName == 'Antoine')
    assert(currentPatient.lastName == 'Duchâteau')
  }).timeout(60000)

  it('Patient should be able to signing up through email with friendlyCaptchaData', async () => {
    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.patAuthProcessId,
      hcpId!,
      env!.friendlyCaptchaKey,
      'friendly-captcha',
      undefined,
      undefined
    )

    // Then
    const currentUser = patApiAndUser.user
    assert(currentUser)
    assert(currentUser.patientId != null)

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(currentUser.patientId!)
    assert(currentPatient)
    assert(currentPatient.firstName == 'Antoine')
    assert(currentPatient.lastName == 'Duchâteau')
  }).timeout(60000)

  it('Patient should be able to signing up through email with friendlyCaptchaData', async () => {
    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.patAuthProcessId,
      hcpId!,
      env!.friendlyCaptchaKey,
      'friendly-captcha',
      undefined,
      undefined
    )

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
    const { api, user, token } = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.patAuthProcessId,
      hcpId!,
      env!.recaptcha,
      'recaptcha'
    )

    const keysFromFirstInit = api.dataOwnerApi.getPublicKeysOf(await api.dataOwnerApi.getDataOwner(user.patientId!))

    const newApi = await new MedTechApiBuilder()
      .withUserName(user.login!)
      .withPassword(token)
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.patAuthProcessId)
      .withAuthProcessBySmsId(env!.patAuthProcessId)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
      .build()

    const keysFromNewApi = newApi.dataOwnerApi.getPublicKeysOf(await newApi.dataOwnerApi.getDataOwner(user.patientId!))

    expect(keysFromNewApi.length).to.be.greaterThan(0)
    expect(keysFromNewApi).to.have.members(keysFromFirstInit)
  }).timeout(60000)

  it('Patient should be able to signing up through email using a different Storage implementation', async () => {
    // Given
    const storage = new TestStorage()
    const keyStorage = new TestKeyStorage()

    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.patAuthProcessId,
      hcpId!,
      env!.recaptcha,
      'recaptcha',
      storage,
      keyStorage
    )

    // Then
    const currentUser = patApiAndUser.user
    assert(currentUser)
    assert(currentUser.patientId != null)

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(currentUser.patientId!)
    assert(currentPatient)
    assert(currentPatient.firstName == 'Antoine')
    assert(currentPatient.lastName == 'Duchâteau')
    assert(Object.entries(keyStorage).length == 1)
  }).timeout(60000)

  it('A patient may login with a new RSA keypair and access his previous data if he gave access to its new key with his previous private key', async () => {
    // Given
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env!.iCureUrl,
      env!.msgGtwUrl,
      env!.specId,
      env!.patAuthProcessId,
      hcpId!,
      env!.recaptcha,
      'recaptcha'
    )

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(patApiAndUser.user.patientId!)
    const createdDataSample = await TestUtils.createDataSampleForPatient(patApiAndUser.api, currentPatient)
    const keysFromFirstInit = patApiAndUser.api.dataOwnerApi.getPublicKeysOf(
      await patApiAndUser.api.dataOwnerApi.getDataOwner(patApiAndUser.user.patientId!)
    )

    // User logs on another device
    const newCryptoStrategies = new SimpleMedTechCryptoStrategies([])
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.patAuthProcessId)
      .withAuthProcessBySmsId(env!.patAuthProcessId)
      .withStorage(new TestStorage())
      .withKeyStorage(new TestKeyStorage())
      .withCryptoStrategies(newCryptoStrategies)
      .build()

    const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication(env!.recaptcha, patApiAndUser.user.email)

    // When
    const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
    const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode)

    if (loginAuthResult?.medTechApi == undefined) {
      throw Error(`Couldn't login user ${patApiAndUser.user.email} on the new terminal`)
    }

    const keysAfterLoss = loginAuthResult.medTechApi.dataOwnerApi.getPublicKeysOf(
      await loginAuthResult.medTechApi.dataOwnerApi.getDataOwner(patApiAndUser.user.patientId!)
    )
    expect(keysAfterLoss.length).to.be.greaterThan(keysFromFirstInit.length)
    expect(!!newCryptoStrategies.generatedKeyPair).to.be.true

    // Then
    // User can create new data
    expect(await TestUtils.createDataSampleForPatient(loginAuthResult.medTechApi, currentPatient)).to.not.be.undefined

    // But can't access (v8) / decrypt (v7) previous ones
    const retrieved = await loginAuthResult.medTechApi.dataSampleApi.getDataSample(createdDataSample.id!)
    expect(retrieved).to.not.be.undefined
    expect(Object.keys(retrieved.content ?? {})).to.have.length(0, 'Content should not be decrypted (emtpy obj or undefined)')

    // When he gave access back with his previous key
    await patApiAndUser.api.forceReload()
    await patApiAndUser.api.dataOwnerApi.giveAccessBackTo(currentPatient.id!, loginAuthResult.keyPairs[0].publicKey)

    // Then
    await loginAuthResult.medTechApi.forceReload()
    const previousDataSample = await loginAuthResult.medTechApi.dataSampleApi.getDataSample(createdDataSample.id!)
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
      hcpId!,
      env!.recaptcha,
      'recaptcha'
    )

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(patApiAndUser.user.patientId!)
    await patApiAndUser.api.patientApi.giveAccessTo(currentPatient, hcpApiAndUser.user.healthcarePartyId!)

    const createdDataSample = await TestUtils.createDataSampleForPatient(patApiAndUser.api, currentPatient)
    await patApiAndUser.api.dataSampleApi.giveAccessTo(createdDataSample, hcpApiAndUser.user.healthcarePartyId!)

    // User lost his key and logs back
    const newCryptoStrategies = new SimpleMedTechCryptoStrategies([])
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.patAuthProcessId)
      .withAuthProcessBySmsId(env!.patAuthProcessId)
      .withStorage(new TestStorage())
      .withKeyStorage(new TestKeyStorage())
      .withCryptoStrategies(newCryptoStrategies)
      .build()

    const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication(env!.recaptcha, patApiAndUser.user.email)

    // When
    const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
    const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode)
    expect(newCryptoStrategies.generatedKeyPair).to.not.be.undefined

    if (loginAuthResult?.medTechApi == undefined) {
      throw Error(`Couldn't login user ${patApiAndUser.user.email} after he lost his RSA keypair`)
    }

    // Then
    // User can create new data
    expect(await TestUtils.createDataSampleForPatient(loginAuthResult.medTechApi, currentPatient)).to.not.be.undefined
    // But can't access (v8) / decrypt (v7) previous ones
    const retrieved = await loginAuthResult.medTechApi.dataSampleApi.getDataSample(createdDataSample.id!)
    expect(retrieved).to.not.be.undefined
    expect(Object.keys(retrieved.content ?? {})).to.have.length(0, 'Content should not be decrypted (emtpy obj or undefined)')

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
    await loginAuthResult.medTechApi.forceReload()
    const previousDataSample = await loginAuthResult.medTechApi.dataSampleApi.getDataSample(createdDataSample.id!)
    expect(previousDataSample).to.not.be.undefined
  }).timeout(120000)
})

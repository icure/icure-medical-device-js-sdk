import 'isomorphic-fetch'
import { medTechApi, MedTechApi } from '../../src/apis/MedTechApi'
import { User } from '../../src/models/User'
import { EncryptedPatient, Patient } from '../../src/models/Patient'
import { webcrypto } from 'crypto'
import { hex2ua, sleep } from '@icure/api'
import {
  getEnvironmentInitializer,
  getEnvVariables,
  getTempEmail,
  hcp1Username,
  hcp3Username,
  ICureTestEmail,
  patUsername,
  setLocalStorage,
  TestUtils,
  TestVars,
} from '../test-utils'
import { Address } from '../../src/models/Address'
import { Telecom } from '../../src/models/Telecom'
import { assert, expect, use as chaiUse } from 'chai'
import { AnonymousMedTechApiBuilder } from '../../src/apis/AnonymousMedTechApi'
import { NotificationTypeEnum } from '../../src/models/Notification'
import { ICureRegistrationEmail } from '../../src/utils/msgGtwMessageFactory'
import { HealthcareProfessional } from '../../src/models/HealthcareProfessional'
import { DataSampleFilter, HealthcareElementFilter } from '../../src/filter'
chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

let env: TestVars | undefined
let hcp1Api: MedTechApi
let hcp1User: User
let hcp1: HealthcareProfessional
let hcp3Api: MedTechApi
let hcp3User: User
let patApi: MedTechApi
let patUser: User

describe('A Healthcare Party', () => {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    if (env.backendType === 'oss') this.skip()

    hcp1Api = await medTechApi()
      .withICureBaseUrl(env.iCureUrl)
      .withUserName(env.dataOwnerDetails[hcp1Username].user)
      .withPassword(env.dataOwnerDetails[hcp1Username].password)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .build()

    hcp1User = await hcp1Api.userApi.getLoggedUser()
    await hcp1Api.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      hcp1User.healthcarePartyId ?? hcp1User.patientId ?? hcp1User.deviceId!,
      hex2ua(env.dataOwnerDetails[hcp1Username].privateKey)
    )
    hcp1 = await hcp1Api.healthcareProfessionalApi.getHealthcareProfessional(hcp1User.healthcarePartyId!)

    const hcpApi3AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp3Username])
    hcp3Api = hcpApi3AndUser.api
    hcp3User = hcpApi3AndUser.user

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
    patApi = patApiAndUser.api
    patUser = patApiAndUser.user
  })

  async function userFromPatient(api: MedTechApi, patient: Patient, hcp: HealthcareProfessional) {
    const existingPatient = await api.patientApi.createOrModifyPatient(patient)
    assert(!!existingPatient)

    const messageFactory = new ICureRegistrationEmail(hcp, 'test', 'iCure', existingPatient)
    const createdUser = await api.userApi.createAndInviteUser(existingPatient, messageFactory)
    assert(!!createdUser)
    assert(createdUser.patientId === existingPatient.id)
  }

  it('should be able to create a new User from an existing Patient', async () => {
    // PRECONDITIONS:

    // The Patient exists
    const email = getTempEmail()
    const patientNote = 'He is moon knight'
    const newPatient = await hcp1Api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Marc',
        lastName: 'Specter',
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
    assert(!!newPatient)
    expect(newPatient.note).to.equal(patientNote)

    // Some Data Samples and Healthcare Elements were created for the Patient
    const newDS1 = await TestUtils.createDataSampleForPatient(hcp1Api, newPatient)
    assert(!!newDS1)
    const newDS2 = await TestUtils.createDataSampleForPatient(hcp1Api, newPatient)
    assert(!!newDS2)
    const newHE1 = await TestUtils.createHealthElementForPatient(hcp1Api, newPatient)
    assert(!!newHE1)
    const newHE2 = await TestUtils.createHealthElementForPatient(hcp1Api, newPatient)
    assert(!!newHE2)

    // When HCP_1 creates user for patient PAT_1
    // And HCP_1 is sending an invitation email to patient PAT_1
    const messageFactory = new ICureTestEmail(newPatient)
    await hcp1Api.userApi.createAndInviteUser(newPatient, messageFactory, 3600)

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

    await sleep(3000)

    const newPatientApi = authResult!.medTechApi

    // But PAT_1 may not access data sample DATA_SAMPLE_1 nor his own note
    await TestUtils.retrieveDataSampleAndExpectError(newPatientApi, newDS1.id!)
    await TestUtils.retrieveDataSampleAndExpectError(newPatientApi, newDS2.id!)
    await TestUtils.retrieveHealthcareElementAndExpectError(newPatientApi, newHE1.id!)
    await TestUtils.retrieveHealthcareElementAndExpectError(newPatientApi, newHE2.id!)
    expect(newPatientApi.patientApi.getPatient(newPatient.id!)).to.be.rejected
    const encryptedPatient = await newPatientApi.patientApi.getPatientAndTryDecrypt(newPatient.id!)
    expect(encryptedPatient).is.instanceof(EncryptedPatient)
    expect(encryptedPatient.note).to.be.undefined

    // When HCP_1 gives access to PAT_1
    const newNotifications = await hcp1Api.notificationApi.getPendingNotificationsAfter()
    expect(!!newNotifications).to.eq(true)
    const newPatientNotification = newNotifications.filter(
      (notification) => notification.type === NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS && notification.responsible === newPatient.id
    )[0]
    expect(!!newPatientNotification).to.eq(true)

    const ongoingStatusUpdate = await hcp1Api.notificationApi.updateNotificationStatus(newPatientNotification, 'ongoing')
    expect(!!ongoingStatusUpdate).to.eq(true)
    expect(ongoingStatusUpdate?.status).to.eq('ongoing')

    const sharedData = await hcp1Api.patientApi.giveAccessToAllDataOf(newPatient.id!)
    expect(!!sharedData).to.eq(true)
    expect(sharedData.patient?.id).to.eq(newPatient.id)
    expect(sharedData.statuses.healthcareElements?.success).to.eq(true)
    expect(!!sharedData.statuses.healthcareElements?.error).to.eq(false)
    expect(sharedData.statuses.healthcareElements?.modified).to.eq(2)
    expect(sharedData.statuses.dataSamples?.success).to.eq(true)
    expect(!!sharedData.statuses.dataSamples?.error).to.eq(false)
    expect(sharedData.statuses.dataSamples?.modified).to.eq(2)

    await sleep(3000)

    const completedStatusUpdate = await hcp1Api.notificationApi.updateNotificationStatus(ongoingStatusUpdate!, 'completed')
    expect(!!completedStatusUpdate).to.eq(true)
    expect(completedStatusUpdate?.status).to.eq('completed')

    // Then PAT_1 may access data sample DATA_SAMPLE_1
    // Be careful : We need to empty the cache of the hcPartyKeys otherwise, the previous API will use the key of the
    // patient -> patient stocked in cache instead of the one created by the doctor when he gives access back to patient data
    const updatedApi = await medTechApi(newPatientApi).build()
    await updatedApi.addKeyPair(newPatient.id!, authResult.keyPairs[0])

    await TestUtils.retrieveHealthcareElementAndExpectSuccess(updatedApi, newHE1.id!)
    await TestUtils.retrieveHealthcareElementAndExpectSuccess(updatedApi, newHE2.id!)
    await TestUtils.retrieveDataSampleAndExpectSuccess(updatedApi, newDS1.id!)
    await TestUtils.retrieveDataSampleAndExpectSuccess(updatedApi, newDS2.id!)

    // Should not destroy existing encrypted data
    expect((await hcp1Api.patientApi.getPatient(newPatient.id!)).note).to.equal(patientNote)
    expect((await updatedApi.patientApi.getPatient(newPatient.id!)).note).to.equal(patientNote)
  }).timeout(6000000)

  it('should not be able to create a new User if the Patient has no contact information', async () => {
    const newPatient = new Patient({
      firstName: 'Marc',
      lastName: 'Specter',
    })

    try {
      await userFromPatient(hcp1Api, newPatient, hcp1)
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq('HCP does not have a valid email!')
    }
  })

  it('should not be able to create a new User if it already exists for that Patient', async () => {
    const email = getTempEmail()
    const newPatient = await hcp1Api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Marc',
        lastName: 'Specter',
      })
    )
    assert(!!newPatient)
    const newUser = await hcp1Api.userApi.createOrModifyUser(
      new User({
        login: email,
        patientId: newPatient.id,
        email: email,
      })
    )
    assert(!!newUser)

    try {
      await hcp1Api.userApi.createAndInviteUser(newPatient, new ICureTestEmail(newPatient), 3600)
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq('A User already exists for this Patient')
    }
  })
})

describe('A patient user', () => {
  it('should be able to create new data and modify non-encrypted data before being given full access to existing data', async () => {
    const email = getTempEmail()
    const patientNote = 'He is moon knight'
    const patient = await hcp1Api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Marc',
        lastName: 'Specter',
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
    const heByHcp = await TestUtils.createHealthElementForPatient(hcp1Api, patient)
    // Create patient api
    const messageFactory = new ICureTestEmail(patient)
    await hcp1Api.userApi.createAndInviteUser(patient, messageFactory, 3600)
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(env!.iCureUrl)
      .withMsgGwUrl(env!.msgGtwUrl)
      .withMsgGwSpecId(env!.specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(env!.patAuthProcessId)
      .withAuthProcessBySmsId(env!.patAuthProcessId)
      .build()
    const loginAndPassword = (await TestUtils.getEmail(email)).subject!
    const authResult = await anonymousMedTechApi.authenticationApi.authenticateAndAskAccessToItsExistingData(
      loginAndPassword.split('|')[0],
      loginAndPassword.split('|')[1]
    )
    await sleep(3000)
    const patientApi = authResult!.medTechApi
    patientApi.cryptoApi.emptyHcpCache(patient.id!)

    // When the patient has not been given access to his data he...

    // ...can modify only non-encrypted data of patient and...
    const encryptedPatient = await patientApi.patientApi.getPatientAndTryDecrypt(patient.id!)
    expect(encryptedPatient).is.instanceof(EncryptedPatient)
    encryptedPatient.note = 'This is not allowed'
    expect(patientApi.patientApi.modifyPotentiallyEncryptedPatient(encryptedPatient)).to.be.rejected
    encryptedPatient.note = undefined
    encryptedPatient.lastName = 'Ghost'
    const modifiedPatient = await patientApi.patientApi.modifyPotentiallyEncryptedPatient(encryptedPatient)
    expect((await patientApi.patientApi.getPatientAndTryDecrypt(patient.id!)).lastName).to.equal('Ghost')
    expect((await hcp1Api.patientApi.getPatient(patient.id!)).note).to.equal(patientNote) // Should not destroy encrypted data
    // ...can create medical data
    const heByPatient = await TestUtils.createHealthElementForPatient(patientApi, modifiedPatient)
    // Originally medical data can't be accessed by others...
    expect((await hcp1Api.healthcareElementApi.getHealthcareElement(heByPatient.id!)).note).to.be.undefined
    expect(patientApi.healthcareElementApi.getHealthcareElement(heByHcp.id!)).to.be.rejected
    // ...but it can be shared
    await patientApi.healthcareElementApi.giveAccessTo(heByPatient, hcp1.id!)
    await hcp1Api.healthcareElementApi.giveAccessTo(heByHcp, patient.id!)
    hcp1Api.cryptoApi.emptyHcpCache(patient.id!)
    hcp1Api.cryptoApi.emptyHcpCache(hcp1.id!)
    expect((await hcp1Api.healthcareElementApi.getHealthcareElement(heByPatient.id!)).note).to.not.be.undefined
    expect((await patientApi.healthcareElementApi.getHealthcareElement(heByHcp.id!)).note).to.not.be.undefined
    // Originally medical data even if accessible can't be found by the other...
    const filterPatient1 = await new HealthcareElementFilter().forDataOwner(patient.id!).forPatients(patientApi.cryptoApi, [modifiedPatient]).build()
    const patientFound1 = await patientApi.healthcareElementApi.matchHealthcareElement(filterPatient1)
    const filterHcp1 = await new HealthcareElementFilter()
      .forPatients(hcp1Api.cryptoApi, [modifiedPatient])
      .forDataOwner(hcp1User.healthcarePartyId!)
      .build()
    const hcpFound1 = await hcp1Api.healthcareElementApi.matchHealthcareElement(filterHcp1)
    expect(patientFound1).to.have.length(1)
    expect(patientFound1).to.contain(heByPatient.id)
    expect(hcpFound1).to.have.length(1)
    expect(hcpFound1).to.contain(heByHcp.id)

    //. ..but by sharing the patient with each other it can be found
    await patientApi.patientApi.giveAccessToPotentiallyEncrypted(await patientApi.patientApi.getPatientAndTryDecrypt(patient.id!), hcp1.id!)
    const fullySharedPatient = await hcp1Api.patientApi.giveAccessTo(await hcp1Api.patientApi.getPatient(patient.id!), patient.id!)
    expect((await patientApi.patientApi.getPatient(patient.id!)).note).to.equal(patientNote)
    expect((await hcp1Api.patientApi.getPatient(patient.id!)).note).to.equal(patientNote)
    const filterPatient2 = await new HealthcareElementFilter()
      .forDataOwner(patient.id!)
      .forPatients(patientApi.cryptoApi, [fullySharedPatient])
      .build()
    const patientFound2 = await patientApi.healthcareElementApi.matchHealthcareElement(filterPatient2)
    const filterHcp2 = await new HealthcareElementFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .forPatients(hcp1Api.cryptoApi, [fullySharedPatient])
      .build()
    const hcpFound2 = await hcp1Api.healthcareElementApi.matchHealthcareElement(filterHcp2)
    expect(patientFound2).to.have.length(2)
    expect(patientFound2).to.contain(heByPatient.id)
    expect(patientFound2).to.contain(heByHcp.id)
    expect(hcpFound2).to.have.length(2)
    expect(hcpFound2).to.contain(heByPatient.id)
    expect(hcpFound2).to.contain(heByHcp.id)
  })
})

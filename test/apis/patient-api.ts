import 'mocha'
import 'isomorphic-fetch'

import { assert, expect, use as chaiUse } from 'chai'
import { Patient } from '../../src/models/Patient'
import { HealthcareElement } from '../../src/models/HealthcareElement'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, patUsername, setLocalStorage, TestUtils } from '../test-utils'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { User } from '../../src/models/User'
import { deepEquality } from '../../src/utils/equality'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { ContextAwareRendererComponent } from 'typedoc/dist/lib/output/components'
import { it } from 'mocha'
chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

let env: TestVars
let hcp1Api: MedTechApi
let hcp1User: User

describe('Patient API', () => {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcp1Api = hcpApiAndUser.api
    hcp1User = hcpApiAndUser.user
  })

  it('Can create a patient and a related Healthcare Element', async () => {
    const patientToCreate = new Patient({
      firstName: 'John',
      lastName: 'Snow',
      note: 'Winter is coming',
    })

    // when
    const patient = await hcp1Api!.patientApi.createOrModifyPatient(patientToCreate)

    // Then
    expect(patient.id).to.not.be.undefined
    expect(patient.firstName).to.equal('John')
    expect(patient.lastName).to.equal('Snow')
    expect(patient.note).to.equal('Winter is coming')

    const retrieved = await hcp1Api!.patientApi.getPatient(patient.id!)
    expect(retrieved.id).to.equal(patient.id)
    expect(retrieved.firstName).to.equal('John')
    expect(retrieved.lastName).to.equal('Snow')
    expect(retrieved.note).to.equal('Winter is coming')

    // Init
    const healthElementToCreate = new HealthcareElement({
      note: 'Hero Syndrome',
    })

    const createdHealthElement = await hcp1Api!.healthcareElementApi.createOrModifyHealthcareElement(healthElementToCreate, patient.id)

    // Then
    expect(createdHealthElement.id).to.not.be.undefined
    expect(createdHealthElement.note).to.equal('Hero Syndrome')

    const retrievedHe = await hcp1Api!.healthcareElementApi.getHealthcareElement(createdHealthElement.id!)
    expect(retrievedHe.id).to.equal(createdHealthElement.id)
    expect(retrievedHe.note).to.equal('Hero Syndrome')
    expect(retrievedHe.systemMetaData?.secretForeignKeys!).to.have.length(1)
  })

  it('Patient sharing its own information with HCP', async function () {
    if (env.backendType === 'oss') this.skip()
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env.iCureUrl,
      env.msgGtwUrl,
      env.specId,
      env.patAuthProcessId,
      hcp1User.healthcarePartyId!,
      env.recaptcha,
      'recaptcha'
    )
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp2Username])
    const hcpApi = hcpApiAndUser.api
    const hcpUser = hcpApiAndUser.user
    const currentHcp = await hcpApi.healthcareProfessionalApi.getHealthcareProfessional(hcpUser.healthcarePartyId!)
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)
    const testNote = 'Some note'
    currentPatient.note = testNote
    const updatedPatient = await patApi.patientApi.modifyPotentiallyEncryptedPatient(currentPatient)
    expect(updatedPatient.note).to.equal(testNote)
    // Initially HCP can't access the patient
    await expect(hcpApi.patientApi.getPatient(currentPatient.id!)).to.be.rejected
    // Patient shares P and gets it updated and decrypted
    const sharedPatient = await patApi.patientApi.giveAccessToPotentiallyEncrypted(updatedPatient, currentHcp.id!)
    expect(sharedPatient.note).to.equal(testNote)
    // HCP can now access the patient
    const hcpPatient = await hcpApi.patientApi.getPatient(sharedPatient.id!)
    expect(hcpPatient).to.deep.equal(sharedPatient)
  }).timeout(60000)

  it('Patient may access info of another patient only if he has the appropriate delegation', async () => {
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)

    const createdPatient = await TestUtils.createDefaultPatient(hcp1Api)
    // Initially patient can't access the other patient
    await expect(patApi.patientApi.getPatient(createdPatient.id!)).to.be.rejected
    // Hcp shares the other patient and gets it updated and decrypted
    const sharedPatient = await hcp1Api!.patientApi.giveAccessTo(createdPatient, currentPatient.id!)
    expect(sharedPatient.note).to.not.be.undefined
    // Patient can now access the other patient
    await patApi.forceReload()
    const foundPatient = await patApi.patientApi.getPatient(sharedPatient.id!)
    expect(foundPatient).to.deep.equals(sharedPatient)
  })

  it('HCP sharing healthcare element with another HCP', async () => {
    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp2Username])
    const hcp2Api = hcp2ApiAndUser.api
    const hcp2User = hcp2ApiAndUser.user

    const createdPatient = await TestUtils.createDefaultPatient(hcp1Api)
    // Initially HCP2 can't access the patient
    await expect(hcp2Api.patientApi.getPatient(createdPatient.id!)).to.be.rejected
    // HCP1 shares the patient with HCP2 and gets it updated and decrypted
    const sharedPatient = await hcp1Api.patientApi.giveAccessTo(createdPatient, hcp2User.healthcarePartyId!)
    expect(sharedPatient.note).to.not.be.undefined
    // HCP2 can now access the patient
    const hcp2Patient = await hcp2Api.patientApi.getPatient(sharedPatient.id!)
    expect(hcp2Patient).to.deep.equals(sharedPatient)
  })

  it('Optimization - No delegation sharing if delegated already has access to patient', async () => {
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])

    const patient = await patApiAndUser.api.patientApi.getPatient(patApiAndUser.user.patientId!)

    // When
    const sharedPatient1 = await patApiAndUser.api.patientApi.giveAccessTo(patient, hcp1User!.healthcarePartyId!)
    // Currently if we create a new api we also create new exchange data because we can't verify the already existing data, so i'm re-sharing with the same api
    const sharedPatient2 = await patApiAndUser.api.patientApi.giveAccessTo(sharedPatient1, hcp1User!.healthcarePartyId!)

    // Then
    expect(sharedPatient1).to.deep.equal(sharedPatient2)
  })

  it('Delegator may not share info of Patient', async () => {
    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp2Username])
    const hcp2Api = hcp2ApiAndUser.api

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
    const patUser = patApiAndUser.user

    const createdPatient = await TestUtils.createDefaultPatient(hcp1Api)

    // When
    await hcp2Api.patientApi.giveAccessTo(createdPatient, patUser.patientId!).then(
      () => {
        throw Error(`HCP ${hcp2ApiAndUser.user.id} should not be able to access info of patient !!`)
      },
      (e) => assert(e != undefined)
    )
  })

  it('Give access to will fail if the patient version does not match the latest', async () => {
    const { api: h2api, user: h2 } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp2Username])
    const { api: pApi, user: p } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[patUsername])
    const note = 'Winter is coming'
    const patient = await hcp1Api!.patientApi.createOrModifyPatient(new Patient({ firstName: 'John', lastName: 'Snow', note }))
    await hcp1Api!.patientApi.giveAccessTo(patient, pApi.dataOwnerApi.getDataOwnerIdOf(p))
    await expect(hcp1Api!.patientApi.giveAccessTo(patient, h2api.dataOwnerApi.getDataOwnerIdOf(h2))).to.be.rejected
    expect((await hcp1Api!.patientApi.getPatient(patient.id!)).note).to.equal(note)
    expect((await pApi.patientApi.getPatient(patient.id!)).note).to.equal(note)
    await expect(h2api.patientApi.getPatient(patient.id!)).to.be.rejected
  }).timeout(60000)
})

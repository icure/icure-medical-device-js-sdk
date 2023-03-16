import 'mocha'
import 'isomorphic-fetch'

import { assert, expect, use as chaiUse } from 'chai'
import { Patient } from '../../src/models/Patient'
import { HealthcareElement } from '../../src/models/HealthcareElement'
import {
  getEnvironmentInitializer,
  getEnvVariables,
  hcp1Username,
  hcp2Username,
  patUsername,
  setLocalStorage,
  TestUtils,
  TestVars,
} from '../test-utils'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { User } from '../../src/models/User'
import { deepEquality } from '../../src/utils/equality'
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
    assert(patient.id != undefined)
    assert(patient.firstName == 'John')
    assert(patient.lastName == 'Snow')
    assert(patient.note == 'Winter is coming')
    assert(patient.systemMetaData?.delegations[hcp1User.healthcarePartyId!] != undefined)
    assert(patient.systemMetaData?.encryptionKeys[hcp1User.healthcarePartyId!] != undefined)

    // Init
    const healthElementToCreate = new HealthcareElement({
      note: 'Hero Syndrome',
    })

    const createdHealthElement = await hcp1Api!.healthcareElementApi.createOrModifyHealthcareElement(healthElementToCreate, patient.id)

    // Then
    assert(createdHealthElement.id != undefined)
    assert(createdHealthElement.note == 'Hero Syndrome')
    assert(createdHealthElement.systemMetaData?.secretForeignKeys != undefined)
    assert(createdHealthElement.systemMetaData?.delegations[hcp1User!.healthcarePartyId!] != undefined)
  })

  it('Patient sharing its own information with HCP', async function () {
    if (env.backendType === 'oss') this.skip()
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(
      env.iCureUrl,
      env.msgGtwUrl,
      env.specId,
      env.patAuthProcessId,
      hcp1User.healthcarePartyId!
    )
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp2Username])
    const hcpApi = hcpApiAndUser.api
    const hcpUser = hcpApiAndUser.user
    const currentHcp = await hcpApi.healthcareProfessionalApi.getHealthcareProfessional(hcpUser.healthcarePartyId!)

    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)
    const sharedPatient = await patApi.patientApi.giveAccessTo(currentPatient, currentHcp.id!)

    assert(sharedPatient.systemMetaData!.delegations[currentHcp.id!] != undefined)
    assert(sharedPatient.systemMetaData!.encryptionKeys[currentHcp.id!] != undefined)

    const hcpPatient = await hcpApi.patientApi.getPatient(sharedPatient.id!)
    assert(hcpPatient != null)
    assert(hcpPatient.id == sharedPatient.id)
  }).timeout(60000)

  it("Patient may not access info of another patient if he doesn't have any delegation", async function () {
    if (env.backendType === 'oss') this.skip()
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)

    const createdPatient = await TestUtils.createDefaultPatient(hcp1Api!)

    await patApi.patientApi.getPatient(createdPatient.id!).then(
      () => {
        throw Error(`Patient ${currentPatient.id} should not be able to access info of another patient !!`)
      },
      (e) => assert(e != undefined)
    )
  })

  it('Patient may access info of another patient if he has the appropriate delegation', async () => {
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)

    const createdPatient = await TestUtils.createDefaultPatient(hcp1Api)
    const sharedPatient = await hcp1Api!.patientApi.giveAccessTo(createdPatient, currentPatient.id!)

    assert(sharedPatient.systemMetaData!.delegations[currentPatient.id!] != undefined)
    assert(sharedPatient.systemMetaData!.encryptionKeys[currentPatient.id!] != undefined)

    const foundPatient = await patApi.patientApi.getPatient(sharedPatient.id!)
    expect(foundPatient.id!).to.equals(createdPatient.id!)
    expect(foundPatient.note!).to.equals(createdPatient.note!)
  })

  it('HCP sharing healthcare element with another HCP', async () => {
    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp2Username])
    const hcp2Api = hcp2ApiAndUser.api
    const hcp2User = hcp2ApiAndUser.user

    const createdPatient = await TestUtils.createDefaultPatient(hcp1Api)
    const sharedPatient = await hcp1Api.patientApi.giveAccessTo(createdPatient, hcp2User.healthcarePartyId!)

    assert(sharedPatient.systemMetaData!.delegations[hcp2User.healthcarePartyId!] != undefined)
    assert(sharedPatient.systemMetaData!.encryptionKeys[hcp2User.healthcarePartyId!] != undefined)

    const hcp2Patient = await hcp2Api.patientApi.getPatient(sharedPatient.id!)
    assert(hcp2Patient != null)
    assert(hcp2Patient.id == sharedPatient.id)
  })

  it('Optimization - No delegation sharing if delegated already has access to patient', async () => {
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])

    const patient = await patApiAndUser.api.patientApi.getPatient(patApiAndUser.user.patientId!)

    // When
    const sharedPatient = await patApiAndUser.api.patientApi.giveAccessTo(patient, patient!.id!)

    // Then
    assert(deepEquality(patient, sharedPatient))
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
    const { api: h2api, user: h2 } = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp2Username])
    const { api: pApi, user: p } = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
    const note = 'Winter is coming'
    const patient = await hcp1Api.patientApi.createOrModifyPatient(new Patient({ firstName: 'John', lastName: 'Snow', note }))
    await hcp1Api.patientApi.giveAccessTo(patient, pApi.dataOwnerApi.getDataOwnerIdOf(p))
    expect(hcp1Api.patientApi.giveAccessTo(patient, h2api.dataOwnerApi.getDataOwnerIdOf(h2))).to.be.rejected
    expect((await hcp1Api!.patientApi.getPatient(patient.id!)).note).to.equal(note)
    expect((await pApi.patientApi.getPatient(patient.id!)).note).to.equal(note)
    expect(h2api.patientApi.getPatient(patient.id!)).to.be.rejected
  }).timeout(60000)
})

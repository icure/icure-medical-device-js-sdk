import 'mocha'
import 'isomorphic-fetch'

import { assert, expect, use as chaiUse } from 'chai'
import { Patient } from '../../src/models/Patient'
import { HealthcareElement } from '../../src/models/HealthcareElement'
import { getEnvVariables, setLocalStorage, TestUtils } from '../test-utils'
chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

const {
  iCureUrl: iCureUrl,
  hcpUserName: hcpUserName,
  hcpPassword: hcpPassword,
  hcpPrivKey: hcpPrivKey,
  msgGtwUrl: msgGtwUrl,
  patUserName: patUserName,
  patPassword: patPassword,
  patPrivKey: patPrivKey,
  authProcessHcpId: authProcessHcpId,
  specId: specId,
  hcp2UserName: hcp2UserName,
  hcp2Password: hcp2Password,
  hcp2PrivKey: hcp2PrivKey,
  hcp3UserName: hcp3UserName,
  hcp3Password: hcp3Password,
  hcp3PrivKey: hcp3PrivKey,
} = getEnvVariables()

const patAuthProcessId = process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ?? '6a355458dbfa392cb5624403190c39e5' // pragma: allowlist secret

describe('Patient API', () => {
  it('Can create a patient and a related Healthcare Element', async () => {
    const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const medtechApi = apiAndUser.api
    const loggedUser = apiAndUser.user

    const patientToCreate = new Patient({
      firstName: 'John',
      lastName: 'Snow',
      note: 'Winter is coming',
    })

    // when
    const patient = await medtechApi.patientApi.createOrModifyPatient(patientToCreate)

    // Then
    assert(patient.id != undefined)
    assert(patient.firstName == 'John')
    assert(patient.lastName == 'Snow')
    assert(patient.note == 'Winter is coming')
    assert(patient.systemMetaData?.delegations[loggedUser.healthcarePartyId!] != undefined)
    assert(patient.systemMetaData?.encryptionKeys[loggedUser.healthcarePartyId!] != undefined)

    // Init
    const healthElementToCreate = new HealthcareElement({
      note: 'Hero Syndrome',
    })

    const createdHealthElement = await medtechApi.healthcareElementApi.createOrModifyHealthcareElement(healthElementToCreate, patient.id)

    // Then
    assert(createdHealthElement.id != undefined)
    assert(createdHealthElement.note == 'Hero Syndrome')
    assert(createdHealthElement.systemMetaData?.secretForeignKeys != undefined)
    assert(createdHealthElement.systemMetaData?.delegations[loggedUser.healthcarePartyId!] != undefined)
  })

  it('Patient sharing its own information with HCP', async () => {
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, specId, patAuthProcessId, authProcessHcpId)
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
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

  it('Patient may not access info of another patient', async () => {
    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcpApi = hcpApiAndUser.api

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)

    const createdPatient = await TestUtils.createDefaultPatient(hcpApi)
    const sharedPatient = await hcpApi.patientApi.giveAccessTo(createdPatient, currentPatient.id!)

    assert(sharedPatient.systemMetaData!.delegations[currentPatient.id!] != undefined)
    assert(sharedPatient.systemMetaData!.encryptionKeys[currentPatient.id!] != undefined)

    await patApi.patientApi.getPatient(sharedPatient.id!).then(
      () => {
        throw Error(`Patient ${currentPatient.id} should not be able to access info of another patient !!`)
      },
      (e) => assert(e != undefined)
    )
  })

  it('HCP sharing healthcare element with another HCP', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
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
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, 'ic', patAuthProcessId, authProcessHcpId)
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)

    const patient = await patApiAndUser.api.patientApi.getPatient(patApiAndUser.user.patientId!)
    console.log(patient.systemMetaData!.delegations)

    // When
    const sharedPatient = await patApiAndUser.api.patientApi.giveAccessTo(patient, hcp1ApiAndUser.user.healthcarePartyId!)

    // Then
    assert(patient === sharedPatient)
  })

  it('Delegator may not share info of Patient', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcp2Api = hcp2ApiAndUser.api

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
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
    const { api: h1api } = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const { api: h2api, user: h2 } = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp3UserName, hcp3Password, hcp3PrivKey)
    const { api: pApi, user: p } = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const note = 'Winter is coming'
    const patient = await h1api.patientApi.createOrModifyPatient(new Patient({ firstName: 'John', lastName: 'Snow', note }))
    await h1api.patientApi.giveAccessTo(patient, pApi.dataOwnerApi.getDataOwnerIdOf(p))
    expect(h1api.patientApi.giveAccessTo(patient, h2api.dataOwnerApi.getDataOwnerIdOf(h2))).to.be.rejected
    expect((await h1api.patientApi.getPatient(patient.id!)).note).to.equal(note)
    expect((await pApi.patientApi.getPatient(patient.id!)).note).to.equal(note)
    expect((await h2api.patientApi.getPatient(patient.id!)).note).to.be.undefined
  })
})

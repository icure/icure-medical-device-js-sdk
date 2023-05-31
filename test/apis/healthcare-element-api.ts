import 'mocha'
import { MedTechApi } from '../../src/apis/MedTechApi'
import 'isomorphic-fetch'
import { v4 as uuid } from 'uuid'
import { assert, expect, use as chaiUse } from 'chai'
import { Patient } from '../../src/models/Patient'
import { User } from '../../src/models/User'
import { HealthcareElement } from '../../src/models/HealthcareElement'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, hcp3Username, patUsername, setLocalStorage, TestUtils } from '../test-utils'
import { HealthcareElementFilter } from '../../src/filter'
import { it } from 'mocha'
import { deepEquality } from '../../src/utils/equality'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

let env: TestVars | undefined
let patApi: MedTechApi | undefined
let patUser: User | undefined
let hcp2Api: MedTechApi | undefined
let hcp2User: User | undefined
let hcp1Api: MedTechApi | undefined
let hcp1User: User | undefined

function createHealthcareElementForPatient(medtechApi: MedTechApi, patient: Patient): Promise<HealthcareElement> {
  return medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
    new HealthcareElement({
      note: 'Hero Syndrome',
      description: 'Fantastic',
    }),
    patient.id
  )
}

describe('Healthcare Element API', () => {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
    patApi = patApiAndUser.api
    patUser = patApiAndUser.user

    const patientDataOwner = await patApi.patientApi.getPatient(patUser!.patientId!)
    const sharedWithHcp1 = await patApi.patientApi.giveAccessTo(patientDataOwner, env.dataOwnerDetails[hcp1Username].dataOwnerId)
    await patApi.patientApi.giveAccessTo(sharedWithHcp1, env.dataOwnerDetails[hcp2Username].dataOwnerId)

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcp1Api = hcp1ApiAndUser.api
    hcp1User = hcp1ApiAndUser.user

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp2Username])
    hcp2Api = hcp2ApiAndUser.api
    hcp2User = hcp2ApiAndUser.user
  })

  it('Patient sharing healthcare element with HCP', async () => {
    const currentPatient = await patApi!.patientApi.getPatient(patUser!.patientId!)

    const currentHcp = await hcp2Api!.healthcareProfessionalApi.getHealthcareProfessional(hcp2User!.healthcarePartyId!)

    const createdHealthcareElement = await createHealthcareElementForPatient(patApi!, currentPatient)
    // Initially hcp2 can't get HE
    await expect(hcp2Api!.healthcareElementApi.getHealthcareElement(createdHealthcareElement.id!)).to.be.rejected
    // Patient shares HE and gets it updated and decrypted
    const sharedHealthcareElement = await patApi!.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentHcp.id!)
    expect(sharedHealthcareElement.note).to.not.be.undefined
    // HCP2 can now get HE and decrypt it
    const hcpHealthcareElement = await hcp2Api!.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!)
    expect(hcpHealthcareElement).to.not.be.null
    expect(hcpHealthcareElement).to.deep.equal(sharedHealthcareElement)
  })

  it('HCP sharing healthcare element with patient', async () => {
    const currentPatient = await patApi!.patientApi.getPatient(patUser!.patientId!)

    const createdHealthcareElement = await createHealthcareElementForPatient(hcp1Api!, currentPatient)
    // Initially patient can't get HE
    await expect(patApi!.healthcareElementApi.getHealthcareElement(createdHealthcareElement.id!)).to.be.rejected
    // HCP shares HE and gets it updated and decrypted
    const sharedHealthcareElement = await hcp1Api!.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentPatient.id!)
    expect(sharedHealthcareElement.note).to.not.be.undefined
    // Patient can now get HE and decrypt it (after refreshing the api to get the new keys for Access Control)
    await patApi!.cryptoApi.forceReload()
    const patHealthcareElement = await patApi!.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!)
    expect(patHealthcareElement).to.not.be.null
    expect(patHealthcareElement).to.deep.equal(sharedHealthcareElement)
  })

  it('HCP sharing healthcare element with another HCP', async () => {
    const patient = await TestUtils.createDefaultPatient(hcp1Api!)
    const currentHcp2 = await hcp2Api!.healthcareProfessionalApi.getHealthcareProfessional(hcp2User!.healthcarePartyId!)

    const createdHealthcareElement = await createHealthcareElementForPatient(hcp1Api!, patient)
    // Initially hcp2 can't get HE
    await expect(hcp2Api!.healthcareElementApi.getHealthcareElement(createdHealthcareElement.id!)).to.be.rejected
    // HCP1 shares HE and gets it updated and decrypted
    const sharedHealthcareElement = await hcp1Api!.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentHcp2.id!)
    expect(sharedHealthcareElement.note).to.not.be.undefined
    // HCP2 can now get HE and decrypt it
    const hcp2HealthcareElement = await hcp2Api!.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!)
    expect(hcp2HealthcareElement).to.not.be.null
    expect(hcp2HealthcareElement).to.deep.equal(sharedHealthcareElement)
  })

  it('Optimization - No delegation sharing if delegated already has access to HE', async () => {
    const patient = await patApi!.patientApi.getPatient(patUser!.patientId!)
    const createdHealthcareElement = await createHealthcareElementForPatient(patApi!, patient)

    // When
    const sharedHealthcareElement = await patApi!.healthcareElementApi.giveAccessTo(createdHealthcareElement, patUser!.patientId!)

    // Then
    assert(deepEquality(createdHealthcareElement, sharedHealthcareElement))
  })

  it('Users without access to the Healthcare element can not share it', async () => {
    const patient = await TestUtils.createDefaultPatient(hcp1Api!)
    const createdHealthcareElement = await createHealthcareElementForPatient(hcp1Api!, patient)

    // When
    await hcp2Api!.healthcareElementApi.giveAccessTo(createdHealthcareElement, patUser!.patientId!).then(
      () => {
        throw Error(`HCP ${hcp2User!.id} should not be able to access info of healthcare element !!`)
      },
      (e) => assert(e != undefined)
    )
  })

  it('Data Owner can filter all the Healthcare Elements for a Patient - Success', async () => {
    const newPatient = await TestUtils.createDefaultPatient(hcp1Api!)
    expect(!!newPatient).to.eq(true)

    const newHealthElement = await createHealthcareElementForPatient(hcp1Api!, newPatient)
    expect(!!newHealthElement).to.eq(true)

    const filteredElements = await hcp1Api!.healthcareElementApi.getHealthcareElementsForPatient(newPatient)
    expect(!!filteredElements).to.eq(true)
    expect(filteredElements.length).to.eq(1)
    expect(filteredElements[0]).to.deep.equal(newHealthElement)
  })

  it('Healthcare element content is equal when obtain by its id or through filter', async () => {
    const newPatient = await TestUtils.createDefaultPatient(hcp1Api!)
    expect(!!newPatient).to.eq(true)

    const newHealthElement = await createHealthcareElementForPatient(hcp1Api!, newPatient)
    expect(!!newHealthElement).to.eq(true)

    const filter = await new HealthcareElementFilter()
      .forDataOwner(hcp1User!.healthcarePartyId!)
      .forPatients(hcp1Api!.cryptoApi!, [newPatient])
      .byIds([newHealthElement.id!])
      .build()

    const healthcareElement = await hcp1Api!.healthcareElementApi.getHealthcareElement(newHealthElement.id!)
    const filteredHealthcareElements = await hcp1Api!.healthcareElementApi.filterHealthcareElement(filter)

    expect(!!filteredHealthcareElements).to.eq(true)
    expect(filteredHealthcareElements.rows.length).to.eq(1)
    expect(filteredHealthcareElements.rows[0].id).to.eq(healthcareElement.id)
    expect(filteredHealthcareElements.rows[0].note).to.eq(healthcareElement.note)
    expect(filteredHealthcareElements.rows[0].description).to.eq(healthcareElement.description)
  })

  it('getHealthcareElementsForPatient returns no Healthcare Elements for a Patient with no Healthcare Elements', async () => {
    const newPatient = await TestUtils.createDefaultPatient(hcp1Api!)
    expect(!!newPatient).to.eq(true)

    const filteredElements = await hcp1Api!.healthcareElementApi.getHealthcareElementsForPatient(newPatient)
    expect(!!filteredElements).to.eq(true)
    expect(filteredElements.length).to.eq(0)
  })

  it('Data Owner can filter all his Health Elements', async () => {
    const currentPatient = await patApi!.patientApi.getPatient(patUser!.patientId!)

    const createdHe = await createHealthcareElementForPatient(hcp2Api!, currentPatient)

    const filter = await new HealthcareElementFilter().forDataOwner(hcp2User!.healthcarePartyId!).build()

    const filterResult = await hcp2Api!.healthcareElementApi.filterHealthcareElement(filter)
    expect(filterResult.rows.length).to.gt(0)
    expect(filterResult.rows.find((x) => x.id == createdHe.id)).to.deep.equal(createdHe)
  })

  it('Data Owner can match all his Health Elements', async () => {
    const hcp3ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp3Username])

    const filter = await new HealthcareElementFilter().forDataOwner(hcp3ApiAndUser.user.healthcarePartyId!).build()

    const filterResult = await hcp2Api!.healthcareElementApi.filterHealthcareElement(filter)
    const matchResult = await hcp2Api!.healthcareElementApi.matchHealthcareElement(filter)
    expect(matchResult.length).to.eq(filterResult.rows.length)
    filterResult.rows.forEach((he) => {
      expect(matchResult).to.contain(he.id)
    })
  })

  it('if no Healthcare Element healthcareElementId is specified, then it should be set to the Healthcare Element id', async () => {
    const patient = await TestUtils.getOrCreatePatient(hcp1Api!)
    const newHE = await hcp1Api!.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({
        description: 'DUMMY_DESCRIPTION',
      }),
      patient.id
    )
    expect(!!newHE).to.eq(true)
    expect(!!newHE.id).to.eq(true)
    expect(newHE.id).to.eq(newHE.healthcareElementId)
  })

  it('if a Healthcare Element healthcareElementId is specified, then it should be different from the Healthcare Element id', async () => {
    const elementId = uuid()
    const patient = await TestUtils.getOrCreatePatient(hcp1Api!)
    const newHE = await hcp1Api!.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({
        description: 'DUMMY_DESCRIPTION',
        healthcareElementId: elementId,
      }),
      patient.id
    )
    expect(!!newHE).to.eq(true)
    expect(newHE.healthcareElementId).to.eq(elementId)
    expect(newHE.id).not.to.eq(elementId)
  })

  it('Using an older version of the entity in give access to should not change the content or revoke existing accesses from newer versions', async () => {
    const { api: h2api, user: h2 } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp3Username])
    const patient = await hcp1Api!.patientApi.createOrModifyPatient(new Patient({ firstName: 'Giovanni', lastName: 'Giorgio' }))
    const description = 'Description 1'
    const healthcareElement = await hcp1Api!.healthcareElementApi.createOrModifyHealthcareElement(new HealthcareElement({ description }), patient.id!)
    const modifiedDescription = 'Description 2'
    const modifiedHealthElement = await hcp1Api!.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({ ...healthcareElement, description: modifiedDescription })
    )
    await hcp1Api!.healthcareElementApi.giveAccessTo(healthcareElement, patApi!.dataOwnerApi.getDataOwnerIdOf(patUser!))
    await hcp1Api!.healthcareElementApi.giveAccessTo(healthcareElement, patApi!.dataOwnerApi.getDataOwnerIdOf(h2!))
    const retrievedByH1 = await hcp1Api!.healthcareElementApi.getHealthcareElement(healthcareElement.id!)
    const retrievedByH2 = await h2api.healthcareElementApi.getHealthcareElement(healthcareElement.id!)
    const retrievedByPatient = await patApi!.healthcareElementApi.getHealthcareElement(healthcareElement.id!)
    expect(retrievedByH1.description).to.eq(modifiedDescription)
    expect(retrievedByH2).to.deep.equal(retrievedByH1)
    expect(retrievedByPatient).to.deep.equal(retrievedByH1)
  })
})

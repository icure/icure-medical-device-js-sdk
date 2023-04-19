import 'mocha'
import { MedTechApi } from '../../src/apis/MedTechApi'
import 'isomorphic-fetch'
import { v4 as uuid } from 'uuid'
import { assert, expect, use as chaiUse } from 'chai'
import { Patient } from '../../src/models/Patient'
import { User } from '../../src/models/User'
import { HealthcareElement } from '../../src/models/HealthcareElement'
import {
  getEnvironmentInitializer,
  getEnvVariables,
  hcp1Username,
  hcp2Username,
  hcp3Username,
  patUsername,
  setLocalStorage,
  TestUtils,
  TestVars,
} from '../test-utils'
import { HealthcareElementFilter } from '../../src/filter'
import { it } from 'mocha'
import { deepEquality } from '../../src/utils/equality'
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
    const sharedHealthcareElement = await patApi!.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentHcp.id!)

    assert(sharedHealthcareElement.systemMetaData!.delegations[currentHcp.id!] != undefined)
    assert(sharedHealthcareElement.systemMetaData!.encryptionKeys[currentHcp.id!] != undefined)
    assert(sharedHealthcareElement.systemMetaData!.cryptedForeignKeys[currentHcp.id!] != undefined)

    const hcpHealthcareElement = await hcp2Api!.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!)
    assert(hcpHealthcareElement != null)
    assert(hcpHealthcareElement.id == sharedHealthcareElement.id)
  })

  it('HCP sharing healthcare element with patient', async () => {
    const currentPatient = await patApi!.patientApi.getPatient(patUser!.patientId!)

    const createdHealthcareElement = await createHealthcareElementForPatient(hcp1Api!, currentPatient)
    const sharedHealthcareElement = await hcp1Api!.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentPatient.id!)

    assert(sharedHealthcareElement.systemMetaData!.delegations[currentPatient.id!] != undefined)
    assert(sharedHealthcareElement.systemMetaData!.encryptionKeys[currentPatient.id!] != undefined)
    assert(sharedHealthcareElement.systemMetaData!.cryptedForeignKeys[currentPatient.id!] != undefined)

    const patHealthcareElement = await patApi!.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!)
    assert(patHealthcareElement != null)
    assert(patHealthcareElement.id == sharedHealthcareElement.id)
  })

  it('HCP sharing healthcare element with another HCP', async () => {
    const currentHcp2 = await hcp2Api!.healthcareProfessionalApi.getHealthcareProfessional(hcp2User!.healthcarePartyId!)

    const patient = await TestUtils.createDefaultPatient(hcp1Api!)

    const createdHealthcareElement = await createHealthcareElementForPatient(hcp1Api!, patient)
    const sharedHealthcareElement = await hcp1Api!.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentHcp2.id!)

    assert(sharedHealthcareElement.systemMetaData!.delegations[currentHcp2.id!] != undefined)
    assert(sharedHealthcareElement.systemMetaData!.encryptionKeys[currentHcp2.id!] != undefined)
    assert(sharedHealthcareElement.systemMetaData!.cryptedForeignKeys[currentHcp2.id!] != undefined)

    const hcp2HealthcareElement = await hcp2Api!.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!)
    assert(hcp2HealthcareElement != null)
    assert(hcp2HealthcareElement.id == sharedHealthcareElement.id)
  })

  it('Optimization - No delegation sharing if delegated already has access to HE', async () => {
    const patient = await patApi!.patientApi.getPatient(patUser!.patientId!)
    const createdHealthcareElement = await createHealthcareElementForPatient(patApi!, patient)

    // When
    const sharedHealthcareElement = await patApi!.healthcareElementApi.giveAccessTo(createdHealthcareElement, patUser!.patientId!)

    // Then
    assert(deepEquality(createdHealthcareElement, sharedHealthcareElement))
  })

  it('Delegator may not share info of Healthcare element', async () => {
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
    expect(filteredElements[0].id).to.eq(newHealthElement.id)
    expect(filteredElements[0].note).to.eq(newHealthElement.note)
    expect(filteredElements[0].description).to.eq(newHealthElement.description)
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

    await createHealthcareElementForPatient(hcp2Api!, currentPatient)

    const filter = await new HealthcareElementFilter().forDataOwner(hcp2User!.healthcarePartyId!).build()

    const filterResult = await hcp2Api!.healthcareElementApi.filterHealthcareElement(filter)
    expect(filterResult.rows.length).to.gt(0)
    filterResult.rows.forEach((he) => {
      expect(Object.keys(he.systemMetaData?.delegations ?? {})).to.contain(hcp2User!.healthcarePartyId!)
    })
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

  it('Give access to will fail if the healthcare version does not match the latest', async () => {
    const { api: h2api, user: h2 } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp3Username])
    const patient = await hcp1Api!.patientApi.createOrModifyPatient(new Patient({ firstName: 'Giovanni', lastName: 'Giorgio' }))
    const description = 'They call him "Giorgio"'
    const healthcareElement = await hcp1Api!.healthcareElementApi.createOrModifyHealthcareElement(new HealthcareElement({ description }), patient.id!)
    await hcp1Api!.healthcareElementApi.giveAccessTo(healthcareElement, patApi!.dataOwnerApi.getDataOwnerIdOf(patUser!))
    expect(hcp1Api!.healthcareElementApi.giveAccessTo(healthcareElement, h2api.dataOwnerApi.getDataOwnerIdOf(h2))).to.be.rejected
    expect((await hcp1Api!.healthcareElementApi.getHealthcareElement(healthcareElement.id!)).description).to.equal(description)
    expect((await patApi!.healthcareElementApi.getHealthcareElement(healthcareElement.id!)).description).to.equal(description)
    expect(h2api.healthcareElementApi.getHealthcareElement(healthcareElement.id!)).to.be.rejected
  })
})

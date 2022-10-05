import 'mocha'
import { MedTechApi } from '../../src/apis/MedTechApi'
import 'isomorphic-fetch'
import { v4 as uuid } from 'uuid'
import { assert, expect, use as chaiUse } from 'chai'
import { Patient } from '../../src/models/Patient'
import { User} from "../../src/models/User";
import {HealthcareElement } from '../../src/models/HealthcareElement'
import { getEnvironmentInitializer, getEnvVariables, setLocalStorage, TestUtils, TestVars} from '../test-utils'
import { HealthcareElementFilter } from '../../src/filter'
import { it } from 'mocha'
chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

let env: TestVars | undefined;
let patApi: MedTechApi | undefined;
let patUser: User | undefined;
let hcp2Api: MedTechApi | undefined;
let hcp2User: User | undefined;
let hcp1Api: MedTechApi | undefined;
let hcp1User: User | undefined;

function createHealthcareElementForPatient(medtechApi: MedTechApi, patient: Patient): Promise<HealthcareElement> {
  return medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
    new HealthcareElement({
      note: 'Hero Syndrome',
    }),
    patient.id
  )
}

describe('Healthcare Element API', () => {
  before(async () => {
    const initializer = await getEnvironmentInitializer();
    env = await initializer.execute(getEnvVariables());
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails["patDetails"]);
    patApi = patApiAndUser.api;
    patUser = patApiAndUser.user;

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails["hcpDetails"]);
    hcp1Api = hcp1ApiAndUser.api;
    hcp1User = hcp1ApiAndUser.user;

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails["hcp2Details"]);
    hcp2Api = hcp2ApiAndUser.api
    hcp2User = hcp2ApiAndUser.user
  })

  it('Patient sharing healthcare element with HCP', async () => {
    const currentPatient = await patApi!.patientApi.getPatient(patUser!.patientId!);

    const currentHcp = await hcp2Api!.healthcareProfessionalApi.getHealthcareProfessional(hcp2User!.healthcarePartyId!);

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
    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcpApi = hcpApiAndUser.api

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)

    const createdHealthcareElement = await createHealthcareElementForPatient(hcpApi, currentPatient)
    const sharedHealthcareElement = await hcpApi.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentPatient.id!)

    assert(sharedHealthcareElement.systemMetaData!.delegations[currentPatient.id!] != undefined)
    assert(sharedHealthcareElement.systemMetaData!.encryptionKeys[currentPatient.id!] != undefined)
    assert(sharedHealthcareElement.systemMetaData!.cryptedForeignKeys[currentPatient.id!] != undefined)

    const patHealthcareElement = await patApi!.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!)
    assert(patHealthcareElement != null)
    assert(patHealthcareElement.id == sharedHealthcareElement.id)
  })

  it('HCP sharing healthcare element with another HCP', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcp2Api = hcp2ApiAndUser.api
    const hcp2User = hcp2ApiAndUser.user
    const currentHcp2 = await hcp2Api.healthcareProfessionalApi.getHealthcareProfessional(hcp2User.healthcarePartyId!)

    const patient = await TestUtils.createDefaultPatient(hcp1Api)

    const createdHealthcareElement = await createHealthcareElementForPatient(hcp1Api, patient)
    const sharedHealthcareElement = await hcp1Api.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentHcp2.id!)

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
    const sharedHealthcareElement = await patApi!.healthcareElementApi.giveAccessTo(
      createdHealthcareElement,
      patUser!.healthcarePartyId!
    )

    // Then
    assert(createdHealthcareElement === sharedHealthcareElement)
  })

  it('Delegator may not share info of Healthcare element', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcp2Api = hcp2ApiAndUser.api

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patUser = patApiAndUser.user

    const patient = await TestUtils.createDefaultPatient(hcp1Api)
    const createdHealthcareElement = await createHealthcareElementForPatient(hcp1Api, patient)

    // When
    await hcp2Api!.healthcareElementApi.giveAccessTo(createdHealthcareElement, patUser!.patientId!).then(
      () => {
        throw Error(`HCP ${hcp2User!.id} should not be able to access info of healthcare element !!`)
      },
      (e) => assert(e != undefined)
    )
  })

  it('Data Owner can filter all the Healthcare Elements for a Patient - Success', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api

    const newPatient = await TestUtils.createDefaultPatient(hcp1Api)
    expect(!!newPatient).to.eq(true)

    const newHealthElement = await createHealthcareElementForPatient(hcp1Api!, newPatient)
    expect(!!newHealthElement).to.eq(true)

    const filteredElements = await hcp1Api!.healthcareElementApi.getHealthcareElementsForPatient(newPatient)
    expect(!!filteredElements).to.eq(true)
    expect(filteredElements.length).to.eq(1)
    expect(filteredElements[0].id).to.eq(newHealthElement.id)
  })

  it('getHealthcareElementsForPatient returns no Healthcare Elements for a Patient with no Healthcare Elements', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api

    const newPatient = await TestUtils.createDefaultPatient(hcp1Api)
    expect(!!newPatient).to.eq(true)

    const filteredElements = await hcp1Api!.healthcareElementApi.getHealthcareElementsForPatient(newPatient)
    expect(!!filteredElements).to.eq(true)
    expect(filteredElements.length).to.eq(0)
  })

  it('Data Owner can filter all his Health Elements', async () => {
    const hcp3ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp3UserName, hcp3Password, hcp3PrivKey)
    const hcp3Api = hcp3ApiAndUser.api

    const filter = await new HealthcareElementFilter().forDataOwner(hcp3ApiAndUser.user.healthcarePartyId!).build()

    const filterResult = await hcp3Api.healthcareElementApi.filterHealthcareElement(filter)
    expect(filterResult.rows.length).to.gt(0)
    filterResult.rows.forEach((he) => {
      expect(Object.keys(he.systemMetaData?.delegations ?? {})).to.contain(hcp3ApiAndUser.user.healthcarePartyId!)
    })
  })

  it('Data Owner can match all his Health Elements', async () => {
    const hcp3ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp3UserName, hcp3Password, hcp3PrivKey)
    const hcp3Api = hcp3ApiAndUser.api

    const filter = await new HealthcareElementFilter().forDataOwner(hcp3ApiAndUser.user.healthcarePartyId!).build()

    const filterResult = await hcp3Api.healthcareElementApi.filterHealthcareElement(filter)
    const matchResult = await hcp3Api.healthcareElementApi.matchHealthcareElement(filter)
    expect(matchResult.length).to.eq(filterResult.rows.length)
    filterResult.rows.forEach((he) => {
      expect(matchResult).to.contain(he.id)
    })
  })

  it('if no Healthcare Element healthcareElementId is specified, then it should be set to the Healthcare Element id', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails["hcpDetails"])
    const hcp1Api = hcp1ApiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(hcp1Api)
    const newHE = await hcp1Api.healthcareElementApi.createOrModifyHealthcareElement(
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
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails["hcpDetails"])
    const hcp1Api = hcp1ApiAndUser.api

    const elementId = uuid()
    const patient = await TestUtils.getOrCreatePatient(hcp1Api)
    const newHE = await hcp1Api.healthcareElementApi.createOrModifyHealthcareElement(
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
    const { api: h1api } = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const { api: h2api, user: h2 } = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp3UserName, hcp3Password, hcp3PrivKey)
    const { api: pApi, user: p } = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patient = await h1api.patientApi.createOrModifyPatient(new Patient({ firstName: 'Giovanni', lastName: 'Giorgio' }))
    const description = 'They call him "Giorgio"'
    const healthcareElement = await h1api.healthcareElementApi.createOrModifyHealthcareElement(new HealthcareElement({ description }), patient.id!)
    await h1api.healthcareElementApi.giveAccessTo(healthcareElement, pApi.dataOwnerApi.getDataOwnerIdOf(p))
    expect(h1api.healthcareElementApi.giveAccessTo(healthcareElement, h2api.dataOwnerApi.getDataOwnerIdOf(h2))).to.be.rejected
    expect((await h1api.healthcareElementApi.getHealthcareElement(healthcareElement.id!)).description).to.equal(description)
    expect((await pApi.healthcareElementApi.getHealthcareElement(healthcareElement.id!)).description).to.equal(description)
    expect(h2api.healthcareElementApi.getHealthcareElement(healthcareElement.id!)).to.be.rejected
  })
})

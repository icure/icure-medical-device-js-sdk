import 'mocha'
import 'isomorphic-fetch'

import { DataSampleFilter } from '../../src/filter'

import { assert, expect, use as chaiUse } from 'chai'
import { DataSample } from '../../src/models/DataSample'
import { CodingReference } from '../../src/models/CodingReference'
import { getEnvironmentInitializer, getEnvVariables, setLocalStorage, TestUtils, TestVars} from '../test-utils'
import { it } from 'mocha'
import { Patient } from '../../index'
chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

let env: TestVars | undefined;

describe('Data Samples API', () => {

  before(async () => {
    const initializer = await getEnvironmentInitializer();
    env = await initializer.execute(getEnvVariables());
  });

  it('Create Data Sample - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails["hcpDetails"])
    const medtechApi = apiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(medtechApi)

    // When
    const createdDataSample = await TestUtils.createDataSampleForPatient(medtechApi, patient)

    // Then
    assert(createdDataSample != undefined)
    assert(createdDataSample.id != undefined)
  })

  it('Create Data Sample linked to HealthElement - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails["hcpDetails"])
    const medtechApi = apiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(medtechApi)
    const healthElement = await TestUtils.getOrCreateHealthElement(medtechApi, patient)
    const dataSampleToCreate = new DataSample({
      labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST' })]),
      content: { en: { stringValue: 'Hello world' } },
      healthcareElementIds: new Set([healthElement!.id!]),
    })

    // When creating a data sample, linked to this healthcare element
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(patient.id!, dataSampleToCreate)

    // Then
    assert(createdDataSample != undefined)
    assert(createdDataSample.id != undefined)
    assert(createdDataSample.healthcareElementIds?.has(healthElement.id!) == true)
  })

  it('Create Data Sample and modify it to link it to HealthElement - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails["hcpDetails"])
    const medtechApi = apiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(medtechApi)
    const createdDataSample = await TestUtils.createDataSampleForPatient(medtechApi, patient)
    const healthElement = await TestUtils.getOrCreateHealthElement(medtechApi, patient)

    // When
    const modifiedDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(patient.id!, {
      ...createdDataSample,
      healthcareElementIds: new Set([healthElement!.id!]),
    })

    // Then
    assert(modifiedDataSample != undefined)
    assert(modifiedDataSample.id == createdDataSample.id)
    assert(modifiedDataSample.healthcareElementIds?.has(healthElement.id!) == true)
  })

  it('Can not create Data Sample with invalid healthElementId', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails["hcpDetails"])
    const medtechApi = apiAndUser.api
    const loggedUser = apiAndUser.user
    const patient = await TestUtils.getOrCreatePatient(medtechApi)

    // When
    const createdDataSample = await medtechApi.dataSampleApi
      .createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST' })]),
          content: { en: { stringValue: 'Hello world' } },
          healthcareElementIds: new Set(['I-DO-NOT-EXIST']),
        })
      )
      .catch((e) => {
        assert((e as Error).message == `Health elements I-DO-NOT-EXIST do not exist or user ${loggedUser.id} may not access them`)
      })

    // Then
    assert(createdDataSample == undefined)
  })

  it('Filter Data Samples', async () => {
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_USER!])
    const medtechApi = apiAndUser.api
    const loggedUser = apiAndUser.user

    const hcp = await medtechApi.healthcareProfessionalApi.getHealthcareProfessional(loggedUser.healthcarePartyId!)
    const patient = await TestUtils.getOrCreatePatient(medtechApi)
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([new CodingReference({ type: 'FILTER-IC-TEST', code: 'TEST' })]),
        content: { en: { stringValue: 'Hello world' } },
      })
    )

    const filter = await new DataSampleFilter()
      .forDataOwner(hcp.id!)
      .byLabelCodeFilter('FILTER-IC-TEST', 'TEST')
      .forPatients(medtechApi.cryptoApi, [patient])
      .build()

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(filter)
    assert(filteredDataSamples.rows.length == 1)
    assert(filteredDataSamples.rows.find((ds) => ds.id == createdDataSample.id))
  })

  it('Filter data samples by HealthElementIds - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(
      env!.iCureUrl,
      env!.dataOwnerDetails["hcpDetails"])
    const medtechApi = apiAndUser.api
    const loggedUser = apiAndUser.user

    const patient = await TestUtils.getOrCreatePatient(medtechApi)
    const healthElement = await TestUtils.getOrCreateHealthElement(medtechApi, patient)
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([new CodingReference({ type: 'FILTER-HE-IC-TEST', code: 'TEST' })]),
        content: { en: { stringValue: 'Hello world' } },
        healthcareElementIds: new Set([healthElement!.id!]),
      })
    )

    const filter = await new DataSampleFilter()
      .forDataOwner(loggedUser.healthcarePartyId!)
      .byLabelCodeFilter('FILTER-HE-IC-TEST', 'TEST')
      .byHealthElementIds([healthElement!.id!])
      .build()

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(filter)
    assert(filteredDataSamples.rows.length == 1)

    const testedDataSample = filteredDataSamples.rows.find((ds) => ds.id == createdDataSample.id)
    assert(testedDataSample != undefined)
    assert(testedDataSample!.healthcareElementIds!.has(healthElement.id!))
  })

  it('Patient sharing data sample with HCP', async () => {
    // Given
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_USER!]);
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_2_USER!]);
    const hcpApi = hcpApiAndUser.api
    const hcpUser = hcpApiAndUser.user
    const currentHcp = await hcpApi.healthcareProfessionalApi.getHealthcareProfessional(hcpUser.healthcarePartyId!)

    const createdDataSample = await TestUtils.createDataSampleForPatient(patApi, currentPatient)

    // When
    const sharedDataSample = await patApi.dataSampleApi.giveAccessTo(createdDataSample, currentHcp.id!)

    // Then
    const hcpDataSample = await hcpApi.dataSampleApi.getDataSample(sharedDataSample.id!)
    assert(hcpDataSample != null)
    assert(hcpDataSample.id == sharedDataSample.id)
  })

  it('HCP sharing data sample with patient', async () => {
    // Given
    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_USER!]);
    const hcpApi = hcpApiAndUser.api

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_PAT_USER!]);
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)

    const createdDataSample = await TestUtils.createDataSampleForPatient(hcpApi, currentPatient)

    // When
    const sharedDataSample = await hcpApi.dataSampleApi.giveAccessTo(createdDataSample, currentPatient.id!)

    // Then
    const patDataSample = await patApi.dataSampleApi.getDataSample(sharedDataSample.id!)
    assert(patDataSample != null)
    assert(patDataSample.id == sharedDataSample.id)
  })

  it('HCP sharing data sample with another HCP', async () => {
    // Given
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_USER!]);
    const hcp1Api = hcp1ApiAndUser.api

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_2_USER!]);
    const hcp2Api = hcp2ApiAndUser.api
    const hcp2User = hcp2ApiAndUser.user
    const currentHcp2 = await hcp2Api.healthcareProfessionalApi.getHealthcareProfessional(hcp2User.healthcarePartyId!)

    const patient = await TestUtils.getOrCreatePatient(hcp1Api)

    const createdDataSample = await TestUtils.createDataSampleForPatient(hcp1Api, patient)

    // When
    const sharedDataSample = await hcp1Api.dataSampleApi.giveAccessTo(createdDataSample, currentHcp2.id!)

    // Then
    const hcpDataSample = await hcp2Api.dataSampleApi.getDataSample(sharedDataSample.id!)
    assert(hcpDataSample != null)
    assert(hcpDataSample.id == sharedDataSample.id)
  })

  it('Optimization - No delegation sharing if delegated already has access to data sample', async () => {
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_PAT_USER!]);
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_USER!]);

    const patient = await patApiAndUser.api.patientApi.getPatient(patApiAndUser.user.patientId!)
    const createdDataSample = await TestUtils.createDataSampleForPatient(patApiAndUser.api, patient)

    // When
    const sharedDataSample = await patApiAndUser.api.dataSampleApi.giveAccessTo(createdDataSample, hcp1ApiAndUser.user.healthcarePartyId!)

    // Then
    assert(createdDataSample === sharedDataSample)
  })

  it('Delegator may not share info of Data Sample', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_USER!]);
    const hcp1Api = hcp1ApiAndUser.api

    const hcp3ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_3_USER!]);
    const hcp3Api = hcp3ApiAndUser.api

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_PAT_USER!]);
    const patUser = patApiAndUser.user

    const patient = await TestUtils.createDefaultPatient(hcp1Api)
    const createdDataSample = await TestUtils.createDataSampleForPatient(hcp1Api, patient)

    // When
    await hcp3Api.dataSampleApi.giveAccessTo(createdDataSample, patUser.patientId!).then(
      () => {
        throw Error(`HCP ${hcp3ApiAndUser.user.id} should not be able to access info of data sample !!`)
      },
      (e) => assert(e != undefined)
    )
  })

  it('Data Owner can filter all the Data Samples for a Patient - Success', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_USER!]);
    const hcp1Api = hcp1ApiAndUser.api

    const newPatient = await TestUtils.createDefaultPatient(hcp1Api)
    expect(!!newPatient).to.eq(true)

    const newDataSample = await TestUtils.createDataSampleForPatient(hcp1Api, newPatient)
    expect(!!newDataSample).to.eq(true)

    const filteredSamples = await hcp1Api.dataSampleApi.getDataSamplesForPatient(newPatient)
    expect(!!filteredSamples).to.eq(true)
    expect(filteredSamples.length).to.eq(1)
    expect(filteredSamples[0].id).to.eq(newDataSample.id)
  })

  it('getDataSamplesForPatient returns no Data Samples for a Patient with no Data Samples', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[process.env.ICURE_TS_TEST_HCP_USER!]);
    const hcp1Api = hcp1ApiAndUser.api

    const newPatient = await TestUtils.createDefaultPatient(hcp1Api)
    expect(!!newPatient).to.eq(true)

    const filteredSamples = await hcp1Api.dataSampleApi.getDataSamplesForPatient(newPatient)
    expect(!!filteredSamples).to.eq(true)
    expect(filteredSamples.length).to.eq(0)
  })

  it('Give access to will fail if the data sample version does not match the latest', async () => {
    const { api: h1api } = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const { api: h2api, user: h2 } = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp3UserName, hcp3Password, hcp3PrivKey)
    const { api: pApi, user: p } = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patient = await h1api.patientApi.createOrModifyPatient(new Patient({ firstName: 'John', lastName: 'Snow' }))
    const content = { en: { stringValue: 'Hello world' } }
    const contentString = JSON.stringify(content)
    const dataSample = await h1api.dataSampleApi.createOrModifyDataSampleFor(patient.id!, new DataSample({ content }))

    await h1api.dataSampleApi.giveAccessTo(dataSample, pApi.dataOwnerApi.getDataOwnerIdOf(p))

    // Won't work because need to have the latest revision
    expect(h1api.dataSampleApi.giveAccessTo(dataSample, h2api.dataOwnerApi.getDataOwnerIdOf(h2))).to.be.rejected

    expect(JSON.stringify((await h1api.dataSampleApi.getDataSample(dataSample.id!)).content)).to.equal(contentString)
    expect(JSON.stringify((await pApi.dataSampleApi.getDataSample(dataSample.id!)).content)).to.equal(contentString)
    expect(h2api.dataSampleApi.getDataSample(dataSample.id!)).to.be.rejected
  })
})

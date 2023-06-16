import 'mocha'
import 'isomorphic-fetch'

import { assert, expect, use as chaiUse } from 'chai'
import { DataSample } from '../../src/models/DataSample'
import { Content } from '../../src/models/Content'
import { CodingReference } from '../../src/models/CodingReference'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, hcp3Username, patUsername, setLocalStorage, TestUtils } from '../test-utils'
import { it } from 'mocha'
import { Patient } from '../../index'
chaiUse(require('chai-as-promised'))
import { deepEquality } from '../../src/utils/equality'
import { DataSampleApiImpl } from '../../src/apis/impl/DataSampleApiImpl'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { DataSampleFilter } from '../../src/filter/dsl/DataSampleFilterDsl'

setLocalStorage(fetch)

let env: TestVars | undefined

describe('Data Samples API', () => {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())
  })

  it('Create Data Sample - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(medtechApi)

    // When
    const createdDataSample = await TestUtils.createDataSampleForPatient(medtechApi, patient)

    // Then
    assert(createdDataSample != undefined)
    assert(createdDataSample.id != undefined)
  })

  it('Delete a Data Sample - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(medtechApi)

    // When
    const createdDataSample = await TestUtils.createDataSampleForPatient(medtechApi, patient)
    const deletedDataSample = await medtechApi.dataSampleApi.deleteDataSample(createdDataSample.id!)
    // Then
    assert(createdDataSample.id != undefined)
    assert(deletedDataSample === createdDataSample.id)
  })

  it('Delete Data Samples - with data in cache - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(medtechApi)

    // When
    const createdDataSamples = await TestUtils.createDataSamplesForPatient(medtechApi, patient)
    const deletedDataSamples = await medtechApi.dataSampleApi.deleteDataSamples(createdDataSamples.map((ds) => ds.id!))
    // Then
    assert(deletedDataSamples.length == 2)
    assert(createdDataSamples[0].id != undefined)
    assert(createdDataSamples[1].id != undefined)
    expect(deletedDataSamples).to.have.members(createdDataSamples.map((ds) => ds.id!))
  })

  it('Delete Data Samples - without data in cache - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(medtechApi)

    // When
    const createdDataSamples = await TestUtils.createDataSamplesForPatient(medtechApi, patient)
    ;(medtechApi.dataSampleApi as DataSampleApiImpl).clearContactCache()
    const deletedDataSamples = await medtechApi.dataSampleApi.deleteDataSamples(createdDataSamples.map((ds) => ds.id!))
    // Then
    assert(deletedDataSamples.length == 2)
    assert(createdDataSamples[0].id != undefined)
    assert(createdDataSamples[1].id != undefined)
    expect(deletedDataSamples).to.have.members(createdDataSamples.map((ds) => ds.id!))
  })

  it('Create Data Sample linked to HealthElement - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(medtechApi)
    const healthElement = await TestUtils.getOrCreateHealthElement(medtechApi, patient)
    const dataSampleToCreate = new DataSample({
      labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST' })]),
      content: { en: new Content({ stringValue: 'Hello world' }) },
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
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api

    const patient = await TestUtils.getOrCreatePatient(medtechApi)
    const createdDataSample = await TestUtils.createDataSampleForPatient(medtechApi, patient)
    const healthElement = await TestUtils.getOrCreateHealthElement(medtechApi, patient)

    // When
    const modifiedDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        ...createdDataSample,
        healthcareElementIds: new Set([healthElement!.id!]),
      })
    )

    // Then
    assert(modifiedDataSample != undefined)
    assert(modifiedDataSample.id == createdDataSample.id)
    assert(modifiedDataSample.healthcareElementIds?.has(healthElement.id!) == true)
  })

  it('Can not create Data Sample with invalid healthElementId', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api
    const loggedUser = apiAndUser.user
    const patient = await TestUtils.getOrCreatePatient(medtechApi)

    // When
    const createdDataSample = await medtechApi.dataSampleApi
      .createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST' })]),
          content: { en: new Content({ stringValue: 'Hello world' }) },
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
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api
    const loggedUser = apiAndUser.user

    const hcp = await medtechApi.healthcareProfessionalApi.getHealthcareProfessional(loggedUser.healthcarePartyId!)
    const patient = await TestUtils.getOrCreatePatient(medtechApi)
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([new CodingReference({ type: 'FILTER-IC-TEST', code: 'TEST' })]),
        content: { en: new Content({ stringValue: 'Hello world' }) },
      })
    )

    const filter = await new DataSampleFilter(medtechApi)
      .forDataOwner(hcp.id!)
      .byLabelCodeDateFilter('FILTER-IC-TEST', 'TEST')
      .forPatients([patient])
      .build()

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(filter)
    assert(filteredDataSamples.rows.length == 1)
    assert(filteredDataSamples.rows.find((ds) => ds.id == createdDataSample.id))
  })

  it('Filter data samples by HealthElementIds - Success', async () => {
    // Given
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(env!.iCureUrl, env!.dataOwnerDetails['hcpDetails'])
    const medtechApi = apiAndUser.api
    const loggedUser = apiAndUser.user

    const patient = await TestUtils.getOrCreatePatient(medtechApi)
    const healthElement = await TestUtils.getOrCreateHealthElement(medtechApi, patient)
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([new CodingReference({ type: 'FILTER-HE-IC-TEST', code: 'TEST' })]),
        content: { en: new Content({ stringValue: 'Hello world' }) },
        healthcareElementIds: new Set([healthElement!.id!]),
      })
    )

    const filter = await new DataSampleFilter(medtechApi)
      .forDataOwner(loggedUser.healthcarePartyId!)
      .byLabelCodeDateFilter('FILTER-HE-IC-TEST', 'TEST')
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
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[patUsername])
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp2Username])
    const hcpApi = hcpApiAndUser.api
    const hcpUser = hcpApiAndUser.user
    const currentHcp = await hcpApi.healthcareProfessionalApi.getHealthcareProfessional(hcpUser.healthcarePartyId!)
    const createdDataSample = await TestUtils.createDataSampleForPatient(patApi, currentPatient)
    // Initially hcp can't get data sample
    await expect(hcpApi.dataSampleApi.getDataSample(createdDataSample.id!)).to.be.rejected
    // Patient shares data sample and gets it updated and decrypted
    const sharedDataSample = await patApi.dataSampleApi.giveAccessTo(createdDataSample, currentHcp.id!)
    expect(Object.keys(sharedDataSample.content!)).to.have.length.greaterThan(0)
    // Hcp can now get data sample and decrypt it
    const hcpDataSample = await hcpApi.dataSampleApi.getDataSample(sharedDataSample.id!)
    expect(hcpDataSample).to.deep.equal(sharedDataSample)
  })

  it('HCP sharing data sample with patient', async () => {
    // Given
    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const hcpApi = hcpApiAndUser.api

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[patUsername])
    const patApi = patApiAndUser.api
    const patUser = patApiAndUser.user
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!)
    const updatedPatient = await patApi.patientApi.giveAccessTo(currentPatient, hcpApiAndUser.user.healthcarePartyId!)

    const createdDataSample = await TestUtils.createDataSampleForPatient(hcpApi, updatedPatient)
    // Initially patient can't get data sample
    await expect(patApi.dataSampleApi.getDataSample(createdDataSample.id!)).to.be.rejected
    // Hcp shares data sample and gets it updated and decrypted
    const sharedDataSample = await hcpApi.dataSampleApi.giveAccessTo(createdDataSample, updatedPatient.id!)
    expect(Object.keys(sharedDataSample.content!)).to.have.length.greaterThan(0)
    // Patient can now get data sample and decrypt it
    await patApi.forceReload()
    const patDataSample = await patApi.dataSampleApi.getDataSample(sharedDataSample.id!)
    expect(patDataSample).to.deep.equal(sharedDataSample)
  }).timeout(60000)

  it('HCP sharing data sample with another HCP', async () => {
    // Given
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const hcp1Api = hcp1ApiAndUser.api

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp2Username])
    const hcp2Api = hcp2ApiAndUser.api
    const hcp2User = hcp2ApiAndUser.user
    const currentHcp2 = await hcp2Api.healthcareProfessionalApi.getHealthcareProfessional(hcp2User.healthcarePartyId!)

    const patient = await TestUtils.getOrCreatePatient(hcp1Api)

    const createdDataSample = await TestUtils.createDataSampleForPatient(hcp1Api, patient)
    // Initially hcp2 can't get data sample
    await expect(hcp2Api.dataSampleApi.getDataSample(createdDataSample.id!)).to.be.rejected
    // Patient shares data sample and gets it updated and decrypted
    const sharedDataSample = await hcp1Api.dataSampleApi.giveAccessTo(createdDataSample, currentHcp2.id!)
    expect(Object.keys(sharedDataSample.content!)).to.have.length.greaterThan(0)
    // Hcp can now get data sample and decrypt it
    const hcpDataSample = await hcp2Api.dataSampleApi.getDataSample(sharedDataSample.id!)
    expect(hcpDataSample).to.deep.equal(sharedDataSample)
  })

  it('Optimization - No delegation sharing if delegated already has access to data sample', async () => {
    const { api: h1api, user: h1user } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const patient = await h1api.patientApi.createOrModifyPatient(new Patient({ firstName: 'John', lastName: 'Snow' }))

    const createdDataSample = await TestUtils.createDataSampleForPatient(h1api, patient)

    // When
    const sharedDataSample = await h1api.dataSampleApi.giveAccessTo(createdDataSample, h1user.healthcarePartyId!)

    // Then
    expect(sharedDataSample).to.deep.equal(createdDataSample)
  })

  it('Delegator may not share info of Data Sample', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const hcp1Api = hcp1ApiAndUser.api

    const hcp3ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp3Username])
    const hcp3Api = hcp3ApiAndUser.api

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[patUsername])
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
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
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
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const hcp1Api = hcp1ApiAndUser.api

    const newPatient = await TestUtils.createDefaultPatient(hcp1Api)
    expect(!!newPatient).to.eq(true)

    const filteredSamples = await hcp1Api.dataSampleApi.getDataSamplesForPatient(newPatient)
    expect(!!filteredSamples).to.eq(true)
    expect(filteredSamples.length).to.eq(0)
  })

  it('Using an older version of the entity in give access to should not change the content or revoke existing accesses from newer versions', async () => {
    const { api: h1api } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp2Username])
    const { api: h2api, user: h2 } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp3Username])
    const { api: pApi, user: p } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[patUsername])
    const patient = await h1api.patientApi.createOrModifyPatient(new Patient({ firstName: 'John', lastName: 'Snow' }))
    const content = { en: new Content({ stringValue: 'Hello world' }) }
    const dataSample = await h1api.dataSampleApi.createOrModifyDataSampleFor(patient.id!, new DataSample({ content }))
    const updatedContent = { en: new Content({ stringValue: 'Hello world 2' }) }
    const updatedDataSample = await h1api.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({ ...dataSample, content: updatedContent })
    )
    const updatedContentString = JSON.stringify(updatedContent)
    await h1api.dataSampleApi.giveAccessTo(dataSample, pApi.dataOwnerApi.getDataOwnerIdOf(p))
    await h1api.dataSampleApi.giveAccessTo(dataSample, h2api.dataOwnerApi.getDataOwnerIdOf(h2))
    await pApi.forceReload()
    expect(JSON.stringify((await h1api.dataSampleApi.getDataSample(dataSample.id!)).content)).to.equal(updatedContentString)
    expect(JSON.stringify((await h2api.dataSampleApi.getDataSample(dataSample.id!)).content)).to.equal(updatedContentString)
    expect(JSON.stringify((await pApi.dataSampleApi.getDataSample(dataSample.id!)).content)).to.equal(updatedContentString)
  })

  it('Should be able to create a DataSample and retrieve the associated patientId', async () => {
    const { api: h1api } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const patient = await h1api.patientApi.createOrModifyPatient(new Patient({ firstName: 'John', lastName: 'Snow' }))

    expect(patient.id).not.to.be.undefined

    const dataSample = await h1api.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        content: {
          en: new Content({ stringValue: 'I am a beautiful string' }),
        },
      })
    )

    const patientId = await h1api.dataSampleApi.extractPatientId(dataSample)

    expect(patientId).to.be.eq(patient.id!)
  })

  it('Should be able to filter and sort data samples by descending value date', async () => {
    const { api: h1api } = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const patient = await h1api.patientApi.createOrModifyPatient(new Patient({ firstName: 'JohnJohn', lastName: 'John' }))
    const labelType = `type-${h1api.cryptoApi.primitives.randomUuid()}`
    const labelCode = `code-${h1api.cryptoApi.primitives.randomUuid()}`
    const codeRef = new CodingReference({
      code: labelCode,
      type: labelType,
      version: '1',
      id: 'Some id',
    })
    const createDataSample = (valueDate: number) =>
      h1api.dataSampleApi.createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          content: {
            en: new Content({ stringValue: `Some sample at ${valueDate}` }),
          },
          labels: new Set([codeRef]),
          valueDate,
        })
      )
    const createdSamples = []
    for (let i = 0; i < 50; i++) {
      createdSamples.push(await createDataSample(Math.floor(Math.random() * 10000)))
    }
    const filter = await new DataSampleFilter(h1api)
      .forSelf()
      .sort.byLabelCodeDateFilter(labelType, labelCode, undefined, undefined, undefined, undefined, true)
      .build()
    const filteredSamples = await h1api.dataSampleApi.filterDataSample(filter)
    expect(filteredSamples.rows.map((x) => x.id)).to.have.members(createdSamples.map((x) => x.id))
    const sortedIds = [...filteredSamples.rows].sort((a, b) => b.valueDate! - a.valueDate!).map((x) => x.id)
    expect(filteredSamples.rows.map((x) => x.id)).to.have.ordered.members(sortedIds)
  })
})

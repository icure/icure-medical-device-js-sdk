import 'mocha'
import {MedTechApi, medTechApi} from '../apis/medTechApi';
import 'isomorphic-fetch'
import { webcrypto } from 'crypto'

import {hex2ua} from '@icure/api';
import {DataSampleFilter} from '../filter';

import { LocalStorage } from 'node-localstorage'
import * as os from 'os'
import {assert} from 'chai';
import {Patient} from '../models/Patient';
import {DataSample} from '../models/DataSample';
import {CodingReference} from '../models/CodingReference';
import {HealthcareElement} from "../models/HealthcareElement";
const tmp = os.tmpdir()
console.log('Saving keys in ' + tmp)
;(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024)
;(global as any).Storage = ''

const userName = process.env.ICURE_TS_TEST_USER!
const password = process.env.ICURE_TS_TEST_PWD!
const privKey = process.env.ICURE_TS_TEST_PRIV_KEY!

async function createPatient(medtechApi: MedTechApi): Promise<Patient> {
  return medtechApi.patientApi.createOrModifyPatient(new Patient({
    firstName: 'John',
    lastName: 'Snow',
    note: 'Winter is coming'
  }));
}

async function createHealthElement(medtechApi: MedTechApi, patient: Patient): Promise<HealthcareElement> {
  return medtechApi.healthcareElementApi.createOrModifyHealthcareElement(new HealthcareElement({
    note: 'Hero Syndrome'
  }), patient!.id!);
}

describe('Data Samples API', () => {
  it('Create Data Sample - Success', async () => {
    // Given
    const medtechApi = medTechApi().withICureBasePath('https://kraken.icure.dev/rest/v1')
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build()

    const loggedUser = await medtechApi.userApi.getLoggedUser()
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    )

    const patient = await createPatient(medtechApi)
    const dataSampleToCreate = new DataSample({
      labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST'})]),
      content: { 'en': { stringValue: 'Hello world' }}
    })

    // When
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(patient.id!, dataSampleToCreate)

    // Then
    assert(createdDataSample != undefined)
    assert(createdDataSample.id != undefined)
  })

  it('Create Data Sample linked to HealthElement - Success', async () => {
    // Given
    const medtechApi = medTechApi().withICureBasePath('https://kraken.icure.dev/rest/v1')
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build()

    const loggedUser = await medtechApi.userApi.getLoggedUser()
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    )

    const patient = await createPatient(medtechApi)
    const healthElement = await createHealthElement(medtechApi, patient)
    const dataSampleToCreate = new DataSample({
      labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST'})]),
      content: { 'en': { stringValue: 'Hello world' }},
      healthElementsIds: new Set([healthElement!.id!])
    })

    // When creating a data sample, linked to this healthcare element
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(patient.id!, dataSampleToCreate)

    // Then
    assert(createdDataSample != undefined)
    assert(createdDataSample.id != undefined)
    assert(createdDataSample.healthElementsIds?.has(healthElement.id!) == true)
  })

  it('Create Data Sample and modify it to link it to HealthElement - Success', async () => {
    // Given
    const medtechApi = medTechApi().withICureBasePath('https://kraken.icure.dev/rest/v1')
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build()

    const loggedUser = await medtechApi.userApi.getLoggedUser()
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    )

    const patient = await createPatient(medtechApi)
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(patient.id!, new DataSample({
      labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST'})]),
      content: { 'en': { stringValue: 'Hello world' }},
    }))
    const healthElement = await createHealthElement(medtechApi, patient)

    // When
    const modifiedDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(patient.id!, {...createdDataSample,
      healthElementsIds: new Set([healthElement!.id!])
    })

    // Then
    assert(modifiedDataSample != undefined)
    assert(modifiedDataSample.id == createdDataSample.id)
    assert(modifiedDataSample.healthElementsIds?.has(healthElement.id!) == true)
  })

  it('Can not create Data Sample with invalid healthElementId', async () => {
    // Given
    const medtechApi = medTechApi().withICureBasePath('https://kraken.icure.dev/rest/v1')
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build()

    const loggedUser = await medtechApi.userApi.getLoggedUser()
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    )

    const patient = await createPatient(medtechApi)

    // When
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(patient.id!, new DataSample({
      labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST'})]),
      content: { 'en': { stringValue: 'Hello world' }},
      healthElementsIds: new Set(["I-DO-NOT-EXIST"])
    }))
      .catch((e) => {
        assert((e as Error).message == `Health elements I-DO-NOT-EXIST do not exist or user ${loggedUser.id} may not access them`)
      })

    // Then
    assert(createdDataSample == undefined)
  })

  it('Filter Data Samples', async () => {
    const medtechApi = medTechApi().withICureBasePath('https://kraken.icure.dev/rest/v1')
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build()

    const loggedUser = await medtechApi.userApi.getLoggedUser()

    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    )

    const hcp = await medtechApi.healthcareProfessionalApi.getHealthcareProfessional(loggedUser.healthcarePartyId!)
    const patient = await medtechApi.patientApi.getPatient('33350ca9-c6d6-4f2d-a91b-daaa6333105a')

    const filter = await new DataSampleFilter()
      .forDataOwner(hcp.id!)
      .byTagCodeFilter('HK-KINO', 'RECORD')
      .forPatients(medtechApi.cryptoApi, [patient])
      .build()

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(filter)
    assert(filteredDataSamples.rows.length > 0)

    const dataSample = await medtechApi.dataSampleApi.getDataSample(filteredDataSamples.rows[0].id!)
    assert(dataSample != undefined)
  })

  it('Filter data samples by HealthElementIds - Success', async () => {
    // Given
    const medtechApi = medTechApi().withICureBasePath('https://kraken.icure.dev/rest/v1')
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build()

    const loggedUser = await medtechApi.userApi.getLoggedUser()
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    )

    const patient = await createPatient(medtechApi)
    const healthElement = await createHealthElement(medtechApi, patient)
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(patient.id!, new DataSample({
      labels: new Set([new CodingReference({ type: 'IC-TEST', code: 'TEST'})]),
      content: { 'en': { stringValue: 'Hello world' }},
      healthElementsIds: new Set([healthElement!.id!])
    }))

    const filter = await new DataSampleFilter()
      .forDataOwner(loggedUser.healthcarePartyId!)
      .byHealthElementIds([healthElement!.id!])
      .build()

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(filter)
    assert(filteredDataSamples.rows.length == 1)
    assert(filteredDataSamples.rows[0].id == createdDataSample!.id!)
    assert(filteredDataSamples.rows[0].healthElementsIds!.has(healthElement.id!))
  })

})

import 'mocha'
import {medTechApi} from "../apis/medTechApi";
import 'isomorphic-fetch'
import { webcrypto } from 'crypto'

import {hex2ua} from "@icure/api";
import {DataSampleFilter} from "../filter";

import { LocalStorage } from 'node-localstorage'
import * as os from 'os'
import {assert} from "chai";
const tmp = os.tmpdir()
console.log('Saving keys in ' + tmp)
;(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024)
;(global as any).Storage = ''

const userName = process.env.ICURE_TS_TEST_USER!
const password = process.env.ICURE_TS_TEST_PWD!
const privKey = process.env.ICURE_TS_TEST_PRIV_KEY!

describe('Data Samples API', () => {
  it('Filter Data Samples', async () => {
    const medtechApi = medTechApi().withICureBasePath('https://kraken.icure.dev/rest/v2')
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
    const patient = await medtechApi.patientApi.getPatient("4cd4ff91-d07f-4c23-b409-6a8fc5b07ebd")

    const filter = await new DataSampleFilter()
      .forDataOwner(hcp.id!)
      .forPatients(medtechApi.cryptoApi, [patient])
      .build()

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(filter)
    assert(filteredDataSamples.rows.length > 0)

    const dataSample = await medtechApi.dataSampleApi.getDataSample(filteredDataSamples.rows[0].id!)
    assert(dataSample != undefined)
  })
})

import 'isomorphic-fetch'
import { getEnvironmentInitializer, hcp1Username, setLocalStorage, TestUtils } from '../test-utils'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { User } from '../../src/models/User'
import { MedicalDeviceFilter } from '../../src/filter/dsl/MedicalDeviceFilterDsl'
import { FilterComposition, NoOpFilter } from '../../src/filter/dsl/filterDsl'
import { expect } from 'chai'
import { MedicalDevice } from '../../src/models/MedicalDevice'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { v4 as uuid } from 'uuid'

setLocalStorage(fetch)

let env: TestVars
let hcp1Api: MedTechApi
let hcp1User: User
let md1: MedicalDevice
let md2: MedicalDevice
let md3: MedicalDevice

describe('Medical Device Filters Test', function () {
  before(async function () {
    this.timeout(60000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcp1Api = hcp1ApiAndUser.api
    hcp1User = hcp1ApiAndUser.user

    md1 = await hcp1Api.medicalDeviceApi.createOrModifyMedicalDevice(
      new MedicalDevice({
        name: 'Giskard',
      })
    )

    md2 = await hcp1Api.medicalDeviceApi.createOrModifyMedicalDevice(
      new MedicalDevice({
        name: 'Daneel',
      })
    )

    md3 = await hcp1Api.medicalDeviceApi.createOrModifyMedicalDevice(
      new MedicalDevice({
        name: 'Marvin',
      })
    )
  })

  it('MedicalDeviceByIds test - Success', async function () {
    const devices = await hcp1Api.medicalDeviceApi.filterMedicalDevices(await new MedicalDeviceFilter(hcp1Api).byIds([md1.id!, md2.id!]).build())

    expect(!!devices).to.eq(true)
    expect(devices.rows.length).to.eq(2)
    expect(devices.rows.map((it) => it.id)).to.contain(md1.id)
    expect(devices.rows.map((it) => it.id)).to.contain(md2.id)
  })

  it('MedicalDeviceByIds test - Failure', async function () {
    const devices = await hcp1Api.medicalDeviceApi.filterMedicalDevices(
      await new MedicalDeviceFilter(hcp1Api).byIds(['DEFINITELY_NON_EXISTING']).build()
    )

    expect(devices.rows.length).to.be.equal(0)
  })

  it('If no parameter is specified, all medical devices are returned', async function () {
    const devices = await hcp1Api.medicalDeviceApi.filterMedicalDevices(await new MedicalDeviceFilter(hcp1Api).build())

    expect(devices.rows.length).to.be.greaterThan(0)
  })

  it('Can filter medical devices by union filter', async function () {
    const firstDeviceFilter = await new MedicalDeviceFilter(hcp1Api).byIds([md1.id!]).build()
    const secondDeviceFilter = await new MedicalDeviceFilter(hcp1Api).byIds([md3.id!, md2.id!]).build()

    const unionFilter = FilterComposition.union(firstDeviceFilter, secondDeviceFilter)

    const devices = await hcp1Api.medicalDeviceApi.filterMedicalDevices(unionFilter)

    expect(devices.rows.length).to.be.equal(3)
    expect(devices.rows.map((it) => it.id)).to.contain(md1.id!)
    expect(devices.rows.map((it) => it.id)).to.contain(md2.id!)
    expect(devices.rows.map((it) => it.id)).to.contain(md3.id!)
  })

  it('Can filter medical devices by explicit intersection filter', async function () {
    const firstDeviceFilter = await new MedicalDeviceFilter(hcp1Api).byIds([md3.id!, md2.id!]).build()
    const secondDeviceFilter = await new MedicalDeviceFilter(hcp1Api).byIds([md1.id!, md2.id!]).build()

    const intersectionFilter = FilterComposition.intersection(firstDeviceFilter, secondDeviceFilter)

    const devices = await hcp1Api.medicalDeviceApi.filterMedicalDevices(intersectionFilter)

    expect(devices.rows.length).to.be.equal(1)
    expect(devices.rows.map((it) => it.id)).to.contain(md2.id!)
  })

  it('Intersection between disjoint sets return empty result', async function () {
    const firstDeviceFilter = await new MedicalDeviceFilter(hcp1Api).byIds([md3.id!, md2.id!]).build()
    const secondDeviceFilter = await new MedicalDeviceFilter(hcp1Api).byIds([md1.id!]).build()

    const intersectionFilter = FilterComposition.intersection(firstDeviceFilter, secondDeviceFilter)

    const devices = await hcp1Api.medicalDeviceApi.filterMedicalDevices(intersectionFilter)

    expect(devices.rows.length).to.be.equal(0)
  })

  it('If a NoOpFilter is generated as result, an empty result is returned', async function () {
    const noOpFilter = await new MedicalDeviceFilter(hcp1Api).byIds([uuid()]).byIds([uuid()]).build()

    expect(NoOpFilter.isNoOp(noOpFilter)).to.be.true

    const devices = await hcp1Api.medicalDeviceApi.filterMedicalDevices(noOpFilter)
    expect(devices.rows.length).to.be.equal(0)
  })
})

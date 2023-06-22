import 'mocha'
import 'isomorphic-fetch'

import { assert, expect, use as chaiUse } from 'chai'
import { getEnvironmentInitializer, hcp1Username, setLocalStorage, TestUtils } from '../test-utils'
import { MedicalDevice } from '../../src/models/MedicalDevice'
import { v4 as uuid } from 'uuid'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

let env: TestVars | undefined

describe('MedicalDevice API', () => {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())
  })

  it('Can create a medical device', async () => {
    const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api

    const createdMedicalDevice = await medtechApi.medicalDeviceApi.createOrModifyMedicalDevice(
      new MedicalDevice({
        serialNumber: '123456789',
        name: 'What-If Machine',
        brand: 'Farnsworth',
        model: '2ACV16',
      })
    )

    expect(createdMedicalDevice.id).to.not.be.undefined
    expect(createdMedicalDevice.serialNumber).to.equal('123456789')
    expect(createdMedicalDevice.name).to.equal('What-If Machine')
    expect(createdMedicalDevice.brand).to.equal('Farnsworth')
    expect(createdMedicalDevice.model).to.equal('2ACV16')
    expect(createdMedicalDevice.created).to.not.be.undefined
    expect(createdMedicalDevice.modified).to.not.be.undefined
  })

  it('Can create a medical device and update it', async () => {
    const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])
    const medtechApi = apiAndUser.api

    const createdMedicalDevice = await medtechApi.medicalDeviceApi.createOrModifyMedicalDevice(
      new MedicalDevice({
        serialNumber: '123456789',
        name: 'What-If Machine',
        brand: 'Farnsworth',
        model: '2ACV16',
      })
    )

    const newSerialNumber = uuid()

    const updatedMedicalDevice = await medtechApi.medicalDeviceApi.createOrModifyMedicalDevice(
      new MedicalDevice({
        ...createdMedicalDevice,
        serialNumber: newSerialNumber,
        modified: undefined,
        model: '2ACV16',
      })
    )

    expect(updatedMedicalDevice.id).to.not.be.undefined
    expect(updatedMedicalDevice.serialNumber).to.equal(newSerialNumber)
    expect(updatedMedicalDevice.rev?.startsWith('2-'), 'Rev should start with 2-').to.be.true
    expect(updatedMedicalDevice.name).to.equal('What-If Machine')
    expect(updatedMedicalDevice.brand).to.equal('Farnsworth')
    expect(updatedMedicalDevice.model).to.equal('2ACV16')
    expect(updatedMedicalDevice.created).to.not.be.undefined
    expect(updatedMedicalDevice.modified).to.not.be.undefined
    expect(updatedMedicalDevice.created).to.be.lessThan(updatedMedicalDevice.modified!)
  })
})

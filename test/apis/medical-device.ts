import 'mocha'
import 'isomorphic-fetch'

import { assert, use as chaiUse } from 'chai'
import { getEnvVariables, setLocalStorage, TestUtils } from '../test-utils'
import { MedicalDevice } from '../../src/models/MedicalDevice'
import { v4 as uuid } from 'uuid'
chaiUse(require('chai-as-promised'))

setLocalStorage(fetch)

const { iCureUrl: iCureUrl, hcpUserName: hcpUserName, hcpPassword: hcpPassword, hcpPrivKey: hcpPrivKey } = getEnvVariables()

describe('MedicalDevice API', () => {
  it('Can create a medical device', async () => {
    const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const medtechApi = apiAndUser.api

    const createdMedicalDevice = await medtechApi.medicalDeviceApi.createOrModifyMedicalDevice(
      new MedicalDevice({
        serialNumber: '123456789',
        name: 'What-If Machine',
        brand: 'Farnsworth',
        model: '2ACV16',
      })
    )

    assert(createdMedicalDevice.id != undefined)
    assert(createdMedicalDevice.serialNumber == '123456789')
    assert(createdMedicalDevice.name == 'What-If Machine')
    assert(createdMedicalDevice.brand == 'Farnsworth')
    assert(createdMedicalDevice.model == '2ACV16')
    assert(createdMedicalDevice.created != undefined)
    assert(createdMedicalDevice.modified != undefined)
  })

  it('Can create a medical device and update it', async () => {
    const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
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
        name: 'What-If Machine',
        brand: 'Farnsworth',
        model: '2ACV16',
      })
    )

    assert(updatedMedicalDevice.id != undefined)
    assert(updatedMedicalDevice.serialNumber == newSerialNumber)
    assert(updatedMedicalDevice.rev?.startsWith('2-') == true)
    assert(updatedMedicalDevice.name == 'What-If Machine')
    assert(updatedMedicalDevice.brand == 'Farnsworth')
    assert(updatedMedicalDevice.model == '2ACV16')
    assert(updatedMedicalDevice.created != undefined)
    assert(updatedMedicalDevice.modified != undefined)
    assert(updatedMedicalDevice.created < updatedMedicalDevice.modified)
  })
})

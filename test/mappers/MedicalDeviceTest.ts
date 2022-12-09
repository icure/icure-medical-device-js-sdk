import 'mocha';

import {assert} from "chai";
import {MedicalDeviceMapper} from "../../src/mappers/medicalDevice";
import {newMedicalDevice} from "../models/medicalDeviceTest";

describe('MedicalDevice mapper test', () => {
  it('Mapping/Unmapping of MedicalDevice model - Success', () => {
    const medicalDevice = newMedicalDevice()
    const mappedMedicalDevice = MedicalDeviceMapper.toDeviceDto(medicalDevice)
    assert.deepEqual(MedicalDeviceMapper.toMedicalDevice(mappedMedicalDevice), medicalDevice)
  });
});


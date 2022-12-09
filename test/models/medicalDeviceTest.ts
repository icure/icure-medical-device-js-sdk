import 'mocha';

import {MedicalDevice} from '../../src/models/MedicalDevice';
import {assert} from "chai";
import {newCodingReference} from "./codingReferenceTest";
import {newProperty} from "./propertyTest";
import {newSystemMetaDataOwner} from "./systemMetaDataOwnerTest";

export function newMedicalDevice(): MedicalDevice {
  return new MedicalDevice({
    id: "id",
    rev: "rev",
    created: 123,
    modified: 456,
    labels: new Set([newCodingReference()]),
    codes: new Set([newCodingReference()]),
    deletionDate: 789,
    name: "name",
    author: "author",
    responsible: "responsible",
    endOfLife: 101112,
    externalId: "externalId",
    type: "type",
    brand: "brand",
    model: "model",
    serialNumber: "serialNumber",
    parentId: "parentId",
    picture: new ArrayBuffer(5),
    properties: new Set([newProperty()]),
    systemMetaData: newSystemMetaDataOwner(),
  });
}

describe('MedicalDevice model test', () => {
  it('Marshalling/Unmarshalling of MedicalDevice model - Success', () => {
    const medicalDevice = newMedicalDevice()
    const marshalledMedicalDevice = medicalDevice.marshal()
    const unmarshalledMedicalDevice = new MedicalDevice(JSON.parse(JSON.stringify(marshalledMedicalDevice)))
    assert.deepEqual(medicalDevice, unmarshalledMedicalDevice)
    assert.deepEqual(medicalDevice, new MedicalDevice(medicalDevice))
  });
});

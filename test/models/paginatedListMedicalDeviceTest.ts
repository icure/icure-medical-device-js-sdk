import 'mocha';

import {PaginatedListMedicalDevice} from '../../src/models/PaginatedListMedicalDevice';
import {assert} from "chai";
import {newMedicalDevice} from "./medicalDeviceTest";
import {newPaginatedDocumentKeyAndIdPairObject} from "./paginatedDocumentKeyAndIdPairObjectTest";

function newPaginatedListMedicalDevice() {
  return new PaginatedListMedicalDevice({
    pageSize: 123,
    totalSize: 456,
    rows: [newMedicalDevice()],
    nextKeyPair: newPaginatedDocumentKeyAndIdPairObject(),
  });
}

describe('PaginatedListMedicalDevice model test', () => {
  it('Marshalling/Unmarshalling of PaginatedListMedicalDevice model - Success', () => {
    const paginatedListMedicalDevice = newPaginatedListMedicalDevice()
    const marshalledPaginatedListMedicalDevice = paginatedListMedicalDevice.marshal()
    const unmarshalledPaginatedListMedicalDevice = new PaginatedListMedicalDevice(JSON.parse(JSON.stringify(marshalledPaginatedListMedicalDevice)))
    assert.deepEqual(paginatedListMedicalDevice, unmarshalledPaginatedListMedicalDevice)
    assert.deepEqual(paginatedListMedicalDevice, new PaginatedListMedicalDevice(paginatedListMedicalDevice))
  });
});

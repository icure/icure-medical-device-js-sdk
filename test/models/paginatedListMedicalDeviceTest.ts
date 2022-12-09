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
    const address = newPaginatedListMedicalDevice()
    const marshalledPaginatedListMedicalDevice = address.marshal()
    const unmarshalledPaginatedListMedicalDevice = new PaginatedListMedicalDevice(marshalledPaginatedListMedicalDevice)
    assert.deepEqual(address, unmarshalledPaginatedListMedicalDevice)
  });
});

import 'mocha';

import {PaginatedListPatient} from '../../src/models/PaginatedListPatient';
import {assert} from "chai";
import {newPatient} from "./patientTest";
import {newPaginatedDocumentKeyAndIdPairObject} from "./paginatedDocumentKeyAndIdPairObjectTest";

function newPaginatedListPatient() {
  return new PaginatedListPatient({
    pageSize: 123,
    totalSize: 456,
    rows: [newPatient()],
    nextKeyPair: newPaginatedDocumentKeyAndIdPairObject(),
  });
}

describe('PaginatedListPatient model test', () => {
  it('Marshalling/Unmarshalling of PaginatedListPatient model - Success', () => {
    const address = newPaginatedListPatient()
    const marshalledPaginatedListPatient = address.marshal()
    const unmarshalledPaginatedListPatient = new PaginatedListPatient(marshalledPaginatedListPatient)
    assert.deepEqual(address, unmarshalledPaginatedListPatient)
  });
});

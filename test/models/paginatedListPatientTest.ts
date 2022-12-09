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
    const paginatedListPatient = newPaginatedListPatient()
    const marshalledPaginatedListPatient = paginatedListPatient.marshal()
    const unmarshalledPaginatedListPatient = new PaginatedListPatient(JSON.parse(JSON.stringify(marshalledPaginatedListPatient)))
    assert.deepEqual(paginatedListPatient, unmarshalledPaginatedListPatient)
    assert.deepEqual(paginatedListPatient, new PaginatedListPatient(paginatedListPatient))
  });
});

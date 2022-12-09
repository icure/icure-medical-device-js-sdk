import 'mocha';

import {PaginatedListHealthcareProfessional} from '../../src/models/PaginatedListHealthcareProfessional';
import {assert} from "chai";
import {newHealthcareProfessional} from "./healthcareProfessionalTest";
import {newPaginatedDocumentKeyAndIdPairObject} from "./paginatedDocumentKeyAndIdPairObjectTest";

function newPaginatedListHealthcareProfessional() {
  return new PaginatedListHealthcareProfessional({
    pageSize: 123,
    totalSize: 456,
    rows: [newHealthcareProfessional()],
    nextKeyPair: newPaginatedDocumentKeyAndIdPairObject(),
  });
}

describe('PaginatedListHealthcareProfessional model test', () => {
  it('Marshalling/Unmarshalling of PaginatedListHealthcareProfessional model - Success', () => {
    const address = newPaginatedListHealthcareProfessional()
    const marshalledPaginatedListHealthcareProfessional = address.marshal()
    const unmarshalledPaginatedListHealthcareProfessional = new PaginatedListHealthcareProfessional(marshalledPaginatedListHealthcareProfessional)
    assert.deepEqual(address, unmarshalledPaginatedListHealthcareProfessional)
  });
});

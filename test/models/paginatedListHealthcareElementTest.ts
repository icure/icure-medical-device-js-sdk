import 'mocha';

import {PaginatedListHealthcareElement} from '../../src/models/PaginatedListHealthcareElement';
import {assert} from "chai";
import {newHealthcareElement} from "./healthcareElementTest";
import {newPaginatedDocumentKeyAndIdPairObject} from "./paginatedDocumentKeyAndIdPairObjectTest";

function newPaginatedListHealthcareElement() {
  return new PaginatedListHealthcareElement({
    pageSize: 123,
    totalSize: 456,
    rows: [newHealthcareElement()],
    nextKeyPair: newPaginatedDocumentKeyAndIdPairObject(),
  });
}

describe('PaginatedListHealthcareElement model test', () => {
  it('Marshalling/Unmarshalling of PaginatedListHealthcareElement model - Success', () => {
    const address = newPaginatedListHealthcareElement()
    const marshalledPaginatedListHealthcareElement = address.marshal()
    const unmarshalledPaginatedListHealthcareElement = new PaginatedListHealthcareElement(marshalledPaginatedListHealthcareElement)
    assert.deepEqual(address, unmarshalledPaginatedListHealthcareElement)
  });
});

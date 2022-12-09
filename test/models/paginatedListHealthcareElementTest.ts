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
    const paginatedListHealthcareElement = newPaginatedListHealthcareElement()
    const marshalledPaginatedListHealthcareElement = paginatedListHealthcareElement.marshal()
    const unmarshalledPaginatedListHealthcareElement = new PaginatedListHealthcareElement(JSON.parse(JSON.stringify(marshalledPaginatedListHealthcareElement)))
    assert.deepEqual(paginatedListHealthcareElement, unmarshalledPaginatedListHealthcareElement)
    assert.deepEqual(paginatedListHealthcareElement, new PaginatedListHealthcareElement(paginatedListHealthcareElement))
  });
});

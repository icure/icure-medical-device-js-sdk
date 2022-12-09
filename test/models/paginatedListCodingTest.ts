import 'mocha';

import {PaginatedListCoding} from '../../src/models/PaginatedListCoding';
import {assert} from "chai";
import {newCodingReference} from "./codingReferenceTest";
import {newCoding} from "./codingTest";
import {newPaginatedDocumentKeyAndIdPairObject} from "./paginatedDocumentKeyAndIdPairObjectTest";

function newPaginatedListCoding() {
  return new PaginatedListCoding({
    pageSize: 123,
    totalSize: 456,
    rows: [newCoding()],
    nextKeyPair: newPaginatedDocumentKeyAndIdPairObject(),
  });
}

describe('PaginatedListCoding model test', () => {
  it('Marshalling/Unmarshalling of PaginatedListCoding model - Success', () => {
    const address = newPaginatedListCoding()
    const marshalledPaginatedListCoding = address.marshal()
    const unmarshalledPaginatedListCoding = new PaginatedListCoding(marshalledPaginatedListCoding)
    assert.deepEqual(address, unmarshalledPaginatedListCoding)
  });
});

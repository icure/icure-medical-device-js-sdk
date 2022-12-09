import 'mocha';

import {PaginatedListDataSample} from '../../src/models/PaginatedListDataSample';
import {assert} from "chai";
import {newCodingReference} from "./codingReferenceTest";
import {newPaginatedDocumentKeyAndIdPairObject} from "./paginatedDocumentKeyAndIdPairObjectTest";
import {newDataSample} from "./dataSampleTest";

function newPaginatedListDataSample() {
  return new PaginatedListDataSample({
    pageSize: 123,
    totalSize: 456,
    rows: [newDataSample()],
    nextKeyPair: newPaginatedDocumentKeyAndIdPairObject(),
  });
}

describe('PaginatedListDataSample model test', () => {
  it('Marshalling/Unmarshalling of PaginatedListDataSample model - Success', () => {
    const address = newPaginatedListDataSample()
    const marshalledPaginatedListDataSample = address.marshal()
    const unmarshalledPaginatedListDataSample = new PaginatedListDataSample(marshalledPaginatedListDataSample)
    assert.deepEqual(address, unmarshalledPaginatedListDataSample)
  });
});

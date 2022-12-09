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
    const paginatedListDataSample = newPaginatedListDataSample()
    const marshalledPaginatedListDataSample = paginatedListDataSample.marshal()
    const unmarshalledPaginatedListDataSample = new PaginatedListDataSample(JSON.parse(JSON.stringify(marshalledPaginatedListDataSample)))
    assert.deepEqual(paginatedListDataSample, unmarshalledPaginatedListDataSample)
    assert.deepEqual(paginatedListDataSample, new PaginatedListDataSample(paginatedListDataSample))
  });
});

import 'mocha';

import {PaginatedDocumentKeyAndIdPairObject} from '../../src/models/PaginatedDocumentKeyAndIdPairObject';
import {assert} from "chai";

export function newPaginatedDocumentKeyAndIdPairObject(): PaginatedDocumentKeyAndIdPairObject {
  return new PaginatedDocumentKeyAndIdPairObject({
    startKey: 'startKey',
    startKeyDocId: 'startKeyDocId',
  });
}

describe('PaginatedDocumentKeyAndIdPairObject model test', () => {
  it('Marshalling/Unmarshalling of PaginatedDocumentKeyAndIdPairObject model - Success', () => {
    const paginatedDocumentKeyAndIdPairObject = newPaginatedDocumentKeyAndIdPairObject()
    const marshalledPaginatedDocumentKeyAndIdPairObject = paginatedDocumentKeyAndIdPairObject.marshal()
    const unmarshalledPaginatedDocumentKeyAndIdPairObject = new PaginatedDocumentKeyAndIdPairObject(JSON.parse(JSON.stringify(marshalledPaginatedDocumentKeyAndIdPairObject)))
    assert.deepEqual(paginatedDocumentKeyAndIdPairObject, unmarshalledPaginatedDocumentKeyAndIdPairObject)
    assert.deepEqual(paginatedDocumentKeyAndIdPairObject, new PaginatedDocumentKeyAndIdPairObject(paginatedDocumentKeyAndIdPairObject))
  });
});

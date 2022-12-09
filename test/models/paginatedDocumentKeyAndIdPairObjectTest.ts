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
    const address = newPaginatedDocumentKeyAndIdPairObject()
    const marshalledPaginatedDocumentKeyAndIdPairObject = address.marshal()
    const unmarshalledPaginatedDocumentKeyAndIdPairObject = new PaginatedDocumentKeyAndIdPairObject(marshalledPaginatedDocumentKeyAndIdPairObject)
    assert.deepEqual(address, unmarshalledPaginatedDocumentKeyAndIdPairObject)
  });
});

import 'mocha';

import {PaginatedListUser} from '../../src/models/PaginatedListUser';
import {assert} from "chai";
import {newUser} from "./userTest";
import {newPaginatedDocumentKeyAndIdPairObject} from "./paginatedDocumentKeyAndIdPairObjectTest";

function newPaginatedListUser() {
  return new PaginatedListUser({
    pageSize: 123,
    totalSize: 456,
    rows: [newUser()],
    nextKeyPair: newPaginatedDocumentKeyAndIdPairObject(),
  });
}

describe('PaginatedListUser model test', () => {
  it('Marshalling/Unmarshalling of PaginatedListUser model - Success', () => {
    const address = newPaginatedListUser()
    const marshalledPaginatedListUser = address.marshal()
    const unmarshalledPaginatedListUser = new PaginatedListUser(marshalledPaginatedListUser)
    assert.deepEqual(address, unmarshalledPaginatedListUser)
  });
});

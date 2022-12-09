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
    const paginatedListUser = newPaginatedListUser()
    const marshalledPaginatedListUser = paginatedListUser.marshal()
    const unmarshalledPaginatedListUser = new PaginatedListUser(JSON.parse(JSON.stringify(marshalledPaginatedListUser)))
    assert.deepEqual(paginatedListUser, unmarshalledPaginatedListUser)
    assert.deepEqual(paginatedListUser, new PaginatedListUser(paginatedListUser))
  });
});

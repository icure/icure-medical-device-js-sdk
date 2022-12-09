import 'mocha';

import {PaginatedListNotification} from '../../src/models/PaginatedListNotification';
import {assert} from "chai";
import {newNotification} from "./notificationTest";
import {newPaginatedDocumentKeyAndIdPairObject} from "./paginatedDocumentKeyAndIdPairObjectTest";

function newPaginatedListNotification() {
  return new PaginatedListNotification({
    pageSize: 123,
    totalSize: 456,
    rows: [newNotification()],
    nextKeyPair: newPaginatedDocumentKeyAndIdPairObject(),
  });
}

describe('PaginatedListNotification model test', () => {
  it('Marshalling/Unmarshalling of PaginatedListNotification model - Success', () => {
    const address = newPaginatedListNotification()
    const marshalledPaginatedListNotification = address.marshal()
    const unmarshalledPaginatedListNotification = new PaginatedListNotification(marshalledPaginatedListNotification)
    assert.deepEqual(address, unmarshalledPaginatedListNotification)
  });
});

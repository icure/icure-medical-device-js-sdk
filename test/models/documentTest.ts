import 'mocha';

import {Document} from '../../src/models/Document';
import {assert} from "chai";

export function newDocument(): Document {
  return new Document({
    id: "id",
    rev: "rev",
    created: 123,
    modified: 456,
    author: "author",
    responsible: "responsible",
    medicalLocationId: "medicalLocationId",
    deletionDate: 789,
    objectStoreReference: "objectStoreReference",
    mainUti: "mainUti",
    name: "name",
    version: "version",
    otherUtis: new Set(["otherUtis"]),
    externalUuid: "externalUuid",
    size: 101112,
    hash: "hash",
    attachmentId: "attachmentId",
  });
}

describe('Document model test', () => {
  it('Marshalling/Unmarshalling of Document model - Success', () => {
    const address = newDocument()
    const marshalledDocument = address.marshal()
    const unmarshalledDocument = new Document(marshalledDocument)
    assert.deepEqual(address, unmarshalledDocument)
  });
});

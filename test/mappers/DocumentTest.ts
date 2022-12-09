import 'mocha';

import {assert} from "chai";
import {DocumentMapper} from "../../src/mappers/document";
import {newDocument} from "../models/documentTest";

describe('Document mapper test', () => {
  it('Mapping/Unmapping of Document model - Success', () => {
    const document = newDocument()
    const mappedDocument = DocumentMapper.toDocumentDto(document)
    assert.deepEqual(DocumentMapper.toDocument(mappedDocument), document)
  });
});


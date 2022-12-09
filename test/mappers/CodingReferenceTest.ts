import 'mocha';

import {assert} from "chai";
import {CodeStubDtoMapper} from "../../src/mappers/codeStubCodingReference";
import {newCodingReference} from "../models/codingReferenceTest";

describe('CodingReference mapper test', () => {
  it('Mapping/Unmapping of CodingReference model - Success', () => {
    const codingReference = newCodingReference()
    const mappedCodingReference = CodeStubDtoMapper.toCodeStub(codingReference)
    assert.deepEqual(CodeStubDtoMapper.toCodingReference(mappedCodingReference), codingReference)
  });
});


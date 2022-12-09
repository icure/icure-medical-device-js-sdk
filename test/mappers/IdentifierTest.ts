import 'mocha';

import {assert} from "chai";
import {IdentifierDtoMapper} from "../../src/mappers/identifier";
import {newIdentifier} from "../models/identifierTest";

describe('Identifier mapper test', () => {
  it('Mapping/Unmapping of Identifier model - Success', () => {
    const identifier = newIdentifier()
    const mappedIdentifier = IdentifierDtoMapper.toIdentifierDto(identifier)
    assert.deepEqual(IdentifierDtoMapper.toIdentifier(mappedIdentifier), identifier)
  });
});


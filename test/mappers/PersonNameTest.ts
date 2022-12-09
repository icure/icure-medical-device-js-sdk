import 'mocha';

import {assert} from "chai";
import {PersonNameDtoMapper} from "../../src/mappers/personName";
import {newPersonName} from "../models/personNameTest";

describe('PersonName mapper test', () => {
  it('Mapping/Unmapping of PersonName model - Success', () => {
    const personName = newPersonName()
    const mappedPersonName = PersonNameDtoMapper.toPersonNameDto(personName)
    assert.deepEqual(PersonNameDtoMapper.toPersonName(mappedPersonName), personName)
  });
});


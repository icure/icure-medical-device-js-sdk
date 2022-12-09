import 'mocha';

import {assert} from "chai";
import {CodingMapper} from "../../src/mappers/codeCoding";
import {newCoding} from "../models/codingTest";

describe('Coding mapper test', () => {
  it('Mapping/Unmapping of Coding model - Success', () => {
    const coding = newCoding()
    const mappedCoding = CodingMapper.toCode(coding)
    assert.deepEqual(CodingMapper.toCoding(mappedCoding), coding)
  });
});


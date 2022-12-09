import 'mocha';

import {assert} from "chai";
import {PartnershipDtoMapper} from "../../src/mappers/partnership";
import {newPartnership} from "../models/partnershipTest";

describe('Partnership mapper test', () => {
  it('Mapping/Unmapping of Partnership model - Success', () => {
    const partnership = newPartnership()
    const mappedPartnership = PartnershipDtoMapper.toPartnershipDto(partnership)
    assert.deepEqual(PartnershipDtoMapper.toPartnership(mappedPartnership), partnership)
  });
});


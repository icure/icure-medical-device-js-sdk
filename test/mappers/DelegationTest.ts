import 'mocha';

import {assert} from "chai";
import {DelegationMapper} from "../../src/mappers/delegation";
import {newDelegation} from "../models/delegationTest";

describe('Delegation mapper test', () => {
  it('Mapping/Unmapping of Delegation model - Success', () => {
    const delegation = newDelegation()
    const mappedDelegation = DelegationMapper.toDelegationDto(delegation)
    assert.deepEqual(DelegationMapper.toDelegation(mappedDelegation), delegation)
  });
});


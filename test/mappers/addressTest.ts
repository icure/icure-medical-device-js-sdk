import 'mocha';

import {assert} from "chai";
import {AddressMapper} from "../../src/mappers/address";
import {newAddress} from "../models/addressTest";

describe('Address mapper test', () => {
  it('Mapping/Unmapping of Address model - Success', () => {
    const address = newAddress()
    const mappedAddress = AddressMapper.toAddressDto(address)
    assert.deepEqual(AddressMapper.toAddress(mappedAddress), address)
  });
});


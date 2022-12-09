import 'mocha';

import {Address} from '../../src/models/Address';
import {assert} from "chai";
import {newTelecom} from "./telecomTest";

export function newAddress(): Address {
  return new Address({
    addressType: "home",
    description: "description",
    street: "street",
    houseNumber: "houseNumber",
    postboxNumber: "postboxNumber",
    postalCode: "postalCode",
    city: "city",
    state: "state",
    country: "country",
    note: "note",
    telecoms: [
      newTelecom()
    ],
  });
}

describe('Address model test', () => {
  it('Marshalling/Unmarshalling of Address model - Success', () => {
    const address = newAddress()
    const marshalledAddress = address.marshal()
    const unmarshalledAddress = new Address(JSON.parse(JSON.stringify(marshalledAddress)))
    assert.deepEqual(address, unmarshalledAddress)
    assert.deepEqual(address, new Address(address))
  });
});

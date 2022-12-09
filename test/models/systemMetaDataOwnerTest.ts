import 'mocha';

import {SystemMetaDataOwner} from '../../src/models/SystemMetaDataOwner';
import {assert} from "chai";
import {newDelegation} from "./delegationTest";

export function newSystemMetaDataOwner(): SystemMetaDataOwner {
  return new SystemMetaDataOwner({
    publicKey: "publicKey",
    hcPartyKeys: {"key":["hcPartyKeys"]},
    privateKeyShamirPartitions: {"key":"privateKeyShamirPartitions"},
    aesExchangeKeys: {"key":{"key":{"key":"aesExchangeKeys"}}},
    transferKeys: {"key":{"key":"aesExchangeKeys"}},
  });
}

describe('SystemMetaDataOwner model test', () => {
  it('Marshalling/Unmarshalling of SystemMetaDataOwner model - Success', () => {
    const address = newSystemMetaDataOwner()
    const marshalledSystemMetaDataOwner = address.marshal()
    const unmarshalledSystemMetaDataOwner = new SystemMetaDataOwner(marshalledSystemMetaDataOwner)
    assert.deepEqual(address, unmarshalledSystemMetaDataOwner)
  });
});

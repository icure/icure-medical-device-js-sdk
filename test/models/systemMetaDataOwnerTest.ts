import 'mocha';

import {SystemMetaDataOwner} from '../../src/models/SystemMetaDataOwner';
import {assert} from "chai";

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
    const systemMetaDataOwner = newSystemMetaDataOwner()
    const marshalledSystemMetaDataOwner = systemMetaDataOwner.marshal()
    const unmarshalledSystemMetaDataOwner = new SystemMetaDataOwner(JSON.parse(JSON.stringify(marshalledSystemMetaDataOwner)))
    assert.deepEqual(systemMetaDataOwner, unmarshalledSystemMetaDataOwner)
    assert.deepEqual(systemMetaDataOwner, new SystemMetaDataOwner(systemMetaDataOwner))
  });
});

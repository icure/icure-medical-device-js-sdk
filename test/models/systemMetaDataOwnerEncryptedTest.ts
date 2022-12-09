import 'mocha';

import {SystemMetaDataOwnerEncrypted} from '../../src/models/SystemMetaDataOwnerEncrypted';
import {assert} from "chai";
import {newDelegation} from "./delegationTest";

export function newSystemMetaDataOwnerEncrypted(): SystemMetaDataOwnerEncrypted {
  return new SystemMetaDataOwnerEncrypted({
    publicKey: "publicKey",
    hcPartyKeys: {"key":["hcPartyKeys"]},
    privateKeyShamirPartitions: {"key":"privateKeyShamirPartitions"},
    aesExchangeKeys: {"key":{"key":{"key":"aesExchangeKeys"}}},
    transferKeys: {"key":{"key":"aesExchangeKeys"}},
    secretForeignKeys: ["secretForeignKeys"],
    cryptedForeignKeys: {"key":new Set([newDelegation()])},
    delegations: {"key":new Set([newDelegation()])},
    encryptionKeys: {"key":new Set([newDelegation()])},
  });
}

describe('SystemMetaDataOwnerEncrypted model test', () => {
  it('Marshalling/Unmarshalling of SystemMetaDataOwnerEncrypted model - Success', () => {
    const systemMetaDataOwnerEncrypted = newSystemMetaDataOwnerEncrypted()
    const marshalledSystemMetaDataOwnerEncrypted = systemMetaDataOwnerEncrypted.marshal()
    const unmarshalledSystemMetaDataOwnerEncrypted = new SystemMetaDataOwnerEncrypted(JSON.parse(JSON.stringify(marshalledSystemMetaDataOwnerEncrypted)))
    assert.deepEqual(systemMetaDataOwnerEncrypted, unmarshalledSystemMetaDataOwnerEncrypted)
    assert.deepEqual(systemMetaDataOwnerEncrypted, new SystemMetaDataOwnerEncrypted(systemMetaDataOwnerEncrypted))
  });
});

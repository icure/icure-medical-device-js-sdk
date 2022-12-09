import 'mocha';

import {SystemMetaDataEncrypted} from '../../src/models/SystemMetaDataEncrypted';
import {assert} from "chai";
import {newDelegation} from "./delegationTest";

export function newSystemMetaDataEncrypted(): SystemMetaDataEncrypted {
  return new SystemMetaDataEncrypted({
    secretForeignKeys: ["secretForeignKeys"],
    cryptedForeignKeys: {"key":new Set([newDelegation()])},
    delegations: {"key":new Set([newDelegation()])},
    encryptionKeys: {"key":new Set([newDelegation()])},
  });
}

describe('SystemMetaDataEncrypted model test', () => {
  it('Marshalling/Unmarshalling of SystemMetaDataEncrypted model - Success', () => {
    const systemMetaDataEncrypted = newSystemMetaDataEncrypted()
    const marshalledSystemMetaDataEncrypted = systemMetaDataEncrypted.marshal()
    const unmarshalledSystemMetaDataEncrypted = new SystemMetaDataEncrypted(JSON.parse(JSON.stringify(marshalledSystemMetaDataEncrypted)))
    assert.deepEqual(systemMetaDataEncrypted, unmarshalledSystemMetaDataEncrypted)
    assert.deepEqual(systemMetaDataEncrypted, new SystemMetaDataEncrypted(systemMetaDataEncrypted))
  });
});

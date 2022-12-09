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
    const address = newSystemMetaDataEncrypted()
    const marshalledSystemMetaDataEncrypted = address.marshal()
    const unmarshalledSystemMetaDataEncrypted = new SystemMetaDataEncrypted(marshalledSystemMetaDataEncrypted)
    assert.deepEqual(address, unmarshalledSystemMetaDataEncrypted)
  });
});

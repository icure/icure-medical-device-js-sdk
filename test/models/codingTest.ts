import 'mocha';

import {Coding} from '../../src/models/Coding';
import {assert} from "chai";

export function newCoding(): Coding {
  return new Coding({
    id: "id",
    rev: "rev",
    type: "type",
    code: "code",
    version: "version",
    searchTerms: {
      "en": new Set("test")
    },
    qualifiedLinks: {
        "from": ["to"]
      }
  });
}

describe('Coding model test', () => {
  it('Marshalling/Unmarshalling of Coding model - Success', () => {
    const address = newCoding()
    const marshalledCoding = address.marshal()
    const unmarshalledCoding = new Coding(marshalledCoding)
    assert.deepEqual(address, unmarshalledCoding)
  });
});

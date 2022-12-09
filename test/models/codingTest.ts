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
    const coding = newCoding()
    const marshalledCoding = coding.marshal()
    const unmarshalledCoding = new Coding(JSON.parse(JSON.stringify(marshalledCoding)))
    assert.deepEqual(coding, unmarshalledCoding)
    assert.deepEqual(coding, new Coding(coding))
  });
});

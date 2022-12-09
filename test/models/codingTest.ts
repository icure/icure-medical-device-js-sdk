import 'mocha';

import {v4 as uuid} from 'uuid';
import {Coding} from '../../src/models/Coding';
import {assert} from "chai";

export function newCoding(): Coding {
  return new Coding({
    id: "type|code|version",
    rev: "rev",
    type: "type",
    code: "code",
    version: "version",
    searchTerms: {
      "en": new Set("test")
    },
    qualifiedLinks: {
      "from": ["to"]
    },
    regions: ["regions"],
    description: {en: "description"},
  });
}

describe('Coding model test', () => {
  it('Marshalling/Unmarshalling of Coding model - Success', () => {
    const coding = newCoding()
    const marshalledCoding = coding.marshal()
    const unmarshalledCoding = new Coding(JSON.parse(JSON.stringify(marshalledCoding)))
    assert.deepEqual(unmarshalledCoding, coding)
    assert.deepEqual(new Coding(coding), coding)
  });
});

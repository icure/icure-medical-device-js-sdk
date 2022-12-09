import 'mocha';

import {Measure} from '../../src/models/Measure';
import {assert} from "chai";
import {newCodingReference} from "./codingReferenceTest";

export function newMeasure(): Measure {
  return new Measure({
    value: 123,
    min: 456,
    max: 789,
    ref: 101112,
    severity: 131415,
    severityCode: "severityCode",
    evolution: 161718,
    unit: "unit",
    unitCodes: new Set([newCodingReference()]),
    comment: "comment",
    comparator: "comparator",
  });
}

describe('Measure model test', () => {
  it('Marshalling/Unmarshalling of Measure model - Success', () => {
    const measure = newMeasure()
    const marshalledMeasure = measure.marshal()
    const unmarshalledMeasure = new Measure(JSON.parse(JSON.stringify(marshalledMeasure)))
    assert.deepEqual(measure, unmarshalledMeasure)
    assert.deepEqual(measure, new Measure(measure))
  });
});

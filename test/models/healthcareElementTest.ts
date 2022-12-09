import 'mocha';

import {v4 as uuid} from 'uuid';
import {HealthcareElement} from '../../src/models/HealthcareElement';
import {assert} from "chai";
import {newIdentifier} from "./identifierTest";
import {newCodingReference} from "./codingReferenceTest";
import {newSystemMetaDataEncrypted} from "./systemMetaDataEncryptedTest";

export function newHealthcareElement(): HealthcareElement {
  return new HealthcareElement({
    id: uuid(),
    identifiers: [newIdentifier()],
    rev: "rev",
    created: 123,
    modified: 456,
    author: "author",
    responsible: "responsible",
    medicalLocationId: "medicalLocationId",
    labels: new Set([newCodingReference()]),
    codes: new Set([newCodingReference()]),
    endOfLife: 789,
    deletionDate: 101112,
    healthcareElementId: "healthcareElementId",
    valueDate: 131415,
    openingDate: 161718,
    closingDate: 192021,
    description: "description",
    note: "note",
    systemMetaData: newSystemMetaDataEncrypted(),
  });
}

describe('HealthcareElement model test', () => {
  it('Marshalling/Unmarshalling of HealthcareElement model - Success', () => {
    const healthcareElement = newHealthcareElement()
    const marshalledHealthcareElement = healthcareElement.marshal()
    const unmarshalledHealthcareElement = new HealthcareElement(JSON.parse(JSON.stringify(marshalledHealthcareElement)))
    assert.deepEqual(unmarshalledHealthcareElement, healthcareElement)
    assert.deepEqual(new HealthcareElement(healthcareElement), healthcareElement)
  });
});

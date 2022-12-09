import 'mocha';

import {HealthcareProfessional} from '../../src/models/HealthcareProfessional';
import {assert} from "chai";
import {newAddress} from "./addressTest";
import {newCodingReference} from "./codingReferenceTest";
import {newPersonName} from "./personNameTest";
import {newProperty} from "./propertyTest";
import {newSystemMetaDataOwner} from "./systemMetaDataOwnerTest";

export function newHealthcareProfessional(): HealthcareProfessional {
  return new HealthcareProfessional({
    id: "id",
    rev: "rev",
    created: 123,
    modified: 456,
    labels: new Set([newCodingReference()]),
    codes: new Set([newCodingReference()]),
    deletionDate: 789,
    name: "name",
    lastName: "lastName",
    firstName: "firstName",
    names: [newPersonName()],
    gender: "male",
    civility: "civility",
    speciality: "speciality",
    parentId: "parentId",
    addresses: [newAddress()],
    languages: ["languages"],
    picture: new ArrayBuffer(5),
    specialityCodes: new Set([newCodingReference()]),
    notes: "notes",
    properties: new Set([newProperty()]),
    systemMetaData: newSystemMetaDataOwner(),
  });
}

describe('HealthcareProfessional model test', () => {
  it('Marshalling/Unmarshalling of HealthcareProfessional model - Success', () => {
    const healthcareProfessional = newHealthcareProfessional()
    const marshalledHealthcareProfessional = healthcareProfessional.marshal()
    const unmarshalledHealthcareProfessional = new HealthcareProfessional(JSON.parse(JSON.stringify(marshalledHealthcareProfessional)))
    assert.deepEqual(healthcareProfessional, unmarshalledHealthcareProfessional)
    assert.deepEqual(healthcareProfessional, new HealthcareProfessional(healthcareProfessional))
  });
});

import 'mocha';

import {PatientHealthCareParty} from '../../src/models/PatientHealthCareParty';
import {assert} from "chai";

export function newPatientHealthCareParty(): PatientHealthCareParty {
  return new PatientHealthCareParty({
    type: "doctor",
    healthcarePartyId: "healthcarePartyId",
  });
}

describe('PatientHealthCareParty model test', () => {
  it('Marshalling/Unmarshalling of PatientHealthCareParty model - Success', () => {
    const address = newPatientHealthCareParty()
    const marshalledPatientHealthCareParty = address.marshal()
    const unmarshalledPatientHealthCareParty = new PatientHealthCareParty(marshalledPatientHealthCareParty)
    assert.deepEqual(address, unmarshalledPatientHealthCareParty)
  });
});

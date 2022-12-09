import 'mocha';

import {assert} from "chai";
import {PatientHealthCarePartyDtoMapper} from "../../src/mappers/patientHealthCareParty";
import {newPatientHealthCareParty} from "../models/patientHealthCarePartyTest";

describe('PatientHealthCareParty mapper test', () => {
  it('Mapping/Unmapping of PatientHealthCareParty model - Success', () => {
    const patientHealthCareParty = newPatientHealthCareParty()
    const mappedPatientHealthCareParty = PatientHealthCarePartyDtoMapper.toPatientHealthCarePartyDto(patientHealthCareParty)
    assert.deepEqual(PatientHealthCarePartyDtoMapper.toPatientHealthCareParty(mappedPatientHealthCareParty), patientHealthCareParty)
  });
});


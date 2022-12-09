import 'mocha';

import {assert} from "chai";
import {PatientMapper} from "../../src/mappers/patient";
import {newPatient} from "../models/patientTest";

describe('Patient mapper test', () => {
  it('Mapping/Unmapping of Patient model - Success', () => {
    const patient = newPatient()
    const mappedPatient = PatientMapper.toPatientDto(patient)
    assert.deepEqual(PatientMapper.toPatient(mappedPatient), patient)
  });
});


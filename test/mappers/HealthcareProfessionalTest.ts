import 'mocha';

import {assert} from "chai";
import {HealthcareProfessionalMapper} from "../../src/mappers/healthcareProfessional";
import {newHealthcareProfessional} from "../models/healthcareProfessionalTest";

describe('HealthcareProfessional mapper test', () => {
  it('Mapping/Unmapping of HealthcareProfessional model - Success', () => {
    const healthcareProfessional = newHealthcareProfessional()
    const mappedHealthcareProfessional = HealthcareProfessionalMapper.toHealthcarePartyDto(healthcareProfessional)
    assert.deepEqual(HealthcareProfessionalMapper.toHealthcareProfessional(mappedHealthcareProfessional), healthcareProfessional)
  });
});


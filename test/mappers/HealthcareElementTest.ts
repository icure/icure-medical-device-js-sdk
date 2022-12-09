import 'mocha';

import {assert} from "chai";
import {HealthcareElementMapper} from "../../src/mappers/healthcareElement";
import {newHealthcareElement} from "../models/healthcareElementTest";

describe('HealthcareElement mapper test', () => {
  it('Mapping/Unmapping of HealthcareElement model - Success', () => {
    const healthcareElement = newHealthcareElement()
    const mappedHealthcareElement = HealthcareElementMapper.toHealthElementDto(healthcareElement)
    assert.deepEqual(HealthcareElementMapper.toHealthcareElement(mappedHealthcareElement), healthcareElement)
  });
});


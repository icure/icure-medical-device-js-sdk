import {PatientHealthCareParty} from "../models/PatientHealthCareParty";
import {PatientHealthCareParty as PatientHealthCarePartyDto} from "@icure/api";

export namespace PatientHealthCarePartyDtoMapper {
  export const toPatientHealthCareParty = (obj?: PatientHealthCarePartyDto) => obj ? new PatientHealthCareParty({
    type: obj.type,
    healthcarePartyId: obj.healthcarePartyId,
  }) : undefined;

  export const toPatientHealthCarePartyDto = (obj?: PatientHealthCareParty) => obj ? new PatientHealthCarePartyDto({
    type: obj.type,
    healthcarePartyId: obj.healthcarePartyId,
  }) : undefined;
}

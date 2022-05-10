import {Filter} from "../Filter";
import {DataSample} from "../../models/DataSample";

export interface DataSampleByHealthcarePartyPatientFilter extends Filter<DataSample> {
    description?: string
    healthcarePartyId?: string
    patientSecretForeignKeys: string[]
  '$type': 'DataSampleByHealthcarePartyPatientFilter'
}

import {Patient} from "../../models/Patient";
import {Filter} from "../../models/Filter";
import {PaginatedListPatient} from "../../models/PaginatedListPatient";
import {PatientApi} from "../PatientApi";

class PatientApiImpl implements PatientApi {
  createOrModifyPatient(patient: Patient): Promise<Patient> {
    return Promise.resolve(undefined);
  }

  deletePatient(patientId: string): Promise<string> {
    return Promise.resolve("");
  }

    filterPatients(filter: Filter, nextPatientId?: string, limit?: number): Promise<PaginatedListPatient> {
        return Promise.resolve(undefined);
    }

    getPatient(patientId: string): Promise<Patient> {
        return Promise.resolve(undefined);
    }

    matchPatients(filter: Filter): Promise<Array<string>> {
        return Promise.resolve(undefined);
    }
}

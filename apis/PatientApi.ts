
import { Filter } from '../filter/Filter';
import { PaginatedListPatient } from '../models/PaginatedListPatient';
import { Patient } from '../models/Patient';
import {User} from "../models/User";
import {Connection} from "../models/Connection";

  /**
  * no description
  */
  export interface PatientApi {

    /**
      * When modifying a patient, you must ensure that the rev obtained when getting or creating the patient is present as the rev is used to guarantee that the patient has not been modified by a third party.
      * Create or update a [Patient]
      * @param patient
    */
    createOrModifyPatient(patient: Patient, ): Promise<Patient >;
    /**
      * Deletes the patient identified by the provided unique [patientId].
      * Delete a [Patient]
      * @param patientId
    */
    deletePatient(patientId: string, ): Promise<string >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns a paginated list of patient (with a cursor that lets you query the following items).
      * Load patients from the database by filtering them using the provided [filter].
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
      * @param nextPatientId The id of the first patient in the next page
      * @param limit The number of patients to return in the queried page
    */
    filterPatients(filter: Filter<Patient>, nextPatientId?: string, limit?: number, ): Promise<PaginatedListPatient >;
    /**
      * Each patient is uniquely identified by a patient id. The patient id is a UUID. This [patientId] is the preferred method to retrieve one specific patient.
      * Get a [Patient]
      * @param patientId
    */
    getPatient(patientId: string, ): Promise<Patient >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns the list of the ids of the users matching the [filter].
      * Load patient ids from the database by filtering them using the provided [filter].
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
    */
    matchPatients(filter: Filter<Patient>, ): Promise<Array<string> >;

    subscribeToPatientEvents(eventTypes: ('CREATE'|'UPDATE'|'DELETE')[], filter: Filter<Patient>, eventFired: (patient:Patient) => void): Promise<Connection>;

  }

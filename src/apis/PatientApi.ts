import {Filter} from '../filter/Filter'
import {PaginatedListPatient} from '../models/PaginatedListPatient'
import {Patient} from '../models/Patient'
import {Connection} from '../models/Connection'
import {SharingResult} from "../utils/interfaces";

export interface PatientApi {
  /**
   * When modifying a patient, you must ensure that the rev obtained when getting or creating the patient is present as the rev is used to guarantee that the patient has not been modified by a third party.
   * Create or update a [Patient]
   * @param patient
   */
  createOrModifyPatient(patient: Patient): Promise<Patient>
  /**
   * Deletes the patient identified by the provided unique [patientId].
   * Delete a [Patient]
   * @param patientId
   */
  deletePatient(patientId: string): Promise<string>
  /**
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are :
   *  - PatientByHealthcarePartyDateOfBirthBetweenFilter;
   *  - PatientByHealthcarePartyFilter;
   *  - PatientByHealthcarePartyGenderEducationProfessionFilter;
   *  - PatientByHealthcarePartyIdentifiersFilter;
   *  - PatientByHealthcarePartyNameContainsFuzzyFilter;
   *  - PatientByHealthcarePartySsinsFilter;
   *  - and PatientsByIdsFilter.
   *
   * This method returns a paginated list of patient (with a cursor that lets you query the following items).
   * Load patients from the database by filtering them using the provided [filter].
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   * @param nextPatientId The id of the first patient in the next page
   * @param limit The maximum number of patients that should contain the returned page. By default, a page contains 1000 patients
   */
  filterPatients(filter: Filter<Patient>, nextPatientId?: string, limit?: number): Promise<PaginatedListPatient>
  /**
   * Each patient is uniquely identified by a patient id. The patient id is a UUID. This [patientId] is the preferred method to retrieve one specific patient.
   * Get a [Patient]
   * @param patientId
   */
  getPatient(patientId: string): Promise<Patient>
  /**
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns the list of the ids of the users matching the [filter].
   * Load patient ids from the database by filtering them using the provided [filter].
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   */
  matchPatients(filter: Filter<Patient>): Promise<Array<string>>

  /**
     * Service where current user gives access to the patient information to another dataOwner (HCP, patient or device).
     * For this, the current user data owner should be able to access the patient provided in argument in order to provide access to another data owner.

     * @param patient Patient the current data owner would like to share with another data owner
     * @param delegatedTo ID of the data owner to which current user would like to give access
     */
  giveAccessTo(patient: Patient, delegatedTo: string): Promise<Patient>

  /**
   * Service that allows a Data Owner to share all the data of a Patient with the patient itself
   * @param patientId the id of the Patient
   */
  shareOwnDataWith(patientId: string): Promise<SharingResult>

  /**
   * Opens a WebSocket Connection in order to receive all the Patients corresponding to specific filter criteria.
   * @param eventTypes Type of event you would like to listen. It can be CREATE, UPDATE or DELETE
   * @param filter Filter criteria to filter to the Patients you would like to receive
   * @param eventFired Action applied each time you receive a Patient through the WebSocket
   * @param options Options to configure the WebSocket.
   *    - keepAlive : How long to keep connection alive (ms);
   *    - lifetime : How long to keep the WebSocket alive (ms);
   *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
   *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
   */
  subscribeToPatientEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<Patient>,
    eventFired: (patient: Patient) => Promise<void>,
    options?: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
  ): Promise<Connection>
}

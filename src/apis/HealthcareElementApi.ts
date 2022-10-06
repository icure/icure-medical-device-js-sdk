import {Filter} from '../filter/Filter'
import {HealthcareElement} from '../models/HealthcareElement'
import {PaginatedListHealthcareElement} from '../models/PaginatedListHealthcareElement'
import {Connection} from "../models/Connection";
import {Patient} from "../models/Patient";

/**
 * The HealthcareElementApi interface provides methods to manage healthcare elements.
 */
export interface HealthcareElementApi {
  /**
   * A Healthcare Element is a data giving some medical context to a series of measures, symptoms, ...
   * For example, if the data samples are symptoms representing fever, cold feel, headache, ... the associated healthcare
   * element could be a flue.
   *
   * A healthcare Element can be linked to a patient and to a series of data samples.
   *
   * This service allows you to create a healthcare element linked to a specific patient
   *
   * @param healthcareElement Healthcare element to create in iCure Database
   * @param patientId Id of the patient to which the healthcare element is linked
   */
  createOrModifyHealthcareElement(healthcareElement: HealthcareElement, patientId?: string): Promise<HealthcareElement>

  /**
   * A Healthcare Element is a data giving some medical context to a series of measures, symptoms, ...
   * For example, if the data samples are symptoms representing fever, cold feel, headache, ... the associated healthcare
   * element could be a flue.
   *
   * A healthcare Element can be linked to a patient and to a series of data samples.
   *
   * This service permits you to create multiple healthcare elements for a specific patient
   *
   * @param healthcareElement
   * @param patientId Id of the patient to which the healthcare elements are linked
   */
  createOrModifyHealthcareElements(healthcareElement: Array<HealthcareElement>, patientId?: string): Promise<Array<HealthcareElement>>

  /**
   * Delete a Healthcare Element from the iCure database
   * @param id Id of the healthcare element to delete
   */
  deleteHealthcareElement(id: string): Promise<string>

  /**
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare elements are :
   *  - HealthcareElementByHealthcarePartyFilter;
   *  - HealthcareElementByHealthcarePartyIdentifiersFilter;
   *  - HealthcareElementByHealthcarePartyLabelCodeFilter;
   *  - HealthcareElementByHealthcarePartyPatientFilter;
   *  - and HealthcareElementByIdsFilter.
   *
   * This method returns a paginated list of healthcare elements (with a cursor that lets you query the following items).
   * Load healthcare elements from the database by filtering them using the provided Filter.
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   * @param nextHealthElementId The id of the first Healthcare professional in the next page
   * @param limit The maximum number of healthcare elements that should contain the returned page. By default, a page contains 1000 healthcare elements
   */
  filterHealthcareElement(filter: Filter<HealthcareElement>, nextHealthElementId?: string, limit?: number): Promise<PaginatedListHealthcareElement>

  /**
   * Retrieves the information of a specific Healthcare Element
   * @param id Id of the healthcare element to retrieve
   */
  getHealthcareElement(id: string): Promise<HealthcareElement>

  /**
   * Find which Healthcare Elements are matching a specific filter.
   *
   * @return the ids of the healthcare elements satisfying the provided filter
   *
   * @param filter Filtering conditions that the returned healthcare element ids are satisfying.
   */
  matchHealthcareElement(filter: Filter<HealthcareElement>): Promise<Array<string>>

  /**
   * Service where current user gives access to the healthcare Element information to another dataOwner (HCP, patient or device).
   * For this, the current user data owner should be able to access the healthcare Element provided in argument in order to provide access to another data owner.

   * @param healthcareElement Healthcare Element the current data owner would like to share with another data owner
   * @param delegatedTo ID of the data owner to which current user would like to give access
   */
  giveAccessTo(healthcareElement: HealthcareElement, delegatedTo: string): Promise<HealthcareElement>

  /**
   * Gets all the Healthcare Elements associated to a Patient that the current dataOwner can access.
   * @param patient the Patient associated to the Healthcare Elements to get
   *
   * @return an array containing the Healthcare Elements
   */
  getHealthcareElementsForPatient(patient: Patient): Promise<Array<HealthcareElement>>

  /**
   * Opens a WebSocket Connection in order to receive all the Healthcare Element corresponding to specific filter criteria.
   * @param eventTypes Type of event you would like to listen. It can be CREATE, UPDATE or DELETE
   * @param filter Filter criteria to filter to the healthcare element you would like to receive
   * @param eventFired Action applied each time you receive a healthcare element through the WebSocket
   * @param options Options to configure the WebSocket.
   *    - keepAlive : How long to keep connection alive (ms);
   *    - lifetime : How long to keep the WebSocket alive (ms);
   *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
   *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
   */
  subscribeToHealthcareElementEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<HealthcareElement>,
    eventFired: (dataSample: HealthcareElement) => Promise<void>,
    options?: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
  ): Promise<Connection>
}

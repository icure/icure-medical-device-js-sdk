import {Filter} from '../filter/Filter';
import {HealthcareElement} from '../models/HealthcareElement';
import {PaginatedListHealthcareElement} from '../models/PaginatedListHealthcareElement';
import {Patient} from "../models/Patient";

/**
 * no description
 */
export interface HealthcareElementApi {

  /**
   * Create a Healthcare Element
   * @param healthcareElement
   */
  createOrModifyHealthcareElement(healthcareElement: HealthcareElement, patientId?: string): Promise<HealthcareElement>;

  /**
   * Create a Healthcare Element
   * @param healthcareElement
   */
  createOrModifyHealthcareElements(healthcareElement: Array<HealthcareElement>, patientId?: string): Promise<Array<HealthcareElement>>;

  /**
   * Delete a Healthcare Element
   * @param id
   */
  deleteHealthcareElement(id: string,): Promise<string>;

  /**
   * Find Healthcare Elements using a filter
   * @param filter
   * @param nextHealthElementId
   * @param limit
   */
  filterHealthcareElement(filter: Filter<HealthcareElement>, nextHealthElementId?: string, limit?: number,): Promise<PaginatedListHealthcareElement>;

  /**
   * Get a Healthcare Element
   * @param id
   */
  getHealthcareElement(id: string,): Promise<HealthcareElement>;

  /**
   * Find Healthcare Elements using a filter
   * @param filter
   */
  matchHealthcareElement(filter: Filter<HealthcareElement>,): Promise<Array<string>>;

  /**
   * Service where current user gives access to the healthcare Element information to another dataOwner (HCP, patient or device).
   * For this, the current user data owner should be able to access the healthcare Element provided in argument in order to provide access to another data owner.

   * @param healthcareElement Healthcare Element the current data owner would like to share with another data owner
   * @param delegatedTo ID of the data owner to which current user would like to give access
   */
  giveAccessTo(healthcareElement: HealthcareElement, delegatedTo: string): Promise<HealthcareElement>;
}

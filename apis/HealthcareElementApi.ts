import {Filter} from '../filter/Filter';
import {HealthcareElement} from '../models/HealthcareElement';
import {PaginatedListHealthcareElement} from '../models/PaginatedListHealthcareElement';

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
}

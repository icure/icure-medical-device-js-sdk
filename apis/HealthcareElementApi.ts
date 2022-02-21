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
  createOrModifyHealthcareElement(healthcareElement: HealthcareElement,): Promise<HealthcareElement>;

  /**
   * Create a Healthcare Element
   * @param healthcareElement
   */
  createOrModifyHealthcareElements(healthcareElement: Array<HealthcareElement>,): Promise<Array<HealthcareElement>>;

  /**
   * Delete a Healthcare Element
   * @param id
   */
  deleteHealthcareElement(id: string,): Promise<string>;

  /**
   * Find Healthcare Elements using a filter
   * @param filter
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

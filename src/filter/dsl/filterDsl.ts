import {MedTechApi} from "../../apis/MedTechApi";
import {Filter} from "../Filter";
import {SortableFilterBuilderAccumulator} from "./SortableFilterBuilderAccumulator";
import {UnionFilter} from "../UnionFilter";
import {IntersectionFilter} from "../IntersectionFilter";

/**
 * Base abstract class for all the DSLs to build filters for the different entities.
 */
export abstract class FilterBuilder<T> {

  /**
   * Final step of the DSL that builds a filter for the entity with the specified criteria.
   * The generated filter will allow to retrieve the entities that satisfy all the requirements specified through the
   * DSL at the same time (i.e. is an AND). If you want to retrieve entities that match one of many specified conditions,
   * consider using the union method of the FilterComposition class.
   * @return a Promise that resolves in the filter for the entity.
   */
  abstract build(): Promise<Filter<T>>
}

/**
 * This abstract class defines the method to specify a sorting order in the filter results.
 * It has 3 generic type parameters:
 * - T: the type of the entity to filter
 * - E: an enum or a type that defines the different sorting options
 * - F: a filter builder type for the same entity that is not sortable
 */
export abstract class SortableFilterBuilder<T, F> {

  _builderAccumulator: SortableFilterBuilderAccumulator<T> = new SortableFilterBuilderAccumulator<T>()

  /**
   * Specifies the sorting order for this filter chain.
   */
  abstract get sort(): F

}

/**
 * This abstract class defines the behaviour of the filters that must pass the id of a data owner along.
 * It has 3 generic type parameters:
 * - T: the type of the entity to filter
 * - F: a Filter Builder for the same entity. Ideally it should be instantiated by this class, passing the data owner id
 * along.
 */
export abstract class DataOwnerFilterBuilder<T, F extends FilterBuilder<T>> {

  /**
   * @param dataOwnerId the data owner id to use for the filtering.
   * @return a Filter Builder for the same entity.
   */
  abstract forDataOwner(dataOwnerId: string): F

  /**
   * @return a Filter Builder for the same entity that will use as data owner id for the filtering the current data owner.
   * It's the responsibility of the returned filter to guarantee this behaviour.
   */
  abstract forSelf(): F
}

/**
 * This class provides static methods to combine filters.
 */
export abstract class FilterComposition {

  /**
   * This method receives as input an array of filters and combines them in a single union filter.
   * If the filters were generated by a SortableFilterBuilder, then the sorting order is not considered anymore.
   * @param filters the filters to combine.
   * @return a union filter.
   */
  static union<T>(...filters: Filter<T>[]): Filter<T> {
    return {
      filters: filters,
      $type: 'UnionFilter',
    } as UnionFilter<T>
  }

  /**
   * This method receives as input an array of filters and combines them in a single intersection filter.
   * If the filters were generated by a SortableFilterBuilder, then the sorting order may not be guaranteed anymore.
   * @param filters the filters to combine.
   * @return an intersection filter.
   */
  static intersection<T>(...filters: Filter<T>[]): Filter<T> {
    return {
      filters: filters,
      $type: 'IntersectionFilter',
    } as IntersectionFilter<T>
  }
}

export class NoOpFilter implements Filter<any> {
  $type: string = "NoOpFilter"

  static isNoOp(filter: Filter<any>): boolean {
    return filter instanceof NoOpFilter
  }
}

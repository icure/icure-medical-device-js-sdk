import { Filter } from '../Filter'
import { NoOpFilter } from './filterDsl'

enum FilterStrategy {
  ByIds,
  Singleton,
  ByIdsObjects,
  Simple,
}

type FutureFilter<T> = {
  futureFilter: Promise<Filter<T>>
  strategy: FilterStrategy
  idKey: string | undefined
  sortKey: boolean
}

type AwaitedFilter<T> = {
  filter: Filter<T>
  strategy: FilterStrategy
  idKey: string | undefined
  sortKey: boolean
}

/**
 * @internal this class is intended for internal use only and may be changed without notice.
 *
 * This class is used to collect the filter in the various DSLs and then combine and sort them if needed.
 */
export class SortableFilterBuilderAccumulator<T> {
  private _filters: FutureFilter<T>[] = []

  /**
   * Sets the last filter added as the sort key for final filter.
   */
  setLastElementAsSortKey() {
    this._filters = [
      ...this._filters.splice(0, this._filters.length - 1),
      {
        ...this._filters[this._filters.length - 1],
        sortKey: true,
      },
    ]
  }

  private add<F extends Filter<T>, K extends keyof F>(filter: Promise<F>, strategy: FilterStrategy, idKey?: K) {
    this._filters = [
      ...this._filters,
      {
        futureFilter: filter,
        strategy: strategy,
        idKey: !!idKey ? (idKey as string) : undefined,
        sortKey: false,
      },
    ]
  }

  /**
   * Adds a filter that will be combined using the "ByIds" strategy, and it is applicable to all the filters that specify
   * a condition based on a unique identifier (byIds, bySsin, ecc...).
   * If more than one filter of the same type are added using this strategy, then the intersection of the condition
   * is taken. If the intersection is null, then a NoOp Filter will be returned.
   * If a filter of this strategy is set as sort key, then the order of the ids specified in the filter will be enforced
   * in the final aggregated filter.
   * @param filter a Promise that will resolve in the filter to add.
   * @param key the field of the filter that contains the ids.
   */
  addByIdsFilter<F extends Filter<T>, K extends keyof F>(filter: Promise<F>, key: K) {
    this.add(filter, FilterStrategy.ByIds, key)
  }

  /**
   * Adds a filter that will be combined using the "ByIdsObjects" strategy, and it is applicable to all the filters that
   * specify a condition based on a unique identifier based on an object.
   * If more than one filter of the same type are added using this strategy, then the intersection of the condition is
   * taken. If the intersection is null, then a NoOp Filter will be returned. The intersection is based on the id of the
   * objects.
   * If a filter of this strategy is set as sort key, then the order of the ids specified in the filter will be enforced
   * in the final aggregated filter.
   * @param filter a Promise that will resolve in the filter to add.
   * @param field the field of the filter that contains the ids.
   */
  addByIdsObjectsFilter<F extends Filter<T>, K extends keyof F>(filter: Promise<F>, field: K) {
    this.add(filter, FilterStrategy.ByIdsObjects, field)
  }

  /**
   * Adds a filter that will be combined using the "Singleton" strategy, and it is applicable to all the filters that can
   * be added only once in the DSL
   * If more than one filter of the same type are added using this strategy, then a NoOp filter is returned unless the
   * filters are equal.
   * @param filter a Promise that will resolve in the filter to add.
   */
  addSingletonFilter(filter: Promise<Filter<T>>) {
    this.add(filter, FilterStrategy.Singleton)
  }

  /**
   * Adds a filter without strategies.
   * @param filter a Promise that will resolve in the filter to add.
   */
  addFilter(filter: Promise<Filter<T>>) {
    this.add(filter, FilterStrategy.Simple)
  }

  /**
   * Aggregates the filters according to their own strategy and sorts them, if a sort key is specified. If even only
   * one of the filters resolves in a NoOp filter, then a list containing only the NoOp filter will be returned.
   * @return a Promise containing the list of filters.
   */
  async getAndSortFilters(): Promise<Filter<T>[]> {
    // Awaits all the filter promises
    const awaitedFilters: AwaitedFilter<T>[] = []
    for (const f of this._filters) {
      awaitedFilters.push({
        filter: await f.futureFilter,
        strategy: f.strategy,
        idKey: f.idKey,
        sortKey: f.sortKey,
      })
    }

    // Groups the filters by type and strategy. A filter can be present in more than one strategy (e.g. byAge / dateOfBirthBetween in PatientFilter).
    const filtersByTypeAndStrategy = awaitedFilters.reduce((filters, current) => {
      const key = `${current.filter.$type}-${current.strategy}`
      return {
        ...filters,
        [key]: [...(filters[key] ?? []), current],
      }
    }, {} as { [key: string]: AwaitedFilter<T>[] })

    // Combines the filter of the same type and strategy
    const listOfCombinedFilters = Object.values(filtersByTypeAndStrategy).reduce((p, c) => {
      return [...p, ...this.combineFilters(c)]
    }, [])

    // If a sort key is present, then is put as the first element of the list.
    const sortKey = listOfCombinedFilters.findIndex((f) => f.sortKey)
    return sortKey !== -1
      ? [listOfCombinedFilters[sortKey].filter, ...listOfCombinedFilters.filter((_, index) => index !== sortKey).map((f) => f.filter)]
      : listOfCombinedFilters.map((f) => f.filter)
  }

  private combineFilters(filters: AwaitedFilter<T>[]): AwaitedFilter<T>[] {
    if (!filters.length) {
      return []
    }
    if (filters[0].strategy === FilterStrategy.ByIds) {
      return [this.combineByIdsFilters(filters)]
    } else if (filters[0].strategy === FilterStrategy.ByIdsObjects) {
      return [this.combineByIdsObjectsFilters(filters)]
    } else if (filters[0].strategy === FilterStrategy.Singleton) {
      return [this.combineSingletonFilters(filters)]
    } else {
      return filters
    }
  }

  private combineByIdsFilters(filters: AwaitedFilter<T>[]) {
    const sortKey = filters.find((f) => f.sortKey) ?? filters[0]
    const aggregation = filters.reduce((aggregated, current) => {
      const newFilter = {
        ...aggregated.filter,
        [aggregated.idKey!]: this.extractIdsFromFilter(aggregated.filter, aggregated.idKey!).filter((x) =>
          this.extractIdsFromFilter(current.filter, aggregated.idKey!).includes(x)
        ),
      } as Filter<T>
      return {
        ...aggregated,
        filter: newFilter,
      }
    }, sortKey)
    return {
      ...aggregation,
      filter: this.extractIdsFromFilter(aggregation.filter, aggregation.idKey!).length > 0 ? aggregation.filter : new NoOpFilter(),
    }
  }

  private combineByIdsObjectsFilters(filters: AwaitedFilter<T>[]) {
    const sortKey = filters.find((f) => f.sortKey) ?? filters[0]
    const aggregation = filters.reduce((aggregated, current) => {
      const filterIds = this.extractObjectsIdsFromFilter(current.filter, current.idKey!)
      const newFilter = {
        ...aggregated.filter,
        [current.idKey!]: this.extractObjectsIdsFromFilter(aggregated.filter, current.idKey!).filter((id) => filterIds.includes(id)),
      } as Filter<T>
      return {
        ...aggregated,
        filter: newFilter,
      }
    }, sortKey)
    return {
      ...aggregation,
      filter: this.extractObjectsIdsFromFilter(aggregation.filter, aggregation.idKey!).length > 0 ? aggregation.filter : new NoOpFilter(),
    }
  }

  private combineSingletonFilters(filters: AwaitedFilter<T>[]) {
    const sortKey = filters.find((f) => f.sortKey) ?? filters[0]
    return filters.reduce((aggregated, current) => {
      if (this.filterEquality(aggregated.filter, current.filter)) {
        return aggregated
      } else {
        return {
          filter: new NoOpFilter(),
          strategy: FilterStrategy.Simple,
          idKey: undefined,
          sortKey: false,
        }
      }
    }, sortKey)
  }

  private extractObjectsIdsFromFilter(filter: Filter<T>, field: string) {
    return (((filter as unknown as { [key: string]: { id: string }[] })[field] ?? {}) as { id: string }[]).map(({ id }) => id)
  }

  private extractIdsFromFilter(filter: Filter<T>, field: string) {
    return ((filter as unknown as { [field: string]: string[] })[field] ?? {}) as string[]
  }

  private arrayEquality(a?: any[], b?: any[]) {
    return !!a && !!b && a.length === b.length && a.every((x, index) => b[index] === x)
  }

  private filterEquality(a: any, b: any) {
    return Object.keys(a).every((key) => {
      if (Array.isArray(a[key]) && Array.isArray(b[key])) {
        return this.arrayEquality(a[key] as any[], b[key] as any[])
      } else {
        return a[key] === b[key]
      }
    })
  }
}

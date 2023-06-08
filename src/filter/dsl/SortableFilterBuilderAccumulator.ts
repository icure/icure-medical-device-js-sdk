import {Filter} from "../Filter";
import {NoOpFilter} from "./filterDsl";

interface FilterByIds<T> extends Filter<T> {
  ids: string[]
}

enum FilterStrategy { ByIds, Singleton, ByIdsObjects, Simple}

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
 */
export class SortableFilterBuilderAccumulator<T> {
  private _filters: FutureFilter<T>[] = []

  lastElementIsSortKey() {
    this._filters = [
      ...this._filters.splice(0, this._filters.length-1),
      {
        ...this._filters[this._filters.length-1],
        sortKey: true
      }
    ]
  }

  private add<F extends Filter<T>, K extends keyof F>(filter: Promise<F>, strategy: FilterStrategy, idKey?: K) {
    this._filters = [
      ...this._filters,
      {
        futureFilter: filter,
        strategy: strategy,
        idKey: !!idKey ? idKey as string : undefined,
        sortKey: false
      }
    ]
  }

  addByIdsFilter<F extends Filter<T>, K extends keyof F>(filter: Promise<F>, key: K) {
    this.add(filter, FilterStrategy.ByIds, key)
  }

  addByIdsObjectsFilter<F extends Filter<T>, K extends keyof F>(filter: Promise<F>, field: K) {
    this.add(filter, FilterStrategy.ByIdsObjects, field)
  }

  addSingletonFilter(filter: Promise<Filter<T>>) {
    this.add(filter, FilterStrategy.Singleton)
  }

  addFilter(filter: Promise<Filter<T>>) {
    this.add(filter, FilterStrategy.Simple)
  }

  async getAndSortFilters(): Promise<Filter<T>[]> {
    const awaitedFilters: AwaitedFilter<T>[] = []
    for(const f of this._filters) {
      awaitedFilters.push({
        filter: await f.futureFilter,
        strategy: f.strategy,
        idKey: f.idKey,
        sortKey: f.sortKey
      })
    }

    const filtersByTypeAndStrategy = awaitedFilters.reduce( (filters, current) => {
      const key = `${current.filter.$type}-${current.strategy}`
      return {
        ...filters,
        [key]: [...(filters[key] ?? []), current]
      }
    }, {} as {[key: string]: AwaitedFilter<T>[]})

    const listOfCombinedFilters = Object.values(filtersByTypeAndStrategy).reduce( (p, c) => {
      return [...p, ...this.combineFilters(c)]
    }, [])

    const sortKey = listOfCombinedFilters.findIndex( f => f.sortKey)
    return sortKey !== -1
      ? [ listOfCombinedFilters[sortKey].filter, ...listOfCombinedFilters.filter( (_, index) => index !== sortKey).map( f => f.filter)]
      : listOfCombinedFilters.map( f => f.filter)
  }

  private combineFilters(filters: AwaitedFilter<T>[]): AwaitedFilter<T>[] {
    if(!filters.length) {
      return [];
    }
    if(filters[0].strategy === FilterStrategy.ByIds) {
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
    const sortKey = filters.find( f => f.sortKey) ?? filters[0]
    const aggregation = filters.reduce( (aggregated, current) => {
      const k = aggregated.idKey!
      const newFilter = {
        ...aggregated.filter,
        [aggregated.idKey!]: this.extractIdsFromFilter(aggregated.filter, aggregated.idKey!).filter( x =>
          this.extractIdsFromFilter(current.filter, aggregated.idKey!).includes(x)
        )} as Filter<T>
      return {
        ...aggregated,
        filter: newFilter
      }
    }, sortKey)
    return {
      ...aggregation,
    filter: (aggregation.filter as FilterByIds<T>).ids.length > 0 ? aggregation.filter : new NoOpFilter()
    }
  }

  private combineByIdsObjectsFilters(filters: AwaitedFilter<T>[]) {
    const sortKey = filters.find( f => f.sortKey) ?? filters[0]
    const aggregation = filters.reduce( (aggregated, current) => {
      const filterIds = this.extractObjectsIdsFromFilter(current.filter, current.idKey!)
      const newFilter = {
        ...aggregated.filter,
        [current.idKey!]: (this.extractObjectsIdsFromFilter(aggregated.filter, current.idKey!)).filter( id => filterIds.includes(id))
      } as Filter<T>
      return {
        ...aggregated,
        filter: newFilter
      }
    }, sortKey)
    return {
      ...aggregation,
      filter: this.extractObjectsIdsFromFilter(aggregation.filter, aggregation.idKey!).length > 0 ? aggregation.filter : new NoOpFilter()
    }
  }

  private combineSingletonFilters(filters: AwaitedFilter<T>[]) {
    const sortKey = filters.find( f => f.sortKey) ?? filters[0]
    return filters.reduce( (aggregated, current) => {
      if(this.filterEquality(aggregated.filter, current.filter)) {
        return aggregated
      } else {
        return {
          filter: new NoOpFilter(),
          strategy: FilterStrategy.Simple,
          idKey: undefined,
          sortKey: false
        }
      }
    }, sortKey)
  }

  private extractObjectsIdsFromFilter(filter: Filter<T>, field: string) {
    return (((filter as unknown as { [key: string]: { id: string}[]})[field]  ?? {}) as {id: string}[]).map( ({id}) => id)
  }

  private extractIdsFromFilter(filter: Filter<T>, field: string) {
    return ((filter as unknown as { [field: string]: string[]})[field] ?? {}) as string[]
  }

  private arrayEquality(a?: any[], b?: any[]) {
    return !!a && !!b && a.length === b.length && a.every( (x, index) => b[index] === x)
  }

  private filterEquality(a: any, b: any) {
    return Object.keys(a).every( key => {
      if(Array.isArray(a[key]) && Array.isArray(b[key])) {
        return this.arrayEquality(a[key] as any[], b[key] as any[])
      } else {
        return a[key] === b[key]
      }
    })
  }

}

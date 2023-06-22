import { v4 as uuid, validate as isUuid } from 'uuid'

export function forceUuid(id?: string): string {
  if (id) {
    if (!isUuid(id)) {
      throw Error('Invalid id, id must be a valid UUID')
    }
    return id
  } else {
    return uuid()
  }
}

export function isCodeId(id?: string): boolean {
  const codeRegex = new RegExp(`[a-zA-Z0-9]{0,80}\\|[a-zA-Z0-9.-]{0,80}\\|[a-zA-Z0-9.]{0,80}`)
  return id != undefined && codeRegex.test(id)
}

export function toMap<V>(entries: [key: string, value: V][]): { [key: string]: V } {
  return entries.reduce((m, [k, v]) => {
    m[k] = v
    return m
  }, {} as { [key: string]: V })
}

export function mapReduce<I, O>(map: { [key: string]: I } | undefined, mapper: (obj: I) => O | undefined): { [key: string]: O } | undefined {
  if (!map) {
    return undefined
  }
  return Object.entries(map)
    .map(([k, v]) => [k, mapper(v)!] as [string, O])
    .reduce((m, [k, v]) => {
      m[k] = v
      return m
    }, {} as { [key: string]: O })
}

export function mapSet<I, O>(set: Set<I> | undefined, mapper: (obj: I) => O | undefined): Set<O> | undefined {
  if (!set) {
    return undefined
  }
  const arr: I[] = Array.from(set)
  return new Set(arr.map((it) => mapper(it)!))
}

export function mapSetToArray<I, O>(set: Set<I> | undefined, mapper: (obj: I) => O | undefined): Array<O> | undefined {
  if (!set) {
    return undefined
  }
  const arr: I[] = Array.from(set)
  return arr.map((it) => mapper(it)!)
}

export function map<I, O>(arr: I[] | undefined, mapper: (obj: I) => O | undefined): O[] | undefined {
  if (!arr) {
    return undefined
  }
  return arr.map((it) => mapper(it)!)
}

export function toMapTransform<I, O>(map: { [key: string]: I } | undefined, mapper: (obj: I) => O | undefined): { [key: string]: O } | undefined {
  if (!map) {
    return undefined
  }
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, mapper(v)!]))
}

export function toMapArrayTransform<I, O>(
  map: { [key: string]: Iterable<I> } | undefined,
  mapper: (obj: I) => O | undefined
): { [key: string]: O[] } | undefined {
  if (!map) {
    return undefined
  }
  return Object.entries(map)
    .map(([k, v]) => [k, Array.from(Array.from(v).map((it) => mapper(it)!))] as [string, O[]])
    .reduce((m, [k, v]) => {
      m[k] = v
      return m
    }, {} as { [key: string]: O[] })
}

export function toMapSetTransform<I, O>(
  map: { [key: string]: Iterable<I> } | undefined,
  mapper: (obj: I) => O | undefined
): { [key: string]: Set<O> } | undefined {
  if (!map) {
    return undefined
  }
  return Object.entries(map)
    .map(([k, v]) => [k, new Set(Array.from(v).map((it) => mapper(it)!))] as [string, Set<O>])
    .reduce((m, [k, v]) => {
      m[k] = v
      return m
    }, {} as { [key: string]: Set<O> })
}

export function toMapSet<I>(map: { [key: string]: Iterable<I> } | undefined): { [key: string]: Set<I> } | undefined {
  return toMapSetTransform(map, (i) => i)
}

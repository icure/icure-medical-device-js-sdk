import {v4 as uuid, validate as isUuid} from 'uuid';

export function forceUuid(id?: string): string {
  if (id) {
    if (!isUuid(id)) {
      throw Error('Invalid id, id must be a valid UUID')
    }
    return id;
  } else {
    return uuid();
  }
}

export function mapReduce<I, O>(map: { [key: string]: I } | undefined, mapper: (obj: I) => O | undefined): { [key: string]: O } | undefined {
  if (!map) {
    return undefined;
  }
  return Object.entries(map)
    .map(([k, v]) => [k, mapper(v)!] as [string, O])
    .reduce((m, [k, v]) => {
      m[k] = v;
      return m;
    }, {} as { [key: string]: O })
}

export function mapSet<I, O>(set: Set<I> | undefined, mapper: (obj: I) => O | undefined): Set<O> | undefined {
  if (!set) {
    return undefined;
  }
  const arr: I[] = Array.from(set);
  return new Set(arr.map(it => mapper(it)!));
}

export function map<I, O>(arr: I[] | undefined, mapper: (obj: I) => O | undefined): O[] | undefined {
  if (!arr) {
    return undefined;
  }
  return arr.map(it => mapper(it)!);
}

export function toMapSet<I>(map: { [key: string]: Iterable<I> } | undefined): { [key: string]: Set<I> } | undefined {
  if (!map) {
    return undefined;
  }
  return Object.entries(map)
    .map(([k, v]) => [k, new Set(Array.from(v))] as [string, Set<I>])
    .reduce((m, [k, v]) => {
      m[k] = v;
      return m;
    }, {} as { [key: string]: Set<I> })

}

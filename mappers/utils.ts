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

export function mapReduce<I, O>(map:{[key:string]: I}, mapper: (obj:I) => O): {[key:string]: O} {
  return Object.entries(map)
    .map(([k,v]) => [k, mapper(v)] as [string, O])
    .reduce((m,[k,v]) => {
      m[k] = v;
      return m;
    }, {} as {[key:string]:O})
}

export function mapSet<I, O>(set: Set<I>, mapper: (obj:I) => O): Set<O> {
  const arr: I[] = Array.from(set);
  return new Set(arr.map(it => mapper(it)));
}


/**
 * Filters out entries where the value is undefined.
 * @param obj an object
 * @return the input object without any undefined values
 */
export function filterUndefined<T extends { [k: string]: any }>(obj: T): T {
  const res: { [k: string]: any } = {}
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined) {
      res[k] = v
    }
  })
  return res as T
}

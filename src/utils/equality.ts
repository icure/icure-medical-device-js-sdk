function xor(a: boolean, b: boolean): boolean {
  return (a && !b) || (!a && b)
}

export function deepEquality(val1?: any, val2?: any): boolean {
  if (!val1 && !val2) return true
  else if (xor(!!val1, !!val2)) return false
  else if (Array.isArray(val1) && Array.isArray(val2)) return arrayEquality(val1, val2)
  else if (val1 instanceof Set && val2 instanceof Set) return setEquality(val1, val2)
  else if ((typeof val1) === "object" && (typeof val2) === "object") return objectEquality(val1, val2)
  else if ((typeof val1) === (typeof val1)) return val1 === val2
  else return false
}

export function setEquality(set1?: Set<any>, set2?: Set<any>): boolean {
  return !!set1 && !!set2 && arrayEquality(Array.from(set1), Array.from(set2))
}

export function arrayEquality(arr1?: any[], arr2?: any[]): boolean {
  if (!arr1 && !arr2) return true
  else if (xor(!!arr1, !!arr2)) return false
  else if (!!arr1 && !!arr2 && arr1.length !== arr2.length) return false

  return arr1!.every( (val1, _) =>
    arr2!.some( (val2) => deepEquality(val1, val2))
  )
}

export function objectEquality(obj1?: {[key: string]: any}, obj2?: {[key: string]: any}): boolean {
  const keys1 = Object.keys(obj1 ?? {})
  const keys2 = Object.keys(obj2 ?? {})
  return arrayEquality(keys1, keys2) && keys1.every( (key1, _) => {
    const val1 = obj1!![key1]
    const val2 = obj2!![key1]
    return deepEquality(val1, val2)
  })
}


export function distinctBy<T, K>(elements: Array<T>, selector: (obj: T) => K) : Set<K> {
  let set = new Set<K>();
  elements.filter((elem) => {
    let newElem = selector(elem);
    set.add(newElem);
  });
  return set;
}


export function isNotEmpty<T>(elements?: Array<T>) : Boolean {
  return elements?.length != undefined && elements?.length > 0
}

export function sumOf<T>(elements: Array<T> | undefined, selector: (obj: T) => number) : number {
  if (elements == undefined) {
    return 0;
  }

  let sum = 0;
  elements.forEach((element) => {
    sum += selector(element);
  });
  return sum;
}

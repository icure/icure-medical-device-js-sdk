
export function distinctBy<T, K>(elements: Array<T>, selector: (obj: T) => K) : Set<K> {
  let set = new Set<K>();
  elements.forEach((elem) => {
    let newElem = selector(elem);
    set.add(newElem);
  });
  return set;
}

export function any<T>(elements: Array<T>, check: (obj: T) => boolean) : boolean {
  for (const elem of elements) {
    if (check(elem)) {
      return true;
    }
  }
  return false;
}

export function firstOrNull<T>(elements: Array<T>): T | undefined {
  if (elements.length == 0) {
    return undefined;
  } else {
    return elements[0];
  }
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

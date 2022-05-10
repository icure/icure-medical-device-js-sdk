import {add, compareAsc} from 'date-fns';

export class CachedMap<V> {
  private readonly expirationInSeconds: number;
  private readonly maxSize: number;

  private cachedElements: { [key: string]: CachedElement<V> } = {};

  constructor(expirationInSeconds: number = 60 * 5, maxSize: number = 1000) {
    this.expirationInSeconds = expirationInSeconds;
    this.maxSize = maxSize;
  }


  getIfPresent(key: string) : V | undefined {
    let element = this.cachedElements[key];
    if (element == undefined || compareAsc(new Date(), add(element.creationDateTime, { seconds: this.expirationInSeconds })) > 0) {
      delete this.cachedElements[key];
      return undefined;
    } else {
      return element.value;
    }
  }

  getAllPresent(keys: Array<string>) : { [key: string]: V } {
    let cachedValues: { [key: string]: V } = {};

    keys.forEach((keyToFind) => {
      let value = this.getIfPresent(keyToFind);
      if (value != null) {
        cachedValues[keyToFind] = value;
      }
    });

    return cachedValues;
  }

  invalidate(key: string) {
    delete this.cachedElements[key];
  }

  invalidateAll(keys: Array<string>) {
    keys.forEach((keyToDelete) => {
      this.invalidate(keyToDelete);
    });
  }

  put(key: string, value: V) {
    if (Object.entries(this.cachedElements).length == this.maxSize) {
      this.invalidateOldestValue();
    }

    this.cachedElements[key] = new CachedElement(value);
  }

  invalidateOldestValue() {
    let [oldestEntryKey, oldestEntryValue] = Object.entries(this.cachedElements)[0];
    Object.entries(this.cachedElements).forEach(([k, v]) => {
      if (compareAsc(oldestEntryValue.creationDateTime, v.creationDateTime) > 0) {
        oldestEntryKey = k;
        oldestEntryValue = v;
      }
    });

    delete this.cachedElements[oldestEntryKey];
  }
}

class CachedElement<V> {
  value: V;
  creationDateTime: Date;

  constructor(value: V, creationDateTime: Date = new Date()) {
    this.value = value;
    this.creationDateTime = creationDateTime;
  }
}

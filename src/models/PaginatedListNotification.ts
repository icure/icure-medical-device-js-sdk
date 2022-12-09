import {PaginatedDocumentKeyAndIdPairObject} from "./PaginatedDocumentKeyAndIdPairObject";
import {Notification} from "./Notification"

export class PaginatedListNotification {
  constructor(json: IPaginatedListNotification) {
    const { rows, nextKeyPair, ...simpleProperties } = json

    Object.assign(this as PaginatedListNotification, simpleProperties as IPaginatedListNotification)

    this.rows = rows ? [...rows]?.map(p => new Notification(p)) : []
    this.nextKeyPair = nextKeyPair && new PaginatedDocumentKeyAndIdPairObject(nextKeyPair)
  }

  'pageSize': number;
  'totalSize': number;
  'rows': Array<Notification>;
  'nextKeyPair'?: PaginatedDocumentKeyAndIdPairObject;

  marshal(): IPaginatedListNotification {
    return {
      ...this,
      rows: this.rows?.map(p => p.marshal()),
      nextKeyPair: this.nextKeyPair?.marshal(),
    }
  }
}

interface IPaginatedListNotification {
  'pageSize'?: number;
  'totalSize'?: number;
  'rows'?: Array<Notification>;
  'nextKeyPair'?: PaginatedDocumentKeyAndIdPairObject;
}

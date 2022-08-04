import {PaginatedDocumentKeyAndIdPairObject} from "./PaginatedDocumentKeyAndIdPairObject";
import {Notification} from "./Notification"

export class PaginatedListNotification {
  constructor(json: IPaginatedListNotification) {
    Object.assign(this as PaginatedListNotification, json)
  }

  'pageSize': number;
  'totalSize': number;
  'rows': Array<Notification>;
  'nextKeyPair'?: PaginatedDocumentKeyAndIdPairObject;

}

interface IPaginatedListNotification {
  'pageSize'?: number;
  'totalSize'?: number;
  'rows'?: Array<Notification>;
  'nextKeyPair'?: PaginatedDocumentKeyAndIdPairObject;
}

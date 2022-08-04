import {Identifier} from "./Identifier";
import {Property} from "./Property";
import {SystemMetaDataEncrypted} from "./SystemMetaDataEncrypted";

export class Notification {
  constructor(json: INotification) {
    Object.assign(this as Notification, json);
  }

  /**
   * The Id of the notification. We encourage using either a v4 UUID or a HL7 Id.
   */
  'id'?: string;
  /**
   * The revision of the patient in the database, used for conflict management / optimistic locking.
   */
  'rev'?: string;
  /**
   * The status of the notification.
   */
  'status'?: maintenanceTaskStatusEnum;
  /**
   * The creation date of the notification (encoded as epoch).
   */
  'created'?: number;
  /**
   * Soft delete (unix epoch in ms) timestamp of the patient
   */
  'endOfLife'?: number;
  /**
   * the soft delete timestamp. When a patient is "deleted", this is set to a non-null value: the moment of the deletion
   */
  'deletionDate'?: number;
  /**
   * Typically used for business / client identifiers. An identifier should identify a notification uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.
   */
  'identifier'?: Array<Identifier>;
  /**
   * the last modification date of the notification (encoded as epoch).
   */
  'modified'?: number;
  /**
   * The id of the [User] that created this notification. When creating the notification, this field will be filled automatically by the current user id if not provided.
   */
  'author'?: string;
  /**
   * The id of the data owner that is responsible for this notification. When creating the notification, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing
   */
  'responsible'?: string;
  /**
   * Additional properties for the notification.
   */
  'properties'?: Array<Property>;
  /**
   * The type of the notification.
   */
  'type'?: notificationTypeEnum;
  'systemMetadata'?: SystemMetaDataEncrypted;
}

export interface INotification {
  id?: string;
  rev?: string;
  status?: maintenanceTaskStatusEnum;
  identifier?: Array<Identifier>;
  created?: number;
  modified?: number;
  endOfLife?: number;
  deletionDate?: number;
  author?: string;
  responsible?: string;
  properties?: Array<Property>;
  type?: notificationTypeEnum;
  systemMetadata?: SystemMetaDataEncrypted;
}

export enum notificationTypeEnum {
  KEY_PAIR_UPDATE = "KEY_PAIR_UPDATE",
  NEW_USER_OWN_DATA_ACCESS = "NEW_USER_OWN_DATA_ACCESS",
  OTHER = "OTHER"
}
export type maintenanceTaskStatusEnum = "pending" | "ongoing" | "cancelled" | "completed";

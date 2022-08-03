import {Notification, notificationTypeEnum} from "../models/Notification";
import {MaintenanceTask} from "@icure/api";
import {SystemMetaDataEncrypted} from "../models/SystemMetaDataEncrypted";
import {toMapSetTransform} from "./utils";
import {DelegationMapper} from "./delegation";

export namespace notificationMapper {

  import toDelegation = DelegationMapper.toDelegation;
  export const toNotification = (obj?: MaintenanceTask) => obj ? new Notification({
    id: obj.id,
    rev: obj.rev,
    status: obj.status,
    identifier: obj.identifier,
    created: obj.created,
    modified: obj.modified,
    deletionDate: obj.deletionDate,
    endOfLife: obj.endOfLife,
    author: obj.author,
    responsible: obj.responsible,
    properties: obj.properties,
    type: !!obj.taskType && Object.values(notificationTypeEnum).includes(obj.taskType as unknown as notificationTypeEnum) ?
      notificationTypeEnum[obj.taskType as keyof typeof notificationTypeEnum] : notificationTypeEnum.OTHER,
    systemMetadata: new SystemMetaDataEncrypted({
      delegations: toMapSetTransform(obj.delegations, toDelegation),
      encryptionKeys: toMapSetTransform(obj.encryptionKeys, toDelegation)
    })
  }) : undefined;

  export const toMaintenanceTaskDto = (obj?: Notification) => obj ? new MaintenanceTask({
    id: obj.id,
    rev: obj.rev,
    status: obj.status,
    identifier: obj.identifier,
    created: obj.created,
    modified: obj.modified,
    deletionDate: obj.deletionDate,
    endOfLife: obj.endOfLife,
    author: obj.author,
    responsible: obj.responsible,
    properties: obj.properties,
    taskType: obj.type,
    delegations: obj.systemMetadata?.delegations,
    encryptionKeys: obj.systemMetadata?.encryptionKeys,
  }) : undefined;
}

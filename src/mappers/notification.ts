import {Notification, NotificationTypeEnum} from "../models/Notification";
import {MaintenanceTask} from "@icure/api";
import {SystemMetaDataEncrypted} from "../models/SystemMetaDataEncrypted";
import {forceUuid, map, toMapArrayTransform, toMapSetTransform} from "./utils";
import {DelegationMapper} from "./delegation";
import {PropertyStubMapper} from "./property";
import {IdentifierDtoMapper} from "./identifier";

export namespace NotificationMapper {

  import toDelegation = DelegationMapper.toDelegation;
  import toDelegationDto = DelegationMapper.toDelegationDto;
  import toProperty = PropertyStubMapper.toProperty;
  import toIdentifier = IdentifierDtoMapper.toIdentifier;
  import toIdentifierDto = IdentifierDtoMapper.toIdentifierDto;
  export const toNotification = (obj?: MaintenanceTask) => obj ? new Notification({
    id: obj.id,
    rev: obj.rev,
    status: obj.status,
    identifiers: map(obj.identifier, toIdentifier),
    created: obj.created,
    modified: obj.modified,
    deletionDate: obj.deletionDate,
    endOfLife: obj.endOfLife,
    author: obj.author,
    responsible: obj.responsible,
    properties: map(obj.properties, toProperty),
    type: !!obj.taskType && Object.values(NotificationTypeEnum).includes(obj.taskType as unknown as NotificationTypeEnum) ?
      NotificationTypeEnum[obj.taskType as keyof typeof NotificationTypeEnum] : NotificationTypeEnum.OTHER,
    systemMetaData: new SystemMetaDataEncrypted({
      delegations: toMapSetTransform(obj.delegations, toDelegation),
      encryptionKeys: toMapSetTransform(obj.encryptionKeys, toDelegation)
    })
  }) : undefined;

  export const toMaintenanceTaskDto = (obj?: Notification) => obj ? new MaintenanceTask({
    id: forceUuid(obj.id),
    rev: obj.rev,
    status: obj.status,
    identifier: map(obj.identifiers, toIdentifierDto),
    created: obj.created,
    modified: obj.modified,
    deletionDate: obj.deletionDate,
    endOfLife: obj.endOfLife,
    author: obj.author,
    responsible: obj.responsible,
    properties: obj.properties,
    taskType: obj.type,
    delegations: toMapArrayTransform(obj.systemMetaData?.delegations, toDelegationDto),
    encryptionKeys: toMapArrayTransform(obj.systemMetaData?.encryptionKeys, toDelegationDto),
  }) : undefined;
}

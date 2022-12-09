import 'mocha';
import {Notification, NotificationTypeEnum} from "../../src/models/Notification";
import {v4 as uuid} from "uuid";
import {MaintenanceTask} from "@icure/api/icc-api/model/MaintenanceTask";
import {Delegation} from "../../src/models/Delegation";
import {Property} from "../../src/models/Property";
import {SystemMetaDataEncrypted} from "../../src/models/SystemMetaDataEncrypted";
import {assert} from "chai";
import {NotificationMapper} from "../../src/mappers/notification";
import {Identifier} from "@icure/api";

function identifierEquality(identifier1: Identifier, identifier2: Identifier) {
  return identifier1.id === identifier2.id;
}

function propertyEquality(property1: Property, property2: Property) {
  return property1.id === property2.id;
}

function delegationEquality(delegation1: Delegation, delegation2: Delegation) {
  return delegation1.owner == delegation2.owner && delegation1.delegatedTo == delegation2.delegatedTo;
}

function arrayEquality(arr1: any[], arr2: any[], equals: (arg0: any, arg1: any) => boolean) {
  let areEquals = arr1.length === arr2.length;
  for(let i=0; i<arr1.length; i++) {
    areEquals = areEquals && equals(arr1[i], arr2[i]);
  }
  return areEquals;
}

function metadataEquality(obj1: any, obj2: any) {
  let areEquals = !!obj1 && !!obj2;
  Object.keys(obj1).forEach( (key) => {
    areEquals = areEquals &&
      key in obj2 &&
      arrayEquality(Array.from(obj1[key]), Array.from(obj1[key]), delegationEquality)
  });
  return areEquals;
}

function assertNotificationIsEquivalentToMaintenanceTask(notification: Notification, maintenanceTask: MaintenanceTask) {
  assert(notification.id === maintenanceTask.id);
  assert(notification.rev === maintenanceTask.rev);
  assert(notification.status === maintenanceTask.status);
  assert(arrayEquality(!!notification.identifiers ? notification.identifiers : [],
    !!maintenanceTask.identifier ? maintenanceTask.identifier : [], identifierEquality));
  assert(notification.created === maintenanceTask.created);
  assert(notification.modified === maintenanceTask.modified);
  assert(notification.deletionDate === maintenanceTask.deletionDate);
  assert(notification.endOfLife === maintenanceTask.endOfLife);
  assert(notification.author === maintenanceTask.author);
  assert(notification.responsible === maintenanceTask.responsible);
  assert(arrayEquality(!!notification.properties ? notification.properties : [],
    !!maintenanceTask.properties ? maintenanceTask.properties : [], propertyEquality));
  assert(notification.type === maintenanceTask.taskType);
  assert(metadataEquality(notification.systemMetaData?.delegations, maintenanceTask.delegations));
  assert(metadataEquality(notification.systemMetaData?.encryptionKeys, maintenanceTask.encryptionKeys));
}

const commonOptions = {
    id: uuid(),
    rev: '1.234556',
    status: MaintenanceTask.StatusEnum.Cancelled,
    identifier: [new Identifier({id: uuid()})],
    created: new Date().getTime(),
    modified: new Date().getTime(),
    deletionDate: new Date().getTime(),
    endOfLife: new Date().getTime(),
    author: uuid(),
    responsible: uuid(),
    properties: [new Property({id: uuid()})],
};

describe('Notification mapper test', () => {
  it('Notification to MaintenanceTask - Success', () => {
    const newNotification = new Notification({
      ...commonOptions,
      type: NotificationTypeEnum.KEY_PAIR_UPDATE,
      systemMetaData: new SystemMetaDataEncrypted({
        delegations: { 'TEST_ID': new Set([new Delegation({owner: uuid(), delegatedTo: uuid()})]) },
        encryptionKeys: { 'TEST_KEY': new Set([new Delegation({owner: uuid(), delegatedTo: uuid()})]) }
      })
    });
    assert(newNotification);
    const newTask = NotificationMapper.toMaintenanceTaskDto(newNotification);
    assert(newTask);
    assertNotificationIsEquivalentToMaintenanceTask(newNotification, newTask);
  });

  it('MaintenanceTask to Notification - Success', () => {
    const newTask = new MaintenanceTask({
      ...commonOptions,
      taskType: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS,
      delegations: { 'TEST_ID': new Set([new Delegation({owner: uuid(), delegatedTo: uuid()})]) },
      encryptionKeys: { 'TEST_KEY': new Set([new Delegation({owner: uuid(), delegatedTo: uuid()})]) }
    });
    assert(newTask);
    const newNotification = NotificationMapper.toNotification(newTask);
    assert(newNotification);
    assertNotificationIsEquivalentToMaintenanceTask(newNotification, newTask);
  });

  it('If MaintenanceTask type is not in notificationTypeEnum, type OTHER is set in Notification', () => {
    const newTask = new MaintenanceTask({
      id: uuid(),
      taskType: 'THIS DOES NOT BELONG TO THE ENUM'
    });
    assert(newTask);
    const newNotification = NotificationMapper.toNotification(newTask);
    assert(newNotification);
    assert(newNotification.id === newTask.id);
    assert(newNotification.type === NotificationTypeEnum.OTHER);
  });

  it('If the toNotification parameter is undefined, then the result is undefined', () => {
    const newNotification = NotificationMapper.toNotification(undefined);
    assert(newNotification === undefined);
  });

  it('If the toMaintenanceTask parameter is undefined, then the result is undefined', () => {
    const newTask = NotificationMapper.toNotification(undefined);
    assert(newTask === undefined);
  });
});

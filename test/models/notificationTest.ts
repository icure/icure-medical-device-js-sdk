import 'mocha';
import {Notification, NotificationTypeEnum} from '../../src/models/Notification';
import {v4 as uuid} from 'uuid';
import {MaintenanceTask} from "@icure/api/icc-api/model/MaintenanceTask";
import {Delegation} from "../../src/models/Delegation";
import {SystemMetaDataEncrypted} from "../../src/models/SystemMetaDataEncrypted";
import {assert} from "chai";
import {newIdentifier} from "./identifierTest";
import {newProperty} from "./propertyTest";


export function newNotification(): Notification {
  return new Notification({
    id: uuid(),
    rev: "rev",
    status: MaintenanceTask.StatusEnum.Pending,
    identifiers: [newIdentifier()],
    created: new Date().getTime(),
    modified: new Date().getTime(),
    deletionDate: new Date().getTime(),
    endOfLife: new Date().getTime(),
    author: uuid(),
    responsible: uuid(),
    properties: [newProperty()],
    type: NotificationTypeEnum.OTHER,
    systemMetaData: new SystemMetaDataEncrypted({
      delegations: {'TEST_ID': new Set([new Delegation({owner: uuid(), delegatedTo: uuid()})])},
      encryptionKeys: {'TEST_ID': new Set([new Delegation({owner: uuid(), delegatedTo: uuid()})])}
    })
  });
}

describe('Notification model test', () => {
  it('Instantiation of Notification model - Success', () => {
    const notification = newNotification();
    assert(notification);
  });

  it('All the fields can be null', () => {
    const newNotification = new Notification({});
    assert(newNotification);
  });
});

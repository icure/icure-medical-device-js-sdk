import 'mocha';
import {Notification, notificationTypeEnum} from '../../src/models/Notification';
import {v4 as uuid} from 'uuid';
import {MaintenanceTask} from "@icure/api/icc-api/model/MaintenanceTask";
import {Delegation} from "../../src/models/Delegation";
import {Property} from "../../src/models/Property";
import {SystemMetaDataEncrypted} from "../../src/models/SystemMetaDataEncrypted";
import {assert} from "chai";

describe('Notification model test', () => {
  it('Instantiation of Notification model - Success', () => {
    const newNotification = new Notification({
      id: uuid(),
      status: MaintenanceTask.StatusEnum.Pending,
      identifier: [],
      created: new Date().getTime(),
      modified: new Date().getTime(),
      deletionDate: new Date().getTime(),
      endOfLife: new Date().getTime(),
      author: uuid(),
      responsible: uuid(),
      properties: [new Property({id: uuid()})],
      type: notificationTypeEnum.OTHER,
      systemMetaData: new SystemMetaDataEncrypted({
        delegations: { 'TEST_ID': new Set([new Delegation({owner: uuid(), delegatedTo: uuid()})]) },
        encryptionKeys: { 'TEST_ID': new Set([new Delegation({owner: uuid(), delegatedTo: uuid()})]) }
      })
    });
    assert(newNotification);
  });

  it('All the fields can be null', () => {
    const newNotification = new Notification({});
    assert(newNotification);
  });
});

import 'mocha';

import {assert} from "chai";
import {NotificationMapper} from "../../src/mappers/notification";
import {newNotification} from "../models/notificationTest";

describe('Notification mapper test', () => {
  it('Mapping/Unmapping of Notification model - Success', () => {
    const notification = newNotification()
    const mappedNotification = NotificationMapper.toMaintenanceTaskDto(notification)
    assert.deepEqual(NotificationMapper.toNotification(mappedNotification), notification)
  });
});


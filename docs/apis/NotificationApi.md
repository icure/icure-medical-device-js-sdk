[@icure/medical-device-sdk](../modules) / NotificationApi

# SDK API: NotificationApi

The NotificationApi interface provides methods to subscribe to notifications.

## Table of contents

### Methods

- [createOrModifyNotification](NotificationApi#createormodifynotification)
- [deleteNotification](NotificationApi#deletenotification)
- [filterNotifications](NotificationApi#filternotifications)
- [getNotification](NotificationApi#getnotification)
- [getPendingNotificationsAfter](NotificationApi#getpendingnotificationsafter)
- [subscribeToNotificationEvents](NotificationApi#subscribetonotificationevents)
- [updateNotificationStatus](NotificationApi#updatenotificationstatus)

## Methods

### createOrModifyNotification

▸ **createOrModifyNotification**(`notification`, `delegate?`): `Promise`<`undefined` \| `Notification`\>

This method creates a Notification if the rev field is undefined, otherwise it updates an existing one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `notification` | `Notification` | the Notification to create or modify. |
| `delegate?` | `string` | the id of the Healthcare Party to delegate. |

#### Returns

`Promise`<`undefined` \| `Notification`\>

a Promise containing the Notification or undefined if something goes wrong.

#### Defined in

[src/apis/NotificationApi.ts:16](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/NotificationApi.ts#L16)

___

### deleteNotification

▸ **deleteNotification**(`notificationId`): `Promise`<`undefined` \| `string`\>

This method deletes the Notification with the provided id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `notificationId` | `string` | the id of the Notification to delete |

#### Returns

`Promise`<`undefined` \| `string`\>

a Promise containing the id of the Notification or undefined if something goes wrong.

#### Defined in

[src/apis/NotificationApi.ts:23](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/NotificationApi.ts#L23)

___

### filterNotifications

▸ **filterNotifications**(`filter`, `nextNotificationId?`, `limit?`): `Promise`<`PaginatedListNotification`\>

Filters are complex selectors that are built by combining basic building blocks. This method returns a paginated list of Notification (with a cursor that lets you query the following items).
Load notifications from the database by filtering them using the provided [filter].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<`Notification`\> | The Filter object that describes which condition(s) the elements which the ids should be returned must fulfill |
| `nextNotificationId?` | `string` | The id of the first notification in the next page |
| `limit?` | `number` | The number of patients to return in the queried page |

#### Returns

`Promise`<`PaginatedListNotification`\>

a Promise containing the PaginatedList of Notification objects

#### Defined in

[src/apis/NotificationApi.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/NotificationApi.ts#L33)

___

### getNotification

▸ **getNotification**(`notificationId`): `Promise`<`undefined` \| `Notification`\>

This method returns a Promise containing the Notification with the specified id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `notificationId` | `string` | the id of the Notification to retrieve. |

#### Returns

`Promise`<`undefined` \| `Notification`\>

a Promise containing the Notification or undefined if something goes wrong.

#### Defined in

[src/apis/NotificationApi.ts:40](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/NotificationApi.ts#L40)

___

### getPendingNotificationsAfter

▸ **getPendingNotificationsAfter**(`fromDate?`): `Promise`<`Notification`[]\>

Gets all the Notifications with status "pending" that the current dataOwner can access

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromDate?` | `number` | : Default value is now less 30 days |

#### Returns

`Promise`<`Notification`[]\>

an Array of the Notifications matching those criteria

#### Defined in

[src/apis/NotificationApi.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/NotificationApi.ts#L48)

___

### subscribeToNotificationEvents

▸ **subscribeToNotificationEvents**(`eventTypes`, `filter`, `eventFired`, `options?`): `Promise`<[`Connection`](Connection)\>

Opens a WebSocket Connection in order to receive all the Notification corresponding to specific filter criteria.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventTypes` | (``"CREATE"`` \| ``"UPDATE"`` \| ``"DELETE"``)[] | Type of event you would like to listen. It can be CREATE, UPDATE or DELETE |
| `filter` | `Filter`<`Notification`\> | Filter criteria to filter to the notification you would like to receive |
| `eventFired` | (`dataSample`: `Notification`) => `Promise`<`void`\> | Action applied each time you receive a notification through the WebSocket |
| `options?` | `Object` | Options to configure the WebSocket. - keepAlive : How long to keep connection alive (ms); - lifetime : How long to keep the WebSocket alive (ms); - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket; - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts) |
| `options.connectionMaxRetry?` | `number` | - |
| `options.connectionRetryIntervalMs?` | `number` | - |

#### Returns

`Promise`<[`Connection`](Connection)\>

#### Defined in

[src/apis/NotificationApi.ts:69](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/NotificationApi.ts#L69)

___

### updateNotificationStatus

▸ **updateNotificationStatus**(`notification`, `newStatus`): `Promise`<`undefined` \| `Notification`\>

Updates the status of a Notification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `notification` | `Notification` | the Notification to update |
| `newStatus` | `MaintenanceTaskStatusEnum` | the new status |

#### Returns

`Promise`<`undefined` \| `Notification`\>

the updated Notification

#### Defined in

[src/apis/NotificationApi.ts:56](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/NotificationApi.ts#L56)

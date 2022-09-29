[@icure/medical-device-sdk](../modules.md) / UserApi

# Interface: UserApi

The UserApi interface provides methods to manage users.

## Table of contents

### Methods

- [checkTokenValidity](UserApi.md#checktokenvalidity)
- [createAndInviteUser](UserApi.md#createandinviteuser)
- [createOrModifyUser](UserApi.md#createormodifyuser)
- [createToken](UserApi.md#createtoken)
- [deleteUser](UserApi.md#deleteuser)
- [filterUsers](UserApi.md#filterusers)
- [getLoggedUser](UserApi.md#getloggeduser)
- [getUser](UserApi.md#getuser)
- [getUserByEmail](UserApi.md#getuserbyemail)
- [matchUsers](UserApi.md#matchusers)
- [shareAllFutureDataWith](UserApi.md#shareallfuturedatawith)
- [stopSharingDataWith](UserApi.md#stopsharingdatawith)
- [subscribeToUserEvents](UserApi.md#subscribetouserevents)

## Methods

### checkTokenValidity

▸ **checkTokenValidity**(`userId`, `token`): `Promise`<`boolean`\>

Checks that the provided token is (still) valid for the provided user id (or user login).
Check token validity for a user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The UUID that identifies the user uniquely |
| `token` | `string` | The token that will be checked |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/apis/UserApi.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L18)

___

### createAndInviteUser

▸ **createAndInviteUser**(`patient`, `messageFactory`, `tokenDuration?`): `Promise`<[`User`](../classes/User.md)\>

Creates a User from an existing patient with a short-lived authentication token. It sends an invitation with the
credentials and the link to complete the signup.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patient` | [`Patient`](../classes/Patient.md) | the Patient to create the user for. |
| `messageFactory` | `EmailMessageFactory` \| `SMSMessageFactory` | a MessageFactory that generates an EmailMessage or a SMSMessage. |
| `tokenDuration?` | `number` | the validity duration of the short-lived token, in seconds (default 48 hours) |

#### Returns

`Promise`<[`User`](../classes/User.md)\>

#### Defined in

[src/apis/UserApi.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L26)

___

### createOrModifyUser

▸ **createOrModifyUser**(`user`): `Promise`<[`User`](../classes/User.md)\>

A user must have a login, an email or a mobilePhone defined, a user should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an user, you must ensure that the rev obtained when getting or creating the user is present as the rev is used to guarantee that the user has not been modified by a third party.
Create a new user or modify an existing one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`User`](../classes/User.md) | The user that must be created in the database. |

#### Returns

`Promise`<[`User`](../classes/User.md)\>

#### Defined in

[src/apis/UserApi.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L33)

___

### createToken

▸ **createToken**(`userId`, `durationInSeconds?`): `Promise`<`string`\>

A token is used to authenticate the user. It is just like a password but it is destined to be used by programs instead of humans. Tokens have a limited validity period (one month).
Create a token for a user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The UUID that identifies the user uniquely |
| `durationInSeconds?` | `number` | the validity duration of the token, in seconds |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/apis/UserApi.ts:40](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L40)

___

### deleteUser

▸ **deleteUser**(`userId`): `Promise`<`string`\>

Deletes the user identified by the provided unique userId.
Delete an existing user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The UUID that uniquely identifies the user to be deleted. |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/apis/UserApi.ts:46](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L46)

___

### filterUsers

▸ **filterUsers**(`filter`, `nextUserId?`, `limit?`): `Promise`<[`PaginatedListUser`](../classes/PaginatedListUser.md)\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns a paginated list of users (with a cursor that lets you query the following items).
Load users from the database by filtering them using the provided Filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`User`](../classes/User.md)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
| `nextUserId?` | `string` | The id of the first User in the next page |
| `limit?` | `number` | The number of users to return in the queried page |

#### Returns

`Promise`<[`PaginatedListUser`](../classes/PaginatedListUser.md)\>

#### Defined in

[src/apis/UserApi.ts:54](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L54)

___

### getLoggedUser

▸ **getLoggedUser**(): `Promise`<[`User`](../classes/User.md)\>

When you make a call to the server, an authentication token is used to identify you. This call returns the complete User object that corresponds to your authentication credentials.
Get the details of the logged User.

#### Returns

`Promise`<[`User`](../classes/User.md)\>

#### Defined in

[src/apis/UserApi.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L59)

___

### getUser

▸ **getUser**(`userId`): `Promise`<[`User`](../classes/User.md)\>

Each user is uniquely identified by a user id. The user id is a UUID. This userId is the preferred method to retrieve one specific user.
Get a User by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The UUID that identifies the user uniquely |

#### Returns

`Promise`<[`User`](../classes/User.md)\>

#### Defined in

[src/apis/UserApi.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L65)

___

### getUserByEmail

▸ **getUserByEmail**(`email`): `Promise`<[`User`](../classes/User.md)\>

Get a User by email.

Each user is uniquely identified by an email

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `email` | `string` | The email that identifies the user uniquely |

#### Returns

`Promise`<[`User`](../classes/User.md)\>

#### Defined in

[src/apis/UserApi.ts:74](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L74)

___

### matchUsers

▸ **matchUsers**(`filter`): `Promise`<`string`[]\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns the list of the ids of the users matching the filter.
Load user ids from the database by filtering them using the provided Filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`User`](../classes/User.md)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/apis/UserApi.ts:81](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L81)

___

### shareAllFutureDataWith

▸ **shareAllFutureDataWith**(`type`, `dataOwnerIds`): `Promise`<[`User`](../classes/User.md)\>

Add autoDelegations values to the user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`SharedDataType`](../modules.md#shareddatatype) | Type of AutoDelegation to add |
| `dataOwnerIds` | `string`[] | Array of DataOwnerId to add |

#### Returns

`Promise`<[`User`](../classes/User.md)\>

Updated user

#### Defined in

[src/apis/UserApi.ts:107](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L107)

___

### stopSharingDataWith

▸ **stopSharingDataWith**(`type`, `dataOwnerIds`): `Promise`<[`User`](../classes/User.md)\>

Removes autoDelegations values to the user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`SharedDataType`](../modules.md#shareddatatype) | Type of AutoDelegation to removes |
| `dataOwnerIds` | `string`[] | Array of DataOwnerId to add |

#### Returns

`Promise`<[`User`](../classes/User.md)\>

Updated user

#### Defined in

[src/apis/UserApi.ts:115](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L115)

___

### subscribeToUserEvents

▸ **subscribeToUserEvents**(`eventTypes`, `filter`, `eventFired`, `options?`): `Promise`<[`Connection`](Connection.md)\>

Opens a WebSocket Connection in order to receive all the Users corresponding to specific filter criteria.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventTypes` | (``"CREATE"`` \| ``"UPDATE"`` \| ``"DELETE"``)[] | Type of event you would like to listen. It can be CREATE, UPDATE or DELETE |
| `filter` | `Filter`<[`User`](../classes/User.md)\> | Filter criteria to filter to the users you would like to receive |
| `eventFired` | (`user`: [`User`](../classes/User.md)) => `Promise`<`void`\> | Action applied each time you receive a user through the WebSocket |
| `options?` | `Object` | Options to configure the WebSocket.    - keepAlive : How long to keep connection alive (ms);    - lifetime : How long to keep the WebSocket alive (ms);    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts) |
| `options.connectionMaxRetry?` | `number` | - |
| `options.connectionRetryIntervalMs?` | `number` | - |
| `options.keepAlive?` | `number` | - |
| `options.lifetime?` | `number` | - |

#### Returns

`Promise`<[`Connection`](Connection.md)\>

#### Defined in

[src/apis/UserApi.ts:94](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/UserApi.ts#L94)

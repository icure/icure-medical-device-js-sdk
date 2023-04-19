[@icure/medical-device-sdk](../modules) / MedicalDeviceApi

# SDK API: MedicalDeviceApi

The MedicalDeviceApi interface provides methods to manage medical devices.

## Table of contents

### Methods

- [createOrModifyMedicalDevice](MedicalDeviceApi#createormodifymedicaldevice)
- [createOrModifyMedicalDevices](MedicalDeviceApi#createormodifymedicaldevices)
- [deleteMedicalDevice](MedicalDeviceApi#deletemedicaldevice)
- [deleteMedicalDevices](MedicalDeviceApi#deletemedicaldevices)
- [filterMedicalDevices](MedicalDeviceApi#filtermedicaldevices)
- [getMedicalDevice](MedicalDeviceApi#getmedicaldevice)
- [matchMedicalDevices](MedicalDeviceApi#matchmedicaldevices)

## Methods

### createOrModifyMedicalDevice

▸ **createOrModifyMedicalDevice**(`medicalDevice`): `Promise`<[`MedicalDevice`](../classes/MedicalDevice)\>

When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
Create or update a [MedicalDevice]

#### Parameters

| Name | Type |
| :------ | :------ |
| `medicalDevice` | [`MedicalDevice`](../classes/MedicalDevice) |

#### Returns

`Promise`<[`MedicalDevice`](../classes/MedicalDevice)\>

#### Defined in

[src/apis/MedicalDeviceApi.ts:15](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedicalDeviceApi.ts#L15)

___

### createOrModifyMedicalDevices

▸ **createOrModifyMedicalDevices**(`medicalDevice`): `Promise`<[`MedicalDevice`](../classes/MedicalDevice)[]\>

When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
Create or update a batch of [MedicalDevice]

#### Parameters

| Name | Type |
| :------ | :------ |
| `medicalDevice` | [`MedicalDevice`](../classes/MedicalDevice)[] |

#### Returns

`Promise`<[`MedicalDevice`](../classes/MedicalDevice)[]\>

#### Defined in

[src/apis/MedicalDeviceApi.ts:21](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedicalDeviceApi.ts#L21)

___

### deleteMedicalDevice

▸ **deleteMedicalDevice**(`medicalDeviceId`): `Promise`<`string`\>

Deletes the medical device identified by the provided unique [medicalDeviceId].
Delete a [MedicalDevice]

#### Parameters

| Name | Type |
| :------ | :------ |
| `medicalDeviceId` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/apis/MedicalDeviceApi.ts:27](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedicalDeviceApi.ts#L27)

___

### deleteMedicalDevices

▸ **deleteMedicalDevices**(`requestBody`): `Promise`<`string`[]\>

Deletes the batch of medical device identified by the provided [medicalDeviceIds].
Delete a batch of [MedicalDevice]

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestBody` | `string`[] |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/apis/MedicalDeviceApi.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedicalDeviceApi.ts#L33)

___

### filterMedicalDevices

▸ **filterMedicalDevices**(`filter`, `nextDeviceId?`, `limit?`): `Promise`<[`PaginatedListMedicalDevice`](../classes/PaginatedListMedicalDevice)\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns a paginated list of medical devices (with a cursor that lets you query the following items).
Load devices from the database by filtering them using the provided [filter].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`MedicalDevice`](../classes/MedicalDevice)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
| `nextDeviceId?` | `string` | The id of the first device in the next page |
| `limit?` | `number` | The number of devices to return in the queried page |

#### Returns

`Promise`<[`PaginatedListMedicalDevice`](../classes/PaginatedListMedicalDevice)\>

#### Defined in

[src/apis/MedicalDeviceApi.ts:41](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedicalDeviceApi.ts#L41)

___

### getMedicalDevice

▸ **getMedicalDevice**(`medicalDeviceId`): `Promise`<[`MedicalDevice`](../classes/MedicalDevice)\>

Each medical device is uniquely identified by a device id. The device id is a UUID. This [medicalDeviceId] is the preferred method to retrieve one specific device.
Get a Medical Device

#### Parameters

| Name | Type |
| :------ | :------ |
| `medicalDeviceId` | `string` |

#### Returns

`Promise`<[`MedicalDevice`](../classes/MedicalDevice)\>

#### Defined in

[src/apis/MedicalDeviceApi.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedicalDeviceApi.ts#L47)

___

### matchMedicalDevices

▸ **matchMedicalDevices**(`filter`): `Promise`<`string`[]\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns the list of the ids of the users matching the filter.
Load medical device ids from the database by filtering them using the provided Filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`MedicalDevice`](../classes/MedicalDevice)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/apis/MedicalDeviceApi.ts:53](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedicalDeviceApi.ts#L53)

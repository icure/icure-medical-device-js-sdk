[@icure/medical-device-sdk](../modules) / HealthcareElementApi

# SDK API: HealthcareElementApi

The HealthcareElementApi interface provides methods to manage healthcare elements.

## Table of contents

### Methods

- [createOrModifyHealthcareElement](HealthcareElementApi#createormodifyhealthcareelement)
- [createOrModifyHealthcareElements](HealthcareElementApi#createormodifyhealthcareelements)
- [deleteHealthcareElement](HealthcareElementApi#deletehealthcareelement)
- [filterHealthcareElement](HealthcareElementApi#filterhealthcareelement)
- [getHealthcareElement](HealthcareElementApi#gethealthcareelement)
- [getHealthcareElementsForPatient](HealthcareElementApi#gethealthcareelementsforpatient)
- [giveAccessTo](HealthcareElementApi#giveaccessto)
- [matchHealthcareElement](HealthcareElementApi#matchhealthcareelement)
- [subscribeToHealthcareElementEvents](HealthcareElementApi#subscribetohealthcareelementevents)

## Methods

### createOrModifyHealthcareElement

▸ **createOrModifyHealthcareElement**(`healthcareElement`, `patientId?`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement)\>

A Healthcare Element is a data giving some medical context to a series of measures, symptoms, ...
For example, if the data samples are symptoms representing fever, cold feel, headache, ... the associated healthcare
element could be a flue.

A healthcare Element can be linked to a patient and to a series of data samples.

This service allows you to create a healthcare element linked to a specific patient

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `healthcareElement` | [`HealthcareElement`](../classes/HealthcareElement) | Healthcare element to create in iCure Database |
| `patientId?` | `string` | Id of the patient to which the healthcare element is linked |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement)\>

#### Defined in

[src/apis/HealthcareElementApi.ts:23](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareElementApi.ts#L23)

___

### createOrModifyHealthcareElements

▸ **createOrModifyHealthcareElements**(`healthcareElement`, `patientId?`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement)[]\>

A Healthcare Element is a data giving some medical context to a series of measures, symptoms, ...
For example, if the data samples are symptoms representing fever, cold feel, headache, ... the associated healthcare
element could be a flue.

A healthcare Element can be linked to a patient and to a series of data samples.

This service permits you to create multiple healthcare elements for a specific patient

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `healthcareElement` | [`HealthcareElement`](../classes/HealthcareElement)[] |  |
| `patientId?` | `string` | Id of the patient to which the healthcare elements are linked |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement)[]\>

#### Defined in

[src/apis/HealthcareElementApi.ts:37](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareElementApi.ts#L37)

___

### deleteHealthcareElement

▸ **deleteHealthcareElement**(`id`): `Promise`<`string`\>

Delete a Healthcare Element from the iCure database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the healthcare element to delete |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/apis/HealthcareElementApi.ts:43](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareElementApi.ts#L43)

___

### filterHealthcareElement

▸ **filterHealthcareElement**(`filter`, `nextHealthElementId?`, `limit?`): `Promise`<[`PaginatedListHealthcareElement`](../classes/PaginatedListHealthcareElement)\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare elements are :
 - HealthcareElementByHealthcarePartyFilter;
 - HealthcareElementByHealthcarePartyIdentifiersFilter;
 - HealthcareElementByHealthcarePartyLabelCodeFilter;
 - HealthcareElementByHealthcarePartyPatientFilter;
 - and HealthcareElementByIdsFilter.

This method returns a paginated list of healthcare elements (with a cursor that lets you query the following items).
Load healthcare elements from the database by filtering them using the provided Filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`HealthcareElement`](../classes/HealthcareElement)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
| `nextHealthElementId?` | `string` | The id of the first Healthcare professional in the next page |
| `limit?` | `number` | The maximum number of healthcare elements that should contain the returned page. By default, a page contains 1000 healthcare elements |

#### Returns

`Promise`<[`PaginatedListHealthcareElement`](../classes/PaginatedListHealthcareElement)\>

#### Defined in

[src/apis/HealthcareElementApi.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareElementApi.ts#L59)

___

### getHealthcareElement

▸ **getHealthcareElement**(`id`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement)\>

Retrieves the information of a specific Healthcare Element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the healthcare element to retrieve |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement)\>

#### Defined in

[src/apis/HealthcareElementApi.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareElementApi.ts#L65)

___

### getHealthcareElementsForPatient

▸ **getHealthcareElementsForPatient**(`patient`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement)[]\>

Gets all the Healthcare Elements associated to a Patient that the current dataOwner can access.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patient` | [`Patient`](../classes/Patient) | the Patient associated to the Healthcare Elements to get |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement)[]\>

an array containing the Healthcare Elements

#### Defined in

[src/apis/HealthcareElementApi.ts:91](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareElementApi.ts#L91)

___

### giveAccessTo

▸ **giveAccessTo**(`healthcareElement`, `delegatedTo`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement)\>

Service where current user gives access to the healthcare Element information to another dataOwner (HCP, patient or device).
For this, the current user data owner should be able to access the healthcare Element provided in argument in order to provide access to another data owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `healthcareElement` | [`HealthcareElement`](../classes/HealthcareElement) | Healthcare Element the current data owner would like to share with another data owner |
| `delegatedTo` | `string` | ID of the data owner to which current user would like to give access |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement)\>

#### Defined in

[src/apis/HealthcareElementApi.ts:83](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareElementApi.ts#L83)

___

### matchHealthcareElement

▸ **matchHealthcareElement**(`filter`): `Promise`<`string`[]\>

Find which Healthcare Elements are matching a specific filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`HealthcareElement`](../classes/HealthcareElement)\> | Filtering conditions that the returned healthcare element ids are satisfying. |

#### Returns

`Promise`<`string`[]\>

the ids of the healthcare elements satisfying the provided filter

#### Defined in

[src/apis/HealthcareElementApi.ts:74](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareElementApi.ts#L74)

___

### subscribeToHealthcareElementEvents

▸ **subscribeToHealthcareElementEvents**(`eventTypes`, `filter`, `eventFired`, `options?`): `Promise`<[`Connection`](Connection)\>

Opens a WebSocket Connection in order to receive all the Healthcare Element corresponding to specific filter criteria.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventTypes` | (``"CREATE"`` \| ``"UPDATE"`` \| ``"DELETE"``)[] | Type of event you would like to listen. It can be CREATE, UPDATE or DELETE |
| `filter` | `Filter`<[`HealthcareElement`](../classes/HealthcareElement)\> | Filter criteria to filter to the healthcare element you would like to receive |
| `eventFired` | (`dataSample`: [`HealthcareElement`](../classes/HealthcareElement)) => `Promise`<`void`\> | Action applied each time you receive a healthcare element through the WebSocket |
| `options?` | `Object` | Options to configure the WebSocket. - keepAlive : How long to keep connection alive (ms); - lifetime : How long to keep the WebSocket alive (ms); - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket; - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts) |
| `options.connectionMaxRetry?` | `number` | - |
| `options.connectionRetryIntervalMs?` | `number` | - |

#### Returns

`Promise`<[`Connection`](Connection)\>

#### Defined in

[src/apis/HealthcareElementApi.ts:104](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareElementApi.ts#L104)

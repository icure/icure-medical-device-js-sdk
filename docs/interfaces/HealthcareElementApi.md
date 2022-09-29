[@icure/medical-device-sdk](../modules.md) / HealthcareElementApi

# Interface: HealthcareElementApi

The HealthcareElementApi interface provides methods to manage healthcare elements.

## Table of contents

### Methods

- [createOrModifyHealthcareElement](HealthcareElementApi.md#createormodifyhealthcareelement)
- [createOrModifyHealthcareElements](HealthcareElementApi.md#createormodifyhealthcareelements)
- [deleteHealthcareElement](HealthcareElementApi.md#deletehealthcareelement)
- [filterHealthcareElement](HealthcareElementApi.md#filterhealthcareelement)
- [getHealthcareElement](HealthcareElementApi.md#gethealthcareelement)
- [getHealthcareElementsForPatient](HealthcareElementApi.md#gethealthcareelementsforpatient)
- [giveAccessTo](HealthcareElementApi.md#giveaccessto)
- [matchHealthcareElement](HealthcareElementApi.md#matchhealthcareelement)

## Methods

### createOrModifyHealthcareElement

▸ **createOrModifyHealthcareElement**(`healthcareElement`, `patientId?`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)\>

A Healthcare Element is a data giving some medical context to a series of measures, symptoms, ...
For example, if the data samples are symptoms representing fever, cold feel, headache, ... the associated healthcare
element could be a flue.

A healthcare Element can be linked to a patient and to a series of data samples.

This service allows you to create a healthcare element linked to a specific patient

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `healthcareElement` | [`HealthcareElement`](../classes/HealthcareElement.md) | Healthcare element to create in iCure Database |
| `patientId?` | `string` | Id of the patient to which the healthcare element is linked |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)\>

#### Defined in

[src/apis/HealthcareElementApi.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/HealthcareElementApi.ts#L22)

___

### createOrModifyHealthcareElements

▸ **createOrModifyHealthcareElements**(`healthcareElement`, `patientId?`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)[]\>

A Healthcare Element is a data giving some medical context to a series of measures, symptoms, ...
For example, if the data samples are symptoms representing fever, cold feel, headache, ... the associated healthcare
element could be a flue.

A healthcare Element can be linked to a patient and to a series of data samples.

This service permits you to create multiple healthcare elements for a specific patient

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `healthcareElement` | [`HealthcareElement`](../classes/HealthcareElement.md)[] |  |
| `patientId?` | `string` | Id of the patient to which the healthcare elements are linked |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)[]\>

#### Defined in

[src/apis/HealthcareElementApi.ts:36](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/HealthcareElementApi.ts#L36)

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

[src/apis/HealthcareElementApi.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/HealthcareElementApi.ts#L42)

___

### filterHealthcareElement

▸ **filterHealthcareElement**(`filter`, `nextHealthElementId?`, `limit?`): `Promise`<[`PaginatedListHealthcareElement`](../classes/PaginatedListHealthcareElement.md)\>

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
| `filter` | `Filter`<[`HealthcareElement`](../classes/HealthcareElement.md)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
| `nextHealthElementId?` | `string` | The id of the first Healthcare professional in the next page |
| `limit?` | `number` | The maximum number of healthcare elements that should contain the returned page. By default, a page contains 1000 healthcare elements |

#### Returns

`Promise`<[`PaginatedListHealthcareElement`](../classes/PaginatedListHealthcareElement.md)\>

#### Defined in

[src/apis/HealthcareElementApi.ts:58](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/HealthcareElementApi.ts#L58)

___

### getHealthcareElement

▸ **getHealthcareElement**(`id`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)\>

Retrieves the information of a specific Healthcare Element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the healthcare element to retrieve |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)\>

#### Defined in

[src/apis/HealthcareElementApi.ts:64](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/HealthcareElementApi.ts#L64)

___

### getHealthcareElementsForPatient

▸ **getHealthcareElementsForPatient**(`patient`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)[]\>

Gets all the Healthcare Elements associated to a Patient that the current dataOwner can access.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patient` | [`Patient`](../classes/Patient.md) | the Patient associated to the Healthcare Elements to get |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)[]\>

an array containing the Healthcare Elements

#### Defined in

[src/apis/HealthcareElementApi.ts:90](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/HealthcareElementApi.ts#L90)

___

### giveAccessTo

▸ **giveAccessTo**(`healthcareElement`, `delegatedTo`): `Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)\>

Service where current user gives access to the healthcare Element information to another dataOwner (HCP, patient or device).
For this, the current user data owner should be able to access the healthcare Element provided in argument in order to provide access to another data owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `healthcareElement` | [`HealthcareElement`](../classes/HealthcareElement.md) | Healthcare Element the current data owner would like to share with another data owner |
| `delegatedTo` | `string` | ID of the data owner to which current user would like to give access |

#### Returns

`Promise`<[`HealthcareElement`](../classes/HealthcareElement.md)\>

#### Defined in

[src/apis/HealthcareElementApi.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/HealthcareElementApi.ts#L82)

___

### matchHealthcareElement

▸ **matchHealthcareElement**(`filter`): `Promise`<`string`[]\>

Find which Healthcare Elements are matching a specific filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`HealthcareElement`](../classes/HealthcareElement.md)\> | Filtering conditions that the returned healthcare element ids are satisfying. |

#### Returns

`Promise`<`string`[]\>

the ids of the healthcare elements satisfying the provided filter

#### Defined in

[src/apis/HealthcareElementApi.ts:73](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/HealthcareElementApi.ts#L73)

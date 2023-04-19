[@icure/medical-device-sdk](../modules) / DataSampleApi

# SDK API: DataSampleApi

The DataSampleApi interface provides methods to manage data samples.

## Table of contents

### Methods

- [createOrModifyDataSampleFor](DataSampleApi#createormodifydatasamplefor)
- [createOrModifyDataSamplesFor](DataSampleApi#createormodifydatasamplesfor)
- [deleteAttachment](DataSampleApi#deleteattachment)
- [deleteDataSample](DataSampleApi#deletedatasample)
- [deleteDataSamples](DataSampleApi#deletedatasamples)
- [extractPatientId](DataSampleApi#extractpatientid)
- [filterDataSample](DataSampleApi#filterdatasample)
- [getDataSample](DataSampleApi#getdatasample)
- [getDataSampleAttachmentContent](DataSampleApi#getdatasampleattachmentcontent)
- [getDataSampleAttachmentDocument](DataSampleApi#getdatasampleattachmentdocument)
- [getDataSamplesForPatient](DataSampleApi#getdatasamplesforpatient)
- [giveAccessTo](DataSampleApi#giveaccessto)
- [matchDataSample](DataSampleApi#matchdatasample)
- [setDataSampleAttachment](DataSampleApi#setdatasampleattachment)
- [subscribeToDataSampleEvents](DataSampleApi#subscribetodatasampleevents)

## Methods

### createOrModifyDataSampleFor

▸ **createOrModifyDataSampleFor**(`patientId`, `dataSample`): `Promise`<[`DataSample`](../classes/DataSample)\>

When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
Create or update a [DataSample] for a patient

#### Parameters

| Name | Type |
| :------ | :------ |
| `patientId` | `string` |
| `dataSample` | [`DataSample`](../classes/DataSample) |

#### Returns

`Promise`<[`DataSample`](../classes/DataSample)\>

#### Defined in

[src/apis/DataSampleApi.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L18)

___

### createOrModifyDataSamplesFor

▸ **createOrModifyDataSamplesFor**(`patientId`, `dataSample`): `Promise`<[`DataSample`](../classes/DataSample)[]\>

All the provided data samples will be created in the same batch. If you are trying to update some data samples, then those ones need to come from the same batch.                  When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
Create or update a batch of [DataSample] for a patient

#### Parameters

| Name | Type |
| :------ | :------ |
| `patientId` | `string` |
| `dataSample` | [`DataSample`](../classes/DataSample)[] |

#### Returns

`Promise`<[`DataSample`](../classes/DataSample)[]\>

#### Defined in

[src/apis/DataSampleApi.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L26)

___

### deleteAttachment

▸ **deleteAttachment**(`dataSampleId`, `documentId`): `Promise`<`string`\>

Deletes an attachment, using its corresponding documentId
Delete an attachment of a DataSample

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSampleId` | `string` |
| `documentId` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/apis/DataSampleApi.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L34)

___

### deleteDataSample

▸ **deleteDataSample**(`dataSampleId`): `Promise`<`string`\>

Deletes the data sample identified by the provided unique [dataSampleId].
Delete a [DataSample] by its id

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSampleId` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/apis/DataSampleApi.ts:41](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L41)

___

### deleteDataSamples

▸ **deleteDataSamples**(`requestBody`): `Promise`<`string`[]\>

Deletes the batch of data samples identified by the provided [dataSampleIds]. The data samples to delete need to be part of the same batch
Delete a batch of [Data Samples]

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestBody` | `string`[] |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/apis/DataSampleApi.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L48)

___

### extractPatientId

▸ **extractPatientId**(`dataSample`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSample` | [`DataSample`](../classes/DataSample) |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[src/apis/DataSampleApi.ts:154](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L154)

___

### filterDataSample

▸ **filterDataSample**(`filter`, `nextDataSampleId?`, `limit?`): `Promise`<[`PaginatedListDataSample`](../classes/PaginatedListDataSample)\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are :
 - DataSampleByHealthcarePartyFilter;
 - DataSampleByHealthcarePartyHealthcareElementFilter;
 - DataSampleByHealthcarePartyIdentifiersFilter;
 - DataSampleByHealthcarePartyPatientFilter;
 - DataSampleByHealthcarePartyTagCodeDateFilter;
 - and DataSamplesByIdsFilter.

This method returns a paginated list of data samples (with a cursor that lets you query the following items).
Find data samples using the provided [filter].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`DataSample`](../classes/DataSample)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
| `nextDataSampleId?` | `string` | The id of the first data sample in the next page |
| `limit?` | `number` | The maximum number of data samples that should contain the returned page. By default, a page contains 1000 data samples |

#### Returns

`Promise`<[`PaginatedListDataSample`](../classes/PaginatedListDataSample)\>

#### Defined in

[src/apis/DataSampleApi.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L65)

___

### getDataSample

▸ **getDataSample**(`dataSampleId`): `Promise`<[`DataSample`](../classes/DataSample)\>

Each data sample is uniquely identified by a data sample id which is a UUID. This [dataSampleId] is the preferred method to retrieve one specific data sample.
Get a [DataSample] by its id

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSampleId` | `string` |

#### Returns

`Promise`<[`DataSample`](../classes/DataSample)\>

#### Defined in

[src/apis/DataSampleApi.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L72)

___

### getDataSampleAttachmentContent

▸ **getDataSampleAttachmentContent**(`dataSampleId`, `documentId`, `attachmentId`): `Promise`<`ArrayBuffer`\>

Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the content of an attachment
Get attachment content of a DataSample

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSampleId` | `string` |
| `documentId` | `string` |
| `attachmentId` | `string` |

#### Returns

`Promise`<`ArrayBuffer`\>

#### Defined in

[src/apis/DataSampleApi.ts:81](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L81)

___

### getDataSampleAttachmentDocument

▸ **getDataSampleAttachmentDocument**(`dataSampleId`, `documentId`): `Promise`<[`Document`](../classes/Document)\>

Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the document metadata information of an attachment
Get document metadata of a DataSample attachment

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSampleId` | `string` |
| `documentId` | `string` |

#### Returns

`Promise`<[`Document`](../classes/Document)\>

#### Defined in

[src/apis/DataSampleApi.ts:89](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L89)

___

### getDataSamplesForPatient

▸ **getDataSamplesForPatient**(`patient`): `Promise`<[`DataSample`](../classes/DataSample)[]\>

Gets all the Data Samples associated to a Patient that the current dataOwner can access.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patient` | [`Patient`](../classes/Patient) | the Patient associated to the Data Samples to get |

#### Returns

`Promise`<[`DataSample`](../classes/DataSample)[]\>

an array containing the Data Samples

#### Defined in

[src/apis/DataSampleApi.ts:134](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L134)

___

### giveAccessTo

▸ **giveAccessTo**(`dataSample`, `delegatedTo`): `Promise`<[`DataSample`](../classes/DataSample)\>

Service where current user gives access to the data sample information to another dataOwner (HCP, patient or device).
For this, the current user data owner should be able to access the data sample provided in argument in order to provide access to another data owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataSample` | [`DataSample`](../classes/DataSample) | Data Sample the current data owner would like to share with another data owner |
| `delegatedTo` | `string` | ID of the data owner to which current user would like to give access |

#### Returns

`Promise`<[`DataSample`](../classes/DataSample)\>

The dataSample with updated access rights

#### Defined in

[src/apis/DataSampleApi.ts:126](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L126)

___

### matchDataSample

▸ **matchDataSample**(`filter`): `Promise`<`string`[]\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
Find data samples ids using the provided Filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`DataSample`](../classes/DataSample)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/apis/DataSampleApi.ts:96](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L96)

___

### setDataSampleAttachment

▸ **setDataSampleAttachment**(`dataSampleId`, `body`, `documentName?`, `documentVersion?`, `documentExternalUuid?`, `documentLanguage?`): `Promise`<[`Document`](../classes/Document)\>

Link an attachment or update the attachment of a data sample
Add or update the attachment of a DataSample

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSampleId` | `string` |
| `body` | `ArrayBuffer` |
| `documentName?` | `string` |
| `documentVersion?` | `string` |
| `documentExternalUuid?` | `string` |
| `documentLanguage?` | `string` |

#### Returns

`Promise`<[`Document`](../classes/Document)\>

#### Defined in

[src/apis/DataSampleApi.ts:108](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L108)

___

### subscribeToDataSampleEvents

▸ **subscribeToDataSampleEvents**(`eventTypes`, `filter`, `eventFired`, `options?`): `Promise`<[`Connection`](Connection)\>

Opens a WebSocket Connection in order to receive all the Data Samples corresponding to specific filter criteria.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventTypes` | (``"CREATE"`` \| ``"UPDATE"`` \| ``"DELETE"``)[] | Type of event you would like to listen. It can be CREATE, UPDATE or DELETE |
| `filter` | `Filter`<[`DataSample`](../classes/DataSample)\> | Filter criteria to filter to the data samples you would like to receive |
| `eventFired` | (`dataSample`: [`DataSample`](../classes/DataSample)) => `Promise`<`void`\> | Action applied each time you receive a data sample through the WebSocket |
| `options?` | `Object` | Options to configure the WebSocket. - keepAlive : How long to keep connection alive (ms); - lifetime : How long to keep the WebSocket alive (ms); - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket; - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts) |
| `options.connectionMaxRetry?` | `number` | - |
| `options.connectionRetryIntervalMs?` | `number` | - |

#### Returns

`Promise`<[`Connection`](Connection)\>

#### Defined in

[src/apis/DataSampleApi.ts:147](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataSampleApi.ts#L147)

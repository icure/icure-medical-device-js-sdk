[@icure/medical-device-sdk](../modules) / PatientApi

# SDK API: PatientApi

The PatientApi interface provides methods to manage patients.

## Table of contents

### Methods

- [createOrModifyPatient](PatientApi#createormodifypatient)
- [deletePatient](PatientApi#deletepatient)
- [filterPatients](PatientApi#filterpatients)
- [getPatient](PatientApi#getpatient)
- [getPatientAndTryDecrypt](PatientApi#getpatientandtrydecrypt)
- [giveAccessTo](PatientApi#giveaccessto)
- [giveAccessToAllDataOf](PatientApi#giveaccesstoalldataof)
- [giveAccessToPotentiallyEncrypted](PatientApi#giveaccesstopotentiallyencrypted)
- [matchPatients](PatientApi#matchpatients)
- [modifyPotentiallyEncryptedPatient](PatientApi#modifypotentiallyencryptedpatient)
- [subscribeToPatientEvents](PatientApi#subscribetopatientevents)

## Methods

### createOrModifyPatient

▸ **createOrModifyPatient**(`patient`): `Promise`<[`Patient`](../classes/Patient)\>

When modifying a patient, you must ensure that the rev obtained when getting or creating the patient is present as the rev is used to guarantee that the patient has not been modified by a third party.
Create or update a [Patient]

#### Parameters

| Name | Type |
| :------ | :------ |
| `patient` | [`Patient`](../classes/Patient) |

#### Returns

`Promise`<[`Patient`](../classes/Patient)\>

#### Defined in

[src/apis/PatientApi.ts:16](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L16)

___

### deletePatient

▸ **deletePatient**(`patientId`): `Promise`<`string`\>

Deletes the patient identified by the provided unique [patientId].
Delete a [Patient]

#### Parameters

| Name | Type |
| :------ | :------ |
| `patientId` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/apis/PatientApi.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L22)

___

### filterPatients

▸ **filterPatients**(`filter`, `nextPatientId?`, `limit?`): `Promise`<[`PaginatedListPatient`](../classes/PaginatedListPatient)\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are :
 - PatientByHealthcarePartyDateOfBirthBetweenFilter;
 - PatientByHealthcarePartyFilter;
 - PatientByHealthcarePartyGenderEducationProfessionFilter;
 - PatientByHealthcarePartyIdentifiersFilter;
 - PatientByHealthcarePartyNameContainsFuzzyFilter;
 - PatientByHealthcarePartySsinsFilter;
 - and PatientsByIdsFilter.

This method returns a paginated list of patient (with a cursor that lets you query the following items).
Load patients from the database by filtering them using the provided [filter].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`Patient`](../classes/Patient)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
| `nextPatientId?` | `string` | The id of the first patient in the next page |
| `limit?` | `number` | The maximum number of patients that should contain the returned page. By default, a page contains 1000 patients |

#### Returns

`Promise`<[`PaginatedListPatient`](../classes/PaginatedListPatient)\>

#### Defined in

[src/apis/PatientApi.ts:39](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L39)

___

### getPatient

▸ **getPatient**(`patientId`): `Promise`<[`Patient`](../classes/Patient)\>

Each patient is uniquely identified by a patient id. The patient id is a UUID. This [patientId] is the preferred method to retrieve one specific patient.
Get a [Patient]

#### Parameters

| Name | Type |
| :------ | :------ |
| `patientId` | `string` |

#### Returns

`Promise`<[`Patient`](../classes/Patient)\>

#### Defined in

[src/apis/PatientApi.ts:45](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L45)

___

### getPatientAndTryDecrypt

▸ **getPatientAndTryDecrypt**(`patientId`): `Promise`<[`PotentiallyEncryptedPatient`](PotentiallyEncryptedPatient)\>

Gets a patient and tries to decrypt its content. If it is not possible to decrypt the content only the unencrypted
data will be available.
This method is useful to allow new patient users to access some of their own data before their doctor actually
gave them access to their own data: instead of giving an error if the data can't be decrypted (like what happens
in getPatient) you will be able to get at least partial information.

#### Parameters

| Name | Type |
| :------ | :------ |
| `patientId` | `string` |

#### Returns

`Promise`<[`PotentiallyEncryptedPatient`](PotentiallyEncryptedPatient)\>

#### Defined in

[src/apis/PatientApi.ts:105](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L105)

___

### giveAccessTo

▸ **giveAccessTo**(`patient`, `delegatedTo`): `Promise`<[`Patient`](../classes/Patient)\>

Service where current user gives access to the patient information to another dataOwner (HCP, patient or device).
For this, the current user data owner should be able to access the patient provided in argument in order to provide access to another data owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patient` | [`Patient`](../classes/Patient) | Patient the current data owner would like to share with another data owner |
| `delegatedTo` | `string` | ID of the data owner to which current user would like to give access |

#### Returns

`Promise`<[`Patient`](../classes/Patient)\>

#### Defined in

[src/apis/PatientApi.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L59)

___

### giveAccessToAllDataOf

▸ **giveAccessToAllDataOf**(`patientId`): `Promise`<`SharingResult`\>

Service that allows a Data Owner to share all the data of a Patient with the patient itself.
This means this service is sharing :
- The information of the patient;
- All the data samples linked to the patient;
- All the healthcare elements linked to the patient;

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patientId` | `string` | the id of the Patient to which we want to give access back to its own data |

#### Returns

`Promise`<`SharingResult`\>

#### Defined in

[src/apis/PatientApi.ts:78](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L78)

___

### giveAccessToPotentiallyEncrypted

▸ **giveAccessToPotentiallyEncrypted**(`patient`, `delegatedTo`): `Promise`<[`PotentiallyEncryptedPatient`](PotentiallyEncryptedPatient)\>

Same as [giveAccessTo](PatientApi#giveaccessto) but allowing also to share encrypted patients. This is useful if the delegator does
not know the encryption key of the patient but has a secret id and wants to share it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patient` | [`PotentiallyEncryptedPatient`](PotentiallyEncryptedPatient) | Patient the current data owner would like to share with another data owner |
| `delegatedTo` | `string` | ID of the data owner to which current user would like to give access |

#### Returns

`Promise`<[`PotentiallyEncryptedPatient`](PotentiallyEncryptedPatient)\>

#### Defined in

[src/apis/PatientApi.ts:67](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L67)

___

### matchPatients

▸ **matchPatients**(`filter`): `Promise`<`string`[]\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns the list of the ids of the users matching the [filter].
Load patient ids from the database by filtering them using the provided [filter].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`Patient`](../classes/Patient)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/apis/PatientApi.ts:51](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L51)

___

### modifyPotentiallyEncryptedPatient

▸ **modifyPotentiallyEncryptedPatient**(`modifiedPatient`): `Promise`<[`PotentiallyEncryptedPatient`](PotentiallyEncryptedPatient)\>

Modifies a potentially encrypted patient, ensuring that if originally the patient could not be decrypted then the
modified patient does not change to data which should be encrypted according to the current api configuration.
Similarly to getPatientAndTryDecrypt this method is useful when a patient needs to update his own data before
an hcp gave him access to his own encrypted data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `modifiedPatient` | [`PotentiallyEncryptedPatient`](PotentiallyEncryptedPatient) |

#### Returns

`Promise`<[`PotentiallyEncryptedPatient`](PotentiallyEncryptedPatient)\>

#### Defined in

[src/apis/PatientApi.ts:113](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L113)

___

### subscribeToPatientEvents

▸ **subscribeToPatientEvents**(`eventTypes`, `filter`, `eventFired`, `options?`): `Promise`<[`Connection`](Connection)\>

Opens a WebSocket Connection in order to receive all the Patients corresponding to specific filter criteria.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventTypes` | (``"CREATE"`` \| ``"UPDATE"`` \| ``"DELETE"``)[] | Type of event you would like to listen. It can be CREATE, UPDATE or DELETE |
| `filter` | `Filter`<[`Patient`](../classes/Patient)\> | Filter criteria to filter to the Patients you would like to receive |
| `eventFired` | (`patient`: [`Patient`](../classes/Patient)) => `Promise`<`void`\> | Action applied each time you receive a Patient through the WebSocket |
| `options?` | `Object` | Options to configure the WebSocket. - keepAlive : How long to keep connection alive (ms); - lifetime : How long to keep the WebSocket alive (ms); - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket; - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts) |
| `options.connectionMaxRetry?` | `number` | - |
| `options.connectionRetryIntervalMs?` | `number` | - |

#### Returns

`Promise`<[`Connection`](Connection)\>

#### Defined in

[src/apis/PatientApi.ts:91](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/PatientApi.ts#L91)

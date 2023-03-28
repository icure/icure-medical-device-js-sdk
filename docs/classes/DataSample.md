[@icure/medical-device-sdk](../modules) / DataSample

# Class: DataSample

A Data Sample represents a medical information, provided by a Data Owner concerning one specific [Patient], for a T moment.       Provided by a Data Owner means that the data sample may have been either provided by a [HealthcareProfessional] or a [Patient], either collected by a [MedicalDevice].         Data Samples provided by the patient include subjective information, such as complaints, reason for visit, feelings, etc. or objective information       like bio-metric measures (blood pressure, temperature, heart beat, etc.), or physical exam description, diagnosis, prescription, integration of lab reports from another [HealthcareProfessional], action plan, etc.      Any action performed by the [HealthcareProfessional] (which is relevant for a [HealthcareElement] of a [Patient]) is considered as a [DataSample].       The data samples can be linked to healthcare elements or other structuring elements of the medical record

## Table of contents

### Constructors

- [constructor](DataSample#constructor)

### Properties

- [author](DataSample#author)
- [batchId](DataSample#batchid)
- [canvasesIds](DataSample#canvasesids)
- [closingDate](DataSample#closingdate)
- [codes](DataSample#codes)
- [comment](DataSample#comment)
- [content](DataSample#content)
- [created](DataSample#created)
- [endOfLife](DataSample#endoflife)
- [healthcareElementIds](DataSample#healthcareelementids)
- [id](DataSample#id)
- [identifiers](DataSample#identifiers)
- [index](DataSample#index)
- [labels](DataSample#labels)
- [modified](DataSample#modified)
- [openingDate](DataSample#openingdate)
- [qualifiedLinks](DataSample#qualifiedlinks)
- [responsible](DataSample#responsible)
- [systemMetaData](DataSample#systemmetadata)
- [transactionId](DataSample#transactionid)
- [valueDate](DataSample#valuedate)

### Methods

- [marshal](DataSample#marshal)

## Constructors

### constructor

• **new DataSample**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IDataSample` |

#### Defined in

[src/models/DataSample.ts:23](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L23)

## Properties

### author

• `Optional` **author**: `string`

The id of the [User] that created this data sample. When creating the data sample, will be filled automatically by the current user id if not provided.

#### Defined in

[src/models/DataSample.ts:96](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L96)

___

### batchId

• `Optional` **batchId**: `string`

Id of the batch that embeds this data sample

#### Defined in

[src/models/DataSample.ts:52](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L52)

___

### canvasesIds

• `Optional` **canvasesIds**: `Set`<`string`\>

List of Ids of all canvases linked to the Data sample. Only used when the Data sample is emitted outside of its batch.

#### Defined in

[src/models/DataSample.ts:60](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L60)

___

### closingDate

• `Optional` **closingDate**: `number`

The date (YYYYMMDDhhmmss) marking the end of the Data sample

#### Defined in

[src/models/DataSample.ts:80](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L80)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference)\>

A code is an item from a codification system that qualifies the content of this data sample. SNOMED-CT, ICPC-2 or ICD-10 codifications systems can be used for codes

#### Defined in

[src/models/DataSample.ts:112](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L112)

___

### comment

• `Optional` **comment**: `string`

Text, comments on the Data sample provided

#### Defined in

[src/models/DataSample.ts:104](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L104)

___

### content

• **content**: `Object`

Information contained in the data sample (Measure, number, ...). Content is localized, using ISO language code as key

#### Index signature

▪ [key: `string`]: [`Content`](Content)

#### Defined in

[src/models/DataSample.ts:68](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L68)

___

### created

• `Optional` **created**: `number`

The timestamp (unix epoch in ms) of creation of this data sample in iCure system. Will be filled automatically if not provided.

#### Defined in

[src/models/DataSample.ts:84](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L84)

___

### endOfLife

• `Optional` **endOfLife**: `number`

Soft delete (unix epoch in ms) timestamp of the data sample

#### Defined in

[src/models/DataSample.ts:92](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L92)

___

### healthcareElementIds

• `Optional` **healthcareElementIds**: `Set`<`string`\>

List of IDs of all healthcare elements for which the data sample is provided. Only used when the Data sample is emitted outside of its batch

#### Defined in

[src/models/DataSample.ts:56](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L56)

___

### id

• `Optional` **id**: `string`

The Id of the Data sample. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/DataSample.ts:40](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L40)

___

### identifiers

• **identifiers**: [`Identifier`](Identifier)[]

Typically used for business / client identifiers. An identifier should identify a data sample uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.

#### Defined in

[src/models/DataSample.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L48)

___

### index

• `Optional` **index**: `number`

Used for sorting data samples inside an upper object (A batch, a transaction, a FHIR bundle, ...)

#### Defined in

[src/models/DataSample.ts:64](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L64)

___

### labels

• **labels**: `Set`<[`CodingReference`](CodingReference)\>

A label is an item from a codification system that qualifies a data sample as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.

#### Defined in

[src/models/DataSample.ts:116](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L116)

___

### modified

• `Optional` **modified**: `number`

The timestamp (unix epoch in ms) of the latest modification of this data sample in iCure system. Will be filled automatically if not provided.

#### Defined in

[src/models/DataSample.ts:88](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L88)

___

### openingDate

• `Optional` **openingDate**: `number`

The date (YYYYMMDDhhmmss) of the start of the Data sample

#### Defined in

[src/models/DataSample.ts:76](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L76)

___

### qualifiedLinks

• **qualifiedLinks**: `Object`

Links towards related data samples (possibly in other batches)

#### Index signature

▪ [key: `string`]: { `[key: string]`: `string`;  }

#### Defined in

[src/models/DataSample.ts:108](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L108)

___

### responsible

• `Optional` **responsible**: `string`

The id of the data owner that is responsible of this data sample. When creating the data sample, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing

#### Defined in

[src/models/DataSample.ts:100](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L100)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataEncrypted`](SystemMetaDataEncrypted)

#### Defined in

[src/models/DataSample.ts:117](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L117)

___

### transactionId

• `Optional` **transactionId**: `string`

The transactionId is used when a single data sample had to be split into parts for technical reasons. Several data samples with the same non null transaction id form one single data sample

#### Defined in

[src/models/DataSample.ts:44](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L44)

___

### valueDate

• `Optional` **valueDate**: `number`

The date (YYYYMMDDhhmmss) when the Data sample is noted to have started and also closes on the same date

#### Defined in

[src/models/DataSample.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L72)

## Methods

### marshal

▸ **marshal**(): `IDataSample`

#### Returns

`IDataSample`

#### Defined in

[src/models/DataSample.ts:119](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/DataSample.ts#L119)

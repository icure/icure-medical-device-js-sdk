[@icure/medical-device-sdk](../modules.md) / DataSample

# Class: DataSample

A Data Sample represents a medical information, provided by a Data Owner concerning one specific [Patient], for a T moment.       Provided by a Data Owner means that the data sample may have been either provided by a [HealthcareProfessional] or a [Patient], either collected by a [MedicalDevice].         Data Samples provided by the patient include subjective information, such as complaints, reason for visit, feelings, etc. or objective information       like bio-metric measures (blood pressure, temperature, heart beat, etc.), or physical exam description, diagnosis, prescription, integration of lab reports from another [HealthcareProfessional], action plan, etc.      Any action performed by the [HealthcareProfessional] (which is relevant for a [HealthcareElement] of a [Patient]) is considered as a [DataSample].       The data samples can be linked to healthcare elements or other structuring elements of the medical record

## Table of contents

### Constructors

- [constructor](DataSample.md#constructor)

### Properties

- [author](DataSample.md#author)
- [batchId](DataSample.md#batchid)
- [canvasesIds](DataSample.md#canvasesids)
- [closingDate](DataSample.md#closingdate)
- [codes](DataSample.md#codes)
- [comment](DataSample.md#comment)
- [content](DataSample.md#content)
- [created](DataSample.md#created)
- [endOfLife](DataSample.md#endoflife)
- [healthcareElementIds](DataSample.md#healthcareelementids)
- [id](DataSample.md#id)
- [identifier](DataSample.md#identifier)
- [index](DataSample.md#index)
- [labels](DataSample.md#labels)
- [modified](DataSample.md#modified)
- [openingDate](DataSample.md#openingdate)
- [qualifiedLinks](DataSample.md#qualifiedlinks)
- [responsible](DataSample.md#responsible)
- [systemMetaData](DataSample.md#systemmetadata)
- [transactionId](DataSample.md#transactionid)
- [valueDate](DataSample.md#valuedate)

## Constructors

### constructor

• **new DataSample**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IDataSample` |

#### Defined in

[src/models/DataSample.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L22)

## Properties

### author

• `Optional` **author**: `string`

The id of the [User] that created this data sample. When creating the data sample, will be filled automatically by the current user id if not provided.

#### Defined in

[src/models/DataSample.ts:85](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L85)

___

### batchId

• `Optional` **batchId**: `string`

Id of the batch that embeds this data sample

#### Defined in

[src/models/DataSample.ts:41](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L41)

___

### canvasesIds

• `Optional` **canvasesIds**: `Set`<`string`\>

List of Ids of all canvases linked to the Data sample. Only used when the Data sample is emitted outside of its batch.

#### Defined in

[src/models/DataSample.ts:49](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L49)

___

### closingDate

• `Optional` **closingDate**: `number`

The date (YYYYMMDDhhmmss) marking the end of the Data sample

#### Defined in

[src/models/DataSample.ts:69](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L69)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference.md)\>

A code is an item from a codification system that qualifies the content of this data sample. SNOMED-CT, ICPC-2 or ICD-10 codifications systems can be used for codes

#### Defined in

[src/models/DataSample.ts:101](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L101)

___

### comment

• `Optional` **comment**: `string`

Text, comments on the Data sample provided

#### Defined in

[src/models/DataSample.ts:93](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L93)

___

### content

• **content**: `Object`

Information contained in the data sample (Measure, number, ...). Content is localized, using ISO language code as key

#### Index signature

▪ [key: `string`]: [`Content`](Content.md)

#### Defined in

[src/models/DataSample.ts:57](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L57)

___

### created

• `Optional` **created**: `number`

The timestamp (unix epoch in ms) of creation of this data sample in iCure system. Will be filled automatically if not provided.

#### Defined in

[src/models/DataSample.ts:73](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L73)

___

### endOfLife

• `Optional` **endOfLife**: `number`

Soft delete (unix epoch in ms) timestamp of the data sample

#### Defined in

[src/models/DataSample.ts:81](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L81)

___

### healthcareElementIds

• `Optional` **healthcareElementIds**: `Set`<`string`\>

List of IDs of all healthcare elements for which the data sample is provided. Only used when the Data sample is emitted outside of its batch

#### Defined in

[src/models/DataSample.ts:45](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L45)

___

### id

• `Optional` **id**: `string`

The Id of the Data sample. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/DataSample.ts:29](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L29)

___

### identifier

• **identifier**: [`Identifier`](Identifier.md)[]

Typically used for business / client identifiers. An identifier should identify a data sample uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.

#### Defined in

[src/models/DataSample.ts:37](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L37)

___

### index

• `Optional` **index**: `number`

Used for sorting data samples inside an upper object (A batch, a transaction, a FHIR bundle, ...)

#### Defined in

[src/models/DataSample.ts:53](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L53)

___

### labels

• **labels**: `Set`<[`CodingReference`](CodingReference.md)\>

A label is an item from a codification system that qualifies a data sample as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.

#### Defined in

[src/models/DataSample.ts:105](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L105)

___

### modified

• `Optional` **modified**: `number`

The timestamp (unix epoch in ms) of the latest modification of this data sample in iCure system. Will be filled automatically if not provided.

#### Defined in

[src/models/DataSample.ts:77](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L77)

___

### openingDate

• `Optional` **openingDate**: `number`

The date (YYYYMMDDhhmmss) of the start of the Data sample

#### Defined in

[src/models/DataSample.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L65)

___

### qualifiedLinks

• **qualifiedLinks**: `Object`

Links towards related data samples (possibly in other batches)

#### Index signature

▪ [key: `string`]: { `[key: string]`: `string`;  }

#### Defined in

[src/models/DataSample.ts:97](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L97)

___

### responsible

• `Optional` **responsible**: `string`

The id of the data owner that is responsible of this data sample. When creating the data sample, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing

#### Defined in

[src/models/DataSample.ts:89](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L89)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataEncrypted`](SystemMetaDataEncrypted.md)

#### Defined in

[src/models/DataSample.ts:106](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L106)

___

### transactionId

• `Optional` **transactionId**: `string`

The transactionId is used when a single data sample had to be split into parts for technical reasons. Several data samples with the same non null transaction id form one single data sample

#### Defined in

[src/models/DataSample.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L33)

___

### valueDate

• `Optional` **valueDate**: `number`

The date (YYYYMMDDhhmmss) when the Data sample is noted to have started and also closes on the same date

#### Defined in

[src/models/DataSample.ts:61](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/DataSample.ts#L61)

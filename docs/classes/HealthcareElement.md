[@icure/medical-device-sdk](../modules) / HealthcareElement

# Class: HealthcareElement

## Table of contents

### Constructors

- [constructor](HealthcareElement#constructor)

### Properties

- [author](HealthcareElement#author)
- [closingDate](HealthcareElement#closingdate)
- [codes](HealthcareElement#codes)
- [created](HealthcareElement#created)
- [deletionDate](HealthcareElement#deletiondate)
- [description](HealthcareElement#description)
- [endOfLife](HealthcareElement#endoflife)
- [healthcareElementId](HealthcareElement#healthcareelementid)
- [id](HealthcareElement#id)
- [identifiers](HealthcareElement#identifiers)
- [labels](HealthcareElement#labels)
- [medicalLocationId](HealthcareElement#medicallocationid)
- [modified](HealthcareElement#modified)
- [note](HealthcareElement#note)
- [openingDate](HealthcareElement#openingdate)
- [responsible](HealthcareElement#responsible)
- [rev](HealthcareElement#rev)
- [systemMetaData](HealthcareElement#systemmetadata)
- [valueDate](HealthcareElement#valuedate)

### Methods

- [marshal](HealthcareElement#marshal)

## Constructors

### constructor

• **new HealthcareElement**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IHealthcareElement` |

#### Defined in

[src/models/HealthcareElement.ts:19](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L19)

## Properties

### author

• `Optional` **author**: `string`

#### Defined in

[src/models/HealthcareElement.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L42)

___

### closingDate

• `Optional` **closingDate**: `number`

The date (unix epoch in ms) marking the end of the healthcare element.

#### Defined in

[src/models/HealthcareElement.ts:64](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L64)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference)\>

#### Defined in

[src/models/HealthcareElement.ts:46](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L46)

___

### created

• `Optional` **created**: `number`

#### Defined in

[src/models/HealthcareElement.ts:40](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L40)

___

### deletionDate

• `Optional` **deletionDate**: `number`

#### Defined in

[src/models/HealthcareElement.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L48)

___

### description

• `Optional` **description**: `string`

Description of the healthcare element.

#### Defined in

[src/models/HealthcareElement.ts:68](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L68)

___

### endOfLife

• `Optional` **endOfLife**: `number`

#### Defined in

[src/models/HealthcareElement.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L47)

___

### healthcareElementId

• `Optional` **healthcareElementId**: `string`

The logical id of the healthcare element, used to link together different versions of the same healthcare element. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/HealthcareElement.ts:52](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L52)

___

### id

• `Optional` **id**: `string`

The Id of the healthcare element. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/HealthcareElement.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L34)

___

### identifiers

• **identifiers**: [`Identifier`](Identifier)[]

#### Defined in

[src/models/HealthcareElement.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L35)

___

### labels

• **labels**: `Set`<[`CodingReference`](CodingReference)\>

#### Defined in

[src/models/HealthcareElement.ts:45](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L45)

___

### medicalLocationId

• `Optional` **medicalLocationId**: `string`

#### Defined in

[src/models/HealthcareElement.ts:44](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L44)

___

### modified

• `Optional` **modified**: `number`

#### Defined in

[src/models/HealthcareElement.ts:41](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L41)

___

### note

• `Optional` **note**: `string`

A text note (can be confidential, encrypted by default).

#### Defined in

[src/models/HealthcareElement.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L72)

___

### openingDate

• `Optional` **openingDate**: `number`

The date (unix epoch in ms) of the start of the healthcare element.

#### Defined in

[src/models/HealthcareElement.ts:60](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L60)

___

### responsible

• `Optional` **responsible**: `string`

#### Defined in

[src/models/HealthcareElement.ts:43](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L43)

___

### rev

• `Optional` **rev**: `string`

The revision of the healthcare element in the database, used for conflict management / optimistic locking.

#### Defined in

[src/models/HealthcareElement.ts:39](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L39)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataEncrypted`](SystemMetaDataEncrypted)

#### Defined in

[src/models/HealthcareElement.ts:73](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L73)

___

### valueDate

• `Optional` **valueDate**: `number`

The date (unix epoch in ms) when the healthcare element is noted to have started and also closes on the same date

#### Defined in

[src/models/HealthcareElement.ts:56](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L56)

## Methods

### marshal

▸ **marshal**(): `IHealthcareElement`

#### Returns

`IHealthcareElement`

#### Defined in

[src/models/HealthcareElement.ts:75](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareElement.ts#L75)

[@icure/medical-device-sdk](../modules.md) / HealthcareElement

# Class: HealthcareElement

## Table of contents

### Constructors

- [constructor](HealthcareElement.md#constructor)

### Properties

- [author](HealthcareElement.md#author)
- [closingDate](HealthcareElement.md#closingdate)
- [codes](HealthcareElement.md#codes)
- [created](HealthcareElement.md#created)
- [deletionDate](HealthcareElement.md#deletiondate)
- [description](HealthcareElement.md#description)
- [endOfLife](HealthcareElement.md#endoflife)
- [healthElementId](HealthcareElement.md#healthelementid)
- [id](HealthcareElement.md#id)
- [identifiers](HealthcareElement.md#identifiers)
- [medicalLocationId](HealthcareElement.md#medicallocationid)
- [modified](HealthcareElement.md#modified)
- [note](HealthcareElement.md#note)
- [openingDate](HealthcareElement.md#openingdate)
- [responsible](HealthcareElement.md#responsible)
- [rev](HealthcareElement.md#rev)
- [systemMetaData](HealthcareElement.md#systemmetadata)
- [tags](HealthcareElement.md#tags)
- [valueDate](HealthcareElement.md#valuedate)

## Constructors

### constructor

• **new HealthcareElement**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IHealthcareElement` |

#### Defined in

[src/models/HealthcareElement.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L18)

## Properties

### author

• `Optional` **author**: `string`

#### Defined in

[src/models/HealthcareElement.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L33)

___

### closingDate

• `Optional` **closingDate**: `number`

The date (unix epoch in ms) marking the end of the healthcare element.

#### Defined in

[src/models/HealthcareElement.ts:55](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L55)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference.md)\>

#### Defined in

[src/models/HealthcareElement.ts:37](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L37)

___

### created

• `Optional` **created**: `number`

#### Defined in

[src/models/HealthcareElement.ts:31](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L31)

___

### deletionDate

• `Optional` **deletionDate**: `number`

#### Defined in

[src/models/HealthcareElement.ts:39](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L39)

___

### description

• `Optional` **description**: `string`

Description of the healthcare element.

#### Defined in

[src/models/HealthcareElement.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L59)

___

### endOfLife

• `Optional` **endOfLife**: `number`

#### Defined in

[src/models/HealthcareElement.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L38)

___

### healthElementId

• `Optional` **healthElementId**: `string`

The logical id of the healthcare element, used to link together different versions of the same healthcare element. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/HealthcareElement.ts:43](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L43)

___

### id

• `Optional` **id**: `string`

The Id of the healthcare element. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/HealthcareElement.ts:25](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L25)

___

### identifiers

• **identifiers**: [`Identifier`](Identifier.md)[]

#### Defined in

[src/models/HealthcareElement.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L26)

___

### medicalLocationId

• `Optional` **medicalLocationId**: `string`

#### Defined in

[src/models/HealthcareElement.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L35)

___

### modified

• `Optional` **modified**: `number`

#### Defined in

[src/models/HealthcareElement.ts:32](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L32)

___

### note

• `Optional` **note**: `string`

A text note (can be confidential, encrypted by default).

#### Defined in

[src/models/HealthcareElement.ts:63](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L63)

___

### openingDate

• `Optional` **openingDate**: `number`

The date (unix epoch in ms) of the start of the healthcare element.

#### Defined in

[src/models/HealthcareElement.ts:51](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L51)

___

### responsible

• `Optional` **responsible**: `string`

#### Defined in

[src/models/HealthcareElement.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L34)

___

### rev

• `Optional` **rev**: `string`

The revision of the healthcare element in the database, used for conflict management / optimistic locking.

#### Defined in

[src/models/HealthcareElement.ts:30](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L30)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataEncrypted`](SystemMetaDataEncrypted.md)

#### Defined in

[src/models/HealthcareElement.ts:64](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L64)

___

### tags

• **tags**: `Set`<[`CodingReference`](CodingReference.md)\>

#### Defined in

[src/models/HealthcareElement.ts:36](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L36)

___

### valueDate

• `Optional` **valueDate**: `number`

The date (unix epoch in ms) when the healthcare element is noted to have started and also closes on the same date

#### Defined in

[src/models/HealthcareElement.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareElement.ts#L47)

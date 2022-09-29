[@icure/medical-device-sdk](../modules.md) / HealthcareProfessional

# Class: HealthcareProfessional

## Table of contents

### Constructors

- [constructor](HealthcareProfessional.md#constructor)

### Properties

- [addresses](HealthcareProfessional.md#addresses)
- [civility](HealthcareProfessional.md#civility)
- [created](HealthcareProfessional.md#created)
- [deletionDate](HealthcareProfessional.md#deletiondate)
- [firstName](HealthcareProfessional.md#firstname)
- [gender](HealthcareProfessional.md#gender)
- [id](HealthcareProfessional.md#id)
- [languages](HealthcareProfessional.md#languages)
- [lastName](HealthcareProfessional.md#lastname)
- [modified](HealthcareProfessional.md#modified)
- [name](HealthcareProfessional.md#name)
- [names](HealthcareProfessional.md#names)
- [notes](HealthcareProfessional.md#notes)
- [parentId](HealthcareProfessional.md#parentid)
- [picture](HealthcareProfessional.md#picture)
- [properties](HealthcareProfessional.md#properties)
- [rev](HealthcareProfessional.md#rev)
- [speciality](HealthcareProfessional.md#speciality)
- [specialityCodes](HealthcareProfessional.md#specialitycodes)
- [systemMetaData](HealthcareProfessional.md#systemmetadata)

## Constructors

### constructor

• **new HealthcareProfessional**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IHealthcareProfessional` |

#### Defined in

[src/models/HealthcareProfessional.ts:20](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L20)

## Properties

### addresses

• **addresses**: [`Address`](Address.md)[]

The list of addresses (with address type).

#### Defined in

[src/models/HealthcareProfessional.ts:79](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L79)

___

### civility

• `Optional` **civility**: `string`

Mr., Ms., Pr., Dr. ...

#### Defined in

[src/models/HealthcareProfessional.ts:67](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L67)

___

### created

• `Optional` **created**: `number`

creation timestamp of the object.

#### Defined in

[src/models/HealthcareProfessional.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L35)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a user is ”deleted“, this is set to a non null value: the moment of the deletion

#### Defined in

[src/models/HealthcareProfessional.ts:43](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L43)

___

### firstName

• `Optional` **firstName**: `string`

the firstname (name) of the healthcare party.

#### Defined in

[src/models/HealthcareProfessional.ts:55](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L55)

___

### gender

• `Optional` **gender**: [`HealthcareProfessionalGenderEnum`](../modules.md#healthcareprofessionalgenderenum)

the gender of the healthcare party: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown

#### Defined in

[src/models/HealthcareProfessional.ts:63](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L63)

___

### id

• `Optional` **id**: `string`

the Id of the healthcare party. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/HealthcareProfessional.ts:27](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L27)

___

### languages

• **languages**: `string`[]

The list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).

#### Defined in

[src/models/HealthcareProfessional.ts:83](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L83)

___

### lastName

• `Optional` **lastName**: `string`

the lastname (surname) of the healthcare party. This is the official lastname that should be used for official administrative purposes.

#### Defined in

[src/models/HealthcareProfessional.ts:51](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L51)

___

### modified

• `Optional` **modified**: `number`

last modification timestamp of the object.

#### Defined in

[src/models/HealthcareProfessional.ts:39](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L39)

___

### name

• `Optional` **name**: `string`

The full name of the healthcare party, used mainly when the healthcare party is an organization

#### Defined in

[src/models/HealthcareProfessional.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L47)

___

### names

• **names**: [`PersonName`](PersonName.md)[]

the list of all names of the healthcare party, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the healthcare party in the application

#### Defined in

[src/models/HealthcareProfessional.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L59)

___

### notes

• `Optional` **notes**: `string`

Text notes.

#### Defined in

[src/models/HealthcareProfessional.ts:95](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L95)

___

### parentId

• `Optional` **parentId**: `string`

Id of parent of the user representing the healthcare party.

#### Defined in

[src/models/HealthcareProfessional.ts:75](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L75)

___

### picture

• `Optional` **picture**: `ArrayBuffer`

A picture usually saved in JPEG format.

#### Defined in

[src/models/HealthcareProfessional.ts:87](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L87)

___

### properties

• **properties**: `Set`<[`Property`](Property.md)\>

#### Defined in

[src/models/HealthcareProfessional.ts:96](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L96)

___

### rev

• `Optional` **rev**: `string`

the revision of the healthcare party in the database, used for conflict management / optimistic locking.

#### Defined in

[src/models/HealthcareProfessional.ts:31](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L31)

___

### speciality

• `Optional` **speciality**: `string`

Medical specialty of the healthcare party

#### Defined in

[src/models/HealthcareProfessional.ts:71](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L71)

___

### specialityCodes

• **specialityCodes**: `Set`<[`CodingReference`](CodingReference.md)\>

Medical specialty of the healthcare party codified using FHIR or Kmehr codificaiton scheme

#### Defined in

[src/models/HealthcareProfessional.ts:91](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L91)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataOwner`](SystemMetaDataOwner.md)

#### Defined in

[src/models/HealthcareProfessional.ts:97](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/HealthcareProfessional.ts#L97)

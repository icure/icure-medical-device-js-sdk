[@icure/medical-device-sdk](../modules) / HealthcareProfessional

# Class: HealthcareProfessional

## Table of contents

### Constructors

- [constructor](HealthcareProfessional#constructor)

### Properties

- [addresses](HealthcareProfessional#addresses)
- [civility](HealthcareProfessional#civility)
- [codes](HealthcareProfessional#codes)
- [created](HealthcareProfessional#created)
- [deletionDate](HealthcareProfessional#deletiondate)
- [firstName](HealthcareProfessional#firstname)
- [gender](HealthcareProfessional#gender)
- [id](HealthcareProfessional#id)
- [labels](HealthcareProfessional#labels)
- [languages](HealthcareProfessional#languages)
- [lastName](HealthcareProfessional#lastname)
- [modified](HealthcareProfessional#modified)
- [name](HealthcareProfessional#name)
- [names](HealthcareProfessional#names)
- [notes](HealthcareProfessional#notes)
- [parentId](HealthcareProfessional#parentid)
- [picture](HealthcareProfessional#picture)
- [properties](HealthcareProfessional#properties)
- [rev](HealthcareProfessional#rev)
- [speciality](HealthcareProfessional#speciality)
- [specialityCodes](HealthcareProfessional#specialitycodes)
- [systemMetaData](HealthcareProfessional#systemmetadata)

### Methods

- [marshal](HealthcareProfessional#marshal)

## Constructors

### constructor

• **new HealthcareProfessional**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IHealthcareProfessional` |

#### Defined in

[src/models/HealthcareProfessional.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L22)

## Properties

### addresses

• **addresses**: [`Address`](Address)[]

The list of addresses (with address type).

#### Defined in

[src/models/HealthcareProfessional.ts:106](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L106)

___

### civility

• `Optional` **civility**: `string`

Mr., Ms., Pr., Dr. ...

#### Defined in

[src/models/HealthcareProfessional.ts:94](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L94)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference)\>

A code is an item from a codification system that qualifies the content of this doctor.
Example: doctor's specialty

#### Defined in

[src/models/HealthcareProfessional.ts:66](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L66)

___

### created

• `Optional` **created**: `number`

creation timestamp of the object.

#### Defined in

[src/models/HealthcareProfessional.ts:52](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L52)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a user is ”deleted“, this is set to a non null value: the moment of the deletion

#### Defined in

[src/models/HealthcareProfessional.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L70)

___

### firstName

• `Optional` **firstName**: `string`

the firstname (name) of the healthcare party.

#### Defined in

[src/models/HealthcareProfessional.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L82)

___

### gender

• `Optional` **gender**: [`HealthcareProfessionalGenderEnum`](../modules#healthcareprofessionalgenderenum)

the gender of the healthcare party: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown

#### Defined in

[src/models/HealthcareProfessional.ts:90](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L90)

___

### id

• `Optional` **id**: `string`

the Id of the healthcare party. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/HealthcareProfessional.ts:44](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L44)

___

### labels

• **labels**: `Set`<[`CodingReference`](CodingReference)\>

A label is an item from a codification system that qualifies a doctor as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.
Example: HealthcareProfessional is an organisation

#### Defined in

[src/models/HealthcareProfessional.ts:61](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L61)

___

### languages

• **languages**: `string`[]

The list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).

#### Defined in

[src/models/HealthcareProfessional.ts:110](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L110)

___

### lastName

• `Optional` **lastName**: `string`

the lastname (surname) of the healthcare party. This is the official lastname that should be used for official administrative purposes.

#### Defined in

[src/models/HealthcareProfessional.ts:78](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L78)

___

### modified

• `Optional` **modified**: `number`

last modification timestamp of the object.

#### Defined in

[src/models/HealthcareProfessional.ts:56](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L56)

___

### name

• `Optional` **name**: `string`

The full name of the healthcare party, used mainly when the healthcare party is an organization

#### Defined in

[src/models/HealthcareProfessional.ts:74](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L74)

___

### names

• **names**: [`PersonName`](PersonName)[]

the list of all names of the healthcare party, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the healthcare party in the application

#### Defined in

[src/models/HealthcareProfessional.ts:86](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L86)

___

### notes

• `Optional` **notes**: `string`

Text notes.

#### Defined in

[src/models/HealthcareProfessional.ts:122](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L122)

___

### parentId

• `Optional` **parentId**: `string`

Id of parent of the user representing the healthcare party.

#### Defined in

[src/models/HealthcareProfessional.ts:102](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L102)

___

### picture

• `Optional` **picture**: `ArrayBuffer`

A picture usually saved in JPEG format.

#### Defined in

[src/models/HealthcareProfessional.ts:114](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L114)

___

### properties

• **properties**: `Set`<[`Property`](Property)\>

#### Defined in

[src/models/HealthcareProfessional.ts:123](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L123)

___

### rev

• `Optional` **rev**: `string`

the revision of the healthcare party in the database, used for conflict management / optimistic locking.

#### Defined in

[src/models/HealthcareProfessional.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L48)

___

### speciality

• `Optional` **speciality**: `string`

Medical specialty of the healthcare party

#### Defined in

[src/models/HealthcareProfessional.ts:98](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L98)

___

### specialityCodes

• `Optional` **specialityCodes**: `Set`<[`CodingReference`](CodingReference)\>

Medical specialty of the healthcare party codified using FHIR or Kmehr codificaiton scheme

#### Defined in

[src/models/HealthcareProfessional.ts:118](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L118)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataOwner`](SystemMetaDataOwner)

#### Defined in

[src/models/HealthcareProfessional.ts:124](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L124)

## Methods

### marshal

▸ **marshal**(): `IHealthcareProfessional`

#### Returns

`IHealthcareProfessional`

#### Defined in

[src/models/HealthcareProfessional.ts:126](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/HealthcareProfessional.ts#L126)

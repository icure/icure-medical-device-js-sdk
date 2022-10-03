[@icure/medical-device-sdk](../modules.md) / MedicalDevice

# Class: MedicalDevice

## Table of contents

### Constructors

- [constructor](MedicalDevice.md#constructor)

### Properties

- [author](MedicalDevice.md#author)
- [brand](MedicalDevice.md#brand)
- [codes](MedicalDevice.md#codes)
- [created](MedicalDevice.md#created)
- [deletionDate](MedicalDevice.md#deletiondate)
- [endOfLife](MedicalDevice.md#endoflife)
- [externalId](MedicalDevice.md#externalid)
- [id](MedicalDevice.md#id)
- [identifiers](MedicalDevice.md#identifiers)
- [labels](MedicalDevice.md#labels)
- [model](MedicalDevice.md#model)
- [modified](MedicalDevice.md#modified)
- [name](MedicalDevice.md#name)
- [parentId](MedicalDevice.md#parentid)
- [picture](MedicalDevice.md#picture)
- [properties](MedicalDevice.md#properties)
- [responsible](MedicalDevice.md#responsible)
- [rev](MedicalDevice.md#rev)
- [serialNumber](MedicalDevice.md#serialnumber)
- [systemMetaData](MedicalDevice.md#systemmetadata)
- [type](MedicalDevice.md#type)

## Constructors

### constructor

• **new MedicalDevice**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IMedicalDevice` |

#### Defined in

[src/models/MedicalDevice.ts:19](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L19)

## Properties

### author

• `Optional` **author**: `string`

The id of the [User] that created this medical device. When creating the device, this field will be filled automatically by the current user id if not provided.

#### Defined in

[src/models/MedicalDevice.ts:50](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L50)

___

### brand

• `Optional` **brand**: `string`

Brand of the device recording the data

#### Defined in

[src/models/MedicalDevice.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L82)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference.md)\>

A code is an item from a codification system that qualifies the content of this medical device. SNOMED-CT, ICPC-2 or ICD-10 codifications systems can be used for codes

#### Defined in

[src/models/MedicalDevice.ts:62](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L62)

___

### created

• `Optional` **created**: `number`

the creation date of the medical device (encoded as epoch).

#### Defined in

[src/models/MedicalDevice.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L42)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a medical device is ”deleted“, this is set to a non null value: the moment of the deletion

#### Defined in

[src/models/MedicalDevice.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L34)

___

### endOfLife

• `Optional` **endOfLife**: `number`

Soft delete (unix epoch in ms) timestamp of the medical device

#### Defined in

[src/models/MedicalDevice.ts:66](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L66)

___

### externalId

• `Optional` **externalId**: `string`

An external (from another source) id with no guarantee or requirement for unicity.

#### Defined in

[src/models/MedicalDevice.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L70)

___

### id

• `Optional` **id**: `string`

The Id of the MedicalDevice. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/MedicalDevice.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L26)

___

### identifiers

• **identifiers**: [`Identifier`](Identifier.md)[]

Typically used for business / client identifiers. An identifier should identify a device uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.

#### Defined in

[src/models/MedicalDevice.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L38)

___

### labels

• **labels**: `Set`<[`CodingReference`](CodingReference.md)\>

A label is an item from a codification system that qualifies a medical device as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.

#### Defined in

[src/models/MedicalDevice.ts:58](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L58)

___

### model

• `Optional` **model**: `string`

Model of the device recording the data

#### Defined in

[src/models/MedicalDevice.ts:86](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L86)

___

### modified

• `Optional` **modified**: `number`

the last modification date of the medical device (encoded as epoch).

#### Defined in

[src/models/MedicalDevice.ts:46](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L46)

___

### name

• `Optional` **name**: `string`

Name of the device/application recording the data

#### Defined in

[src/models/MedicalDevice.ts:74](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L74)

___

### parentId

• `Optional` **parentId**: `string`

#### Defined in

[src/models/MedicalDevice.ts:91](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L91)

___

### picture

• `Optional` **picture**: `ArrayBuffer`

Picture of the device/application

#### Defined in

[src/models/MedicalDevice.ts:95](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L95)

___

### properties

• **properties**: `Set`<[`Property`](Property.md)\>

#### Defined in

[src/models/MedicalDevice.ts:96](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L96)

___

### responsible

• `Optional` **responsible**: `string`

The id of the data owner that is responsible of this medical device. When creating the medical device, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing

#### Defined in

[src/models/MedicalDevice.ts:54](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L54)

___

### rev

• `Optional` **rev**: `string`

the revision of the medical device in the database, used for conflict management / optimistic locking.

#### Defined in

[src/models/MedicalDevice.ts:30](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L30)

___

### serialNumber

• `Optional` **serialNumber**: `string`

Serial number of the device recording the data

#### Defined in

[src/models/MedicalDevice.ts:90](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L90)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataOwner`](SystemMetaDataOwner.md)

#### Defined in

[src/models/MedicalDevice.ts:97](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L97)

___

### type

• `Optional` **type**: `string`

Type of device/application recording the data. (eg. \"smartphone\", \"watch\",...)

#### Defined in

[src/models/MedicalDevice.ts:78](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/MedicalDevice.ts#L78)

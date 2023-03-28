[@icure/medical-device-sdk](../modules.md) / EmailMessageFactory

# Interface: EmailMessageFactory

## Hierarchy

- [`MsgGtwMessageFactory`](MsgGtwMessageFactory.md)<[`EmailMessage`](../modules.md#emailmessage)\>

  ↳ **`EmailMessageFactory`**

## Implemented by

- [`ICureRegistrationEmail`](../classes/ICureRegistrationEmail.md)

## Table of contents

### Properties

- [dataOwner](EmailMessageFactory.md#dataowner)
- [link](EmailMessageFactory.md#link)
- [patient](EmailMessageFactory.md#patient)

### Methods

- [get](EmailMessageFactory.md#get)

## Properties

### dataOwner

• **dataOwner**: [`HealthcareProfessional`](../classes/HealthcareProfessional.md) \| [`Patient`](../classes/Patient.md)

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory.md).[dataOwner](MsgGtwMessageFactory.md#dataowner)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:20](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L20)

___

### link

• **link**: `string`

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory.md).[link](MsgGtwMessageFactory.md#link)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:21](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L21)

___

### patient

• **patient**: [`Patient`](../classes/Patient.md)

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory.md).[patient](MsgGtwMessageFactory.md#patient)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L22)

## Methods

### get

▸ **get**(`recipient`, `recipientPassword`): [`EmailMessage`](../modules.md#emailmessage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](../classes/User.md) |
| `recipientPassword` | `string` |

#### Returns

[`EmailMessage`](../modules.md#emailmessage)

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory.md).[get](MsgGtwMessageFactory.md#get)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L24)

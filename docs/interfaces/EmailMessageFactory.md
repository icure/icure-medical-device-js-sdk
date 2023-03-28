[@icure/medical-device-sdk](../modules) / EmailMessageFactory

# Interface: EmailMessageFactory

## Hierarchy

- [`MsgGtwMessageFactory`](MsgGtwMessageFactory)<[`EmailMessage`](../modules#emailmessage)\>

  ↳ **`EmailMessageFactory`**

## Implemented by

- [`ICureRegistrationEmail`](../classes/ICureRegistrationEmail)

## Table of contents

### Properties

- [dataOwner](EmailMessageFactory#dataowner)
- [link](EmailMessageFactory#link)
- [patient](EmailMessageFactory#patient)

### Methods

- [get](EmailMessageFactory#get)

## Properties

### dataOwner

• **dataOwner**: [`HealthcareProfessional`](../classes/HealthcareProfessional) \| [`Patient`](../classes/Patient)

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory).[dataOwner](MsgGtwMessageFactory#dataowner)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:20](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L20)

___

### link

• **link**: `string`

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory).[link](MsgGtwMessageFactory#link)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:21](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L21)

___

### patient

• **patient**: [`Patient`](../classes/Patient)

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory).[patient](MsgGtwMessageFactory#patient)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L22)

## Methods

### get

▸ **get**(`recipient`, `recipientPassword`): [`EmailMessage`](../modules#emailmessage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](../classes/User) |
| `recipientPassword` | `string` |

#### Returns

[`EmailMessage`](../modules#emailmessage)

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory).[get](MsgGtwMessageFactory#get)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L24)

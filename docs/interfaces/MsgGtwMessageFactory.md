[@icure/medical-device-sdk](../modules.md) / MsgGtwMessageFactory

# Interface: MsgGtwMessageFactory<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SMSMessage`](../modules.md#smsmessage) \| [`EmailMessage`](../modules.md#emailmessage) |

## Hierarchy

- **`MsgGtwMessageFactory`**

  ↳ [`EmailMessageFactory`](EmailMessageFactory.md)

  ↳ [`SMSMessageFactory`](SMSMessageFactory.md)

## Table of contents

### Properties

- [dataOwner](MsgGtwMessageFactory.md#dataowner)
- [link](MsgGtwMessageFactory.md#link)
- [patient](MsgGtwMessageFactory.md#patient)

### Methods

- [get](MsgGtwMessageFactory.md#get)

## Properties

### dataOwner

• **dataOwner**: [`HealthcareProfessional`](../classes/HealthcareProfessional.md) \| [`Patient`](../classes/Patient.md)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:20](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L20)

___

### link

• **link**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:21](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L21)

___

### patient

• **patient**: [`Patient`](../classes/Patient.md)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L22)

## Methods

### get

▸ **get**(`recipient`, `recipientPassword`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](../classes/User.md) |
| `recipientPassword` | `string` |

#### Returns

`T`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L24)

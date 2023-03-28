[@icure/medical-device-sdk](../modules) / MsgGtwMessageFactory

# Interface: MsgGtwMessageFactory<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SMSMessage`](../modules#smsmessage) \| [`EmailMessage`](../modules#emailmessage) |

## Hierarchy

- **`MsgGtwMessageFactory`**

  ↳ [`EmailMessageFactory`](EmailMessageFactory)

  ↳ [`SMSMessageFactory`](SMSMessageFactory)

## Table of contents

### Properties

- [dataOwner](MsgGtwMessageFactory#dataowner)
- [link](MsgGtwMessageFactory#link)
- [patient](MsgGtwMessageFactory#patient)

### Methods

- [get](MsgGtwMessageFactory#get)

## Properties

### dataOwner

• **dataOwner**: [`HealthcareProfessional`](../classes/HealthcareProfessional) \| [`Patient`](../classes/Patient)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:20](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L20)

___

### link

• **link**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:21](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L21)

___

### patient

• **patient**: [`Patient`](../classes/Patient)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L22)

## Methods

### get

▸ **get**(`recipient`, `recipientPassword`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](../classes/User) |
| `recipientPassword` | `string` |

#### Returns

`T`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L24)

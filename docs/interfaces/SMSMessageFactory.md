[@icure/medical-device-sdk](../modules.md) / SMSMessageFactory

# Interface: SMSMessageFactory

## Hierarchy

- [`MsgGtwMessageFactory`](MsgGtwMessageFactory.md)<[`SMSMessage`](../modules.md#smsmessage)\>

  ↳ **`SMSMessageFactory`**

## Implemented by

- [`ICureRegistrationSMS`](../classes/ICureRegistrationSMS.md)

## Table of contents

### Properties

- [dataOwner](SMSMessageFactory.md#dataowner)
- [link](SMSMessageFactory.md#link)
- [patient](SMSMessageFactory.md#patient)

### Methods

- [get](SMSMessageFactory.md#get)

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

▸ **get**(`recipient`, `recipientPassword`): [`SMSMessage`](../modules.md#smsmessage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](../classes/User.md) |
| `recipientPassword` | `string` |

#### Returns

[`SMSMessage`](../modules.md#smsmessage)

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory.md).[get](MsgGtwMessageFactory.md#get)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L24)

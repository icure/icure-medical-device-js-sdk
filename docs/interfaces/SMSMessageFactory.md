[@icure/medical-device-sdk](../modules) / SMSMessageFactory

# Interface: SMSMessageFactory

## Hierarchy

- [`MsgGtwMessageFactory`](MsgGtwMessageFactory)<[`SMSMessage`](../modules#smsmessage)\>

  ↳ **`SMSMessageFactory`**

## Implemented by

- [`ICureRegistrationSMS`](../classes/ICureRegistrationSMS)

## Table of contents

### Properties

- [dataOwner](SMSMessageFactory#dataowner)
- [link](SMSMessageFactory#link)
- [patient](SMSMessageFactory#patient)

### Methods

- [get](SMSMessageFactory#get)

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

▸ **get**(`recipient`, `recipientPassword`): [`SMSMessage`](../modules#smsmessage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](../classes/User) |
| `recipientPassword` | `string` |

#### Returns

[`SMSMessage`](../modules#smsmessage)

#### Inherited from

[MsgGtwMessageFactory](MsgGtwMessageFactory).[get](MsgGtwMessageFactory#get)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L24)

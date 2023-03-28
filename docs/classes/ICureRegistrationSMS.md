[@icure/medical-device-sdk](../modules.md) / ICureRegistrationSMS

# Class: ICureRegistrationSMS

## Implements

- [`SMSMessageFactory`](../interfaces/SMSMessageFactory.md)

## Table of contents

### Constructors

- [constructor](ICureRegistrationSMS.md#constructor)

### Properties

- [dataOwner](ICureRegistrationSMS.md#dataowner)
- [link](ICureRegistrationSMS.md#link)
- [patient](ICureRegistrationSMS.md#patient)
- [solutionName](ICureRegistrationSMS.md#solutionname)

### Methods

- [get](ICureRegistrationSMS.md#get)

## Constructors

### constructor

• **new ICureRegistrationSMS**(`dataOwner`, `link`, `solutionName`, `patient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwner` | [`HealthcareProfessional`](HealthcareProfessional.md) \| [`Patient`](Patient.md) |
| `link` | `string` |
| `solutionName` | `string` |
| `patient` | [`Patient`](Patient.md) |

#### Defined in

[src/utils/msgGtwMessageFactory.ts:63](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L63)

## Properties

### dataOwner

• **dataOwner**: [`HealthcareProfessional`](HealthcareProfessional.md) \| [`Patient`](Patient.md)

#### Implementation of

[SMSMessageFactory](../interfaces/SMSMessageFactory.md).[dataOwner](../interfaces/SMSMessageFactory.md#dataowner)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:58](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L58)

___

### link

• **link**: `string`

#### Implementation of

[SMSMessageFactory](../interfaces/SMSMessageFactory.md).[link](../interfaces/SMSMessageFactory.md#link)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L59)

___

### patient

• **patient**: [`Patient`](Patient.md)

#### Implementation of

[SMSMessageFactory](../interfaces/SMSMessageFactory.md).[patient](../interfaces/SMSMessageFactory.md#patient)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:61](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L61)

___

### solutionName

• **solutionName**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:60](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L60)

## Methods

### get

▸ **get**(`recipient`, `recipientPassword`): [`SMSMessage`](../modules.md#smsmessage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](User.md) |
| `recipientPassword` | `string` |

#### Returns

[`SMSMessage`](../modules.md#smsmessage)

#### Implementation of

[SMSMessageFactory](../interfaces/SMSMessageFactory.md).[get](../interfaces/SMSMessageFactory.md#get)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L70)

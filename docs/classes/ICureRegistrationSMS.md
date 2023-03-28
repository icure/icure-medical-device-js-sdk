[@icure/medical-device-sdk](../modules) / ICureRegistrationSMS

# Class: ICureRegistrationSMS

## Implements

- [`SMSMessageFactory`](../interfaces/SMSMessageFactory)

## Table of contents

### Constructors

- [constructor](ICureRegistrationSMS#constructor)

### Properties

- [dataOwner](ICureRegistrationSMS#dataowner)
- [link](ICureRegistrationSMS#link)
- [patient](ICureRegistrationSMS#patient)
- [solutionName](ICureRegistrationSMS#solutionname)

### Methods

- [get](ICureRegistrationSMS#get)

## Constructors

### constructor

• **new ICureRegistrationSMS**(`dataOwner`, `link`, `solutionName`, `patient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwner` | [`HealthcareProfessional`](HealthcareProfessional) \| [`Patient`](Patient) |
| `link` | `string` |
| `solutionName` | `string` |
| `patient` | [`Patient`](Patient) |

#### Defined in

[src/utils/msgGtwMessageFactory.ts:63](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L63)

## Properties

### dataOwner

• **dataOwner**: [`HealthcareProfessional`](HealthcareProfessional) \| [`Patient`](Patient)

#### Implementation of

[SMSMessageFactory](../interfaces/SMSMessageFactory).[dataOwner](../interfaces/SMSMessageFactory#dataowner)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:58](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L58)

___

### link

• **link**: `string`

#### Implementation of

[SMSMessageFactory](../interfaces/SMSMessageFactory).[link](../interfaces/SMSMessageFactory#link)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L59)

___

### patient

• **patient**: [`Patient`](Patient)

#### Implementation of

[SMSMessageFactory](../interfaces/SMSMessageFactory).[patient](../interfaces/SMSMessageFactory#patient)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:61](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L61)

___

### solutionName

• **solutionName**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:60](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L60)

## Methods

### get

▸ **get**(`recipient`, `recipientPassword`): [`SMSMessage`](../modules#smsmessage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](User) |
| `recipientPassword` | `string` |

#### Returns

[`SMSMessage`](../modules#smsmessage)

#### Implementation of

[SMSMessageFactory](../interfaces/SMSMessageFactory).[get](../interfaces/SMSMessageFactory#get)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L70)

[@icure/medical-device-sdk](../modules.md) / ICureRegistrationEmail

# Class: ICureRegistrationEmail

## Implements

- [`EmailMessageFactory`](../interfaces/EmailMessageFactory.md)

## Table of contents

### Constructors

- [constructor](ICureRegistrationEmail.md#constructor)

### Properties

- [dataOwner](ICureRegistrationEmail.md#dataowner)
- [hcpEmail](ICureRegistrationEmail.md#hcpemail)
- [link](ICureRegistrationEmail.md#link)
- [patient](ICureRegistrationEmail.md#patient)
- [solutionName](ICureRegistrationEmail.md#solutionname)

### Methods

- [get](ICureRegistrationEmail.md#get)

## Constructors

### constructor

• **new ICureRegistrationEmail**(`dataOwner`, `link`, `solutionName`, `patient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwner` | [`HealthcareProfessional`](HealthcareProfessional.md) \| [`Patient`](Patient.md) |
| `link` | `string` |
| `solutionName` | `string` |
| `patient` | [`Patient`](Patient.md) |

#### Defined in

[src/utils/msgGtwMessageFactory.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L38)

## Properties

### dataOwner

• **dataOwner**: [`HealthcareProfessional`](HealthcareProfessional.md) \| [`Patient`](Patient.md)

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory.md).[dataOwner](../interfaces/EmailMessageFactory.md#dataowner)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:32](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L32)

___

### hcpEmail

• **hcpEmail**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L33)

___

### link

• **link**: `string`

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory.md).[link](../interfaces/EmailMessageFactory.md#link)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L34)

___

### patient

• **patient**: [`Patient`](Patient.md)

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory.md).[patient](../interfaces/EmailMessageFactory.md#patient)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:36](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L36)

___

### solutionName

• **solutionName**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L35)

## Methods

### get

▸ **get**(`recipient`, `recipientPassword`): [`EmailMessage`](../modules.md#emailmessage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](User.md) |
| `recipientPassword` | `string` |

#### Returns

[`EmailMessage`](../modules.md#emailmessage)

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory.md).[get](../interfaces/EmailMessageFactory.md#get)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/utils/msgGtwMessageFactory.ts#L48)

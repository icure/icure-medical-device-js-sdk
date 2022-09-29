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
| `dataOwner` | [`Patient`](Patient.md) \| [`HealthcareProfessional`](HealthcareProfessional.md) |
| `link` | `string` |
| `solutionName` | `string` |
| `patient` | [`Patient`](Patient.md) |

#### Defined in

[src/utils/msgGtwMessageFactory.ts:37](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/utils/msgGtwMessageFactory.ts#L37)

## Properties

### dataOwner

• **dataOwner**: [`Patient`](Patient.md) \| [`HealthcareProfessional`](HealthcareProfessional.md)

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory.md).[dataOwner](../interfaces/EmailMessageFactory.md#dataowner)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:31](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/utils/msgGtwMessageFactory.ts#L31)

___

### hcpEmail

• **hcpEmail**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:32](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/utils/msgGtwMessageFactory.ts#L32)

___

### link

• **link**: `string`

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory.md).[link](../interfaces/EmailMessageFactory.md#link)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/utils/msgGtwMessageFactory.ts#L33)

___

### patient

• **patient**: [`Patient`](Patient.md)

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory.md).[patient](../interfaces/EmailMessageFactory.md#patient)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/utils/msgGtwMessageFactory.ts#L35)

___

### solutionName

• **solutionName**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/utils/msgGtwMessageFactory.ts#L34)

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

[src/utils/msgGtwMessageFactory.ts:53](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/utils/msgGtwMessageFactory.ts#L53)

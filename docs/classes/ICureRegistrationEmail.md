[@icure/medical-device-sdk](../modules) / ICureRegistrationEmail

# Class: ICureRegistrationEmail

## Implements

- [`EmailMessageFactory`](../interfaces/EmailMessageFactory)

## Table of contents

### Constructors

- [constructor](ICureRegistrationEmail#constructor)

### Properties

- [dataOwner](ICureRegistrationEmail#dataowner)
- [hcpEmail](ICureRegistrationEmail#hcpemail)
- [link](ICureRegistrationEmail#link)
- [patient](ICureRegistrationEmail#patient)
- [solutionName](ICureRegistrationEmail#solutionname)

### Methods

- [get](ICureRegistrationEmail#get)

## Constructors

### constructor

• **new ICureRegistrationEmail**(`dataOwner`, `link`, `solutionName`, `patient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwner` | [`HealthcareProfessional`](HealthcareProfessional) \| [`Patient`](Patient) |
| `link` | `string` |
| `solutionName` | `string` |
| `patient` | [`Patient`](Patient) |

#### Defined in

[src/utils/msgGtwMessageFactory.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L38)

## Properties

### dataOwner

• **dataOwner**: [`HealthcareProfessional`](HealthcareProfessional) \| [`Patient`](Patient)

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory).[dataOwner](../interfaces/EmailMessageFactory#dataowner)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:32](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L32)

___

### hcpEmail

• **hcpEmail**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L33)

___

### link

• **link**: `string`

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory).[link](../interfaces/EmailMessageFactory#link)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L34)

___

### patient

• **patient**: [`Patient`](Patient)

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory).[patient](../interfaces/EmailMessageFactory#patient)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:36](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L36)

___

### solutionName

• **solutionName**: `string`

#### Defined in

[src/utils/msgGtwMessageFactory.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L35)

## Methods

### get

▸ **get**(`recipient`, `recipientPassword`): [`EmailMessage`](../modules#emailmessage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | [`User`](User) |
| `recipientPassword` | `string` |

#### Returns

[`EmailMessage`](../modules#emailmessage)

#### Implementation of

[EmailMessageFactory](../interfaces/EmailMessageFactory).[get](../interfaces/EmailMessageFactory#get)

#### Defined in

[src/utils/msgGtwMessageFactory.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/utils/msgGtwMessageFactory.ts#L48)

[@icure/medical-device-sdk](../modules) / PersonName

# Class: PersonName

the list of all names of the patient, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the patient in the application

## Table of contents

### Constructors

- [constructor](PersonName#constructor)

### Properties

- [end](PersonName#end)
- [firstNames](PersonName#firstnames)
- [lastName](PersonName#lastname)
- [prefix](PersonName#prefix)
- [start](PersonName#start)
- [suffix](PersonName#suffix)
- [text](PersonName#text)
- [use](PersonName#use)

### Methods

- [marshal](PersonName#marshal)

## Constructors

### constructor

• **new PersonName**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IPersonName` |

#### Defined in

[src/models/PersonName.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L18)

## Properties

### end

• `Optional` **end**: `number`

#### Defined in

[src/models/PersonName.ts:27](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L27)

___

### firstNames

• **firstNames**: `string`[]

#### Defined in

[src/models/PersonName.ts:25](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L25)

___

### lastName

• `Optional` **lastName**: `string`

#### Defined in

[src/models/PersonName.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L24)

___

### prefix

• **prefix**: `string`[]

#### Defined in

[src/models/PersonName.ts:28](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L28)

___

### start

• `Optional` **start**: `number`

#### Defined in

[src/models/PersonName.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L26)

___

### suffix

• **suffix**: `string`[]

#### Defined in

[src/models/PersonName.ts:29](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L29)

___

### text

• `Optional` **text**: `string`

#### Defined in

[src/models/PersonName.ts:30](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L30)

___

### use

• `Optional` **use**: [`PersonNameUseEnum`](../modules#personnameuseenum)

#### Defined in

[src/models/PersonName.ts:31](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L31)

## Methods

### marshal

▸ **marshal**(): `IPersonName`

#### Returns

`IPersonName`

#### Defined in

[src/models/PersonName.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/PersonName.ts#L33)

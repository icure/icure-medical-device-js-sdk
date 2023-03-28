[@icure/medical-device-sdk](../modules.md) / PersonName

# Class: PersonName

the list of all names of the patient, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the patient in the application

## Table of contents

### Constructors

- [constructor](PersonName.md#constructor)

### Properties

- [end](PersonName.md#end)
- [firstNames](PersonName.md#firstnames)
- [lastName](PersonName.md#lastname)
- [prefix](PersonName.md#prefix)
- [start](PersonName.md#start)
- [suffix](PersonName.md#suffix)
- [text](PersonName.md#text)
- [use](PersonName.md#use)

### Methods

- [marshal](PersonName.md#marshal)

## Constructors

### constructor

• **new PersonName**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IPersonName` |

#### Defined in

[src/models/PersonName.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L18)

## Properties

### end

• `Optional` **end**: `number`

#### Defined in

[src/models/PersonName.ts:27](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L27)

___

### firstNames

• **firstNames**: `string`[]

#### Defined in

[src/models/PersonName.ts:25](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L25)

___

### lastName

• `Optional` **lastName**: `string`

#### Defined in

[src/models/PersonName.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L24)

___

### prefix

• **prefix**: `string`[]

#### Defined in

[src/models/PersonName.ts:28](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L28)

___

### start

• `Optional` **start**: `number`

#### Defined in

[src/models/PersonName.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L26)

___

### suffix

• **suffix**: `string`[]

#### Defined in

[src/models/PersonName.ts:29](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L29)

___

### text

• `Optional` **text**: `string`

#### Defined in

[src/models/PersonName.ts:30](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L30)

___

### use

• `Optional` **use**: [`PersonNameUseEnum`](../modules.md#personnameuseenum)

#### Defined in

[src/models/PersonName.ts:31](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L31)

## Methods

### marshal

▸ **marshal**(): `IPersonName`

#### Returns

`IPersonName`

#### Defined in

[src/models/PersonName.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/PersonName.ts#L33)

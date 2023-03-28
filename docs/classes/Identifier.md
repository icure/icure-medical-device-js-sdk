[@icure/medical-device-sdk](../modules.md) / Identifier

# Class: Identifier

Typically used for business / client identifiers. An identifier should identify a patient uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.

## Table of contents

### Constructors

- [constructor](Identifier.md#constructor)

### Properties

- [assigner](Identifier.md#assigner)
- [end](Identifier.md#end)
- [id](Identifier.md#id)
- [start](Identifier.md#start)
- [system](Identifier.md#system)
- [type](Identifier.md#type)
- [use](Identifier.md#use)
- [value](Identifier.md#value)

### Methods

- [marshal](Identifier.md#marshal)

## Constructors

### constructor

• **new Identifier**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IIdentifier` |

#### Defined in

[src/models/Identifier.ts:19](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L19)

## Properties

### assigner

• `Optional` **assigner**: `string`

#### Defined in

[src/models/Identifier.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L26)

___

### end

• `Optional` **end**: `string`

#### Defined in

[src/models/Identifier.ts:28](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L28)

___

### id

• `Optional` **id**: `string`

#### Defined in

[src/models/Identifier.ts:25](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L25)

___

### start

• `Optional` **start**: `string`

#### Defined in

[src/models/Identifier.ts:27](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L27)

___

### system

• `Optional` **system**: `string`

#### Defined in

[src/models/Identifier.ts:29](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L29)

___

### type

• `Optional` **type**: [`CodingReference`](CodingReference.md)

#### Defined in

[src/models/Identifier.ts:30](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L30)

___

### use

• `Optional` **use**: `string`

#### Defined in

[src/models/Identifier.ts:31](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L31)

___

### value

• `Optional` **value**: `string`

#### Defined in

[src/models/Identifier.ts:32](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L32)

## Methods

### marshal

▸ **marshal**(): `IIdentifier`

#### Returns

`IIdentifier`

#### Defined in

[src/models/Identifier.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Identifier.ts#L34)

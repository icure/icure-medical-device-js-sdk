[@icure/medical-device-sdk](../modules) / UuidEncoder

# Class: UuidEncoder

## Table of contents

### Constructors

- [constructor](UuidEncoder#constructor)

### Properties

- [base](UuidEncoder#base)
- [encStr](UuidEncoder#encstr)
- [isCaseSensitive](UuidEncoder#iscasesensitive)

### Methods

- [decode](UuidEncoder#decode)
- [encode](UuidEncoder#encode)
- [setBaseEncodingStr](UuidEncoder#setbaseencodingstr)
- [isCaseSensitiveBase](UuidEncoder#iscasesensitivebase)
- [resolveEncodingStr](UuidEncoder#resolveencodingstr)

## Constructors

### constructor

• **new UuidEncoder**(`baseEncodingStr?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseEncodingStr?` | `string` | A string containing all usable letters for encoding |

#### Defined in

node_modules/@icure/api/icc-x-api/utils/uuid-encoder.d.ts:10

## Properties

### base

• `Private` **base**: `any`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/uuid-encoder.d.ts:4

___

### encStr

• `Private` **encStr**: `any`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/uuid-encoder.d.ts:2

___

### isCaseSensitive

• `Private` **isCaseSensitive**: `any`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/uuid-encoder.d.ts:3

## Methods

### decode

▸ **decode**(`str`): `string`

Decode an encoded UUID

**`Throws`**

Throws an {Error} when encountering invalid data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Previously encoded string |

#### Returns

`string`

Properly formatted UUID

#### Defined in

node_modules/@icure/api/icc-x-api/utils/uuid-encoder.d.ts:43

___

### encode

▸ **encode**(`uuid`): `string`

Encode a UUID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | Properly formatted UUID |

#### Returns

`string`

Encoded UUID

#### Defined in

node_modules/@icure/api/icc-x-api/utils/uuid-encoder.d.ts:35

___

### setBaseEncodingStr

▸ **setBaseEncodingStr**(`baseEncodingStr`): `void`

Set encoding base

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseEncodingStr` | `string` | A string containing all usable letters for encoding |

#### Returns

`void`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/uuid-encoder.d.ts:16

___

### isCaseSensitiveBase

▸ `Static` **isCaseSensitiveBase**(`baseEncodingStr`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseEncodingStr` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/uuid-encoder.d.ts:28

___

### resolveEncodingStr

▸ `Static` `Private` **resolveEncodingStr**(`baseEncodingStr`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseEncodingStr` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/uuid-encoder.d.ts:22

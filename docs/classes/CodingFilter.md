[@icure/medical-device-sdk](../modules.md) / CodingFilter

# Class: CodingFilter

## Implements

- `FilterBuilder`<[`Coding`](Coding.md)\>

## Table of contents

### Constructors

- [constructor](CodingFilter.md#constructor)

### Properties

- [\_byIds](CodingFilter.md#_byids)
- [\_byRegionTypeLabelLanguageFilter](CodingFilter.md#_byregiontypelabellanguagefilter)
- [\_intersection](CodingFilter.md#_intersection)
- [\_union](CodingFilter.md#_union)

### Methods

- [build](CodingFilter.md#build)
- [byIds](CodingFilter.md#byids)
- [byRegionTypeLabelLanguage](CodingFilter.md#byregiontypelabellanguage)
- [intersection](CodingFilter.md#intersection)
- [union](CodingFilter.md#union)

## Constructors

### constructor

• **new CodingFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:383](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L383)

___

### \_byRegionTypeLabelLanguageFilter

• `Optional` **\_byRegionTypeLabelLanguageFilter**: `CodingByRegionTypeLabelFilter`

#### Defined in

[src/filter/filterDsl.ts:384](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L384)

___

### \_intersection

• `Optional` **\_intersection**: [`CodingFilter`](CodingFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:386](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L386)

___

### \_union

• `Optional` **\_union**: [`CodingFilter`](CodingFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:385](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L385)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`Coding`](Coding.md)\>\>

#### Returns

`Promise`<`Filter`<[`Coding`](Coding.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:413](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L413)

___

### byIds

▸ **byIds**(`byIds`): [`CodingFilter`](CodingFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`CodingFilter`](CodingFilter.md)

#### Defined in

[src/filter/filterDsl.ts:388](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L388)

___

### byRegionTypeLabelLanguage

▸ **byRegionTypeLabelLanguage**(`region?`, `type?`, `language?`, `label?`): [`CodingFilter`](CodingFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `region?` | `string` |
| `type?` | `string` |
| `language?` | `string` |
| `label?` | `string` |

#### Returns

[`CodingFilter`](CodingFilter.md)

#### Defined in

[src/filter/filterDsl.ts:393](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L393)

___

### intersection

▸ **intersection**(`filters`): [`CodingFilter`](CodingFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`CodingFilter`](CodingFilter.md)[] |

#### Returns

[`CodingFilter`](CodingFilter.md)

#### Defined in

[src/filter/filterDsl.ts:407](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L407)

___

### union

▸ **union**(`filters`): [`CodingFilter`](CodingFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`CodingFilter`](CodingFilter.md)[] |

#### Returns

[`CodingFilter`](CodingFilter.md)

#### Defined in

[src/filter/filterDsl.ts:402](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L402)

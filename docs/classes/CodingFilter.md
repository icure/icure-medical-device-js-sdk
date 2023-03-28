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
- [byRegionLanguageTypeLabel](CodingFilter.md#byregionlanguagetypelabel)
- [intersection](CodingFilter.md#intersection)
- [union](CodingFilter.md#union)

## Constructors

### constructor

• **new CodingFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:452](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L452)

___

### \_byRegionTypeLabelLanguageFilter

• `Optional` **\_byRegionTypeLabelLanguageFilter**: `CodingByRegionTypeLabelFilter`

#### Defined in

[src/filter/filterDsl.ts:453](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L453)

___

### \_intersection

• `Optional` **\_intersection**: [`CodingFilter`](CodingFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:455](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L455)

___

### \_union

• `Optional` **\_union**: [`CodingFilter`](CodingFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:454](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L454)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`Coding`](Coding.md)\>\>

#### Returns

`Promise`<`Filter`<[`Coding`](Coding.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:477](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L477)

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

[src/filter/filterDsl.ts:457](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L457)

___

### byRegionLanguageTypeLabel

▸ **byRegionLanguageTypeLabel**(`region?`, `language?`, `type?`, `label?`): [`CodingFilter`](CodingFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `region?` | `string` |
| `language?` | `string` |
| `type?` | `string` |
| `label?` | `string` |

#### Returns

[`CodingFilter`](CodingFilter.md)

#### Defined in

[src/filter/filterDsl.ts:462](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L462)

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

[src/filter/filterDsl.ts:472](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L472)

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

[src/filter/filterDsl.ts:467](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L467)

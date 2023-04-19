[@icure/medical-device-sdk](../modules) / CodingFilter

# Class: CodingFilter

## Implements

- `FilterBuilder`<[`Coding`](Coding)\>

## Table of contents

### Constructors

- [constructor](CodingFilter#constructor)

### Properties

- [\_byIds](CodingFilter#_byids)
- [\_byRegionTypeLabelLanguageFilter](CodingFilter#_byregiontypelabellanguagefilter)
- [\_intersection](CodingFilter#_intersection)
- [\_union](CodingFilter#_union)

### Methods

- [build](CodingFilter#build)
- [byIds](CodingFilter#byids)
- [byRegionLanguageTypeLabel](CodingFilter#byregionlanguagetypelabel)
- [intersection](CodingFilter#intersection)
- [union](CodingFilter#union)

## Constructors

### constructor

• **new CodingFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:452](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L452)

___

### \_byRegionTypeLabelLanguageFilter

• `Optional` **\_byRegionTypeLabelLanguageFilter**: `CodingByRegionTypeLabelFilter`

#### Defined in

[src/filter/filterDsl.ts:453](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L453)

___

### \_intersection

• `Optional` **\_intersection**: [`CodingFilter`](CodingFilter)[]

#### Defined in

[src/filter/filterDsl.ts:455](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L455)

___

### \_union

• `Optional` **\_union**: [`CodingFilter`](CodingFilter)[]

#### Defined in

[src/filter/filterDsl.ts:454](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L454)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`Coding`](Coding)\>\>

#### Returns

`Promise`<`Filter`<[`Coding`](Coding)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:477](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L477)

___

### byIds

▸ **byIds**(`byIds`): [`CodingFilter`](CodingFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`CodingFilter`](CodingFilter)

#### Defined in

[src/filter/filterDsl.ts:457](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L457)

___

### byRegionLanguageTypeLabel

▸ **byRegionLanguageTypeLabel**(`region?`, `language?`, `type?`, `label?`): [`CodingFilter`](CodingFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `region?` | `string` |
| `language?` | `string` |
| `type?` | `string` |
| `label?` | `string` |

#### Returns

[`CodingFilter`](CodingFilter)

#### Defined in

[src/filter/filterDsl.ts:462](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L462)

___

### intersection

▸ **intersection**(`filters`): [`CodingFilter`](CodingFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`CodingFilter`](CodingFilter)[] |

#### Returns

[`CodingFilter`](CodingFilter)

#### Defined in

[src/filter/filterDsl.ts:472](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L472)

___

### union

▸ **union**(`filters`): [`CodingFilter`](CodingFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`CodingFilter`](CodingFilter)[] |

#### Returns

[`CodingFilter`](CodingFilter)

#### Defined in

[src/filter/filterDsl.ts:467](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L467)

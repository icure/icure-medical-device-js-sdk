[@icure/medical-device-sdk](../modules.md) / HealthcareProfessionalFilter

# Class: HealthcareProfessionalFilter

## Implements

- `FilterBuilder`<[`HealthcareProfessional`](HealthcareProfessional.md)\>

## Table of contents

### Constructors

- [constructor](HealthcareProfessionalFilter.md#constructor)

### Properties

- [\_byIds](HealthcareProfessionalFilter.md#_byids)
- [\_byLabelCodeFilter](HealthcareProfessionalFilter.md#_bylabelcodefilter)
- [\_intersection](HealthcareProfessionalFilter.md#_intersection)
- [\_matches](HealthcareProfessionalFilter.md#_matches)
- [\_union](HealthcareProfessionalFilter.md#_union)

### Methods

- [build](HealthcareProfessionalFilter.md#build)
- [byIds](HealthcareProfessionalFilter.md#byids)
- [byLabelCodeFilter](HealthcareProfessionalFilter.md#bylabelcodefilter)
- [byMatches](HealthcareProfessionalFilter.md#bymatches)
- [intersection](HealthcareProfessionalFilter.md#intersection)
- [union](HealthcareProfessionalFilter.md#union)

## Constructors

### constructor

• **new HealthcareProfessionalFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:236](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L236)

___

### \_byLabelCodeFilter

• `Optional` **\_byLabelCodeFilter**: `HealthcareProfessionalByLabelCodeFilter`

#### Defined in

[src/filter/filterDsl.ts:239](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L239)

___

### \_intersection

• `Optional` **\_intersection**: [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:238](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L238)

___

### \_matches

• `Optional` **\_matches**: `string`

#### Defined in

[src/filter/filterDsl.ts:235](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L235)

___

### \_union

• `Optional` **\_union**: [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:237](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L237)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`HealthcareProfessional`](HealthcareProfessional.md)\>\>

#### Returns

`Promise`<`Filter`<[`HealthcareProfessional`](HealthcareProfessional.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:272](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L272)

___

### byIds

▸ **byIds**(`byIds`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Defined in

[src/filter/filterDsl.ts:241](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L241)

___

### byLabelCodeFilter

▸ **byLabelCodeFilter**(`labelType?`, `labelCode?`, `codeType?`, `codeCode?`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `labelType?` | `string` |
| `labelCode?` | `string` |
| `codeType?` | `string` |
| `codeCode?` | `string` |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Defined in

[src/filter/filterDsl.ts:246](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L246)

___

### byMatches

▸ **byMatches**(`searchString`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Defined in

[src/filter/filterDsl.ts:257](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L257)

___

### intersection

▸ **intersection**(`filters`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)[] |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Defined in

[src/filter/filterDsl.ts:267](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L267)

___

### union

▸ **union**(`filters`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)[] |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)

#### Defined in

[src/filter/filterDsl.ts:262](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L262)

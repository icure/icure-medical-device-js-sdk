[@icure/medical-device-sdk](../modules.md) / HealthcareProfessionalFilter

# Class: HealthcareProfessionalFilter

## Implements

- `FilterBuilder`<[`HealthcareProfessional`](HealthcareProfessional.md)\>

## Table of contents

### Constructors

- [constructor](HealthcareProfessionalFilter.md#constructor)

### Properties

- [\_byIds](HealthcareProfessionalFilter.md#_byids)
- [\_intersection](HealthcareProfessionalFilter.md#_intersection)
- [\_union](HealthcareProfessionalFilter.md#_union)

### Methods

- [build](HealthcareProfessionalFilter.md#build)
- [byIds](HealthcareProfessionalFilter.md#byids)
- [intersection](HealthcareProfessionalFilter.md#intersection)
- [union](HealthcareProfessionalFilter.md#union)

## Constructors

### constructor

• **new HealthcareProfessionalFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:223](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/filter/filterDsl.ts#L223)

___

### \_intersection

• `Optional` **\_intersection**: [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:225](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/filter/filterDsl.ts#L225)

___

### \_union

• `Optional` **\_union**: [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:224](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/filter/filterDsl.ts#L224)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`HealthcareProfessional`](HealthcareProfessional.md)\>\>

#### Returns

`Promise`<`Filter`<[`HealthcareProfessional`](HealthcareProfessional.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:242](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/filter/filterDsl.ts#L242)

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

[src/filter/filterDsl.ts:227](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/filter/filterDsl.ts#L227)

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

[src/filter/filterDsl.ts:237](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/filter/filterDsl.ts#L237)

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

[src/filter/filterDsl.ts:232](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/filter/filterDsl.ts#L232)

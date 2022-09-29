[@icure/medical-device-sdk](../modules.md) / UserFilter

# Class: UserFilter

## Implements

- `FilterBuilder`<[`User`](User.md)\>

## Table of contents

### Constructors

- [constructor](UserFilter.md#constructor)

### Properties

- [\_byIds](UserFilter.md#_byids)
- [\_intersection](UserFilter.md#_intersection)
- [\_patientId](UserFilter.md#_patientid)
- [\_union](UserFilter.md#_union)

### Methods

- [build](UserFilter.md#build)
- [byIds](UserFilter.md#byids)
- [byPatientId](UserFilter.md#bypatientid)
- [intersection](UserFilter.md#intersection)
- [union](UserFilter.md#union)

## Constructors

### constructor

• **new UserFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:66](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L66)

___

### \_intersection

• `Optional` **\_intersection**: [`UserFilter`](UserFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:68](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L68)

___

### \_patientId

• `Optional` **\_patientId**: `string`

#### Defined in

[src/filter/filterDsl.ts:69](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L69)

___

### \_union

• `Optional` **\_union**: [`UserFilter`](UserFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:67](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L67)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`User`](User.md)\>\>

#### Returns

`Promise`<`Filter`<[`User`](User.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:91](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L91)

___

### byIds

▸ **byIds**(`byIds`): [`UserFilter`](UserFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`UserFilter`](UserFilter.md)

#### Defined in

[src/filter/filterDsl.ts:71](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L71)

___

### byPatientId

▸ **byPatientId**(`patientId`): [`UserFilter`](UserFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `patientId` | `string` |

#### Returns

[`UserFilter`](UserFilter.md)

#### Defined in

[src/filter/filterDsl.ts:76](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L76)

___

### intersection

▸ **intersection**(`filters`): [`UserFilter`](UserFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`UserFilter`](UserFilter.md)[] |

#### Returns

[`UserFilter`](UserFilter.md)

#### Defined in

[src/filter/filterDsl.ts:86](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L86)

___

### union

▸ **union**(`filters`): [`UserFilter`](UserFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`UserFilter`](UserFilter.md)[] |

#### Returns

[`UserFilter`](UserFilter.md)

#### Defined in

[src/filter/filterDsl.ts:81](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L81)

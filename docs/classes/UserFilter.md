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

[src/filter/filterDsl.ts:55](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L55)

___

### \_intersection

• `Optional` **\_intersection**: [`UserFilter`](UserFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:57](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L57)

___

### \_patientId

• `Optional` **\_patientId**: `string`

#### Defined in

[src/filter/filterDsl.ts:58](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L58)

___

### \_union

• `Optional` **\_union**: [`UserFilter`](UserFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:56](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L56)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`User`](User.md)\>\>

#### Returns

`Promise`<`Filter`<[`User`](User.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:80](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L80)

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

[src/filter/filterDsl.ts:60](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L60)

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

[src/filter/filterDsl.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L65)

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

[src/filter/filterDsl.ts:75](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L75)

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

[src/filter/filterDsl.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L70)

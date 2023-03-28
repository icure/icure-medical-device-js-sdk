[@icure/medical-device-sdk](../modules) / UserFilter

# Class: UserFilter

## Implements

- `FilterBuilder`<[`User`](User)\>

## Table of contents

### Constructors

- [constructor](UserFilter#constructor)

### Properties

- [\_byIds](UserFilter#_byids)
- [\_intersection](UserFilter#_intersection)
- [\_patientId](UserFilter#_patientid)
- [\_union](UserFilter#_union)

### Methods

- [build](UserFilter#build)
- [byIds](UserFilter#byids)
- [byPatientId](UserFilter#bypatientid)
- [intersection](UserFilter#intersection)
- [union](UserFilter#union)

## Constructors

### constructor

• **new UserFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:55](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L55)

___

### \_intersection

• `Optional` **\_intersection**: [`UserFilter`](UserFilter)[]

#### Defined in

[src/filter/filterDsl.ts:57](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L57)

___

### \_patientId

• `Optional` **\_patientId**: `string`

#### Defined in

[src/filter/filterDsl.ts:58](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L58)

___

### \_union

• `Optional` **\_union**: [`UserFilter`](UserFilter)[]

#### Defined in

[src/filter/filterDsl.ts:56](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L56)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`User`](User)\>\>

#### Returns

`Promise`<`Filter`<[`User`](User)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:80](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L80)

___

### byIds

▸ **byIds**(`byIds`): [`UserFilter`](UserFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`UserFilter`](UserFilter)

#### Defined in

[src/filter/filterDsl.ts:60](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L60)

___

### byPatientId

▸ **byPatientId**(`patientId`): [`UserFilter`](UserFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `patientId` | `string` |

#### Returns

[`UserFilter`](UserFilter)

#### Defined in

[src/filter/filterDsl.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L65)

___

### intersection

▸ **intersection**(`filters`): [`UserFilter`](UserFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`UserFilter`](UserFilter)[] |

#### Returns

[`UserFilter`](UserFilter)

#### Defined in

[src/filter/filterDsl.ts:75](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L75)

___

### union

▸ **union**(`filters`): [`UserFilter`](UserFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`UserFilter`](UserFilter)[] |

#### Returns

[`UserFilter`](UserFilter)

#### Defined in

[src/filter/filterDsl.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L70)

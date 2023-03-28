[@icure/medical-device-sdk](../modules.md) / MedicalDeviceFilter

# Class: MedicalDeviceFilter

## Implements

- `FilterBuilder`<[`MedicalDevice`](MedicalDevice.md)\>

## Table of contents

### Constructors

- [constructor](MedicalDeviceFilter.md#constructor)

### Properties

- [\_byIds](MedicalDeviceFilter.md#_byids)
- [\_intersection](MedicalDeviceFilter.md#_intersection)
- [\_union](MedicalDeviceFilter.md#_union)

### Methods

- [build](MedicalDeviceFilter.md#build)
- [byIds](MedicalDeviceFilter.md#byids)
- [intersection](MedicalDeviceFilter.md#intersection)
- [union](MedicalDeviceFilter.md#union)

## Constructors

### constructor

• **new MedicalDeviceFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:298](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L298)

___

### \_intersection

• `Optional` **\_intersection**: [`MedicalDeviceFilter`](MedicalDeviceFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:300](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L300)

___

### \_union

• `Optional` **\_union**: [`MedicalDeviceFilter`](MedicalDeviceFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:299](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L299)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`MedicalDevice`](MedicalDevice.md)\>\>

#### Returns

`Promise`<`Filter`<[`MedicalDevice`](MedicalDevice.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:317](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L317)

___

### byIds

▸ **byIds**(`byIds`): [`MedicalDeviceFilter`](MedicalDeviceFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`MedicalDeviceFilter`](MedicalDeviceFilter.md)

#### Defined in

[src/filter/filterDsl.ts:302](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L302)

___

### intersection

▸ **intersection**(`filters`): [`MedicalDeviceFilter`](MedicalDeviceFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`MedicalDeviceFilter`](MedicalDeviceFilter.md)[] |

#### Returns

[`MedicalDeviceFilter`](MedicalDeviceFilter.md)

#### Defined in

[src/filter/filterDsl.ts:312](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L312)

___

### union

▸ **union**(`filters`): [`MedicalDeviceFilter`](MedicalDeviceFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`MedicalDeviceFilter`](MedicalDeviceFilter.md)[] |

#### Returns

[`MedicalDeviceFilter`](MedicalDeviceFilter.md)

#### Defined in

[src/filter/filterDsl.ts:307](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L307)

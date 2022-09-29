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

[src/filter/filterDsl.ts:260](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L260)

___

### \_intersection

• `Optional` **\_intersection**: [`MedicalDeviceFilter`](MedicalDeviceFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:262](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L262)

___

### \_union

• `Optional` **\_union**: [`MedicalDeviceFilter`](MedicalDeviceFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:261](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L261)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`MedicalDevice`](MedicalDevice.md)\>\>

#### Returns

`Promise`<`Filter`<[`MedicalDevice`](MedicalDevice.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:280](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L280)

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

[src/filter/filterDsl.ts:264](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L264)

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

[src/filter/filterDsl.ts:274](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L274)

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

[src/filter/filterDsl.ts:269](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L269)

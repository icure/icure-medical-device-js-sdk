[@icure/medical-device-sdk](../modules) / MedicalDeviceFilter

# Class: MedicalDeviceFilter

## Implements

- `FilterBuilder`<[`MedicalDevice`](MedicalDevice)\>

## Table of contents

### Constructors

- [constructor](MedicalDeviceFilter#constructor)

### Properties

- [\_byIds](MedicalDeviceFilter#_byids)
- [\_intersection](MedicalDeviceFilter#_intersection)
- [\_union](MedicalDeviceFilter#_union)

### Methods

- [build](MedicalDeviceFilter#build)
- [byIds](MedicalDeviceFilter#byids)
- [intersection](MedicalDeviceFilter#intersection)
- [union](MedicalDeviceFilter#union)

## Constructors

### constructor

• **new MedicalDeviceFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:298](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L298)

___

### \_intersection

• `Optional` **\_intersection**: [`MedicalDeviceFilter`](MedicalDeviceFilter)[]

#### Defined in

[src/filter/filterDsl.ts:300](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L300)

___

### \_union

• `Optional` **\_union**: [`MedicalDeviceFilter`](MedicalDeviceFilter)[]

#### Defined in

[src/filter/filterDsl.ts:299](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L299)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`MedicalDevice`](MedicalDevice)\>\>

#### Returns

`Promise`<`Filter`<[`MedicalDevice`](MedicalDevice)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:317](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L317)

___

### byIds

▸ **byIds**(`byIds`): [`MedicalDeviceFilter`](MedicalDeviceFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`MedicalDeviceFilter`](MedicalDeviceFilter)

#### Defined in

[src/filter/filterDsl.ts:302](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L302)

___

### intersection

▸ **intersection**(`filters`): [`MedicalDeviceFilter`](MedicalDeviceFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`MedicalDeviceFilter`](MedicalDeviceFilter)[] |

#### Returns

[`MedicalDeviceFilter`](MedicalDeviceFilter)

#### Defined in

[src/filter/filterDsl.ts:312](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L312)

___

### union

▸ **union**(`filters`): [`MedicalDeviceFilter`](MedicalDeviceFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`MedicalDeviceFilter`](MedicalDeviceFilter)[] |

#### Returns

[`MedicalDeviceFilter`](MedicalDeviceFilter)

#### Defined in

[src/filter/filterDsl.ts:307](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L307)

[@icure/medical-device-sdk](../modules.md) / DataSampleFilter

# Class: DataSampleFilter

## Implements

- `FilterBuilder`<[`DataSample`](DataSample.md)\>

## Table of contents

### Constructors

- [constructor](DataSampleFilter.md#constructor)

### Properties

- [\_byHealthcareElementIds](DataSampleFilter.md#_byhealthcareelementids)
- [\_byIdentifiers](DataSampleFilter.md#_byidentifiers)
- [\_byIds](DataSampleFilter.md#_byids)
- [\_byTagCodeDateFilter](DataSampleFilter.md#_bytagcodedatefilter)
- [\_forDataOwner](DataSampleFilter.md#_fordataowner)
- [\_forPatients](DataSampleFilter.md#_forpatients)
- [\_intersection](DataSampleFilter.md#_intersection)
- [\_union](DataSampleFilter.md#_union)

### Methods

- [build](DataSampleFilter.md#build)
- [byHealthElementIds](DataSampleFilter.md#byhealthelementids)
- [byIdentifiers](DataSampleFilter.md#byidentifiers)
- [byIds](DataSampleFilter.md#byids)
- [byTagCodeFilter](DataSampleFilter.md#bytagcodefilter)
- [forDataOwner](DataSampleFilter.md#fordataowner)
- [forPatients](DataSampleFilter.md#forpatients)
- [getDataOwner](DataSampleFilter.md#getdataowner)
- [intersection](DataSampleFilter.md#intersection)
- [union](DataSampleFilter.md#union)

## Constructors

### constructor

• **new DataSampleFilter**()

## Properties

### \_byHealthcareElementIds

• `Optional` **\_byHealthcareElementIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:502](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L502)

___

### \_byIdentifiers

• `Optional` **\_byIdentifiers**: [`Identifier`](Identifier.md)[]

#### Defined in

[src/filter/filterDsl.ts:503](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L503)

___

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:501](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L501)

___

### \_byTagCodeDateFilter

• `Optional` **\_byTagCodeDateFilter**: `DataSampleByHealthcarePartyTagCodeDateFilter`

#### Defined in

[src/filter/filterDsl.ts:504](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L504)

___

### \_forDataOwner

• `Optional` **\_forDataOwner**: `string`

#### Defined in

[src/filter/filterDsl.ts:498](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L498)

___

### \_forPatients

• `Optional` **\_forPatients**: [`IccCryptoXApi`, [`Patient`](Patient.md)[]]

#### Defined in

[src/filter/filterDsl.ts:505](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L505)

___

### \_intersection

• `Optional` **\_intersection**: [`DataSampleFilter`](DataSampleFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:507](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L507)

___

### \_union

• `Optional` **\_union**: [`DataSampleFilter`](DataSampleFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:506](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L506)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`DataSample`](DataSample.md)\>\>

#### Returns

`Promise`<`Filter`<[`DataSample`](DataSample.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:549](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L549)

___

### byHealthElementIds

▸ **byHealthElementIds**(`byHealthElementIds`): [`DataSampleFilter`](DataSampleFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byHealthElementIds` | `string`[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter.md)

#### Defined in

[src/filter/filterDsl.ts:534](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L534)

___

### byIdentifiers

▸ **byIdentifiers**(`identifiers`): [`DataSampleFilter`](DataSampleFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifiers` | [`Identifier`](Identifier.md)[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter.md)

#### Defined in

[src/filter/filterDsl.ts:519](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L519)

___

### byIds

▸ **byIds**(`byIds`): [`DataSampleFilter`](DataSampleFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter.md)

#### Defined in

[src/filter/filterDsl.ts:514](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L514)

___

### byTagCodeFilter

▸ **byTagCodeFilter**(`tagType?`, `tagCode?`, `codeType?`, `codeCode?`, `startValueDate?`, `endValueDate?`): [`DataSampleFilter`](DataSampleFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagType?` | `string` |
| `tagCode?` | `string` |
| `codeType?` | `string` |
| `codeCode?` | `string` |
| `startValueDate?` | `number` |
| `endValueDate?` | `number` |

#### Returns

[`DataSampleFilter`](DataSampleFilter.md)

#### Defined in

[src/filter/filterDsl.ts:524](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L524)

___

### forDataOwner

▸ **forDataOwner**(`dataOwnerId`): [`DataSampleFilter`](DataSampleFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwnerId` | `string` |

#### Returns

[`DataSampleFilter`](DataSampleFilter.md)

#### Defined in

[src/filter/filterDsl.ts:509](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L509)

___

### forPatients

▸ **forPatients**(`crypto`, `patients`): [`DataSampleFilter`](DataSampleFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `crypto` | `IccCryptoXApi` |
| `patients` | [`Patient`](Patient.md)[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter.md)

#### Defined in

[src/filter/filterDsl.ts:529](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L529)

___

### getDataOwner

▸ **getDataOwner**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/filter/filterDsl.ts:499](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L499)

___

### intersection

▸ **intersection**(`filters`): [`DataSampleFilter`](DataSampleFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`DataSampleFilter`](DataSampleFilter.md)[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter.md)

#### Defined in

[src/filter/filterDsl.ts:544](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L544)

___

### union

▸ **union**(`filters`): [`DataSampleFilter`](DataSampleFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`DataSampleFilter`](DataSampleFilter.md)[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter.md)

#### Defined in

[src/filter/filterDsl.ts:539](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L539)

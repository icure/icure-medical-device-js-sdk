[@icure/medical-device-sdk](../modules.md) / HealthcareElementFilter

# Class: HealthcareElementFilter

## Implements

- `FilterBuilder`<[`HealthcareElement`](HealthcareElement.md)\>

## Table of contents

### Constructors

- [constructor](HealthcareElementFilter.md#constructor)

### Properties

- [\_byIdentifiers](HealthcareElementFilter.md#_byidentifiers)
- [\_byIds](HealthcareElementFilter.md#_byids)
- [\_byLabelCodeFilter](HealthcareElementFilter.md#_bylabelcodefilter)
- [\_forDataOwner](HealthcareElementFilter.md#_fordataowner)
- [\_forPatients](HealthcareElementFilter.md#_forpatients)
- [\_intersection](HealthcareElementFilter.md#_intersection)
- [\_union](HealthcareElementFilter.md#_union)

### Methods

- [build](HealthcareElementFilter.md#build)
- [byIdentifiers](HealthcareElementFilter.md#byidentifiers)
- [byIds](HealthcareElementFilter.md#byids)
- [byLabelCodeFilter](HealthcareElementFilter.md#bylabelcodefilter)
- [forDataOwner](HealthcareElementFilter.md#fordataowner)
- [forPatients](HealthcareElementFilter.md#forpatients)
- [getDataOwner](HealthcareElementFilter.md#getdataowner)
- [intersection](HealthcareElementFilter.md#intersection)
- [union](HealthcareElementFilter.md#union)

## Constructors

### constructor

• **new HealthcareElementFilter**()

## Properties

### \_byIdentifiers

• `Optional` **\_byIdentifiers**: [`Identifier`](Identifier.md)[]

#### Defined in

[src/filter/filterDsl.ts:347](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L347)

___

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:346](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L346)

___

### \_byLabelCodeFilter

• `Optional` **\_byLabelCodeFilter**: `HealthcareElementByHealthcarePartyLabelCodeFilter`

#### Defined in

[src/filter/filterDsl.ts:348](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L348)

___

### \_forDataOwner

• `Optional` **\_forDataOwner**: `string`

#### Defined in

[src/filter/filterDsl.ts:341](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L341)

___

### \_forPatients

• `Optional` **\_forPatients**: [`IccCryptoXApi`, [`PotentiallyEncryptedPatient`](../interfaces/PotentiallyEncryptedPatient.md)[]]

#### Defined in

[src/filter/filterDsl.ts:349](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L349)

___

### \_intersection

• `Optional` **\_intersection**: [`HealthcareElementFilter`](HealthcareElementFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:351](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L351)

___

### \_union

• `Optional` **\_union**: [`HealthcareElementFilter`](HealthcareElementFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:350](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L350)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`HealthcareElement`](HealthcareElement.md)\>\>

#### Returns

`Promise`<`Filter`<[`HealthcareElement`](HealthcareElement.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:394](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L394)

___

### byIdentifiers

▸ **byIdentifiers**(`identifiers`): [`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifiers` | [`Identifier`](Identifier.md)[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Defined in

[src/filter/filterDsl.ts:363](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L363)

___

### byIds

▸ **byIds**(`byIds`): [`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Defined in

[src/filter/filterDsl.ts:358](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L358)

___

### byLabelCodeFilter

▸ **byLabelCodeFilter**(`tagType?`, `tagCode?`, `codeType?`, `codeCode?`): [`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagType?` | `string` |
| `tagCode?` | `string` |
| `codeType?` | `string` |
| `codeCode?` | `string` |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Defined in

[src/filter/filterDsl.ts:368](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L368)

___

### forDataOwner

▸ **forDataOwner**(`dataOwnerId`): [`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwnerId` | `string` |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Defined in

[src/filter/filterDsl.ts:353](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L353)

___

### forPatients

▸ **forPatients**(`crypto`, `patients`): [`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `crypto` | `IccCryptoXApi` |
| `patients` | [`PotentiallyEncryptedPatient`](../interfaces/PotentiallyEncryptedPatient.md)[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Defined in

[src/filter/filterDsl.ts:379](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L379)

___

### getDataOwner

▸ **getDataOwner**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/filter/filterDsl.ts:342](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L342)

___

### intersection

▸ **intersection**(`filters`): [`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`HealthcareElementFilter`](HealthcareElementFilter.md)[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Defined in

[src/filter/filterDsl.ts:389](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L389)

___

### union

▸ **union**(`filters`): [`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`HealthcareElementFilter`](HealthcareElementFilter.md)[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Defined in

[src/filter/filterDsl.ts:384](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/filter/filterDsl.ts#L384)

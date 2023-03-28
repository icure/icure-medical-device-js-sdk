[@icure/medical-device-sdk](../modules) / HealthcareElementFilter

# Class: HealthcareElementFilter

## Implements

- `FilterBuilder`<[`HealthcareElement`](HealthcareElement)\>

## Table of contents

### Constructors

- [constructor](HealthcareElementFilter#constructor)

### Properties

- [\_byIdentifiers](HealthcareElementFilter#_byidentifiers)
- [\_byIds](HealthcareElementFilter#_byids)
- [\_byLabelCodeFilter](HealthcareElementFilter#_bylabelcodefilter)
- [\_forDataOwner](HealthcareElementFilter#_fordataowner)
- [\_forPatients](HealthcareElementFilter#_forpatients)
- [\_intersection](HealthcareElementFilter#_intersection)
- [\_union](HealthcareElementFilter#_union)

### Methods

- [build](HealthcareElementFilter#build)
- [byIdentifiers](HealthcareElementFilter#byidentifiers)
- [byIds](HealthcareElementFilter#byids)
- [byLabelCodeFilter](HealthcareElementFilter#bylabelcodefilter)
- [forDataOwner](HealthcareElementFilter#fordataowner)
- [forPatients](HealthcareElementFilter#forpatients)
- [getDataOwner](HealthcareElementFilter#getdataowner)
- [intersection](HealthcareElementFilter#intersection)
- [union](HealthcareElementFilter#union)

## Constructors

### constructor

• **new HealthcareElementFilter**()

## Properties

### \_byIdentifiers

• `Optional` **\_byIdentifiers**: [`Identifier`](Identifier)[]

#### Defined in

[src/filter/filterDsl.ts:347](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L347)

___

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:346](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L346)

___

### \_byLabelCodeFilter

• `Optional` **\_byLabelCodeFilter**: `HealthcareElementByHealthcarePartyLabelCodeFilter`

#### Defined in

[src/filter/filterDsl.ts:348](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L348)

___

### \_forDataOwner

• `Optional` **\_forDataOwner**: `string`

#### Defined in

[src/filter/filterDsl.ts:341](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L341)

___

### \_forPatients

• `Optional` **\_forPatients**: [`IccCryptoXApi`, [`PotentiallyEncryptedPatient`](../interfaces/PotentiallyEncryptedPatient)[]]

#### Defined in

[src/filter/filterDsl.ts:349](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L349)

___

### \_intersection

• `Optional` **\_intersection**: [`HealthcareElementFilter`](HealthcareElementFilter)[]

#### Defined in

[src/filter/filterDsl.ts:351](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L351)

___

### \_union

• `Optional` **\_union**: [`HealthcareElementFilter`](HealthcareElementFilter)[]

#### Defined in

[src/filter/filterDsl.ts:350](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L350)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`HealthcareElement`](HealthcareElement)\>\>

#### Returns

`Promise`<`Filter`<[`HealthcareElement`](HealthcareElement)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:394](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L394)

___

### byIdentifiers

▸ **byIdentifiers**(`identifiers`): [`HealthcareElementFilter`](HealthcareElementFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifiers` | [`Identifier`](Identifier)[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter)

#### Defined in

[src/filter/filterDsl.ts:363](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L363)

___

### byIds

▸ **byIds**(`byIds`): [`HealthcareElementFilter`](HealthcareElementFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter)

#### Defined in

[src/filter/filterDsl.ts:358](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L358)

___

### byLabelCodeFilter

▸ **byLabelCodeFilter**(`tagType?`, `tagCode?`, `codeType?`, `codeCode?`): [`HealthcareElementFilter`](HealthcareElementFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagType?` | `string` |
| `tagCode?` | `string` |
| `codeType?` | `string` |
| `codeCode?` | `string` |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter)

#### Defined in

[src/filter/filterDsl.ts:368](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L368)

___

### forDataOwner

▸ **forDataOwner**(`dataOwnerId`): [`HealthcareElementFilter`](HealthcareElementFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwnerId` | `string` |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter)

#### Defined in

[src/filter/filterDsl.ts:353](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L353)

___

### forPatients

▸ **forPatients**(`crypto`, `patients`): [`HealthcareElementFilter`](HealthcareElementFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `crypto` | `IccCryptoXApi` |
| `patients` | [`PotentiallyEncryptedPatient`](../interfaces/PotentiallyEncryptedPatient)[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter)

#### Defined in

[src/filter/filterDsl.ts:379](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L379)

___

### getDataOwner

▸ **getDataOwner**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/filter/filterDsl.ts:342](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L342)

___

### intersection

▸ **intersection**(`filters`): [`HealthcareElementFilter`](HealthcareElementFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`HealthcareElementFilter`](HealthcareElementFilter)[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter)

#### Defined in

[src/filter/filterDsl.ts:389](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L389)

___

### union

▸ **union**(`filters`): [`HealthcareElementFilter`](HealthcareElementFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`HealthcareElementFilter`](HealthcareElementFilter)[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter)

#### Defined in

[src/filter/filterDsl.ts:384](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L384)

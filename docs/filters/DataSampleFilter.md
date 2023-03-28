[@icure/medical-device-sdk](../modules) / DataSampleFilter

# Class: DataSampleFilter

## Implements

- `FilterBuilder`<[`DataSample`](DataSample)\>

## Table of contents

### Constructors

- [constructor](DataSampleFilter#constructor)

### Properties

- [\_byHealthcareElementIds](DataSampleFilter#_byhealthcareelementids)
- [\_byIdentifiers](DataSampleFilter#_byidentifiers)
- [\_byIds](DataSampleFilter#_byids)
- [\_byLabelCodeDateFilter](DataSampleFilter#_bylabelcodedatefilter)
- [\_forDataOwner](DataSampleFilter#_fordataowner)
- [\_forPatients](DataSampleFilter#_forpatients)
- [\_intersection](DataSampleFilter#_intersection)
- [\_union](DataSampleFilter#_union)

### Methods

- [build](DataSampleFilter#build)
- [byHealthElementIds](DataSampleFilter#byhealthelementids)
- [byIdentifiers](DataSampleFilter#byidentifiers)
- [byIds](DataSampleFilter#byids)
- [byLabelCodeDateFilter](DataSampleFilter#bylabelcodedatefilter)
- [forDataOwner](DataSampleFilter#fordataowner)
- [forPatients](DataSampleFilter#forpatients)
- [getDataOwner](DataSampleFilter#getdataowner)
- [intersection](DataSampleFilter#intersection)
- [union](DataSampleFilter#union)

## Constructors

### constructor

• **new DataSampleFilter**()

## Properties

### \_byHealthcareElementIds

• `Optional` **\_byHealthcareElementIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:581](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L581)

___

### \_byIdentifiers

• `Optional` **\_byIdentifiers**: [`Identifier`](Identifier)[]

#### Defined in

[src/filter/filterDsl.ts:582](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L582)

___

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:580](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L580)

___

### \_byLabelCodeDateFilter

• `Optional` **\_byLabelCodeDateFilter**: `DataSampleByHealthcarePartyTagCodeDateFilter`

#### Defined in

[src/filter/filterDsl.ts:583](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L583)

___

### \_forDataOwner

• `Optional` **\_forDataOwner**: `string`

#### Defined in

[src/filter/filterDsl.ts:575](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L575)

___

### \_forPatients

• `Optional` **\_forPatients**: [`IccCryptoXApi`, [`PotentiallyEncryptedPatient`](../interfaces/PotentiallyEncryptedPatient)[]]

#### Defined in

[src/filter/filterDsl.ts:584](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L584)

___

### \_intersection

• `Optional` **\_intersection**: [`DataSampleFilter`](DataSampleFilter)[]

#### Defined in

[src/filter/filterDsl.ts:586](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L586)

___

### \_union

• `Optional` **\_union**: [`DataSampleFilter`](DataSampleFilter)[]

#### Defined in

[src/filter/filterDsl.ts:585](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L585)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`DataSample`](DataSample)\>\>

#### Returns

`Promise`<`Filter`<[`DataSample`](DataSample)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:643](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L643)

___

### byHealthElementIds

▸ **byHealthElementIds**(`byHealthElementIds`): [`DataSampleFilter`](DataSampleFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byHealthElementIds` | `string`[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter)

#### Defined in

[src/filter/filterDsl.ts:628](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L628)

___

### byIdentifiers

▸ **byIdentifiers**(`identifiers`): [`DataSampleFilter`](DataSampleFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifiers` | [`Identifier`](Identifier)[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter)

#### Defined in

[src/filter/filterDsl.ts:598](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L598)

___

### byIds

▸ **byIds**(`byIds`): [`DataSampleFilter`](DataSampleFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter)

#### Defined in

[src/filter/filterDsl.ts:593](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L593)

___

### byLabelCodeDateFilter

▸ **byLabelCodeDateFilter**(`tagType?`, `tagCode?`, `codeType?`, `codeCode?`, `startValueDate?`, `endValueDate?`): [`DataSampleFilter`](DataSampleFilter)

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

[`DataSampleFilter`](DataSampleFilter)

#### Defined in

[src/filter/filterDsl.ts:603](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L603)

___

### forDataOwner

▸ **forDataOwner**(`dataOwnerId`): [`DataSampleFilter`](DataSampleFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwnerId` | `string` |

#### Returns

[`DataSampleFilter`](DataSampleFilter)

#### Defined in

[src/filter/filterDsl.ts:588](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L588)

___

### forPatients

▸ **forPatients**(`crypto`, `patients`): [`DataSampleFilter`](DataSampleFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `crypto` | `IccCryptoXApi` |
| `patients` | [`PotentiallyEncryptedPatient`](../interfaces/PotentiallyEncryptedPatient)[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter)

#### Defined in

[src/filter/filterDsl.ts:623](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L623)

___

### getDataOwner

▸ **getDataOwner**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/filter/filterDsl.ts:576](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L576)

___

### intersection

▸ **intersection**(`filters`): [`DataSampleFilter`](DataSampleFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`DataSampleFilter`](DataSampleFilter)[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter)

#### Defined in

[src/filter/filterDsl.ts:638](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L638)

___

### union

▸ **union**(`filters`): [`DataSampleFilter`](DataSampleFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`DataSampleFilter`](DataSampleFilter)[] |

#### Returns

[`DataSampleFilter`](DataSampleFilter)

#### Defined in

[src/filter/filterDsl.ts:633](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L633)

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
- [\_byTagCodeFilter](HealthcareElementFilter.md#_bytagcodefilter)
- [\_forDataOwner](HealthcareElementFilter.md#_fordataowner)
- [\_forPatients](HealthcareElementFilter.md#_forpatients)
- [\_intersection](HealthcareElementFilter.md#_intersection)
- [\_union](HealthcareElementFilter.md#_union)

### Methods

- [build](HealthcareElementFilter.md#build)
- [byIdentifiers](HealthcareElementFilter.md#byidentifiers)
- [byIds](HealthcareElementFilter.md#byids)
- [byTagCodeFilter](HealthcareElementFilter.md#bytagcodefilter)
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

[src/filter/filterDsl.ts:302](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L302)

___

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:301](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L301)

___

### \_byTagCodeFilter

• `Optional` **\_byTagCodeFilter**: `HealthcareElementByHealthcarePartyLabelCodeFilter`

#### Defined in

[src/filter/filterDsl.ts:303](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L303)

___

### \_forDataOwner

• `Optional` **\_forDataOwner**: `string`

#### Defined in

[src/filter/filterDsl.ts:298](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L298)

___

### \_forPatients

• `Optional` **\_forPatients**: [`IccCryptoXApi`, [`Patient`](Patient.md)[]]

#### Defined in

[src/filter/filterDsl.ts:304](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L304)

___

### \_intersection

• `Optional` **\_intersection**: [`HealthcareElementFilter`](HealthcareElementFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:306](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L306)

___

### \_union

• `Optional` **\_union**: [`HealthcareElementFilter`](HealthcareElementFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:305](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L305)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`HealthcareElement`](HealthcareElement.md)\>\>

#### Returns

`Promise`<`Filter`<[`HealthcareElement`](HealthcareElement.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:343](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L343)

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

[src/filter/filterDsl.ts:318](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L318)

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

[src/filter/filterDsl.ts:313](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L313)

___

### byTagCodeFilter

▸ **byTagCodeFilter**(`tagType?`, `tagCode?`, `codeType?`, `codeCode?`): [`HealthcareElementFilter`](HealthcareElementFilter.md)

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

[src/filter/filterDsl.ts:323](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L323)

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

[src/filter/filterDsl.ts:308](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L308)

___

### forPatients

▸ **forPatients**(`crypto`, `patients`): [`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `crypto` | `IccCryptoXApi` |
| `patients` | [`Patient`](Patient.md)[] |

#### Returns

[`HealthcareElementFilter`](HealthcareElementFilter.md)

#### Defined in

[src/filter/filterDsl.ts:328](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L328)

___

### getDataOwner

▸ **getDataOwner**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/filter/filterDsl.ts:299](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L299)

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

[src/filter/filterDsl.ts:338](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L338)

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

[src/filter/filterDsl.ts:333](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L333)

[@icure/medical-device-sdk](../modules.md) / PatientFilter

# Class: PatientFilter

## Implements

- `FilterBuilder`<[`Patient`](Patient.md)\>

## Table of contents

### Constructors

- [constructor](PatientFilter.md#constructor)

### Properties

- [\_byGenderEducationProfession](PatientFilter.md#_bygendereducationprofession)
- [\_byIdentifiers](PatientFilter.md#_byidentifiers)
- [\_byIds](PatientFilter.md#_byids)
- [\_containsFuzzy](PatientFilter.md#_containsfuzzy)
- [\_dateOfBirthBetween](PatientFilter.md#_dateofbirthbetween)
- [\_forDataOwner](PatientFilter.md#_fordataowner)
- [\_intersection](PatientFilter.md#_intersection)
- [\_union](PatientFilter.md#_union)
- [\_withSsins](PatientFilter.md#_withssins)

### Methods

- [build](PatientFilter.md#build)
- [byGenderEducationProfession](PatientFilter.md#bygendereducationprofession)
- [byIdentifiers](PatientFilter.md#byidentifiers)
- [byIds](PatientFilter.md#byids)
- [containsFuzzy](PatientFilter.md#containsfuzzy)
- [dateOfBirthBetween](PatientFilter.md#dateofbirthbetween)
- [forDataOwner](PatientFilter.md#fordataowner)
- [getDataOwner](PatientFilter.md#getdataowner)
- [intersection](PatientFilter.md#intersection)
- [ofAge](PatientFilter.md#ofage)
- [union](PatientFilter.md#union)
- [withSsins](PatientFilter.md#withssins)

## Constructors

### constructor

• **new PatientFilter**()

## Properties

### \_byGenderEducationProfession

• `Optional` **\_byGenderEducationProfession**: [[`PatientGenderEnum`](../modules.md#patientgenderenum), `undefined` \| `string`, `undefined` \| `string`]

#### Defined in

[src/filter/filterDsl.ts:120](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L120)

___

### \_byIdentifiers

• `Optional` **\_byIdentifiers**: [`Identifier`](Identifier.md)[]

#### Defined in

[src/filter/filterDsl.ts:117](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L117)

___

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:116](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L116)

___

### \_containsFuzzy

• `Optional` **\_containsFuzzy**: `string`

#### Defined in

[src/filter/filterDsl.ts:121](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L121)

___

### \_dateOfBirthBetween

• `Optional` **\_dateOfBirthBetween**: [`number`, `number`]

#### Defined in

[src/filter/filterDsl.ts:119](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L119)

___

### \_forDataOwner

• `Optional` **\_forDataOwner**: `string`

#### Defined in

[src/filter/filterDsl.ts:110](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L110)

___

### \_intersection

• `Optional` **\_intersection**: [`PatientFilter`](PatientFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:123](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L123)

___

### \_union

• `Optional` **\_union**: [`PatientFilter`](PatientFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:122](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L122)

___

### \_withSsins

• `Optional` **\_withSsins**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:118](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L118)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`Patient`](Patient.md)\>\>

#### Returns

`Promise`<`Filter`<[`Patient`](Patient.md)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:178](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L178)

___

### byGenderEducationProfession

▸ **byGenderEducationProfession**(`gender`, `education?`, `profession?`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gender` | [`PatientGenderEnum`](../modules.md#patientgenderenum) |
| `education?` | `string` |
| `profession?` | `string` |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:140](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L140)

___

### byIdentifiers

▸ **byIdentifiers**(`identifiers`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifiers` | [`Identifier`](Identifier.md)[] |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:135](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L135)

___

### byIds

▸ **byIds**(`byIds`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:130](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L130)

___

### containsFuzzy

▸ **containsFuzzy**(`searchString`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:163](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L163)

___

### dateOfBirthBetween

▸ **dateOfBirthBetween**(`from`, `to`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |
| `to` | `number` |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:158](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L158)

___

### forDataOwner

▸ **forDataOwner**(`dataOwnerId`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwnerId` | `string` |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:125](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L125)

___

### getDataOwner

▸ **getDataOwner**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/filter/filterDsl.ts:112](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L112)

___

### intersection

▸ **intersection**(`filters`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`PatientFilter`](PatientFilter.md)[] |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:173](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L173)

___

### ofAge

▸ **ofAge**(`age`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `age` | `number` |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:150](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L150)

___

### union

▸ **union**(`filters`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`PatientFilter`](PatientFilter.md)[] |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:168](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L168)

___

### withSsins

▸ **withSsins**(`withSsins`): [`PatientFilter`](PatientFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `withSsins` | `string`[] |

#### Returns

[`PatientFilter`](PatientFilter.md)

#### Defined in

[src/filter/filterDsl.ts:145](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L145)

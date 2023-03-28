[@icure/medical-device-sdk](../modules) / PatientFilter

# Class: PatientFilter

## Implements

- `FilterBuilder`<[`Patient`](Patient)\>

## Table of contents

### Constructors

- [constructor](PatientFilter#constructor)

### Properties

- [\_byGenderEducationProfession](PatientFilter#_bygendereducationprofession)
- [\_byIdentifiers](PatientFilter#_byidentifiers)
- [\_byIds](PatientFilter#_byids)
- [\_containsFuzzy](PatientFilter#_containsfuzzy)
- [\_dateOfBirthBetween](PatientFilter#_dateofbirthbetween)
- [\_forDataOwner](PatientFilter#_fordataowner)
- [\_intersection](PatientFilter#_intersection)
- [\_union](PatientFilter#_union)
- [\_withSsins](PatientFilter#_withssins)

### Methods

- [build](PatientFilter#build)
- [byGenderEducationProfession](PatientFilter#bygendereducationprofession)
- [byIdentifiers](PatientFilter#byidentifiers)
- [byIds](PatientFilter#byids)
- [containsFuzzy](PatientFilter#containsfuzzy)
- [dateOfBirthBetween](PatientFilter#dateofbirthbetween)
- [forDataOwner](PatientFilter#fordataowner)
- [getDataOwner](PatientFilter#getdataowner)
- [intersection](PatientFilter#intersection)
- [ofAge](PatientFilter#ofage)
- [union](PatientFilter#union)
- [withSsins](PatientFilter#withssins)

## Constructors

### constructor

• **new PatientFilter**()

## Properties

### \_byGenderEducationProfession

• `Optional` **\_byGenderEducationProfession**: [[`PatientGenderEnum`](../modules#patientgenderenum), `undefined` \| `string`, `undefined` \| `string`]

#### Defined in

[src/filter/filterDsl.ts:115](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L115)

___

### \_byIdentifiers

• `Optional` **\_byIdentifiers**: [`Identifier`](Identifier)[]

#### Defined in

[src/filter/filterDsl.ts:112](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L112)

___

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:111](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L111)

___

### \_containsFuzzy

• `Optional` **\_containsFuzzy**: `string`

#### Defined in

[src/filter/filterDsl.ts:116](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L116)

___

### \_dateOfBirthBetween

• `Optional` **\_dateOfBirthBetween**: [`number`, `number`]

#### Defined in

[src/filter/filterDsl.ts:114](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L114)

___

### \_forDataOwner

• `Optional` **\_forDataOwner**: `string`

#### Defined in

[src/filter/filterDsl.ts:105](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L105)

___

### \_intersection

• `Optional` **\_intersection**: [`PatientFilter`](PatientFilter)[]

#### Defined in

[src/filter/filterDsl.ts:118](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L118)

___

### \_union

• `Optional` **\_union**: [`PatientFilter`](PatientFilter)[]

#### Defined in

[src/filter/filterDsl.ts:117](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L117)

___

### \_withSsins

• `Optional` **\_withSsins**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:113](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L113)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`Patient`](Patient)\>\>

#### Returns

`Promise`<`Filter`<[`Patient`](Patient)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:173](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L173)

___

### byGenderEducationProfession

▸ **byGenderEducationProfession**(`gender`, `education?`, `profession?`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gender` | [`PatientGenderEnum`](../modules#patientgenderenum) |
| `education?` | `string` |
| `profession?` | `string` |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:135](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L135)

___

### byIdentifiers

▸ **byIdentifiers**(`identifiers`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifiers` | [`Identifier`](Identifier)[] |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:130](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L130)

___

### byIds

▸ **byIds**(`byIds`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:125](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L125)

___

### containsFuzzy

▸ **containsFuzzy**(`searchString`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:158](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L158)

___

### dateOfBirthBetween

▸ **dateOfBirthBetween**(`from`, `to`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |
| `to` | `number` |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:153](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L153)

___

### forDataOwner

▸ **forDataOwner**(`dataOwnerId`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwnerId` | `string` |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:120](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L120)

___

### getDataOwner

▸ **getDataOwner**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/filter/filterDsl.ts:107](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L107)

___

### intersection

▸ **intersection**(`filters`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`PatientFilter`](PatientFilter)[] |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:168](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L168)

___

### ofAge

▸ **ofAge**(`age`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `age` | `number` |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:145](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L145)

___

### union

▸ **union**(`filters`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`PatientFilter`](PatientFilter)[] |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:163](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L163)

___

### withSsins

▸ **withSsins**(`withSsins`): [`PatientFilter`](PatientFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `withSsins` | `string`[] |

#### Returns

[`PatientFilter`](PatientFilter)

#### Defined in

[src/filter/filterDsl.ts:140](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L140)

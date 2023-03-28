[@icure/medical-device-sdk](../modules) / HealthcareProfessionalFilter

# Class: HealthcareProfessionalFilter

## Implements

- `FilterBuilder`<[`HealthcareProfessional`](HealthcareProfessional)\>

## Table of contents

### Constructors

- [constructor](HealthcareProfessionalFilter#constructor)

### Properties

- [\_byIds](HealthcareProfessionalFilter#_byids)
- [\_byLabelCodeFilter](HealthcareProfessionalFilter#_bylabelcodefilter)
- [\_intersection](HealthcareProfessionalFilter#_intersection)
- [\_matches](HealthcareProfessionalFilter#_matches)
- [\_union](HealthcareProfessionalFilter#_union)

### Methods

- [build](HealthcareProfessionalFilter#build)
- [byIds](HealthcareProfessionalFilter#byids)
- [byLabelCodeFilter](HealthcareProfessionalFilter#bylabelcodefilter)
- [byMatches](HealthcareProfessionalFilter#bymatches)
- [intersection](HealthcareProfessionalFilter#intersection)
- [union](HealthcareProfessionalFilter#union)

## Constructors

### constructor

• **new HealthcareProfessionalFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:236](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L236)

___

### \_byLabelCodeFilter

• `Optional` **\_byLabelCodeFilter**: `HealthcareProfessionalByLabelCodeFilter`

#### Defined in

[src/filter/filterDsl.ts:239](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L239)

___

### \_intersection

• `Optional` **\_intersection**: [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)[]

#### Defined in

[src/filter/filterDsl.ts:238](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L238)

___

### \_matches

• `Optional` **\_matches**: `string`

#### Defined in

[src/filter/filterDsl.ts:235](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L235)

___

### \_union

• `Optional` **\_union**: [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)[]

#### Defined in

[src/filter/filterDsl.ts:237](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L237)

## Methods

### build

▸ **build**(): `Promise`<`Filter`<[`HealthcareProfessional`](HealthcareProfessional)\>\>

#### Returns

`Promise`<`Filter`<[`HealthcareProfessional`](HealthcareProfessional)\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:272](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L272)

___

### byIds

▸ **byIds**(`byIds`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byIds` | `string`[] |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Defined in

[src/filter/filterDsl.ts:241](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L241)

___

### byLabelCodeFilter

▸ **byLabelCodeFilter**(`labelType?`, `labelCode?`, `codeType?`, `codeCode?`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `labelType?` | `string` |
| `labelCode?` | `string` |
| `codeType?` | `string` |
| `codeCode?` | `string` |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Defined in

[src/filter/filterDsl.ts:246](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L246)

___

### byMatches

▸ **byMatches**(`searchString`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Defined in

[src/filter/filterDsl.ts:257](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L257)

___

### intersection

▸ **intersection**(`filters`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)[] |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Defined in

[src/filter/filterDsl.ts:267](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L267)

___

### union

▸ **union**(`filters`): [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)[] |

#### Returns

[`HealthcareProfessionalFilter`](HealthcareProfessionalFilter)

#### Defined in

[src/filter/filterDsl.ts:262](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L262)

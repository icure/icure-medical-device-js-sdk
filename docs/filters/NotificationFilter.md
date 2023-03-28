[@icure/medical-device-sdk](../modules) / NotificationFilter

# Class: NotificationFilter

## Implements

- `FilterBuilder`<`Notification`\>

## Table of contents

### Constructors

- [constructor](NotificationFilter#constructor)

### Properties

- [\_byIds](NotificationFilter#_byids)
- [\_dataOwnerId](NotificationFilter#_dataownerid)
- [\_fromDate](NotificationFilter#_fromdate)
- [\_intersection](NotificationFilter#_intersection)
- [\_type](NotificationFilter#_type)
- [\_union](NotificationFilter#_union)

### Methods

- [afterDate](NotificationFilter#afterdate)
- [build](NotificationFilter#build)
- [byIds](NotificationFilter#byids)
- [forDataOwner](NotificationFilter#fordataowner)
- [intersection](NotificationFilter#intersection)
- [union](NotificationFilter#union)
- [withType](NotificationFilter#withtype)

## Constructors

### constructor

• **new NotificationFilter**()

## Properties

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:504](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L504)

___

### \_dataOwnerId

• `Optional` **\_dataOwnerId**: `string`

#### Defined in

[src/filter/filterDsl.ts:506](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L506)

___

### \_fromDate

• `Optional` **\_fromDate**: `number`

#### Defined in

[src/filter/filterDsl.ts:505](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L505)

___

### \_intersection

• `Optional` **\_intersection**: [`NotificationFilter`](NotificationFilter)[]

#### Defined in

[src/filter/filterDsl.ts:503](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L503)

___

### \_type

• `Optional` **\_type**: `NotificationTypeEnum`

#### Defined in

[src/filter/filterDsl.ts:507](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L507)

___

### \_union

• `Optional` **\_union**: [`NotificationFilter`](NotificationFilter)[]

#### Defined in

[src/filter/filterDsl.ts:502](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L502)

## Methods

### afterDate

▸ **afterDate**(`fromDate`): [`NotificationFilter`](NotificationFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromDate` | `number` |

#### Returns

[`NotificationFilter`](NotificationFilter)

#### Defined in

[src/filter/filterDsl.ts:524](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L524)

___

### build

▸ **build**(): `Promise`<`Filter`<`Notification`\>\>

#### Returns

`Promise`<`Filter`<`Notification`\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:539](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L539)

___

### byIds

▸ **byIds**(`ids`): [`NotificationFilter`](NotificationFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

[`NotificationFilter`](NotificationFilter)

#### Defined in

[src/filter/filterDsl.ts:509](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L509)

___

### forDataOwner

▸ **forDataOwner**(`dataOwnerId`): [`NotificationFilter`](NotificationFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwnerId` | `string` |

#### Returns

[`NotificationFilter`](NotificationFilter)

#### Defined in

[src/filter/filterDsl.ts:514](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L514)

___

### intersection

▸ **intersection**(`filters`): [`NotificationFilter`](NotificationFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`NotificationFilter`](NotificationFilter)[] |

#### Returns

[`NotificationFilter`](NotificationFilter)

#### Defined in

[src/filter/filterDsl.ts:534](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L534)

___

### union

▸ **union**(`filters`): [`NotificationFilter`](NotificationFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`NotificationFilter`](NotificationFilter)[] |

#### Returns

[`NotificationFilter`](NotificationFilter)

#### Defined in

[src/filter/filterDsl.ts:529](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L529)

___

### withType

▸ **withType**(`type`): [`NotificationFilter`](NotificationFilter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `NotificationTypeEnum` |

#### Returns

[`NotificationFilter`](NotificationFilter)

#### Defined in

[src/filter/filterDsl.ts:519](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/filter/filterDsl.ts#L519)

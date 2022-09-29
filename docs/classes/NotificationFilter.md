[@icure/medical-device-sdk](../modules.md) / NotificationFilter

# Class: NotificationFilter

## Implements

- `FilterBuilder`<`Notification`\>

## Table of contents

### Constructors

- [constructor](NotificationFilter.md#constructor)

### Properties

- [\_afterDate](NotificationFilter.md#_afterdate)
- [\_byIds](NotificationFilter.md#_byids)
- [\_dataOwnerId](NotificationFilter.md#_dataownerid)
- [\_intersection](NotificationFilter.md#_intersection)
- [\_type](NotificationFilter.md#_type)
- [\_union](NotificationFilter.md#_union)

### Methods

- [afterDateFilter](NotificationFilter.md#afterdatefilter)
- [build](NotificationFilter.md#build)
- [byIdFilter](NotificationFilter.md#byidfilter)
- [forDataOwner](NotificationFilter.md#fordataowner)
- [intersection](NotificationFilter.md#intersection)
- [union](NotificationFilter.md#union)
- [withType](NotificationFilter.md#withtype)

## Constructors

### constructor

• **new NotificationFilter**()

## Properties

### \_afterDate

• `Optional` **\_afterDate**: `number`

#### Defined in

[src/filter/filterDsl.ts:435](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L435)

___

### \_byIds

• `Optional` **\_byIds**: `string`[]

#### Defined in

[src/filter/filterDsl.ts:434](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L434)

___

### \_dataOwnerId

• `Optional` **\_dataOwnerId**: `string`

#### Defined in

[src/filter/filterDsl.ts:436](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L436)

___

### \_intersection

• `Optional` **\_intersection**: [`NotificationFilter`](NotificationFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:433](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L433)

___

### \_type

• `Optional` **\_type**: `NotificationTypeEnum`

#### Defined in

[src/filter/filterDsl.ts:437](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L437)

___

### \_union

• `Optional` **\_union**: [`NotificationFilter`](NotificationFilter.md)[]

#### Defined in

[src/filter/filterDsl.ts:432](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L432)

## Methods

### afterDateFilter

▸ **afterDateFilter**(`date`): [`NotificationFilter`](NotificationFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `number` |

#### Returns

[`NotificationFilter`](NotificationFilter.md)

#### Defined in

[src/filter/filterDsl.ts:455](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L455)

___

### build

▸ **build**(): `Promise`<`Filter`<`Notification`\>\>

#### Returns

`Promise`<`Filter`<`Notification`\>\>

#### Implementation of

FilterBuilder.build

#### Defined in

[src/filter/filterDsl.ts:473](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L473)

___

### byIdFilter

▸ **byIdFilter**(`ids`): [`NotificationFilter`](NotificationFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

[`NotificationFilter`](NotificationFilter.md)

#### Defined in

[src/filter/filterDsl.ts:439](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L439)

___

### forDataOwner

▸ **forDataOwner**(`dataOwnerId`): [`NotificationFilter`](NotificationFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwnerId` | `string` |

#### Returns

[`NotificationFilter`](NotificationFilter.md)

#### Defined in

[src/filter/filterDsl.ts:445](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L445)

___

### intersection

▸ **intersection**(`filters`): [`NotificationFilter`](NotificationFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`NotificationFilter`](NotificationFilter.md)[] |

#### Returns

[`NotificationFilter`](NotificationFilter.md)

#### Defined in

[src/filter/filterDsl.ts:468](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L468)

___

### union

▸ **union**(`filters`): [`NotificationFilter`](NotificationFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`NotificationFilter`](NotificationFilter.md)[] |

#### Returns

[`NotificationFilter`](NotificationFilter.md)

#### Defined in

[src/filter/filterDsl.ts:463](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L463)

___

### withType

▸ **withType**(`type`): [`NotificationFilter`](NotificationFilter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `NotificationTypeEnum` |

#### Returns

[`NotificationFilter`](NotificationFilter.md)

#### Defined in

[src/filter/filterDsl.ts:450](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/filter/filterDsl.ts#L450)

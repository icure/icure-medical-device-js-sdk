[@icure/medical-device-sdk](../modules.md) / Content

# Class: Content

Information contained in the data sample (Measure, number, ...). Content is localized, using ISO language code as key

## Table of contents

### Constructors

- [constructor](Content.md#constructor)

### Properties

- [binaryValue](Content.md#binaryvalue)
- [booleanValue](Content.md#booleanvalue)
- [compoundValue](Content.md#compoundvalue)
- [documentId](Content.md#documentid)
- [fuzzyDateValue](Content.md#fuzzydatevalue)
- [instantValue](Content.md#instantvalue)
- [measureValue](Content.md#measurevalue)
- [numberValue](Content.md#numbervalue)
- [range](Content.md#range)
- [ratio](Content.md#ratio)
- [stringValue](Content.md#stringvalue)
- [timeSeries](Content.md#timeseries)

### Methods

- [marshal](Content.md#marshal)

## Constructors

### constructor

• **new Content**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IContent` |

#### Defined in

[src/models/Content.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L22)

## Properties

### binaryValue

• `Optional` **binaryValue**: `ArrayBuffer`

#### Defined in

[src/models/Content.ts:43](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L43)

___

### booleanValue

• `Optional` **booleanValue**: `boolean`

#### Defined in

[src/models/Content.ts:37](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L37)

___

### compoundValue

• `Optional` **compoundValue**: [`DataSample`](DataSample.md)[]

#### Defined in

[src/models/Content.ts:50](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L50)

___

### documentId

• `Optional` **documentId**: `string`

Linked document.

#### Defined in

[src/models/Content.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L47)

___

### fuzzyDateValue

• `Optional` **fuzzyDateValue**: `number`

Value as date. The format could have a all three (day, month and year) or values on any of these three, whatever is known.

#### Defined in

[src/models/Content.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L42)

___

### instantValue

• `Optional` **instantValue**: `number`

#### Defined in

[src/models/Content.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L38)

___

### measureValue

• `Optional` **measureValue**: [`Measure`](Measure.md)

#### Defined in

[src/models/Content.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L48)

___

### numberValue

• `Optional` **numberValue**: `number`

#### Defined in

[src/models/Content.ts:36](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L36)

___

### range

• `Optional` **range**: [`Measure`](Measure.md)[]

#### Defined in

[src/models/Content.ts:52](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L52)

___

### ratio

• `Optional` **ratio**: [`Measure`](Measure.md)[]

#### Defined in

[src/models/Content.ts:51](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L51)

___

### stringValue

• `Optional` **stringValue**: `string`

#### Defined in

[src/models/Content.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L35)

___

### timeSeries

• `Optional` **timeSeries**: [`TimeSeries`](TimeSeries.md)

#### Defined in

[src/models/Content.ts:49](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L49)

## Methods

### marshal

▸ **marshal**(): `IContent`

#### Returns

`IContent`

#### Defined in

[src/models/Content.ts:54](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Content.ts#L54)

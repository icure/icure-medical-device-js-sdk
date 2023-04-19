[@icure/medical-device-sdk](../modules) / Content

# Class: Content

Information contained in the data sample (Measure, number, ...). Content is localized, using ISO language code as key

## Table of contents

### Constructors

- [constructor](Content#constructor)

### Properties

- [binaryValue](Content#binaryvalue)
- [booleanValue](Content#booleanvalue)
- [compoundValue](Content#compoundvalue)
- [documentId](Content#documentid)
- [fuzzyDateValue](Content#fuzzydatevalue)
- [instantValue](Content#instantvalue)
- [measureValue](Content#measurevalue)
- [numberValue](Content#numbervalue)
- [range](Content#range)
- [ratio](Content#ratio)
- [stringValue](Content#stringvalue)
- [timeSeries](Content#timeseries)

### Methods

- [marshal](Content#marshal)

## Constructors

### constructor

• **new Content**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IContent` |

#### Defined in

[src/models/Content.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L22)

## Properties

### binaryValue

• `Optional` **binaryValue**: `ArrayBuffer`

#### Defined in

[src/models/Content.ts:43](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L43)

___

### booleanValue

• `Optional` **booleanValue**: `boolean`

#### Defined in

[src/models/Content.ts:37](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L37)

___

### compoundValue

• `Optional` **compoundValue**: [`DataSample`](DataSample)[]

#### Defined in

[src/models/Content.ts:50](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L50)

___

### documentId

• `Optional` **documentId**: `string`

Linked document.

#### Defined in

[src/models/Content.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L47)

___

### fuzzyDateValue

• `Optional` **fuzzyDateValue**: `number`

Value as date. The format could have a all three (day, month and year) or values on any of these three, whatever is known.

#### Defined in

[src/models/Content.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L42)

___

### instantValue

• `Optional` **instantValue**: `number`

#### Defined in

[src/models/Content.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L38)

___

### measureValue

• `Optional` **measureValue**: [`Measure`](Measure)

#### Defined in

[src/models/Content.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L48)

___

### numberValue

• `Optional` **numberValue**: `number`

#### Defined in

[src/models/Content.ts:36](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L36)

___

### range

• `Optional` **range**: [`Measure`](Measure)[]

#### Defined in

[src/models/Content.ts:52](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L52)

___

### ratio

• `Optional` **ratio**: [`Measure`](Measure)[]

#### Defined in

[src/models/Content.ts:51](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L51)

___

### stringValue

• `Optional` **stringValue**: `string`

#### Defined in

[src/models/Content.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L35)

___

### timeSeries

• `Optional` **timeSeries**: [`TimeSeries`](TimeSeries)

#### Defined in

[src/models/Content.ts:49](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L49)

## Methods

### marshal

▸ **marshal**(): `IContent`

#### Returns

`IContent`

#### Defined in

[src/models/Content.ts:54](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Content.ts#L54)

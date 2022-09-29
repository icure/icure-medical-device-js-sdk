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

## Constructors

### constructor

• **new Content**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IContent` |

#### Defined in

[src/models/Content.ts:21](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L21)

## Properties

### binaryValue

• `Optional` **binaryValue**: `ArrayBuffer`

#### Defined in

[src/models/Content.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L33)

___

### booleanValue

• `Optional` **booleanValue**: `boolean`

#### Defined in

[src/models/Content.ts:27](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L27)

___

### compoundValue

• `Optional` **compoundValue**: [`DataSample`](DataSample.md)[]

#### Defined in

[src/models/Content.ts:40](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L40)

___

### documentId

• `Optional` **documentId**: `string`

Linked document.

#### Defined in

[src/models/Content.ts:37](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L37)

___

### fuzzyDateValue

• `Optional` **fuzzyDateValue**: `number`

Value as date. The format could have a all three (day, month and year) or values on any of these three, whatever is known.

#### Defined in

[src/models/Content.ts:32](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L32)

___

### instantValue

• `Optional` **instantValue**: `number`

#### Defined in

[src/models/Content.ts:28](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L28)

___

### measureValue

• `Optional` **measureValue**: [`Measure`](Measure.md)

#### Defined in

[src/models/Content.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L38)

___

### numberValue

• `Optional` **numberValue**: `number`

#### Defined in

[src/models/Content.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L26)

___

### range

• `Optional` **range**: [`Measure`](Measure.md)[]

#### Defined in

[src/models/Content.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L42)

___

### ratio

• `Optional` **ratio**: [`Measure`](Measure.md)[]

#### Defined in

[src/models/Content.ts:41](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L41)

___

### stringValue

• `Optional` **stringValue**: `string`

#### Defined in

[src/models/Content.ts:25](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L25)

___

### timeSeries

• `Optional` **timeSeries**: [`TimeSeries`](TimeSeries.md)

#### Defined in

[src/models/Content.ts:39](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Content.ts#L39)

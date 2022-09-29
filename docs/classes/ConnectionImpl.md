[@icure/medical-device-sdk](../modules.md) / ConnectionImpl

# Class: ConnectionImpl

## Implements

- [`Connection`](../interfaces/Connection.md)

## Table of contents

### Constructors

- [constructor](ConnectionImpl.md#constructor)

### Properties

- [connectionStatus](ConnectionImpl.md#connectionstatus)
- [rs](ConnectionImpl.md#rs)

### Methods

- [close](ConnectionImpl.md#close)
- [onClosed](ConnectionImpl.md#onclosed)
- [onConnected](ConnectionImpl.md#onconnected)
- [onConnecting](ConnectionImpl.md#onconnecting)
- [onError](ConnectionImpl.md#onerror)
- [onNotConnected](ConnectionImpl.md#onnotconnected)

## Constructors

### constructor

• **new ConnectionImpl**(`rs`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rs` | `ICureRSocket`<`any`, `any`\> |

#### Defined in

[src/models/Connection.ts:17](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L17)

## Properties

### connectionStatus

• **connectionStatus**: `string`

#### Defined in

[src/models/Connection.ts:15](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L15)

___

### rs

• **rs**: `ICureRSocket`<`any`, `any`\>

#### Defined in

[src/models/Connection.ts:14](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L14)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Implementation of

[Connection](../interfaces/Connection.md).[close](../interfaces/Connection.md#close)

#### Defined in

[src/models/Connection.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L22)

___

### onClosed

▸ **onClosed**(`callback`): [`Connection`](../interfaces/Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](../interfaces/Connection.md)

#### Implementation of

[Connection](../interfaces/Connection.md).[onClosed](../interfaces/Connection.md#onclosed)

#### Defined in

[src/models/Connection.ts:56](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L56)

___

### onConnected

▸ **onConnected**(`callback`): [`Connection`](../interfaces/Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](../interfaces/Connection.md)

#### Implementation of

[Connection](../interfaces/Connection.md).[onConnected](../interfaces/Connection.md#onconnected)

#### Defined in

[src/models/Connection.ts:46](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L46)

___

### onConnecting

▸ **onConnecting**(`callback`): [`Connection`](../interfaces/Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](../interfaces/Connection.md)

#### Implementation of

[Connection](../interfaces/Connection.md).[onConnecting](../interfaces/Connection.md#onconnecting)

#### Defined in

[src/models/Connection.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L26)

___

### onError

▸ **onError**(`callback`): [`Connection`](../interfaces/Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`e`: `Error`) => `void` |

#### Returns

[`Connection`](../interfaces/Connection.md)

#### Implementation of

[Connection](../interfaces/Connection.md).[onError](../interfaces/Connection.md#onerror)

#### Defined in

[src/models/Connection.ts:66](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L66)

___

### onNotConnected

▸ **onNotConnected**(`callback`): [`Connection`](../interfaces/Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](../interfaces/Connection.md)

#### Implementation of

[Connection](../interfaces/Connection.md).[onNotConnected](../interfaces/Connection.md#onnotconnected)

#### Defined in

[src/models/Connection.ts:36](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L36)

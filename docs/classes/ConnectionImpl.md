[@icure/medical-device-sdk](../modules.md) / ConnectionImpl

# Class: ConnectionImpl

## Implements

- [`Connection`](../interfaces/Connection.md)

## Table of contents

### Constructors

- [constructor](ConnectionImpl.md#constructor)

### Properties

- [connectionStatus](ConnectionImpl.md#connectionstatus)
- [wsw](ConnectionImpl.md#wsw)

### Methods

- [close](ConnectionImpl.md#close)
- [onClosed](ConnectionImpl.md#onclosed)
- [onConnected](ConnectionImpl.md#onconnected)
- [onError](ConnectionImpl.md#onerror)

## Constructors

### constructor

• **new ConnectionImpl**(`rs`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rs` | `WebSocketWrapper` |

#### Defined in

[src/models/Connection.ts:14](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Connection.ts#L14)

## Properties

### connectionStatus

• **connectionStatus**: `ConnectionStatus`

#### Defined in

[src/models/Connection.ts:12](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Connection.ts#L12)

___

### wsw

• **wsw**: `WebSocketWrapper`

#### Defined in

[src/models/Connection.ts:11](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Connection.ts#L11)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Implementation of

[Connection](../interfaces/Connection.md).[close](../interfaces/Connection.md#close)

#### Defined in

[src/models/Connection.ts:19](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Connection.ts#L19)

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

[src/models/Connection.ts:31](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Connection.ts#L31)

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

[src/models/Connection.ts:23](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Connection.ts#L23)

___

### onError

▸ **onError**(`callback`): [`Connection`](../interfaces/Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`e?`: `Error`) => `void` |

#### Returns

[`Connection`](../interfaces/Connection.md)

#### Implementation of

[Connection](../interfaces/Connection.md).[onError](../interfaces/Connection.md#onerror)

#### Defined in

[src/models/Connection.ts:39](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Connection.ts#L39)

[@icure/medical-device-sdk](../modules) / ConnectionImpl

# Class: ConnectionImpl

## Implements

- [`Connection`](../interfaces/Connection)

## Table of contents

### Constructors

- [constructor](ConnectionImpl#constructor)

### Properties

- [connectionStatus](ConnectionImpl#connectionstatus)
- [wsw](ConnectionImpl#wsw)

### Methods

- [close](ConnectionImpl#close)
- [onClosed](ConnectionImpl#onclosed)
- [onConnected](ConnectionImpl#onconnected)
- [onError](ConnectionImpl#onerror)

## Constructors

### constructor

• **new ConnectionImpl**(`rs`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rs` | `WebSocketWrapper` |

#### Defined in

[src/models/Connection.ts:14](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L14)

## Properties

### connectionStatus

• **connectionStatus**: `ConnectionStatus`

#### Defined in

[src/models/Connection.ts:12](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L12)

___

### wsw

• **wsw**: `WebSocketWrapper`

#### Defined in

[src/models/Connection.ts:11](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L11)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Implementation of

[Connection](../interfaces/Connection).[close](../interfaces/Connection#close)

#### Defined in

[src/models/Connection.ts:19](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L19)

___

### onClosed

▸ **onClosed**(`callback`): [`Connection`](../interfaces/Connection)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](../interfaces/Connection)

#### Implementation of

[Connection](../interfaces/Connection).[onClosed](../interfaces/Connection#onclosed)

#### Defined in

[src/models/Connection.ts:31](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L31)

___

### onConnected

▸ **onConnected**(`callback`): [`Connection`](../interfaces/Connection)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](../interfaces/Connection)

#### Implementation of

[Connection](../interfaces/Connection).[onConnected](../interfaces/Connection#onconnected)

#### Defined in

[src/models/Connection.ts:23](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L23)

___

### onError

▸ **onError**(`callback`): [`Connection`](../interfaces/Connection)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`e?`: `Error`) => `void` |

#### Returns

[`Connection`](../interfaces/Connection)

#### Implementation of

[Connection](../interfaces/Connection).[onError](../interfaces/Connection#onerror)

#### Defined in

[src/models/Connection.ts:39](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L39)

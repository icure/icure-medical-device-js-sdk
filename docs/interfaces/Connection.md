[@icure/medical-device-sdk](../modules) / Connection

# Interface: Connection

## Implemented by

- [`ConnectionImpl`](../classes/ConnectionImpl)

## Table of contents

### Methods

- [close](Connection#close)
- [onClosed](Connection#onclosed)
- [onConnected](Connection#onconnected)
- [onError](Connection#onerror)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/models/Connection.ts:4](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L4)

___

### onClosed

▸ **onClosed**(`callback`): [`Connection`](Connection)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](Connection)

#### Defined in

[src/models/Connection.ts:6](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L6)

___

### onConnected

▸ **onConnected**(`callback`): [`Connection`](Connection)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](Connection)

#### Defined in

[src/models/Connection.ts:5](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L5)

___

### onError

▸ **onError**(`callback`): [`Connection`](Connection)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`e?`: `Error`) => `void` |

#### Returns

[`Connection`](Connection)

#### Defined in

[src/models/Connection.ts:7](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Connection.ts#L7)

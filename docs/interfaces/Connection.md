[@icure/medical-device-sdk](../modules.md) / Connection

# Interface: Connection

## Implemented by

- [`ConnectionImpl`](../classes/ConnectionImpl.md)

## Table of contents

### Methods

- [close](Connection.md#close)
- [onClosed](Connection.md#onclosed)
- [onConnected](Connection.md#onconnected)
- [onConnecting](Connection.md#onconnecting)
- [onError](Connection.md#onerror)
- [onNotConnected](Connection.md#onnotconnected)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/models/Connection.ts:5](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L5)

___

### onClosed

▸ **onClosed**(`callback`): [`Connection`](Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](Connection.md)

#### Defined in

[src/models/Connection.ts:9](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L9)

___

### onConnected

▸ **onConnected**(`callback`): [`Connection`](Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](Connection.md)

#### Defined in

[src/models/Connection.ts:8](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L8)

___

### onConnecting

▸ **onConnecting**(`callback`): [`Connection`](Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](Connection.md)

#### Defined in

[src/models/Connection.ts:6](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L6)

___

### onError

▸ **onError**(`callback`): [`Connection`](Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`e`: `Error`) => `void` |

#### Returns

[`Connection`](Connection.md)

#### Defined in

[src/models/Connection.ts:10](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L10)

___

### onNotConnected

▸ **onNotConnected**(`callback`): [`Connection`](Connection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

[`Connection`](Connection.md)

#### Defined in

[src/models/Connection.ts:7](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/models/Connection.ts#L7)

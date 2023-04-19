[@icure/medical-device-sdk](../modules) / LocalStorageImpl

# Class: LocalStorageImpl

## Implements

- [`StorageFacade`](../interfaces/StorageFacade)<`string`\>

## Table of contents

### Constructors

- [constructor](LocalStorageImpl#constructor)

### Methods

- [getItem](LocalStorageImpl#getitem)
- [removeItem](LocalStorageImpl#removeitem)
- [setItem](LocalStorageImpl#setitem)

## Constructors

### constructor

• **new LocalStorageImpl**()

## Methods

### getItem

▸ **getItem**(`key`): `Promise`<`undefined` \| `string`\>

Returns the value of the provided key from the storage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of the value to retrieve |

#### Returns

`Promise`<`undefined` \| `string`\>

The value associated to the provided key or undefined if not found.

#### Implementation of

[StorageFacade](../interfaces/StorageFacade).[getItem](../interfaces/StorageFacade#getitem)

#### Defined in

node_modules/@icure/api/icc-x-api/storage/LocalStorageImpl.d.ts:3

___

### removeItem

▸ **removeItem**(`key`): `Promise`<`void`\>

Removes the item with the given key from the storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the item to remove. |

#### Returns

`Promise`<`void`\>

#### Implementation of

[StorageFacade](../interfaces/StorageFacade).[removeItem](../interfaces/StorageFacade#removeitem)

#### Defined in

node_modules/@icure/api/icc-x-api/storage/LocalStorageImpl.d.ts:4

___

### setItem

▸ **setItem**(`key`, `valueToStore`): `Promise`<`void`\>

Set an item in the storage for the given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of the value to set |
| `valueToStore` | `string` |  |

#### Returns

`Promise`<`void`\>

#### Implementation of

[StorageFacade](../interfaces/StorageFacade).[setItem](../interfaces/StorageFacade#setitem)

#### Defined in

node_modules/@icure/api/icc-x-api/storage/LocalStorageImpl.d.ts:5

[@icure/medical-device-sdk](../modules.md) / StorageFacade

# Interface: StorageFacade<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`LocalStorageImpl`](../classes/LocalStorageImpl.md)

## Table of contents

### Methods

- [getItem](StorageFacade.md#getitem)
- [removeItem](StorageFacade.md#removeitem)
- [setItem](StorageFacade.md#setitem)

## Methods

### getItem

▸ **getItem**(`key`): `Promise`<`undefined` \| `T`\>

Returns the value of the provided key from the storage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of the value to retrieve |

#### Returns

`Promise`<`undefined` \| `T`\>

The value associated to the provided key or undefined if not found.

#### Defined in

node_modules/@icure/api/icc-x-api/storage/StorageFacade.d.ts:7

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

#### Defined in

node_modules/@icure/api/icc-x-api/storage/StorageFacade.d.ts:18

___

### setItem

▸ **setItem**(`key`, `valueToStore`): `Promise`<`void`\>

Set an item in the storage for the given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of the value to set |
| `valueToStore` | `T` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@icure/api/icc-x-api/storage/StorageFacade.d.ts:13

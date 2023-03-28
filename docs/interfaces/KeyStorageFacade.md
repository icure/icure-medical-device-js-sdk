[@icure/medical-device-sdk](../modules.md) / KeyStorageFacade

# Interface: KeyStorageFacade

## Implemented by

- [`KeyStorageImpl`](../classes/KeyStorageImpl.md)

## Table of contents

### Methods

- [deleteKeypair](KeyStorageFacade.md#deletekeypair)
- [getKeypair](KeyStorageFacade.md#getkeypair)
- [getPrivateKey](KeyStorageFacade.md#getprivatekey)
- [getPublicKey](KeyStorageFacade.md#getpublickey)
- [storeKeyPair](KeyStorageFacade.md#storekeypair)

## Methods

### deleteKeypair

▸ **deleteKeypair**(`key`): `Promise`<`void`\>

Delete the keyPair associated to the provided key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of the value to delete |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageFacade.d.ts:27

___

### getKeypair

▸ **getKeypair**(`key`): `Promise`<`undefined` \| { `privateKey`: `JsonWebKey` ; `publicKey`: `JsonWebKey`  }\>

Get the keyPair associated to the provided key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of the value to retrieve |

#### Returns

`Promise`<`undefined` \| { `privateKey`: `JsonWebKey` ; `publicKey`: `JsonWebKey`  }\>

The keyPair associated to the provided key or undefined if not found.

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageFacade.d.ts:19

___

### getPrivateKey

▸ **getPrivateKey**(`key`): `Promise`<`undefined` \| `JsonWebKey`\>

Returns the privateKey of the provided key from the storage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of the value to retrieve |

#### Returns

`Promise`<`undefined` \| `JsonWebKey`\>

The privateKey associated to the provided key or undefined if not found.

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageFacade.d.ts:13

___

### getPublicKey

▸ **getPublicKey**(`key`): `Promise`<`undefined` \| `JsonWebKey`\>

Returns the publicKey of the provided key from the storage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of the value to retrieve |

#### Returns

`Promise`<`undefined` \| `JsonWebKey`\>

The publicKey associated to the provided key or undefined if not found.

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageFacade.d.ts:7

___

### storeKeyPair

▸ **storeKeyPair**(`key`, `keyPair`): `Promise`<`void`\>

Stores the given keyPair under the given key in the storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The id of the entry in storage |
| `keyPair` | `Object` | should be JWK |
| `keyPair.privateKey` | `JsonWebKey` | - |
| `keyPair.publicKey` | `JsonWebKey` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageFacade.d.ts:33

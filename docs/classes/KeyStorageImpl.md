[@icure/medical-device-sdk](../modules) / KeyStorageImpl

# Class: KeyStorageImpl

## Implements

- [`KeyStorageFacade`](../interfaces/KeyStorageFacade)

## Table of contents

### Constructors

- [constructor](KeyStorageImpl#constructor)

### Properties

- [\_storage](KeyStorageImpl#_storage)

### Methods

- [deleteKeypair](KeyStorageImpl#deletekeypair)
- [getKeypair](KeyStorageImpl#getkeypair)
- [getPrivateKey](KeyStorageImpl#getprivatekey)
- [getPublicKey](KeyStorageImpl#getpublickey)
- [storeKeyPair](KeyStorageImpl#storekeypair)

## Constructors

### constructor

• **new KeyStorageImpl**(`storage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `storage` | [`StorageFacade`](../interfaces/StorageFacade)<`string`\> |

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageImpl.d.ts:5

## Properties

### \_storage

• `Private` `Readonly` **\_storage**: `any`

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageImpl.d.ts:4

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

#### Implementation of

[KeyStorageFacade](../interfaces/KeyStorageFacade).[deleteKeypair](../interfaces/KeyStorageFacade#deletekeypair)

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageImpl.d.ts:6

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

#### Implementation of

[KeyStorageFacade](../interfaces/KeyStorageFacade).[getKeypair](../interfaces/KeyStorageFacade#getkeypair)

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageImpl.d.ts:7

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

#### Implementation of

[KeyStorageFacade](../interfaces/KeyStorageFacade).[getPrivateKey](../interfaces/KeyStorageFacade#getprivatekey)

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageImpl.d.ts:11

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

#### Implementation of

[KeyStorageFacade](../interfaces/KeyStorageFacade).[getPublicKey](../interfaces/KeyStorageFacade#getpublickey)

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageImpl.d.ts:12

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

#### Implementation of

[KeyStorageFacade](../interfaces/KeyStorageFacade).[storeKeyPair](../interfaces/KeyStorageFacade#storekeypair)

#### Defined in

node_modules/@icure/api/icc-x-api/storage/KeyStorageImpl.d.ts:13

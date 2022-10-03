[@icure/medical-device-sdk](../modules.md) / DataOwnerApi

# Interface: DataOwnerApi

## Table of contents

### Methods

- [getDataOwnerIdOf](DataOwnerApi.md#getdataowneridof)
- [initCryptoFor](DataOwnerApi.md#initcryptofor)

## Methods

### getDataOwnerIdOf

▸ **getDataOwnerIdOf**(`user`): `string`

Returns the data owner id of the provided user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`User`](../classes/User.md) | User for which we want to know the data owner id |

#### Returns

`string`

#### Defined in

[src/apis/DataOwnerApi.ts:8](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/DataOwnerApi.ts#L8)

___

### initCryptoFor

▸ **initCryptoFor**(`user`, `overwriteExistingKeys`, `userKeyPair?`): `Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }\>

Creates an RSA KeyPair for the provided user and updates its related DataOwner with the generated public key.
In the case of a Patient DataOwner, this service also creates a Patient Delegation, giving the patient access to
its own information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`User`](../classes/User.md) | The User for which we want to create a keyPair |
| `overwriteExistingKeys` | `boolean` | When this flag is set to true, the service will create and assign a new RSA Key Pair to the user, even if he already has one. This should therefore be activated ONLY when the user lost his key or starts the solution on a new terminal. This flag is false by default. |
| `userKeyPair?` | `Object` | KeyPair to use to init the cryptography scheme of a user. If no keyPair is provided, the service will create one |
| `userKeyPair.privateKey` | `string` | - |
| `userKeyPair.publicKey` | `string` | - |

#### Returns

`Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }\>

The response will contain the RSA keyPair generated for the provided user;

#### Defined in

[src/apis/DataOwnerApi.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/DataOwnerApi.ts#L24)

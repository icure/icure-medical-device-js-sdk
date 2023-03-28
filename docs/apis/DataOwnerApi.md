[@icure/medical-device-sdk](../modules) / DataOwnerApi

# SDK API: DataOwnerApi

## Table of contents

### Methods

- [getDataOwnerIdOf](DataOwnerApi#getdataowneridof)
- [giveAccessBackTo](DataOwnerApi#giveaccessbackto)
- [initCryptoFor](DataOwnerApi#initcryptofor)

## Methods

### getDataOwnerIdOf

▸ **getDataOwnerIdOf**(`user`): `string`

Returns the data owner id of the provided user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`User`](../classes/User) | User for which we want to know the data owner id |

#### Returns

`string`

#### Defined in

[src/apis/DataOwnerApi.ts:8](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataOwnerApi.ts#L8)

___

### giveAccessBackTo

▸ **giveAccessBackTo**(`ownerId`, `ownerNewPublicKey`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ownerId` | `string` |
| `ownerNewPublicKey` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/apis/DataOwnerApi.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataOwnerApi.ts#L26)

___

### initCryptoFor

▸ **initCryptoFor**(`user`, `userKeyPair?`): `Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }[]\>

Creates an RSA KeyPair for the provided user and updates its related DataOwner with the generated public key.
In the case of a Patient DataOwner, this service also creates a Patient Delegation, giving the patient access to
its own information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`User`](../classes/User) | The User for which we want to create a keyPair |
| `userKeyPair?` | `Object` | KeyPair to use to init the cryptography scheme of a user. If no keyPair is provided, the service will create one |
| `userKeyPair.privateKey` | `string` | - |
| `userKeyPair.publicKey` | `string` | - |

#### Returns

`Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }[]\>

The response will contain the RSA keyPair generated for the provided user;

#### Defined in

[src/apis/DataOwnerApi.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/DataOwnerApi.ts#L24)

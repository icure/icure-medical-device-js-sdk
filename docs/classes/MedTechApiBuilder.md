[@icure/medical-device-sdk](../modules.md) / MedTechApiBuilder

# Class: MedTechApiBuilder

## Table of contents

### Constructors

- [constructor](MedTechApiBuilder.md#constructor)

### Properties

- [\_keyStorage](MedTechApiBuilder.md#_keystorage)
- [\_preventCookieUsage](MedTechApiBuilder.md#_preventcookieusage)
- [\_storage](MedTechApiBuilder.md#_storage)
- [authProcessByEmailId](MedTechApiBuilder.md#authprocessbyemailid)
- [authProcessBySmsId](MedTechApiBuilder.md#authprocessbysmsid)
- [crypto](MedTechApiBuilder.md#crypto)
- [iCureBaseUrl](MedTechApiBuilder.md#icurebaseurl)
- [msgGwSpecId](MedTechApiBuilder.md#msggwspecid)
- [msgGwUrl](MedTechApiBuilder.md#msggwurl)
- [password](MedTechApiBuilder.md#password)
- [userName](MedTechApiBuilder.md#username)

### Methods

- [build](MedTechApiBuilder.md#build)
- [preventCookieUsage](MedTechApiBuilder.md#preventcookieusage)
- [withAuthProcessByEmailId](MedTechApiBuilder.md#withauthprocessbyemailid)
- [withAuthProcessBySmsId](MedTechApiBuilder.md#withauthprocessbysmsid)
- [withCrypto](MedTechApiBuilder.md#withcrypto)
- [withICureBaseUrl](MedTechApiBuilder.md#withicurebaseurl)
- [withKeyStorage](MedTechApiBuilder.md#withkeystorage)
- [withMsgGwSpecId](MedTechApiBuilder.md#withmsggwspecid)
- [withMsgGwUrl](MedTechApiBuilder.md#withmsggwurl)
- [withPassword](MedTechApiBuilder.md#withpassword)
- [withStorage](MedTechApiBuilder.md#withstorage)
- [withUserName](MedTechApiBuilder.md#withusername)

## Constructors

### constructor

• **new MedTechApiBuilder**()

## Properties

### \_keyStorage

• `Private` `Optional` **\_keyStorage**: [`KeyStorageFacade`](../interfaces/KeyStorageFacade.md)

#### Defined in

[src/apis/MedTechApi.ts:288](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L288)

___

### \_preventCookieUsage

• `Private` **\_preventCookieUsage**: `boolean` = `false`

#### Defined in

[src/apis/MedTechApi.ts:286](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L286)

___

### \_storage

• `Private` `Optional` **\_storage**: [`StorageFacade`](../interfaces/StorageFacade.md)<`string`\>

#### Defined in

[src/apis/MedTechApi.ts:287](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L287)

___

### authProcessByEmailId

• `Private` `Optional` **authProcessByEmailId**: `string`

#### Defined in

[src/apis/MedTechApi.ts:284](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L284)

___

### authProcessBySmsId

• `Private` `Optional` **authProcessBySmsId**: `string`

#### Defined in

[src/apis/MedTechApi.ts:285](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L285)

___

### crypto

• `Private` `Optional` **crypto**: `Crypto`

#### Defined in

[src/apis/MedTechApi.ts:280](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L280)

___

### iCureBaseUrl

• `Private` `Optional` **iCureBaseUrl**: `string` = `ICURE_CLOUD_URL`

#### Defined in

[src/apis/MedTechApi.ts:277](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L277)

___

### msgGwSpecId

• `Private` `Optional` **msgGwSpecId**: `string`

#### Defined in

[src/apis/MedTechApi.ts:283](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L283)

___

### msgGwUrl

• `Private` `Optional` **msgGwUrl**: `string` = `MSG_GW_CLOUD_URL`

#### Defined in

[src/apis/MedTechApi.ts:282](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L282)

___

### password

• `Private` `Optional` **password**: `string`

#### Defined in

[src/apis/MedTechApi.ts:279](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L279)

___

### userName

• `Private` `Optional` **userName**: `string`

#### Defined in

[src/apis/MedTechApi.ts:278](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L278)

## Methods

### build

▸ **build**(): `Promise`<[`MedTechApi`](MedTechApi.md)\>

#### Returns

`Promise`<[`MedTechApi`](MedTechApi.md)\>

#### Defined in

[src/apis/MedTechApi.ts:345](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L345)

___

### preventCookieUsage

▸ **preventCookieUsage**(): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:330](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L330)

___

### withAuthProcessByEmailId

▸ **withAuthProcessByEmailId**(`authProcessByEmailId`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessByEmailId` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:315](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L315)

___

### withAuthProcessBySmsId

▸ **withAuthProcessBySmsId**(`authProcessBySmsId`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessBySmsId` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:320](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L320)

___

### withCrypto

▸ **withCrypto**(`newCrypto`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newCrypto` | `Crypto` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:325](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L325)

___

### withICureBaseUrl

▸ **withICureBaseUrl**(`newICureBaseUrl`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newICureBaseUrl` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:290](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L290)

___

### withKeyStorage

▸ **withKeyStorage**(`keyStorage`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyStorage` | [`KeyStorageFacade`](../interfaces/KeyStorageFacade.md) |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:340](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L340)

___

### withMsgGwSpecId

▸ **withMsgGwSpecId**(`newSpecId`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newSpecId` | `undefined` \| `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:310](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L310)

___

### withMsgGwUrl

▸ **withMsgGwUrl**(`newMsgGwUrl`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newMsgGwUrl` | `undefined` \| `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:305](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L305)

___

### withPassword

▸ **withPassword**(`newPassword`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newPassword` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:300](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L300)

___

### withStorage

▸ **withStorage**(`storage`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `storage` | [`StorageFacade`](../interfaces/StorageFacade.md)<`string`\> |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:335](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L335)

___

### withUserName

▸ **withUserName**(`newUserName`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newUserName` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:295](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L295)

[@icure/medical-device-sdk](../modules) / MedTechApiBuilder

# Class: MedTechApiBuilder

## Table of contents

### Constructors

- [constructor](MedTechApiBuilder#constructor)

### Properties

- [\_keyStorage](MedTechApiBuilder#_keystorage)
- [\_preventCookieUsage](MedTechApiBuilder#_preventcookieusage)
- [\_storage](MedTechApiBuilder#_storage)
- [authProcessByEmailId](MedTechApiBuilder#authprocessbyemailid)
- [authProcessBySmsId](MedTechApiBuilder#authprocessbysmsid)
- [crypto](MedTechApiBuilder#crypto)
- [iCureBaseUrl](MedTechApiBuilder#icurebaseurl)
- [msgGwSpecId](MedTechApiBuilder#msggwspecid)
- [msgGwUrl](MedTechApiBuilder#msggwurl)
- [password](MedTechApiBuilder#password)
- [userName](MedTechApiBuilder#username)

### Methods

- [build](MedTechApiBuilder#build)
- [preventCookieUsage](MedTechApiBuilder#preventcookieusage)
- [withAuthProcessByEmailId](MedTechApiBuilder#withauthprocessbyemailid)
- [withAuthProcessBySmsId](MedTechApiBuilder#withauthprocessbysmsid)
- [withCrypto](MedTechApiBuilder#withcrypto)
- [withICureBaseUrl](MedTechApiBuilder#withicurebaseurl)
- [withKeyStorage](MedTechApiBuilder#withkeystorage)
- [withMsgGwSpecId](MedTechApiBuilder#withmsggwspecid)
- [withMsgGwUrl](MedTechApiBuilder#withmsggwurl)
- [withPassword](MedTechApiBuilder#withpassword)
- [withStorage](MedTechApiBuilder#withstorage)
- [withUserName](MedTechApiBuilder#withusername)

## Constructors

### constructor

• **new MedTechApiBuilder**()

## Properties

### \_keyStorage

• `Private` `Optional` **\_keyStorage**: [`KeyStorageFacade`](../interfaces/KeyStorageFacade)

#### Defined in

[src/apis/MedTechApi.ts:288](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L288)

___

### \_preventCookieUsage

• `Private` **\_preventCookieUsage**: `boolean` = `false`

#### Defined in

[src/apis/MedTechApi.ts:286](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L286)

___

### \_storage

• `Private` `Optional` **\_storage**: [`StorageFacade`](../interfaces/StorageFacade)<`string`\>

#### Defined in

[src/apis/MedTechApi.ts:287](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L287)

___

### authProcessByEmailId

• `Private` `Optional` **authProcessByEmailId**: `string`

#### Defined in

[src/apis/MedTechApi.ts:284](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L284)

___

### authProcessBySmsId

• `Private` `Optional` **authProcessBySmsId**: `string`

#### Defined in

[src/apis/MedTechApi.ts:285](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L285)

___

### crypto

• `Private` `Optional` **crypto**: `Crypto`

#### Defined in

[src/apis/MedTechApi.ts:280](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L280)

___

### iCureBaseUrl

• `Private` `Optional` **iCureBaseUrl**: `string` = `ICURE_CLOUD_URL`

#### Defined in

[src/apis/MedTechApi.ts:277](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L277)

___

### msgGwSpecId

• `Private` `Optional` **msgGwSpecId**: `string`

#### Defined in

[src/apis/MedTechApi.ts:283](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L283)

___

### msgGwUrl

• `Private` `Optional` **msgGwUrl**: `string` = `MSG_GW_CLOUD_URL`

#### Defined in

[src/apis/MedTechApi.ts:282](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L282)

___

### password

• `Private` `Optional` **password**: `string`

#### Defined in

[src/apis/MedTechApi.ts:279](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L279)

___

### userName

• `Private` `Optional` **userName**: `string`

#### Defined in

[src/apis/MedTechApi.ts:278](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L278)

## Methods

### build

▸ **build**(): `Promise`<[`MedTechApi`](MedTechApi)\>

#### Returns

`Promise`<[`MedTechApi`](MedTechApi)\>

#### Defined in

[src/apis/MedTechApi.ts:345](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L345)

___

### preventCookieUsage

▸ **preventCookieUsage**(): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:330](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L330)

___

### withAuthProcessByEmailId

▸ **withAuthProcessByEmailId**(`authProcessByEmailId`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessByEmailId` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:315](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L315)

___

### withAuthProcessBySmsId

▸ **withAuthProcessBySmsId**(`authProcessBySmsId`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessBySmsId` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:320](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L320)

___

### withCrypto

▸ **withCrypto**(`newCrypto`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newCrypto` | `Crypto` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:325](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L325)

___

### withICureBaseUrl

▸ **withICureBaseUrl**(`newICureBaseUrl`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newICureBaseUrl` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:290](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L290)

___

### withKeyStorage

▸ **withKeyStorage**(`keyStorage`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyStorage` | [`KeyStorageFacade`](../interfaces/KeyStorageFacade) |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:340](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L340)

___

### withMsgGwSpecId

▸ **withMsgGwSpecId**(`newSpecId`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newSpecId` | `undefined` \| `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:310](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L310)

___

### withMsgGwUrl

▸ **withMsgGwUrl**(`newMsgGwUrl`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newMsgGwUrl` | `undefined` \| `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:305](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L305)

___

### withPassword

▸ **withPassword**(`newPassword`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newPassword` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:300](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L300)

___

### withStorage

▸ **withStorage**(`storage`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `storage` | [`StorageFacade`](../interfaces/StorageFacade)<`string`\> |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:335](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L335)

___

### withUserName

▸ **withUserName**(`newUserName`): [`MedTechApiBuilder`](MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newUserName` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:295](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L295)

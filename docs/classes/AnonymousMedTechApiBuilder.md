[@icure/medical-device-sdk](../modules.md) / AnonymousMedTechApiBuilder

# Class: AnonymousMedTechApiBuilder

## Table of contents

### Constructors

- [constructor](AnonymousMedTechApiBuilder.md#constructor)

### Properties

- [\_preventCookieUsage](AnonymousMedTechApiBuilder.md#_preventcookieusage)
- [authProcessByEmailId](AnonymousMedTechApiBuilder.md#authprocessbyemailid)
- [authProcessBySmsId](AnonymousMedTechApiBuilder.md#authprocessbysmsid)
- [crypto](AnonymousMedTechApiBuilder.md#crypto)
- [iCureBaseUrl](AnonymousMedTechApiBuilder.md#icurebaseurl)
- [keyStorage](AnonymousMedTechApiBuilder.md#keystorage)
- [msgGwSpecId](AnonymousMedTechApiBuilder.md#msggwspecid)
- [msgGwUrl](AnonymousMedTechApiBuilder.md#msggwurl)
- [storage](AnonymousMedTechApiBuilder.md#storage)

### Methods

- [build](AnonymousMedTechApiBuilder.md#build)
- [preventCookieUsage](AnonymousMedTechApiBuilder.md#preventcookieusage)
- [withAuthProcessByEmailId](AnonymousMedTechApiBuilder.md#withauthprocessbyemailid)
- [withAuthProcessBySmsId](AnonymousMedTechApiBuilder.md#withauthprocessbysmsid)
- [withCrypto](AnonymousMedTechApiBuilder.md#withcrypto)
- [withICureBaseUrl](AnonymousMedTechApiBuilder.md#withicurebaseurl)
- [withKeyStorage](AnonymousMedTechApiBuilder.md#withkeystorage)
- [withMsgGwSpecId](AnonymousMedTechApiBuilder.md#withmsggwspecid)
- [withMsgGwUrl](AnonymousMedTechApiBuilder.md#withmsggwurl)
- [withStorage](AnonymousMedTechApiBuilder.md#withstorage)

## Constructors

### constructor

• **new AnonymousMedTechApiBuilder**()

## Properties

### \_preventCookieUsage

• `Private` **\_preventCookieUsage**: `boolean` = `false`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:74](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L74)

___

### authProcessByEmailId

• `Private` `Optional` **authProcessByEmailId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L72)

___

### authProcessBySmsId

• `Private` `Optional` **authProcessBySmsId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:73](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L73)

___

### crypto

• `Private` `Optional` **crypto**: `Crypto`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:75](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L75)

___

### iCureBaseUrl

• `Private` **iCureBaseUrl**: `string` = `ICURE_CLOUD_URL`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:69](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L69)

___

### keyStorage

• `Private` `Optional` **keyStorage**: [`KeyStorageFacade`](../interfaces/KeyStorageFacade.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:77](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L77)

___

### msgGwSpecId

• `Private` `Optional` **msgGwSpecId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:71](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L71)

___

### msgGwUrl

• `Private` **msgGwUrl**: `string` = `MSG_GW_CLOUD_URL`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L70)

___

### storage

• `Private` `Optional` **storage**: [`StorageFacade`](../interfaces/StorageFacade.md)<`string`\>

#### Defined in

[src/apis/AnonymousMedTechApi.ts:76](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L76)

## Methods

### build

▸ **build**(): `Promise`<[`AnonymousMedTechApi`](AnonymousMedTechApi.md)\>

#### Returns

`Promise`<[`AnonymousMedTechApi`](AnonymousMedTechApi.md)\>

#### Defined in

[src/apis/AnonymousMedTechApi.ts:124](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L124)

___

### preventCookieUsage

▸ **preventCookieUsage**(): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:119](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L119)

___

### withAuthProcessByEmailId

▸ **withAuthProcessByEmailId**(`authProcessByEmailId`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessByEmailId` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:94](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L94)

___

### withAuthProcessBySmsId

▸ **withAuthProcessBySmsId**(`authProcessBySmsId`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessBySmsId` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:99](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L99)

___

### withCrypto

▸ **withCrypto**(`crypto`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `crypto` | `Crypto` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:104](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L104)

___

### withICureBaseUrl

▸ **withICureBaseUrl**(`newICureBaseUrl`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newICureBaseUrl` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:79](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L79)

___

### withKeyStorage

▸ **withKeyStorage**(`keyStorage`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyStorage` | [`KeyStorageFacade`](../interfaces/KeyStorageFacade.md) |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:114](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L114)

___

### withMsgGwSpecId

▸ **withMsgGwSpecId**(`msgGwSpecId`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgGwSpecId` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:89](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L89)

___

### withMsgGwUrl

▸ **withMsgGwUrl**(`msgGwUrl`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgGwUrl` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:84](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L84)

___

### withStorage

▸ **withStorage**(`storage`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `storage` | [`StorageFacade`](../interfaces/StorageFacade.md)<`string`\> |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:109](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L109)

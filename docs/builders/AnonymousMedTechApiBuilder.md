[@icure/medical-device-sdk](../modules) / AnonymousMedTechApiBuilder

# Class: AnonymousMedTechApiBuilder

## Table of contents

### Constructors

- [constructor](AnonymousMedTechApiBuilder#constructor)

### Properties

- [\_preventCookieUsage](AnonymousMedTechApiBuilder#_preventcookieusage)
- [authProcessByEmailId](AnonymousMedTechApiBuilder#authprocessbyemailid)
- [authProcessBySmsId](AnonymousMedTechApiBuilder#authprocessbysmsid)
- [crypto](AnonymousMedTechApiBuilder#crypto)
- [iCureBaseUrl](AnonymousMedTechApiBuilder#icurebaseurl)
- [keyStorage](AnonymousMedTechApiBuilder#keystorage)
- [msgGwSpecId](AnonymousMedTechApiBuilder#msggwspecid)
- [msgGwUrl](AnonymousMedTechApiBuilder#msggwurl)
- [storage](AnonymousMedTechApiBuilder#storage)

### Methods

- [build](AnonymousMedTechApiBuilder#build)
- [preventCookieUsage](AnonymousMedTechApiBuilder#preventcookieusage)
- [withAuthProcessByEmailId](AnonymousMedTechApiBuilder#withauthprocessbyemailid)
- [withAuthProcessBySmsId](AnonymousMedTechApiBuilder#withauthprocessbysmsid)
- [withCrypto](AnonymousMedTechApiBuilder#withcrypto)
- [withICureBaseUrl](AnonymousMedTechApiBuilder#withicurebaseurl)
- [withKeyStorage](AnonymousMedTechApiBuilder#withkeystorage)
- [withMsgGwSpecId](AnonymousMedTechApiBuilder#withmsggwspecid)
- [withMsgGwUrl](AnonymousMedTechApiBuilder#withmsggwurl)
- [withStorage](AnonymousMedTechApiBuilder#withstorage)

## Constructors

### constructor

• **new AnonymousMedTechApiBuilder**()

## Properties

### \_preventCookieUsage

• `Private` **\_preventCookieUsage**: `boolean` = `false`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:74](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L74)

___

### authProcessByEmailId

• `Private` `Optional` **authProcessByEmailId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L72)

___

### authProcessBySmsId

• `Private` `Optional` **authProcessBySmsId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:73](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L73)

___

### crypto

• `Private` `Optional` **crypto**: `Crypto`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:75](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L75)

___

### iCureBaseUrl

• `Private` **iCureBaseUrl**: `string` = `ICURE_CLOUD_URL`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:69](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L69)

___

### keyStorage

• `Private` `Optional` **keyStorage**: [`KeyStorageFacade`](../interfaces/KeyStorageFacade)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:77](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L77)

___

### msgGwSpecId

• `Private` `Optional` **msgGwSpecId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:71](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L71)

___

### msgGwUrl

• `Private` **msgGwUrl**: `string` = `MSG_GW_CLOUD_URL`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L70)

___

### storage

• `Private` `Optional` **storage**: [`StorageFacade`](../interfaces/StorageFacade)<`string`\>

#### Defined in

[src/apis/AnonymousMedTechApi.ts:76](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L76)

## Methods

### build

▸ **build**(): `Promise`<[`AnonymousMedTechApi`](AnonymousMedTechApi)\>

#### Returns

`Promise`<[`AnonymousMedTechApi`](AnonymousMedTechApi)\>

#### Defined in

[src/apis/AnonymousMedTechApi.ts:124](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L124)

___

### preventCookieUsage

▸ **preventCookieUsage**(): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:119](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L119)

___

### withAuthProcessByEmailId

▸ **withAuthProcessByEmailId**(`authProcessByEmailId`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessByEmailId` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:94](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L94)

___

### withAuthProcessBySmsId

▸ **withAuthProcessBySmsId**(`authProcessBySmsId`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessBySmsId` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:99](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L99)

___

### withCrypto

▸ **withCrypto**(`crypto`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `crypto` | `Crypto` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:104](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L104)

___

### withICureBaseUrl

▸ **withICureBaseUrl**(`newICureBaseUrl`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newICureBaseUrl` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:79](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L79)

___

### withKeyStorage

▸ **withKeyStorage**(`keyStorage`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyStorage` | [`KeyStorageFacade`](../interfaces/KeyStorageFacade) |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:114](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L114)

___

### withMsgGwSpecId

▸ **withMsgGwSpecId**(`msgGwSpecId`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgGwSpecId` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:89](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L89)

___

### withMsgGwUrl

▸ **withMsgGwUrl**(`msgGwUrl`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgGwUrl` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:84](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L84)

___

### withStorage

▸ **withStorage**(`storage`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `storage` | [`StorageFacade`](../interfaces/StorageFacade)<`string`\> |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:109](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L109)

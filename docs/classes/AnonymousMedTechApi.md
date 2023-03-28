[@icure/medical-device-sdk](../modules.md) / AnonymousMedTechApi

# Class: AnonymousMedTechApi

## Table of contents

### Constructors

- [constructor](AnonymousMedTechApi.md#constructor)

### Properties

- [\_authenticationApi](AnonymousMedTechApi.md#_authenticationapi)
- [\_cryptoApi](AnonymousMedTechApi.md#_cryptoapi)
- [\_errorHandler](AnonymousMedTechApi.md#_errorhandler)
- [\_iCureUrlPath](AnonymousMedTechApi.md#_icureurlpath)
- [\_msgGwSpecId](AnonymousMedTechApi.md#_msggwspecid)
- [\_msgGwUrl](AnonymousMedTechApi.md#_msggwurl)
- [\_sanitizer](AnonymousMedTechApi.md#_sanitizer)

### Accessors

- [authenticationApi](AnonymousMedTechApi.md#authenticationapi)
- [cryptoApi](AnonymousMedTechApi.md#cryptoapi)

### Methods

- [generateRSAKeypair](AnonymousMedTechApi.md#generatersakeypair)

## Constructors

### constructor

• **new AnonymousMedTechApi**(`iCureUrlPath`, `msgGwUrl`, `msgGwSpecId`, `authProcessByEmailId`, `authProcessBySmsId`, `api`, `storage`, `keyStorage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `iCureUrlPath` | `string` |
| `msgGwUrl` | `string` |
| `msgGwSpecId` | `string` |
| `authProcessByEmailId` | `string` |
| `authProcessBySmsId` | `string` |
| `api` | `Object` |
| `api.cryptoApi` | `IccCryptoXApi` |
| `storage` | [`StorageFacade`](../interfaces/StorageFacade.md)<`string`\> |
| `keyStorage` | [`KeyStorageFacade`](../interfaces/KeyStorageFacade.md) |

#### Defined in

[src/apis/AnonymousMedTechApi.ts:20](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L20)

## Properties

### \_authenticationApi

• `Private` `Readonly` **\_authenticationApi**: [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:15](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L15)

___

### \_cryptoApi

• `Private` `Readonly` **\_cryptoApi**: `IccCryptoXApi`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:16](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L16)

___

### \_errorHandler

• `Private` `Readonly` **\_errorHandler**: `ErrorHandler`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:17](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L17)

___

### \_iCureUrlPath

• `Private` `Readonly` **\_iCureUrlPath**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:12](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L12)

___

### \_msgGwSpecId

• `Private` `Readonly` **\_msgGwSpecId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:14](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L14)

___

### \_msgGwUrl

• `Private` `Readonly` **\_msgGwUrl**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:13](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L13)

___

### \_sanitizer

• `Private` `Readonly` **\_sanitizer**: `Sanitizer`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L18)

## Accessors

### authenticationApi

• `get` **authenticationApi**(): [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Returns

[`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:55](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L55)

___

### cryptoApi

• `get` **cryptoApi**(): `IccCryptoXApi`

#### Returns

`IccCryptoXApi`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:51](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L51)

## Methods

### generateRSAKeypair

▸ **generateRSAKeypair**(): `Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }\>

#### Returns

`Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }\>

#### Defined in

[src/apis/AnonymousMedTechApi.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/AnonymousMedTechApi.ts#L59)

[@icure/medical-device-sdk](../modules) / AnonymousMedTechApi

# Class: AnonymousMedTechApi

## Table of contents

### Constructors

- [constructor](AnonymousMedTechApi#constructor)

### Properties

- [\_authenticationApi](AnonymousMedTechApi#_authenticationapi)
- [\_cryptoApi](AnonymousMedTechApi#_cryptoapi)
- [\_errorHandler](AnonymousMedTechApi#_errorhandler)
- [\_iCureUrlPath](AnonymousMedTechApi#_icureurlpath)
- [\_msgGwSpecId](AnonymousMedTechApi#_msggwspecid)
- [\_msgGwUrl](AnonymousMedTechApi#_msggwurl)
- [\_sanitizer](AnonymousMedTechApi#_sanitizer)

### Accessors

- [authenticationApi](AnonymousMedTechApi#authenticationapi)
- [cryptoApi](AnonymousMedTechApi#cryptoapi)

### Methods

- [generateRSAKeypair](AnonymousMedTechApi#generatersakeypair)

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
| `storage` | [`StorageFacade`](../interfaces/StorageFacade)<`string`\> |
| `keyStorage` | [`KeyStorageFacade`](../interfaces/KeyStorageFacade) |

#### Defined in

[src/apis/AnonymousMedTechApi.ts:20](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L20)

## Properties

### \_authenticationApi

• `Private` `Readonly` **\_authenticationApi**: [`AuthenticationApi`](../apis/AuthenticationApi)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:15](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L15)

___

### \_cryptoApi

• `Private` `Readonly` **\_cryptoApi**: `IccCryptoXApi`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:16](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L16)

___

### \_errorHandler

• `Private` `Readonly` **\_errorHandler**: `ErrorHandler`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:17](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L17)

___

### \_iCureUrlPath

• `Private` `Readonly` **\_iCureUrlPath**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:12](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L12)

___

### \_msgGwSpecId

• `Private` `Readonly` **\_msgGwSpecId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:14](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L14)

___

### \_msgGwUrl

• `Private` `Readonly` **\_msgGwUrl**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:13](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L13)

___

### \_sanitizer

• `Private` `Readonly` **\_sanitizer**: `Sanitizer`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L18)

## Accessors

### authenticationApi

• `get` **authenticationApi**(): [`AuthenticationApi`](../apis/AuthenticationApi)

#### Returns

[`AuthenticationApi`](../apis/AuthenticationApi)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:55](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L55)

___

### cryptoApi

• `get` **cryptoApi**(): `IccCryptoXApi`

#### Returns

`IccCryptoXApi`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:51](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L51)

## Methods

### generateRSAKeypair

▸ **generateRSAKeypair**(): `Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }\>

#### Returns

`Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }\>

#### Defined in

[src/apis/AnonymousMedTechApi.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AnonymousMedTechApi.ts#L59)

[@icure/medical-device-sdk](../modules.md) / AnonymousMedTechApi

# Class: AnonymousMedTechApi

## Table of contents

### Constructors

- [constructor](AnonymousMedTechApi.md#constructor)

### Properties

- [\_authProcessId](AnonymousMedTechApi.md#_authprocessid)
- [\_authenticationApi](AnonymousMedTechApi.md#_authenticationapi)
- [\_cryptoApi](AnonymousMedTechApi.md#_cryptoapi)
- [\_iCureUrlPath](AnonymousMedTechApi.md#_icureurlpath)
- [\_msgGtwSpecId](AnonymousMedTechApi.md#_msggtwspecid)
- [\_msgGtwUrl](AnonymousMedTechApi.md#_msggtwurl)

### Accessors

- [authenticationApi](AnonymousMedTechApi.md#authenticationapi)
- [cryptoApi](AnonymousMedTechApi.md#cryptoapi)

## Constructors

### constructor

• **new AnonymousMedTechApi**(`iCureUrlPath`, `msgGtwUrl`, `msgGtwSpecId`, `authProcessId`, `api`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `iCureUrlPath` | `string` |
| `msgGtwUrl` | `string` |
| `msgGtwSpecId` | `string` |
| `authProcessId` | `string` |
| `api` | `Object` |
| `api.cryptoApi` | `IccCryptoXApi` |

#### Defined in

[src/apis/AnonymousMedTechApi.ts:14](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L14)

## Properties

### \_authProcessId

• `Private` `Readonly` **\_authProcessId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:9](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L9)

___

### \_authenticationApi

• `Private` `Readonly` **\_authenticationApi**: [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:11](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L11)

___

### \_cryptoApi

• `Private` `Readonly` **\_cryptoApi**: `IccCryptoXApi`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:12](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L12)

___

### \_iCureUrlPath

• `Private` `Readonly` **\_iCureUrlPath**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:7](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L7)

___

### \_msgGtwSpecId

• `Private` `Readonly` **\_msgGtwSpecId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:10](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L10)

___

### \_msgGtwUrl

• `Private` `Readonly` **\_msgGtwUrl**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:8](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L8)

## Accessors

### authenticationApi

• `get` **authenticationApi**(): [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Returns

[`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:40](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L40)

___

### cryptoApi

• `get` **cryptoApi**(): `IccCryptoXApi`

#### Returns

`IccCryptoXApi`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:36](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L36)

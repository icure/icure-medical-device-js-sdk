[@icure/medical-device-sdk](../modules.md) / AnonymousMedTechApi

# Class: AnonymousMedTechApi

## Table of contents

### Constructors

- [constructor](AnonymousMedTechApi.md#constructor)

### Properties

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

• **new AnonymousMedTechApi**(`iCureUrlPath`, `msgGtwUrl`, `msgGtwSpecId`, `authProcessByEmailId`, `authProcessBySmsId`, `api`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `iCureUrlPath` | `string` |
| `msgGtwUrl` | `string` |
| `msgGtwSpecId` | `string` |
| `authProcessByEmailId` | `string` |
| `authProcessBySmsId` | `string` |
| `api` | `Object` |
| `api.cryptoApi` | `IccCryptoXApi` |

#### Defined in

[src/apis/AnonymousMedTechApi.ts:13](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L13)

## Properties

### \_authenticationApi

• `Private` `Readonly` **\_authenticationApi**: [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:10](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L10)

___

### \_cryptoApi

• `Private` `Readonly` **\_cryptoApi**: `IccCryptoXApi`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:11](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L11)

___

### \_iCureUrlPath

• `Private` `Readonly` **\_iCureUrlPath**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:7](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L7)

___

### \_msgGtwSpecId

• `Private` `Readonly` **\_msgGtwSpecId**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:9](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L9)

___

### \_msgGtwUrl

• `Private` `Readonly` **\_msgGtwUrl**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:8](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L8)

## Accessors

### authenticationApi

• `get` **authenticationApi**(): [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Returns

[`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L38)

___

### cryptoApi

• `get` **cryptoApi**(): `IccCryptoXApi`

#### Returns

`IccCryptoXApi`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L34)

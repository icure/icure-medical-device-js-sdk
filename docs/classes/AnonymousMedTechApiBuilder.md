[@icure/medical-device-sdk](../modules.md) / AnonymousMedTechApiBuilder

# Class: AnonymousMedTechApiBuilder

## Table of contents

### Constructors

- [constructor](AnonymousMedTechApiBuilder.md#constructor)

### Properties

- [\_preventCookieUsage](AnonymousMedTechApiBuilder.md#_preventcookieusage)
- [authProcessId](AnonymousMedTechApiBuilder.md#authprocessid)
- [authSpecId](AnonymousMedTechApiBuilder.md#authspecid)
- [crypto](AnonymousMedTechApiBuilder.md#crypto)
- [iCureUrlPath](AnonymousMedTechApiBuilder.md#icureurlpath)
- [msgGtwSpecId](AnonymousMedTechApiBuilder.md#msggtwspecid)
- [msgGtwUrl](AnonymousMedTechApiBuilder.md#msggtwurl)

### Methods

- [build](AnonymousMedTechApiBuilder.md#build)
- [preventCookieUsage](AnonymousMedTechApiBuilder.md#preventcookieusage)
- [withAuthProcessId](AnonymousMedTechApiBuilder.md#withauthprocessid)
- [withCrypto](AnonymousMedTechApiBuilder.md#withcrypto)
- [withICureUrlPath](AnonymousMedTechApiBuilder.md#withicureurlpath)
- [withMsgGtwSpecId](AnonymousMedTechApiBuilder.md#withmsggtwspecid)
- [withMsgGtwUrl](AnonymousMedTechApiBuilder.md#withmsggtwurl)

## Constructors

### constructor

• **new AnonymousMedTechApiBuilder**()

#### Defined in

[src/apis/AnonymousMedTechApi.ts:54](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L54)

## Properties

### \_preventCookieUsage

• `Private` **\_preventCookieUsage**: `boolean` = `false`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:52](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L52)

___

### authProcessId

• `Private` **authProcessId**: `undefined` \| `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:50](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L50)

___

### authSpecId

• `Private` **authSpecId**: `undefined` \| `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L47)

___

### crypto

• `Private` `Optional` **crypto**: `Crypto`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:51](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L51)

___

### iCureUrlPath

• `Private` **iCureUrlPath**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:46](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L46)

___

### msgGtwSpecId

• `Private` **msgGtwSpecId**: `undefined` \| `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:49](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L49)

___

### msgGtwUrl

• `Private` **msgGtwUrl**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L48)

## Methods

### build

▸ **build**(): `Promise`<[`AnonymousMedTechApi`](AnonymousMedTechApi.md)\>

#### Returns

`Promise`<[`AnonymousMedTechApi`](AnonymousMedTechApi.md)\>

#### Defined in

[src/apis/AnonymousMedTechApi.ts:92](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L92)

___

### preventCookieUsage

▸ **preventCookieUsage**(): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:87](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L87)

___

### withAuthProcessId

▸ **withAuthProcessId**(`authProcessId`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessId` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:77](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L77)

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

[src/apis/AnonymousMedTechApi.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L82)

___

### withICureUrlPath

▸ **withICureUrlPath**(`iCureUrlPath`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `iCureUrlPath` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:62](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L62)

___

### withMsgGtwSpecId

▸ **withMsgGtwSpecId**(`msgGtwSpecId`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgGtwSpecId` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L72)

___

### withMsgGtwUrl

▸ **withMsgGtwUrl**(`msgGtwUrl`): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgGtwUrl` | `string` |

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:67](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AnonymousMedTechApi.ts#L67)

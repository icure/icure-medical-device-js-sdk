[@icure/medical-device-sdk](../modules.md) / AnonymousMedTechApiBuilder

# Class: AnonymousMedTechApiBuilder

## Table of contents

### Constructors

- [constructor](AnonymousMedTechApiBuilder.md#constructor)

### Properties

- [\_preventCookieUsage](AnonymousMedTechApiBuilder.md#_preventcookieusage)
- [authProcessByEmailId](AnonymousMedTechApiBuilder.md#authprocessbyemailid)
- [authProcessBySmsId](AnonymousMedTechApiBuilder.md#authprocessbysmsid)
- [authSpecId](AnonymousMedTechApiBuilder.md#authspecid)
- [crypto](AnonymousMedTechApiBuilder.md#crypto)
- [iCureUrlPath](AnonymousMedTechApiBuilder.md#icureurlpath)
- [msgGtwSpecId](AnonymousMedTechApiBuilder.md#msggtwspecid)
- [msgGtwUrl](AnonymousMedTechApiBuilder.md#msggtwurl)

### Methods

- [build](AnonymousMedTechApiBuilder.md#build)
- [preventCookieUsage](AnonymousMedTechApiBuilder.md#preventcookieusage)
- [withAuthProcessByEmailId](AnonymousMedTechApiBuilder.md#withauthprocessbyemailid)
- [withAuthProcessBySmsId](AnonymousMedTechApiBuilder.md#withauthprocessbysmsid)
- [withCrypto](AnonymousMedTechApiBuilder.md#withcrypto)
- [withICureUrlPath](AnonymousMedTechApiBuilder.md#withicureurlpath)
- [withMsgGtwSpecId](AnonymousMedTechApiBuilder.md#withmsggtwspecid)
- [withMsgGtwUrl](AnonymousMedTechApiBuilder.md#withmsggtwurl)

## Constructors

### constructor

• **new AnonymousMedTechApiBuilder**()

#### Defined in

[src/apis/AnonymousMedTechApi.ts:53](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L53)

## Properties

### \_preventCookieUsage

• `Private` **\_preventCookieUsage**: `boolean` = `false`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:51](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L51)

___

### authProcessByEmailId

• `Private` **authProcessByEmailId**: `undefined` \| `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L48)

___

### authProcessBySmsId

• `Private` **authProcessBySmsId**: `undefined` \| `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:49](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L49)

___

### authSpecId

• `Private` **authSpecId**: `undefined` \| `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:45](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L45)

___

### crypto

• `Private` `Optional` **crypto**: `Crypto`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:50](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L50)

___

### iCureUrlPath

• `Private` **iCureUrlPath**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:44](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L44)

___

### msgGtwSpecId

• `Private` **msgGtwSpecId**: `undefined` \| `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L47)

___

### msgGtwUrl

• `Private` **msgGtwUrl**: `string`

#### Defined in

[src/apis/AnonymousMedTechApi.ts:46](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L46)

## Methods

### build

▸ **build**(): `Promise`<[`AnonymousMedTechApi`](AnonymousMedTechApi.md)\>

#### Returns

`Promise`<[`AnonymousMedTechApi`](AnonymousMedTechApi.md)\>

#### Defined in

[src/apis/AnonymousMedTechApi.ts:97](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L97)

___

### preventCookieUsage

▸ **preventCookieUsage**(): [`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Returns

[`AnonymousMedTechApiBuilder`](AnonymousMedTechApiBuilder.md)

#### Defined in

[src/apis/AnonymousMedTechApi.ts:92](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L92)

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

[src/apis/AnonymousMedTechApi.ts:77](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L77)

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

[src/apis/AnonymousMedTechApi.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L82)

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

[src/apis/AnonymousMedTechApi.ts:87](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L87)

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

[src/apis/AnonymousMedTechApi.ts:62](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L62)

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

[src/apis/AnonymousMedTechApi.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L72)

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

[src/apis/AnonymousMedTechApi.ts:67](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/AnonymousMedTechApi.ts#L67)

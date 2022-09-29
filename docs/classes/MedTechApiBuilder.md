[@icure/medical-device-sdk](../modules.md) / MedTechApiBuilder

# Class: MedTechApiBuilder

## Table of contents

### Constructors

- [constructor](MedTechApiBuilder.md#constructor)

### Properties

- [\_preventCookieUsage](MedTechApiBuilder.md#_preventcookieusage)
- [authProcessId](MedTechApiBuilder.md#authprocessid)
- [crypto](MedTechApiBuilder.md#crypto)
- [iCureBasePath](MedTechApiBuilder.md#icurebasepath)
- [msgGtwSpecId](MedTechApiBuilder.md#msggtwspecid)
- [msgGtwUrl](MedTechApiBuilder.md#msggtwurl)
- [password](MedTechApiBuilder.md#password)
- [userName](MedTechApiBuilder.md#username)

### Methods

- [build](MedTechApiBuilder.md#build)
- [preventCookieUsage](MedTechApiBuilder.md#preventcookieusage)
- [withAuthProcessId](MedTechApiBuilder.md#withauthprocessid)
- [withCrypto](MedTechApiBuilder.md#withcrypto)
- [withICureBasePath](MedTechApiBuilder.md#withicurebasepath)
- [withMsgGtwSpecId](MedTechApiBuilder.md#withmsggtwspecid)
- [withMsgGtwUrl](MedTechApiBuilder.md#withmsggtwurl)
- [withPassword](MedTechApiBuilder.md#withpassword)
- [withUserName](MedTechApiBuilder.md#withusername)

## Constructors

### constructor

• **new MedTechApiBuilder**()

## Properties

### \_preventCookieUsage

• `Private` **\_preventCookieUsage**: `boolean` = `false`

#### Defined in

[src/apis/medTechApi.ts:183](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L183)

___

### authProcessId

• `Private` `Optional` **authProcessId**: `string`

#### Defined in

[src/apis/medTechApi.ts:182](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L182)

___

### crypto

• `Private` `Optional` **crypto**: `Crypto`

#### Defined in

[src/apis/medTechApi.ts:179](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L179)

___

### iCureBasePath

• `Private` `Optional` **iCureBasePath**: `string`

#### Defined in

[src/apis/medTechApi.ts:176](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L176)

___

### msgGtwSpecId

• `Private` `Optional` **msgGtwSpecId**: `string`

#### Defined in

[src/apis/medTechApi.ts:181](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L181)

___

### msgGtwUrl

• `Private` `Optional` **msgGtwUrl**: `string`

#### Defined in

[src/apis/medTechApi.ts:180](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L180)

___

### password

• `Private` `Optional` **password**: `string`

#### Defined in

[src/apis/medTechApi.ts:178](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L178)

___

### userName

• `Private` `Optional` **userName**: `string`

#### Defined in

[src/apis/medTechApi.ts:177](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L177)

## Methods

### build

▸ **build**(): `Promise`<[`MedTechApi`](MedTechApi.md)\>

#### Returns

`Promise`<[`MedTechApi`](MedTechApi.md)\>

#### Defined in

[src/apis/medTechApi.ts:227](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L227)

___

### preventCookieUsage

▸ **preventCookieUsage**(): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/medTechApi.ts:222](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L222)

___

### withAuthProcessId

▸ **withAuthProcessId**(`newAuthProcessId`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newAuthProcessId` | `undefined` \| `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/medTechApi.ts:211](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L211)

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

[src/apis/medTechApi.ts:217](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L217)

___

### withICureBasePath

▸ **withICureBasePath**(`newICureBasePath`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newICureBasePath` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/medTechApi.ts:185](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L185)

___

### withMsgGtwSpecId

▸ **withMsgGtwSpecId**(`newSpecId`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newSpecId` | `undefined` \| `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/medTechApi.ts:206](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L206)

___

### withMsgGtwUrl

▸ **withMsgGtwUrl**(`newMsgGtwUrl`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newMsgGtwUrl` | `undefined` \| `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/medTechApi.ts:200](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L200)

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

[src/apis/medTechApi.ts:195](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L195)

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

[src/apis/medTechApi.ts:190](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L190)

[@icure/medical-device-sdk](../modules.md) / MedTechApiBuilder

# Class: MedTechApiBuilder

## Table of contents

### Constructors

- [constructor](MedTechApiBuilder.md#constructor)

### Properties

- [\_preventCookieUsage](MedTechApiBuilder.md#_preventcookieusage)
- [authProcessByEmailId](MedTechApiBuilder.md#authprocessbyemailid)
- [authProcessBySmsId](MedTechApiBuilder.md#authprocessbysmsid)
- [crypto](MedTechApiBuilder.md#crypto)
- [iCureBasePath](MedTechApiBuilder.md#icurebasepath)
- [msgGtwSpecId](MedTechApiBuilder.md#msggtwspecid)
- [msgGtwUrl](MedTechApiBuilder.md#msggtwurl)
- [password](MedTechApiBuilder.md#password)
- [userName](MedTechApiBuilder.md#username)

### Methods

- [build](MedTechApiBuilder.md#build)
- [preventCookieUsage](MedTechApiBuilder.md#preventcookieusage)
- [withAuthProcessByEmailId](MedTechApiBuilder.md#withauthprocessbyemailid)
- [withAuthProcessBySmsId](MedTechApiBuilder.md#withauthprocessbysmsid)
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

[src/apis/medTechApi.ts:271](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L271)

___

### authProcessByEmailId

• `Private` `Optional` **authProcessByEmailId**: `string`

#### Defined in

[src/apis/medTechApi.ts:269](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L269)

___

### authProcessBySmsId

• `Private` `Optional` **authProcessBySmsId**: `string`

#### Defined in

[src/apis/medTechApi.ts:270](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L270)

___

### crypto

• `Private` `Optional` **crypto**: `Crypto`

#### Defined in

[src/apis/medTechApi.ts:266](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L266)

___

### iCureBasePath

• `Private` `Optional` **iCureBasePath**: `string`

#### Defined in

[src/apis/medTechApi.ts:263](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L263)

___

### msgGtwSpecId

• `Private` `Optional` **msgGtwSpecId**: `string`

#### Defined in

[src/apis/medTechApi.ts:268](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L268)

___

### msgGtwUrl

• `Private` `Optional` **msgGtwUrl**: `string`

#### Defined in

[src/apis/medTechApi.ts:267](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L267)

___

### password

• `Private` `Optional` **password**: `string`

#### Defined in

[src/apis/medTechApi.ts:265](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L265)

___

### userName

• `Private` `Optional` **userName**: `string`

#### Defined in

[src/apis/medTechApi.ts:264](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L264)

## Methods

### build

▸ **build**(): `Promise`<[`MedTechApi`](MedTechApi.md)\>

#### Returns

`Promise`<[`MedTechApi`](MedTechApi.md)\>

#### Defined in

[src/apis/medTechApi.ts:318](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L318)

___

### preventCookieUsage

▸ **preventCookieUsage**(): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/medTechApi.ts:313](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L313)

___

### withAuthProcessByEmailId

▸ **withAuthProcessByEmailId**(`authProcessByEmailId`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessByEmailId` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/medTechApi.ts:298](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L298)

___

### withAuthProcessBySmsId

▸ **withAuthProcessBySmsId**(`authProcessBySmsId`): [`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProcessBySmsId` | `string` |

#### Returns

[`MedTechApiBuilder`](MedTechApiBuilder.md)

#### Defined in

[src/apis/medTechApi.ts:303](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L303)

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

[src/apis/medTechApi.ts:308](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L308)

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

[src/apis/medTechApi.ts:273](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L273)

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

[src/apis/medTechApi.ts:293](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L293)

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

[src/apis/medTechApi.ts:288](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L288)

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

[src/apis/medTechApi.ts:283](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L283)

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

[src/apis/medTechApi.ts:278](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/apis/medTechApi.ts#L278)

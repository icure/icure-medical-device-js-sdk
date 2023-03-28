[@icure/medical-device-sdk](../modules.md) / SystemMetaDataOwnerEncrypted

# Class: SystemMetaDataOwnerEncrypted

## Table of contents

### Constructors

- [constructor](SystemMetaDataOwnerEncrypted.md#constructor)

### Properties

- [aesExchangeKeys](SystemMetaDataOwnerEncrypted.md#aesexchangekeys)
- [cryptedForeignKeys](SystemMetaDataOwnerEncrypted.md#cryptedforeignkeys)
- [delegations](SystemMetaDataOwnerEncrypted.md#delegations)
- [encryptedSelf](SystemMetaDataOwnerEncrypted.md#encryptedself)
- [encryptionKeys](SystemMetaDataOwnerEncrypted.md#encryptionkeys)
- [hcPartyKeys](SystemMetaDataOwnerEncrypted.md#hcpartykeys)
- [privateKeyShamirPartitions](SystemMetaDataOwnerEncrypted.md#privatekeyshamirpartitions)
- [publicKey](SystemMetaDataOwnerEncrypted.md#publickey)
- [secretForeignKeys](SystemMetaDataOwnerEncrypted.md#secretforeignkeys)
- [transferKeys](SystemMetaDataOwnerEncrypted.md#transferkeys)

### Methods

- [marshal](SystemMetaDataOwnerEncrypted.md#marshal)

## Constructors

### constructor

• **new SystemMetaDataOwnerEncrypted**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `ISystemMetaDataOwnerEncrypted` |

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:16](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L16)

## Properties

### aesExchangeKeys

• **aesExchangeKeys**: `Object`

#### Index signature

▪ [key: `string`]: { `[key: string]`: { `[key: string]`: `string`;  };  }

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:46](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L46)

___

### cryptedForeignKeys

• **cryptedForeignKeys**: `Object`

#### Index signature

▪ [key: `string`]: `Set`<[`Delegation`](Delegation.md)\>

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:43](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L43)

___

### delegations

• **delegations**: `Object`

#### Index signature

▪ [key: `string`]: `Set`<[`Delegation`](Delegation.md)\>

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:44](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L44)

___

### encryptedSelf

• `Optional` **encryptedSelf**: `string`

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L48)

___

### encryptionKeys

• **encryptionKeys**: `Object`

#### Index signature

▪ [key: `string`]: `Set`<[`Delegation`](Delegation.md)\>

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:45](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L45)

___

### hcPartyKeys

• **hcPartyKeys**: `Object`

#### Index signature

▪ [key: `string`]: `string`[]

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:40](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L40)

___

### privateKeyShamirPartitions

• **privateKeyShamirPartitions**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:41](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L41)

___

### publicKey

• **publicKey**: `string`

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:39](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L39)

___

### secretForeignKeys

• **secretForeignKeys**: `string`[]

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L42)

___

### transferKeys

• **transferKeys**: `Object`

#### Index signature

▪ [key: `string`]: { `[key: string]`: `string`;  }

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L47)

## Methods

### marshal

▸ **marshal**(): `ISystemMetaDataOwnerEncrypted`

#### Returns

`ISystemMetaDataOwnerEncrypted`

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:50](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/SystemMetaDataOwnerEncrypted.ts#L50)

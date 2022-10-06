[@icure/medical-device-sdk](../modules.md) / SystemMetaDataOwnerEncrypted

# Class: SystemMetaDataOwnerEncrypted

## Table of contents

### Constructors

- [constructor](SystemMetaDataOwnerEncrypted.md#constructor)

### Properties

- [aesExchangeKeys](SystemMetaDataOwnerEncrypted.md#aesexchangekeys)
- [cryptedForeignKeys](SystemMetaDataOwnerEncrypted.md#cryptedforeignkeys)
- [delegations](SystemMetaDataOwnerEncrypted.md#delegations)
- [encryptionKeys](SystemMetaDataOwnerEncrypted.md#encryptionkeys)
- [hcPartyKeys](SystemMetaDataOwnerEncrypted.md#hcpartykeys)
- [privateKeyShamirPartitions](SystemMetaDataOwnerEncrypted.md#privatekeyshamirpartitions)
- [publicKey](SystemMetaDataOwnerEncrypted.md#publickey)
- [secretForeignKeys](SystemMetaDataOwnerEncrypted.md#secretforeignkeys)
- [transferKeys](SystemMetaDataOwnerEncrypted.md#transferkeys)

## Constructors

### constructor

• **new SystemMetaDataOwnerEncrypted**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `ISystemMetaDataOwnerEncrypted` |

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:16](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L16)

## Properties

### aesExchangeKeys

• **aesExchangeKeys**: `Object`

#### Index signature

▪ [key: `string`]: { `[key: string]`: { `[key: string]`: `string`;  };  }

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:27](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L27)

___

### cryptedForeignKeys

• **cryptedForeignKeys**: `Object`

#### Index signature

▪ [key: `string`]: `Set`<[`Delegation`](Delegation.md)\>

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L24)

___

### delegations

• **delegations**: `Object`

#### Index signature

▪ [key: `string`]: `Set`<[`Delegation`](Delegation.md)\>

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:25](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L25)

___

### encryptionKeys

• **encryptionKeys**: `Object`

#### Index signature

▪ [key: `string`]: `Set`<[`Delegation`](Delegation.md)\>

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L26)

___

### hcPartyKeys

• **hcPartyKeys**: `Object`

#### Index signature

▪ [key: `string`]: `string`[]

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:21](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L21)

___

### privateKeyShamirPartitions

• **privateKeyShamirPartitions**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:22](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L22)

___

### publicKey

• **publicKey**: `string`

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:20](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L20)

___

### secretForeignKeys

• **secretForeignKeys**: `string`[]

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:23](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L23)

___

### transferKeys

• **transferKeys**: `Object`

#### Index signature

▪ [key: `string`]: { `[key: string]`: `string`;  }

#### Defined in

[src/models/SystemMetaDataOwnerEncrypted.ts:28](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/SystemMetaDataOwnerEncrypted.ts#L28)

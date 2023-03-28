[@icure/medical-device-sdk](../modules) / SystemMetaDataEncrypted

# Class: SystemMetaDataEncrypted

## Table of contents

### Constructors

- [constructor](SystemMetaDataEncrypted#constructor)

### Properties

- [cryptedForeignKeys](SystemMetaDataEncrypted#cryptedforeignkeys)
- [delegations](SystemMetaDataEncrypted#delegations)
- [encryptedSelf](SystemMetaDataEncrypted#encryptedself)
- [encryptionKeys](SystemMetaDataEncrypted#encryptionkeys)
- [secretForeignKeys](SystemMetaDataEncrypted#secretforeignkeys)

### Methods

- [marshal](SystemMetaDataEncrypted#marshal)

## Constructors

### constructor

• **new SystemMetaDataEncrypted**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `ISystemMetaDataEncrypted` |

#### Defined in

[src/models/SystemMetaDataEncrypted.ts:17](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/SystemMetaDataEncrypted.ts#L17)

## Properties

### cryptedForeignKeys

• **cryptedForeignKeys**: `Object`

#### Index signature

▪ [key: `string`]: `Set`<[`Delegation`](Delegation)\>

#### Defined in

[src/models/SystemMetaDataEncrypted.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/SystemMetaDataEncrypted.ts#L42)

___

### delegations

• **delegations**: `Object`

#### Index signature

▪ [key: `string`]: `Set`<[`Delegation`](Delegation)\>

#### Defined in

[src/models/SystemMetaDataEncrypted.ts:43](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/SystemMetaDataEncrypted.ts#L43)

___

### encryptedSelf

• `Optional` **encryptedSelf**: `string`

#### Defined in

[src/models/SystemMetaDataEncrypted.ts:45](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/SystemMetaDataEncrypted.ts#L45)

___

### encryptionKeys

• **encryptionKeys**: `Object`

#### Index signature

▪ [key: `string`]: `Set`<[`Delegation`](Delegation)\>

#### Defined in

[src/models/SystemMetaDataEncrypted.ts:44](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/SystemMetaDataEncrypted.ts#L44)

___

### secretForeignKeys

• **secretForeignKeys**: `string`[]

#### Defined in

[src/models/SystemMetaDataEncrypted.ts:41](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/SystemMetaDataEncrypted.ts#L41)

## Methods

### marshal

▸ **marshal**(): `ISystemMetaDataEncrypted`

#### Returns

`ISystemMetaDataEncrypted`

#### Defined in

[src/models/SystemMetaDataEncrypted.ts:47](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/SystemMetaDataEncrypted.ts#L47)

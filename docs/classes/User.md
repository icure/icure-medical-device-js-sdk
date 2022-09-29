[@icure/medical-device-sdk](../modules.md) / User

# Class: User

## Table of contents

### Constructors

- [constructor](User.md#constructor)

### Properties

- [authenticationTokens](User.md#authenticationtokens)
- [created](User.md#created)
- [deletionDate](User.md#deletiondate)
- [deviceId](User.md#deviceid)
- [email](User.md#email)
- [groupId](User.md#groupid)
- [healthcarePartyId](User.md#healthcarepartyid)
- [id](User.md#id)
- [login](User.md#login)
- [mobilePhone](User.md#mobilephone)
- [name](User.md#name)
- [passwordHash](User.md#passwordhash)
- [patientId](User.md#patientid)
- [properties](User.md#properties)
- [rev](User.md#rev)
- [roles](User.md#roles)
- [secret](User.md#secret)
- [sharingDataWith](User.md#sharingdatawith)
- [use2fa](User.md#use2fa)

## Constructors

### constructor

• **new User**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IUser` |

#### Defined in

[src/models/User.ts:17](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L17)

## Properties

### authenticationTokens

• **authenticationTokens**: `Object`

Encrypted and time-limited Authentication tokens used for inter-applications authentication

#### Index signature

▪ [key: `string`]: [`AuthenticationToken`](AuthenticationToken.md)

#### Defined in

[src/models/User.ts:96](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L96)

___

### created

• `Optional` **created**: `number`

the creation date of the user (encoded as epoch).

#### Defined in

[src/models/User.ts:36](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L36)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a user is ”deleted“, this is set to a non null value: the moment of the deletion

#### Defined in

[src/models/User.ts:32](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L32)

___

### deviceId

• `Optional` **deviceId**: `string`

Id of the patient if the user is a patient

#### Defined in

[src/models/User.ts:80](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L80)

___

### email

• `Optional` **email**: `string`

email address of the user (used for token exchange or password recovery).

#### Defined in

[src/models/User.ts:88](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L88)

___

### groupId

• `Optional` **groupId**: `string`

id of the group (practice/hospital) the user is member of

#### Defined in

[src/models/User.ts:68](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L68)

___

### healthcarePartyId

• `Optional` **healthcarePartyId**: `string`

Id of the healthcare party if the user is a healthcare party.

#### Defined in

[src/models/User.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L72)

___

### id

• `Optional` **id**: `string`

the Id of the user. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/User.ts:24](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L24)

___

### login

• `Optional` **login**: `string`

Username for this user. We encourage using an email address

#### Defined in

[src/models/User.ts:52](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L52)

___

### mobilePhone

• `Optional` **mobilePhone**: `string`

mobile phone of the user (used for token exchange or password recovery).

#### Defined in

[src/models/User.ts:92](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L92)

___

### name

• `Optional` **name**: `string`

Last name of the user. This is the official last name that should be used for official administrative purposes.

#### Defined in

[src/models/User.ts:40](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L40)

___

### passwordHash

• `Optional` **passwordHash**: `string`

Hashed version of the password (BCrypt is used for hashing)

#### Defined in

[src/models/User.ts:56](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L56)

___

### patientId

• `Optional` **patientId**: `string`

Id of the patient if the user is a patient

#### Defined in

[src/models/User.ts:76](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L76)

___

### properties

• **properties**: `Set`<[`Property`](Property.md)\>

Extra properties for the user. Those properties are typed (see class Property)

#### Defined in

[src/models/User.ts:44](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L44)

___

### rev

• `Optional` **rev**: `string`

the revision of the user in the database, used for conflict management / optimistic locking.

#### Defined in

[src/models/User.ts:28](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L28)

___

### roles

• **roles**: `Set`<`string`\>

Roles assigned to this user

#### Defined in

[src/models/User.ts:48](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L48)

___

### secret

• `Optional` **secret**: `string`

Secret token used to verify 2fa

#### Defined in

[src/models/User.ts:60](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L60)

___

### sharingDataWith

• **sharingDataWith**: `Object`

Ids of the dataOwners with who the user is sharing all new data he is creating in iCure : All Data Types that may be shared can be found in SharedDataType enum

#### Type declaration

| Name | Type |
| :------ | :------ |
| `administrativeData` | `Set`<`string`\> |
| `all` | `Set`<`string`\> |
| `confidentialInformation` | `Set`<`string`\> |
| `financialInformation` | `Set`<`string`\> |
| `generalInformation` | `Set`<`string`\> |
| `medicalInformation` | `Set`<`string`\> |
| `sensitiveInformation` | `Set`<`string`\> |

#### Defined in

[src/models/User.ts:84](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L84)

___

### use2fa

• `Optional` **use2fa**: `boolean`

Whether the user has activated two factors authentication

#### Defined in

[src/models/User.ts:64](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/User.ts#L64)

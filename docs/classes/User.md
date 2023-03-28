[@icure/medical-device-sdk](../modules) / User

# Class: User

## Table of contents

### Constructors

- [constructor](User#constructor)

### Properties

- [authenticationTokens](User#authenticationtokens)
- [created](User#created)
- [deletionDate](User#deletiondate)
- [deviceId](User#deviceid)
- [email](User#email)
- [groupId](User#groupid)
- [healthcarePartyId](User#healthcarepartyid)
- [id](User#id)
- [login](User#login)
- [mobilePhone](User#mobilephone)
- [name](User#name)
- [passwordHash](User#passwordhash)
- [patientId](User#patientid)
- [properties](User#properties)
- [rev](User#rev)
- [roles](User#roles)
- [secret](User#secret)
- [sharingDataWith](User#sharingdatawith)
- [use2fa](User#use2fa)

### Methods

- [marshal](User#marshal)

## Constructors

### constructor

• **new User**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IUser` |

#### Defined in

[src/models/User.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L18)

## Properties

### authenticationTokens

• **authenticationTokens**: `Object`

Encrypted and time-limited Authentication tokens used for inter-applications authentication

#### Index signature

▪ [key: `string`]: [`AuthenticationToken`](AuthenticationToken)

#### Defined in

[src/models/User.ts:102](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L102)

___

### created

• `Optional` **created**: `number`

the creation date of the user (encoded as epoch).

#### Defined in

[src/models/User.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L42)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a user is ”deleted“, this is set to a non null value: the moment of the deletion

#### Defined in

[src/models/User.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L38)

___

### deviceId

• `Optional` **deviceId**: `string`

Id of the patient if the user is a patient

#### Defined in

[src/models/User.ts:86](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L86)

___

### email

• `Optional` **email**: `string`

email address of the user (used for token exchange or password recovery).

#### Defined in

[src/models/User.ts:94](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L94)

___

### groupId

• `Optional` **groupId**: `string`

id of the group (practice/hospital) the user is member of

#### Defined in

[src/models/User.ts:74](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L74)

___

### healthcarePartyId

• `Optional` **healthcarePartyId**: `string`

Id of the healthcare party if the user is a healthcare party.

#### Defined in

[src/models/User.ts:78](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L78)

___

### id

• `Optional` **id**: `string`

the Id of the user. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/User.ts:30](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L30)

___

### login

• `Optional` **login**: `string`

Username for this user. We encourage using an email address

#### Defined in

[src/models/User.ts:58](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L58)

___

### mobilePhone

• `Optional` **mobilePhone**: `string`

mobile phone of the user (used for token exchange or password recovery).

#### Defined in

[src/models/User.ts:98](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L98)

___

### name

• `Optional` **name**: `string`

Last name of the user. This is the official last name that should be used for official administrative purposes.

#### Defined in

[src/models/User.ts:46](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L46)

___

### passwordHash

• `Optional` **passwordHash**: `string`

Hashed version of the password (BCrypt is used for hashing)

#### Defined in

[src/models/User.ts:62](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L62)

___

### patientId

• `Optional` **patientId**: `string`

Id of the patient if the user is a patient

#### Defined in

[src/models/User.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L82)

___

### properties

• **properties**: `Set`<[`Property`](Property)\>

Extra properties for the user. Those properties are typed (see class Property)

#### Defined in

[src/models/User.ts:50](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L50)

___

### rev

• `Optional` **rev**: `string`

the revision of the user in the database, used for conflict management / optimistic locking.

#### Defined in

[src/models/User.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L34)

___

### roles

• **roles**: `Set`<`string`\>

Roles assigned to this user

#### Defined in

[src/models/User.ts:54](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L54)

___

### secret

• `Optional` **secret**: `string`

Secret token used to verify 2fa

#### Defined in

[src/models/User.ts:66](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L66)

___

### sharingDataWith

• **sharingDataWith**: `Object`

Ids of the dataOwners with who the user is sharing all new data he is creating in iCure : All Data Types that may be shared can be found in SharedDataType enum

#### Type declaration

| Name | Type |
| :------ | :------ |
| `administrativeData` | `undefined` \| `Set`<`string`\> |
| `all` | `undefined` \| `Set`<`string`\> |
| `confidentialInformation` | `undefined` \| `Set`<`string`\> |
| `financialInformation` | `undefined` \| `Set`<`string`\> |
| `generalInformation` | `undefined` \| `Set`<`string`\> |
| `medicalInformation` | `undefined` \| `Set`<`string`\> |
| `sensitiveInformation` | `undefined` \| `Set`<`string`\> |

#### Defined in

[src/models/User.ts:90](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L90)

___

### use2fa

• `Optional` **use2fa**: `boolean`

Whether the user has activated two factors authentication

#### Defined in

[src/models/User.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L70)

## Methods

### marshal

▸ **marshal**(): `IUser`

#### Returns

`IUser`

#### Defined in

[src/models/User.ts:104](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/User.ts#L104)

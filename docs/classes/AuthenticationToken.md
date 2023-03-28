[@icure/medical-device-sdk](../modules) / AuthenticationToken

# Class: AuthenticationToken

Encrypted and time-limited Authentication tokens used for inter-applications authentication

## Table of contents

### Constructors

- [constructor](AuthenticationToken#constructor)

### Properties

- [creationTime](AuthenticationToken#creationtime)
- [token](AuthenticationToken#token)
- [validity](AuthenticationToken#validity)

### Methods

- [marshal](AuthenticationToken#marshal)

## Constructors

### constructor

• **new AuthenticationToken**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IAuthenticationToken` |

#### Defined in

[src/models/AuthenticationToken.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/AuthenticationToken.ts#L18)

## Properties

### creationTime

• **creationTime**: `number`

Validity starting time of the token

#### Defined in

[src/models/AuthenticationToken.ts:29](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/AuthenticationToken.ts#L29)

___

### token

• **token**: `string`

Encrypted token

#### Defined in

[src/models/AuthenticationToken.ts:25](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/AuthenticationToken.ts#L25)

___

### validity

• **validity**: `number`

Token validity in seconds

#### Defined in

[src/models/AuthenticationToken.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/AuthenticationToken.ts#L33)

## Methods

### marshal

▸ **marshal**(): `IAuthenticationToken`

#### Returns

`IAuthenticationToken`

#### Defined in

[src/models/AuthenticationToken.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/AuthenticationToken.ts#L35)

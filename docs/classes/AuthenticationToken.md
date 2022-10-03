[@icure/medical-device-sdk](../modules.md) / AuthenticationToken

# Class: AuthenticationToken

Encrypted and time-limited Authentication tokens used for inter-applications authentication

## Table of contents

### Constructors

- [constructor](AuthenticationToken.md#constructor)

### Properties

- [creationTime](AuthenticationToken.md#creationtime)
- [token](AuthenticationToken.md#token)
- [validity](AuthenticationToken.md#validity)

## Constructors

### constructor

• **new AuthenticationToken**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IAuthenticationToken` |

#### Defined in

[src/models/AuthenticationToken.ts:18](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/AuthenticationToken.ts#L18)

## Properties

### creationTime

• **creationTime**: `number`

Validity starting time of the token

#### Defined in

[src/models/AuthenticationToken.ts:29](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/AuthenticationToken.ts#L29)

___

### token

• **token**: `string`

Encrypted token

#### Defined in

[src/models/AuthenticationToken.ts:25](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/AuthenticationToken.ts#L25)

___

### validity

• **validity**: `number`

Token validity in seconds

#### Defined in

[src/models/AuthenticationToken.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/AuthenticationToken.ts#L33)

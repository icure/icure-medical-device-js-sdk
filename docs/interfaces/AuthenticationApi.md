[@icure/medical-device-sdk](../modules.md) / AuthenticationApi

# Interface: AuthenticationApi

The AuthenticationApi interface provides methods to authenticate and register users.

## Table of contents

### Methods

- [authenticateAndAskAccessToItsExistingData](AuthenticationApi.md#authenticateandaskaccesstoitsexistingdata)
- [completeAuthentication](AuthenticationApi.md#completeauthentication)
- [startAuthentication](AuthenticationApi.md#startauthentication)

## Methods

### authenticateAndAskAccessToItsExistingData

▸ **authenticateAndAskAccessToItsExistingData**(`userLogin`, `shortLivedToken`, `userKeyPair`, `tokenAndKeyPairProvider`): `Promise`<``null`` \| `AuthenticationResult`\>

Completes the authentication process of a user created from a Patient.
- It creates the private and public key for the user
- It creates a long-lived authentication token
- Send a Notification to all the delegated HCP to ask for access to the data of the Patient

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userLogin` | `string` | The login of the user |
| `shortLivedToken` | `string` | The short-lived authentication token created by the HCP |
| `userKeyPair` | `undefined` \| [`string`, `string`] | The key pair [private, public] that will be used by the user to encrypt/decrypt data; |
| `tokenAndKeyPairProvider` | (`groupId`: `string`, `userId`: `string`) => `undefined` \| [`string`, [`string`, `string`]] | A custom function to generate an authentication token and a key pair for user |

#### Returns

`Promise`<``null`` \| `AuthenticationResult`\>

The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
user.

#### Defined in

[src/apis/AuthenticationApi.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AuthenticationApi.ts#L65)

___

### completeAuthentication

▸ **completeAuthentication**(`process`, `validationCode`, `userKeyPair`, `tokenAndKeyPairProvider`): `Promise`<``null`` \| `AuthenticationResult`\>

Completes the authentication process of a user, by verifying the provided validation code and :
- In the case of a sign-up, create the user data;
- In the case of a login, re-generate keys if needed (new keys different from previous ones);

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `process` | `AuthenticationProcess` | The AuthenticationProcess previously provided in the startAuthentication service |
| `validationCode` | `string` | The validation code the user received by email/mobile phone |
| `userKeyPair` | `undefined` \| [`string`, `string`] | The key pair [private, public] that will be used by the user to encrypt/decrypt data; |
| `tokenAndKeyPairProvider` | (`groupId`: `string`, `userId`: `string`) => `undefined` \| [`string`, [`string`, `string`]] | A custom function to generate an authentication token and a key pair for user |

#### Returns

`Promise`<``null`` \| `AuthenticationResult`\>

The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
user.

#### Defined in

[src/apis/AuthenticationApi.ts:45](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AuthenticationApi.ts#L45)

___

### startAuthentication

▸ **startAuthentication**(`healthcareProfessionalId`, `firstName`, `lastName`, `recaptcha`, `bypassTokenCheck?`, `email?`, `mobilePhone?`): `Promise`<``null`` \| `AuthenticationProcess`\>

Starts the authentication of a user by sending him/her a validation code by email and/or mobile phone.
Use this service if you would like to sign-up or login your user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `healthcareProfessionalId` | `undefined` \| `string` | The id of the healthcare professional that wants to invite the user for its authentication. Use the id of the hcp in charge of the database where you want to add this new user |
| `firstName` | `string` | The firstname of the user to authenticate |
| `lastName` | `string` | The lastname of the user to authenticate |
| `recaptcha` | `string` | The recaptcha key used during authentication process |
| `bypassTokenCheck?` | `boolean` | Prevent the token check during the validation process |
| `email?` | `string` | The email of the user to authenticate |
| `mobilePhone?` | `string` | The mobile phone of the user to authenticate |

#### Returns

`Promise`<``null`` \| `AuthenticationProcess`\>

The AuthenticationProcess information needed to complete the authentication in the completeAuthentication service

#### Defined in

[src/apis/AuthenticationApi.ts:23](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/AuthenticationApi.ts#L23)

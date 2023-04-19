[@icure/medical-device-sdk](../modules) / AuthenticationApi

# SDK API: AuthenticationApi

The AuthenticationApi interface provides methods to authenticate and register users.

## Table of contents

### Methods

- [authenticateAndAskAccessToItsExistingData](AuthenticationApi#authenticateandaskaccesstoitsexistingdata)
- [completeAuthentication](AuthenticationApi#completeauthentication)
- [startAuthentication](AuthenticationApi#startauthentication)

## Methods

### authenticateAndAskAccessToItsExistingData

▸ **authenticateAndAskAccessToItsExistingData**(`userLogin`, `shortLivedToken`): `Promise`<`AuthenticationResult`\>

Completes the authentication process of a user created from a Patient.
- It creates the private and public key for the user
- It creates a long-lived authentication token
- Send a Notification to all the delegated HCP to ask for access to the data of the Patient

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userLogin` | `string` | The login of the user |
| `shortLivedToken` | `string` | The short-lived authentication token created by the HCP |

#### Returns

`Promise`<`AuthenticationResult`\>

The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
user.

#### Defined in

[src/apis/AuthenticationApi.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AuthenticationApi.ts#L72)

___

### completeAuthentication

▸ **completeAuthentication**(`process`, `validationCode`): `Promise`<`AuthenticationResult`\>

Completes the authentication process of a user, by verifying the provided validation code and :
- In the case of a sign-up, create the user data;
- In the case of a login, re-generate keys if needed (new keys different from previous ones);

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `process` | `AuthenticationProcess` | The AuthenticationProcess previously provided in the startAuthentication service |
| `validationCode` | `string` | The validation code the user received by email/mobile phone |

#### Returns

`Promise`<`AuthenticationResult`\>

The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
user.

#### Defined in

[src/apis/AuthenticationApi.ts:57](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AuthenticationApi.ts#L57)

___

### startAuthentication

▸ **startAuthentication**(`recaptcha`, `email?`, `phoneNumber?`, `firstName?`, `lastName?`, `healthcareProfessionalId?`, `bypassTokenCheck?`, `validationCodeLength?`, `recaptchaType?`): `Promise`<`AuthenticationProcess`\>

Starts the authentication of a user by sending him/her a validation code by email and/or by SMS.
Use this service if you would like to register or login your user in the iCure system.

Provide at least one authentication tool (email and/or phoneNumber) to start the process.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recaptcha` | `string` | To authenticate through iCure, we ask you to implement the reCAPTCHA v3 (Check [https://developers.google.com/recaptcha/docs/v3](https://developers.google.com/recaptcha/docs/v3)). This argument corresponds to the resulting key of the recaptcha procedure. |
| `email?` | `string` | The email to use to authenticate the user |
| `phoneNumber?` | `string` | The phone number to use to authenticate the user |
| `firstName?` | `string` | The firstname of the user to authenticate (Mandatory for registration only) |
| `lastName?` | `string` | The lastname of the user to authenticate (Mandatory for registration only) |
| `healthcareProfessionalId?` | `string` | The id of the healthcare professional inviting the user to register. Use the id of the hcp in charge of the database where you want to add this new user. (Mandatory for registration only) |
| `bypassTokenCheck?` | `boolean` | Prevent the token check during the validation process. Activates this flag **ONLY** for dedicated use cases and users, like the submission on the Apple / Google Store. (false by default) |
| `validationCodeLength?` | `number` | The length of the validation code to send to the user. (6 by default) |
| `recaptchaType?` | [`RecaptchaType`](../modules#recaptchatype) | The type of ReCAPTCHA you used during your authentication flow. Can either be Google reCAPTCHA v3 [https://developers.google.com/recaptcha/docs/v3](https://developers.google.com/recaptcha/docs/v3) or the * friendly-captcha [https://friendlycaptcha.com/](https://friendlycaptcha.com/). Use the friendly-recaptcha if you would like to avoid tracking solution of Google reCAPTCHA. |

#### Returns

`Promise`<`AuthenticationProcess`\>

The AuthenticationProcess information needed to complete the authentication in the completeAuthentication service

#### Defined in

[src/apis/AuthenticationApi.ts:33](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/AuthenticationApi.ts#L33)

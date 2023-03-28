[@icure/medical-device-sdk](../modules) / MedTechApi

# Class: MedTechApi

## Table of contents

### Constructors

- [constructor](MedTechApi#constructor)

### Properties

- [\_authenticationApi](MedTechApi#_authenticationapi)
- [\_baseApi](MedTechApi#_baseapi)
- [\_codingApi](MedTechApi#_codingapi)
- [\_cryptoApi](MedTechApi#_cryptoapi)
- [\_dataOwnerApi](MedTechApi#_dataownerapi)
- [\_dataSampleApi](MedTechApi#_datasampleapi)
- [\_errorHandler](MedTechApi#_errorhandler)
- [\_healthcareElementApi](MedTechApi#_healthcareelementapi)
- [\_healthcareProfessionalApi](MedTechApi#_healthcareprofessionalapi)
- [\_iCureBaseUrl](MedTechApi#_icurebaseurl)
- [\_keyStorage](MedTechApi#_keystorage)
- [\_medicalDeviceApi](MedTechApi#_medicaldeviceapi)
- [\_messageGatewayApi](MedTechApi#_messagegatewayapi)
- [\_notificationApi](MedTechApi#_notificationapi)
- [\_password](MedTechApi#_password)
- [\_patientApi](MedTechApi#_patientapi)
- [\_sanitizer](MedTechApi#_sanitizer)
- [\_storage](MedTechApi#_storage)
- [\_userApi](MedTechApi#_userapi)
- [\_username](MedTechApi#_username)

### Accessors

- [authenticationApi](MedTechApi#authenticationapi)
- [codingApi](MedTechApi#codingapi)
- [cryptoApi](MedTechApi#cryptoapi)
- [dataOwnerApi](MedTechApi#dataownerapi)
- [dataSampleApi](MedTechApi#datasampleapi)
- [healthcareElementApi](MedTechApi#healthcareelementapi)
- [healthcareProfessionalApi](MedTechApi#healthcareprofessionalapi)
- [iCureBaseUrl](MedTechApi#icurebaseurl)
- [keyStorage](MedTechApi#keystorage)
- [medicalDeviceApi](MedTechApi#medicaldeviceapi)
- [notificationApi](MedTechApi#notificationapi)
- [password](MedTechApi#password)
- [patientApi](MedTechApi#patientapi)
- [storage](MedTechApi#storage)
- [userApi](MedTechApi#userapi)
- [username](MedTechApi#username)

### Methods

- [addKeyPair](MedTechApi#addkeypair)
- [initUserCrypto](MedTechApi#initusercrypto)

## Constructors

### constructor

• **new MedTechApi**(`api`, `basePath`, `username`, `password`, `msgGtwUrl?`, `msgGtwSpecId?`, `authProcessByEmailId?`, `authProcessBySmsId?`, `storage?`, `keyStorage?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `api` | `Object` | `undefined` |
| `api.accessLogApi` | `IccAccesslogXApi` | `undefined` |
| `api.agendaApi` | `IccAgendaApi` | `undefined` |
| `api.authApi` | `IccAuthApi` | `undefined` |
| `api.calendarItemApi` | `IccCalendarItemXApi` | `undefined` |
| `api.classificationApi` | `IccClassificationXApi` | `undefined` |
| `api.codeApi` | `IccCodeXApi` | `undefined` |
| `api.contactApi` | `IccContactXApi` | `undefined` |
| `api.cryptoApi` | `IccCryptoXApi` | `undefined` |
| `api.dataOwnerApi` | `IccDataOwnerXApi` | `undefined` |
| `api.deviceApi` | `IccDeviceApi` | `undefined` |
| `api.documentApi` | `IccDocumentXApi` | `undefined` |
| `api.entityReferenceApi` | `IccEntityrefApi` | `undefined` |
| `api.formApi` | `IccFormXApi` | `undefined` |
| `api.groupApi` | `IccGroupApi` | `undefined` |
| `api.healthcareElementApi` | `IccHelementXApi` | `undefined` |
| `api.healthcarePartyApi` | `IccHcpartyXApi` | `undefined` |
| `api.insuranceApi` | `IccInsuranceApi` | `undefined` |
| `api.invoiceApi` | `IccInvoiceXApi` | `undefined` |
| `api.maintenanceTaskApi` | `IccMaintenanceTaskXApi` | `undefined` |
| `api.messageApi` | `IccMessageXApi` | `undefined` |
| `api.patientApi` | `IccPatientXApi` | `undefined` |
| `api.receiptApi` | `IccReceiptXApi` | `undefined` |
| `api.timetableApi` | `IccTimeTableXApi` | `undefined` |
| `api.userApi` | `IccUserXApi` | `undefined` |
| `basePath` | `string` | `undefined` |
| `username` | `string` | `undefined` |
| `password` | `string` | `undefined` |
| `msgGtwUrl` | `undefined` \| `string` | `undefined` |
| `msgGtwSpecId` | `undefined` \| `string` | `undefined` |
| `authProcessByEmailId` | `undefined` \| `string` | `undefined` |
| `authProcessBySmsId` | `undefined` \| `string` | `undefined` |
| `storage?` | [`StorageFacade`](../interfaces/StorageFacade)<`string`\> | `undefined` |
| `keyStorage?` | [`KeyStorageFacade`](../interfaces/KeyStorageFacade) | `undefined` |

#### Defined in

[src/apis/MedTechApi.ts:111](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L111)

## Properties

### \_authenticationApi

• `Private` `Readonly` **\_authenticationApi**: `undefined` \| [`AuthenticationApi`](../apis/AuthenticationApi)

#### Defined in

[src/apis/MedTechApi.ts:79](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L79)

___

### \_baseApi

• `Private` `Readonly` **\_baseApi**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accessLogApi` | `IccAccesslogXApi` |
| `authApi` | `IccAuthApi` |
| `calendarItemApi` | `IccCalendarItemXApi` |
| `classificationApi` | `IccClassificationXApi` |
| `codeApi` | `IccCodeXApi` |
| `contactApi` | `IccContactXApi` |
| `cryptoApi` | `IccCryptoXApi` |
| `dataOwnerApi` | `IccDataOwnerXApi` |
| `deviceApi` | `IccDeviceApi` |
| `documentApi` | `IccDocumentXApi` |
| `entityReferenceApi` | `IccEntityrefApi` |
| `formApi` | `IccFormXApi` |
| `groupApi` | `IccGroupApi` |
| `healthcareElementApi` | `IccHelementXApi` |
| `healthcarePartyApi` | `IccHcpartyXApi` |
| `insuranceApi` | `IccInsuranceApi` |
| `invoiceApi` | `IccInvoiceXApi` |
| `maintenanceTaskApi` | `IccMaintenanceTaskXApi` |
| `messageApi` | `IccMessageXApi` |
| `patientApi` | `IccPatientXApi` |
| `receiptApi` | `IccReceiptXApi` |
| `timetableApi` | `IccTimeTableXApi` |
| `userApi` | `IccUserXApi` |

#### Defined in

[src/apis/MedTechApi.ts:85](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L85)

___

### \_codingApi

• `Private` `Readonly` **\_codingApi**: [`CodingApi`](../apis/CodingApi)

#### Defined in

[src/apis/MedTechApi.ts:64](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L64)

___

### \_cryptoApi

• `Private` `Readonly` **\_cryptoApi**: `IccCryptoXApi`

#### Defined in

[src/apis/MedTechApi.ts:73](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L73)

___

### \_dataOwnerApi

• `Private` `Readonly` **\_dataOwnerApi**: [`DataOwnerApi`](../apis/DataOwnerApi)

#### Defined in

[src/apis/MedTechApi.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L72)

___

### \_dataSampleApi

• `Private` `Readonly` **\_dataSampleApi**: [`DataSampleApi`](../apis/DataSampleApi)

#### Defined in

[src/apis/MedTechApi.ts:71](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L71)

___

### \_errorHandler

• `Private` `Readonly` **\_errorHandler**: `ErrorHandler`

#### Defined in

[src/apis/MedTechApi.ts:81](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L81)

___

### \_healthcareElementApi

• `Private` `Readonly` **\_healthcareElementApi**: [`HealthcareElementApi`](../apis/HealthcareElementApi)

#### Defined in

[src/apis/MedTechApi.ts:67](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L67)

___

### \_healthcareProfessionalApi

• `Private` `Readonly` **\_healthcareProfessionalApi**: [`HealthcareProfessionalApi`](../apis/HealthcareProfessionalApi)

#### Defined in

[src/apis/MedTechApi.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L70)

___

### \_iCureBaseUrl

• `Private` `Readonly` **\_iCureBaseUrl**: `string`

#### Defined in

[src/apis/MedTechApi.ts:75](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L75)

___

### \_keyStorage

• `Private` `Readonly` **\_keyStorage**: [`KeyStorageFacade`](../interfaces/KeyStorageFacade)

#### Defined in

[src/apis/MedTechApi.ts:84](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L84)

___

### \_medicalDeviceApi

• `Private` `Readonly` **\_medicalDeviceApi**: [`MedicalDeviceApi`](../apis/MedicalDeviceApi)

#### Defined in

[src/apis/MedTechApi.ts:69](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L69)

___

### \_messageGatewayApi

• `Private` `Readonly` **\_messageGatewayApi**: `undefined` \| `MessageGatewayApi`

#### Defined in

[src/apis/MedTechApi.ts:80](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L80)

___

### \_notificationApi

• `Private` `Readonly` **\_notificationApi**: [`NotificationApi`](../apis/NotificationApi)

#### Defined in

[src/apis/MedTechApi.ts:68](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L68)

___

### \_password

• `Private` `Readonly` **\_password**: `string`

#### Defined in

[src/apis/MedTechApi.ts:77](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L77)

___

### \_patientApi

• `Private` `Readonly` **\_patientApi**: [`PatientApi`](../apis/PatientApi)

#### Defined in

[src/apis/MedTechApi.ts:66](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L66)

___

### \_sanitizer

• `Private` `Readonly` **\_sanitizer**: `Sanitizer`

#### Defined in

[src/apis/MedTechApi.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L82)

___

### \_storage

• `Private` `Readonly` **\_storage**: [`StorageFacade`](../interfaces/StorageFacade)<`string`\>

#### Defined in

[src/apis/MedTechApi.ts:83](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L83)

___

### \_userApi

• `Private` `Readonly` **\_userApi**: [`UserApi`](../apis/UserApi)

#### Defined in

[src/apis/MedTechApi.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L65)

___

### \_username

• `Private` `Readonly` **\_username**: `string`

#### Defined in

[src/apis/MedTechApi.ts:76](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L76)

## Accessors

### authenticationApi

• `get` **authenticationApi**(): [`AuthenticationApi`](../apis/AuthenticationApi)

#### Returns

[`AuthenticationApi`](../apis/AuthenticationApi)

#### Defined in

[src/apis/MedTechApi.ts:231](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L231)

___

### codingApi

• `get` **codingApi**(): [`CodingApi`](../apis/CodingApi)

#### Returns

[`CodingApi`](../apis/CodingApi)

#### Defined in

[src/apis/MedTechApi.ts:191](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L191)

___

### cryptoApi

• `get` **cryptoApi**(): `IccCryptoXApi`

#### Returns

`IccCryptoXApi`

#### Defined in

[src/apis/MedTechApi.ts:227](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L227)

___

### dataOwnerApi

• `get` **dataOwnerApi**(): [`DataOwnerApi`](../apis/DataOwnerApi)

#### Returns

[`DataOwnerApi`](../apis/DataOwnerApi)

#### Defined in

[src/apis/MedTechApi.ts:223](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L223)

___

### dataSampleApi

• `get` **dataSampleApi**(): [`DataSampleApi`](../apis/DataSampleApi)

#### Returns

[`DataSampleApi`](../apis/DataSampleApi)

#### Defined in

[src/apis/MedTechApi.ts:219](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L219)

___

### healthcareElementApi

• `get` **healthcareElementApi**(): [`HealthcareElementApi`](../apis/HealthcareElementApi)

#### Returns

[`HealthcareElementApi`](../apis/HealthcareElementApi)

#### Defined in

[src/apis/MedTechApi.ts:203](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L203)

___

### healthcareProfessionalApi

• `get` **healthcareProfessionalApi**(): [`HealthcareProfessionalApi`](../apis/HealthcareProfessionalApi)

#### Returns

[`HealthcareProfessionalApi`](../apis/HealthcareProfessionalApi)

#### Defined in

[src/apis/MedTechApi.ts:215](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L215)

___

### iCureBaseUrl

• `get` **iCureBaseUrl**(): `string`

#### Returns

`string`

#### Defined in

[src/apis/MedTechApi.ts:241](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L241)

___

### keyStorage

• `get` **keyStorage**(): [`KeyStorageFacade`](../interfaces/KeyStorageFacade)

#### Returns

[`KeyStorageFacade`](../interfaces/KeyStorageFacade)

#### Defined in

[src/apis/MedTechApi.ts:257](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L257)

___

### medicalDeviceApi

• `get` **medicalDeviceApi**(): [`MedicalDeviceApi`](../apis/MedicalDeviceApi)

#### Returns

[`MedicalDeviceApi`](../apis/MedicalDeviceApi)

#### Defined in

[src/apis/MedTechApi.ts:211](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L211)

___

### notificationApi

• `get` **notificationApi**(): [`NotificationApi`](../apis/NotificationApi)

#### Returns

[`NotificationApi`](../apis/NotificationApi)

#### Defined in

[src/apis/MedTechApi.ts:207](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L207)

___

### password

• `get` **password**(): `string`

#### Returns

`string`

#### Defined in

[src/apis/MedTechApi.ts:249](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L249)

___

### patientApi

• `get` **patientApi**(): [`PatientApi`](../apis/PatientApi)

#### Returns

[`PatientApi`](../apis/PatientApi)

#### Defined in

[src/apis/MedTechApi.ts:199](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L199)

___

### storage

• `get` **storage**(): [`StorageFacade`](../interfaces/StorageFacade)<`string`\>

#### Returns

[`StorageFacade`](../interfaces/StorageFacade)<`string`\>

#### Defined in

[src/apis/MedTechApi.ts:253](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L253)

___

### userApi

• `get` **userApi**(): [`UserApi`](../apis/UserApi)

#### Returns

[`UserApi`](../apis/UserApi)

#### Defined in

[src/apis/MedTechApi.ts:195](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L195)

___

### username

• `get` **username**(): `string`

#### Returns

`string`

#### Defined in

[src/apis/MedTechApi.ts:245](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L245)

## Methods

### addKeyPair

▸ **addKeyPair**(`dataOwnerId`, `keyPair`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataOwnerId` | `string` |
| `keyPair` | `Object` |
| `keyPair.privateKey` | `string` |
| `keyPair.publicKey` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/apis/MedTechApi.ts:261](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L261)

___

### initUserCrypto

▸ **initUserCrypto**(`keyPair?`): `Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyPair?` | `Object` |
| `keyPair.privateKey` | `string` |
| `keyPair.publicKey` | `string` |

#### Returns

`Promise`<{ `privateKey`: `string` ; `publicKey`: `string`  }[]\>

#### Defined in

[src/apis/MedTechApi.ts:270](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L270)

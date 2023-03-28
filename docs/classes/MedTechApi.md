[@icure/medical-device-sdk](../modules.md) / MedTechApi

# Class: MedTechApi

## Table of contents

### Constructors

- [constructor](MedTechApi.md#constructor)

### Properties

- [\_authenticationApi](MedTechApi.md#_authenticationapi)
- [\_baseApi](MedTechApi.md#_baseapi)
- [\_codingApi](MedTechApi.md#_codingapi)
- [\_cryptoApi](MedTechApi.md#_cryptoapi)
- [\_dataOwnerApi](MedTechApi.md#_dataownerapi)
- [\_dataSampleApi](MedTechApi.md#_datasampleapi)
- [\_errorHandler](MedTechApi.md#_errorhandler)
- [\_healthcareElementApi](MedTechApi.md#_healthcareelementapi)
- [\_healthcareProfessionalApi](MedTechApi.md#_healthcareprofessionalapi)
- [\_iCureBaseUrl](MedTechApi.md#_icurebaseurl)
- [\_keyStorage](MedTechApi.md#_keystorage)
- [\_medicalDeviceApi](MedTechApi.md#_medicaldeviceapi)
- [\_messageGatewayApi](MedTechApi.md#_messagegatewayapi)
- [\_notificationApi](MedTechApi.md#_notificationapi)
- [\_password](MedTechApi.md#_password)
- [\_patientApi](MedTechApi.md#_patientapi)
- [\_sanitizer](MedTechApi.md#_sanitizer)
- [\_storage](MedTechApi.md#_storage)
- [\_userApi](MedTechApi.md#_userapi)
- [\_username](MedTechApi.md#_username)

### Accessors

- [authenticationApi](MedTechApi.md#authenticationapi)
- [codingApi](MedTechApi.md#codingapi)
- [cryptoApi](MedTechApi.md#cryptoapi)
- [dataOwnerApi](MedTechApi.md#dataownerapi)
- [dataSampleApi](MedTechApi.md#datasampleapi)
- [healthcareElementApi](MedTechApi.md#healthcareelementapi)
- [healthcareProfessionalApi](MedTechApi.md#healthcareprofessionalapi)
- [iCureBaseUrl](MedTechApi.md#icurebaseurl)
- [keyStorage](MedTechApi.md#keystorage)
- [medicalDeviceApi](MedTechApi.md#medicaldeviceapi)
- [notificationApi](MedTechApi.md#notificationapi)
- [password](MedTechApi.md#password)
- [patientApi](MedTechApi.md#patientapi)
- [storage](MedTechApi.md#storage)
- [userApi](MedTechApi.md#userapi)
- [username](MedTechApi.md#username)

### Methods

- [addKeyPair](MedTechApi.md#addkeypair)
- [initUserCrypto](MedTechApi.md#initusercrypto)

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
| `storage?` | [`StorageFacade`](../interfaces/StorageFacade.md)<`string`\> | `undefined` |
| `keyStorage?` | [`KeyStorageFacade`](../interfaces/KeyStorageFacade.md) | `undefined` |

#### Defined in

[src/apis/MedTechApi.ts:111](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L111)

## Properties

### \_authenticationApi

• `Private` `Readonly` **\_authenticationApi**: `undefined` \| [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/MedTechApi.ts:79](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L79)

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

[src/apis/MedTechApi.ts:85](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L85)

___

### \_codingApi

• `Private` `Readonly` **\_codingApi**: [`CodingApi`](../interfaces/CodingApi.md)

#### Defined in

[src/apis/MedTechApi.ts:64](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L64)

___

### \_cryptoApi

• `Private` `Readonly` **\_cryptoApi**: `IccCryptoXApi`

#### Defined in

[src/apis/MedTechApi.ts:73](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L73)

___

### \_dataOwnerApi

• `Private` `Readonly` **\_dataOwnerApi**: [`DataOwnerApi`](../interfaces/DataOwnerApi.md)

#### Defined in

[src/apis/MedTechApi.ts:72](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L72)

___

### \_dataSampleApi

• `Private` `Readonly` **\_dataSampleApi**: [`DataSampleApi`](../interfaces/DataSampleApi.md)

#### Defined in

[src/apis/MedTechApi.ts:71](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L71)

___

### \_errorHandler

• `Private` `Readonly` **\_errorHandler**: `ErrorHandler`

#### Defined in

[src/apis/MedTechApi.ts:81](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L81)

___

### \_healthcareElementApi

• `Private` `Readonly` **\_healthcareElementApi**: [`HealthcareElementApi`](../interfaces/HealthcareElementApi.md)

#### Defined in

[src/apis/MedTechApi.ts:67](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L67)

___

### \_healthcareProfessionalApi

• `Private` `Readonly` **\_healthcareProfessionalApi**: [`HealthcareProfessionalApi`](../interfaces/HealthcareProfessionalApi.md)

#### Defined in

[src/apis/MedTechApi.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L70)

___

### \_iCureBaseUrl

• `Private` `Readonly` **\_iCureBaseUrl**: `string`

#### Defined in

[src/apis/MedTechApi.ts:75](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L75)

___

### \_keyStorage

• `Private` `Readonly` **\_keyStorage**: [`KeyStorageFacade`](../interfaces/KeyStorageFacade.md)

#### Defined in

[src/apis/MedTechApi.ts:84](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L84)

___

### \_medicalDeviceApi

• `Private` `Readonly` **\_medicalDeviceApi**: [`MedicalDeviceApi`](../interfaces/MedicalDeviceApi.md)

#### Defined in

[src/apis/MedTechApi.ts:69](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L69)

___

### \_messageGatewayApi

• `Private` `Readonly` **\_messageGatewayApi**: `undefined` \| `MessageGatewayApi`

#### Defined in

[src/apis/MedTechApi.ts:80](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L80)

___

### \_notificationApi

• `Private` `Readonly` **\_notificationApi**: [`NotificationApi`](../interfaces/NotificationApi.md)

#### Defined in

[src/apis/MedTechApi.ts:68](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L68)

___

### \_password

• `Private` `Readonly` **\_password**: `string`

#### Defined in

[src/apis/MedTechApi.ts:77](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L77)

___

### \_patientApi

• `Private` `Readonly` **\_patientApi**: [`PatientApi`](../interfaces/PatientApi.md)

#### Defined in

[src/apis/MedTechApi.ts:66](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L66)

___

### \_sanitizer

• `Private` `Readonly` **\_sanitizer**: `Sanitizer`

#### Defined in

[src/apis/MedTechApi.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L82)

___

### \_storage

• `Private` `Readonly` **\_storage**: [`StorageFacade`](../interfaces/StorageFacade.md)<`string`\>

#### Defined in

[src/apis/MedTechApi.ts:83](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L83)

___

### \_userApi

• `Private` `Readonly` **\_userApi**: [`UserApi`](../interfaces/UserApi.md)

#### Defined in

[src/apis/MedTechApi.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L65)

___

### \_username

• `Private` `Readonly` **\_username**: `string`

#### Defined in

[src/apis/MedTechApi.ts:76](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L76)

## Accessors

### authenticationApi

• `get` **authenticationApi**(): [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Returns

[`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/MedTechApi.ts:231](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L231)

___

### codingApi

• `get` **codingApi**(): [`CodingApi`](../interfaces/CodingApi.md)

#### Returns

[`CodingApi`](../interfaces/CodingApi.md)

#### Defined in

[src/apis/MedTechApi.ts:191](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L191)

___

### cryptoApi

• `get` **cryptoApi**(): `IccCryptoXApi`

#### Returns

`IccCryptoXApi`

#### Defined in

[src/apis/MedTechApi.ts:227](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L227)

___

### dataOwnerApi

• `get` **dataOwnerApi**(): [`DataOwnerApi`](../interfaces/DataOwnerApi.md)

#### Returns

[`DataOwnerApi`](../interfaces/DataOwnerApi.md)

#### Defined in

[src/apis/MedTechApi.ts:223](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L223)

___

### dataSampleApi

• `get` **dataSampleApi**(): [`DataSampleApi`](../interfaces/DataSampleApi.md)

#### Returns

[`DataSampleApi`](../interfaces/DataSampleApi.md)

#### Defined in

[src/apis/MedTechApi.ts:219](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L219)

___

### healthcareElementApi

• `get` **healthcareElementApi**(): [`HealthcareElementApi`](../interfaces/HealthcareElementApi.md)

#### Returns

[`HealthcareElementApi`](../interfaces/HealthcareElementApi.md)

#### Defined in

[src/apis/MedTechApi.ts:203](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L203)

___

### healthcareProfessionalApi

• `get` **healthcareProfessionalApi**(): [`HealthcareProfessionalApi`](../interfaces/HealthcareProfessionalApi.md)

#### Returns

[`HealthcareProfessionalApi`](../interfaces/HealthcareProfessionalApi.md)

#### Defined in

[src/apis/MedTechApi.ts:215](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L215)

___

### iCureBaseUrl

• `get` **iCureBaseUrl**(): `string`

#### Returns

`string`

#### Defined in

[src/apis/MedTechApi.ts:241](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L241)

___

### keyStorage

• `get` **keyStorage**(): [`KeyStorageFacade`](../interfaces/KeyStorageFacade.md)

#### Returns

[`KeyStorageFacade`](../interfaces/KeyStorageFacade.md)

#### Defined in

[src/apis/MedTechApi.ts:257](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L257)

___

### medicalDeviceApi

• `get` **medicalDeviceApi**(): [`MedicalDeviceApi`](../interfaces/MedicalDeviceApi.md)

#### Returns

[`MedicalDeviceApi`](../interfaces/MedicalDeviceApi.md)

#### Defined in

[src/apis/MedTechApi.ts:211](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L211)

___

### notificationApi

• `get` **notificationApi**(): [`NotificationApi`](../interfaces/NotificationApi.md)

#### Returns

[`NotificationApi`](../interfaces/NotificationApi.md)

#### Defined in

[src/apis/MedTechApi.ts:207](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L207)

___

### password

• `get` **password**(): `string`

#### Returns

`string`

#### Defined in

[src/apis/MedTechApi.ts:249](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L249)

___

### patientApi

• `get` **patientApi**(): [`PatientApi`](../interfaces/PatientApi.md)

#### Returns

[`PatientApi`](../interfaces/PatientApi.md)

#### Defined in

[src/apis/MedTechApi.ts:199](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L199)

___

### storage

• `get` **storage**(): [`StorageFacade`](../interfaces/StorageFacade.md)<`string`\>

#### Returns

[`StorageFacade`](../interfaces/StorageFacade.md)<`string`\>

#### Defined in

[src/apis/MedTechApi.ts:253](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L253)

___

### userApi

• `get` **userApi**(): [`UserApi`](../interfaces/UserApi.md)

#### Returns

[`UserApi`](../interfaces/UserApi.md)

#### Defined in

[src/apis/MedTechApi.ts:195](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L195)

___

### username

• `get` **username**(): `string`

#### Returns

`string`

#### Defined in

[src/apis/MedTechApi.ts:245](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L245)

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

[src/apis/MedTechApi.ts:261](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L261)

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

[src/apis/MedTechApi.ts:270](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L270)

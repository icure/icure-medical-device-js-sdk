[@icure/medical-device-sdk](../modules.md) / MedTechApi

# Class: MedTechApi

## Table of contents

### Constructors

- [constructor](MedTechApi.md#constructor)

### Properties

- [\_authProcessId](MedTechApi.md#_authprocessid)
- [\_authenticationApi](MedTechApi.md#_authenticationapi)
- [\_baseApi](MedTechApi.md#_baseapi)
- [\_basePath](MedTechApi.md#_basepath)
- [\_codingApi](MedTechApi.md#_codingapi)
- [\_cryptoApi](MedTechApi.md#_cryptoapi)
- [\_dataSampleApi](MedTechApi.md#_datasampleapi)
- [\_healthcareElementApi](MedTechApi.md#_healthcareelementapi)
- [\_healthcareProfessionalApi](MedTechApi.md#_healthcareprofessionalapi)
- [\_medicalDeviceApi](MedTechApi.md#_medicaldeviceapi)
- [\_messageGatewayApi](MedTechApi.md#_messagegatewayapi)
- [\_msgGtwSpecId](MedTechApi.md#_msggtwspecid)
- [\_msgGtwUrl](MedTechApi.md#_msggtwurl)
- [\_notificationApi](MedTechApi.md#_notificationapi)
- [\_password](MedTechApi.md#_password)
- [\_patientApi](MedTechApi.md#_patientapi)
- [\_userApi](MedTechApi.md#_userapi)
- [\_username](MedTechApi.md#_username)

### Accessors

- [authProcessId](MedTechApi.md#authprocessid)
- [authenticationApi](MedTechApi.md#authenticationapi)
- [baseApi](MedTechApi.md#baseapi)
- [basePath](MedTechApi.md#basepath)
- [codingApi](MedTechApi.md#codingapi)
- [cryptoApi](MedTechApi.md#cryptoapi)
- [dataSampleApi](MedTechApi.md#datasampleapi)
- [healthcareElementApi](MedTechApi.md#healthcareelementapi)
- [healthcareProfessionalApi](MedTechApi.md#healthcareprofessionalapi)
- [medicalDeviceApi](MedTechApi.md#medicaldeviceapi)
- [msgGtwUrl](MedTechApi.md#msggtwurl)
- [notificationApi](MedTechApi.md#notificationapi)
- [password](MedTechApi.md#password)
- [patientApi](MedTechApi.md#patientapi)
- [userApi](MedTechApi.md#userapi)
- [username](MedTechApi.md#username)

### Methods

- [addKeyPair](MedTechApi.md#addkeypair)

## Constructors

### constructor

• **new MedTechApi**(`api`, `basePath`, `username`, `password`, `msgGtwUrl?`, `msgGtwSpecId?`, `authProcessId?`)

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
| `username` | `undefined` \| `string` | `undefined` |
| `password` | `undefined` \| `string` | `undefined` |
| `msgGtwUrl` | `undefined` \| `string` | `undefined` |
| `msgGtwSpecId` | `undefined` \| `string` | `undefined` |
| `authProcessId` | `undefined` \| `string` | `undefined` |

#### Defined in

[src/apis/medTechApi.ts:71](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L71)

## Properties

### \_authProcessId

• `Private` `Readonly` **\_authProcessId**: `undefined` \| `string`

#### Defined in

[src/apis/medTechApi.ts:65](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L65)

___

### \_authenticationApi

• `Private` `Readonly` **\_authenticationApi**: `undefined` \| [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/medTechApi.ts:67](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L67)

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

[src/apis/medTechApi.ts:69](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L69)

___

### \_basePath

• `Private` `Readonly` **\_basePath**: `string`

#### Defined in

[src/apis/medTechApi.ts:61](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L61)

___

### \_codingApi

• `Private` `Readonly` **\_codingApi**: [`CodingApi`](../interfaces/CodingApi.md)

#### Defined in

[src/apis/medTechApi.ts:52](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L52)

___

### \_cryptoApi

• `Private` `Readonly` **\_cryptoApi**: `IccCryptoXApi`

#### Defined in

[src/apis/medTechApi.ts:60](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L60)

___

### \_dataSampleApi

• `Private` `Readonly` **\_dataSampleApi**: [`DataSampleApi`](../interfaces/DataSampleApi.md)

#### Defined in

[src/apis/medTechApi.ts:59](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L59)

___

### \_healthcareElementApi

• `Private` `Readonly` **\_healthcareElementApi**: [`HealthcareElementApi`](../interfaces/HealthcareElementApi.md)

#### Defined in

[src/apis/medTechApi.ts:55](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L55)

___

### \_healthcareProfessionalApi

• `Private` `Readonly` **\_healthcareProfessionalApi**: [`HealthcareProfessionalApi`](../interfaces/HealthcareProfessionalApi.md)

#### Defined in

[src/apis/medTechApi.ts:58](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L58)

___

### \_medicalDeviceApi

• `Private` `Readonly` **\_medicalDeviceApi**: [`MedicalDeviceApi`](../interfaces/MedicalDeviceApi.md)

#### Defined in

[src/apis/medTechApi.ts:57](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L57)

___

### \_messageGatewayApi

• `Private` `Readonly` **\_messageGatewayApi**: `undefined` \| `MessageGatewayApi`

#### Defined in

[src/apis/medTechApi.ts:68](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L68)

___

### \_msgGtwSpecId

• `Private` `Readonly` **\_msgGtwSpecId**: `undefined` \| `string`

#### Defined in

[src/apis/medTechApi.ts:66](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L66)

___

### \_msgGtwUrl

• `Private` `Readonly` **\_msgGtwUrl**: `undefined` \| `string`

#### Defined in

[src/apis/medTechApi.ts:64](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L64)

___

### \_notificationApi

• `Private` `Readonly` **\_notificationApi**: [`NotificationApi`](../interfaces/NotificationApi.md)

#### Defined in

[src/apis/medTechApi.ts:56](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L56)

___

### \_password

• `Private` `Readonly` **\_password**: `undefined` \| `string`

#### Defined in

[src/apis/medTechApi.ts:63](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L63)

___

### \_patientApi

• `Private` `Readonly` **\_patientApi**: [`PatientApi`](../interfaces/PatientApi.md)

#### Defined in

[src/apis/medTechApi.ts:54](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L54)

___

### \_userApi

• `Private` `Readonly` **\_userApi**: [`UserApi`](../interfaces/UserApi.md)

#### Defined in

[src/apis/medTechApi.ts:53](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L53)

___

### \_username

• `Private` `Readonly` **\_username**: `undefined` \| `string`

#### Defined in

[src/apis/medTechApi.ts:62](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L62)

## Accessors

### authProcessId

• `get` **authProcessId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/apis/medTechApi.ts:159](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L159)

___

### authenticationApi

• `get` **authenticationApi**(): [`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Returns

[`AuthenticationApi`](../interfaces/AuthenticationApi.md)

#### Defined in

[src/apis/medTechApi.ts:135](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L135)

___

### baseApi

• `get` **baseApi**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `accessLogApi` | `IccAccesslogXApi` |
| `authApi` | `IccAuthApi` |
| `calendarItemApi` | `IccCalendarItemXApi` |
| `classificationApi` | `IccClassificationXApi` |
| `codeApi` | `IccCodeXApi` |
| `contactApi` | `IccContactXApi` |
| `cryptoApi` | `IccCryptoXApi` |
| `deviceApi` | `IccDeviceApi` |
| `documentApi` | `IccDocumentXApi` |
| `entityReferenceApi` | `IccEntityrefApi` |
| `formApi` | `IccFormXApi` |
| `groupApi` | `IccGroupApi` |
| `healthcareElementApi` | `IccHelementXApi` |
| `healthcarePartyApi` | `IccHcpartyXApi` |
| `insuranceApi` | `IccInsuranceApi` |
| `invoiceApi` | `IccInvoiceXApi` |
| `messageApi` | `IccMessageXApi` |
| `patientApi` | `IccPatientXApi` |
| `receiptApi` | `IccReceiptXApi` |
| `timetableApi` | `IccTimeTableXApi` |
| `userApi` | `IccUserXApi` |

#### Defined in

[src/apis/medTechApi.ts:163](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L163)

___

### basePath

• `get` **basePath**(): `string`

#### Returns

`string`

#### Defined in

[src/apis/medTechApi.ts:143](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L143)

___

### codingApi

• `get` **codingApi**(): [`CodingApi`](../interfaces/CodingApi.md)

#### Returns

[`CodingApi`](../interfaces/CodingApi.md)

#### Defined in

[src/apis/medTechApi.ts:99](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L99)

___

### cryptoApi

• `get` **cryptoApi**(): `IccCryptoXApi`

#### Returns

`IccCryptoXApi`

#### Defined in

[src/apis/medTechApi.ts:131](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L131)

___

### dataSampleApi

• `get` **dataSampleApi**(): [`DataSampleApi`](../interfaces/DataSampleApi.md)

#### Returns

[`DataSampleApi`](../interfaces/DataSampleApi.md)

#### Defined in

[src/apis/medTechApi.ts:127](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L127)

___

### healthcareElementApi

• `get` **healthcareElementApi**(): [`HealthcareElementApi`](../interfaces/HealthcareElementApi.md)

#### Returns

[`HealthcareElementApi`](../interfaces/HealthcareElementApi.md)

#### Defined in

[src/apis/medTechApi.ts:111](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L111)

___

### healthcareProfessionalApi

• `get` **healthcareProfessionalApi**(): [`HealthcareProfessionalApi`](../interfaces/HealthcareProfessionalApi.md)

#### Returns

[`HealthcareProfessionalApi`](../interfaces/HealthcareProfessionalApi.md)

#### Defined in

[src/apis/medTechApi.ts:123](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L123)

___

### medicalDeviceApi

• `get` **medicalDeviceApi**(): [`MedicalDeviceApi`](../interfaces/MedicalDeviceApi.md)

#### Returns

[`MedicalDeviceApi`](../interfaces/MedicalDeviceApi.md)

#### Defined in

[src/apis/medTechApi.ts:119](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L119)

___

### msgGtwUrl

• `get` **msgGtwUrl**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/apis/medTechApi.ts:155](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L155)

___

### notificationApi

• `get` **notificationApi**(): [`NotificationApi`](../interfaces/NotificationApi.md)

#### Returns

[`NotificationApi`](../interfaces/NotificationApi.md)

#### Defined in

[src/apis/medTechApi.ts:115](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L115)

___

### password

• `get` **password**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/apis/medTechApi.ts:151](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L151)

___

### patientApi

• `get` **patientApi**(): [`PatientApi`](../interfaces/PatientApi.md)

#### Returns

[`PatientApi`](../interfaces/PatientApi.md)

#### Defined in

[src/apis/medTechApi.ts:107](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L107)

___

### userApi

• `get` **userApi**(): [`UserApi`](../interfaces/UserApi.md)

#### Returns

[`UserApi`](../interfaces/UserApi.md)

#### Defined in

[src/apis/medTechApi.ts:103](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L103)

___

### username

• `get` **username**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/apis/medTechApi.ts:147](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L147)

## Methods

### addKeyPair

▸ **addKeyPair**(`keyId`, `keyPair`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyId` | `string` |
| `keyPair` | `Object` |
| `keyPair.privateKey` | `string` |
| `keyPair.publicKey` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/apis/medTechApi.ts:167](https://github.com/icure/icure-medical-device-js-sdk/blob/e20bfa1/src/apis/medTechApi.ts#L167)

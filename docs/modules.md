# Package @icure/medical-device-sdk

## Table of contents



### SDK APIs
- [AuthenticationApi](interfaces/AuthenticationApi.md)
- [CodingApi](interfaces/CodingApi.md)
- [DataOwnerApi](interfaces/DataOwnerApi.md)
- [DataSampleApi](interfaces/DataSampleApi.md)
- [HealthcareElementApi](interfaces/HealthcareElementApi.md)
- [HealthcareProfessionalApi](interfaces/HealthcareProfessionalApi.md)
- [MedicalDeviceApi](interfaces/MedicalDeviceApi.md)
- [NotificationApi](interfaces/NotificationApi.md)
- [PatientApi](interfaces/PatientApi.md)
- [UserApi](interfaces/UserApi.md)


### Interfaces

- [Connection](interfaces/Connection.md)
- [EmailMessageFactory](interfaces/EmailMessageFactory.md)
- [KeyStorageFacade](interfaces/KeyStorageFacade.md)
- [MsgGtwMessageFactory](interfaces/MsgGtwMessageFactory.md)
- [PotentiallyEncryptedPatient](interfaces/PotentiallyEncryptedPatient.md)
- [SMSMessageFactory](interfaces/SMSMessageFactory.md)
- [StorageFacade](interfaces/StorageFacade.md)



### Domain classes

- [Address](classes/Address.md)
- [AnonymousMedTechApi](classes/AnonymousMedTechApi.md)
- [AnonymousMedTechApiBuilder](classes/AnonymousMedTechApiBuilder.md)
- [AuthenticationToken](classes/AuthenticationToken.md)
- [Coding](classes/Coding.md)
- [CodingFilter](classes/CodingFilter.md)
- [CodingReference](classes/CodingReference.md)
- [ConnectionImpl](classes/ConnectionImpl.md)
- [Content](classes/Content.md)
- [DataSample](classes/DataSample.md)
- [DataSampleFilter](classes/DataSampleFilter.md)
- [Delegation](classes/Delegation.md)
- [Document](classes/Document.md)
- [EncryptedPatient](classes/EncryptedPatient.md)
- [Filter](classes/Filter.md)
- [HealthcareElement](classes/HealthcareElement.md)
- [HealthcareElementFilter](classes/HealthcareElementFilter.md)
- [HealthcareProfessional](classes/HealthcareProfessional.md)
- [HealthcareProfessionalFilter](classes/HealthcareProfessionalFilter.md)
- [ICureRegistrationEmail](classes/ICureRegistrationEmail.md)
- [ICureRegistrationSMS](classes/ICureRegistrationSMS.md)
- [Identifier](classes/Identifier.md)
- [InlineResponse403](classes/InlineResponse403.md)
- [KeyStorageImpl](classes/KeyStorageImpl.md)
- [LocalStorageImpl](classes/LocalStorageImpl.md)
- [Measure](classes/Measure.md)
- [MedTechApi](classes/MedTechApi.md)
- [MedTechApiBuilder](classes/MedTechApiBuilder.md)
- [MedicalDevice](classes/MedicalDevice.md)
- [MedicalDeviceFilter](classes/MedicalDeviceFilter.md)
- [NotificationFilter](classes/NotificationFilter.md)
- [PaginatedDocumentKeyAndIdPairObject](classes/PaginatedDocumentKeyAndIdPairObject.md)
- [PaginatedListCoding](classes/PaginatedListCoding.md)
- [PaginatedListDataSample](classes/PaginatedListDataSample.md)
- [PaginatedListHealthcareElement](classes/PaginatedListHealthcareElement.md)
- [PaginatedListHealthcareProfessional](classes/PaginatedListHealthcareProfessional.md)
- [PaginatedListMedicalDevice](classes/PaginatedListMedicalDevice.md)
- [PaginatedListPatient](classes/PaginatedListPatient.md)
- [PaginatedListUser](classes/PaginatedListUser.md)
- [Partnership](classes/Partnership.md)
- [Patient](classes/Patient.md)
- [PatientFilter](classes/PatientFilter.md)
- [PatientHealthCareParty](classes/PatientHealthCareParty.md)
- [PersonName](classes/PersonName.md)
- [Property](classes/Property.md)
- [PropertyType](classes/PropertyType.md)
- [SystemMetaDataEncrypted](classes/SystemMetaDataEncrypted.md)
- [SystemMetaDataOwner](classes/SystemMetaDataOwner.md)
- [SystemMetaDataOwnerEncrypted](classes/SystemMetaDataOwnerEncrypted.md)
- [Telecom](classes/Telecom.md)
- [TimeSeries](classes/TimeSeries.md)
- [TypedValueObject](classes/TypedValueObject.md)
- [User](classes/User.md)
- [UserFilter](classes/UserFilter.md)
- [UuidEncoder](classes/UuidEncoder.md)



### Utility functions

- [a2b](modules.md#a2b)
- [amount](modules.md#amount)
- [b2a](modules.md#b2a)
- [b64Url2ua](modules.md#b64url2ua)
- [b64\_2ab](modules.md#b64_2ab)
- [b64\_2ua](modules.md#b64_2ua)
- [b64\_2uas](modules.md#b64_2uas)
- [dateDecode](modules.md#datedecode)
- [dateEncode](modules.md#dateencode)
- [hex2string](modules.md#hex2string)
- [hex2ua](modules.md#hex2ua)
- [ibanFormat](modules.md#ibanformat)
- [ibanValidate](modules.md#ibanvalidate)
- [isValidIBAN](modules.md#isvalidiban)
- [medTechApi](modules.md#medtechapi)
- [money](modules.md#money)
- [nihiiFormat](modules.md#nihiiformat)
- [nihiiValidate](modules.md#nihiivalidate)
- [personName](modules.md#personname)
- [personNameAbbrev](modules.md#personnameabbrev)
- [phoneNumberFormat](modules.md#phonenumberformat)
- [phoneNumberValidate](modules.md#phonenumbervalidate)
- [ssinFormat](modules.md#ssinformat)
- [ssinValidate](modules.md#ssinvalidate)
- [string2ab](modules.md#string2ab)
- [string2hex](modules.md#string2hex)
- [string2ua](modules.md#string2ua)
- [timeDecode](modules.md#timedecode)
- [timeEncode](modules.md#timeencode)
- [toMoment](modules.md#tomoment)
- [toUrlParams](modules.md#tourlparams)
- [ua2ab](modules.md#ua2ab)
- [ua2b64](modules.md#ua2b64)
- [ua2b64Url](modules.md#ua2b64url)
- [ua2hex](modules.md#ua2hex)
- [ua2string](modules.md#ua2string)
- [ua2utf8](modules.md#ua2utf8)
- [unit](modules.md#unit)
- [utf8\_2ua](modules.md#utf8_2ua)



### Utility Functions Documentation

### a2b

▸ **a2b**(`s`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-api/model/ModelHelper.d.ts:9

___

### amount

▸ **amount**(`value`): `number`

0.1 + 0.2 = 0.30000000000000004. Use this function to be better at maths.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

the rounded number, two after the comma

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:58

___

### b2a

▸ **b2a**(`a`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-api/model/ModelHelper.d.ts:8

___

### b64Url2ua

▸ **b64Url2ua**(`ua`): `ArrayBuffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ua` | `string` |

#### Returns

`ArrayBuffer`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/binary-utils.d.ts:20

___

### b64\_2ab

▸ **b64_2ab**(`s`): `ArrayBuffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`ArrayBuffer`

#### Defined in

node_modules/@icure/api/icc-api/model/ModelHelper.d.ts:5

___

### b64\_2ua

▸ **b64_2ua**(`s`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@icure/api/icc-api/model/ModelHelper.d.ts:6

___

### b64\_2uas

▸ **b64_2uas**(`s`): `Uint8Array`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`Uint8Array`[]

#### Defined in

node_modules/@icure/api/icc-x-api/utils/binary-utils.d.ts:18

___

### dateDecode

▸ **dateDecode**(`dateNumber`): `Date` \| `undefined`

Converts a backend date number (e.g., patient birth date) into a Date object.

**`Throws`**

Error if it is impossible to create a date from the number, other if dateNumber is negative.

**`See`**

 - #dateEncode
 - #timeDecode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dateNumber` | `number` | a YYYYMMDD date number from the backend |

#### Returns

`Date` \| `undefined`

a Date object

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:22

___

### dateEncode

▸ **dateEncode**(`date`): `number` \| `undefined`

Encodes a Date object into a backend date number (e.g., patient birth date).

**`See`**

 - #dateDecode
 - #timeEncode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `Date` | a Date object |

#### Returns

`number` \| `undefined`

a YYYYMMDD date number for the backend

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:38

___

### hex2string

▸ **hex2string**(`hexStr`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexStr` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/binary-utils.d.ts:21

___

### hex2ua

▸ **hex2ua**(`s`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/binary-utils.d.ts:10

___

### ibanFormat

▸ **ibanFormat**(`iban`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `iban` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:7

___

### ibanValidate

▸ **ibanValidate**(`iban`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `iban` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:6

___

### isValidIBAN

▸ **isValidIBAN**(`iban`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `iban` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:5

___

### medTechApi

▸ **medTechApi**(`api?`): [`MedTechApiBuilder`](classes/MedTechApiBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api?` | [`MedTechApi`](classes/MedTechApi.md) |

#### Returns

[`MedTechApiBuilder`](classes/MedTechApiBuilder.md)

#### Defined in

[src/apis/MedTechApi.ts:384](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/apis/MedTechApi.ts#L384)

___

### money

▸ **money**(`value`): `string`

A simple formatter to keep the logic across the app.
Input: 2.1 ; Output: 2.10€

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:63

___

### nihiiFormat

▸ **nihiiFormat**(`nihii`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nihii` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:8

___

### nihiiValidate

▸ **nihiiValidate**(`nihii`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nihii` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:9

___

### personName

▸ **personName**(`person`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `person` | `Object` |
| `person.firstName?` | `string` |
| `person.lastName?` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:71

___

### personNameAbbrev

▸ **personNameAbbrev**(`person`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `person` | `Object` |
| `person.firstName?` | `string` |
| `person.lastName?` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:75

___

### phoneNumberFormat

▸ **phoneNumberFormat**(`phoneNumber`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:13

___

### phoneNumberValidate

▸ **phoneNumberValidate**(`phoneNumber`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:12

___

### ssinFormat

▸ **ssinFormat**(`ssin`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ssin` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:10

___

### ssinValidate

▸ **ssinValidate**(`ssin`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ssin` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:11

___

### string2ab

▸ **string2ab**(`s`): `ArrayBuffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`ArrayBuffer`

#### Defined in

node_modules/@icure/api/icc-api/model/ModelHelper.d.ts:3

___

### string2hex

▸ **string2hex**(`text`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/binary-utils.d.ts:22

___

### string2ua

▸ **string2ua**(`s`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@icure/api/icc-api/model/ModelHelper.d.ts:2

___

### timeDecode

▸ **timeDecode**(`timeNumber`): `Date` \| `undefined`

Converts a backend time number (e.g., health element openingDate) into a Date object.

**`See`**

 - #timeEncode
 - #dateDecode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeNumber` | `number` | a YYYYMMDD date number from the backend |

#### Returns

`Date` \| `undefined`

a Date object

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:30

___

### timeEncode

▸ **timeEncode**(`date`): `number` \| `undefined`

Encodes a Date object into a backend time number (e.g., health element openingDate).

**`See`**

 - #timeDecode
 - #dateEncode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `Date` | a Date object |

#### Returns

`number` \| `undefined`

a YYYYMMDDHHmmss date number for the backend

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:46

___

### toMoment

▸ **toMoment**(`epochOrLongCalendar`): `Moment` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `epochOrLongCalendar` | `number` |

#### Returns

`Moment` \| ``null``

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:79

___

### toUrlParams

▸ **toUrlParams**(`params`): `string`

Transform a dictionary to a url params.
From { key1: value1, key2: value2, ... } returns key1=value1&key2=value2&...=...

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:68

___

### ua2ab

▸ **ua2ab**(`ua`): `ArrayBuffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ua` | `Uint8Array` |

#### Returns

`ArrayBuffer`

#### Defined in

node_modules/@icure/api/icc-api/model/ModelHelper.d.ts:4

___

### ua2b64

▸ **ua2b64**(`_ua`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ua` | `ArrayBuffer` \| `Uint8Array` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-api/model/ModelHelper.d.ts:7

___

### ua2b64Url

▸ **ua2b64Url**(`ua`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ua` | `ArrayBuffer` \| `Uint8Array` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/binary-utils.d.ts:19

___

### ua2hex

▸ **ua2hex**(`_ua`): `string`

Uint8Array/ArrayBuffer to hex String

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_ua` | `ArrayBuffer` \| `Uint8Array` | {Uint8Array} or ArrayBuffer |

#### Returns

`string`

Hex String

#### Defined in

node_modules/@icure/api/icc-x-api/utils/binary-utils.d.ts:17

___

### ua2string

▸ **ua2string**(`_ua`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ua` | `ArrayBuffer` \| `Uint8Array` |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-api/model/ModelHelper.d.ts:1

___

### ua2utf8

▸ **ua2utf8**(`_ua`): `string`

Uint8Array/ArrayBuffer to utf-8 strring

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_ua` | `ArrayBuffer` \| `Uint8Array` | {Uint8Array} or ArrayBuffer |

#### Returns

`string`

a UTF-8 encoded string

#### Defined in

node_modules/@icure/api/icc-x-api/utils/binary-utils.d.ts:9

___

### unit

▸ **unit**(`value`, `unit`): `string`

Formats a value and a physical unit into text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` | the numerical or string value to encode |
| `unit` | ``null`` \| `string` | the unit represented as a string (an empty string is also supported) |

#### Returns

`string`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/formatting-util.d.ts:52

___

### utf8\_2ua

▸ **utf8_2ua**(`str`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@icure/api/icc-x-api/utils/binary-utils.d.ts:3


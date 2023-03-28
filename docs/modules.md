# Package @icure/medical-device-sdk

## Table of contents



### Entry points APIs
- [AnonymousMedTechApi](entrypoints/AnonymousMedTechApi)
- [MedTechApi](entrypoints/MedTechApi)


### Builders
- [AnonymousMedTechApiBuilder](builders/AnonymousMedTechApiBuilder)
- [MedTechApiBuilder](builders/MedTechApiBuilder)


### APIs
- [AuthenticationApi](apis/AuthenticationApi)
- [CodingApi](apis/CodingApi)
- [DataOwnerApi](apis/DataOwnerApi)
- [DataSampleApi](apis/DataSampleApi)
- [HealthcareElementApi](apis/HealthcareElementApi)
- [HealthcareProfessionalApi](apis/HealthcareProfessionalApi)
- [MedicalDeviceApi](apis/MedicalDeviceApi)
- [NotificationApi](apis/NotificationApi)
- [PatientApi](apis/PatientApi)
- [UserApi](apis/UserApi)


### Interfaces

- [Connection](interfaces/Connection)
- [EmailMessageFactory](interfaces/EmailMessageFactory)
- [KeyStorageFacade](interfaces/KeyStorageFacade)
- [MsgGtwMessageFactory](interfaces/MsgGtwMessageFactory)
- [PotentiallyEncryptedPatient](interfaces/PotentiallyEncryptedPatient)
- [SMSMessageFactory](interfaces/SMSMessageFactory)
- [StorageFacade](interfaces/StorageFacade)



### Domain classes

- [Address](classes/Address)
- [AuthenticationToken](classes/AuthenticationToken)
- [Coding](classes/Coding)
- [CodingReference](classes/CodingReference)
- [ConnectionImpl](classes/ConnectionImpl)
- [Content](classes/Content)
- [DataSample](classes/DataSample)
- [Delegation](classes/Delegation)
- [Document](classes/Document)
- [EncryptedPatient](classes/EncryptedPatient)
- [HealthcareElement](classes/HealthcareElement)
- [HealthcareProfessional](classes/HealthcareProfessional)
- [ICureRegistrationEmail](classes/ICureRegistrationEmail)
- [ICureRegistrationSMS](classes/ICureRegistrationSMS)
- [Identifier](classes/Identifier)
- [InlineResponse403](classes/InlineResponse403)
- [KeyStorageImpl](classes/KeyStorageImpl)
- [LocalStorageImpl](classes/LocalStorageImpl)
- [Measure](classes/Measure)
- [MedicalDevice](classes/MedicalDevice)
- [PaginatedDocumentKeyAndIdPairObject](classes/PaginatedDocumentKeyAndIdPairObject)
- [PaginatedListCoding](classes/PaginatedListCoding)
- [PaginatedListDataSample](classes/PaginatedListDataSample)
- [PaginatedListHealthcareElement](classes/PaginatedListHealthcareElement)
- [PaginatedListHealthcareProfessional](classes/PaginatedListHealthcareProfessional)
- [PaginatedListMedicalDevice](classes/PaginatedListMedicalDevice)
- [PaginatedListPatient](classes/PaginatedListPatient)
- [PaginatedListUser](classes/PaginatedListUser)
- [Partnership](classes/Partnership)
- [Patient](classes/Patient)
- [PatientHealthCareParty](classes/PatientHealthCareParty)
- [PersonName](classes/PersonName)
- [Property](classes/Property)
- [PropertyType](classes/PropertyType)
- [SystemMetaDataEncrypted](classes/SystemMetaDataEncrypted)
- [SystemMetaDataOwner](classes/SystemMetaDataOwner)
- [SystemMetaDataOwnerEncrypted](classes/SystemMetaDataOwnerEncrypted)
- [Telecom](classes/Telecom)
- [TimeSeries](classes/TimeSeries)
- [TypedValueObject](classes/TypedValueObject)
- [User](classes/User)
- [UuidEncoder](classes/UuidEncoder)



### Filters
- [CodingFilter](filters/CodingFilter)
- [DataSampleFilter](filters/DataSampleFilter)
- [Filter](filters/Filter)
- [HealthcareElementFilter](filters/HealthcareElementFilter)
- [HealthcareProfessionalFilter](filters/HealthcareProfessionalFilter)
- [MedicalDeviceFilter](filters/MedicalDeviceFilter)
- [NotificationFilter](filters/NotificationFilter)
- [PatientFilter](filters/PatientFilter)
- [UserFilter](filters/UserFilter)


### Utility functions

- [a2b](modules#a2b)
- [amount](modules#amount)
- [b2a](modules#b2a)
- [b64Url2ua](modules#b64url2ua)
- [b64\_2ab](modules#b64_2ab)
- [b64\_2ua](modules#b64_2ua)
- [b64\_2uas](modules#b64_2uas)
- [dateDecode](modules#datedecode)
- [dateEncode](modules#dateencode)
- [hex2string](modules#hex2string)
- [hex2ua](modules#hex2ua)
- [ibanFormat](modules#ibanformat)
- [ibanValidate](modules#ibanvalidate)
- [isValidIBAN](modules#isvalidiban)
- [medTechApi](modules#medtechapi)
- [money](modules#money)
- [nihiiFormat](modules#nihiiformat)
- [nihiiValidate](modules#nihiivalidate)
- [personName](modules#personname)
- [personNameAbbrev](modules#personnameabbrev)
- [phoneNumberFormat](modules#phonenumberformat)
- [phoneNumberValidate](modules#phonenumbervalidate)
- [ssinFormat](modules#ssinformat)
- [ssinValidate](modules#ssinvalidate)
- [string2ab](modules#string2ab)
- [string2hex](modules#string2hex)
- [string2ua](modules#string2ua)
- [timeDecode](modules#timedecode)
- [timeEncode](modules#timeencode)
- [toMoment](modules#tomoment)
- [toUrlParams](modules#tourlparams)
- [ua2ab](modules#ua2ab)
- [ua2b64](modules#ua2b64)
- [ua2b64Url](modules#ua2b64url)
- [ua2hex](modules#ua2hex)
- [ua2string](modules#ua2string)
- [ua2utf8](modules#ua2utf8)
- [unit](modules#unit)
- [utf8\_2ua](modules#utf8_2ua)



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

▸ **medTechApi**(`api?`): [`MedTechApiBuilder`](builders/MedTechApiBuilder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api?` | [`MedTechApi`](entrypoints/MedTechApi) |

#### Returns

[`MedTechApiBuilder`](builders/MedTechApiBuilder)

#### Defined in

[src/apis/MedTechApi.ts:384](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/MedTechApi.ts#L384)

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


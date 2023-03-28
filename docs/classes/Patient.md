[@icure/medical-device-sdk](../modules) / Patient

# Class: Patient

## Implements

- [`PotentiallyEncryptedPatient`](../interfaces/PotentiallyEncryptedPatient)

## Table of contents

### Constructors

- [constructor](Patient#constructor)

### Properties

- [active](Patient#active)
- [addresses](Patient#addresses)
- [administrativeNote](Patient#administrativenote)
- [alias](Patient#alias)
- [author](Patient#author)
- [birthSex](Patient#birthsex)
- [civility](Patient#civility)
- [codes](Patient#codes)
- [companyName](Patient#companyname)
- [created](Patient#created)
- [dateOfBirth](Patient#dateofbirth)
- [dateOfDeath](Patient#dateofdeath)
- [deactivationReason](Patient#deactivationreason)
- [deceased](Patient#deceased)
- [deletionDate](Patient#deletiondate)
- [education](Patient#education)
- [endOfLife](Patient#endoflife)
- [ethnicity](Patient#ethnicity)
- [externalId](Patient#externalid)
- [firstName](Patient#firstname)
- [gender](Patient#gender)
- [id](Patient#id)
- [identifiers](Patient#identifiers)
- [labels](Patient#labels)
- [languages](Patient#languages)
- [lastName](Patient#lastname)
- [maidenName](Patient#maidenname)
- [mergeToPatientId](Patient#mergetopatientid)
- [mergedIds](Patient#mergedids)
- [modified](Patient#modified)
- [names](Patient#names)
- [nationality](Patient#nationality)
- [note](Patient#note)
- [parameters](Patient#parameters)
- [partnerName](Patient#partnername)
- [partnerships](Patient#partnerships)
- [patientHealthCareParties](Patient#patienthealthcareparties)
- [patientProfessions](Patient#patientprofessions)
- [personalStatus](Patient#personalstatus)
- [picture](Patient#picture)
- [placeOfBirth](Patient#placeofbirth)
- [placeOfDeath](Patient#placeofdeath)
- [profession](Patient#profession)
- [properties](Patient#properties)
- [race](Patient#race)
- [responsible](Patient#responsible)
- [rev](Patient#rev)
- [spouseName](Patient#spousename)
- [ssin](Patient#ssin)
- [systemMetaData](Patient#systemmetadata)

### Methods

- [marshal](Patient#marshal)

## Constructors

### constructor

• **new Patient**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IPatient` |

#### Defined in

[src/models/Patient.ts:26](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L26)

## Properties

### active

• **active**: `boolean`

Is the patient active (boolean).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[active](../interfaces/PotentiallyEncryptedPatient#active)

#### Defined in

[src/models/Patient.ts:102](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L102)

___

### addresses

• **addresses**: [`Address`](Address)[]

the list of addresses (with address type).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[addresses](../interfaces/PotentiallyEncryptedPatient#addresses)

#### Defined in

[src/models/Patient.ts:95](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L95)

___

### administrativeNote

• `Optional` **administrativeNote**: `string`

An administrative note, not confidential.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[administrativeNote](../interfaces/PotentiallyEncryptedPatient#administrativenote)

#### Defined in

[src/models/Patient.ts:117](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L117)

___

### alias

• `Optional` **alias**: `string`

An alias of the person, nickname, ...

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[alias](../interfaces/PotentiallyEncryptedPatient#alias)

#### Defined in

[src/models/Patient.ts:101](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L101)

___

### author

• `Optional` **author**: `string`

The id of the [User] that created this patient. When creating the patient, this field will be filled automatically by the current user id if not provided.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[author](../interfaces/PotentiallyEncryptedPatient#author)

#### Defined in

[src/models/Patient.ts:84](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L84)

___

### birthSex

• `Optional` **birthSex**: [`PatientBirthSexEnum`](../modules#patientbirthsexenum)

the birth sex of the patient: male, female, indeterminate, unknown

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[birthSex](../interfaces/PotentiallyEncryptedPatient#birthsex)

#### Defined in

[src/models/Patient.ts:98](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L98)

___

### civility

• `Optional` **civility**: `string`

Mr., Ms., Pr., Dr. ...

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[civility](../interfaces/PotentiallyEncryptedPatient#civility)

#### Defined in

[src/models/Patient.ts:96](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L96)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference)\>

A code is an item from a codification system that qualifies the content of this patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[codes](../interfaces/PotentiallyEncryptedPatient#codes)

#### Defined in

[src/models/Patient.ts:87](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L87)

___

### companyName

• `Optional` **companyName**: `string`

the name of the company this patient is member of.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[companyName](../interfaces/PotentiallyEncryptedPatient#companyname)

#### Defined in

[src/models/Patient.ts:93](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L93)

___

### created

• `Optional` **created**: `number`

the creation date of the patient (encoded as epoch).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[created](../interfaces/PotentiallyEncryptedPatient#created)

#### Defined in

[src/models/Patient.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L82)

___

### dateOfBirth

• `Optional` **dateOfBirth**: `number`

The birthdate encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[dateOfBirth](../interfaces/PotentiallyEncryptedPatient#dateofbirth)

#### Defined in

[src/models/Patient.ts:109](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L109)

___

### dateOfDeath

• `Optional` **dateOfDeath**: `number`

The date of death encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[dateOfDeath](../interfaces/PotentiallyEncryptedPatient#dateofdeath)

#### Defined in

[src/models/Patient.ts:110](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L110)

___

### deactivationReason

• **deactivationReason**: [`PatientDeactivationReasonEnum`](../modules#patientdeactivationreasonenum)

When not active, the reason for deactivation.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[deactivationReason](../interfaces/PotentiallyEncryptedPatient#deactivationreason)

#### Defined in

[src/models/Patient.ts:103](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L103)

___

### deceased

• `Optional` **deceased**: `boolean`

Is the patient deceased.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[deceased](../interfaces/PotentiallyEncryptedPatient#deceased)

#### Defined in

[src/models/Patient.ts:113](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L113)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a patient is ”deleted“, this is set to a non null value: the moment of the deletion

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[deletionDate](../interfaces/PotentiallyEncryptedPatient#deletiondate)

#### Defined in

[src/models/Patient.ts:89](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L89)

___

### education

• `Optional` **education**: `string`

The level of education (college degree, undergraduate, phd).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[education](../interfaces/PotentiallyEncryptedPatient#education)

#### Defined in

[src/models/Patient.ts:114](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L114)

___

### endOfLife

• `Optional` **endOfLife**: `number`

Soft delete (unix epoch in ms) timestamp of the patient

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[endOfLife](../interfaces/PotentiallyEncryptedPatient#endoflife)

#### Defined in

[src/models/Patient.ts:88](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L88)

___

### ethnicity

• `Optional` **ethnicity**: `string`

The ethnicity of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[ethnicity](../interfaces/PotentiallyEncryptedPatient#ethnicity)

#### Defined in

[src/models/Patient.ts:120](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L120)

___

### externalId

• `Optional` **externalId**: `string`

An external (from another source) id with no guarantee or requirement for unicity .

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[externalId](../interfaces/PotentiallyEncryptedPatient#externalid)

#### Defined in

[src/models/Patient.ts:122](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L122)

___

### firstName

• `Optional` **firstName**: `string`

the firstname (name) of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[firstName](../interfaces/PotentiallyEncryptedPatient#firstname)

#### Defined in

[src/models/Patient.ts:90](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L90)

___

### gender

• `Optional` **gender**: [`PatientGenderEnum`](../modules#patientgenderenum)

the gender of the patient: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[gender](../interfaces/PotentiallyEncryptedPatient#gender)

#### Defined in

[src/models/Patient.ts:97](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L97)

___

### id

• `Optional` **id**: `string`

the Id of the patient. We encourage using either a v4 UUID or a HL7 Id.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[id](../interfaces/PotentiallyEncryptedPatient#id)

#### Defined in

[src/models/Patient.ts:79](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L79)

___

### identifiers

• **identifiers**: [`Identifier`](Identifier)[]

Typically used for business / client identifiers. An identifier should identify a patient uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[identifiers](../interfaces/PotentiallyEncryptedPatient#identifiers)

#### Defined in

[src/models/Patient.ts:81](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L81)

___

### labels

• **labels**: `Set`<[`CodingReference`](CodingReference)\>

A label is an item from a codification system that qualifies a patient as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[labels](../interfaces/PotentiallyEncryptedPatient#labels)

#### Defined in

[src/models/Patient.ts:86](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L86)

___

### languages

• **languages**: `string`[]

the list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[languages](../interfaces/PotentiallyEncryptedPatient#languages)

#### Defined in

[src/models/Patient.ts:94](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L94)

___

### lastName

• `Optional` **lastName**: `string`

the lastname (surname) of the patient. This is the official lastname that should be used for official administrative purposes.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[lastName](../interfaces/PotentiallyEncryptedPatient#lastname)

#### Defined in

[src/models/Patient.ts:91](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L91)

___

### maidenName

• `Optional` **maidenName**: `string`

Lastname at birth (can be different of the current name), depending on the country, must be used to design the patient .

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[maidenName](../interfaces/PotentiallyEncryptedPatient#maidenname)

#### Defined in

[src/models/Patient.ts:105](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L105)

___

### mergeToPatientId

• `Optional` **mergeToPatientId**: `string`

The id of the patient this patient has been merged with.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[mergeToPatientId](../interfaces/PotentiallyEncryptedPatient#mergetopatientid)

#### Defined in

[src/models/Patient.ts:99](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L99)

___

### mergedIds

• **mergedIds**: `Set`<`string`\>

The ids of the patients that have been merged inside this patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[mergedIds](../interfaces/PotentiallyEncryptedPatient#mergedids)

#### Defined in

[src/models/Patient.ts:100](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L100)

___

### modified

• `Optional` **modified**: `number`

the last modification date of the patient (encoded as epoch).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[modified](../interfaces/PotentiallyEncryptedPatient#modified)

#### Defined in

[src/models/Patient.ts:83](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L83)

___

### names

• **names**: [`PersonName`](PersonName)[]

the list of all names of the patient, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the patient in the application

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[names](../interfaces/PotentiallyEncryptedPatient#names)

#### Defined in

[src/models/Patient.ts:92](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L92)

___

### nationality

• `Optional` **nationality**: `string`

The nationality of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[nationality](../interfaces/PotentiallyEncryptedPatient#nationality)

#### Defined in

[src/models/Patient.ts:118](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L118)

___

### note

• `Optional` **note**: `string`

A text note (can be confidential, encrypted by default).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[note](../interfaces/PotentiallyEncryptedPatient#note)

#### Defined in

[src/models/Patient.ts:116](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L116)

___

### parameters

• **parameters**: `Object`

Extra parameters

#### Index signature

▪ [key: `string`]: `string`[]

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[parameters](../interfaces/PotentiallyEncryptedPatient#parameters)

#### Defined in

[src/models/Patient.ts:126](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L126)

___

### partnerName

• `Optional` **partnerName**: `string`

Lastname of the partner, should not be used to design the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[partnerName](../interfaces/PotentiallyEncryptedPatient#partnername)

#### Defined in

[src/models/Patient.ts:107](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L107)

___

### partnerships

• **partnerships**: [`Partnership`](Partnership)[]

List of partners, or persons of contact (of class Partnership, see below).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[partnerships](../interfaces/PotentiallyEncryptedPatient#partnerships)

#### Defined in

[src/models/Patient.ts:123](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L123)

___

### patientHealthCareParties

• **patientHealthCareParties**: [`PatientHealthCareParty`](PatientHealthCareParty)[]

Links (usually for therapeutic reasons) between this patient and healthcare parties (of class PatientHealthcareParty).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[patientHealthCareParties](../interfaces/PotentiallyEncryptedPatient#patienthealthcareparties)

#### Defined in

[src/models/Patient.ts:124](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L124)

___

### patientProfessions

• **patientProfessions**: [`CodingReference`](CodingReference)[]

Codified list of professions exercised by this patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[patientProfessions](../interfaces/PotentiallyEncryptedPatient#patientprofessions)

#### Defined in

[src/models/Patient.ts:125](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L125)

___

### personalStatus

• `Optional` **personalStatus**: [`PatientPersonalStatusEnum`](../modules#patientpersonalstatusenum)

any of `single`, `in_couple`, `married`, `separated`, `divorced`, `divorcing`, `widowed`, `widower`, `complicated`, `unknown`, `contract`, `other`.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[personalStatus](../interfaces/PotentiallyEncryptedPatient#personalstatus)

#### Defined in

[src/models/Patient.ts:108](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L108)

___

### picture

• `Optional` **picture**: `ArrayBuffer`

A picture usually saved in JPEG format.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[picture](../interfaces/PotentiallyEncryptedPatient#picture)

#### Defined in

[src/models/Patient.ts:121](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L121)

___

### placeOfBirth

• `Optional` **placeOfBirth**: `string`

The place of birth.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[placeOfBirth](../interfaces/PotentiallyEncryptedPatient#placeofbirth)

#### Defined in

[src/models/Patient.ts:111](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L111)

___

### placeOfDeath

• `Optional` **placeOfDeath**: `string`

The place of death.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[placeOfDeath](../interfaces/PotentiallyEncryptedPatient#placeofdeath)

#### Defined in

[src/models/Patient.ts:112](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L112)

___

### profession

• `Optional` **profession**: `string`

The current professional activity.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[profession](../interfaces/PotentiallyEncryptedPatient#profession)

#### Defined in

[src/models/Patient.ts:115](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L115)

___

### properties

• **properties**: `Set`<[`Property`](Property)\>

Extra properties

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[properties](../interfaces/PotentiallyEncryptedPatient#properties)

#### Defined in

[src/models/Patient.ts:127](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L127)

___

### race

• `Optional` **race**: `string`

The race of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[race](../interfaces/PotentiallyEncryptedPatient#race)

#### Defined in

[src/models/Patient.ts:119](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L119)

___

### responsible

• `Optional` **responsible**: `string`

The id of the data owner that is responsible of this patient. When creating the patient, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[responsible](../interfaces/PotentiallyEncryptedPatient#responsible)

#### Defined in

[src/models/Patient.ts:85](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L85)

___

### rev

• `Optional` **rev**: `string`

the revision of the patient in the database, used for conflict management / optimistic locking.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[rev](../interfaces/PotentiallyEncryptedPatient#rev)

#### Defined in

[src/models/Patient.ts:80](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L80)

___

### spouseName

• `Optional` **spouseName**: `string`

Lastname of the spouse for a married woman, depending on the country, can be used to design the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[spouseName](../interfaces/PotentiallyEncryptedPatient#spousename)

#### Defined in

[src/models/Patient.ts:106](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L106)

___

### ssin

• `Optional` **ssin**: `string`

Social security inscription number.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[ssin](../interfaces/PotentiallyEncryptedPatient#ssin)

#### Defined in

[src/models/Patient.ts:104](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L104)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataOwnerEncrypted`](SystemMetaDataOwnerEncrypted)

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[systemMetaData](../interfaces/PotentiallyEncryptedPatient#systemmetadata)

#### Defined in

[src/models/Patient.ts:128](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L128)

## Methods

### marshal

▸ **marshal**(): `IPatient`

#### Returns

`IPatient`

#### Defined in

[src/models/Patient.ts:130](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L130)

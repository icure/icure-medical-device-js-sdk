[@icure/medical-device-sdk](../modules) / EncryptedPatient

# Class: EncryptedPatient

## Implements

- [`PotentiallyEncryptedPatient`](../interfaces/PotentiallyEncryptedPatient)

## Table of contents

### Constructors

- [constructor](EncryptedPatient#constructor)

### Properties

- [active](EncryptedPatient#active)
- [addresses](EncryptedPatient#addresses)
- [administrativeNote](EncryptedPatient#administrativenote)
- [alias](EncryptedPatient#alias)
- [author](EncryptedPatient#author)
- [birthSex](EncryptedPatient#birthsex)
- [civility](EncryptedPatient#civility)
- [codes](EncryptedPatient#codes)
- [companyName](EncryptedPatient#companyname)
- [created](EncryptedPatient#created)
- [dateOfBirth](EncryptedPatient#dateofbirth)
- [dateOfDeath](EncryptedPatient#dateofdeath)
- [deactivationReason](EncryptedPatient#deactivationreason)
- [deceased](EncryptedPatient#deceased)
- [deletionDate](EncryptedPatient#deletiondate)
- [education](EncryptedPatient#education)
- [endOfLife](EncryptedPatient#endoflife)
- [ethnicity](EncryptedPatient#ethnicity)
- [externalId](EncryptedPatient#externalid)
- [firstName](EncryptedPatient#firstname)
- [gender](EncryptedPatient#gender)
- [id](EncryptedPatient#id)
- [identifiers](EncryptedPatient#identifiers)
- [labels](EncryptedPatient#labels)
- [languages](EncryptedPatient#languages)
- [lastName](EncryptedPatient#lastname)
- [maidenName](EncryptedPatient#maidenname)
- [mergeToPatientId](EncryptedPatient#mergetopatientid)
- [mergedIds](EncryptedPatient#mergedids)
- [modified](EncryptedPatient#modified)
- [names](EncryptedPatient#names)
- [nationality](EncryptedPatient#nationality)
- [note](EncryptedPatient#note)
- [parameters](EncryptedPatient#parameters)
- [partnerName](EncryptedPatient#partnername)
- [partnerships](EncryptedPatient#partnerships)
- [patientHealthCareParties](EncryptedPatient#patienthealthcareparties)
- [patientProfessions](EncryptedPatient#patientprofessions)
- [personalStatus](EncryptedPatient#personalstatus)
- [picture](EncryptedPatient#picture)
- [placeOfBirth](EncryptedPatient#placeofbirth)
- [placeOfDeath](EncryptedPatient#placeofdeath)
- [profession](EncryptedPatient#profession)
- [properties](EncryptedPatient#properties)
- [race](EncryptedPatient#race)
- [responsible](EncryptedPatient#responsible)
- [rev](EncryptedPatient#rev)
- [spouseName](EncryptedPatient#spousename)
- [ssin](EncryptedPatient#ssin)
- [systemMetaData](EncryptedPatient#systemmetadata)

### Methods

- [marshal](EncryptedPatient#marshal)

## Constructors

### constructor

• **new EncryptedPatient**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IPatient` |

#### Defined in

[src/models/Patient.ts:150](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L150)

## Properties

### active

• **active**: `boolean`

Is the patient active (boolean).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[active](../interfaces/PotentiallyEncryptedPatient#active)

#### Defined in

[src/models/Patient.ts:226](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L226)

___

### addresses

• **addresses**: [`Address`](Address)[]

the list of addresses (with address type).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[addresses](../interfaces/PotentiallyEncryptedPatient#addresses)

#### Defined in

[src/models/Patient.ts:219](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L219)

___

### administrativeNote

• `Optional` **administrativeNote**: `string`

An administrative note, not confidential.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[administrativeNote](../interfaces/PotentiallyEncryptedPatient#administrativenote)

#### Defined in

[src/models/Patient.ts:241](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L241)

___

### alias

• `Optional` **alias**: `string`

An alias of the person, nickname, ...

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[alias](../interfaces/PotentiallyEncryptedPatient#alias)

#### Defined in

[src/models/Patient.ts:225](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L225)

___

### author

• `Optional` **author**: `string`

The id of the [User] that created this patient. When creating the patient, this field will be filled automatically by the current user id if not provided.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[author](../interfaces/PotentiallyEncryptedPatient#author)

#### Defined in

[src/models/Patient.ts:208](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L208)

___

### birthSex

• `Optional` **birthSex**: [`PatientBirthSexEnum`](../modules#patientbirthsexenum)

the birth sex of the patient: male, female, indeterminate, unknown

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[birthSex](../interfaces/PotentiallyEncryptedPatient#birthsex)

#### Defined in

[src/models/Patient.ts:222](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L222)

___

### civility

• `Optional` **civility**: `string`

Mr., Ms., Pr., Dr. ...

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[civility](../interfaces/PotentiallyEncryptedPatient#civility)

#### Defined in

[src/models/Patient.ts:220](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L220)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference)\>

A code is an item from a codification system that qualifies the content of this patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[codes](../interfaces/PotentiallyEncryptedPatient#codes)

#### Defined in

[src/models/Patient.ts:211](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L211)

___

### companyName

• `Optional` **companyName**: `string`

the name of the company this patient is member of.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[companyName](../interfaces/PotentiallyEncryptedPatient#companyname)

#### Defined in

[src/models/Patient.ts:217](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L217)

___

### created

• `Optional` **created**: `number`

the creation date of the patient (encoded as epoch).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[created](../interfaces/PotentiallyEncryptedPatient#created)

#### Defined in

[src/models/Patient.ts:206](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L206)

___

### dateOfBirth

• `Optional` **dateOfBirth**: `number`

The birthdate encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[dateOfBirth](../interfaces/PotentiallyEncryptedPatient#dateofbirth)

#### Defined in

[src/models/Patient.ts:233](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L233)

___

### dateOfDeath

• `Optional` **dateOfDeath**: `number`

The date of death encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[dateOfDeath](../interfaces/PotentiallyEncryptedPatient#dateofdeath)

#### Defined in

[src/models/Patient.ts:234](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L234)

___

### deactivationReason

• **deactivationReason**: [`PatientDeactivationReasonEnum`](../modules#patientdeactivationreasonenum)

When not active, the reason for deactivation.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[deactivationReason](../interfaces/PotentiallyEncryptedPatient#deactivationreason)

#### Defined in

[src/models/Patient.ts:227](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L227)

___

### deceased

• `Optional` **deceased**: `boolean`

Is the patient deceased.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[deceased](../interfaces/PotentiallyEncryptedPatient#deceased)

#### Defined in

[src/models/Patient.ts:237](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L237)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a patient is ”deleted“, this is set to a non null value: the moment of the deletion

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[deletionDate](../interfaces/PotentiallyEncryptedPatient#deletiondate)

#### Defined in

[src/models/Patient.ts:213](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L213)

___

### education

• `Optional` **education**: `string`

The level of education (college degree, undergraduate, phd).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[education](../interfaces/PotentiallyEncryptedPatient#education)

#### Defined in

[src/models/Patient.ts:238](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L238)

___

### endOfLife

• `Optional` **endOfLife**: `number`

Soft delete (unix epoch in ms) timestamp of the patient

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[endOfLife](../interfaces/PotentiallyEncryptedPatient#endoflife)

#### Defined in

[src/models/Patient.ts:212](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L212)

___

### ethnicity

• `Optional` **ethnicity**: `string`

The ethnicity of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[ethnicity](../interfaces/PotentiallyEncryptedPatient#ethnicity)

#### Defined in

[src/models/Patient.ts:244](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L244)

___

### externalId

• `Optional` **externalId**: `string`

An external (from another source) id with no guarantee or requirement for unicity .

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[externalId](../interfaces/PotentiallyEncryptedPatient#externalid)

#### Defined in

[src/models/Patient.ts:246](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L246)

___

### firstName

• `Optional` **firstName**: `string`

the firstname (name) of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[firstName](../interfaces/PotentiallyEncryptedPatient#firstname)

#### Defined in

[src/models/Patient.ts:214](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L214)

___

### gender

• `Optional` **gender**: [`PatientGenderEnum`](../modules#patientgenderenum)

the gender of the patient: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[gender](../interfaces/PotentiallyEncryptedPatient#gender)

#### Defined in

[src/models/Patient.ts:221](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L221)

___

### id

• `Optional` **id**: `string`

the Id of the patient. We encourage using either a v4 UUID or a HL7 Id.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[id](../interfaces/PotentiallyEncryptedPatient#id)

#### Defined in

[src/models/Patient.ts:203](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L203)

___

### identifiers

• **identifiers**: [`Identifier`](Identifier)[]

Typically used for business / client identifiers. An identifier should identify a patient uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[identifiers](../interfaces/PotentiallyEncryptedPatient#identifiers)

#### Defined in

[src/models/Patient.ts:205](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L205)

___

### labels

• **labels**: `Set`<[`CodingReference`](CodingReference)\>

A label is an item from a codification system that qualifies a patient as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[labels](../interfaces/PotentiallyEncryptedPatient#labels)

#### Defined in

[src/models/Patient.ts:210](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L210)

___

### languages

• **languages**: `string`[]

the list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[languages](../interfaces/PotentiallyEncryptedPatient#languages)

#### Defined in

[src/models/Patient.ts:218](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L218)

___

### lastName

• `Optional` **lastName**: `string`

the lastname (surname) of the patient. This is the official lastname that should be used for official administrative purposes.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[lastName](../interfaces/PotentiallyEncryptedPatient#lastname)

#### Defined in

[src/models/Patient.ts:215](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L215)

___

### maidenName

• `Optional` **maidenName**: `string`

Lastname at birth (can be different of the current name), depending on the country, must be used to design the patient .

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[maidenName](../interfaces/PotentiallyEncryptedPatient#maidenname)

#### Defined in

[src/models/Patient.ts:229](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L229)

___

### mergeToPatientId

• `Optional` **mergeToPatientId**: `string`

The id of the patient this patient has been merged with.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[mergeToPatientId](../interfaces/PotentiallyEncryptedPatient#mergetopatientid)

#### Defined in

[src/models/Patient.ts:223](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L223)

___

### mergedIds

• **mergedIds**: `Set`<`string`\>

The ids of the patients that have been merged inside this patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[mergedIds](../interfaces/PotentiallyEncryptedPatient#mergedids)

#### Defined in

[src/models/Patient.ts:224](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L224)

___

### modified

• `Optional` **modified**: `number`

the last modification date of the patient (encoded as epoch).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[modified](../interfaces/PotentiallyEncryptedPatient#modified)

#### Defined in

[src/models/Patient.ts:207](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L207)

___

### names

• **names**: [`PersonName`](PersonName)[]

the list of all names of the patient, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the patient in the application

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[names](../interfaces/PotentiallyEncryptedPatient#names)

#### Defined in

[src/models/Patient.ts:216](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L216)

___

### nationality

• `Optional` **nationality**: `string`

The nationality of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[nationality](../interfaces/PotentiallyEncryptedPatient#nationality)

#### Defined in

[src/models/Patient.ts:242](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L242)

___

### note

• `Optional` **note**: `string`

A text note (can be confidential, encrypted by default).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[note](../interfaces/PotentiallyEncryptedPatient#note)

#### Defined in

[src/models/Patient.ts:240](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L240)

___

### parameters

• **parameters**: `Object`

Extra parameters

#### Index signature

▪ [key: `string`]: `string`[]

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[parameters](../interfaces/PotentiallyEncryptedPatient#parameters)

#### Defined in

[src/models/Patient.ts:250](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L250)

___

### partnerName

• `Optional` **partnerName**: `string`

Lastname of the partner, should not be used to design the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[partnerName](../interfaces/PotentiallyEncryptedPatient#partnername)

#### Defined in

[src/models/Patient.ts:231](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L231)

___

### partnerships

• **partnerships**: [`Partnership`](Partnership)[]

List of partners, or persons of contact (of class Partnership, see below).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[partnerships](../interfaces/PotentiallyEncryptedPatient#partnerships)

#### Defined in

[src/models/Patient.ts:247](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L247)

___

### patientHealthCareParties

• **patientHealthCareParties**: [`PatientHealthCareParty`](PatientHealthCareParty)[]

Links (usually for therapeutic reasons) between this patient and healthcare parties (of class PatientHealthcareParty).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[patientHealthCareParties](../interfaces/PotentiallyEncryptedPatient#patienthealthcareparties)

#### Defined in

[src/models/Patient.ts:248](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L248)

___

### patientProfessions

• **patientProfessions**: [`CodingReference`](CodingReference)[]

Codified list of professions exercised by this patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[patientProfessions](../interfaces/PotentiallyEncryptedPatient#patientprofessions)

#### Defined in

[src/models/Patient.ts:249](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L249)

___

### personalStatus

• `Optional` **personalStatus**: [`PatientPersonalStatusEnum`](../modules#patientpersonalstatusenum)

any of `single`, `in_couple`, `married`, `separated`, `divorced`, `divorcing`, `widowed`, `widower`, `complicated`, `unknown`, `contract`, `other`.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[personalStatus](../interfaces/PotentiallyEncryptedPatient#personalstatus)

#### Defined in

[src/models/Patient.ts:232](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L232)

___

### picture

• `Optional` **picture**: `ArrayBuffer`

A picture usually saved in JPEG format.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[picture](../interfaces/PotentiallyEncryptedPatient#picture)

#### Defined in

[src/models/Patient.ts:245](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L245)

___

### placeOfBirth

• `Optional` **placeOfBirth**: `string`

The place of birth.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[placeOfBirth](../interfaces/PotentiallyEncryptedPatient#placeofbirth)

#### Defined in

[src/models/Patient.ts:235](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L235)

___

### placeOfDeath

• `Optional` **placeOfDeath**: `string`

The place of death.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[placeOfDeath](../interfaces/PotentiallyEncryptedPatient#placeofdeath)

#### Defined in

[src/models/Patient.ts:236](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L236)

___

### profession

• `Optional` **profession**: `string`

The current professional activity.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[profession](../interfaces/PotentiallyEncryptedPatient#profession)

#### Defined in

[src/models/Patient.ts:239](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L239)

___

### properties

• **properties**: `Set`<[`Property`](Property)\>

Extra properties

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[properties](../interfaces/PotentiallyEncryptedPatient#properties)

#### Defined in

[src/models/Patient.ts:251](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L251)

___

### race

• `Optional` **race**: `string`

The race of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[race](../interfaces/PotentiallyEncryptedPatient#race)

#### Defined in

[src/models/Patient.ts:243](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L243)

___

### responsible

• `Optional` **responsible**: `string`

The id of the data owner that is responsible of this patient. When creating the patient, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[responsible](../interfaces/PotentiallyEncryptedPatient#responsible)

#### Defined in

[src/models/Patient.ts:209](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L209)

___

### rev

• `Optional` **rev**: `string`

the revision of the patient in the database, used for conflict management / optimistic locking.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[rev](../interfaces/PotentiallyEncryptedPatient#rev)

#### Defined in

[src/models/Patient.ts:204](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L204)

___

### spouseName

• `Optional` **spouseName**: `string`

Lastname of the spouse for a married woman, depending on the country, can be used to design the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[spouseName](../interfaces/PotentiallyEncryptedPatient#spousename)

#### Defined in

[src/models/Patient.ts:230](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L230)

___

### ssin

• `Optional` **ssin**: `string`

Social security inscription number.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[ssin](../interfaces/PotentiallyEncryptedPatient#ssin)

#### Defined in

[src/models/Patient.ts:228](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L228)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataOwnerEncrypted`](SystemMetaDataOwnerEncrypted)

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient).[systemMetaData](../interfaces/PotentiallyEncryptedPatient#systemmetadata)

#### Defined in

[src/models/Patient.ts:252](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L252)

## Methods

### marshal

▸ **marshal**(): `IPatient`

#### Returns

`IPatient`

#### Defined in

[src/models/Patient.ts:254](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L254)

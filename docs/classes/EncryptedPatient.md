[@icure/medical-device-sdk](../modules.md) / EncryptedPatient

# Class: EncryptedPatient

## Implements

- [`PotentiallyEncryptedPatient`](../interfaces/PotentiallyEncryptedPatient.md)

## Table of contents

### Constructors

- [constructor](EncryptedPatient.md#constructor)

### Properties

- [active](EncryptedPatient.md#active)
- [addresses](EncryptedPatient.md#addresses)
- [administrativeNote](EncryptedPatient.md#administrativenote)
- [alias](EncryptedPatient.md#alias)
- [author](EncryptedPatient.md#author)
- [birthSex](EncryptedPatient.md#birthsex)
- [civility](EncryptedPatient.md#civility)
- [codes](EncryptedPatient.md#codes)
- [companyName](EncryptedPatient.md#companyname)
- [created](EncryptedPatient.md#created)
- [dateOfBirth](EncryptedPatient.md#dateofbirth)
- [dateOfDeath](EncryptedPatient.md#dateofdeath)
- [deactivationReason](EncryptedPatient.md#deactivationreason)
- [deceased](EncryptedPatient.md#deceased)
- [deletionDate](EncryptedPatient.md#deletiondate)
- [education](EncryptedPatient.md#education)
- [endOfLife](EncryptedPatient.md#endoflife)
- [ethnicity](EncryptedPatient.md#ethnicity)
- [externalId](EncryptedPatient.md#externalid)
- [firstName](EncryptedPatient.md#firstname)
- [gender](EncryptedPatient.md#gender)
- [id](EncryptedPatient.md#id)
- [identifiers](EncryptedPatient.md#identifiers)
- [labels](EncryptedPatient.md#labels)
- [languages](EncryptedPatient.md#languages)
- [lastName](EncryptedPatient.md#lastname)
- [maidenName](EncryptedPatient.md#maidenname)
- [mergeToPatientId](EncryptedPatient.md#mergetopatientid)
- [mergedIds](EncryptedPatient.md#mergedids)
- [modified](EncryptedPatient.md#modified)
- [names](EncryptedPatient.md#names)
- [nationality](EncryptedPatient.md#nationality)
- [note](EncryptedPatient.md#note)
- [parameters](EncryptedPatient.md#parameters)
- [partnerName](EncryptedPatient.md#partnername)
- [partnerships](EncryptedPatient.md#partnerships)
- [patientHealthCareParties](EncryptedPatient.md#patienthealthcareparties)
- [patientProfessions](EncryptedPatient.md#patientprofessions)
- [personalStatus](EncryptedPatient.md#personalstatus)
- [picture](EncryptedPatient.md#picture)
- [placeOfBirth](EncryptedPatient.md#placeofbirth)
- [placeOfDeath](EncryptedPatient.md#placeofdeath)
- [profession](EncryptedPatient.md#profession)
- [properties](EncryptedPatient.md#properties)
- [race](EncryptedPatient.md#race)
- [responsible](EncryptedPatient.md#responsible)
- [rev](EncryptedPatient.md#rev)
- [spouseName](EncryptedPatient.md#spousename)
- [ssin](EncryptedPatient.md#ssin)
- [systemMetaData](EncryptedPatient.md#systemmetadata)

### Methods

- [marshal](EncryptedPatient.md#marshal)

## Constructors

### constructor

• **new EncryptedPatient**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IPatient` |

#### Defined in

[src/models/Patient.ts:150](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L150)

## Properties

### active

• **active**: `boolean`

Is the patient active (boolean).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[active](../interfaces/PotentiallyEncryptedPatient.md#active)

#### Defined in

[src/models/Patient.ts:226](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L226)

___

### addresses

• **addresses**: [`Address`](Address.md)[]

the list of addresses (with address type).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[addresses](../interfaces/PotentiallyEncryptedPatient.md#addresses)

#### Defined in

[src/models/Patient.ts:219](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L219)

___

### administrativeNote

• `Optional` **administrativeNote**: `string`

An administrative note, not confidential.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[administrativeNote](../interfaces/PotentiallyEncryptedPatient.md#administrativenote)

#### Defined in

[src/models/Patient.ts:241](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L241)

___

### alias

• `Optional` **alias**: `string`

An alias of the person, nickname, ...

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[alias](../interfaces/PotentiallyEncryptedPatient.md#alias)

#### Defined in

[src/models/Patient.ts:225](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L225)

___

### author

• `Optional` **author**: `string`

The id of the [User] that created this patient. When creating the patient, this field will be filled automatically by the current user id if not provided.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[author](../interfaces/PotentiallyEncryptedPatient.md#author)

#### Defined in

[src/models/Patient.ts:208](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L208)

___

### birthSex

• `Optional` **birthSex**: [`PatientBirthSexEnum`](../modules.md#patientbirthsexenum)

the birth sex of the patient: male, female, indeterminate, unknown

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[birthSex](../interfaces/PotentiallyEncryptedPatient.md#birthsex)

#### Defined in

[src/models/Patient.ts:222](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L222)

___

### civility

• `Optional` **civility**: `string`

Mr., Ms., Pr., Dr. ...

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[civility](../interfaces/PotentiallyEncryptedPatient.md#civility)

#### Defined in

[src/models/Patient.ts:220](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L220)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference.md)\>

A code is an item from a codification system that qualifies the content of this patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[codes](../interfaces/PotentiallyEncryptedPatient.md#codes)

#### Defined in

[src/models/Patient.ts:211](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L211)

___

### companyName

• `Optional` **companyName**: `string`

the name of the company this patient is member of.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[companyName](../interfaces/PotentiallyEncryptedPatient.md#companyname)

#### Defined in

[src/models/Patient.ts:217](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L217)

___

### created

• `Optional` **created**: `number`

the creation date of the patient (encoded as epoch).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[created](../interfaces/PotentiallyEncryptedPatient.md#created)

#### Defined in

[src/models/Patient.ts:206](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L206)

___

### dateOfBirth

• `Optional` **dateOfBirth**: `number`

The birthdate encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[dateOfBirth](../interfaces/PotentiallyEncryptedPatient.md#dateofbirth)

#### Defined in

[src/models/Patient.ts:233](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L233)

___

### dateOfDeath

• `Optional` **dateOfDeath**: `number`

The date of death encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[dateOfDeath](../interfaces/PotentiallyEncryptedPatient.md#dateofdeath)

#### Defined in

[src/models/Patient.ts:234](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L234)

___

### deactivationReason

• **deactivationReason**: [`PatientDeactivationReasonEnum`](../modules.md#patientdeactivationreasonenum)

When not active, the reason for deactivation.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[deactivationReason](../interfaces/PotentiallyEncryptedPatient.md#deactivationreason)

#### Defined in

[src/models/Patient.ts:227](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L227)

___

### deceased

• `Optional` **deceased**: `boolean`

Is the patient deceased.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[deceased](../interfaces/PotentiallyEncryptedPatient.md#deceased)

#### Defined in

[src/models/Patient.ts:237](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L237)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a patient is ”deleted“, this is set to a non null value: the moment of the deletion

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[deletionDate](../interfaces/PotentiallyEncryptedPatient.md#deletiondate)

#### Defined in

[src/models/Patient.ts:213](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L213)

___

### education

• `Optional` **education**: `string`

The level of education (college degree, undergraduate, phd).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[education](../interfaces/PotentiallyEncryptedPatient.md#education)

#### Defined in

[src/models/Patient.ts:238](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L238)

___

### endOfLife

• `Optional` **endOfLife**: `number`

Soft delete (unix epoch in ms) timestamp of the patient

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[endOfLife](../interfaces/PotentiallyEncryptedPatient.md#endoflife)

#### Defined in

[src/models/Patient.ts:212](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L212)

___

### ethnicity

• `Optional` **ethnicity**: `string`

The ethnicity of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[ethnicity](../interfaces/PotentiallyEncryptedPatient.md#ethnicity)

#### Defined in

[src/models/Patient.ts:244](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L244)

___

### externalId

• `Optional` **externalId**: `string`

An external (from another source) id with no guarantee or requirement for unicity .

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[externalId](../interfaces/PotentiallyEncryptedPatient.md#externalid)

#### Defined in

[src/models/Patient.ts:246](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L246)

___

### firstName

• `Optional` **firstName**: `string`

the firstname (name) of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[firstName](../interfaces/PotentiallyEncryptedPatient.md#firstname)

#### Defined in

[src/models/Patient.ts:214](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L214)

___

### gender

• `Optional` **gender**: [`PatientGenderEnum`](../modules.md#patientgenderenum)

the gender of the patient: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[gender](../interfaces/PotentiallyEncryptedPatient.md#gender)

#### Defined in

[src/models/Patient.ts:221](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L221)

___

### id

• `Optional` **id**: `string`

the Id of the patient. We encourage using either a v4 UUID or a HL7 Id.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[id](../interfaces/PotentiallyEncryptedPatient.md#id)

#### Defined in

[src/models/Patient.ts:203](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L203)

___

### identifiers

• **identifiers**: [`Identifier`](Identifier.md)[]

Typically used for business / client identifiers. An identifier should identify a patient uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[identifiers](../interfaces/PotentiallyEncryptedPatient.md#identifiers)

#### Defined in

[src/models/Patient.ts:205](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L205)

___

### labels

• **labels**: `Set`<[`CodingReference`](CodingReference.md)\>

A label is an item from a codification system that qualifies a patient as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[labels](../interfaces/PotentiallyEncryptedPatient.md#labels)

#### Defined in

[src/models/Patient.ts:210](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L210)

___

### languages

• **languages**: `string`[]

the list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[languages](../interfaces/PotentiallyEncryptedPatient.md#languages)

#### Defined in

[src/models/Patient.ts:218](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L218)

___

### lastName

• `Optional` **lastName**: `string`

the lastname (surname) of the patient. This is the official lastname that should be used for official administrative purposes.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[lastName](../interfaces/PotentiallyEncryptedPatient.md#lastname)

#### Defined in

[src/models/Patient.ts:215](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L215)

___

### maidenName

• `Optional` **maidenName**: `string`

Lastname at birth (can be different of the current name), depending on the country, must be used to design the patient .

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[maidenName](../interfaces/PotentiallyEncryptedPatient.md#maidenname)

#### Defined in

[src/models/Patient.ts:229](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L229)

___

### mergeToPatientId

• `Optional` **mergeToPatientId**: `string`

The id of the patient this patient has been merged with.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[mergeToPatientId](../interfaces/PotentiallyEncryptedPatient.md#mergetopatientid)

#### Defined in

[src/models/Patient.ts:223](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L223)

___

### mergedIds

• **mergedIds**: `Set`<`string`\>

The ids of the patients that have been merged inside this patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[mergedIds](../interfaces/PotentiallyEncryptedPatient.md#mergedids)

#### Defined in

[src/models/Patient.ts:224](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L224)

___

### modified

• `Optional` **modified**: `number`

the last modification date of the patient (encoded as epoch).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[modified](../interfaces/PotentiallyEncryptedPatient.md#modified)

#### Defined in

[src/models/Patient.ts:207](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L207)

___

### names

• **names**: [`PersonName`](PersonName.md)[]

the list of all names of the patient, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the patient in the application

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[names](../interfaces/PotentiallyEncryptedPatient.md#names)

#### Defined in

[src/models/Patient.ts:216](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L216)

___

### nationality

• `Optional` **nationality**: `string`

The nationality of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[nationality](../interfaces/PotentiallyEncryptedPatient.md#nationality)

#### Defined in

[src/models/Patient.ts:242](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L242)

___

### note

• `Optional` **note**: `string`

A text note (can be confidential, encrypted by default).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[note](../interfaces/PotentiallyEncryptedPatient.md#note)

#### Defined in

[src/models/Patient.ts:240](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L240)

___

### parameters

• **parameters**: `Object`

Extra parameters

#### Index signature

▪ [key: `string`]: `string`[]

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[parameters](../interfaces/PotentiallyEncryptedPatient.md#parameters)

#### Defined in

[src/models/Patient.ts:250](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L250)

___

### partnerName

• `Optional` **partnerName**: `string`

Lastname of the partner, should not be used to design the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[partnerName](../interfaces/PotentiallyEncryptedPatient.md#partnername)

#### Defined in

[src/models/Patient.ts:231](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L231)

___

### partnerships

• **partnerships**: [`Partnership`](Partnership.md)[]

List of partners, or persons of contact (of class Partnership, see below).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[partnerships](../interfaces/PotentiallyEncryptedPatient.md#partnerships)

#### Defined in

[src/models/Patient.ts:247](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L247)

___

### patientHealthCareParties

• **patientHealthCareParties**: [`PatientHealthCareParty`](PatientHealthCareParty.md)[]

Links (usually for therapeutic reasons) between this patient and healthcare parties (of class PatientHealthcareParty).

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[patientHealthCareParties](../interfaces/PotentiallyEncryptedPatient.md#patienthealthcareparties)

#### Defined in

[src/models/Patient.ts:248](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L248)

___

### patientProfessions

• **patientProfessions**: [`CodingReference`](CodingReference.md)[]

Codified list of professions exercised by this patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[patientProfessions](../interfaces/PotentiallyEncryptedPatient.md#patientprofessions)

#### Defined in

[src/models/Patient.ts:249](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L249)

___

### personalStatus

• `Optional` **personalStatus**: [`PatientPersonalStatusEnum`](../modules.md#patientpersonalstatusenum)

any of `single`, `in_couple`, `married`, `separated`, `divorced`, `divorcing`, `widowed`, `widower`, `complicated`, `unknown`, `contract`, `other`.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[personalStatus](../interfaces/PotentiallyEncryptedPatient.md#personalstatus)

#### Defined in

[src/models/Patient.ts:232](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L232)

___

### picture

• `Optional` **picture**: `ArrayBuffer`

A picture usually saved in JPEG format.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[picture](../interfaces/PotentiallyEncryptedPatient.md#picture)

#### Defined in

[src/models/Patient.ts:245](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L245)

___

### placeOfBirth

• `Optional` **placeOfBirth**: `string`

The place of birth.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[placeOfBirth](../interfaces/PotentiallyEncryptedPatient.md#placeofbirth)

#### Defined in

[src/models/Patient.ts:235](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L235)

___

### placeOfDeath

• `Optional` **placeOfDeath**: `string`

The place of death.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[placeOfDeath](../interfaces/PotentiallyEncryptedPatient.md#placeofdeath)

#### Defined in

[src/models/Patient.ts:236](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L236)

___

### profession

• `Optional` **profession**: `string`

The current professional activity.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[profession](../interfaces/PotentiallyEncryptedPatient.md#profession)

#### Defined in

[src/models/Patient.ts:239](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L239)

___

### properties

• **properties**: `Set`<[`Property`](Property.md)\>

Extra properties

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[properties](../interfaces/PotentiallyEncryptedPatient.md#properties)

#### Defined in

[src/models/Patient.ts:251](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L251)

___

### race

• `Optional` **race**: `string`

The race of the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[race](../interfaces/PotentiallyEncryptedPatient.md#race)

#### Defined in

[src/models/Patient.ts:243](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L243)

___

### responsible

• `Optional` **responsible**: `string`

The id of the data owner that is responsible of this patient. When creating the patient, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[responsible](../interfaces/PotentiallyEncryptedPatient.md#responsible)

#### Defined in

[src/models/Patient.ts:209](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L209)

___

### rev

• `Optional` **rev**: `string`

the revision of the patient in the database, used for conflict management / optimistic locking.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[rev](../interfaces/PotentiallyEncryptedPatient.md#rev)

#### Defined in

[src/models/Patient.ts:204](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L204)

___

### spouseName

• `Optional` **spouseName**: `string`

Lastname of the spouse for a married woman, depending on the country, can be used to design the patient.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[spouseName](../interfaces/PotentiallyEncryptedPatient.md#spousename)

#### Defined in

[src/models/Patient.ts:230](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L230)

___

### ssin

• `Optional` **ssin**: `string`

Social security inscription number.

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[ssin](../interfaces/PotentiallyEncryptedPatient.md#ssin)

#### Defined in

[src/models/Patient.ts:228](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L228)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataOwnerEncrypted`](SystemMetaDataOwnerEncrypted.md)

#### Implementation of

[PotentiallyEncryptedPatient](../interfaces/PotentiallyEncryptedPatient.md).[systemMetaData](../interfaces/PotentiallyEncryptedPatient.md#systemmetadata)

#### Defined in

[src/models/Patient.ts:252](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L252)

## Methods

### marshal

▸ **marshal**(): `IPatient`

#### Returns

`IPatient`

#### Defined in

[src/models/Patient.ts:254](https://github.com/icure/icure-medical-device-js-sdk/blob/6492840/src/models/Patient.ts#L254)

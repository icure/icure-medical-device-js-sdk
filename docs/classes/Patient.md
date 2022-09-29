[@icure/medical-device-sdk](../modules.md) / Patient

# Class: Patient

## Table of contents

### Constructors

- [constructor](Patient.md#constructor)

### Properties

- [active](Patient.md#active)
- [addresses](Patient.md#addresses)
- [administrativeNote](Patient.md#administrativenote)
- [alias](Patient.md#alias)
- [author](Patient.md#author)
- [birthSex](Patient.md#birthsex)
- [civility](Patient.md#civility)
- [codes](Patient.md#codes)
- [companyName](Patient.md#companyname)
- [created](Patient.md#created)
- [dateOfBirth](Patient.md#dateofbirth)
- [dateOfDeath](Patient.md#dateofdeath)
- [deactivationReason](Patient.md#deactivationreason)
- [deceased](Patient.md#deceased)
- [deletionDate](Patient.md#deletiondate)
- [education](Patient.md#education)
- [endOfLife](Patient.md#endoflife)
- [ethnicity](Patient.md#ethnicity)
- [externalId](Patient.md#externalid)
- [firstName](Patient.md#firstname)
- [gender](Patient.md#gender)
- [id](Patient.md#id)
- [identifiers](Patient.md#identifiers)
- [labels](Patient.md#labels)
- [languages](Patient.md#languages)
- [lastName](Patient.md#lastname)
- [maidenName](Patient.md#maidenname)
- [mergeToPatientId](Patient.md#mergetopatientid)
- [mergedIds](Patient.md#mergedids)
- [modified](Patient.md#modified)
- [names](Patient.md#names)
- [nationality](Patient.md#nationality)
- [note](Patient.md#note)
- [parameters](Patient.md#parameters)
- [partnerName](Patient.md#partnername)
- [partnerships](Patient.md#partnerships)
- [patientHealthCareParties](Patient.md#patienthealthcareparties)
- [patientProfessions](Patient.md#patientprofessions)
- [personalStatus](Patient.md#personalstatus)
- [picture](Patient.md#picture)
- [placeOfBirth](Patient.md#placeofbirth)
- [placeOfDeath](Patient.md#placeofdeath)
- [profession](Patient.md#profession)
- [properties](Patient.md#properties)
- [race](Patient.md#race)
- [responsible](Patient.md#responsible)
- [rev](Patient.md#rev)
- [spouseName](Patient.md#spousename)
- [ssin](Patient.md#ssin)
- [systemMetaData](Patient.md#systemmetadata)

## Constructors

### constructor

• **new Patient**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `IPatient` |

#### Defined in

[src/models/Patient.ts:23](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L23)

## Properties

### active

• **active**: `boolean`

Is the patient active (boolean).

#### Defined in

[src/models/Patient.ts:122](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L122)

___

### addresses

• **addresses**: [`Address`](Address.md)[]

the list of addresses (with address type).

#### Defined in

[src/models/Patient.ts:94](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L94)

___

### administrativeNote

• `Optional` **administrativeNote**: `string`

An administrative note, not confidential.

#### Defined in

[src/models/Patient.ts:182](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L182)

___

### alias

• `Optional` **alias**: `string`

An alias of the person, nickname, ...

#### Defined in

[src/models/Patient.ts:118](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L118)

___

### author

• `Optional` **author**: `string`

The id of the [User] that created this patient. When creating the patient, this field will be filled automatically by the current user id if not provided.

#### Defined in

[src/models/Patient.ts:50](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L50)

___

### birthSex

• `Optional` **birthSex**: [`PatientBirthSexEnum`](../modules.md#patientbirthsexenum)

the birth sex of the patient: male, female, indeterminate, unknown

#### Defined in

[src/models/Patient.ts:106](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L106)

___

### civility

• `Optional` **civility**: `string`

Mr., Ms., Pr., Dr. ...

#### Defined in

[src/models/Patient.ts:98](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L98)

___

### codes

• **codes**: `Set`<[`CodingReference`](CodingReference.md)\>

A code is an item from a codification system that qualifies the content of this patient.

#### Defined in

[src/models/Patient.ts:62](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L62)

___

### companyName

• `Optional` **companyName**: `string`

the name of the company this patient is member of.

#### Defined in

[src/models/Patient.ts:86](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L86)

___

### created

• `Optional` **created**: `number`

the creation date of the patient (encoded as epoch).

#### Defined in

[src/models/Patient.ts:42](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L42)

___

### dateOfBirth

• `Optional` **dateOfBirth**: `number`

The birthdate encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Defined in

[src/models/Patient.ts:150](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L150)

___

### dateOfDeath

• `Optional` **dateOfDeath**: `number`

The date of death encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Defined in

[src/models/Patient.ts:154](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L154)

___

### deactivationReason

• **deactivationReason**: [`PatientDeactivationReasonEnum`](../modules.md#patientdeactivationreasonenum)

When not active, the reason for deactivation.

#### Defined in

[src/models/Patient.ts:126](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L126)

___

### deceased

• `Optional` **deceased**: `boolean`

Is the patient deceased.

#### Defined in

[src/models/Patient.ts:166](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L166)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a patient is ”deleted“, this is set to a non null value: the moment of the deletion

#### Defined in

[src/models/Patient.ts:70](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L70)

___

### education

• `Optional` **education**: `string`

The level of education (college degree, undergraduate, phd).

#### Defined in

[src/models/Patient.ts:170](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L170)

___

### endOfLife

• `Optional` **endOfLife**: `number`

Soft delete (unix epoch in ms) timestamp of the patient

#### Defined in

[src/models/Patient.ts:66](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L66)

___

### ethnicity

• `Optional` **ethnicity**: `string`

The ethnicity of the patient.

#### Defined in

[src/models/Patient.ts:194](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L194)

___

### externalId

• `Optional` **externalId**: `string`

An external (from another source) id with no guarantee or requirement for unicity .

#### Defined in

[src/models/Patient.ts:202](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L202)

___

### firstName

• `Optional` **firstName**: `string`

the firstname (name) of the patient.

#### Defined in

[src/models/Patient.ts:74](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L74)

___

### gender

• `Optional` **gender**: [`PatientGenderEnum`](../modules.md#patientgenderenum)

the gender of the patient: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown

#### Defined in

[src/models/Patient.ts:102](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L102)

___

### id

• `Optional` **id**: `string`

the Id of the patient. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/Patient.ts:30](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L30)

___

### identifiers

• **identifiers**: [`Identifier`](Identifier.md)[]

Typically used for business / client identifiers. An identifier should identify a patient uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.

#### Defined in

[src/models/Patient.ts:38](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L38)

___

### labels

• **labels**: `Set`<[`CodingReference`](CodingReference.md)\>

A label is an item from a codification system that qualifies a patient as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.

#### Defined in

[src/models/Patient.ts:58](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L58)

___

### languages

• **languages**: `string`[]

the list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).

#### Defined in

[src/models/Patient.ts:90](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L90)

___

### lastName

• `Optional` **lastName**: `string`

the lastname (surname) of the patient. This is the official lastname that should be used for official administrative purposes.

#### Defined in

[src/models/Patient.ts:78](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L78)

___

### maidenName

• `Optional` **maidenName**: `string`

Lastname at birth (can be different of the current name), depending on the country, must be used to design the patient .

#### Defined in

[src/models/Patient.ts:134](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L134)

___

### mergeToPatientId

• `Optional` **mergeToPatientId**: `string`

The id of the patient this patient has been merged with.

#### Defined in

[src/models/Patient.ts:110](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L110)

___

### mergedIds

• **mergedIds**: `Set`<`string`\>

The ids of the patients that have been merged inside this patient.

#### Defined in

[src/models/Patient.ts:114](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L114)

___

### modified

• `Optional` **modified**: `number`

the last modification date of the patient (encoded as epoch).

#### Defined in

[src/models/Patient.ts:46](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L46)

___

### names

• **names**: [`PersonName`](PersonName.md)[]

the list of all names of the patient, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the patient in the application

#### Defined in

[src/models/Patient.ts:82](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L82)

___

### nationality

• `Optional` **nationality**: `string`

The nationality of the patient.

#### Defined in

[src/models/Patient.ts:186](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L186)

___

### note

• `Optional` **note**: `string`

A text note (can be confidential, encrypted by default).

#### Defined in

[src/models/Patient.ts:178](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L178)

___

### parameters

• **parameters**: `Object`

Extra parameters

#### Index signature

▪ [key: `string`]: `string`[]

#### Defined in

[src/models/Patient.ts:218](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L218)

___

### partnerName

• `Optional` **partnerName**: `string`

Lastname of the partner, should not be used to design the patient.

#### Defined in

[src/models/Patient.ts:142](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L142)

___

### partnerships

• **partnerships**: [`Partnership`](Partnership.md)[]

List of partners, or persons of contact (of class Partnership, see below).

#### Defined in

[src/models/Patient.ts:206](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L206)

___

### patientHealthCareParties

• **patientHealthCareParties**: [`PatientHealthCareParty`](PatientHealthCareParty.md)[]

Links (usually for therapeutic reasons) between this patient and healthcare parties (of class PatientHealthcareParty).

#### Defined in

[src/models/Patient.ts:210](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L210)

___

### patientProfessions

• **patientProfessions**: [`CodingReference`](CodingReference.md)[]

Codified list of professions exercised by this patient.

#### Defined in

[src/models/Patient.ts:214](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L214)

___

### personalStatus

• `Optional` **personalStatus**: [`PatientPersonalStatusEnum`](../modules.md#patientpersonalstatusenum)

any of `single`, `in_couple`, `married`, `separated`, `divorced`, `divorcing`, `widowed`, `widower`, `complicated`, `unknown`, `contract`, `other`.

#### Defined in

[src/models/Patient.ts:146](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L146)

___

### picture

• `Optional` **picture**: `ArrayBuffer`

A picture usually saved in JPEG format.

#### Defined in

[src/models/Patient.ts:198](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L198)

___

### placeOfBirth

• `Optional` **placeOfBirth**: `string`

The place of birth.

#### Defined in

[src/models/Patient.ts:158](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L158)

___

### placeOfDeath

• `Optional` **placeOfDeath**: `string`

The place of death.

#### Defined in

[src/models/Patient.ts:162](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L162)

___

### profession

• `Optional` **profession**: `string`

The current professional activity.

#### Defined in

[src/models/Patient.ts:174](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L174)

___

### properties

• **properties**: `Set`<[`Property`](Property.md)\>

Extra properties

#### Defined in

[src/models/Patient.ts:222](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L222)

___

### race

• `Optional` **race**: `string`

The race of the patient.

#### Defined in

[src/models/Patient.ts:190](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L190)

___

### responsible

• `Optional` **responsible**: `string`

The id of the data owner that is responsible of this patient. When creating the patient, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing

#### Defined in

[src/models/Patient.ts:54](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L54)

___

### rev

• `Optional` **rev**: `string`

the revision of the patient in the database, used for conflict management / optimistic locking.

#### Defined in

[src/models/Patient.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L34)

___

### spouseName

• `Optional` **spouseName**: `string`

Lastname of the spouse for a married woman, depending on the country, can be used to design the patient.

#### Defined in

[src/models/Patient.ts:138](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L138)

___

### ssin

• `Optional` **ssin**: `string`

Social security inscription number.

#### Defined in

[src/models/Patient.ts:130](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L130)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataOwnerEncrypted`](SystemMetaDataOwnerEncrypted.md)

#### Defined in

[src/models/Patient.ts:223](https://github.com/icure/icure-medical-device-js-sdk/blob/3aae8f0/src/models/Patient.ts#L223)

[@icure/medical-device-sdk](../modules) / PotentiallyEncryptedPatient

# Interface: PotentiallyEncryptedPatient

## Implemented by

- [`EncryptedPatient`](../classes/EncryptedPatient)
- [`Patient`](../classes/Patient)

## Table of contents

### Properties

- [active](PotentiallyEncryptedPatient#active)
- [addresses](PotentiallyEncryptedPatient#addresses)
- [administrativeNote](PotentiallyEncryptedPatient#administrativenote)
- [alias](PotentiallyEncryptedPatient#alias)
- [author](PotentiallyEncryptedPatient#author)
- [birthSex](PotentiallyEncryptedPatient#birthsex)
- [civility](PotentiallyEncryptedPatient#civility)
- [codes](PotentiallyEncryptedPatient#codes)
- [companyName](PotentiallyEncryptedPatient#companyname)
- [created](PotentiallyEncryptedPatient#created)
- [dateOfBirth](PotentiallyEncryptedPatient#dateofbirth)
- [dateOfDeath](PotentiallyEncryptedPatient#dateofdeath)
- [deactivationReason](PotentiallyEncryptedPatient#deactivationreason)
- [deceased](PotentiallyEncryptedPatient#deceased)
- [deletionDate](PotentiallyEncryptedPatient#deletiondate)
- [education](PotentiallyEncryptedPatient#education)
- [endOfLife](PotentiallyEncryptedPatient#endoflife)
- [ethnicity](PotentiallyEncryptedPatient#ethnicity)
- [externalId](PotentiallyEncryptedPatient#externalid)
- [firstName](PotentiallyEncryptedPatient#firstname)
- [gender](PotentiallyEncryptedPatient#gender)
- [id](PotentiallyEncryptedPatient#id)
- [identifiers](PotentiallyEncryptedPatient#identifiers)
- [labels](PotentiallyEncryptedPatient#labels)
- [languages](PotentiallyEncryptedPatient#languages)
- [lastName](PotentiallyEncryptedPatient#lastname)
- [maidenName](PotentiallyEncryptedPatient#maidenname)
- [mergeToPatientId](PotentiallyEncryptedPatient#mergetopatientid)
- [mergedIds](PotentiallyEncryptedPatient#mergedids)
- [modified](PotentiallyEncryptedPatient#modified)
- [names](PotentiallyEncryptedPatient#names)
- [nationality](PotentiallyEncryptedPatient#nationality)
- [note](PotentiallyEncryptedPatient#note)
- [parameters](PotentiallyEncryptedPatient#parameters)
- [partnerName](PotentiallyEncryptedPatient#partnername)
- [partnerships](PotentiallyEncryptedPatient#partnerships)
- [patientHealthCareParties](PotentiallyEncryptedPatient#patienthealthcareparties)
- [patientProfessions](PotentiallyEncryptedPatient#patientprofessions)
- [personalStatus](PotentiallyEncryptedPatient#personalstatus)
- [picture](PotentiallyEncryptedPatient#picture)
- [placeOfBirth](PotentiallyEncryptedPatient#placeofbirth)
- [placeOfDeath](PotentiallyEncryptedPatient#placeofdeath)
- [profession](PotentiallyEncryptedPatient#profession)
- [properties](PotentiallyEncryptedPatient#properties)
- [race](PotentiallyEncryptedPatient#race)
- [responsible](PotentiallyEncryptedPatient#responsible)
- [rev](PotentiallyEncryptedPatient#rev)
- [spouseName](PotentiallyEncryptedPatient#spousename)
- [ssin](PotentiallyEncryptedPatient#ssin)
- [systemMetaData](PotentiallyEncryptedPatient#systemmetadata)

## Properties

### active

• **active**: `boolean`

Is the patient active (boolean).

#### Defined in

[src/models/Patient.ts:369](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L369)

___

### addresses

• **addresses**: [`Address`](../classes/Address)[]

the list of addresses (with address type).

#### Defined in

[src/models/Patient.ts:341](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L341)

___

### administrativeNote

• `Optional` **administrativeNote**: `string`

An administrative note, not confidential.

#### Defined in

[src/models/Patient.ts:429](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L429)

___

### alias

• `Optional` **alias**: `string`

An alias of the person, nickname, ...

#### Defined in

[src/models/Patient.ts:365](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L365)

___

### author

• `Optional` **author**: `string`

The id of the [User] that created this patient. When creating the patient, this field will be filled automatically by the current user id if not provided.

#### Defined in

[src/models/Patient.ts:297](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L297)

___

### birthSex

• `Optional` **birthSex**: [`PatientBirthSexEnum`](../modules#patientbirthsexenum)

the birth sex of the patient: male, female, indeterminate, unknown

#### Defined in

[src/models/Patient.ts:353](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L353)

___

### civility

• `Optional` **civility**: `string`

Mr., Ms., Pr., Dr. ...

#### Defined in

[src/models/Patient.ts:345](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L345)

___

### codes

• **codes**: `Set`<[`CodingReference`](../classes/CodingReference)\>

A code is an item from a codification system that qualifies the content of this patient.

#### Defined in

[src/models/Patient.ts:309](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L309)

___

### companyName

• `Optional` **companyName**: `string`

the name of the company this patient is member of.

#### Defined in

[src/models/Patient.ts:333](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L333)

___

### created

• `Optional` **created**: `number`

the creation date of the patient (encoded as epoch).

#### Defined in

[src/models/Patient.ts:289](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L289)

___

### dateOfBirth

• `Optional` **dateOfBirth**: `number`

The birthdate encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Defined in

[src/models/Patient.ts:397](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L397)

___

### dateOfDeath

• `Optional` **dateOfDeath**: `number`

The date of death encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).

#### Defined in

[src/models/Patient.ts:401](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L401)

___

### deactivationReason

• **deactivationReason**: [`PatientDeactivationReasonEnum`](../modules#patientdeactivationreasonenum)

When not active, the reason for deactivation.

#### Defined in

[src/models/Patient.ts:373](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L373)

___

### deceased

• `Optional` **deceased**: `boolean`

Is the patient deceased.

#### Defined in

[src/models/Patient.ts:413](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L413)

___

### deletionDate

• `Optional` **deletionDate**: `number`

the soft delete timestamp. When a patient is ”deleted“, this is set to a non null value: the moment of the deletion

#### Defined in

[src/models/Patient.ts:317](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L317)

___

### education

• `Optional` **education**: `string`

The level of education (college degree, undergraduate, phd).

#### Defined in

[src/models/Patient.ts:417](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L417)

___

### endOfLife

• `Optional` **endOfLife**: `number`

Soft delete (unix epoch in ms) timestamp of the patient

#### Defined in

[src/models/Patient.ts:313](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L313)

___

### ethnicity

• `Optional` **ethnicity**: `string`

The ethnicity of the patient.

#### Defined in

[src/models/Patient.ts:441](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L441)

___

### externalId

• `Optional` **externalId**: `string`

An external (from another source) id with no guarantee or requirement for unicity .

#### Defined in

[src/models/Patient.ts:449](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L449)

___

### firstName

• `Optional` **firstName**: `string`

the firstname (name) of the patient.

#### Defined in

[src/models/Patient.ts:321](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L321)

___

### gender

• `Optional` **gender**: [`PatientGenderEnum`](../modules#patientgenderenum)

the gender of the patient: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown

#### Defined in

[src/models/Patient.ts:349](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L349)

___

### id

• `Optional` **id**: `string`

the Id of the patient. We encourage using either a v4 UUID or a HL7 Id.

#### Defined in

[src/models/Patient.ts:277](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L277)

___

### identifiers

• **identifiers**: [`Identifier`](../classes/Identifier)[]

Typically used for business / client identifiers. An identifier should identify a patient uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.

#### Defined in

[src/models/Patient.ts:285](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L285)

___

### labels

• **labels**: `Set`<[`CodingReference`](../classes/CodingReference)\>

A label is an item from a codification system that qualifies a patient as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.

#### Defined in

[src/models/Patient.ts:305](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L305)

___

### languages

• **languages**: `string`[]

the list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).

#### Defined in

[src/models/Patient.ts:337](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L337)

___

### lastName

• `Optional` **lastName**: `string`

the lastname (surname) of the patient. This is the official lastname that should be used for official administrative purposes.

#### Defined in

[src/models/Patient.ts:325](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L325)

___

### maidenName

• `Optional` **maidenName**: `string`

Lastname at birth (can be different of the current name), depending on the country, must be used to design the patient .

#### Defined in

[src/models/Patient.ts:381](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L381)

___

### mergeToPatientId

• `Optional` **mergeToPatientId**: `string`

The id of the patient this patient has been merged with.

#### Defined in

[src/models/Patient.ts:357](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L357)

___

### mergedIds

• **mergedIds**: `Set`<`string`\>

The ids of the patients that have been merged inside this patient.

#### Defined in

[src/models/Patient.ts:361](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L361)

___

### modified

• `Optional` **modified**: `number`

the last modification date of the patient (encoded as epoch).

#### Defined in

[src/models/Patient.ts:293](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L293)

___

### names

• **names**: [`PersonName`](../classes/PersonName)[]

the list of all names of the patient, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the patient in the application

#### Defined in

[src/models/Patient.ts:329](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L329)

___

### nationality

• `Optional` **nationality**: `string`

The nationality of the patient.

#### Defined in

[src/models/Patient.ts:433](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L433)

___

### note

• `Optional` **note**: `string`

A text note (can be confidential, encrypted by default).

#### Defined in

[src/models/Patient.ts:425](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L425)

___

### parameters

• **parameters**: `Object`

Extra parameters

#### Index signature

▪ [key: `string`]: `string`[]

#### Defined in

[src/models/Patient.ts:465](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L465)

___

### partnerName

• `Optional` **partnerName**: `string`

Lastname of the partner, should not be used to design the patient.

#### Defined in

[src/models/Patient.ts:389](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L389)

___

### partnerships

• **partnerships**: [`Partnership`](../classes/Partnership)[]

List of partners, or persons of contact (of class Partnership, see below).

#### Defined in

[src/models/Patient.ts:453](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L453)

___

### patientHealthCareParties

• **patientHealthCareParties**: [`PatientHealthCareParty`](../classes/PatientHealthCareParty)[]

Links (usually for therapeutic reasons) between this patient and healthcare parties (of class PatientHealthcareParty).

#### Defined in

[src/models/Patient.ts:457](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L457)

___

### patientProfessions

• **patientProfessions**: [`CodingReference`](../classes/CodingReference)[]

Codified list of professions exercised by this patient.

#### Defined in

[src/models/Patient.ts:461](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L461)

___

### personalStatus

• `Optional` **personalStatus**: [`PatientPersonalStatusEnum`](../modules#patientpersonalstatusenum)

any of `single`, `in_couple`, `married`, `separated`, `divorced`, `divorcing`, `widowed`, `widower`, `complicated`, `unknown`, `contract`, `other`.

#### Defined in

[src/models/Patient.ts:393](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L393)

___

### picture

• `Optional` **picture**: `ArrayBuffer`

A picture usually saved in JPEG format.

#### Defined in

[src/models/Patient.ts:445](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L445)

___

### placeOfBirth

• `Optional` **placeOfBirth**: `string`

The place of birth.

#### Defined in

[src/models/Patient.ts:405](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L405)

___

### placeOfDeath

• `Optional` **placeOfDeath**: `string`

The place of death.

#### Defined in

[src/models/Patient.ts:409](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L409)

___

### profession

• `Optional` **profession**: `string`

The current professional activity.

#### Defined in

[src/models/Patient.ts:421](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L421)

___

### properties

• **properties**: `Set`<[`Property`](../classes/Property)\>

Extra properties

#### Defined in

[src/models/Patient.ts:469](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L469)

___

### race

• `Optional` **race**: `string`

The race of the patient.

#### Defined in

[src/models/Patient.ts:437](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L437)

___

### responsible

• `Optional` **responsible**: `string`

The id of the data owner that is responsible of this patient. When creating the patient, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing

#### Defined in

[src/models/Patient.ts:301](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L301)

___

### rev

• `Optional` **rev**: `string`

the revision of the patient in the database, used for conflict management / optimistic locking.

#### Defined in

[src/models/Patient.ts:281](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L281)

___

### spouseName

• `Optional` **spouseName**: `string`

Lastname of the spouse for a married woman, depending on the country, can be used to design the patient.

#### Defined in

[src/models/Patient.ts:385](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L385)

___

### ssin

• `Optional` **ssin**: `string`

Social security inscription number.

#### Defined in

[src/models/Patient.ts:377](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L377)

___

### systemMetaData

• `Optional` **systemMetaData**: [`SystemMetaDataOwnerEncrypted`](../classes/SystemMetaDataOwnerEncrypted)

#### Defined in

[src/models/Patient.ts:470](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/models/Patient.ts#L470)

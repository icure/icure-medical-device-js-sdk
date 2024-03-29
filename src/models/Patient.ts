/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Address } from './Address'
import { CodingReference } from './CodingReference'
import { Identifier } from './Identifier'
import { Partnership } from './Partnership'
import { PatientHealthCareParty } from './PatientHealthCareParty'
import { PersonName } from './PersonName'
import { Property } from './Property'
import { SystemMetaDataOwnerEncrypted } from './SystemMetaDataOwnerEncrypted'
import { b64_2ab, ua2b64 } from '@icure/api'
import { SystemMetaDataOwner } from './SystemMetaDataOwner'
import { HealthcareProfessionalGenderEnum } from './HealthcareProfessional'

export class Patient implements PotentiallyEncryptedPatient {
  constructor(json: IPatient) {
    const {
      identifiers,
      labels,
      codes,
      names,
      addresses,
      gender,
      birthSex,
      mergedIds,
      deactivationReason,
      personalStatus,
      picture,
      partnerships,
      patientHealthCareParties,
      patientProfessions,
      properties,
      systemMetaData,
      ...simpleProperties
    } = json

    Object.assign(this as Patient, simpleProperties as IPatient)

    this.identifiers = identifiers ? [...identifiers]?.map((p) => new Identifier(p)) : []

    this.labels = labels ? new Set([...labels].map((it) => new CodingReference(it))) : new Set()
    this.codes = codes ? new Set([...codes].map((it) => new CodingReference(it))) : new Set()

    this.names = names?.map((n) => new PersonName(n)) ?? []
    this.addresses = addresses?.map((a) => new Address(a)) ?? []
    this.gender = gender as HealthcareProfessionalGenderEnum
    this.birthSex = birthSex as HealthcareProfessionalGenderEnum
    this.mergedIds = mergedIds ? new Set([...mergedIds]) : new Set()
    this.deactivationReason = deactivationReason as PatientDeactivationReasonEnum
    this.personalStatus = personalStatus as PatientPersonalStatusEnum

    this.picture = !picture
      ? undefined
      : (picture as unknown) instanceof ArrayBuffer
      ? picture
      : typeof (picture as unknown) === 'string'
      ? b64_2ab(picture as unknown as string)
      : undefined

    this.partnerships = partnerships ? [...partnerships]?.map((p) => new Partnership(p)) : []
    this.patientHealthCareParties = patientHealthCareParties ? [...patientHealthCareParties]?.map((p) => new PatientHealthCareParty(p)) : []
    this.patientProfessions = patientProfessions ? [...patientProfessions]?.map((p) => new CodingReference(p)) : []

    this.properties = properties ? new Set([...properties]?.map((p) => new Property(p))) : new Set()

    this.systemMetaData = systemMetaData && new SystemMetaDataOwnerEncrypted(systemMetaData)
  }

  'id'?: string
  'rev'?: string
  'identifiers': Identifier[]
  'created'?: number
  'modified'?: number
  'author'?: string
  'responsible'?: string
  'labels': Set<CodingReference>
  'codes': Set<CodingReference>
  'endOfLife'?: number
  'deletionDate'?: number
  'firstName'?: string
  'lastName'?: string
  'names': PersonName[]
  'companyName'?: string
  'languages': string[]
  'addresses': Address[]
  'civility'?: string
  'gender'?: PatientGenderEnum
  'birthSex'?: PatientBirthSexEnum
  'mergeToPatientId'?: string
  'mergedIds': Set<string>
  'alias'?: string
  'active': boolean
  'deactivationReason': PatientDeactivationReasonEnum
  'ssin'?: string
  'maidenName'?: string
  'spouseName'?: string
  'partnerName'?: string
  'personalStatus'?: PatientPersonalStatusEnum
  'dateOfBirth'?: number
  'dateOfDeath'?: number
  'placeOfBirth'?: string
  'placeOfDeath'?: string
  'deceased'?: boolean
  'education'?: string
  'profession'?: string
  'note'?: string
  'administrativeNote'?: string
  'nationality'?: string
  'race'?: string
  'ethnicity'?: string
  'picture'?: ArrayBuffer
  'externalId'?: string
  'partnerships': Partnership[]
  'patientHealthCareParties': PatientHealthCareParty[]
  'patientProfessions': CodingReference[]
  'parameters': { [key: string]: string[] }
  'properties': Set<Property>
  'systemMetaData'?: SystemMetaDataOwnerEncrypted

  marshal(): IPatient {
    return {
      ...this,
      identifiers: this.identifiers && this.identifiers.map((i) => i.marshal()),
      labels: this.labels ? [...this.labels].map((it) => it.marshal()) : undefined,
      codes: this.codes ? [...this.codes].map((it) => it.marshal()) : undefined,
      names: this.names?.map((n) => n.marshal()) ?? undefined,
      addresses: this.addresses?.map((a) => a.marshal()) ?? undefined,
      mergedIds: this.mergedIds ? [...this.mergedIds] : undefined,
      picture: this.picture ? ua2b64(this.picture) : undefined,
      partnerships: this.partnerships?.map((p) => p.marshal()) ?? undefined,
      patientHealthCareParties: this.patientHealthCareParties?.map((p) => p.marshal()) ?? undefined,
      patientProfessions: this.patientProfessions?.map((p) => p.marshal()) ?? undefined,
      properties: this.properties ? [...this.properties].map((it) => it.marshal()) : undefined,
      systemMetaData: this.systemMetaData ? this.systemMetaData.marshal() : undefined,
    }
  }
}

export class EncryptedPatient implements PotentiallyEncryptedPatient {
  constructor(json: IPatient) {
    const {
      identifiers,
      labels,
      codes,
      names,
      addresses,
      gender,
      birthSex,
      mergedIds,
      deactivationReason,
      personalStatus,
      picture,
      partnerships,
      patientHealthCareParties,
      patientProfessions,
      properties,
      systemMetaData,
      ...simpleProperties
    } = json

    Object.assign(this as Patient, simpleProperties as IPatient)

    this.identifiers = identifiers ? [...identifiers]?.map((p) => new Identifier(p)) : []

    this.labels = labels ? new Set([...labels].map((it) => new CodingReference(it))) : new Set()
    this.codes = codes ? new Set([...codes].map((it) => new CodingReference(it))) : new Set()

    this.names = names?.map((n) => new PersonName(n)) ?? []
    this.addresses = addresses?.map((a) => new Address(a)) ?? []
    this.gender = gender as HealthcareProfessionalGenderEnum
    this.birthSex = birthSex as HealthcareProfessionalGenderEnum
    this.mergedIds = mergedIds ? new Set([...mergedIds]) : new Set()
    this.deactivationReason = deactivationReason as PatientDeactivationReasonEnum
    this.personalStatus = personalStatus as PatientPersonalStatusEnum

    this.picture = !picture
      ? undefined
      : (picture as unknown) instanceof ArrayBuffer
      ? picture
      : typeof (picture as unknown) === 'string'
      ? b64_2ab(picture as unknown as string)
      : undefined

    this.partnerships = partnerships ? [...partnerships]?.map((p) => new Partnership(p)) : []
    this.patientHealthCareParties = patientHealthCareParties ? [...patientHealthCareParties]?.map((p) => new PatientHealthCareParty(p)) : []
    this.patientProfessions = patientProfessions ? [...patientProfessions]?.map((p) => new CodingReference(p)) : []

    this.properties = properties ? new Set([...properties]?.map((p) => new Property(p))) : new Set()

    this.systemMetaData = systemMetaData && new SystemMetaDataOwnerEncrypted(systemMetaData)
  }

  'id'?: string
  'rev'?: string
  'identifiers': Identifier[]
  'created'?: number
  'modified'?: number
  'author'?: string
  'responsible'?: string
  'labels': Set<CodingReference>
  'codes': Set<CodingReference>
  'endOfLife'?: number
  'deletionDate'?: number
  'firstName'?: string
  'lastName'?: string
  'names': PersonName[]
  'companyName'?: string
  'languages': string[]
  'addresses': Address[]
  'civility'?: string
  'gender'?: PatientGenderEnum
  'birthSex'?: PatientBirthSexEnum
  'mergeToPatientId'?: string
  'mergedIds': Set<string>
  'alias'?: string
  'active': boolean
  'deactivationReason': PatientDeactivationReasonEnum
  'ssin'?: string
  'maidenName'?: string
  'spouseName'?: string
  'partnerName'?: string
  'personalStatus'?: PatientPersonalStatusEnum
  'dateOfBirth'?: number
  'dateOfDeath'?: number
  'placeOfBirth'?: string
  'placeOfDeath'?: string
  'deceased'?: boolean
  'education'?: string
  'profession'?: string
  'note'?: string
  'administrativeNote'?: string
  'nationality'?: string
  'race'?: string
  'ethnicity'?: string
  'picture'?: ArrayBuffer
  'externalId'?: string
  'partnerships': Partnership[]
  'patientHealthCareParties': PatientHealthCareParty[]
  'patientProfessions': CodingReference[]
  'parameters': { [key: string]: string[] }
  'properties': Set<Property>
  'systemMetaData'?: SystemMetaDataOwnerEncrypted

  marshal(): IPatient {
    return {
      ...this,
      identifiers: this.identifiers && this.identifiers.map((i) => i.marshal()),
      labels: this.labels ? [...this.labels].map((it) => it.marshal()) : undefined,
      codes: this.codes ? [...this.codes].map((it) => it.marshal()) : undefined,
      names: this.names?.map((n) => n.marshal()) ?? undefined,
      addresses: this.addresses?.map((a) => a.marshal()) ?? undefined,
      mergedIds: this.mergedIds ? [...this.mergedIds] : undefined,
      picture: this.picture ? ua2b64(this.picture) : undefined,
      partnerships: this.partnerships?.map((p) => p.marshal()) ?? undefined,
      patientHealthCareParties: this.patientHealthCareParties?.map((p) => p.marshal()) ?? undefined,
      patientProfessions: this.patientProfessions?.map((p) => p.marshal()) ?? undefined,
      properties: this.properties ? [...this.properties].map((it) => it.marshal()) : undefined,
      systemMetaData: this.systemMetaData ? this.systemMetaData.marshal() : undefined,
    }
  }
}

export interface PotentiallyEncryptedPatient {
  /**
   * the Id of the patient. We encourage using either a v4 UUID or a HL7 Id.
   */
  id?: string
  /**
   * the revision of the patient in the database, used for conflict management / optimistic locking.
   */
  rev?: string
  /**
   * Typically used for business / client identifiers. An identifier should identify a patient uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.
   */
  identifiers: Array<Identifier>
  /**
   * the creation date of the patient (encoded as epoch).
   */
  created?: number
  /**
   * the last modification date of the patient (encoded as epoch).
   */
  modified?: number
  /**
   * The id of the [User] that created this patient. When creating the patient, this field will be filled automatically by the current user id if not provided.
   */
  author?: string
  /**
   * The id of the data owner that is responsible of this patient. When creating the patient, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing
   */
  responsible?: string
  /**
   * A label is an item from a codification system that qualifies a patient as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.
   */
  labels: Set<CodingReference>
  /**
   * A code is an item from a codification system that qualifies the content of this patient.
   */
  codes: Set<CodingReference>
  /**
   * Soft delete (unix epoch in ms) timestamp of the patient
   */
  endOfLife?: number
  /**
   * the soft delete timestamp. When a patient is ”deleted“, this is set to a non null value: the moment of the deletion
   */
  deletionDate?: number
  /**
   * the firstname (name) of the patient.
   */
  firstName?: string
  /**
   * the lastname (surname) of the patient. This is the official lastname that should be used for official administrative purposes.
   */
  lastName?: string
  /**
   * the list of all names of the patient, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the patient in the application
   */
  names: Array<PersonName>
  /**
   * the name of the company this patient is member of.
   */
  companyName?: string
  /**
   * the list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).
   */
  languages: Array<string>
  /**
   * the list of addresses (with address type).
   */
  addresses: Array<Address>
  /**
   * Mr., Ms., Pr., Dr. ...
   */
  civility?: string
  /**
   * the gender of the patient: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown
   */
  gender?: PatientGenderEnum
  /**
   * the birth sex of the patient: male, female, indeterminate, unknown
   */
  birthSex?: PatientBirthSexEnum
  /**
   * The id of the patient this patient has been merged with.
   */
  mergeToPatientId?: string
  /**
   * The ids of the patients that have been merged inside this patient.
   */
  mergedIds: Set<string>
  /**
   * An alias of the person, nickname, ...
   */
  alias?: string
  /**
   * Is the patient active (boolean).
   */
  active: boolean
  /**
   * When not active, the reason for deactivation.
   */
  deactivationReason: PatientDeactivationReasonEnum
  /**
   * Social security inscription number.
   */
  ssin?: string
  /**
   * Lastname at birth (can be different of the current name), depending on the country, must be used to design the patient .
   */
  maidenName?: string
  /**
   * Lastname of the spouse for a married woman, depending on the country, can be used to design the patient.
   */
  spouseName?: string
  /**
   * Lastname of the partner, should not be used to design the patient.
   */
  partnerName?: string
  /**
   * any of `single`, `in_couple`, `married`, `separated`, `divorced`, `divorcing`, `widowed`, `widower`, `complicated`, `unknown`, `contract`, `other`.
   */
  personalStatus?: PatientPersonalStatusEnum
  /**
   * The birthdate encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).
   */
  dateOfBirth?: number
  /**
   * The date of death encoded as a fuzzy date on 8 positions (YYYYMMDD) MM and/or DD can be set to 00 if unknown (19740000 is a valid date).
   */
  dateOfDeath?: number
  /**
   * The place of birth.
   */
  placeOfBirth?: string
  /**
   * The place of death.
   */
  placeOfDeath?: string
  /**
   * Is the patient deceased.
   */
  deceased?: boolean
  /**
   * The level of education (college degree, undergraduate, phd).
   */
  education?: string
  /**
   * The current professional activity.
   */
  profession?: string
  /**
   * A text note (can be confidential, encrypted by default).
   */
  note?: string
  /**
   * An administrative note, not confidential.
   */
  administrativeNote?: string
  /**
   * The nationality of the patient.
   */
  nationality?: string
  /**
   * The race of the patient.
   */
  race?: string
  /**
   * The ethnicity of the patient.
   */
  ethnicity?: string
  /**
   * A picture usually saved in JPEG format.
   */
  picture?: ArrayBuffer
  /**
   * An external (from another source) id with no guarantee or requirement for unicity .
   */
  externalId?: string
  /**
   * List of partners, or persons of contact (of class Partnership, see below).
   */
  partnerships: Array<Partnership>
  /**
   * Links (usually for therapeutic reasons) between this patient and healthcare parties (of class PatientHealthcareParty).
   */
  patientHealthCareParties: Array<PatientHealthCareParty>
  /**
   * Codified list of professions exercised by this patient.
   */
  patientProfessions: Array<CodingReference>
  /**
   * Extra parameters
   */
  parameters: { [key: string]: Array<string> }
  /**
   * Extra properties
   */
  properties: Set<Property>
  systemMetaData?: SystemMetaDataOwnerEncrypted
}

interface IPatient {
  id?: string
  rev?: string
  identifiers?: Array<Identifier>
  created?: number
  modified?: number
  author?: string
  responsible?: string
  labels?: Set<CodingReference>
  codes?: Set<CodingReference>
  endOfLife?: number
  deletionDate?: number
  firstName?: string
  lastName?: string
  names?: Array<PersonName>
  companyName?: string
  languages?: Array<string>
  addresses?: Array<Address>
  civility?: string
  gender?: PatientGenderEnum
  birthSex?: PatientBirthSexEnum
  mergeToPatientId?: string
  mergedIds?: Set<string>
  alias?: string
  active?: boolean
  deactivationReason?: PatientDeactivationReasonEnum
  ssin?: string
  maidenName?: string
  spouseName?: string
  partnerName?: string
  personalStatus?: PatientPersonalStatusEnum
  dateOfBirth?: number
  dateOfDeath?: number
  placeOfBirth?: string
  placeOfDeath?: string
  deceased?: boolean
  education?: string
  profession?: string
  note?: string
  administrativeNote?: string
  nationality?: string
  race?: string
  ethnicity?: string
  picture?: ArrayBuffer
  externalId?: string
  partnerships?: Array<Partnership>
  patientHealthCareParties?: Array<PatientHealthCareParty>
  patientProfessions?: Array<CodingReference>
  parameters?: { [key: string]: Array<string> }
  properties?: Set<Property>
  systemMetaData?: SystemMetaDataOwnerEncrypted
}

export type PatientGenderEnum = 'male' | 'female' | 'indeterminate' | 'changed' | 'changedToMale' | 'changedToFemale' | 'unknown'
export type PatientBirthSexEnum = 'male' | 'female' | 'indeterminate' | 'changed' | 'changedToMale' | 'changedToFemale' | 'unknown'
export type PatientDeactivationReasonEnum = 'deceased' | 'moved' | 'other_doctor' | 'retired' | 'no_contact' | 'unknown' | 'none'
export type PatientPersonalStatusEnum =
  | 'single'
  | 'in_couple'
  | 'married'
  | 'separated'
  | 'divorced'
  | 'divorcing'
  | 'widowed'
  | 'widower'
  | 'complicated'
  | 'unknown'
  | 'contract'
  | 'other'
  | 'annulled'
  | 'polygamous'

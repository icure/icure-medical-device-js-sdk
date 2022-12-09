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

import {Address} from './Address';
import {CodingReference} from './CodingReference';
import {PersonName} from './PersonName';
import {Property} from './Property';
import {SystemMetaDataOwner} from './SystemMetaDataOwner';
import {SystemMetaDataEncrypted} from "./SystemMetaDataEncrypted";
import {b64_2ab, ua2b64} from "@icure/api";

export class HealthcareProfessional {
constructor(json: IHealthcareProfessional) {
  const { labels, codes, names, gender, addresses, picture, specialityCodes, properties, systemMetaData, ...simpleProperties } = json

  Object.assign(this as HealthcareProfessional, simpleProperties as IHealthcareProfessional)

  this.labels = labels ? new Set([...labels].map((it)=> new CodingReference(it))) : new Set()
  this.codes = codes ? new Set([...codes].map((it)=> new CodingReference(it))) : new Set()

  this.names = names?.map(n => new PersonName(n)) ?? []
  this.gender = gender as HealthcareProfessionalGenderEnum
  this.addresses = addresses?.map(a => new Address(a)) ?? []
  this.picture = !picture ? undefined : (picture as unknown instanceof ArrayBuffer) ? picture : (typeof (picture as unknown) === 'string') ? b64_2ab(picture as unknown as string) : undefined
  this.specialityCodes = specialityCodes && new Set([...specialityCodes].map((it)=> new CodingReference(it)))
  this.properties = properties ? new Set(([...properties])?.map(p => new Property(p))) : new Set()

  this.systemMetaData = systemMetaData && new SystemMetaDataOwner(systemMetaData)

}

    /**
    * the Id of the healthcare party. We encourage using either a v4 UUID or a HL7 Id.
    */
    'id'?: string;
    /**
    * the revision of the healthcare party in the database, used for conflict management / optimistic locking.
    */
    'rev'?: string;
    /**
    * creation timestamp of the object.
    */
    'created'?: number;
    /**
    * last modification timestamp of the object.
    */
    'modified'?: number;
    /**
     * A label is an item from a codification system that qualifies a doctor as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.
     * Example: HealthcareProfessional is an organisation
     */
    'labels': Set<CodingReference>;
    /**
     * A code is an item from a codification system that qualifies the content of this doctor.
     * Example: doctor's specialty
     */
    'codes': Set<CodingReference>;
    /**
    * the soft delete timestamp. When a user is ”deleted“, this is set to a non null value: the moment of the deletion
    */
    'deletionDate'?: number;
    /**
    * The full name of the healthcare party, used mainly when the healthcare party is an organization
    */
    'name'?: string;
    /**
    * the lastname (surname) of the healthcare party. This is the official lastname that should be used for official administrative purposes.
    */
    'lastName'?: string;
    /**
    * the firstname (name) of the healthcare party.
    */
    'firstName'?: string;
    /**
    * the list of all names of the healthcare party, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the healthcare party in the application
    */
    'names': Array<PersonName>;
    /**
    * the gender of the healthcare party: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown
    */
    'gender'?: HealthcareProfessionalGenderEnum;
    /**
    * Mr., Ms., Pr., Dr. ...
    */
    'civility'?: string;
    /**
    * Medical specialty of the healthcare party
    */
    'speciality'?: string;
    /**
    * Id of parent of the user representing the healthcare party.
    */
    'parentId'?: string;
    /**
    * The list of addresses (with address type).
    */
    'addresses': Array<Address>;
    /**
    * The list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).
    */
    'languages': Array<string>;
    /**
    * A picture usually saved in JPEG format.
    */
    'picture'?: ArrayBuffer;
    /**
    * Medical specialty of the healthcare party codified using FHIR or Kmehr codificaiton scheme
    */
    'specialityCodes'?: Set<CodingReference>;
    /**
    * Text notes.
    */
    'notes'?: string;
    'properties': Set<Property>;
    'systemMetaData'?: SystemMetaDataOwner;

    marshal(): IHealthcareProfessional {
      return {
        ...this,
        labels: this.labels ? [...this.labels].map((it)=> it.marshal()) : undefined,
        codes: this.codes ? [...this.codes].map((it)=> it.marshal()) : undefined,
        names: this.names?.map(n => n.marshal()) ?? undefined,
        addresses: this.addresses?.map(a => a.marshal()) ?? undefined,
        picture: this.picture ? ua2b64(this.picture) : undefined,
        specialityCodes: this.specialityCodes ? [...this.specialityCodes].map((it)=> it.marshal()) : undefined,
        properties: this.properties ? [...this.properties].map((it)=> it.marshal()) : undefined,
        systemMetaData: this.systemMetaData ? this.systemMetaData.marshal() : undefined,
      }
    }
}

interface IHealthcareProfessional {
  'id'?: string;
  'rev'?: string;
  'created'?: number;
  'modified'?: number;
  'labels'?: Set<CodingReference>;
  'codes'?: Set<CodingReference>;
  'deletionDate'?: number;
  'name'?: string;
  'lastName'?: string;
  'firstName'?: string;
  'names'?: Array<PersonName>;
  'gender'?: HealthcareProfessionalGenderEnum;
  'civility'?: string;
  'speciality'?: string;
  'parentId'?: string;
  'addresses'?: Array<Address>;
  'languages'?: Array<string>;
  'picture'?: ArrayBuffer;
  'specialityCodes'?: Set<CodingReference>;
  'notes'?: string;
  'properties'?: Set<Property>;
  'systemMetaData'?: SystemMetaDataOwner;
}


export type HealthcareProfessionalGenderEnum = "male" | "female" | "indeterminate" | "changed" | "changedToMale" | "changedToFemale" | "unknown" ;

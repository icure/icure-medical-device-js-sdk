import { Filter } from './Filter'
import { Coding } from '../models/Coding'
import { DataSample } from '../models/DataSample'
import { HealthcareElement } from '../models/HealthcareElement'
import { HealthcareProfessional } from '../models/HealthcareProfessional'
import { MedicalDevice } from '../models/MedicalDevice'
import { Patient, PatientGenderEnum } from '../models/Patient'
import { User } from '../models/User'
import { UserByIdsFilter } from './user/UserByIdsFilter'
import { UnionFilter } from './UnionFilter'
import { IntersectionFilter } from './IntersectionFilter'
import { AllUsersFilter } from './user/AllUsersFilter'
import { Identifier } from '../models/Identifier'

import { addDays, format } from 'date-fns'
import { PatientByIdsFilter } from './patient/PatientByIdsFilter'
import { PatientByHealthcarePartyIdentifiersFilter } from './patient/PatientByHealthcarePartyIdentifiersFilter'
import { Delegation, IccCryptoXApi } from '@icure/api'
import { PatientByHealthcarePartyGenderEducationProfessionFilter } from './patient/PatientByHealthcarePartyGenderEducationProfessionFilter'
import { PatientByHealthcarePartyDateOfBirthBetweenFilter } from './patient/PatientByHealthcarePartyDateOfBirthBetweenFilter'
import { PatientByHealthcarePartyNameContainsFuzzyFilter } from './patient/PatientByHealthcarePartyNameContainsFuzzyFilter'
import { PatientByHealthcarePartyFilter } from './patient/PatientByHealthcarePartyFilter'
import { HealthcareProfessionalByIdsFilter } from './hcp/HealthcareProfessionalByIdsFilter'
import { AllHealthcareProfessionalsFilter } from './hcp/AllHealthcareProfessionalsFilter'
import { MedicalDeviceByIdsFilter } from './medicaldevice/MedicalDeviceByIdsFilter'
import { AllMedicalDevicesFilter } from './medicaldevice/AllMedicalDevicesFilter'
import { HealthcareElementByHealthcarePartyLabelCodeFilter } from './healthcareelement/HealthcareElementByHealthcarePartyLabelCodeFilter'
import { HealthcareElementByIdsFilter } from './healthcareelement/HealthcareElementByIdsFilter'
import { HealthcareElementByHealthcarePartyIdentifiersFilter } from './healthcareelement/HealthcareElementByHealthcarePartyIdentifiersFilter'
import { HealthcareElementByHealthcarePartyFilter } from './healthcareelement/HealthcareElementByHealthcarePartyFilter'
import { HealthcareElementByHealthcarePartyPatientFilter } from './healthcareelement/HealthcareElementByHealthcarePartyPatientFilter'
import { CodingByRegionTypeLabelFilter } from './coding/CodingByRegionTypeLabelFilter'
import { CodingByIdsFilter } from './coding/CodingByIdsFilter'
import { AllCodingsFilter } from './coding/AllCodingsFilter'
import { DataSampleByHealthcarePartyTagCodeDateFilter } from './datasample/DataSampleByHealthcarePartyTagCodeDateFilter'
import { DataSampleByIdsFilter } from './datasample/DataSampleByIdsFilter'
import { DataSampleByHealthcarePartyIdentifiersFilter } from './datasample/DataSampleByHealthcarePartyIdentifiersFilter'
import { DataSampleByHealthcarePartyPatientFilter } from './datasample/DataSampleByHealthcarePartyPatientFilter'
import { DataSampleByHealthcarePartyFilter } from './datasample/DataSampleByHealthcarePartyFilter'
import { DataSampleByHealthcarePartyHealthcareElementIdsFilter } from './datasample/DataSampleByHealthcarePartyHealthcareElementIdsFilter'
import { Notification, NotificationTypeEnum } from '../models/Notification'
import { NotificationsByIdFilter } from './notification/NotificationsByIdFilter'
import { NotificationsByHcPartyAndTypeFilter } from './notification/NotificationsByHcPartyAndTypeFilter'
import { NotificationsAfterDateFilter } from './notification/NotificationsAfterDateFilter'
import { UsersByPatientIdFilter } from './user/UsersByPatientIdFilter'
import { PatientByHealthcarePartySsinsFilter } from './patient/PatientByHealthcarePartySsinsFilter'
import { HealthcareProfessionalByLabelCodeFilter } from './hcp/HealthcareProfessionalByLabelCodeFilter'
import {HealthcareProfessionalByNameFilter} from "./hcp/HealthcareProfessionalByNameFilter";

interface FilterBuilder<T> {
  build(): Promise<Filter<T>>
}

export class UserFilter implements FilterBuilder<User> {
  _byIds?: string[]
  _union?: UserFilter[]
  _intersection?: UserFilter[]
  _patientId?: string

  byIds(byIds: string[]): UserFilter {
    this._byIds = byIds
    return this
  }

  byPatientId(patientId: string): UserFilter {
    this._patientId = patientId
    return this
  }

  union(filters: UserFilter[]): UserFilter {
    this._union = filters
    return this
  }

  intersection(filters: UserFilter[]): UserFilter {
    this._intersection = filters
    return this
  }

  async build(): Promise<Filter<User>> {
    const filters = [
      this._byIds && ({ ids: this._byIds, $type: 'UserByIdsFilter' } as UserByIdsFilter),
      this._patientId && ({ patientId: this._patientId, $type: 'UsersByPatientIdFilter' } as UsersByPatientIdFilter)
    ].filter((x) => !!x) as Filter<User>[]

    if (!!this._union) {
      return {
        filters: await Promise.all(this._union.map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'UnionFilter',
      } as UnionFilter<User>
    } else if (filters.length > 1 || !!this._intersection) {
      return {
        filters: await Promise.all((this._intersection ?? []).map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'IntersectionFilter',
      } as IntersectionFilter<User>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { $type: 'AllUsersFilter' } as AllUsersFilter
    }
  }
}

export class PatientFilter implements FilterBuilder<Patient> {
  _forDataOwner?: string

  getDataOwner() {
    return this._forDataOwner
  }

  _byIds?: string[]
  _byIdentifiers?: Identifier[]
  _withSsins?: string[]
  _dateOfBirthBetween?: [number, number]
  _byGenderEducationProfession?: [PatientGenderEnum, string | undefined, string | undefined]
  _containsFuzzy?: string
  _union?: PatientFilter[]
  _intersection?: PatientFilter[]

  forDataOwner(dataOwnerId: string): PatientFilter {
    this._forDataOwner = dataOwnerId
    return this
  }

  byIds(byIds: string[]): PatientFilter {
    this._byIds = byIds
    return this
  }

  byIdentifiers(identifiers: Identifier[]): PatientFilter {
    this._byIdentifiers = identifiers
    return this
  }

  byGenderEducationProfession(gender: PatientGenderEnum, education?: string, profession?: string): PatientFilter {
    this._byGenderEducationProfession = [gender, education, profession]
    return this
  }

  withSsins(withSsins: string[]): PatientFilter {
    this._withSsins = withSsins
    return this
  }

  ofAge(age: number): PatientFilter {
    const now = new Date()
    return this.dateOfBirthBetween(
      parseInt(format(addDays(new Date(now.getFullYear() - age - 1, now.getMonth(), now.getDay()), 1), 'yyyyMMdd')),
      parseInt(format(new Date(now.getFullYear() - age, now.getMonth(), now.getDay()), 'yyyyMMdd'))
    )
  }

  dateOfBirthBetween(from: number, to: number): PatientFilter {
    this._dateOfBirthBetween = [from, to]
    return this
  }

  containsFuzzy(searchString: string): PatientFilter {
    this._containsFuzzy = searchString
    return this
  }

  union(filters: PatientFilter[]): PatientFilter {
    this._union = filters
    return this
  }

  intersection(filters: PatientFilter[]): PatientFilter {
    this._intersection = filters
    return this
  }

  async build(): Promise<Filter<Patient>> {
    if (this._forDataOwner == null) {
      throw Error('Data Owner must be set for patient filter.')
    }
    const dataOwnerId = this._forDataOwner!

    const filters = [
      this._byIds && ({ ids: this._byIds, $type: 'PatientByIdsFilter' } as PatientByIdsFilter),
      this._byIdentifiers &&
        ({
          healthcarePartyId: dataOwnerId,
          identifiers: this._byIdentifiers,
          $type: 'PatientByHealthcarePartyIdentifiersFilter',
        } as PatientByHealthcarePartyIdentifiersFilter),
      this._withSsins &&
        ({
          healthcarePartyId: dataOwnerId,
          ssins: this._withSsins,
          $type: 'PatientByHealthcarePartySsinsFilter',
        } as PatientByHealthcarePartySsinsFilter),
      this._dateOfBirthBetween &&
        ({
          healthcarePartyId: dataOwnerId,
          minDateOfBirth: this._dateOfBirthBetween[0],
          maxDateOfBirth: this._dateOfBirthBetween[1],
          $type: 'PatientByHealthcarePartyDateOfBirthBetweenFilter',
        } as PatientByHealthcarePartyDateOfBirthBetweenFilter),
      this._byGenderEducationProfession &&
        ({
          healthcarePartyId: dataOwnerId,
          gender: this._byGenderEducationProfession[0],
          education: this._byGenderEducationProfession[1],
          profession: this._byGenderEducationProfession[2],
          $type: 'PatientByHealthcarePartyGenderEducationProfessionFilter',
        } as PatientByHealthcarePartyGenderEducationProfessionFilter),
      this._containsFuzzy &&
        ({
          healthcarePartyId: dataOwnerId,
          searchString: this._containsFuzzy,
          $type: 'PatientByHealthcarePartyNameContainsFuzzyFilter',
        } as PatientByHealthcarePartyNameContainsFuzzyFilter)
    ].filter((x) => !!x) as Filter<Patient>[]

    if (!!this._union) {
      return {
        filters: await Promise.all(this._union.map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'UnionFilter',
      } as UnionFilter<Patient>
    } else if (filters.length > 1 || !!this._intersection) {
      return {
        filters: await Promise.all((this._intersection ?? []).map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'IntersectionFilter',
      } as IntersectionFilter<Patient>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { healthcarePartyId: dataOwnerId, $type: 'PatientByHealthcarePartyFilter' } as PatientByHealthcarePartyFilter
    }
  }
}

export class HealthcareProfessionalFilter implements FilterBuilder<HealthcareProfessional> {
  _matches?: string
  _byIds?: string[]
  _union?: HealthcareProfessionalFilter[]
  _intersection?: HealthcareProfessionalFilter[]
  _byLabelCodeFilter?: HealthcareProfessionalByLabelCodeFilter

  byIds(byIds: string[]): HealthcareProfessionalFilter {
    this._byIds = byIds
    return this
  }

  byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): HealthcareProfessionalFilter {
    this._byLabelCodeFilter = {
      labelType,
      labelCode,
      codeType,
      codeCode,
      $type: 'HealthcareProfessionalByLabelCodeFilter',
    } as HealthcareProfessionalByLabelCodeFilter
    return this
  }

  byMatches(searchString: string): HealthcareProfessionalFilter {
    this._matches = searchString
    return this
  }

  union(filters: HealthcareProfessionalFilter[]): HealthcareProfessionalFilter {
    this._union = filters
    return this
  }

  intersection(filters: HealthcareProfessionalFilter[]): HealthcareProfessionalFilter {
    this._intersection = filters
    return this
  }

  async build(): Promise<Filter<HealthcareProfessional>> {
    const filters = [
      this._matches && ({ name: this._matches, $type: 'HealthcareProfessionalByNameFilter' } as HealthcareProfessionalByNameFilter),
      this._byIds && ({ ids: this._byIds, $type: 'HealthcareProfessionalByIdsFilter' } as HealthcareProfessionalByIdsFilter),
      this._byLabelCodeFilter
    ].filter((x) => !!x) as Filter<HealthcareProfessional>[]

    if (!!this._union) {
      return {
        filters: await Promise.all(this._union.map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'UnionFilter',
      } as UnionFilter<HealthcareProfessional>
    } else if (filters.length > 1 || !!this._intersection) {
      return {
        filters: await Promise.all((this._intersection ?? []).map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'IntersectionFilter',
      } as IntersectionFilter<HealthcareProfessional>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { $type: 'AllHealthcareProfessionalsFilter' } as AllHealthcareProfessionalsFilter
    }
  }
}

export class MedicalDeviceFilter implements FilterBuilder<MedicalDevice> {
  _byIds?: string[]
  _union?: MedicalDeviceFilter[]
  _intersection?: MedicalDeviceFilter[]

  byIds(byIds: string[]): MedicalDeviceFilter {
    this._byIds = byIds
    return this
  }

  union(filters: MedicalDeviceFilter[]): MedicalDeviceFilter {
    this._union = filters
    return this
  }

  intersection(filters: MedicalDeviceFilter[]): MedicalDeviceFilter {
    this._intersection = filters
    return this
  }

  async build(): Promise<Filter<MedicalDevice>> {
    const filters = [
      this._byIds && ({ ids: this._byIds, $type: 'MedicalDeviceByIdsFilter' } as MedicalDeviceByIdsFilter)
    ].filter((x) => !!x) as Filter<MedicalDevice>[]

    if (!!this._union) {
      return {
        filters: await Promise.all(this._union.map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'UnionFilter',
      } as UnionFilter<MedicalDevice>
    } else if (filters.length > 1 || !!this._intersection) {
      return {
        filters: await Promise.all((this._intersection ?? []).map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'IntersectionFilter',
      } as IntersectionFilter<MedicalDevice>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { $type: 'AllMedicalDevicesFilter' } as AllMedicalDevicesFilter
    }
  }
}

export class HealthcareElementFilter implements FilterBuilder<HealthcareElement> {
  _forDataOwner?: string
  getDataOwner() {
    return this._forDataOwner
  }

  _byIds?: string[]
  _byIdentifiers?: Identifier[]
  _byLabelCodeFilter?: HealthcareElementByHealthcarePartyLabelCodeFilter
  _forPatients?: [IccCryptoXApi, Patient[]]
  _union?: HealthcareElementFilter[]
  _intersection?: HealthcareElementFilter[]

  forDataOwner(dataOwnerId: string): HealthcareElementFilter {
    this._forDataOwner = dataOwnerId
    return this
  }

  byIds(byIds: string[]): HealthcareElementFilter {
    this._byIds = byIds
    return this
  }

  byIdentifiers(identifiers: Identifier[]): HealthcareElementFilter {
    this._byIdentifiers = identifiers
    return this
  }

  byLabelCodeFilter(tagType?: string, tagCode?: string, codeType?: string, codeCode?: string): HealthcareElementFilter {
    this._byLabelCodeFilter = {
      tagType,
      tagCode,
      codeType,
      codeCode,
      $type: 'HealthcareElementByHealthcarePartyLabelCodeFilter',
    } as HealthcareElementByHealthcarePartyLabelCodeFilter
    return this
  }

  forPatients(crypto: IccCryptoXApi, patients: Patient[]): HealthcareElementFilter {
    this._forPatients = [crypto, patients]
    return this
  }

  union(filters: HealthcareElementFilter[]): HealthcareElementFilter {
    this._union = filters
    return this
  }

  intersection(filters: HealthcareElementFilter[]): HealthcareElementFilter {
    this._intersection = filters
    return this
  }

  async build(): Promise<Filter<HealthcareElement>> {
    if (this._forDataOwner == null) {
      throw Error('Hcp must be set for patient filter.')
    }
    const dataOwnerId = this._forDataOwner!
    const filters = [
      this._byIds && ({ ids: this._byIds, $type: 'HealthcareElementByIdsFilter' } as HealthcareElementByIdsFilter),
      this._byIdentifiers &&
        ({
          healthcarePartyId: dataOwnerId,
          identifiers: this._byIdentifiers,
          $type: 'HealthcareElementByHealthcarePartyIdentifiersFilter',
        } as HealthcareElementByHealthcarePartyIdentifiersFilter),
      this._byLabelCodeFilter,
      this._forPatients &&
        ({
          healthcarePartyId: dataOwnerId,
          patientSecretForeignKeys: (
            await Promise.all(
              this._forPatients[1].map(async (p) =>
                (
                  await this._forPatients![0].extractKeysHierarchyFromDelegationLikes(
                    dataOwnerId,
                    p.id!,
                    Object.entries(p.systemMetaData!.delegations!)
                      .map(([k, v]) => [k, Array.from(v)] as [string, Delegation[]])
                      .reduce((m, [k, v]) => {
                        m[k] = v
                        return m
                      }, {} as { [key: string]: Delegation[] })
                  )
                ).map((x) => x.extractedKeys)
              )
            )
          ).reduce((t, v) => t.concat(v[0]), [] as string[]),
          $type: 'HealthcareElementByHealthcarePartyPatientFilter',
        } as HealthcareElementByHealthcarePartyPatientFilter),
    ].filter((x) => !!x) as Filter<HealthcareElement>[]

    if (!!this._union) {
      return {
        filters: await Promise.all(this._union.map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'UnionFilter',
      } as UnionFilter<HealthcareElement>
    } else if (filters.length > 1 || !!this._intersection) {
      return {
        filters: await Promise.all((this._intersection ?? []).map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'IntersectionFilter',
      } as IntersectionFilter<HealthcareElement>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { healthcarePartyId: dataOwnerId, $type: 'HealthcareElementByHealthcarePartyFilter' } as HealthcareElementByHealthcarePartyFilter
    }
  }
}

export class CodingFilter implements FilterBuilder<Coding> {
  _byIds?: string[]
  _byRegionTypeLabelLanguageFilter?: CodingByRegionTypeLabelFilter
  _union?: CodingFilter[]
  _intersection?: CodingFilter[]

  byIds(byIds: string[]): CodingFilter {
    this._byIds = byIds
    return this
  }

  byRegionLanguageTypeLabel(region?: string, language?: string, type?: string, label?: string): CodingFilter {
    this._byRegionTypeLabelLanguageFilter = { region, type, language, label, $type: 'CodingByRegionTypeLabelFilter' } as CodingByRegionTypeLabelFilter
    return this
  }

  union(filters: CodingFilter[]): CodingFilter {
    this._union = filters
    return this
  }

  intersection(filters: CodingFilter[]): CodingFilter {
    this._intersection = filters
    return this
  }

  async build(): Promise<Filter<Coding>> {
    const filters = [
      this._byIds && ({ ids: this._byIds, $type: 'CodingByIdsFilter' } as CodingByIdsFilter),
      this._byRegionTypeLabelLanguageFilter
    ].filter((x) => !!x) as Filter<Coding>[]

    if (!!this._union) {
      return {
        filters: await Promise.all(this._union.map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'UnionFilter',
      } as UnionFilter<Coding>
    } else if (filters.length > 1 || !!this._intersection) {
      return {
        filters: await Promise.all((this._intersection ?? []).map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'IntersectionFilter',
      } as IntersectionFilter<Coding>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { $type: 'AllCodingsFilter' } as AllCodingsFilter
    }
  }
}

export class NotificationFilter implements FilterBuilder<Notification> {
  _union?: NotificationFilter[]
  _intersection?: NotificationFilter[]
  _byIds?: string[]
  _fromDate?: number
  _dataOwnerId?: string
  _type?: NotificationTypeEnum

  byIds(ids: string[]): NotificationFilter {
    this._byIds = ids
    return this
  }

  forDataOwner(dataOwnerId: string): NotificationFilter {
    this._dataOwnerId = dataOwnerId
    return this
  }

  withType(type: NotificationTypeEnum): NotificationFilter {
    this._type = type
    return this
  }

  afterDate(fromDate: number): NotificationFilter {
    this._fromDate = fromDate
    return this
  }

  union(filters: NotificationFilter[]): NotificationFilter {
    this._union = filters
    return this
  }

  intersection(filters: NotificationFilter[]): NotificationFilter {
    this._intersection = filters
    return this
  }

  async build(): Promise<Filter<Notification>> {
    if (this._dataOwnerId == null) {
      throw Error('DataOwner must be set for NotificationFilter.')
    }

    const filters = [
      this._byIds && ({ ids: this._byIds, $type: 'NotificationsByIdFilter' } as NotificationsByIdFilter),
      this._type &&
        ({
          healthcarePartyId: this._dataOwnerId,
          type: this._type,
          $type: 'NotificationsByHcPartyAndTypeFilter',
        } as NotificationsByHcPartyAndTypeFilter),
      this._fromDate &&
        ({ healthcarePartyId: this._dataOwnerId, date: this._fromDate, $type: 'NotificationsAfterDateFilter' } as NotificationsAfterDateFilter)
    ].filter((x) => !!x) as Filter<Notification>[]

    if (!!this._union) {
      return {
        filters: await Promise.all(this._union.map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'UnionFilter',
      } as UnionFilter<Notification>
    } else if (filters.length > 1 || !!this._intersection) {
      return {
        filters: await Promise.all((this._intersection ?? []).map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'IntersectionFilter',
      } as IntersectionFilter<Notification>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { healthcarePartyId: this._dataOwnerId, date: 0, $type: 'NotificationsAfterDateFilter' } as NotificationsAfterDateFilter
    }
  }
}

export class DataSampleFilter implements FilterBuilder<DataSample> {
  _forDataOwner?: string
  getDataOwner() {
    return this._forDataOwner
  }

  _byIds?: string[]
  _byHealthcareElementIds?: string[]
  _byIdentifiers?: Identifier[]
  _byLabelCodeDateFilter?: DataSampleByHealthcarePartyTagCodeDateFilter
  _forPatients?: [IccCryptoXApi, Patient[]]
  _union?: DataSampleFilter[]
  _intersection?: DataSampleFilter[]

  forDataOwner(dataOwnerId: string): DataSampleFilter {
    this._forDataOwner = dataOwnerId
    return this
  }

  byIds(byIds: string[]): DataSampleFilter {
    this._byIds = byIds
    return this
  }

  byIdentifiers(identifiers: Identifier[]): DataSampleFilter {
    this._byIdentifiers = identifiers
    return this
  }

  byLabelCodeFilter(
    tagType?: string,
    tagCode?: string,
    codeType?: string,
    codeCode?: string,
    startValueDate?: number,
    endValueDate?: number
  ): DataSampleFilter {
    this._byLabelCodeDateFilter = {
      tagType,
      tagCode,
      codeType,
      codeCode,
      startValueDate,
      endValueDate,
      $type: 'DataSampleByHealthcarePartyTagCodeDateFilter',
    } as DataSampleByHealthcarePartyTagCodeDateFilter
    return this
  }

  forPatients(crypto: IccCryptoXApi, patients: Patient[]): DataSampleFilter {
    this._forPatients = [crypto, patients]
    return this
  }

  byHealthElementIds(byHealthElementIds: string[]): DataSampleFilter {
    this._byHealthcareElementIds = byHealthElementIds
    return this
  }

  union(filters: DataSampleFilter[]): DataSampleFilter {
    this._union = filters
    return this
  }

  intersection(filters: DataSampleFilter[]): DataSampleFilter {
    this._intersection = filters
    return this
  }

  async build(): Promise<Filter<DataSample>> {
    if (this._forDataOwner == null) {
      throw Error('Hcp must be set for patient filter.')
    }
    const doId = this._forDataOwner!
    this._byLabelCodeDateFilter && (this._byLabelCodeDateFilter.healthcarePartyId = doId)

    const filters = [
      this._byIds && ({ ids: this._byIds, $type: 'DataSampleByIdsFilter' } as DataSampleByIdsFilter),
      this._byHealthcareElementIds &&
        ({
          healthcarePartyId: doId,
          healthcareElementIds: this._byHealthcareElementIds,
          $type: 'DataSampleByHealthcarePartyHealthcareElementIdsFilter',
        } as DataSampleByHealthcarePartyHealthcareElementIdsFilter),
      this._byIdentifiers &&
        ({
          healthcarePartyId: doId,
          identifiers: this._byIdentifiers,
          $type: 'DataSampleByHealthcarePartyIdentifiersFilter',
        } as DataSampleByHealthcarePartyIdentifiersFilter),
      this._byLabelCodeDateFilter,

      this._forPatients &&
        ({
          healthcarePartyId: doId,
          patientSecretForeignKeys: (
            await Promise.all(
              this._forPatients[1].map(async (p) =>
                (
                  await this._forPatients![0].extractKeysHierarchyFromDelegationLikes(
                    doId,
                    p.id!,
                    Object.entries(p.systemMetaData!.delegations!)
                      .map(([hcpId, delegations]) => [hcpId, Array.from(delegations)] as [string, Delegation[]])
                      .reduce((delegationsToDecrypt, [hcpId, delegations]) => {
                        delegationsToDecrypt[hcpId] = delegations
                        return delegationsToDecrypt
                      }, {} as { [key: string]: Delegation[] })
                  )
                ).map((decryptedDelegations) => decryptedDelegations.extractedKeys)
              )
            )
          ).reduce((patientSecretForeignKeys, extractedKeys) => patientSecretForeignKeys.concat(extractedKeys[0]), [] as string[]),
          $type: 'DataSampleByHealthcarePartyPatientFilter',
        } as DataSampleByHealthcarePartyPatientFilter)
    ].filter((x) => !!x) as Filter<DataSample>[]

    if (!!this._union) {
      return {
        filters: await Promise.all(this._union.map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'UnionFilter',
      } as UnionFilter<DataSample>
    } else if (filters.length > 1 || !!this._intersection) {
      return {
        filters: await Promise.all((this._intersection ?? []).map((f) => f.build())).then( (fs) => fs.concat(filters)),
        $type: 'IntersectionFilter',
      } as IntersectionFilter<DataSample>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { hcpId: doId, $type: 'DataSampleByHealthcarePartyFilter' } as DataSampleByHealthcarePartyFilter
    }
  }
}

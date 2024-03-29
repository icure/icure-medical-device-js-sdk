import { Content } from '../../models/Content'
import { DataSample } from '../../models/DataSample'
import { Filter } from '../../filter/Filter'
import { PaginatedListDataSample } from '../../models/PaginatedListDataSample'
import { Document } from '../../models/Document'
import { DataSampleApi } from '../DataSampleApi'
import {
  Contact,
  Contact as ContactDto,
  ContactByServiceIdsFilter,
  Delegation,
  Document as DocumentDto,
  FilterChainContact,
  FilterChainService,
  IccAuthApi,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHelementXApi,
  IccPatientXApi,
  IccUserXApi,
  ListOfIds,
  PaginatedListContact,
  Patient as PatientDto,
  Service,
  Service as ServiceDto,
  ServiceLink,
  SubContact,
  ua2hex,
  User as UserDto,
} from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { any, distinctBy, firstOrNull, isNotEmpty, sumOf } from '../../utils/functionalUtils'
import { CachedMap } from '../../utils/cachedMap'
import { DataSampleMapper } from '../../mappers/serviceDataSample'
import { DocumentMapper } from '../../mappers/document'
import { FilterMapper } from '../../mappers/filter'
import { PaginatedListMapper } from '../../mappers/paginatedList'
import { UtiDetector } from '../../utils/utiDetector'
import { subscribeToEntityEvents } from '../../utils/websocket'
import { toMap, toMapArrayTransform } from '../../mappers/utils'
import { DelegationMapper } from '../../mappers/delegation'
import { Patient } from '../../models/Patient'
import { ErrorHandler } from '../../services/ErrorHandler'
import { Connection, ConnectionImpl } from '../../models/Connection'
import toDelegationDto = DelegationMapper.toDelegationDto
import { NoOpFilter } from '../../filter/dsl/filterDsl'
import { DataSampleFilter } from '../../filter/dsl/DataSampleFilterDsl'
import { PatientMapper } from '../../mappers/patient'

export class DataSampleApiImpl implements DataSampleApi {
  private readonly crypto: IccCryptoXApi
  private readonly authApi: IccAuthApi
  private readonly userApi: IccUserXApi
  private readonly patientApi: IccPatientXApi
  private readonly contactApi: IccContactXApi
  private readonly dataOwnerApi: IccDataOwnerXApi
  private readonly documentApi: IccDocumentXApi
  private readonly healthcareElementApi: IccHelementXApi

  private readonly errorHandler: ErrorHandler

  private readonly contactsCache: CachedMap<ContactDto> = new CachedMap<ContactDto>(5 * 60, 10000)
  private readonly basePath: string
  private readonly username: string | undefined
  private readonly password: string | undefined

  constructor(
    api: {
      cryptoApi: IccCryptoXApi
      userApi: IccUserXApi
      patientApi: IccPatientXApi
      contactApi: IccContactXApi
      dataOwnerApi: IccDataOwnerXApi
      documentApi: IccDocumentXApi
      healthcareElementApi: IccHelementXApi
      authApi: IccAuthApi
    },
    errorHandler: ErrorHandler,
    basePath: string,
    username: string | undefined,
    password: string | undefined
  ) {
    this.basePath = basePath
    this.username = username
    this.password = password
    this.errorHandler = errorHandler
    this.crypto = api.cryptoApi
    this.userApi = api.userApi
    this.patientApi = api.patientApi
    this.contactApi = api.contactApi
    this.dataOwnerApi = api.dataOwnerApi
    this.documentApi = api.documentApi
    this.healthcareElementApi = api.healthcareElementApi
    this.authApi = api.authApi
  }

  clearContactCache() {
    this.contactsCache.invalidateAll()
  }

  async createOrModifyDataSampleFor(patientId: string, dataSample: DataSample): Promise<DataSample> {
    const createdOrUpdatedDataSample = (await this.createOrModifyDataSamplesFor(patientId, [dataSample])).pop()
    if (createdOrUpdatedDataSample) {
      return createdOrUpdatedDataSample
    }

    throw this.errorHandler.createErrorWithMessage(`Could not create / modify data sample ${dataSample.id} for patient ${patientId}`)
  }

  async createOrModifyDataSamplesFor(patientId: string, dataSamples: Array<DataSample>): Promise<Array<DataSample>> {
    if (dataSamples.length == 0) {
      return Promise.resolve([])
    }

    if (distinctBy(dataSamples, (ds) => ds.batchId).size > 1) {
      throw this.errorHandler.createErrorWithMessage('Only data samples of a same batch (with the same batchId) can be processed together')
    }

    // Arbitrary : 1 service = 1K
    if (this._countHierarchyOfDataSamples(0, 0, dataSamples) > 1000) {
      throw this.errorHandler.createErrorWithMessage("Too many data samples to process. Can't process more than 1000 data samples in the same batch")
    }

    const currentUser = await this.userApi.getCurrentUser()
    const [contactCached, existingContact] = await this._getContactOfDataSample(currentUser, dataSamples[0])

    const contactPatientId = existingContact ? (await this.contactApi.decryptPatientIdOf(existingContact))[0] : undefined

    if (existingContact != null && contactPatientId == null) {
      throw this.errorHandler.createErrorWithMessage("Can't update a batch of data samples that is not linked to any patient yet.")
    }

    if (contactPatientId != null && contactPatientId != patientId) {
      throw this.errorHandler.createErrorWithMessage("Can't update the patient of a batch of data samples. Delete those samples and create new ones")
    }

    const existingPatient = await this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    let createdOrModifiedContact: ContactDto

    if (contactCached && existingContact != null) {
      const servicesToModify = dataSamples.map((e) => DataSampleMapper.toServiceDto(e, e.batchId)!)
      const subContacts = await this._createPotentialSubContactsForHealthElements(servicesToModify, currentUser)

      const contactToModify = {
        ...existingContact,
        services: servicesToModify.map((service) => {
          return {
            ...service,
            formIds: undefined,
            healthElementsIds: undefined,
          }
        }),
        subContacts: subContacts,
        openingDate: Math.min(
          ...servicesToModify.filter((element) => element.openingDate != null || element.valueDate != null).map((e) => e.openingDate ?? e.valueDate!)
        ),
        closingDate: Math.max(
          ...servicesToModify.filter((element) => element.closingDate != null || element.valueDate != null).map((e) => e.closingDate ?? e.valueDate!)
        ),
      }

      createdOrModifiedContact = await this.contactApi.modifyContactWithUser(currentUser, contactToModify).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    } else {
      const contactToCreate = await this.createContactDtoUsing(currentUser, existingPatient, dataSamples, existingContact)
      createdOrModifiedContact = await this.contactApi
        .createContactWithUser(currentUser, contactToCreate)
        .catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
        .then((x) => {
          if (!x) throw this.errorHandler.createErrorWithMessage(`Unexpected response for created contact: ${x}`)
          return x
        })
    }

    createdOrModifiedContact.services!.forEach((service) => this.contactsCache.put(service.id!, createdOrModifiedContact))
    return Promise.resolve(
      createdOrModifiedContact.services!.map(
        (service) =>
          DataSampleMapper.toDataSample(
            this.enrichWithContactMetadata(service, createdOrModifiedContact),
            createdOrModifiedContact.id,
            createdOrModifiedContact.subContacts?.filter((subContact) => subContact.services?.find((s) => s.serviceId == service.id))
          )!
      )
    )
  }

  _countHierarchyOfDataSamples(currentCount: number, dataSampleIndex: number, dataSamples: Array<DataSample>): number {
    if (dataSampleIndex >= dataSamples.length) {
      return currentCount
    }

    let currentDS = dataSamples[dataSampleIndex]
    let dsToSum = Object.values(currentDS.content).filter((element) => isNotEmpty(element?.compoundValue))
    let dataSampleCount = sumOf(dsToSum, (input) => this._countHierarchyOfDataSamples(0, 0, input.compoundValue!))

    return this._countHierarchyOfDataSamples(currentCount + dataSampleCount, dataSampleIndex + 1, dataSamples)
  }

  async getDataSamplesForPatient(patient: Patient): Promise<Array<DataSample>> {
    const user = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    if (!user) {
      throw this.errorHandler.createErrorWithMessage(
        'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
      )
    }
    const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(user)
    if (!dataOwnerId) {
      throw this.errorHandler.createErrorWithMessage(
        'The current user is not a data owner. You must be either a patient, a device or a healthcare professional to call this method.'
      )
    }
    const patientDto = PatientMapper.toPatientDto(patient)!
    const filter = {
      healthcarePartyId: dataOwnerId,
      patientSecretForeignKeys: await this.crypto.entities.secretIdsOf(patientDto, undefined),
      $type: 'DataSampleByHealthcarePartyPatientFilter',
    }
    return await this.concatenateFilterResults(filter)
  }

  async createContactDtoUsing(
    currentUser: UserDto,
    contactPatient: PatientDto,
    dataSamples: Array<DataSample>,
    existingContact?: ContactDto
  ): Promise<ContactDto> {
    const servicesToCreate = dataSamples
      .map((e) => DataSampleMapper.toServiceDto(e, e.batchId))
      .map((e) => {
        return { ...e, modified: undefined }
      })

    let baseContact: ContactDto

    const subContacts = await this._createPotentialSubContactsForHealthElements(servicesToCreate, currentUser)

    if (existingContact != null) {
      baseContact = {
        ...existingContact,
        id: this.crypto.primitives.randomUuid(),
        rev: undefined,
        modified: Date.now(),
      }
    } else {
      baseContact = await this.contactApi
        .newInstance(currentUser, contactPatient, new ContactDto({ id: this.crypto.primitives.randomUuid() }))
        .catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })
    }

    return {
      ...baseContact,
      subContacts: subContacts,
      services: servicesToCreate.map((service) => {
        return { ...service, formIds: undefined, healthElementsIds: undefined }
      }),
      openingDate: Math.min(
        ...servicesToCreate.filter((element) => element.openingDate != null || element.valueDate != null).map((e) => e.openingDate ?? e.valueDate!)
      ),
      closingDate: Math.max(
        ...servicesToCreate.filter((element) => element.closingDate != null || element.valueDate != null).map((e) => e.closingDate ?? e.valueDate!)
      ),
    }
  }

  async deleteDataSample(dataSampleId: string): Promise<string> {
    const deletedDataSampleId = (await this.deleteDataSamples([dataSampleId])).pop()
    if (deletedDataSampleId) {
      return deletedDataSampleId
    }

    throw this.errorHandler.createErrorWithMessage(`Could not delete data sample ${dataSampleId}`)
  }

  async deleteDataSamples(requestBody: Array<string>): Promise<Array<string>> {
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    const existingContact = firstOrNull(await this._findContactsForDataSampleIds(currentUser, requestBody))
    if (existingContact == undefined) {
      throw this.errorHandler.createErrorWithMessage(`Could not find batch information of the data sample ${requestBody}`)
    }

    const existingServiceIds = existingContact.services?.map((e) => e.id)
    if (existingServiceIds == undefined || any(requestBody, (element) => element! in existingServiceIds!)) {
      throw this.errorHandler.createErrorWithMessage(`Could not find all data samples in same batch ${existingContact.id}`)
    }

    const contactPatient = await this._getPatientOfContact(currentUser, existingContact)
    if (contactPatient == undefined) {
      throw this.errorHandler.createErrorWithMessage(`Couldn't find patient related to batch of data samples ${existingContact.id}`)
    }

    const servicesToDelete = existingContact.services!.filter((element) => requestBody.includes(element.id!))

    const deletedServices = (await this.deleteServices(currentUser, contactPatient, servicesToDelete))?.services
      ?.filter((element) => requestBody.includes(element.id!))
      ?.filter((element) => element.endOfLife != null)
      ?.map((e) => e.id!)

    if (deletedServices == undefined) {
      throw this.errorHandler.createErrorWithMessage(`Could not delete data samples ${requestBody}`)
    }

    return Promise.resolve(deletedServices)
  }

  async deleteServices(user: UserDto, patient: PatientDto, services: Array<ServiceDto>): Promise<ContactDto | undefined> {
    const currentTime = Date.now()
    const contactToDeleteServices = await this.contactApi
      .newInstance(
        user,
        patient,
        new ContactDto({
          id: this.crypto.primitives.randomUuid(),
          services: services.map(
            (service) =>
              new ServiceDto({
                id: service.id,
                created: service.created,
                modified: currentTime,
                endOfLife: currentTime,
              })
          ),
        })
      )
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })

    return this.contactApi.createContactWithUser(user, contactToDeleteServices).then((x) => {
      if (!x) throw this.errorHandler.createErrorWithMessage(`Unexpected response for created contact: ${x}`)
      return x
    })
  }

  async filterDataSample(filter: Filter<DataSample>, nextDataSampleId?: string, limit?: number): Promise<PaginatedListDataSample> {
    if (NoOpFilter.isNoOp(filter)) {
      return new PaginatedListDataSample({ pageSize: 0, totalSize: 0, rows: [] })
    }
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    const hcpId = (currentUser.healthcarePartyId || currentUser.patientId || currentUser.deviceId)!

    const paginatedListService = await this.contactApi
      .filterServicesBy(
        nextDataSampleId,
        limit,
        new FilterChainService({
          filter: FilterMapper.toAbstractFilterDto(filter, 'DataSample'),
        })
      )
      .then((paginatedServices) =>
        this.contactApi
          .decryptServices(hcpId, paginatedServices.rows!)
          .then((decryptedRows) => Object.assign(paginatedServices, { rows: decryptedRows }))
      )
      .catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    return PaginatedListMapper.toPaginatedListDataSample(paginatedListService)!
  }

  async getDataSample(dataSampleId: string): Promise<DataSample> {
    return Promise.resolve(DataSampleMapper.toDataSample(await this._getServiceFromICure(dataSampleId))!)
  }

  matchDataSample(filter: Filter<DataSample>): Promise<Array<string>> {
    if (NoOpFilter.isNoOp(filter)) {
      return Promise.resolve([])
    } else {
      return this.contactApi.matchServicesBy(FilterMapper.toAbstractFilterDto(filter, 'DataSample')).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    }
  }

  async giveAccessTo(dataSample: DataSample, delegatedTo: string): Promise<DataSample> {
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(currentUser)
    const contactOfDataSample = (await this._getContactOfDataSample(currentUser, dataSample))[1]

    if (contactOfDataSample == undefined)
      throw this.errorHandler.createErrorWithMessage(
        `Could not find the batch of the data sample ${dataSample.id}. User ${currentUser.id} may not have access to it.`
      )

    const updatedContact = await this.contactApi.shareWith(delegatedTo, contactOfDataSample)

    if (updatedContact == undefined || updatedContact.services == undefined) {
      throw this.errorHandler.createErrorWithMessage(`Impossible to give access to ${delegatedTo} to data sample ${dataSample.id} information`)
    }

    const updatedService = updatedContact.services.find((service) => service.id == dataSample.id)!
    const documentIds = Object.entries(updatedService.content ?? {}).flatMap(([_, value]) => (value.documentId ? [value.documentId!] : []))
    if (documentIds.length) {
      const documents = Object.fromEntries((await this.documentApi.getDocuments({ ids: documentIds })).map((x) => [x.id!, x]))
      for (const docId of documentIds) {
        try {
          await this.documentApi.shareWith(delegatedTo, documents[docId])
        } catch (e) {
          console.error(`Failed to give access to attachment with document id ${docId}`, e)
        }
      }
    }

    return DataSampleMapper.toDataSample(
      this.enrichWithContactMetadata(updatedService, updatedContact),
      updatedContact.id,
      updatedContact.subContacts?.filter((subContact) => subContact.services?.find((s) => s.serviceId == dataSample.id) != undefined)
    )!
  }

  async concatenateFilterResults(
    filter: Filter<DataSample>,
    nextId?: string | undefined,
    limit?: number | undefined,
    accumulator: Array<DataSample> = []
  ): Promise<Array<DataSample>> {
    const paginatedDataSamples = await this.filterDataSample(filter, nextId, limit)
    return !paginatedDataSamples.nextKeyPair?.startKeyDocId
      ? accumulator.concat(paginatedDataSamples.rows)
      : this.concatenateFilterResults(filter, paginatedDataSamples.nextKeyPair.startKeyDocId, limit, accumulator.concat(paginatedDataSamples.rows))
  }

  async subscribeToDataSampleEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<DataSample> | undefined,
    eventFired: (dataSample: DataSample) => Promise<void>,
    options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number } = {}
  ): Promise<Connection> {
    const currentUser = await this.userApi.getCurrentUser()
    return subscribeToEntityEvents(
      this.basePath,
      this.authApi,
      'DataSample',
      eventTypes,
      filter,
      eventFired,
      options,
      async (encrypted) => (await this.contactApi.decryptServices(currentUser.healthcarePartyId!, [encrypted]))[0]
    ).then((ws) => new ConnectionImpl(ws))
  }

  async extractPatientId(dataSample: DataSample): Promise<string | undefined> {
    return (await this.crypto.entities.owningEntityIdsOf(DataSampleMapper.toServiceDto(dataSample)!, undefined))[0]
  }

  private async _getContactOfDataSample(currentUser: UserDto, dataSample: DataSample): Promise<[boolean, ContactDto?]> {
    let cachedContact = dataSample.id ? this.contactsCache.getIfPresent(dataSample.id) : undefined
    if (cachedContact) {
      return [true, cachedContact]
    } else {
      let contact: ContactDto | undefined = dataSample.batchId ? await this.contactApi.getContactWithUser(currentUser, dataSample.batchId) : undefined
      return [false, contact]
    }
  }

  private async _findContactsForDataSampleIds(currentUser: UserDto, dataSampleIds: Array<string>): Promise<Array<ContactDto>> {
    const cachedContacts = this.contactsCache.getAllPresent(dataSampleIds)
    const dataSampleIdsToSearch = dataSampleIds.filter((element) => Object.keys(cachedContacts).find((key) => key == element) == undefined)

    if (dataSampleIdsToSearch.length > 0) {
      const notCachedContacts = (
        (await this.contactApi
          .filterByWithUser(
            currentUser,
            undefined,
            dataSampleIdsToSearch.length,
            new FilterChainContact({
              filter: new ContactByServiceIdsFilter({ ids: dataSampleIdsToSearch }),
            })
          )
          .catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
          })) as PaginatedListContact
      ).rows

      if (notCachedContacts == undefined) {
        throw this.errorHandler.createErrorWithMessage(`Couldn't find batches linked to data samples ${dataSampleIdsToSearch}`)
      }

      // Caching
      notCachedContacts.forEach((contact) => {
        contact.services
          ?.filter((service) => service.id != undefined && dataSampleIdsToSearch.includes(service.id))
          .forEach((service) => this.contactsCache.put(service.id!, contact))
      })

      return [...Object.values(cachedContacts), ...notCachedContacts]
    } else {
      return Object.values(cachedContacts)
    }
  }

  private async _getPatientOfContact(currentUser: UserDto, contactDto: ContactDto): Promise<PatientDto | undefined> {
    const patientId = (await this.contactApi.decryptPatientIdOf(contactDto))[0]
    if (patientId) {
      return this.patientApi.getPatientWithUser(currentUser, patientId)
    } else {
      return undefined
    }
  }

  private async _getServiceFromICure(dataSampleId: string): Promise<ServiceDto> {
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    return this.contactApi.getServiceWithUser(currentUser, dataSampleId)
  }

  private _createPotentialSubContactsForHealthElements(services: Array<ServiceDto>, currentUser: UserDto): Promise<SubContact[]> {
    return Promise.all(services.filter((service) => service.healthElementsIds != undefined && service.healthElementsIds.length > 0)).then(
      (servicesWithHe) => {
        return servicesWithHe.length > 0
          ? this._checkAndRetrieveProvidedHealthElements(
              servicesWithHe.flatMap((service) => Array.from(service.healthElementsIds!.values())),
              currentUser
            ).then((heIds) => {
              return heIds
                .map((heId) => {
                  return {
                    healthElement: heId,
                    services: servicesWithHe
                      .filter((s) => s.healthElementsIds!.find((servHeId) => servHeId == heId))
                      .map((s) => new ServiceLink({ serviceId: s.id! })),
                  }
                })
                .map(
                  ({ healthElement, services }) =>
                    new SubContact({
                      healthElementId: healthElement,
                      services: services,
                    })
                )
            })
          : []
      }
    )
  }

  private async _checkAndRetrieveProvidedHealthElements(healthElementIds: Array<string>, currentUser: UserDto): Promise<Array<string>> {
    if (healthElementIds.length == 0) {
      return []
    }

    const distinctIds = Array.from(new Set(healthElementIds).values())
    return await this.healthcareElementApi.getHealthElementsWithUser(currentUser, new ListOfIds({ ids: distinctIds })).then((healthElements) => {
      const foundIds = (healthElements ?? []).map((he) => he.id!)
      if (healthElements.length < distinctIds.length) {
        const missingIds = Array.from(distinctIds.values()).filter((id) => foundIds.find((fId) => fId == id) == undefined)

        throw this.errorHandler.createErrorWithMessage(
          `Health elements ${missingIds.join(',')} do not exist or user ${currentUser.id} may not access them`
        )
      }

      return foundIds
    })
  }

  private enrichWithContactMetadata(service: Service, contact: Contact) {
    return {
      ...service,
      secretForeignKeys: contact.secretForeignKeys,
      cryptedForeignKeys: contact.cryptedForeignKeys,
      delegations: contact.delegations,
      encryptionKeys: contact.encryptionKeys,
    }
  }

  async setDataSampleAttachment(
    dataSampleId: string,
    body: ArrayBuffer,
    documentName?: string,
    documentVersion?: string,
    documentExternalUuid?: string,
    documentLanguage?: string
  ): Promise<Document> {
    try {
      const currentUser = await this.userApi.getCurrentUser().catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
      const existingDataSample = await this.getDataSample(dataSampleId)

      const [, batchOfDataSample] = await this._getContactOfDataSample(currentUser, existingDataSample)
      if (batchOfDataSample == undefined) {
        throw this.errorHandler.createErrorWithMessage(`Could not find the batch of the data sample ${dataSampleId}`)
      }

      const patientIdOfBatch = (await this.contactApi.decryptPatientIdOf(batchOfDataSample))[0]
      if (patientIdOfBatch == undefined) {
        throw this.errorHandler.createErrorWithMessage(`Can not set an attachment to a data sample not linked to a patient`)
      }

      const dataOwnersWithAccessInfo = await this.contactApi.getDataOwnersWithAccessTo(batchOfDataSample)
      if (dataOwnersWithAccessInfo.hasUnknownAnonymousDataOwners) {
        console.warn(
          `Could not determine all data owners with access to sample with id ${dataSampleId}. Some users may be able to access the data sample but not the attachment.`
        )
      }

      const documentToCreate = await this.documentApi.newInstance(
        currentUser,
        undefined,
        new DocumentDto({
          id: this.crypto.primitives.randomUuid(),
          name: documentName,
          version: documentVersion,
          externalUuid: documentExternalUuid,
          hash: ua2hex(await this.crypto.primitives.sha256(body)),
          size: body.byteLength,
          mainUti: UtiDetector.getUtiFor(documentName),
        }),
        {
          additionalDelegates: dataOwnersWithAccessInfo.permissionsByDataOwnerId,
        }
      )

      const createdDocument = await this.documentApi.createDocument(documentToCreate).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })

      // Update data sample with documentId
      const contentIso = documentLanguage ?? 'en'
      const newDSContent = {
        ...existingDataSample.content,
        [contentIso]: new Content({
          ...(existingDataSample.content[contentIso] ?? {}),
          documentId: createdDocument.id,
        }),
      }
      await this.createOrModifyDataSampleFor(
        patientIdOfBatch!,
        new DataSample({
          ...existingDataSample,
          content: newDSContent,
        })
      )
      // Do not delete existing `Document` entity, even if existing: services are versioned

      // Add attachment to document
      const docWithAttachment = await this.documentApi.encryptAndSetDocumentAttachment(createdDocument, body)

      return DocumentMapper.toDocument(docWithAttachment)
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e)
      }
      throw e
    }
  }
  async deleteAttachment(dataSampleId: string, documentId: string): Promise<string> {
    const currentUser = await this.userApi.getCurrentUser().catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    const existingContact = (await this._findContactsForDataSampleIds(currentUser, [dataSampleId]))[0]
    if (existingContact == undefined) {
      throw this.errorHandler.createErrorWithMessage(`Could not find batch information of the data sample ${dataSampleId}`)
    }

    const existingService = existingContact!.services!.find((s) => s.id == dataSampleId)
    if (existingService == undefined || existingService.content == undefined) {
      throw this.errorHandler.createErrorWithMessage(`Could not find batch information of the data sample ${dataSampleId}`)
    }

    const contactPatientId = (await this.contactApi.decryptPatientIdOf(existingContact!))[0]
    if (contactPatientId == undefined) {
      throw this.errorHandler.createErrorWithMessage(`Cannot set an attachment to a data sample not linked to a patient`)
    }

    const contentToDelete = Object.entries(existingService.content!).find(([_, content]) => content.documentId == documentId)?.[0]

    if (contentToDelete == undefined) {
      throw this.errorHandler.createErrorWithMessage(`Could not find attachment ${documentId} in the data sample ${dataSampleId}`)
    }

    const updatedContent = toMap(Object.entries(existingService.content!).filter(([key, _]) => key != contentToDelete!))

    await this.createOrModifyDataSampleFor(
      contactPatientId,
      DataSampleMapper.toDataSample({
        ...existingService,
        content: updatedContent,
      })!
    ).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    // Do not actually delete existing `Document` entity: services are versioned

    return documentId
  }

  async getDataSampleAttachmentContent(dataSampleId: string, documentId: string): Promise<ArrayBuffer> {
    const documentOfAttachment = await this._getDataSampleAttachmentDocumentFromICure(dataSampleId, documentId)

    return this.documentApi.getAndDecryptDocumentAttachment(documentOfAttachment)
  }

  async getDataSampleAttachmentDocument(dataSampleId: string, documentId: string): Promise<Document> {
    return DocumentMapper.toDocument(await this._getDataSampleAttachmentDocumentFromICure(dataSampleId, documentId))
  }

  private async _getDataSampleAttachmentDocumentFromICure(dataSampleId: string, documentId: string): Promise<DocumentDto> {
    const existingDataSample = await this.getDataSample(dataSampleId)
    if (Object.entries(existingDataSample!.content).find(([, content]) => content.documentId == documentId) == null) {
      throw this.errorHandler.createErrorWithMessage(`Id ${documentId} does not reference any document in the data sample ${dataSampleId}`)
    }

    return this.documentApi.getDocument(documentId)
  }
}

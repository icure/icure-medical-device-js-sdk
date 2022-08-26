import {Content} from "../../models/Content";
import {DataSample} from "../../models/DataSample";
import {Filter} from "../../filter/Filter";
import {PaginatedListDataSample} from "../../models/PaginatedListDataSample";
import {Document} from "../../models/Document";
import {DataSampleApi} from "../DataSampleApi";
import {
  Contact as ContactDto,
  Document as DocumentDto,
  FilterChainService,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHelementXApi,
  IccPatientXApi,
  IccUserXApi,
  ListOfIds,
  PaginatedListContact,
  Patient as PatientDto,
  Service as ServiceDto,
  ServiceLink,
  SubContact,
  User as UserDto,
} from "@icure/api";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {any, distinctBy, firstOrNull, isNotEmpty, sumOf,} from "../../utils/functionalUtils";
import {CachedMap} from "../../utils/cachedMap";
import {DataSampleMapper} from "../../mappers/serviceDataSample";
import {DocumentMapper} from "../../mappers/document";
import {FilterMapper} from "../../mappers/filter";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {UtiDetector} from "../../utils/utiDetector";
import {Connection, ConnectionImpl} from "../../models/Connection";
import {subscribeToEntityEvents} from "../../utils/rsocket";
import {toMap, toMapArrayTransform} from "../../mappers/utils";
import {DelegationMapper} from "../../mappers/delegation";
import toDelegationDto = DelegationMapper.toDelegationDto;
import {DataSampleFilter} from "../../filter";
import {Patient} from "../../models/Patient";

export class DataSampleApiImpl implements DataSampleApi {
  private readonly crypto: IccCryptoXApi;
  private readonly userApi: IccUserXApi;
  private readonly patientApi: IccPatientXApi;
  private readonly contactApi: IccContactXApi;
  private readonly dataOwnerApi: IccDataOwnerXApi;
  private readonly documentApi: IccDocumentXApi;
  private readonly healthcareElementApi: IccHelementXApi;

  private readonly contactsCache: CachedMap<ContactDto> =
    new CachedMap<ContactDto>(5 * 60, 10000);
  private readonly basePath: string;
  private readonly username: string | undefined;
  private readonly password: string | undefined;

  constructor(
    api: {
      cryptoApi: IccCryptoXApi;
      userApi: IccUserXApi;
      patientApi: IccPatientXApi;
      contactApi: IccContactXApi;
      dataOwnerApi: IccDataOwnerXApi;
      documentApi: IccDocumentXApi;
      healthcareElementApi: IccHelementXApi;
    },
    basePath: string,
    username: string | undefined,
    password: string | undefined
  ) {
    this.basePath = basePath;
    this.username = username;
    this.password = password;
    this.crypto = api.cryptoApi;
    this.userApi = api.userApi;
    this.patientApi = api.patientApi;
    this.contactApi = api.contactApi;
    this.dataOwnerApi = api.dataOwnerApi;
    this.documentApi = api.documentApi;
    this.healthcareElementApi = api.healthcareElementApi;
  }

  async createOrModifyDataSampleFor(
    patientId: string,
    dataSample: DataSample
  ): Promise<DataSample> {
    let createdOrUpdatedDataSample = (
      await this.createOrModifyDataSamplesFor(patientId, [dataSample])
    ).pop();
    if (createdOrUpdatedDataSample) {
      return createdOrUpdatedDataSample;
    }

    throw Error(
      `Could not create / modify data sample ${dataSample.id} for patient ${patientId}`
    );
  }

  async createOrModifyDataSamplesFor(
    patientId: string,
    dataSamples: Array<DataSample>
  ): Promise<Array<DataSample>> {
    if (dataSamples.length == 0) {
      return Promise.resolve([]);
    }

    if (distinctBy(dataSamples, (ds) => ds.batchId).size > 1) {
      throw Error(
        "Only data samples of a same batch can be processed together"
      );
    }

    // Arbitrary : 1 service = 1K
    if (this.countHierarchyOfDataSamples(0, 0, dataSamples) > 1000) {
      throw Error(
        "Can't process more than 1000 data samples in the same batch"
      );
    }

    let currentUser = await this.userApi.getCurrentUser();
    let [contactCached, existingContact] = await this._getContactOfDataSample(
      currentUser,
      dataSamples[0]
    );

    let contactPatientId = existingContact
      ? await this._getPatientIdOfContact(currentUser, existingContact)
      : undefined;

    if (existingContact != null && contactPatientId == null) {
      throw Error(
        "Can't update a batch of data samples that is not linked to any patient yet."
      );
    }

    if (contactPatientId != null && contactPatientId != patientId) {
      throw Error(
        "Can't update the patient of a batch of data samples. Delete those samples and create new ones"
      );
    }

    let existingPatient = await this.patientApi.getPatientWithUser(
      currentUser,
      patientId
    );
    let createdOrModifiedContact: ContactDto;

    if (contactCached && existingContact != null) {
      let servicesToModify = dataSamples.map(
        (e) => DataSampleMapper.toServiceDto(e, e.batchId)!
      );
      let subContacts = await this._createPotentialSubContactsForHealthElements(
        servicesToModify,
        currentUser
      );

      let contactToModify = {
        ...existingContact,
        services: servicesToModify.map((service) => {
          return {
            ...service,
            formIds: undefined,
            healthElementsIds: undefined,
          };
        }),
        subContacts: subContacts,
        openingDate: Math.min(
          ...servicesToModify
            .filter(
              (element) =>
                element.openingDate != null || element.valueDate != null
            )
            .map((e) => e.openingDate ?? e.valueDate!)
        ),
        closingDate: Math.max(
          ...servicesToModify
            .filter(
              (element) =>
                element.closingDate != null || element.valueDate != null
            )
            .map((e) => e.closingDate ?? e.valueDate!)
        ),
      };

      createdOrModifiedContact = await this.contactApi.modifyContactWithUser(
        currentUser,
        contactToModify
      );
    } else {
      let contactToCreate = await this.createContactDtoUsing(
        currentUser,
        existingPatient,
        dataSamples,
        existingContact
      );
      createdOrModifiedContact = await this.contactApi.createContactWithUser(
        currentUser,
        contactToCreate
      );
    }

    createdOrModifiedContact.services!.forEach((service) =>
      this.contactsCache.put(service.id!, createdOrModifiedContact)
    );
    return Promise.resolve(
      createdOrModifiedContact.services!.map(
        (service) =>
          DataSampleMapper.toDataSample(
            service,
            createdOrModifiedContact.id,
            createdOrModifiedContact.subContacts?.filter((subContact) =>
              subContact.services?.find((s) => s.serviceId == service.id)
            )
          )!
      )
    );
  }

  countHierarchyOfDataSamples(
    currentCount: number,
    dataSampleIndex: number,
    dataSamples: Array<DataSample>
  ): number {
    if (dataSampleIndex >= dataSamples.length) {
      return currentCount;
    }

    let currentDS = dataSamples[dataSampleIndex];
    let dsToSum = Object.values(currentDS.content).filter((element) =>
      isNotEmpty(element?.compoundValue)
    );
    let dataSampleCount = sumOf(dsToSum, (input) =>
      this.countHierarchyOfDataSamples(0, 0, input.compoundValue!)
    );

    return this.countHierarchyOfDataSamples(
      currentCount + dataSampleCount,
      dataSampleIndex + 1,
      dataSamples
    );
  }

  async _getContactOfDataSample(
    currentUser: UserDto,
    dataSample: DataSample
  ): Promise<[boolean, ContactDto?]> {
    let cachedContact = dataSample.id
      ? this.contactsCache.getIfPresent(dataSample.id)
      : undefined;
    if (cachedContact) {
      return [true, cachedContact];
    } else {
      let contact: ContactDto = dataSample.batchId
        ? await this.contactApi.getContactWithUser(
            currentUser,
            dataSample.batchId
          )
        : undefined;
      return [false, contact];
    }
  }

  async _getPatientIdOfContact(
    currentUser: UserDto,
    contactDto: ContactDto
  ): Promise<string | undefined> {
    let keysFromDeleg =
      await this.crypto.extractKeysHierarchyFromDelegationLikes(
        this.dataOwnerApi.getDataOwnerOf(currentUser),
        contactDto.id!,
        contactDto.cryptedForeignKeys!
      );
    return keysFromDeleg
      .map((key) =>
        key.extractedKeys.length > 0 ? key.extractedKeys[0] : undefined
      )
      .find((key) => key != undefined);
  }

  async createContactDtoUsing(
    currentUser: UserDto,
    contactPatient: PatientDto,
    dataSamples: Array<DataSample>,
    existingContact?: ContactDto
  ): Promise<ContactDto> {
    let servicesToCreate = dataSamples
      .map((e) => DataSampleMapper.toServiceDto(e, e.batchId))
      .map((e) => {
        return { ...e, modified: undefined };
      });

    let baseContact: ContactDto;

    const subContacts = await this._createPotentialSubContactsForHealthElements(
      servicesToCreate,
      currentUser
    );

    if (existingContact != null) {
      baseContact = {
        ...existingContact,
        id: this.crypto.randomUuid(),
        rev: undefined,
        modified: Date.now(),
      };
    } else {
      baseContact = await this.contactApi.newInstance(
        currentUser,
        contactPatient,
        new ContactDto({ id: this.crypto.randomUuid() }),
        true
      );
    }

    return {
      ...baseContact,
      subContacts: subContacts,
      services: servicesToCreate.map((service) => {
        return { ...service, formIds: undefined, healthElementsIds: undefined };
      }),
      openingDate: Math.min(
        ...servicesToCreate
          .filter(
            (element) =>
              element.openingDate != null || element.valueDate != null
          )
          .map((e) => e.openingDate ?? e.valueDate!)
      ),
      closingDate: Math.max(
        ...servicesToCreate
          .filter(
            (element) =>
              element.closingDate != null || element.valueDate != null
          )
          .map((e) => e.closingDate ?? e.valueDate!)
      ),
    };
  }

  private _createPotentialSubContactsForHealthElements(
    services: Array<ServiceDto>,
    currentUser: UserDto
  ): Promise<SubContact[]> {
    return Promise.all(
      services.filter(
        (service) =>
          service.healthElementsIds != undefined &&
          service.healthElementsIds.length > 0
      )
    ).then((servicesWithHe) => {
      return servicesWithHe.length > 0
        ? this._checkAndRetrieveProvidedHealthElements(
            servicesWithHe.flatMap((service) =>
              Array.from(service.healthElementsIds!.values())
            ),
            currentUser
          ).then((heIds) => {
            return heIds
              .map((heId) => {
                return {
                  healthElement: heId,
                  services: servicesWithHe
                    .filter((s) =>
                      s.healthElementsIds!.find((servHeId) => servHeId == heId)
                    )
                    .map((s) => new ServiceLink({ serviceId: s.id! })),
                };
              })
              .map(
                ({ healthElement, services }) =>
                  new SubContact({
                    healthElementId: healthElement,
                    services: services,
                  })
              );
          })
        : [];
    });
  }

  private async _checkAndRetrieveProvidedHealthElements(
    healthElementIds: Array<string>,
    currentUser: UserDto
  ): Promise<Array<string>> {
    if (healthElementIds.length == 0) {
      return [];
    }

    const distinctIds = Array.from(new Set(healthElementIds).values());
    return await this.healthcareElementApi
      .getHealthElementsWithUser(
        currentUser,
        new ListOfIds({ ids: distinctIds })
      )
      .then((healthElements) => {
        const foundIds = (healthElements ?? []).map((he) => he.id!);
        if (healthElements.length < distinctIds.length) {
          const missingIds = Array.from(distinctIds.values()).filter(
            (id) => foundIds.find((fId) => fId == id) == undefined
          );

          throw Error(
            `Health elements ${missingIds.join(",")} do not exist or user ${
              currentUser.id
            } may not access them`
          );
        }

        return foundIds;
      });
  }

  async deleteAttachment(
    dataSampleId: string,
    documentId: string
  ): Promise<string> {
    const currentUser = await this.userApi.getCurrentUser();

    const existingContact = (
      await this.findContactsForDataSampleIds(currentUser, [dataSampleId])
    )[0];
    if (existingContact == undefined) {
      throw Error(
        `Could not find batch information of the data sample ${dataSampleId}`
      );
    }

    const existingService = existingContact!.services!.find(
      (s) => s.id == dataSampleId
    );
    if (existingService == undefined || existingService.content == undefined) {
      throw Error(`Could not find data sample ${dataSampleId} or its data`);
    }

    const contactPatientId = await this._getPatientIdOfContact(
      currentUser,
      existingContact!
    );
    if (contactPatientId == undefined) {
      throw Error(
        `Can not set an attachment to a data sample not linked to a patient`
      );
    }

    const contentToDelete = Object.entries(existingService.content!).find(
      ([_, content]) => content.documentId == documentId
    )?.[0];

    if (contentToDelete == undefined) {
      throw Error(
        `Id ${documentId} does not reference any document in the data sample ${dataSampleId}`
      );
    }

    const updatedContent = toMap(
      Object.entries(existingService.content!).filter(
        ([key, _]) => key != contentToDelete!
      )
    );

    await this.createOrModifyDataSampleFor(
      contactPatientId,
      DataSampleMapper.toDataSample({
        ...existingService,
        content: updatedContent,
      })!
    );

    return documentId;
  }

  async deleteDataSample(dataSampleId: string): Promise<string> {
    let deletedDataSampleId = (
      await this.deleteDataSamples([dataSampleId])
    ).pop();
    if (deletedDataSampleId) {
      return deletedDataSampleId;
    }

    throw Error(`Could not delete data sample ${dataSampleId}`);
  }

  async deleteDataSamples(requestBody: Array<string>): Promise<Array<string>> {
    let currentUser = await this.userApi.getCurrentUser();
    let existingContact = firstOrNull(
      await this.findContactsForDataSampleIds(currentUser, requestBody)
    );
    if (existingContact == undefined) {
      throw Error(
        `Could not find batch information of the data sample ${requestBody}`
      );
    }

    let existingServiceIds = existingContact.services?.map((e) => e.id);
    if (
      existingServiceIds == undefined ||
      any(requestBody, (element) => element! in existingServiceIds!)
    ) {
      throw Error(
        `Could not find all data samples in same batch ${existingContact.id}`
      );
    }

    let contactPatient = await this._getPatientOfContact(
      currentUser,
      existingContact
    );
    if (contactPatient == undefined) {
      throw Error(
        `Couldn't find patient related to batch of data samples ${existingContact.id}`
      );
    }

    let servicesToDelete = existingContact.services!.filter((element) =>
      requestBody.includes(element.id!)
    );

    let deletedServices = (
      await this.deleteServices(currentUser, contactPatient, servicesToDelete)
    )?.services
      ?.filter((element) => requestBody.includes(element.id!))
      ?.filter((element) => element.endOfLife != null)
      ?.map((e) => e.id!);

    if (deletedServices == undefined) {
      throw Error(`Could not delete data samples ${requestBody}`);
    }

    return Promise.resolve(deletedServices);
  }

  async findContactsForDataSampleIds(
    currentUser: UserDto,
    dataSampleIds: Array<string>
  ): Promise<Array<ContactDto>> {
    let cachedContacts = this.contactsCache.getAllPresent(dataSampleIds);
    let dataSampleIdsToSearch = dataSampleIds.filter(
      (element) =>
        Object.keys(cachedContacts).find((key) => key == element) == undefined
    );

    if (dataSampleIdsToSearch.length > 0) {
      let notCachedContacts = (
        (await this.contactApi.filterByWithUser(
          currentUser,
          undefined,
          dataSampleIdsToSearch.length,
          undefined
        )) as PaginatedListContact
      ).rows;

      if (notCachedContacts == undefined) {
        throw Error(
          `Couldn't find batches linked to data samples ${dataSampleIdsToSearch}`
        );
      }

      // Caching
      notCachedContacts.forEach((contact) => {
        contact.services
          ?.filter(
            (service) =>
              service.id != undefined &&
              dataSampleIdsToSearch.includes(service.id)
          )
          .forEach((service) => this.contactsCache.put(service.id!, contact));
      });

      return [...Object.values(cachedContacts), ...notCachedContacts];
    } else {
      return Object.values(cachedContacts);
    }
  }

  async _getPatientOfContact(
    currentUser: UserDto,
    contactDto: ContactDto
  ): Promise<PatientDto | undefined> {
    let patientId = await this._getPatientIdOfContact(currentUser, contactDto);
    if (patientId) {
      return this.patientApi.getPatientWithUser(currentUser, patientId);
    } else {
      return undefined;
    }
  }

  async deleteServices(
    user: UserDto,
    patient: PatientDto,
    services: Array<ServiceDto>
  ): Promise<ContactDto | undefined> {
    let currentTime = Date.now();
    let contactToDeleteServices = await this.contactApi.newInstance(
      user,
      patient,
      new ContactDto({
        id: this.crypto.randomUuid(),
        serviceLinks: services.map(
          (service) =>
            new ServiceDto({
              id: service.id,
              created: service.created,
              modified: currentTime,
              endOfLife: currentTime,
            })
        ),
      })
    );

    return this.contactApi.createContactWithUser(user, contactToDeleteServices);
  }

  async filterDataSample(
    filter: Filter<DataSample>,
    nextDataSampleId?: string,
    limit?: number
  ): Promise<PaginatedListDataSample> {
    let currentUser = await this.userApi.getCurrentUser();
    let hcpId = (currentUser.healthcarePartyId ||
      currentUser.patientId ||
      currentUser.deviceId)!;

    let paginatedListService = await this.contactApi
      .filterServicesBy(
        nextDataSampleId,
        limit,
        new FilterChainService({
          filter: FilterMapper.toAbstractFilterDto(filter, "DataSample"),
        })
      )
      .then((paginatedServices) =>
        this.contactApi
          .decryptServices(hcpId, paginatedServices.rows!)
          .then((decryptedRows) =>
            Object.assign(paginatedServices, { rows: decryptedRows })
          )
      );
    return PaginatedListMapper.toPaginatedListDataSample(paginatedListService)!;
  }

  async getDataSample(dataSampleId: string): Promise<DataSample> {
    return Promise.resolve(
      DataSampleMapper.toDataSample(
        await this.getServiceFromICure(dataSampleId)
      )!
    );
  }

  async getServiceFromICure(dataSampleId: string): Promise<ServiceDto> {
    let currentUser = await this.userApi.getCurrentUser();

    let serviceToFind = await this.contactApi.listServicesWithUser(
      currentUser,
      new ListOfIds({ ids: [dataSampleId] })
    );
    if (serviceToFind == undefined) {
      throw Error(`Could not find data sample ${dataSampleId}`);
    }
    return Promise.resolve(firstOrNull(serviceToFind)!);
  }

  async getDataSampleAttachmentContent(
    dataSampleId: string,
    documentId: string,
    attachmentId: string
  ): Promise<ArrayBuffer> {
    let currentUser = await this.userApi.getCurrentUser();
    let documentOfAttachment =
      await this.getDataSampleAttachmentDocumentFromICure(
        dataSampleId,
        documentId
      );
    let docEncKeys = await this.getDocumentEncryptionKeys(
      currentUser,
      documentOfAttachment
    ).then((keys) => keys.join(","));

    return this.documentApi.getDocumentAttachment(
      documentId,
      attachmentId,
      docEncKeys
    );
  }

  async getDataSampleAttachmentDocument(
    dataSampleId: string,
    documentId: string
  ): Promise<Document> {
    return DocumentMapper.toDocument(
      await this.getDataSampleAttachmentDocumentFromICure(
        dataSampleId,
        documentId
      )
    );
  }

  async getDataSampleAttachmentDocumentFromICure(
    dataSampleId: string,
    documentId: string
  ): Promise<DocumentDto> {
    let existingDataSample = await this.getDataSample(dataSampleId);
    if (
      Object.entries(existingDataSample!.content).find(
        ([, content]) => content.documentId == documentId
      ) == null
    ) {
      throw Error(
        `Id ${documentId} does not reference any document in the data sample ${dataSampleId}`
      );
    }

    return this.documentApi.getDocument(documentId);
  }

  async getDocumentEncryptionKeys(
    currentUser: UserDto,
    documentDto: DocumentDto
  ): Promise<Array<string>> {
    let keysFromDeleg =
      await this.crypto.extractKeysHierarchyFromDelegationLikes(
        currentUser.healthcarePartyId!,
        documentDto.id!,
        documentDto.encryptionKeys!
      );
    return keysFromDeleg
      .map((key) =>
        key.extractedKeys.length > 0 ? key.extractedKeys[0] : undefined
      )
      .filter((key) => key != undefined)
      .map((key) => key!);
  }

  matchDataSample(filter: Filter<DataSample>): Promise<Array<string>> {
    return this.contactApi.matchServicesBy(
      FilterMapper.toAbstractFilterDto(filter, "DataSample")
    );
  }

  async setDataSampleAttachment(
    dataSampleId: string,
    body: ArrayBuffer,
    documentName?: string,
    documentVersion?: string,
    documentExternalUuid?: string,
    documentLanguage?: string
  ): Promise<Document> {
    let currentUser = await this.userApi.getCurrentUser();
    let existingDataSample = await this.getDataSample(dataSampleId);

    let [, batchOfDataSample] = await this._getContactOfDataSample(
      currentUser,
      existingDataSample
    );
    if (batchOfDataSample == undefined) {
      throw Error(
        `Could not find batch information of the data sample ${dataSampleId}`
      );
    }

    let patientIdOfBatch = await this._getPatientIdOfContact(
      currentUser,
      batchOfDataSample
    );
    if (patientIdOfBatch == undefined) {
      throw Error(
        `Can not set an attachment to a data sample not linked to a patient`
      );
    }

    let documentToCreate = new DocumentDto({
      id: this.crypto.randomUuid(),
      name: documentName,
      version: documentVersion,
      externalUuid: documentExternalUuid,
      hash: this.crypto.sha256(body),
      mainUti: UtiDetector.getUtiFor(documentName),
    });

    let createdDocument = await this.documentApi.createDocument(
      documentToCreate
    );

    // Update data sample with documentId
    let contentIso = documentLanguage ?? "en";
    let newDSContent = {
      ...existingDataSample.content,
      [contentIso]: new Content({ documentId: createdDocument.id }),
    };
    await this.createOrModifyDataSampleFor(patientIdOfBatch!, {
      ...existingDataSample,
      content: newDSContent,
    });

    // Add attachment to document
    let docEncKey = firstOrNull(
      await this.getDocumentEncryptionKeys(currentUser, createdDocument)
    );
    let docWithAttachment = await this.documentApi.setDocumentAttachment(
      createdDocument.id!,
      docEncKey,
      body
    );

    return Promise.resolve(DocumentMapper.toDocument(docWithAttachment));
  }

  async giveAccessTo(dataSample: DataSample, delegatedTo: string): Promise<DataSample> {
    const currentUser = await this.userApi.getCurrentUser()
    const dataOwnerId = this.dataOwnerApi.getDataOwnerOf(currentUser)
    const contactOfDataSample = (await this._getContactOfDataSample(currentUser, dataSample))[1]

    if (contactOfDataSample == undefined) {
      throw Error(`Couldn't find the batch containing data sample ${dataSample.id}`)
    }

    // Does contact already have related delegations
    if (contactOfDataSample.delegations != undefined && contactOfDataSample.delegations[delegatedTo] != undefined) {
      return dataSample;
    }

    const contactPatient = await this._getPatientOfContact(currentUser, contactOfDataSample)
    if (contactPatient == undefined) {
      throw Error(`User ${currentUser.id} may not access patient identifier of data sample ${dataSample.id}`)
    }

    return this.crypto
      .extractDelegationsSFKs(contactOfDataSample, dataOwnerId)
      .then((delKeys) => {
        if (delKeys.extractedKeys.length == 0) {
          throw Error(`User ${currentUser.id} could not decrypt secret info of data sample ${dataSample.id}`)
        }
        return delKeys.extractedKeys.shift()!
      })
      .then(async (secretKey) => {
        const newKeys = await this.crypto.extendedDelegationsAndCryptedForeignKeys(contactOfDataSample, contactPatient, dataOwnerId, delegatedTo, secretKey);
        return new ContactDto({
          ...contactOfDataSample,
          delegations: newKeys.delegations,
          cryptedForeignKeys: newKeys.cryptedForeignKeys
        })
      })
      .then(async (contactWithNewDelegationsAndCryptedFKeys) => {
        return {
          contact: contactWithNewDelegationsAndCryptedFKeys,
          encKeys: await this.crypto.extractEncryptionsSKs(contactWithNewDelegationsAndCryptedFKeys, dataOwnerId)
        }
      })
      .then(({contact, encKeys}) => {
        if (encKeys.extractedKeys.length == 0) {
          throw Error(`User ${currentUser.id} could not decrypt secret info of data sample ${dataSample.id}`)
        }

        return {contact: contact, encKey: encKeys.extractedKeys.shift()!}
      })
      .then(({contact, encKey}) => this.crypto.addDelegationsAndEncryptionKeys(null, contact, dataOwnerId, delegatedTo, null, encKey))
      .then((contactWithUpdatedAccessRights) => this.contactApi.modifyContactWithUser(currentUser, contactWithUpdatedAccessRights))
      .then((updatedContact: ContactDto) => {
        if (updatedContact == undefined || updatedContact.services == undefined) {
          throw Error(`Impossible to give access to ${delegatedTo} to data sample ${dataSample.id} information`)
        }

        return DataSampleMapper.toDataSample(
          updatedContact.services.find((service) => service.id == dataSample.id),
          updatedContact.id,
          updatedContact.subContacts?.filter((subContact) => subContact.services?.find((s) => s.serviceId == dataSample.id) != undefined))!
      })
  }

  async giveAccessToMany(dataSamples: Array<DataSample>, delegatedTo: string): Promise<Array<string>> {
    return (await Promise.all(dataSamples.map(async dataSample => {
      try {
        return (await this.giveAccessTo(dataSample, delegatedTo)).id
      } catch(e) {
        return null;
      }
    }))).filter( it => !!it ) as unknown as string[];
  }

  async concatenateFilterResults(filter: Filter<DataSample>, nextId?: string | undefined, limit?: number | undefined, accumulator: Array<DataSample> = []): Promise<Array<DataSample>> {
    const paginatedDataSamples = await this.filterDataSample(filter, nextId, limit);
    return !paginatedDataSamples.nextKeyPair?.startKeyDocId
      ? accumulator.concat(paginatedDataSamples.rows)
      : this.concatenateFilterResults(filter, paginatedDataSamples.nextKeyPair.startKeyDocId, limit, accumulator.concat(paginatedDataSamples.rows))
  }

  async getDataSamplesForPatient(patient: Patient): Promise<Array<DataSample>> {
    const user = await this.userApi.getCurrentUser();
    if (!user) throw new Error("There is no user currently logged in");
    const dataOwnerId = user.healthcarePartyId ?? user.patientId ?? user.deviceId;
    if (!dataOwnerId) throw new Error("User is not a Data Owner");
    const filter = await new DataSampleFilter()
      .forDataOwner(dataOwnerId)
      .forPatients(this.crypto, [patient])
      .build()
    return await this.concatenateFilterResults(filter);
  }

  async subscribeToDataSampleEvents(
    eventTypes: ("CREATE" | "UPDATE" | "DELETE")[],
    filter: Filter<DataSample> | undefined,
    eventFired: (dataSample: DataSample) => Promise<void>,
    options: {keepAlive?: number, lifetime?: number, connectionMaxRetry?: number, connectionRetryIntervalMs?: number } = {}
  ): Promise<Connection> {
    let currentUser = await this.userApi.getCurrentUser();
    return subscribeToEntityEvents(
      this.basePath,
      this.username!,
      this.password!,
      "DataSample",
      eventTypes,
      filter,
      eventFired,
      options,
      async (encrypted) =>
        (
          await this.contactApi.decryptServices(
            currentUser.healthcarePartyId!,
            [encrypted]
          )
        )[0]
    ).then((rs) => new ConnectionImpl(rs));
  }

  async extractPatientId(dataSample: DataSample): Promise<String|undefined> {
    const currentUser = await this.userApi.getCurrentUser();
    const dataOwnerId = this.dataOwnerApi.getDataOwnerOf(currentUser)

    if (!dataSample?.systemMetaData?.cryptedForeignKeys) {
      return undefined
    }
    const cfksForAllDelegates = dataSample.systemMetaData.cryptedForeignKeys

    if (!cfksForAllDelegates || !Object.keys(cfksForAllDelegates).length) {
      console.log(`There is no cryptedForeignKeys in dataSample (${dataSample.id})`)
      return undefined
    }
    return (await this.crypto.extractKeysFromDelegationsForHcpHierarchy(dataOwnerId, dataSample.id!, toMapArrayTransform(cfksForAllDelegates, toDelegationDto)!)).extractedKeys[0]
  }

}

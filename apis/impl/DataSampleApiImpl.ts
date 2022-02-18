import {DataSample} from "../../models/DataSample";
import {Filter} from "../../models/Filter";
import {PaginatedListDataSample} from "../../models/PaginatedListDataSample";
import {Document} from "../../models/Document";
import {DataSampleApi} from "../DataSampleApi";
import {
  Contact,
  IccAuthApi,
  IccCodeApi,
  IccDocumentXApi,
  IccPatientXApi,
  IccUserXApi, PaginatedListContact,
  Patient as PatientDto,
  Service,
  User as UserDto
} from "@icure/api";
import {IccCryptoXApi} from "@icure/api/icc-x-api/icc-crypto-x-api";
import {IccHcpartyXApi} from "@icure/api/icc-x-api/icc-hcparty-x-api";
import {IccContactXApi} from "@icure/api/icc-x-api/icc-contact-x-api";
import {IccHelementXApi} from "@icure/api/icc-x-api/icc-helement-x-api";
import {any, distinctBy, firstOrNull, isNotEmpty, sumOf} from "../../utils/functionalUtils";
import {CachedMap} from "../../utils/cachedMap";
import {DataSampleMapper} from "../../mappers/serviceDataSample";

class DataSampleApiImpl implements DataSampleApi {
  private crypto: IccCryptoXApi;
  private userApi: IccUserXApi;
  private patientApi: IccPatientXApi;
  private contactApi: IccContactXApi;
  private documentApi: IccDocumentXApi;

  private contactsCache: CachedMap<Contact> = new CachedMap<Contact>(5 * 60, 10000);

  constructor(api: { cryptoApi: IccCryptoXApi; codeApi: IccCodeApi, authApi: IccAuthApi; userApi: IccUserXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; documentApi: IccDocumentXApi; }) {
    this.crypto = api.cryptoApi;
    this.userApi = api.userApi;
    this.patientApi = api.patientApi;
    this.contactApi = api.contactApi;
    this.documentApi = api.documentApi;
  }

  async createOrModifyDataSampleFor(patientId: string, dataSample: DataSample): Promise<DataSample> {
    let createdOrUpdatedDataSample = (await this.createOrModifyDataSamplesFor(patientId, [dataSample])).pop();
    if (createdOrUpdatedDataSample) {
      return createdOrUpdatedDataSample;
    }

    throw Error(`Could not create / modify data sample ${dataSample.id} for patient ${patientId}`)
  }

  async createOrModifyDataSamplesFor(patientId: string, dataSample: Array<DataSample>): Promise<Array<DataSample>> {
    if (dataSample.length == 0) {
      return Promise.resolve([]);
    }

    if (distinctBy(dataSample, (ds) => ds.batchId).size > 1) {
      throw Error("Only data samples of a same batch can be processed together")
    }

    // Arbitrary : 1 service = 1K
    if (this.countHierarchyOfDataSamples(0, 0, dataSample) > 1000) {
      throw Error("Can't process more than 1000 data samples in the same batch");
    }

    let currentUser = await this.userApi.getCurrentUser();
    let [contactCached, existingContact] = await this.getContactOfDataSample(currentUser, dataSample[0]);

    let contactPatientId = existingContact ? await this.getPatientIdOfContact(currentUser, existingContact) : undefined;

    if (existingContact != null && contactPatientId == null) {
      throw Error("Can't update a batch of data samples that is not linked to any patient yet.");
    }

    if (contactPatientId != null && contactPatientId != patientId) {
      throw Error("Can't update the patient of a batch of data samples. Delete those samples and create new ones");
    }

    let existingPatient = await this.patientApi.getPatientWithUser(currentUser, patientId);
    let createdOrModifiedContact: Contact;

    if (contactCached && existingContact != null) {
      let servicesToModify = dataSample.map((e) => DataSampleMapper.toServiceDto(e, e.batchId)!);

      let contactToModify = {...existingContact,
        services: servicesToModify,
        openingDate: Math.min(...servicesToModify.filter((element) => element.openingDate != null || element.valueDate != null).map((e) => e.openingDate ?? e.valueDate!)),
        closingDate: Math.max(...servicesToModify.filter((element) => element.closingDate != null || element.valueDate != null).map((e) => e.closingDate ?? e.valueDate!))
      };

      createdOrModifiedContact = await this.contactApi.modifyContactWithUser(currentUser, contactToModify);

    } else {
      let contactToCreate = await this.createContactDtoBasedOn(currentUser, existingPatient, dataSample, existingContact);
      createdOrModifiedContact = await this.contactApi.createContactWithUser(currentUser, contactToCreate);
    }

    createdOrModifiedContact.services!.forEach((service) => this.contactsCache.put(service.id!, createdOrModifiedContact));
    return Promise.resolve(createdOrModifiedContact.services!.map((service) => DataSampleMapper.toDataSample(service, createdOrModifiedContact.id)!));
  }

  countHierarchyOfDataSamples(currentCount: number, dataSampleIndex: number, dataSamples: Array<DataSample>) : number {
    if (dataSampleIndex >= dataSamples.length) {
      return currentCount;
    }

    let currentDS = dataSamples[dataSampleIndex];
    let dsToSum = Object.values(currentDS.content).filter((element) => isNotEmpty(element?.compoundValue));
    let dataSampleCount = sumOf(dsToSum, (input) => this.countHierarchyOfDataSamples(0, 0, input.compoundValue!));

    return this.countHierarchyOfDataSamples(currentCount + dataSampleCount, dataSampleIndex + 1, dataSamples);
  }

  async getContactOfDataSample(currentUser: UserDto, dataSample: DataSample) : Promise<[boolean, Contact?]> {
    let cachedContact = dataSample.id ? this.contactsCache.getIfPresent(dataSample.id) : undefined;
    if (cachedContact) {
      return [true, cachedContact];
    } else {
      let contact: Contact = dataSample.batchId ? await this.contactApi.getContactWithUser(currentUser, dataSample.batchId) : undefined;
      return [false, contact];
    }
  }

  async getPatientIdOfContact(currentUser: UserDto, contactDto: Contact): Promise<string | undefined> {
    let keysFromDeleg = await this.crypto.extractKeysHierarchyFromDelegationLikes(currentUser.healthcarePartyId!, contactDto.id!, contactDto.cryptedForeignKeys!);
    return keysFromDeleg
      .map((key) => key.extractedKeys.length > 0 ? key.extractedKeys[0] : undefined)
      .find((key) => key != undefined);
  }

  async createContactDtoBasedOn(currentUser: UserDto, contactPatient: PatientDto, dataSamples: Array<DataSample>, existingContact?: Contact) : Promise<Contact> {
    let servicesToCreate = dataSamples
      .map((e) => DataSampleMapper.toServiceDto(e, e.batchId))
      .map((e) => { return {...e, modified: undefined } });
    return await this.createContactDtoUsing(currentUser, contactPatient, servicesToCreate, existingContact);
  }

  async createContactDtoUsing(currentUser: UserDto, contactPatient: PatientDto, servicesToCreate: Array<Service>, existingContact? : Contact): Promise<Contact> {
    let baseContact: Contact;
    if (existingContact != null) {
      baseContact = {
        ...existingContact,
        id: this.crypto.randomUuid(),
        rev: undefined,
        modified: Date.now()
      };
    } else {
      baseContact = await this.contactApi.newInstance(currentUser, contactPatient, new Contact({id: this.crypto.randomUuid()}));
    }

    return {
      ...baseContact,
      services: servicesToCreate,
      openingDate: Math.min(...servicesToCreate.filter((element) => element.openingDate != null || element.valueDate != null).map((e) => e.openingDate ?? e.valueDate!)),
      closingDate: Math.max(...servicesToCreate.filter((element) => element.closingDate != null || element.valueDate != null).map((e) => e.closingDate ?? e.valueDate!))
    };
  }

  deleteAttachment(dataSampleId: string, documentId: string): Promise<string> {
    return Promise.resolve("");
  }

  async deleteDataSample(dataSampleId: string): Promise<string> {
    let deletedDataSampleId = (await this.deleteDataSamples([dataSampleId])).pop();
    if (deletedDataSampleId) {
      return deletedDataSampleId;
    }

    throw Error(`Could not delete data sample ${dataSampleId}`)
  }

  async deleteDataSamples(requestBody: Array<string>): Promise<Array<string>> {
    let currentUser = await this.userApi.getCurrentUser();
    let existingContact = firstOrNull(await this.findContactsForDataSampleIds(currentUser, requestBody));
    if (existingContact == undefined) {
      throw Error(`Could not find batch information of the data sample ${requestBody}`);
    }

    let existingServiceIds = existingContact.services?.map((e) => e.id);
    if (existingServiceIds == undefined || any(requestBody, (element) => element !in existingServiceIds!)) {
      throw Error(`Could not find all data samples in same batch ${existingContact.id}`);
    }

    let contactPatient = await this.getPatientOfContact(currentUser, existingContact);
    if (contactPatient == undefined) {
      throw Error(`Couldn't find patient related to batch of data samples ${existingContact.id}`);
    }

    let servicesToDelete = existingContact.services!.filter((element) => element.id! in requestBody);

    let deletedServices = (await this.deleteServices(currentUser, contactPatient, servicesToDelete))?.services
      ?.filter((element) => element.id! in requestBody)
      ?.filter((element) => element.endOfLife != null)
      ?.map((e) => e.id!);

    if (deletedServices == undefined) {
      throw Error(`Could not delete data samples ${requestBody}`);
    }

    return Promise.resolve(deletedServices);
  }

  async findContactsForDataSampleIds(currentUser: UserDto, dataSampleIds: Array<string>) : Promise<Array<Contact>> {
    let cachedContacts = this.contactsCache.getAllPresent(dataSampleIds);
    let dataSampleIdsToSearch = dataSampleIds
      .filter((element) => Object.keys(cachedContacts).find((key) => key == element) == undefined);

    if (dataSampleIdsToSearch.length > 0) {
      let notCachedContacts = (await this.contactApi.filterByWithUser(currentUser,
        undefined,
        dataSampleIdsToSearch.length,
        undefined //FilterChainContact(ContactByServiceIdsFilter(new Set(dataSampleIdsToSearch)))
      ) as PaginatedListContact).rows;

      if (notCachedContacts == undefined) {
        throw Error(`Couldn't find batches linked to data samples ${dataSampleIdsToSearch}`);
      }

      // Caching
      notCachedContacts.forEach((contact) => {
        contact.services?.filter((service) => service.id != undefined && service.id in dataSampleIdsToSearch)
          .forEach((service) => this.contactsCache.put(service.id!, contact));
      });

      return [...Object.values(cachedContacts), ...notCachedContacts];
    } else {
      return Object.values(cachedContacts);
    }
  }

  async getPatientOfContact(currentUser: UserDto, contactDto: Contact) : Promise<PatientDto | undefined> {
    let patientId = (await this.getPatientIdOfContact(currentUser, contactDto));
    if (patientId) {
      return this.patientApi.getPatientWithUser(currentUser, patientId);
    } else {
      return undefined;
    }
  }

  async deleteServices(user: UserDto, patient: PatientDto, services: Array<Service>): Promise<Contact | undefined> {
    let currentTime = Date.now();
    let contactToDeleteServices = await this.contactApi.newInstance(user, patient, new Contact({
        id: this.crypto.randomUuid(),
        services: services.map((service) => new Service({id: service.id, created: service.created, modified: currentTime, endOfLife: currentTime}))
    }));

    return this.contactApi.createContactWithUser(user, contactToDeleteServices);
}

  filterDataSample(filter: Filter): Promise<PaginatedListDataSample> {
    return Promise.resolve(new PaginatedListDataSample({}));
  }

  getDataSample(dataSampleId: string): Promise<DataSample> {
    return Promise.resolve(undefined);
  }

  getDataSampleAttachmentContent(dataSampleId: string, documentId: string, attachmentId: string): Promise<ArrayBuffer> {
    return Promise.resolve(undefined);
  }

  getDataSampleAttachmentDocument(dataSampleId: string, documentId: string): Promise<Document> {
    return Promise.resolve(undefined);
  }

  matchDataSample(filter: Filter): Promise<Array<string>> {
    return Promise.resolve([]);
  }

  setDataSampleAttachment(dataSampleId: string, body: ArrayBuffer, documentName?: string, documentVersion?: string, documentExternalUuid?: string, documentLanguage?: string): Promise<Document> {
    return Promise.resolve(undefined);
  }
}

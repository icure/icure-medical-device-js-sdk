import {v4 as uuid} from 'uuid';
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
  IccUserXApi,
  Patient as PatientDto,
  Service,
  User as UserDto
} from "@icure/api";
import {IccCryptoXApi} from "@icure/api/icc-x-api/icc-crypto-x-api";
import {IccHcpartyXApi} from "@icure/api/icc-x-api/icc-hcparty-x-api";
import {IccContactXApi} from "@icure/api/icc-x-api/icc-contact-x-api";
import {IccHelementXApi} from "@icure/api/icc-x-api/icc-helement-x-api";
import {distinctBy, isNotEmpty, sumOf} from "../../utils/functionalUtils";
import {CachedMap} from "../../utils/cachedMap";
import {Promise} from "es6-promise";
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
      let contactToCreate = this.createContactDtoBasedOn(currentUser, existingPatient, dataSample, existingContact);
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

  createContactDtoBasedOn(currentUser: UserDto, contactPatient: PatientDto, dataSamples: Array<DataSample>, existingContact?: Contact) : Contact {
    let servicesToCreate = dataSamples
      .map((e) => DataSampleMapper.toServiceDto(e, e.batchId))
      .map((e) => { return {...e, modified: undefined } });
    return this.createContactDtoUsing(currentUser, contactPatient, servicesToCreate, existingContact);
  }

  createContactDtoUsing(currentUser: UserDto, contactPatient: PatientDto, servicesToCreate: Array<Service>, existingContact? : Contact): Contact {
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

  deleteDataSample(dataSampleId: string): Promise<string> {
    return Promise.resolve("");
  }

  deleteDataSamples(requestBody: Array<string>): Promise<Array<string>> {
    return Promise.resolve(undefined);
  }

  filterDataSample(filter: Filter): Promise<PaginatedListDataSample> {
    return Promise.resolve(new PaginatedListDataSample({}));
  }

  getDataSample(dataSampleId: string): Promise<DataSample> {
    return Promise.resolve(undefined);
  }

  getDataSampleAttachmentContent(dataSampleId: string, documentId: string, attachmentId: string): Promise<HttpFile> {
    return Promise.resolve(undefined);
  }

  getDataSampleAttachmentDocument(dataSampleId: string, documentId: string): Promise<Document> {
    return Promise.resolve(undefined);
  }

  matchDataSample(filter: Filter): Promise<Array<string>> {
    return Promise.resolve([]);
  }

  setDataSampleAttachment(dataSampleId: string, body: HttpFile, documentName?: string, documentVersion?: string, documentExternalUuid?: string, documentLanguage?: string): Promise<Document> {
    return Promise.resolve(undefined);
  }
}

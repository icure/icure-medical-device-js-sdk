import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { Address } from '../models/Address';
import { AuthenticationToken } from '../models/AuthenticationToken';
import { Coding } from '../models/Coding';
import { CodingReference } from '../models/CodingReference';
import { Content } from '../models/Content';
import { DataSample } from '../models/DataSample';
import { Delegation } from '../models/Delegation';
import { Document } from '../models/Document';
import { Filter } from '../models/Filter';
import { HealthcareElement } from '../models/HealthcareElement';
import { HealthcareProfessional } from '../models/HealthcareProfessional';
import { Identifier } from '../models/Identifier';
import { InlineResponse403 } from '../models/InlineResponse403';
import { Measure } from '../models/Measure';
import { MedicalDevice } from '../models/MedicalDevice';
import { PaginatedDocumentKeyAndIdPairObject } from '../models/PaginatedDocumentKeyAndIdPairObject';
import { PaginatedListCoding } from '../models/PaginatedListCoding';
import { PaginatedListDataSample } from '../models/PaginatedListDataSample';
import { PaginatedListHealthcareElement } from '../models/PaginatedListHealthcareElement';
import { PaginatedListHealthcareProfessional } from '../models/PaginatedListHealthcareProfessional';
import { PaginatedListMedicalDevice } from '../models/PaginatedListMedicalDevice';
import { PaginatedListPatient } from '../models/PaginatedListPatient';
import { PaginatedListUser } from '../models/PaginatedListUser';
import { Partnership } from '../models/Partnership';
import { Patient } from '../models/Patient';
import { PatientHealthCareParty } from '../models/PatientHealthCareParty';
import { PersonName } from '../models/PersonName';
import { Property } from '../models/Property';
import { PropertyType } from '../models/PropertyType';
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted';
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner';
import { SystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted';
import { Telecom } from '../models/Telecom';
import { TimeSeries } from '../models/TimeSeries';
import { TypedValueObject } from '../models/TypedValueObject';
import { User } from '../models/User';

import { ObservableCodingApi } from "./ObservableAPI";
import { CodingApiRequestFactory, CodingApiResponseProcessor} from "../apis/CodingApi";

export interface CodingApiCreateOrModifyCodingRequest {
    /**
     * 
     * @type Coding
     * @memberof CodingApicreateOrModifyCoding
     */
    coding: Coding
}

export interface CodingApiCreateOrModifyCodingsRequest {
    /**
     * 
     * @type Array&lt;Coding&gt;
     * @memberof CodingApicreateOrModifyCodings
     */
    coding: Array<Coding>
}

export interface CodingApiFilterCodingRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof CodingApifilterCoding
     */
    filter: Filter
    /**
     * The id of the first coding in the next page
     * @type string
     * @memberof CodingApifilterCoding
     */
    nextCodingId?: string
    /**
     * The number of codings to return in the queried page
     * @type number
     * @memberof CodingApifilterCoding
     */
    limit?: number
}

export interface CodingApiGetCodingRequest {
    /**
     * 
     * @type string
     * @memberof CodingApigetCoding
     */
    codingId: string
}

export interface CodingApiMatchCodingRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof CodingApimatchCoding
     */
    filter: Filter
}

export class ObjectCodingApi {
    private api: ObservableCodingApi

    public constructor(configuration: Configuration, requestFactory?: CodingApiRequestFactory, responseProcessor?: CodingApiResponseProcessor) {
        this.api = new ObservableCodingApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * When modifying a coding, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
     * Create or update a [Coding]
     * @param param the request object
     */
    public createOrModifyCoding(param: CodingApiCreateOrModifyCodingRequest, options?: Configuration): Promise<Coding> {
        return this.api.createOrModifyCoding(param.coding,  options).toPromise();
    }

    /**
     * When modifying codings, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
     * Create or update a batch of [Coding]
     * @param param the request object
     */
    public createOrModifyCodings(param: CodingApiCreateOrModifyCodingsRequest, options?: Configuration): Promise<Array<Coding>> {
        return this.api.createOrModifyCodings(param.coding,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
     * Load codings from the database by filtering them using the provided [filter].
     * @param param the request object
     */
    public filterCoding(param: CodingApiFilterCodingRequest, options?: Configuration): Promise<PaginatedListCoding> {
        return this.api.filterCoding(param.filter, param.nextCodingId, param.limit,  options).toPromise();
    }

    /**
     * Each coding is uniquely identified by a coding id. The coding id is a UUID. This [codingId] is the preferred method to retrieve one specific coding.
     * Get a [Coding]
     * @param param the request object
     */
    public getCoding(param: CodingApiGetCodingRequest, options?: Configuration): Promise<Coding> {
        return this.api.getCoding(param.codingId,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
     * Load coding ids from the database by filtering them using the provided [filter].
     * @param param the request object
     */
    public matchCoding(param: CodingApiMatchCodingRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.matchCoding(param.filter,  options).toPromise();
    }

}

import { ObservableDataSampleApi } from "./ObservableAPI";
import { DataSampleApiRequestFactory, DataSampleApiResponseProcessor} from "../apis/DataSampleApi";

export interface DataSampleApiCreateOrModifyDataSampleForRequest {
    /**
     * 
     * @type string
     * @memberof DataSampleApicreateOrModifyDataSampleFor
     */
    patientId: string
    /**
     * 
     * @type DataSample
     * @memberof DataSampleApicreateOrModifyDataSampleFor
     */
    dataSample: DataSample
}

export interface DataSampleApiCreateOrModifyDataSamplesForRequest {
    /**
     * 
     * @type string
     * @memberof DataSampleApicreateOrModifyDataSamplesFor
     */
    patientId: string
    /**
     * 
     * @type Array&lt;DataSample&gt;
     * @memberof DataSampleApicreateOrModifyDataSamplesFor
     */
    dataSample: Array<DataSample>
}

export interface DataSampleApiDeleteAttachmentRequest {
    /**
     * 
     * @type string
     * @memberof DataSampleApideleteAttachment
     */
    dataSampleId: string
    /**
     * 
     * @type string
     * @memberof DataSampleApideleteAttachment
     */
    documentId: string
}

export interface DataSampleApiDeleteDataSampleRequest {
    /**
     * 
     * @type string
     * @memberof DataSampleApideleteDataSample
     */
    dataSampleId: string
}

export interface DataSampleApiDeleteDataSamplesRequest {
    /**
     * 
     * @type Array&lt;string&gt;
     * @memberof DataSampleApideleteDataSamples
     */
    requestBody: Array<string>
}

export interface DataSampleApiFilterDataSampleRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof DataSampleApifilterDataSample
     */
    filter: Filter
}

export interface DataSampleApiGetDataSampleRequest {
    /**
     * 
     * @type string
     * @memberof DataSampleApigetDataSample
     */
    dataSampleId: string
}

export interface DataSampleApiGetDataSampleAttachmentContentRequest {
    /**
     * 
     * @type string
     * @memberof DataSampleApigetDataSampleAttachmentContent
     */
    dataSampleId: string
    /**
     * 
     * @type string
     * @memberof DataSampleApigetDataSampleAttachmentContent
     */
    documentId: string
    /**
     * 
     * @type string
     * @memberof DataSampleApigetDataSampleAttachmentContent
     */
    attachmentId: string
}

export interface DataSampleApiGetDataSampleAttachmentDocumentRequest {
    /**
     * 
     * @type string
     * @memberof DataSampleApigetDataSampleAttachmentDocument
     */
    dataSampleId: string
    /**
     * 
     * @type string
     * @memberof DataSampleApigetDataSampleAttachmentDocument
     */
    documentId: string
}

export interface DataSampleApiMatchDataSampleRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof DataSampleApimatchDataSample
     */
    filter: Filter
}

export interface DataSampleApiSetDataSampleAttachmentRequest {
    /**
     * 
     * @type string
     * @memberof DataSampleApisetDataSampleAttachment
     */
    dataSampleId: string
    /**
     * 
     * @type HttpFile
     * @memberof DataSampleApisetDataSampleAttachment
     */
    body: HttpFile
    /**
     * 
     * @type string
     * @memberof DataSampleApisetDataSampleAttachment
     */
    documentName?: string
    /**
     * 
     * @type string
     * @memberof DataSampleApisetDataSampleAttachment
     */
    documentVersion?: string
    /**
     * 
     * @type string
     * @memberof DataSampleApisetDataSampleAttachment
     */
    documentExternalUuid?: string
    /**
     * 
     * @type string
     * @memberof DataSampleApisetDataSampleAttachment
     */
    documentLanguage?: string
}

export class ObjectDataSampleApi {
    private api: ObservableDataSampleApi

    public constructor(configuration: Configuration, requestFactory?: DataSampleApiRequestFactory, responseProcessor?: DataSampleApiResponseProcessor) {
        this.api = new ObservableDataSampleApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
     * Create or update a [DataSample] for a patient
     * @param param the request object
     */
    public createOrModifyDataSampleFor(param: DataSampleApiCreateOrModifyDataSampleForRequest, options?: Configuration): Promise<DataSample> {
        return this.api.createOrModifyDataSampleFor(param.patientId, param.dataSample,  options).toPromise();
    }

    /**
     * All the provided data samples will be created in the same batch. If you are trying to update some data samples, then those ones need to come from the same batch.                  When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.                 
     * Create or update a batch of [DataSample] for a patient
     * @param param the request object
     */
    public createOrModifyDataSamplesFor(param: DataSampleApiCreateOrModifyDataSamplesForRequest, options?: Configuration): Promise<Array<DataSample>> {
        return this.api.createOrModifyDataSamplesFor(param.patientId, param.dataSample,  options).toPromise();
    }

    /**
     * Deletes an attachment, using its corresponding documentId
     * Delete an attachment of a DataSample
     * @param param the request object
     */
    public deleteAttachment(param: DataSampleApiDeleteAttachmentRequest, options?: Configuration): Promise<string> {
        return this.api.deleteAttachment(param.dataSampleId, param.documentId,  options).toPromise();
    }

    /**
     * Deletes the data sample identified by the provided unique [dataSampleId].
     * Delete a [DataSample] by its id
     * @param param the request object
     */
    public deleteDataSample(param: DataSampleApiDeleteDataSampleRequest, options?: Configuration): Promise<string> {
        return this.api.deleteDataSample(param.dataSampleId,  options).toPromise();
    }

    /**
     * Deletes the batch of data samples identified by the provided [dataSampleIds]. The data samples to delete need to be part of the same batch
     * Delete a batch of [Data Samples]
     * @param param the request object
     */
    public deleteDataSamples(param: DataSampleApiDeleteDataSamplesRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.deleteDataSamples(param.requestBody,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples using the provided [filter].
     * @param param the request object
     */
    public filterDataSample(param: DataSampleApiFilterDataSampleRequest, options?: Configuration): Promise<PaginatedListDataSample> {
        return this.api.filterDataSample(param.filter,  options).toPromise();
    }

    /**
     * Each data sample is uniquely identified by a data sample id which is a UUID. This [dataSampleId] is the preferred method to retrieve one specific data sample.
     * Get a [DataSample] by its id
     * @param param the request object
     */
    public getDataSample(param: DataSampleApiGetDataSampleRequest, options?: Configuration): Promise<DataSample> {
        return this.api.getDataSample(param.dataSampleId,  options).toPromise();
    }

    /**
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the content of an attachment
     * Get attachment content of a DataSample
     * @param param the request object
     */
    public getDataSampleAttachmentContent(param: DataSampleApiGetDataSampleAttachmentContentRequest, options?: Configuration): Promise<HttpFile> {
        return this.api.getDataSampleAttachmentContent(param.dataSampleId, param.documentId, param.attachmentId,  options).toPromise();
    }

    /**
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the document metadata information of an attachment
     * Get document metadata of a DataSample attachment
     * @param param the request object
     */
    public getDataSampleAttachmentDocument(param: DataSampleApiGetDataSampleAttachmentDocumentRequest, options?: Configuration): Promise<Document> {
        return this.api.getDataSampleAttachmentDocument(param.dataSampleId, param.documentId,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples ids using the provided Filter.
     * @param param the request object
     */
    public matchDataSample(param: DataSampleApiMatchDataSampleRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.matchDataSample(param.filter,  options).toPromise();
    }

    /**
     * Link an attachment or update the attachment of a data sample
     * Add or update the attachment of a DataSample
     * @param param the request object
     */
    public setDataSampleAttachment(param: DataSampleApiSetDataSampleAttachmentRequest, options?: Configuration): Promise<Document> {
        return this.api.setDataSampleAttachment(param.dataSampleId, param.body, param.documentName, param.documentVersion, param.documentExternalUuid, param.documentLanguage,  options).toPromise();
    }

}

import { ObservableHealthcareElementApi } from "./ObservableAPI";
import { HealthcareElementApiRequestFactory, HealthcareElementApiResponseProcessor} from "../apis/HealthcareElementApi";

export interface HealthcareElementApiCreateOrModifyHealthcareElementRequest {
    /**
     * 
     * @type HealthcareElement
     * @memberof HealthcareElementApicreateOrModifyHealthcareElement
     */
    healthcareElement: HealthcareElement
}

export interface HealthcareElementApiCreateOrModifyHealthcareElementsRequest {
    /**
     * 
     * @type Array&lt;HealthcareElement&gt;
     * @memberof HealthcareElementApicreateOrModifyHealthcareElements
     */
    healthcareElement: Array<HealthcareElement>
}

export interface HealthcareElementApiDeleteHealthcareElementRequest {
    /**
     * 
     * @type string
     * @memberof HealthcareElementApideleteHealthcareElement
     */
    id: string
}

export interface HealthcareElementApiFilterHealthcareElementRequest {
    /**
     * 
     * @type Filter
     * @memberof HealthcareElementApifilterHealthcareElement
     */
    filter: Filter
}

export interface HealthcareElementApiGetHealthcareElementRequest {
    /**
     * 
     * @type string
     * @memberof HealthcareElementApigetHealthcareElement
     */
    id: string
}

export interface HealthcareElementApiMatchHealthcareElementRequest {
    /**
     * 
     * @type Filter
     * @memberof HealthcareElementApimatchHealthcareElement
     */
    filter: Filter
}

export class ObjectHealthcareElementApi {
    private api: ObservableHealthcareElementApi

    public constructor(configuration: Configuration, requestFactory?: HealthcareElementApiRequestFactory, responseProcessor?: HealthcareElementApiResponseProcessor) {
        this.api = new ObservableHealthcareElementApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a Healthcare Element
     * @param param the request object
     */
    public createOrModifyHealthcareElement(param: HealthcareElementApiCreateOrModifyHealthcareElementRequest, options?: Configuration): Promise<HealthcareElement> {
        return this.api.createOrModifyHealthcareElement(param.healthcareElement,  options).toPromise();
    }

    /**
     * Create a Healthcare Element
     * @param param the request object
     */
    public createOrModifyHealthcareElements(param: HealthcareElementApiCreateOrModifyHealthcareElementsRequest, options?: Configuration): Promise<Array<HealthcareElement>> {
        return this.api.createOrModifyHealthcareElements(param.healthcareElement,  options).toPromise();
    }

    /**
     * Delete a Healthcare Element
     * @param param the request object
     */
    public deleteHealthcareElement(param: HealthcareElementApiDeleteHealthcareElementRequest, options?: Configuration): Promise<string> {
        return this.api.deleteHealthcareElement(param.id,  options).toPromise();
    }

    /**
     * Find Healthcare Elements using a filter
     * @param param the request object
     */
    public filterHealthcareElement(param: HealthcareElementApiFilterHealthcareElementRequest, options?: Configuration): Promise<PaginatedListHealthcareElement> {
        return this.api.filterHealthcareElement(param.filter,  options).toPromise();
    }

    /**
     * Get a Healthcare Element
     * @param param the request object
     */
    public getHealthcareElement(param: HealthcareElementApiGetHealthcareElementRequest, options?: Configuration): Promise<HealthcareElement> {
        return this.api.getHealthcareElement(param.id,  options).toPromise();
    }

    /**
     * Find Healthcare Elements using a filter
     * @param param the request object
     */
    public matchHealthcareElement(param: HealthcareElementApiMatchHealthcareElementRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.matchHealthcareElement(param.filter,  options).toPromise();
    }

}

import { ObservableHealthcareProfessionalApi } from "./ObservableAPI";
import { HealthcareProfessionalApiRequestFactory, HealthcareProfessionalApiResponseProcessor} from "../apis/HealthcareProfessionalApi";

export interface HealthcareProfessionalApiCreateOrModifyHealthcareProfessionalRequest {
    /**
     * Thehealthcare professional that must be created in the database.
     * @type HealthcareProfessional
     * @memberof HealthcareProfessionalApicreateOrModifyHealthcareProfessional
     */
    healthcareProfessional: HealthcareProfessional
}

export interface HealthcareProfessionalApiDeleteHealthcareProfessionalRequest {
    /**
     * The UUID that uniquely identifies thehealthcare professional to be deleted.
     * @type string
     * @memberof HealthcareProfessionalApideleteHealthcareProfessional
     */
    hcpId: string
}

export interface HealthcareProfessionalApiFilterHealthcareProfessionalByRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof HealthcareProfessionalApifilterHealthcareProfessionalBy
     */
    filter: Filter
    /**
     * The id of the first Healthcare professional in the next page
     * @type string
     * @memberof HealthcareProfessionalApifilterHealthcareProfessionalBy
     */
    nextHcpId?: string
    /**
     * The number of healthcare professionals to return in the queried page
     * @type number
     * @memberof HealthcareProfessionalApifilterHealthcareProfessionalBy
     */
    limit?: number
}

export interface HealthcareProfessionalApiGetHealthcareProfessionalRequest {
    /**
     * The UUID that identifies thehealthcare professional uniquely
     * @type string
     * @memberof HealthcareProfessionalApigetHealthcareProfessional
     */
    hcpId: string
}

export interface HealthcareProfessionalApiMatchHealthcareProfessionalByRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof HealthcareProfessionalApimatchHealthcareProfessionalBy
     */
    filter: Filter
}

export class ObjectHealthcareProfessionalApi {
    private api: ObservableHealthcareProfessionalApi

    public constructor(configuration: Configuration, requestFactory?: HealthcareProfessionalApiRequestFactory, responseProcessor?: HealthcareProfessionalApiResponseProcessor) {
        this.api = new ObservableHealthcareProfessionalApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Ahealthcare professional must have a login, an email or a mobilePhone defined, ahealthcare professional should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an healthcare professional, you must ensure that the rev obtained when getting or creating thehealthcare professional is present as the rev is used to guarantee that thehealthcare professional has not been modified by a third party.
     * Create a newhealthcare professional or modify an existing one.
     * @param param the request object
     */
    public createOrModifyHealthcareProfessional(param: HealthcareProfessionalApiCreateOrModifyHealthcareProfessionalRequest, options?: Configuration): Promise<HealthcareProfessional> {
        return this.api.createOrModifyHealthcareProfessional(param.healthcareProfessional,  options).toPromise();
    }

    /**
     * Deletes thehealthcare professional identified by the provided unique hcpId.
     * Delete an existing healthcare professional.
     * @param param the request object
     */
    public deleteHealthcareProfessional(param: HealthcareProfessionalApiDeleteHealthcareProfessionalRequest, options?: Configuration): Promise<string> {
        return this.api.deleteHealthcareProfessional(param.hcpId,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcareProfessionalsFilter and HealthcarProfessionalsByIdsFilter. This method returns a paginated list of healthcare professionals (with a cursor that lets you query the following items).
     * Load healthcare professionals from the database by filtering them using the provided Filter.
     * @param param the request object
     */
    public filterHealthcareProfessionalBy(param: HealthcareProfessionalApiFilterHealthcareProfessionalByRequest, options?: Configuration): Promise<PaginatedListHealthcareProfessional> {
        return this.api.filterHealthcareProfessionalBy(param.filter, param.nextHcpId, param.limit,  options).toPromise();
    }

    /**
     * Eachhealthcare professional is uniquely identified by ahealthcare professional id. Thehealthcare professional id is a UUID. This hcpId is the preferred method to retrieve one specific healthcare professional.
     * Get a Healthcare professional by id.
     * @param param the request object
     */
    public getHealthcareProfessional(param: HealthcareProfessionalApiGetHealthcareProfessionalRequest, options?: Configuration): Promise<HealthcareProfessional> {
        return this.api.getHealthcareProfessional(param.hcpId,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcare professionalsFilter and Healthcare professionalsByIdsFilter. This method returns the list of the ids of the healthcare professionals matching the filter.
     * Loadhealthcare professional ids from the database by filtering them using the provided Filter.
     * @param param the request object
     */
    public matchHealthcareProfessionalBy(param: HealthcareProfessionalApiMatchHealthcareProfessionalByRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.matchHealthcareProfessionalBy(param.filter,  options).toPromise();
    }

}

import { ObservableMedicalDeviceApi } from "./ObservableAPI";
import { MedicalDeviceApiRequestFactory, MedicalDeviceApiResponseProcessor} from "../apis/MedicalDeviceApi";

export interface MedicalDeviceApiCreateOrModifyMedicalDeviceRequest {
    /**
     * 
     * @type MedicalDevice
     * @memberof MedicalDeviceApicreateOrModifyMedicalDevice
     */
    medicalDevice: MedicalDevice
}

export interface MedicalDeviceApiCreateOrModifyMedicalDevicesRequest {
    /**
     * 
     * @type Array&lt;MedicalDevice&gt;
     * @memberof MedicalDeviceApicreateOrModifyMedicalDevices
     */
    medicalDevice: Array<MedicalDevice>
}

export interface MedicalDeviceApiDeleteMedicalDeviceRequest {
    /**
     * 
     * @type string
     * @memberof MedicalDeviceApideleteMedicalDevice
     */
    medicalDeviceId: string
}

export interface MedicalDeviceApiDeleteMedicalDevicesRequest {
    /**
     * 
     * @type Array&lt;string&gt;
     * @memberof MedicalDeviceApideleteMedicalDevices
     */
    requestBody: Array<string>
}

export interface MedicalDeviceApiFilterMedicalDevicesRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof MedicalDeviceApifilterMedicalDevices
     */
    filter: Filter
    /**
     * The id of the first device in the next page
     * @type string
     * @memberof MedicalDeviceApifilterMedicalDevices
     */
    nextDeviceId?: string
    /**
     * The number of devices to return in the queried page
     * @type number
     * @memberof MedicalDeviceApifilterMedicalDevices
     */
    limit?: number
}

export interface MedicalDeviceApiGetMedicalDeviceRequest {
    /**
     * 
     * @type string
     * @memberof MedicalDeviceApigetMedicalDevice
     */
    medicalDeviceId: string
}

export interface MedicalDeviceApiMatchMedicalDevicesRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof MedicalDeviceApimatchMedicalDevices
     */
    filter: Filter
}

export class ObjectMedicalDeviceApi {
    private api: ObservableMedicalDeviceApi

    public constructor(configuration: Configuration, requestFactory?: MedicalDeviceApiRequestFactory, responseProcessor?: MedicalDeviceApiResponseProcessor) {
        this.api = new ObservableMedicalDeviceApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
     * Create or update a [MedicalDevice]
     * @param param the request object
     */
    public createOrModifyMedicalDevice(param: MedicalDeviceApiCreateOrModifyMedicalDeviceRequest, options?: Configuration): Promise<MedicalDevice> {
        return this.api.createOrModifyMedicalDevice(param.medicalDevice,  options).toPromise();
    }

    /**
     * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
     * Create or update a batch of [MedicalDevice]
     * @param param the request object
     */
    public createOrModifyMedicalDevices(param: MedicalDeviceApiCreateOrModifyMedicalDevicesRequest, options?: Configuration): Promise<Array<MedicalDevice>> {
        return this.api.createOrModifyMedicalDevices(param.medicalDevice,  options).toPromise();
    }

    /**
     * Deletes the medical device identified by the provided unique [medicalDeviceId].
     * Delete a [MedicalDevice]
     * @param param the request object
     */
    public deleteMedicalDevice(param: MedicalDeviceApiDeleteMedicalDeviceRequest, options?: Configuration): Promise<string> {
        return this.api.deleteMedicalDevice(param.medicalDeviceId,  options).toPromise();
    }

    /**
     * Deletes the batch of medical device identified by the provided [medicalDeviceIds].
     * Delete a batch of [MedicalDevice]
     * @param param the request object
     */
    public deleteMedicalDevices(param: MedicalDeviceApiDeleteMedicalDevicesRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.deleteMedicalDevices(param.requestBody,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns a paginated list of medical devices (with a cursor that lets you query the following items).
     * Load devices from the database by filtering them using the provided [filter].
     * @param param the request object
     */
    public filterMedicalDevices(param: MedicalDeviceApiFilterMedicalDevicesRequest, options?: Configuration): Promise<PaginatedListMedicalDevice> {
        return this.api.filterMedicalDevices(param.filter, param.nextDeviceId, param.limit,  options).toPromise();
    }

    /**
     * Each medical device is uniquely identified by a device id. The device id is a UUID. This [medicalDeviceId] is the preferred method to retrieve one specific device.
     * Get a Medical Device
     * @param param the request object
     */
    public getMedicalDevice(param: MedicalDeviceApiGetMedicalDeviceRequest, options?: Configuration): Promise<MedicalDevice> {
        return this.api.getMedicalDevice(param.medicalDeviceId,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns the list of the ids of the users matching the filter.
     * Load medical device ids from the database by filtering them using the provided Filter.
     * @param param the request object
     */
    public matchMedicalDevices(param: MedicalDeviceApiMatchMedicalDevicesRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.matchMedicalDevices(param.filter,  options).toPromise();
    }

}

import { ObservablePatientApi } from "./ObservableAPI";
import { PatientApiRequestFactory, PatientApiResponseProcessor} from "../apis/PatientApi";

export interface PatientApiCreateOrModifyPatientRequest {
    /**
     * 
     * @type Patient
     * @memberof PatientApicreateOrModifyPatient
     */
    patient: Patient
}

export interface PatientApiDeletePatientRequest {
    /**
     * 
     * @type string
     * @memberof PatientApideletePatient
     */
    patientId: string
}

export interface PatientApiFilterPatientsRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof PatientApifilterPatients
     */
    filter: Filter
    /**
     * The id of the first patient in the next page
     * @type string
     * @memberof PatientApifilterPatients
     */
    nextPatientId?: string
    /**
     * The number of patients to return in the queried page
     * @type number
     * @memberof PatientApifilterPatients
     */
    limit?: number
}

export interface PatientApiGetPatientRequest {
    /**
     * 
     * @type string
     * @memberof PatientApigetPatient
     */
    patientId: string
}

export interface PatientApiMatchPatientsRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof PatientApimatchPatients
     */
    filter: Filter
}

export class ObjectPatientApi {
    private api: ObservablePatientApi

    public constructor(configuration: Configuration, requestFactory?: PatientApiRequestFactory, responseProcessor?: PatientApiResponseProcessor) {
        this.api = new ObservablePatientApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * When modifying a patient, you must ensure that the rev obtained when getting or creating the patient is present as the rev is used to guarantee that the patient has not been modified by a third party.
     * Create or update a [Patient]
     * @param param the request object
     */
    public createOrModifyPatient(param: PatientApiCreateOrModifyPatientRequest, options?: Configuration): Promise<Patient> {
        return this.api.createOrModifyPatient(param.patient,  options).toPromise();
    }

    /**
     * Deletes the patient identified by the provided unique [patientId].
     * Delete a [Patient]
     * @param param the request object
     */
    public deletePatient(param: PatientApiDeletePatientRequest, options?: Configuration): Promise<string> {
        return this.api.deletePatient(param.patientId,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns a paginated list of patient (with a cursor that lets you query the following items).
     * Load patients from the database by filtering them using the provided [filter].
     * @param param the request object
     */
    public filterPatients(param: PatientApiFilterPatientsRequest, options?: Configuration): Promise<PaginatedListPatient> {
        return this.api.filterPatients(param.filter, param.nextPatientId, param.limit,  options).toPromise();
    }

    /**
     * Each patient is uniquely identified by a patient id. The patient id is a UUID. This [patientId] is the preferred method to retrieve one specific patient.
     * Get a [Patient]
     * @param param the request object
     */
    public getPatient(param: PatientApiGetPatientRequest, options?: Configuration): Promise<Patient> {
        return this.api.getPatient(param.patientId,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns the list of the ids of the users matching the [filter].
     * Load patient ids from the database by filtering them using the provided [filter].
     * @param param the request object
     */
    public matchPatients(param: PatientApiMatchPatientsRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.matchPatients(param.filter,  options).toPromise();
    }

}

import { ObservableUserApi } from "./ObservableAPI";
import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";

export interface UserApiCheckTokenValidityRequest {
    /**
     * The UUID that identifies the user uniquely
     * @type string
     * @memberof UserApicheckTokenValidity
     */
    userId: string
    /**
     * The token that will be checked
     * @type string
     * @memberof UserApicheckTokenValidity
     */
    token: string
}

export interface UserApiCreateOrModifyUserRequest {
    /**
     * The user that must be created in the database.
     * @type User
     * @memberof UserApicreateOrModifyUser
     */
    user: User
}

export interface UserApiCreateTokenRequest {
    /**
     * The UUID that identifies the user uniquely
     * @type string
     * @memberof UserApicreateToken
     */
    userId: string
}

export interface UserApiDeleteUserRequest {
    /**
     * The UUID that uniquely identifies the user to be deleted.
     * @type string
     * @memberof UserApideleteUser
     */
    userId: string
}

export interface UserApiFilterUsersRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof UserApifilterUsers
     */
    filter: Filter
    /**
     * The id of the first User in the next page
     * @type string
     * @memberof UserApifilterUsers
     */
    nextUserId?: string
    /**
     * The number of users to return in the queried page
     * @type number
     * @memberof UserApifilterUsers
     */
    limit?: number
}

export interface UserApiGetLoggedUserRequest {
}

export interface UserApiGetUserRequest {
    /**
     * The UUID that identifies the user uniquely
     * @type string
     * @memberof UserApigetUser
     */
    userId: string
}

export interface UserApiMatchUsersRequest {
    /**
     * The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @type Filter
     * @memberof UserApimatchUsers
     */
    filter: Filter
}

export class ObjectUserApi {
    private api: ObservableUserApi

    public constructor(configuration: Configuration, requestFactory?: UserApiRequestFactory, responseProcessor?: UserApiResponseProcessor) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Checks that the provided token is (still) valid for the provided user id (or user login).
     * Check token validity for a user.
     * @param param the request object
     */
    public checkTokenValidity(param: UserApiCheckTokenValidityRequest, options?: Configuration): Promise<boolean> {
        return this.api.checkTokenValidity(param.userId, param.token,  options).toPromise();
    }

    /**
     * A user must have a login, an email or a mobilePhone defined, a user should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an user, you must ensure that the rev obtained when getting or creating the user is present as the rev is used to guarantee that the user has not been modified by a third party.
     * Create a new user or modify an existing one.
     * @param param the request object
     */
    public createOrModifyUser(param: UserApiCreateOrModifyUserRequest, options?: Configuration): Promise<User> {
        return this.api.createOrModifyUser(param.user,  options).toPromise();
    }

    /**
     * A token is used to authenticate the user. It is just like a password but it is destined to be used by programs instead of humans. Tokens have a limited validity period (one month).
     * Create a token for a user.
     * @param param the request object
     */
    public createToken(param: UserApiCreateTokenRequest, options?: Configuration): Promise<string> {
        return this.api.createToken(param.userId,  options).toPromise();
    }

    /**
     * Deletes the user identified by the provided unique userId.
     * Delete an existing user.
     * @param param the request object
     */
    public deleteUser(param: UserApiDeleteUserRequest, options?: Configuration): Promise<string> {
        return this.api.deleteUser(param.userId,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns a paginated list of users (with a cursor that lets you query the following items).
     * Load users from the database by filtering them using the provided Filter.
     * @param param the request object
     */
    public filterUsers(param: UserApiFilterUsersRequest, options?: Configuration): Promise<PaginatedListUser> {
        return this.api.filterUsers(param.filter, param.nextUserId, param.limit,  options).toPromise();
    }

    /**
     * When you make a call to the server, an authentication token is used to identify you. This call returns the complete User object that corresponds to your authentication credentials.
     * Get the details of the logged User.
     * @param param the request object
     */
    public getLoggedUser(param: UserApiGetLoggedUserRequest = {}, options?: Configuration): Promise<User> {
        return this.api.getLoggedUser( options).toPromise();
    }

    /**
     * Each user is uniquely identified by a user id. The user id is a UUID. This userId is the preferred method to retrieve one specific user.
     * Get a User by id.
     * @param param the request object
     */
    public getUser(param: UserApiGetUserRequest, options?: Configuration): Promise<User> {
        return this.api.getUser(param.userId,  options).toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns the list of the ids of the users matching the filter.
     * Load user ids from the database by filtering them using the provided Filter.
     * @param param the request object
     */
    public matchUsers(param: UserApiMatchUsersRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.matchUsers(param.filter,  options).toPromise();
    }

}

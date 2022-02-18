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
import { ObservableCodingApi } from './ObservableAPI';

import { CodingApiRequestFactory, CodingApiResponseProcessor} from "../apis/CodingApi";
export class PromiseCodingApi {
    private api: ObservableCodingApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CodingApiRequestFactory,
        responseProcessor?: CodingApiResponseProcessor
    ) {
        this.api = new ObservableCodingApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * When modifying a coding, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
     * Create or update a [Coding]
     * @param coding 
     */
    public createOrModifyCoding(coding: Coding, _options?: Configuration): Promise<Coding> {
        const result = this.api.createOrModifyCoding(coding, _options);
        return result.toPromise();
    }

    /**
     * When modifying codings, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
     * Create or update a batch of [Coding]
     * @param coding 
     */
    public createOrModifyCodings(coding: Array<Coding>, _options?: Configuration): Promise<Array<Coding>> {
        const result = this.api.createOrModifyCodings(coding, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
     * Load codings from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextCodingId The id of the first coding in the next page
     * @param limit The number of codings to return in the queried page
     */
    public filterCoding(filter: Filter, nextCodingId?: string, limit?: number, _options?: Configuration): Promise<PaginatedListCoding> {
        const result = this.api.filterCoding(filter, nextCodingId, limit, _options);
        return result.toPromise();
    }

    /**
     * Each coding is uniquely identified by a coding id. The coding id is a UUID. This [codingId] is the preferred method to retrieve one specific coding.
     * Get a [Coding]
     * @param codingId 
     */
    public getCoding(codingId: string, _options?: Configuration): Promise<Coding> {
        const result = this.api.getCoding(codingId, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
     * Load coding ids from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    public matchCoding(filter: Filter, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.matchCoding(filter, _options);
        return result.toPromise();
    }


}



import { ObservableDataSampleApi } from './ObservableAPI';

import { DataSampleApiRequestFactory, DataSampleApiResponseProcessor} from "../apis/DataSampleApi";
export class PromiseDataSampleApi {
    private api: ObservableDataSampleApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DataSampleApiRequestFactory,
        responseProcessor?: DataSampleApiResponseProcessor
    ) {
        this.api = new ObservableDataSampleApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
     * Create or update a [DataSample] for a patient
     * @param patientId 
     * @param dataSample 
     */
    public createOrModifyDataSampleFor(patientId: string, dataSample: DataSample, _options?: Configuration): Promise<DataSample> {
        const result = this.api.createOrModifyDataSampleFor(patientId, dataSample, _options);
        return result.toPromise();
    }

    /**
     * All the provided data samples will be created in the same batch. If you are trying to update some data samples, then those ones need to come from the same batch.                  When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.                 
     * Create or update a batch of [DataSample] for a patient
     * @param patientId 
     * @param dataSample 
     */
    public createOrModifyDataSamplesFor(patientId: string, dataSample: Array<DataSample>, _options?: Configuration): Promise<Array<DataSample>> {
        const result = this.api.createOrModifyDataSamplesFor(patientId, dataSample, _options);
        return result.toPromise();
    }

    /**
     * Deletes an attachment, using its corresponding documentId
     * Delete an attachment of a DataSample
     * @param dataSampleId 
     * @param documentId 
     */
    public deleteAttachment(dataSampleId: string, documentId: string, _options?: Configuration): Promise<string> {
        const result = this.api.deleteAttachment(dataSampleId, documentId, _options);
        return result.toPromise();
    }

    /**
     * Deletes the data sample identified by the provided unique [dataSampleId].
     * Delete a [DataSample] by its id
     * @param dataSampleId 
     */
    public deleteDataSample(dataSampleId: string, _options?: Configuration): Promise<string> {
        const result = this.api.deleteDataSample(dataSampleId, _options);
        return result.toPromise();
    }

    /**
     * Deletes the batch of data samples identified by the provided [dataSampleIds]. The data samples to delete need to be part of the same batch
     * Delete a batch of [Data Samples]
     * @param requestBody 
     */
    public deleteDataSamples(requestBody: Array<string>, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.deleteDataSamples(requestBody, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    public filterDataSample(filter: Filter, _options?: Configuration): Promise<PaginatedListDataSample> {
        const result = this.api.filterDataSample(filter, _options);
        return result.toPromise();
    }

    /**
     * Each data sample is uniquely identified by a data sample id which is a UUID. This [dataSampleId] is the preferred method to retrieve one specific data sample.
     * Get a [DataSample] by its id
     * @param dataSampleId 
     */
    public getDataSample(dataSampleId: string, _options?: Configuration): Promise<DataSample> {
        const result = this.api.getDataSample(dataSampleId, _options);
        return result.toPromise();
    }

    /**
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the content of an attachment
     * Get attachment content of a DataSample
     * @param dataSampleId 
     * @param documentId 
     * @param attachmentId 
     */
    public getDataSampleAttachmentContent(dataSampleId: string, documentId: string, attachmentId: string, _options?: Configuration): Promise<HttpFile> {
        const result = this.api.getDataSampleAttachmentContent(dataSampleId, documentId, attachmentId, _options);
        return result.toPromise();
    }

    /**
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the document metadata information of an attachment
     * Get document metadata of a DataSample attachment
     * @param dataSampleId 
     * @param documentId 
     */
    public getDataSampleAttachmentDocument(dataSampleId: string, documentId: string, _options?: Configuration): Promise<Document> {
        const result = this.api.getDataSampleAttachmentDocument(dataSampleId, documentId, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples ids using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    public matchDataSample(filter: Filter, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.matchDataSample(filter, _options);
        return result.toPromise();
    }

    /**
     * Link an attachment or update the attachment of a data sample
     * Add or update the attachment of a DataSample
     * @param dataSampleId 
     * @param body 
     * @param documentName 
     * @param documentVersion 
     * @param documentExternalUuid 
     * @param documentLanguage 
     */
    public setDataSampleAttachment(dataSampleId: string, body: HttpFile, documentName?: string, documentVersion?: string, documentExternalUuid?: string, documentLanguage?: string, _options?: Configuration): Promise<Document> {
        const result = this.api.setDataSampleAttachment(dataSampleId, body, documentName, documentVersion, documentExternalUuid, documentLanguage, _options);
        return result.toPromise();
    }


}



import { ObservableHealthcareElementApi } from './ObservableAPI';

import { HealthcareElementApiRequestFactory, HealthcareElementApiResponseProcessor} from "../apis/HealthcareElementApi";
export class PromiseHealthcareElementApi {
    private api: ObservableHealthcareElementApi

    public constructor(
        configuration: Configuration,
        requestFactory?: HealthcareElementApiRequestFactory,
        responseProcessor?: HealthcareElementApiResponseProcessor
    ) {
        this.api = new ObservableHealthcareElementApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a Healthcare Element
     * @param healthcareElement 
     */
    public createOrModifyHealthcareElement(healthcareElement: HealthcareElement, _options?: Configuration): Promise<HealthcareElement> {
        const result = this.api.createOrModifyHealthcareElement(healthcareElement, _options);
        return result.toPromise();
    }

    /**
     * Create a Healthcare Element
     * @param healthcareElement 
     */
    public createOrModifyHealthcareElements(healthcareElement: Array<HealthcareElement>, _options?: Configuration): Promise<Array<HealthcareElement>> {
        const result = this.api.createOrModifyHealthcareElements(healthcareElement, _options);
        return result.toPromise();
    }

    /**
     * Delete a Healthcare Element
     * @param id 
     */
    public deleteHealthcareElement(id: string, _options?: Configuration): Promise<string> {
        const result = this.api.deleteHealthcareElement(id, _options);
        return result.toPromise();
    }

    /**
     * Find Healthcare Elements using a filter
     * @param filter 
     */
    public filterHealthcareElement(filter: Filter, _options?: Configuration): Promise<PaginatedListHealthcareElement> {
        const result = this.api.filterHealthcareElement(filter, _options);
        return result.toPromise();
    }

    /**
     * Get a Healthcare Element
     * @param id 
     */
    public getHealthcareElement(id: string, _options?: Configuration): Promise<HealthcareElement> {
        const result = this.api.getHealthcareElement(id, _options);
        return result.toPromise();
    }

    /**
     * Find Healthcare Elements using a filter
     * @param filter 
     */
    public matchHealthcareElement(filter: Filter, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.matchHealthcareElement(filter, _options);
        return result.toPromise();
    }


}



import { ObservableHealthcareProfessionalApi } from './ObservableAPI';

import { HealthcareProfessionalApiRequestFactory, HealthcareProfessionalApiResponseProcessor} from "../apis/HealthcareProfessionalApi";
export class PromiseHealthcareProfessionalApi {
    private api: ObservableHealthcareProfessionalApi

    public constructor(
        configuration: Configuration,
        requestFactory?: HealthcareProfessionalApiRequestFactory,
        responseProcessor?: HealthcareProfessionalApiResponseProcessor
    ) {
        this.api = new ObservableHealthcareProfessionalApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Ahealthcare professional must have a login, an email or a mobilePhone defined, ahealthcare professional should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an healthcare professional, you must ensure that the rev obtained when getting or creating thehealthcare professional is present as the rev is used to guarantee that thehealthcare professional has not been modified by a third party.
     * Create a newhealthcare professional or modify an existing one.
     * @param healthcareProfessional Thehealthcare professional that must be created in the database.
     */
    public createOrModifyHealthcareProfessional(healthcareProfessional: HealthcareProfessional, _options?: Configuration): Promise<HealthcareProfessional> {
        const result = this.api.createOrModifyHealthcareProfessional(healthcareProfessional, _options);
        return result.toPromise();
    }

    /**
     * Deletes thehealthcare professional identified by the provided unique hcpId.
     * Delete an existing healthcare professional.
     * @param hcpId The UUID that uniquely identifies thehealthcare professional to be deleted.
     */
    public deleteHealthcareProfessional(hcpId: string, _options?: Configuration): Promise<string> {
        const result = this.api.deleteHealthcareProfessional(hcpId, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcareProfessionalsFilter and HealthcarProfessionalsByIdsFilter. This method returns a paginated list of healthcare professionals (with a cursor that lets you query the following items).
     * Load healthcare professionals from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextHcpId The id of the first Healthcare professional in the next page
     * @param limit The number of healthcare professionals to return in the queried page
     */
    public filterHealthcareProfessionalBy(filter: Filter, nextHcpId?: string, limit?: number, _options?: Configuration): Promise<PaginatedListHealthcareProfessional> {
        const result = this.api.filterHealthcareProfessionalBy(filter, nextHcpId, limit, _options);
        return result.toPromise();
    }

    /**
     * Eachhealthcare professional is uniquely identified by ahealthcare professional id. Thehealthcare professional id is a UUID. This hcpId is the preferred method to retrieve one specific healthcare professional.
     * Get a Healthcare professional by id.
     * @param hcpId The UUID that identifies thehealthcare professional uniquely
     */
    public getHealthcareProfessional(hcpId: string, _options?: Configuration): Promise<HealthcareProfessional> {
        const result = this.api.getHealthcareProfessional(hcpId, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcare professionalsFilter and Healthcare professionalsByIdsFilter. This method returns the list of the ids of the healthcare professionals matching the filter.
     * Loadhealthcare professional ids from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    public matchHealthcareProfessionalBy(filter: Filter, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.matchHealthcareProfessionalBy(filter, _options);
        return result.toPromise();
    }


}



import { ObservableMedicalDeviceApi } from './ObservableAPI';

import { MedicalDeviceApiRequestFactory, MedicalDeviceApiResponseProcessor} from "../apis/MedicalDeviceApi";
export class PromiseMedicalDeviceApi {
    private api: ObservableMedicalDeviceApi

    public constructor(
        configuration: Configuration,
        requestFactory?: MedicalDeviceApiRequestFactory,
        responseProcessor?: MedicalDeviceApiResponseProcessor
    ) {
        this.api = new ObservableMedicalDeviceApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
     * Create or update a [MedicalDevice]
     * @param medicalDevice 
     */
    public createOrModifyMedicalDevice(medicalDevice: MedicalDevice, _options?: Configuration): Promise<MedicalDevice> {
        const result = this.api.createOrModifyMedicalDevice(medicalDevice, _options);
        return result.toPromise();
    }

    /**
     * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
     * Create or update a batch of [MedicalDevice]
     * @param medicalDevice 
     */
    public createOrModifyMedicalDevices(medicalDevice: Array<MedicalDevice>, _options?: Configuration): Promise<Array<MedicalDevice>> {
        const result = this.api.createOrModifyMedicalDevices(medicalDevice, _options);
        return result.toPromise();
    }

    /**
     * Deletes the medical device identified by the provided unique [medicalDeviceId].
     * Delete a [MedicalDevice]
     * @param medicalDeviceId 
     */
    public deleteMedicalDevice(medicalDeviceId: string, _options?: Configuration): Promise<string> {
        const result = this.api.deleteMedicalDevice(medicalDeviceId, _options);
        return result.toPromise();
    }

    /**
     * Deletes the batch of medical device identified by the provided [medicalDeviceIds].
     * Delete a batch of [MedicalDevice]
     * @param requestBody 
     */
    public deleteMedicalDevices(requestBody: Array<string>, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.deleteMedicalDevices(requestBody, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns a paginated list of medical devices (with a cursor that lets you query the following items).
     * Load devices from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextDeviceId The id of the first device in the next page
     * @param limit The number of devices to return in the queried page
     */
    public filterMedicalDevices(filter: Filter, nextDeviceId?: string, limit?: number, _options?: Configuration): Promise<PaginatedListMedicalDevice> {
        const result = this.api.filterMedicalDevices(filter, nextDeviceId, limit, _options);
        return result.toPromise();
    }

    /**
     * Each medical device is uniquely identified by a device id. The device id is a UUID. This [medicalDeviceId] is the preferred method to retrieve one specific device.
     * Get a Medical Device
     * @param medicalDeviceId 
     */
    public getMedicalDevice(medicalDeviceId: string, _options?: Configuration): Promise<MedicalDevice> {
        const result = this.api.getMedicalDevice(medicalDeviceId, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns the list of the ids of the users matching the filter.
     * Load medical device ids from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    public matchMedicalDevices(filter: Filter, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.matchMedicalDevices(filter, _options);
        return result.toPromise();
    }


}



import { ObservablePatientApi } from './ObservableAPI';

import { PatientApiRequestFactory, PatientApiResponseProcessor} from "../apis/PatientApi";
export class PromisePatientApi {
    private api: ObservablePatientApi

    public constructor(
        configuration: Configuration,
        requestFactory?: PatientApiRequestFactory,
        responseProcessor?: PatientApiResponseProcessor
    ) {
        this.api = new ObservablePatientApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * When modifying a patient, you must ensure that the rev obtained when getting or creating the patient is present as the rev is used to guarantee that the patient has not been modified by a third party.
     * Create or update a [Patient]
     * @param patient 
     */
    public createOrModifyPatient(patient: Patient, _options?: Configuration): Promise<Patient> {
        const result = this.api.createOrModifyPatient(patient, _options);
        return result.toPromise();
    }

    /**
     * Deletes the patient identified by the provided unique [patientId].
     * Delete a [Patient]
     * @param patientId 
     */
    public deletePatient(patientId: string, _options?: Configuration): Promise<string> {
        const result = this.api.deletePatient(patientId, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns a paginated list of patient (with a cursor that lets you query the following items).
     * Load patients from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextPatientId The id of the first patient in the next page
     * @param limit The number of patients to return in the queried page
     */
    public filterPatients(filter: Filter, nextPatientId?: string, limit?: number, _options?: Configuration): Promise<PaginatedListPatient> {
        const result = this.api.filterPatients(filter, nextPatientId, limit, _options);
        return result.toPromise();
    }

    /**
     * Each patient is uniquely identified by a patient id. The patient id is a UUID. This [patientId] is the preferred method to retrieve one specific patient.
     * Get a [Patient]
     * @param patientId 
     */
    public getPatient(patientId: string, _options?: Configuration): Promise<Patient> {
        const result = this.api.getPatient(patientId, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns the list of the ids of the users matching the [filter].
     * Load patient ids from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    public matchPatients(filter: Filter, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.matchPatients(filter, _options);
        return result.toPromise();
    }


}



import { ObservableUserApi } from './ObservableAPI';

import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";
export class PromiseUserApi {
    private api: ObservableUserApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UserApiRequestFactory,
        responseProcessor?: UserApiResponseProcessor
    ) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Checks that the provided token is (still) valid for the provided user id (or user login).
     * Check token validity for a user.
     * @param userId The UUID that identifies the user uniquely
     * @param token The token that will be checked
     */
    public checkTokenValidity(userId: string, token: string, _options?: Configuration): Promise<boolean> {
        const result = this.api.checkTokenValidity(userId, token, _options);
        return result.toPromise();
    }

    /**
     * A user must have a login, an email or a mobilePhone defined, a user should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an user, you must ensure that the rev obtained when getting or creating the user is present as the rev is used to guarantee that the user has not been modified by a third party.
     * Create a new user or modify an existing one.
     * @param user The user that must be created in the database.
     */
    public createOrModifyUser(user: User, _options?: Configuration): Promise<User> {
        const result = this.api.createOrModifyUser(user, _options);
        return result.toPromise();
    }

    /**
     * A token is used to authenticate the user. It is just like a password but it is destined to be used by programs instead of humans. Tokens have a limited validity period (one month).
     * Create a token for a user.
     * @param userId The UUID that identifies the user uniquely
     */
    public createToken(userId: string, _options?: Configuration): Promise<string> {
        const result = this.api.createToken(userId, _options);
        return result.toPromise();
    }

    /**
     * Deletes the user identified by the provided unique userId.
     * Delete an existing user.
     * @param userId The UUID that uniquely identifies the user to be deleted.
     */
    public deleteUser(userId: string, _options?: Configuration): Promise<string> {
        const result = this.api.deleteUser(userId, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns a paginated list of users (with a cursor that lets you query the following items).
     * Load users from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextUserId The id of the first User in the next page
     * @param limit The number of users to return in the queried page
     */
    public filterUsers(filter: Filter, nextUserId?: string, limit?: number, _options?: Configuration): Promise<PaginatedListUser> {
        const result = this.api.filterUsers(filter, nextUserId, limit, _options);
        return result.toPromise();
    }

    /**
     * When you make a call to the server, an authentication token is used to identify you. This call returns the complete User object that corresponds to your authentication credentials.
     * Get the details of the logged User.
     */
    public getLoggedUser(_options?: Configuration): Promise<User> {
        const result = this.api.getLoggedUser(_options);
        return result.toPromise();
    }

    /**
     * Each user is uniquely identified by a user id. The user id is a UUID. This userId is the preferred method to retrieve one specific user.
     * Get a User by id.
     * @param userId The UUID that identifies the user uniquely
     */
    public getUser(userId: string, _options?: Configuration): Promise<User> {
        const result = this.api.getUser(userId, _options);
        return result.toPromise();
    }

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns the list of the ids of the users matching the filter.
     * Load user ids from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    public matchUsers(filter: Filter, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.matchUsers(filter, _options);
        return result.toPromise();
    }


}




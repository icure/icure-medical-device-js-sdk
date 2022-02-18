
import { DataSample } from '../models/DataSample';
import { Document } from '../models/Document';
import { Filter } from '../models/Filter';
import { InlineResponse403 } from '../models/InlineResponse403';
import { PaginatedListDataSample } from '../models/PaginatedListDataSample';

  /**
  * no description
  */
  export interface DataSampleApi {

    /**
      * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
      * Create or update a [DataSample] for a patient
      * @param patientId 
      * @param dataSample 
    */
    createOrModifyDataSampleFor(patientId: string, dataSample: DataSample, ): Promise<DataSample >;
    /**
      * All the provided data samples will be created in the same batch. If you are trying to update some data samples, then those ones need to come from the same batch.                  When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.                 
      * Create or update a batch of [DataSample] for a patient
      * @param patientId 
      * @param dataSample 
    */
    createOrModifyDataSamplesFor(patientId: string, dataSample: Array<DataSample>, ): Promise<Array<DataSample> >;
    /**
      * Deletes an attachment, using its corresponding documentId
      * Delete an attachment of a DataSample
      * @param dataSampleId 
      * @param documentId 
    */
    deleteAttachment(dataSampleId: string, documentId: string, ): Promise<string >;
    /**
      * Deletes the data sample identified by the provided unique [dataSampleId].
      * Delete a [DataSample] by its id
      * @param dataSampleId 
    */
    deleteDataSample(dataSampleId: string, ): Promise<string >;
    /**
      * Deletes the batch of data samples identified by the provided [dataSampleIds]. The data samples to delete need to be part of the same batch
      * Delete a batch of [Data Samples]
      * @param requestBody 
    */
    deleteDataSamples(requestBody: Array<string>, ): Promise<Array<string> >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
      * Find data samples using the provided [filter].
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
    */
    filterDataSample(filter: Filter, ): Promise<PaginatedListDataSample >;
    /**
      * Each data sample is uniquely identified by a data sample id which is a UUID. This [dataSampleId] is the preferred method to retrieve one specific data sample.
      * Get a [DataSample] by its id
      * @param dataSampleId 
    */
    getDataSample(dataSampleId: string, ): Promise<DataSample >;
    /**
      * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the content of an attachment
      * Get attachment content of a DataSample
      * @param dataSampleId 
      * @param documentId 
      * @param attachmentId 
    */
    getDataSampleAttachmentContent(dataSampleId: string, documentId: string, attachmentId: string, ): Promise<HttpFile >;
    /**
      * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the document metadata information of an attachment
      * Get document metadata of a DataSample attachment
      * @param dataSampleId 
      * @param documentId 
    */
    getDataSampleAttachmentDocument(dataSampleId: string, documentId: string, ): Promise<Document >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
      * Find data samples ids using the provided Filter.
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
    */
    matchDataSample(filter: Filter, ): Promise<Array<string> >;
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
    setDataSampleAttachment(dataSampleId: string, body: HttpFile, documentName?: string, documentVersion?: string, documentExternalUuid?: string, documentLanguage?: string, ): Promise<Document >;
    }

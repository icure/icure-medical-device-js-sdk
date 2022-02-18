# .DataSampleApi

All URIs are relative to *http://127.0.0.1:8912*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createOrModifyDataSampleFor**](DataSampleApi.md#createOrModifyDataSampleFor) | **PUT** /rest/v2/data/sample/for/{patientId} | Create or update a [DataSample] for a patient
[**createOrModifyDataSamplesFor**](DataSampleApi.md#createOrModifyDataSamplesFor) | **PUT** /rest/v2/data/sample/batch/for/{patientId} | Create or update a batch of [DataSample] for a patient
[**deleteAttachment**](DataSampleApi.md#deleteAttachment) | **DELETE** /rest/v2/data/sample/{dataSampleId}/attachment/{documentId} | Delete an attachment of a DataSample
[**deleteDataSample**](DataSampleApi.md#deleteDataSample) | **DELETE** /rest/v2/data/sample/{dataSampleId} | Delete a [DataSample] by its id
[**deleteDataSamples**](DataSampleApi.md#deleteDataSamples) | **POST** /rest/v2/data/sample/batch | Delete a batch of [Data Samples]
[**filterDataSample**](DataSampleApi.md#filterDataSample) | **POST** /rest/v2/data/sample/filter | Find data samples using the provided [filter].
[**getDataSample**](DataSampleApi.md#getDataSample) | **GET** /rest/v2/data/sample/{dataSampleId} | Get a [DataSample] by its id
[**getDataSampleAttachmentContent**](DataSampleApi.md#getDataSampleAttachmentContent) | **GET** /rest/v2/data/sample/{dataSampleId}/attachment/{documentId}/{attachmentId} | Get attachment content of a DataSample
[**getDataSampleAttachmentDocument**](DataSampleApi.md#getDataSampleAttachmentDocument) | **GET** /rest/v2/data/sample/{dataSampleId}/attachment/{documentId} | Get document metadata of a DataSample attachment
[**matchDataSample**](DataSampleApi.md#matchDataSample) | **POST** /rest/v2/data/sample/match | Find data samples ids using the provided Filter.
[**setDataSampleAttachment**](DataSampleApi.md#setDataSampleAttachment) | **PUT** /rest/v2/data/sample/{dataSampleId}/attachment | Add or update the attachment of a DataSample


# **createOrModifyDataSampleFor**
> DataSample createOrModifyDataSampleFor(dataSample)

When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiCreateOrModifyDataSampleForRequest = {
  // string
  patientId: "patientId_example",
  // DataSample
  dataSample: {
    id: "id_example",
    transactionId: "transactionId_example",
    identifier: [
      {
        id: "id_example",
        assigner: "assigner_example",
        start: "start_example",
        end: "end_example",
        system: "system_example",
        type: {
          id: "id_example",
          type: "type_example",
          code: "code_example",
          version: "version_example",
        },
        use: "use_example",
        value: "value_example",
      },
    ],
    batchId: "batchId_example",
    healthElementsIds: [
      "healthElementsIds_example",
    ],
    canvasesIds: [
      "canvasesIds_example",
    ],
    index: 1,
    content: {
      "key": {
        stringValue: "stringValue_example",
        numberValue: 3.14,
        booleanValue: true,
        instantValue: new Date('1970-01-01T00:00:00.00Z'),
        fuzzyDateValue: 1,
        binaryValue: 'YQ==',
        documentId: "documentId_example",
        measureValue: {
          value: 3.14,
          min: 3.14,
          max: 3.14,
          ref: 3.14,
          severity: 1,
          severityCode: "severityCode_example",
          evolution: 1,
          unit: "unit_example",
          unitCodes: [
            {
              id: "id_example",
              type: "type_example",
              code: "code_example",
              version: "version_example",
            },
          ],
          comment: "comment_example",
          comparator: "comparator_example",
        },
        timeSeries: {
          fields: [
            "fields_example",
          ],
          samples: [
            [
              3.14,
            ],
          ],
          min: [
            3.14,
          ],
          max: [
            3.14,
          ],
          mean: [
            3.14,
          ],
          median: [
            3.14,
          ],
          variance: [
            3.14,
          ],
        },
        compoundValue: [
          ,
        ],
        ratio: [
          {
            value: 3.14,
            min: 3.14,
            max: 3.14,
            ref: 3.14,
            severity: 1,
            severityCode: "severityCode_example",
            evolution: 1,
            unit: "unit_example",
            unitCodes: [
              {
                id: "id_example",
                type: "type_example",
                code: "code_example",
                version: "version_example",
              },
            ],
            comment: "comment_example",
            comparator: "comparator_example",
          },
        ],
        range: [
          {
            value: 3.14,
            min: 3.14,
            max: 3.14,
            ref: 3.14,
            severity: 1,
            severityCode: "severityCode_example",
            evolution: 1,
            unit: "unit_example",
            unitCodes: [
              {
                id: "id_example",
                type: "type_example",
                code: "code_example",
                version: "version_example",
              },
            ],
            comment: "comment_example",
            comparator: "comparator_example",
          },
        ],
      },
    },
    valueDate: 1,
    openingDate: 1,
    closingDate: 1,
    created: 1,
    modified: 1,
    endOfLife: 1,
    author: "author_example",
    responsible: "responsible_example",
    comment: "comment_example",
    qualifiedLinks: {
      "key": 
        key: "key_example",
      ,
    },
    codes: [
      {
        id: "id_example",
        type: "type_example",
        code: "code_example",
        version: "version_example",
      },
    ],
    labels: [
      {
        id: "id_example",
        type: "type_example",
        code: "code_example",
        version: "version_example",
      },
    ],
  },
};

apiInstance.createOrModifyDataSampleFor(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dataSample** | **DataSample**|  |
 **patientId** | [**string**] |  | defaults to undefined


### Return type

**DataSample**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modified data sample as a [DataSample] object, with updated information. |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |
**400** | May happen in one of the following cases :                      - You provided a patientId that does not correspond to any existing [Patient];                     - You provided a batchId that does not correspond to any existing batch;                      - You provided a batchId that does not correspond to the batch of the updated data sample;                      |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createOrModifyDataSamplesFor**
> Array<DataSample> createOrModifyDataSamplesFor(dataSample)

All the provided data samples will be created in the same batch. If you are trying to update some data samples, then those ones need to come from the same batch.                  When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.                 

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiCreateOrModifyDataSamplesForRequest = {
  // string
  patientId: "patientId_example",
  // Array<DataSample>
  dataSample: [
    {
      id: "id_example",
      transactionId: "transactionId_example",
      identifier: [
        {
          id: "id_example",
          assigner: "assigner_example",
          start: "start_example",
          end: "end_example",
          system: "system_example",
          type: {
            id: "id_example",
            type: "type_example",
            code: "code_example",
            version: "version_example",
          },
          use: "use_example",
          value: "value_example",
        },
      ],
      batchId: "batchId_example",
      healthElementsIds: [
        "healthElementsIds_example",
      ],
      canvasesIds: [
        "canvasesIds_example",
      ],
      index: 1,
      content: {
        "key": {
          stringValue: "stringValue_example",
          numberValue: 3.14,
          booleanValue: true,
          instantValue: new Date('1970-01-01T00:00:00.00Z'),
          fuzzyDateValue: 1,
          binaryValue: 'YQ==',
          documentId: "documentId_example",
          measureValue: {
            value: 3.14,
            min: 3.14,
            max: 3.14,
            ref: 3.14,
            severity: 1,
            severityCode: "severityCode_example",
            evolution: 1,
            unit: "unit_example",
            unitCodes: [
              {
                id: "id_example",
                type: "type_example",
                code: "code_example",
                version: "version_example",
              },
            ],
            comment: "comment_example",
            comparator: "comparator_example",
          },
          timeSeries: {
            fields: [
              "fields_example",
            ],
            samples: [
              [
                3.14,
              ],
            ],
            min: [
              3.14,
            ],
            max: [
              3.14,
            ],
            mean: [
              3.14,
            ],
            median: [
              3.14,
            ],
            variance: [
              3.14,
            ],
          },
          compoundValue: [],
          ratio: [
            {
              value: 3.14,
              min: 3.14,
              max: 3.14,
              ref: 3.14,
              severity: 1,
              severityCode: "severityCode_example",
              evolution: 1,
              unit: "unit_example",
              unitCodes: [
                {
                  id: "id_example",
                  type: "type_example",
                  code: "code_example",
                  version: "version_example",
                },
              ],
              comment: "comment_example",
              comparator: "comparator_example",
            },
          ],
          range: [
            {
              value: 3.14,
              min: 3.14,
              max: 3.14,
              ref: 3.14,
              severity: 1,
              severityCode: "severityCode_example",
              evolution: 1,
              unit: "unit_example",
              unitCodes: [
                {
                  id: "id_example",
                  type: "type_example",
                  code: "code_example",
                  version: "version_example",
                },
              ],
              comment: "comment_example",
              comparator: "comparator_example",
            },
          ],
        },
      },
      valueDate: 1,
      openingDate: 1,
      closingDate: 1,
      created: 1,
      modified: 1,
      endOfLife: 1,
      author: "author_example",
      responsible: "responsible_example",
      comment: "comment_example",
      qualifiedLinks: {
        "key": 
          key: "key_example",
        ,
      },
      codes: [
        {
          id: "id_example",
          type: "type_example",
          code: "code_example",
          version: "version_example",
        },
      ],
      labels: [
        {
          id: "id_example",
          type: "type_example",
          code: "code_example",
          version: "version_example",
        },
      ],
    },
  ],
};

apiInstance.createOrModifyDataSamplesFor(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dataSample** | **Array<DataSample>**|  |
 **patientId** | [**string**] |  | defaults to undefined


### Return type

**Array<DataSample>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modified data sample as a [DataSample] object, with updated information. |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |
**400** | May happen in one of the following cases :                      - You provided a patientId that does not correspond to any existing [Patient];                     - You provided a batchId that does not correspond to any existing batch;                      - You provided a batchId that does not correspond to the batch of the updated data sample;                     - You provided data samples coming from different batches : If you want to add new data samples in an existing batch, do not forget to refer the batch id for the new ones as well;                     - You tried to create / update more than 1000 data samples (including the ones contained in compound values) : iCure can&#39;t process more than 1000 data samples by batch;                         |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteAttachment**
> string deleteAttachment()

Deletes an attachment, using its corresponding documentId

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiDeleteAttachmentRequest = {
  // string
  dataSampleId: "dataSampleId_example",
  // string
  documentId: "documentId_example",
};

apiInstance.deleteAttachment(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dataSampleId** | [**string**] |  | defaults to undefined
 **documentId** | [**string**] |  | defaults to undefined


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the id of the deleted attachment |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteDataSample**
> string deleteDataSample()

Deletes the data sample identified by the provided unique [dataSampleId].

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiDeleteDataSampleRequest = {
  // string
  dataSampleId: "dataSampleId_example",
};

apiInstance.deleteDataSample(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dataSampleId** | [**string**] |  | defaults to undefined


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the id of the deleted data sample. |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteDataSamples**
> Array<string> deleteDataSamples(requestBody)

Deletes the batch of data samples identified by the provided [dataSampleIds]. The data samples to delete need to be part of the same batch

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiDeleteDataSamplesRequest = {
  // Array<string>
  requestBody: [
    "requestBody_example",
  ],
};

apiInstance.deleteDataSamples(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestBody** | **Array<string>**|  |


### Return type

**Array<string>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the ids of deleted objects |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |
**400** | if you tried to delete data samples from different batches |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **filterDataSample**
> PaginatedListDataSample filterDataSample(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiFilterDataSampleRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
};

apiInstance.filterDataSample(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **Filter**| The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |


### Return type

**PaginatedListDataSample**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns a PaginatedList of [DataSample]. |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDataSample**
> DataSample getDataSample()

Each data sample is uniquely identified by a data sample id which is a UUID. This [dataSampleId] is the preferred method to retrieve one specific data sample.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiGetDataSampleRequest = {
  // string
  dataSampleId: "dataSampleId_example",
};

apiInstance.getDataSample(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dataSampleId** | [**string**] |  | defaults to undefined


### Return type

**DataSample**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the fetched data sample as a [DataSample] object |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no data sample corresponding to the provided [dataSampleId]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDataSampleAttachmentContent**
> HttpFile getDataSampleAttachmentContent()

Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the content of an attachment

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiGetDataSampleAttachmentContentRequest = {
  // string
  dataSampleId: "dataSampleId_example",
  // string
  documentId: "documentId_example",
  // string
  attachmentId: "attachmentId_example",
};

apiInstance.getDataSampleAttachmentContent(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dataSampleId** | [**string**] |  | defaults to undefined
 **documentId** | [**string**] |  | defaults to undefined
 **attachmentId** | [**string**] |  | defaults to undefined


### Return type

**HttpFile**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/octet-stream


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the fetched metadata as a flow of [DataBuffer] |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no data sample or no attachment corresponding to the provided [dataSampleId], [documentId] and [attachmentId]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDataSampleAttachmentDocument**
> Document getDataSampleAttachmentDocument()

Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the document metadata information of an attachment

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiGetDataSampleAttachmentDocumentRequest = {
  // string
  dataSampleId: "dataSampleId_example",
  // string
  documentId: "documentId_example",
};

apiInstance.getDataSampleAttachmentDocument(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dataSampleId** | [**string**] |  | defaults to undefined
 **documentId** | [**string**] |  | defaults to undefined


### Return type

**Document**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the fetched metadata as a [Document] object |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no data sample or no attachment corresponding to the provided [dataSampleId] and [attachmentId]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **matchDataSample**
> Array<string> matchDataSample(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiMatchDataSampleRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
};

apiInstance.matchDataSample(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **Filter**| The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |


### Return type

**Array<string>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns a list of all data sample ids matching the filter. |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **setDataSampleAttachment**
> Document setDataSampleAttachment(body)

Link an attachment or update the attachment of a data sample

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .DataSampleApi(configuration);

let body:.DataSampleApiSetDataSampleAttachmentRequest = {
  // string
  dataSampleId: "dataSampleId_example",
  // HttpFile
  body: { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
  // string (optional)
  documentName: "documentName_example",
  // string (optional)
  documentVersion: "documentVersion_example",
  // string (optional)
  documentExternalUuid: "documentExternalUuid_example",
  // string (optional)
  documentLanguage: "documentLanguage_example",
};

apiInstance.setDataSampleAttachment(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **HttpFile**|  |
 **dataSampleId** | [**string**] |  | defaults to undefined
 **documentName** | [**string**] |  | (optional) defaults to undefined
 **documentVersion** | [**string**] |  | (optional) defaults to undefined
 **documentExternalUuid** | [**string**] |  | (optional) defaults to undefined
 **documentLanguage** | [**string**] |  | (optional) defaults to undefined


### Return type

**Document**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modified attachment as a [Document] object, with updated information |  -  |
**403** | if you make this call without providing or (by providing an invalid) authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no data sample corresponding to the provided [dataSampleId]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)



# .HealthcareElementApi

All URIs are relative to *http://127.0.0.1:8912*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createOrModifyHealthcareElement**](HealthcareElementApi.md#createOrModifyHealthcareElement) | **PUT** /rest/v2/hce | Create a Healthcare Element
[**createOrModifyHealthcareElements**](HealthcareElementApi.md#createOrModifyHealthcareElements) | **PUT** /rest/v2/hce/batch | Create a Healthcare Element
[**deleteHealthcareElement**](HealthcareElementApi.md#deleteHealthcareElement) | **DELETE** /rest/v2/hce/{id} | Delete a Healthcare Element
[**filterHealthcareElement**](HealthcareElementApi.md#filterHealthcareElement) | **POST** /rest/v2/hce/filter | Find Healthcare Elements using a filter
[**getHealthcareElement**](HealthcareElementApi.md#getHealthcareElement) | **GET** /rest/v2/hce/{id} | Get a Healthcare Element
[**matchHealthcareElement**](HealthcareElementApi.md#matchHealthcareElement) | **POST** /rest/v2/hce/match | Find Healthcare Elements using a filter


# **createOrModifyHealthcareElement**
> HealthcareElement createOrModifyHealthcareElement(healthcareElement)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareElementApi(configuration);

let body:.HealthcareElementApiCreateOrModifyHealthcareElementRequest = {
  // HealthcareElement
  healthcareElement: {
    id: "id_example",
    identifiers: [
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
    rev: "rev_example",
    created: 1,
    modified: 1,
    author: "author_example",
    responsible: "responsible_example",
    medicalLocationId: "medicalLocationId_example",
    tags: [
      {
        id: "id_example",
        type: "type_example",
        code: "code_example",
        version: "version_example",
      },
    ],
    codes: [
      {
        id: "id_example",
        type: "type_example",
        code: "code_example",
        version: "version_example",
      },
    ],
    endOfLife: 1,
    deletionDate: 1,
    healthElementId: "healthElementId_example",
    valueDate: 1,
    openingDate: 1,
    closingDate: 1,
    description: "description_example",
    note: "note_example",
    systemMetaData: {
      secretForeignKeys: [
        "secretForeignKeys_example",
      ],
      cryptedForeignKeys: {
        "key": [
          {
            tags: [
              "tags_example",
            ],
            owner: "owner_example",
            delegatedTo: "delegatedTo_example",
            key: "key_example",
          },
        ],
      },
      delegations: {
        "key": [
          {
            tags: [
              "tags_example",
            ],
            owner: "owner_example",
            delegatedTo: "delegatedTo_example",
            key: "key_example",
          },
        ],
      },
      encryptionKeys: {
        "key": [
          {
            tags: [
              "tags_example",
            ],
            owner: "owner_example",
            delegatedTo: "delegatedTo_example",
            key: "key_example",
          },
        ],
      },
    },
  },
};

apiInstance.createOrModifyHealthcareElement(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **healthcareElement** | **HealthcareElement**|  |


### Return type

**HealthcareElement**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createOrModifyHealthcareElements**
> Array<HealthcareElement> createOrModifyHealthcareElements(healthcareElement)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareElementApi(configuration);

let body:.HealthcareElementApiCreateOrModifyHealthcareElementsRequest = {
  // Array<HealthcareElement>
  healthcareElement: [
    {
      id: "id_example",
      identifiers: [
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
      rev: "rev_example",
      created: 1,
      modified: 1,
      author: "author_example",
      responsible: "responsible_example",
      medicalLocationId: "medicalLocationId_example",
      tags: [
        {
          id: "id_example",
          type: "type_example",
          code: "code_example",
          version: "version_example",
        },
      ],
      codes: [
        {
          id: "id_example",
          type: "type_example",
          code: "code_example",
          version: "version_example",
        },
      ],
      endOfLife: 1,
      deletionDate: 1,
      healthElementId: "healthElementId_example",
      valueDate: 1,
      openingDate: 1,
      closingDate: 1,
      description: "description_example",
      note: "note_example",
      systemMetaData: {
        secretForeignKeys: [
          "secretForeignKeys_example",
        ],
        cryptedForeignKeys: {
          "key": [
            {
              tags: [
                "tags_example",
              ],
              owner: "owner_example",
              delegatedTo: "delegatedTo_example",
              key: "key_example",
            },
          ],
        },
        delegations: {
          "key": [
            {
              tags: [
                "tags_example",
              ],
              owner: "owner_example",
              delegatedTo: "delegatedTo_example",
              key: "key_example",
            },
          ],
        },
        encryptionKeys: {
          "key": [
            {
              tags: [
                "tags_example",
              ],
              owner: "owner_example",
              delegatedTo: "delegatedTo_example",
              key: "key_example",
            },
          ],
        },
      },
    },
  ],
};

apiInstance.createOrModifyHealthcareElements(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **healthcareElement** | **Array<HealthcareElement>**|  |


### Return type

**Array<HealthcareElement>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteHealthcareElement**
> string deleteHealthcareElement()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareElementApi(configuration);

let body:.HealthcareElementApiDeleteHealthcareElementRequest = {
  // string
  id: "id_example",
};

apiInstance.deleteHealthcareElement(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


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
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **filterHealthcareElement**
> PaginatedListHealthcareElement filterHealthcareElement(filter)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareElementApi(configuration);

let body:.HealthcareElementApiFilterHealthcareElementRequest = {
  // Filter
  filter: {
    description: "description_example",
  },
};

apiInstance.filterHealthcareElement(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **Filter**|  |


### Return type

**PaginatedListHealthcareElement**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getHealthcareElement**
> HealthcareElement getHealthcareElement()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareElementApi(configuration);

let body:.HealthcareElementApiGetHealthcareElementRequest = {
  // string
  id: "id_example",
};

apiInstance.getHealthcareElement(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**HealthcareElement**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **matchHealthcareElement**
> Array<string> matchHealthcareElement(filter)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareElementApi(configuration);

let body:.HealthcareElementApiMatchHealthcareElementRequest = {
  // Filter
  filter: {
    description: "description_example",
  },
};

apiInstance.matchHealthcareElement(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **Filter**|  |


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
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)



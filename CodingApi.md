# .CodingApi

All URIs are relative to *http://127.0.0.1:8912*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createOrModifyCoding**](CodingApi.md#createOrModifyCoding) | **PUT** /rest/v2/coding | Create or update a [Coding]
[**createOrModifyCodings**](CodingApi.md#createOrModifyCodings) | **PUT** /rest/v2/coding/batch | Create or update a batch of [Coding]
[**filterCoding**](CodingApi.md#filterCoding) | **POST** /rest/v2/coding/filter | Load codings from the database by filtering them using the provided [filter].
[**getCoding**](CodingApi.md#getCoding) | **GET** /rest/v2/coding/{codingId} | Get a [Coding]
[**matchCoding**](CodingApi.md#matchCoding) | **POST** /rest/v2/coding/match | Load coding ids from the database by filtering them using the provided [filter].


# **createOrModifyCoding**
> Coding createOrModifyCoding(coding)

When modifying a coding, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodingApi(configuration);

let body:.CodingApiCreateOrModifyCodingRequest = {
  // Coding
  coding: {
    id: "id_example",
    rev: "rev_example",
    type: "type_example",
    code: "code_example",
    version: "version_example",
    description: {
      "key": "key_example",
    },
    qualifiedLinks: {
      "key": [
        "key_example",
      ],
    },
    searchTerms: {
      "key": [
        "key_example",
      ],
    },
  },
};

apiInstance.createOrModifyCoding(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **coding** | **Coding**|  |


### Return type

**Coding**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modified coding as a [Coding] object, with an updated rev. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SessionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createOrModifyCodings**
> Array<Coding> createOrModifyCodings(coding)

When modifying codings, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodingApi(configuration);

let body:.CodingApiCreateOrModifyCodingsRequest = {
  // Array<Coding>
  coding: [
    {
      id: "id_example",
      rev: "rev_example",
      type: "type_example",
      code: "code_example",
      version: "version_example",
      description: {
        "key": "key_example",
      },
      qualifiedLinks: {
        "key": [
          "key_example",
        ],
      },
      searchTerms: {
        "key": [
          "key_example",
        ],
      },
    },
  ],
};

apiInstance.createOrModifyCodings(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **coding** | **Array<Coding>**|  |


### Return type

**Array<Coding>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modified codings as a [Coding] objects, with updated revs. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SessionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **filterCoding**
> PaginatedListCoding filterCoding(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodingApi(configuration);

let body:.CodingApiFilterCodingRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
  // string | The id of the first coding in the next page (optional)
  nextCodingId: "nextCodingId_example",
  // number | The number of codings to return in the queried page (optional)
  limit: 1,
};

apiInstance.filterCoding(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **Filter**| The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
 **nextCodingId** | [**string**] | The id of the first coding in the next page | (optional) defaults to undefined
 **limit** | [**number**] | The number of codings to return in the queried page | (optional) defaults to undefined


### Return type

**PaginatedListCoding**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns a PaginatedList of [Coding]. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SessionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getCoding**
> Coding getCoding()

Each coding is uniquely identified by a coding id. The coding id is a UUID. This [codingId] is the preferred method to retrieve one specific coding.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodingApi(configuration);

let body:.CodingApiGetCodingRequest = {
  // string
  codingId: "codingId_example",
};

apiInstance.getCoding(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **codingId** | [**string**] |  | defaults to undefined


### Return type

**Coding**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the fetched coding as a [Coding] object |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SessionId). |  -  |
**400** | if there is no coding with the provided [codingId]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **matchCoding**
> Array<string> matchCoding(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodingApi(configuration);

let body:.CodingApiMatchCodingRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
};

apiInstance.matchCoding(body).then((data:any) => {
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
**200** | Returns a list of all [Coding] ids matching the [filter]. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SessionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)



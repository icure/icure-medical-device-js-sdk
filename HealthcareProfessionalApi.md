# .HealthcareProfessionalApi

All URIs are relative to *http://127.0.0.1:8912*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createOrModifyHealthcareProfessional**](HealthcareProfessionalApi.md#createOrModifyHealthcareProfessional) | **PUT** /rest/v2/healthcareprofessional | Create a newhealthcare professional or modify an existing one.
[**deleteHealthcareProfessional**](HealthcareProfessionalApi.md#deleteHealthcareProfessional) | **DELETE** /rest/v2/healthcareprofessional/{hcpId} | Delete an existing healthcare professional.
[**filterHealthcareProfessionalBy**](HealthcareProfessionalApi.md#filterHealthcareProfessionalBy) | **POST** /rest/v2/healthcareprofessional/filter | Load healthcare professionals from the database by filtering them using the provided Filter.
[**getHealthcareProfessional**](HealthcareProfessionalApi.md#getHealthcareProfessional) | **GET** /rest/v2/healthcareprofessional/{hcpId} | Get a Healthcare professional by id.
[**matchHealthcareProfessionalBy**](HealthcareProfessionalApi.md#matchHealthcareProfessionalBy) | **POST** /rest/v2/healthcareprofessional/match | Loadhealthcare professional ids from the database by filtering them using the provided Filter.


# **createOrModifyHealthcareProfessional**
> HealthcareProfessional createOrModifyHealthcareProfessional(healthcareProfessional)

Ahealthcare professional must have a login, an email or a mobilePhone defined, ahealthcare professional should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an healthcare professional, you must ensure that the rev obtained when getting or creating thehealthcare professional is present as the rev is used to guarantee that thehealthcare professional has not been modified by a third party.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareProfessionalApi(configuration);

let body:.HealthcareProfessionalApiCreateOrModifyHealthcareProfessionalRequest = {
  // HealthcareProfessional | Thehealthcare professional that must be created in the database.
  healthcareProfessional: {
    id: "id_example",
    rev: "rev_example",
    created: 1,
    modified: 1,
    deletionDate: 1,
    name: "name_example",
    lastName: "lastName_example",
    firstName: "firstName_example",
    names: [
      {
        lastName: "lastName_example",
        firstNames: [
          "firstNames_example",
        ],
        start: 1,
        end: 1,
        prefix: [
          "prefix_example",
        ],
        suffix: [
          "suffix_example",
        ],
        text: "text_example",
        use: "usual",
      },
    ],
    gender: "male",
    civility: "civility_example",
    speciality: "speciality_example",
    parentId: "parentId_example",
    addresses: [
      {
        addressType: "home",
        description: "description_example",
        street: "street_example",
        houseNumber: "houseNumber_example",
        postboxNumber: "postboxNumber_example",
        postalCode: "postalCode_example",
        city: "city_example",
        state: "state_example",
        country: "country_example",
        note: "note_example",
        telecoms: [
          {
            telecomType: "mobile",
            telecomNumber: "telecomNumber_example",
            telecomDescription: "telecomDescription_example",
          },
        ],
      },
    ],
    languages: [
      "languages_example",
    ],
    picture: 'YQ==',
    specialityCodes: [
      {
        id: "id_example",
        type: "type_example",
        code: "code_example",
        version: "version_example",
      },
    ],
    notes: "notes_example",
    properties: [
      {
        id: "id_example",
        type: {
          identifier: "identifier_example",
          type: "BOOLEAN",
        },
        typedValue: {
          type: "BOOLEAN",
          booleanValue: true,
          integerValue: 1,
          doubleValue: 3.14,
          stringValue: "stringValue_example",
          dateValue: new Date('1970-01-01T00:00:00.00Z'),
        },
        deleted: 1,
      },
    ],
    systemMetaData: {
      hcPartyKeys: {
        "key": [
          "key_example",
        ],
      },
      privateKeyShamirPartitions: {
        "key": "key_example",
      },
    },
  },
};

apiInstance.createOrModifyHealthcareProfessional(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **healthcareProfessional** | **HealthcareProfessional**| Thehealthcare professional that must be created in the database. |


### Return type

**HealthcareProfessional**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modifiedhealthcare professional as a Healthcare professional object, with an updated rev. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no login,email or mobilePhone in the provided Healthcare professional |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteHealthcareProfessional**
> string deleteHealthcareProfessional()

Deletes thehealthcare professional identified by the provided unique hcpId.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareProfessionalApi(configuration);

let body:.HealthcareProfessionalApiDeleteHealthcareProfessionalRequest = {
  // string | The UUID that uniquely identifies thehealthcare professional to be deleted.
  hcpId: "hcpId_example",
};

apiInstance.deleteHealthcareProfessional(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hcpId** | [**string**] | The UUID that uniquely identifies thehealthcare professional to be deleted. | defaults to undefined


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
**200** | Returns the rev of the deleted object. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is nohealthcare professional with the provided hcpId. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **filterHealthcareProfessionalBy**
> PaginatedListHealthcareProfessional filterHealthcareProfessionalBy(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcareProfessionalsFilter and HealthcarProfessionalsByIdsFilter. This method returns a paginated list of healthcare professionals (with a cursor that lets you query the following items).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareProfessionalApi(configuration);

let body:.HealthcareProfessionalApiFilterHealthcareProfessionalByRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
  // string | The id of the first Healthcare professional in the next page (optional)
  nextHcpId: "nextHcpId_example",
  // number | The number of healthcare professionals to return in the queried page (optional)
  limit: 1,
};

apiInstance.filterHealthcareProfessionalBy(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **Filter**| The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
 **nextHcpId** | [**string**] | The id of the first Healthcare professional in the next page | (optional) defaults to undefined
 **limit** | [**number**] | The number of healthcare professionals to return in the queried page | (optional) defaults to undefined


### Return type

**PaginatedListHealthcareProfessional**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns a PaginatedList of Healthcare professionals. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is nohealthcare professional with the provided hcpId. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getHealthcareProfessional**
> HealthcareProfessional getHealthcareProfessional()

Eachhealthcare professional is uniquely identified by ahealthcare professional id. Thehealthcare professional id is a UUID. This hcpId is the preferred method to retrieve one specific healthcare professional.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareProfessionalApi(configuration);

let body:.HealthcareProfessionalApiGetHealthcareProfessionalRequest = {
  // string | The UUID that identifies thehealthcare professional uniquely
  hcpId: "hcpId_example",
};

apiInstance.getHealthcareProfessional(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hcpId** | [**string**] | The UUID that identifies thehealthcare professional uniquely | defaults to undefined


### Return type

**HealthcareProfessional**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the fetchedhealthcare professional as a Healthcare professional object |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is nohealthcare professional with the provided hcpId. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **matchHealthcareProfessionalBy**
> Array<string> matchHealthcareProfessionalBy(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcare professionalsFilter and Healthcare professionalsByIdsFilter. This method returns the list of the ids of the healthcare professionals matching the filter.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .HealthcareProfessionalApi(configuration);

let body:.HealthcareProfessionalApiMatchHealthcareProfessionalByRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
};

apiInstance.matchHealthcareProfessionalBy(body).then((data:any) => {
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
**200** | Returns a list of allhealthcare professional ids matching the filter. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is nohealthcare professional with the provided hcpId. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)



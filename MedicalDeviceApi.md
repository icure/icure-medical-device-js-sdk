# .MedicalDeviceApi

All URIs are relative to *http://127.0.0.1:8912*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createOrModifyMedicalDevice**](MedicalDeviceApi.md#createOrModifyMedicalDevice) | **PUT** /rest/v2/medical/device | Create or update a [MedicalDevice]
[**createOrModifyMedicalDevices**](MedicalDeviceApi.md#createOrModifyMedicalDevices) | **PUT** /rest/v2/medical/device/batch | Create or update a batch of [MedicalDevice]
[**deleteMedicalDevice**](MedicalDeviceApi.md#deleteMedicalDevice) | **DELETE** /rest/v2/medical/device/{medicalDeviceId} | Delete a [MedicalDevice]
[**deleteMedicalDevices**](MedicalDeviceApi.md#deleteMedicalDevices) | **POST** /rest/v2/medical/device/batch | Delete a batch of [MedicalDevice]
[**filterMedicalDevices**](MedicalDeviceApi.md#filterMedicalDevices) | **POST** /rest/v2/medical/device/filter | Load devices from the database by filtering them using the provided [filter].
[**getMedicalDevice**](MedicalDeviceApi.md#getMedicalDevice) | **GET** /rest/v2/medical/device/{medicalDeviceId} | Get a Medical Device
[**matchMedicalDevices**](MedicalDeviceApi.md#matchMedicalDevices) | **POST** /rest/v2/medical/device/match | Load medical device ids from the database by filtering them using the provided Filter.


# **createOrModifyMedicalDevice**
> MedicalDevice createOrModifyMedicalDevice(medicalDevice)

When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .MedicalDeviceApi(configuration);

let body:.MedicalDeviceApiCreateOrModifyMedicalDeviceRequest = {
  // MedicalDevice
  medicalDevice: {
    id: "id_example",
    rev: "rev_example",
    deletionDate: 1,
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
    created: 1,
    modified: 1,
    author: "author_example",
    responsible: "responsible_example",
    labels: [
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
    externalId: "externalId_example",
    name: "name_example",
    type: "type_example",
    brand: "brand_example",
    model: "model_example",
    serialNumber: "serialNumber_example",
    parentId: "parentId_example",
    picture: [
      'YQ==',
    ],
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

apiInstance.createOrModifyMedicalDevice(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **medicalDevice** | **MedicalDevice**|  |


### Return type

**MedicalDevice**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modified device as a [MedicalDevice] object, with an updated rev. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createOrModifyMedicalDevices**
> Array<MedicalDevice> createOrModifyMedicalDevices(medicalDevice)

When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .MedicalDeviceApi(configuration);

let body:.MedicalDeviceApiCreateOrModifyMedicalDevicesRequest = {
  // Array<MedicalDevice>
  medicalDevice: [
    {
      id: "id_example",
      rev: "rev_example",
      deletionDate: 1,
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
      created: 1,
      modified: 1,
      author: "author_example",
      responsible: "responsible_example",
      labels: [
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
      externalId: "externalId_example",
      name: "name_example",
      type: "type_example",
      brand: "brand_example",
      model: "model_example",
      serialNumber: "serialNumber_example",
      parentId: "parentId_example",
      picture: [
        'YQ==',
      ],
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
  ],
};

apiInstance.createOrModifyMedicalDevices(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **medicalDevice** | **Array<MedicalDevice>**|  |


### Return type

**Array<MedicalDevice>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modified devices as a list of [MedicalDevice] objects, with an updated rev. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteMedicalDevice**
> string deleteMedicalDevice()

Deletes the medical device identified by the provided unique [medicalDeviceId].

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .MedicalDeviceApi(configuration);

let body:.MedicalDeviceApiDeleteMedicalDeviceRequest = {
  // string
  medicalDeviceId: "medicalDeviceId_example",
};

apiInstance.deleteMedicalDevice(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **medicalDeviceId** | [**string**] |  | defaults to undefined


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
**400** | if there is no medical device with the provided [medicalDeviceId]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteMedicalDevices**
> Array<string> deleteMedicalDevices(requestBody)

Deletes the batch of medical device identified by the provided [medicalDeviceIds].

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .MedicalDeviceApi(configuration);

let body:.MedicalDeviceApiDeleteMedicalDevicesRequest = {
  // Array<string>
  requestBody: [
    "requestBody_example",
  ],
};

apiInstance.deleteMedicalDevices(body).then((data:any) => {
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
**200** | Returns the rev of the deleted object. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no medical device with the provided [medicalDeviceIds]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **filterMedicalDevices**
> PaginatedListMedicalDevice filterMedicalDevices(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns a paginated list of medical devices (with a cursor that lets you query the following items).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .MedicalDeviceApi(configuration);

let body:.MedicalDeviceApiFilterMedicalDevicesRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
  // string | The id of the first device in the next page (optional)
  nextDeviceId: "nextDeviceId_example",
  // number | The number of devices to return in the queried page (optional)
  limit: 1,
};

apiInstance.filterMedicalDevices(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **Filter**| The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
 **nextDeviceId** | [**string**] | The id of the first device in the next page | (optional) defaults to undefined
 **limit** | [**number**] | The number of devices to return in the queried page | (optional) defaults to undefined


### Return type

**PaginatedListMedicalDevice**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns a PaginatedList of [MedicalDevice]. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getMedicalDevice**
> MedicalDevice getMedicalDevice()

Each medical device is uniquely identified by a device id. The device id is a UUID. This [medicalDeviceId] is the preferred method to retrieve one specific device.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .MedicalDeviceApi(configuration);

let body:.MedicalDeviceApiGetMedicalDeviceRequest = {
  // string
  medicalDeviceId: "medicalDeviceId_example",
};

apiInstance.getMedicalDevice(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **medicalDeviceId** | [**string**] |  | defaults to undefined


### Return type

**MedicalDevice**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the fetched device as a [MedicalDevice] object |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no device with the provided [medicalDeviceId]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **matchMedicalDevices**
> Array<string> matchMedicalDevices(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns the list of the ids of the users matching the filter.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .MedicalDeviceApi(configuration);

let body:.MedicalDeviceApiMatchMedicalDevicesRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
};

apiInstance.matchMedicalDevices(body).then((data:any) => {
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
**200** | Returns a list of all medical device ids matching the [filter]. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)



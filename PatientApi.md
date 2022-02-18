# .PatientApi

All URIs are relative to *http://127.0.0.1:8912*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createOrModifyPatient**](PatientApi.md#createOrModifyPatient) | **PUT** /rest/v2/patient | Create or update a [Patient]
[**deletePatient**](PatientApi.md#deletePatient) | **DELETE** /rest/v2/patient/{patientId} | Delete a [Patient]
[**filterPatients**](PatientApi.md#filterPatients) | **POST** /rest/v2/patient/filter | Load patients from the database by filtering them using the provided [filter].
[**getPatient**](PatientApi.md#getPatient) | **GET** /rest/v2/patient/{patientId} | Get a [Patient]
[**matchPatients**](PatientApi.md#matchPatients) | **POST** /rest/v2/patient/match | Load patient ids from the database by filtering them using the provided [filter].


# **createOrModifyPatient**
> Patient createOrModifyPatient(patient)

When modifying a patient, you must ensure that the rev obtained when getting or creating the patient is present as the rev is used to guarantee that the patient has not been modified by a third party.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .PatientApi(configuration);

let body:.PatientApiCreateOrModifyPatientRequest = {
  // Patient
  patient: {
    id: "id_example",
    rev: "rev_example",
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
    deletionDate: 1,
    firstName: "firstName_example",
    lastName: "lastName_example",
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
    companyName: "companyName_example",
    languages: [
      "languages_example",
    ],
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
    civility: "civility_example",
    gender: "male",
    birthSex: "male",
    mergeToPatientId: "mergeToPatientId_example",
    mergedIds: [
      "mergedIds_example",
    ],
    alias: "alias_example",
    active: true,
    deactivationReason: "DeactivationReason.none",
    ssin: "ssin_example",
    maidenName: "maidenName_example",
    spouseName: "spouseName_example",
    partnerName: "partnerName_example",
    personalStatus: "single",
    dateOfBirth: 1,
    dateOfDeath: 1,
    placeOfBirth: "placeOfBirth_example",
    placeOfDeath: "placeOfDeath_example",
    deceased: true,
    education: "education_example",
    profession: "profession_example",
    note: "note_example",
    administrativeNote: "administrativeNote_example",
    nationality: "nationality_example",
    race: "race_example",
    ethnicity: "ethnicity_example",
    picture: 'YQ==',
    externalId: "externalId_example",
    partnerships: [
      {
        type: "primary_contact",
        status: "active",
        partnerId: "partnerId_example",
      },
    ],
    patientHealthCareParties: [
      {
        type: "doctor",
        healthcarePartyId: "healthcarePartyId_example",
      },
    ],
    patientProfessions: [
      {
        id: "id_example",
        type: "type_example",
        code: "code_example",
        version: "version_example",
      },
    ],
    parameters: {
      "key": [
        "key_example",
      ],
    },
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

apiInstance.createOrModifyPatient(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **patient** | **Patient**|  |


### Return type

**Patient**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modified patient as a [Patient] object, with an updated rev. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deletePatient**
> string deletePatient()

Deletes the patient identified by the provided unique [patientId].

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .PatientApi(configuration);

let body:.PatientApiDeletePatientRequest = {
  // string
  patientId: "patientId_example",
};

apiInstance.deletePatient(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **patientId** | [**string**] |  | defaults to undefined


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
**400** | if there is no patient with the provided [patientId]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **filterPatients**
> PaginatedListPatient filterPatients(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns a paginated list of patient (with a cursor that lets you query the following items).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .PatientApi(configuration);

let body:.PatientApiFilterPatientsRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
  // string | The id of the first patient in the next page (optional)
  nextPatientId: "nextPatientId_example",
  // number | The number of patients to return in the queried page (optional)
  limit: 1,
};

apiInstance.filterPatients(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **Filter**| The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
 **nextPatientId** | [**string**] | The id of the first patient in the next page | (optional) defaults to undefined
 **limit** | [**number**] | The number of patients to return in the queried page | (optional) defaults to undefined


### Return type

**PaginatedListPatient**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns a PaginatedList of [Patient]. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getPatient**
> Patient getPatient()

Each patient is uniquely identified by a patient id. The patient id is a UUID. This [patientId] is the preferred method to retrieve one specific patient.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .PatientApi(configuration);

let body:.PatientApiGetPatientRequest = {
  // string
  patientId: "patientId_example",
};

apiInstance.getPatient(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **patientId** | [**string**] |  | defaults to undefined


### Return type

**Patient**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the fetched patient as a [Patient] object |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no patient with the provided [patientId]. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **matchPatients**
> Array<string> matchPatients(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns the list of the ids of the users matching the [filter].

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .PatientApi(configuration);

let body:.PatientApiMatchPatientsRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
};

apiInstance.matchPatients(body).then((data:any) => {
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
**200** | Returns a list of all [Patient] ids matching the [filter]. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)



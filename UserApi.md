# .UserApi

All URIs are relative to *http://127.0.0.1:8912*

Method | HTTP request | Description
------------- | ------------- | -------------
[**checkTokenValidity**](UserApi.md#checkTokenValidity) | **GET** /rest/v2/user/token/{userId} | Check token validity for a user.
[**createOrModifyUser**](UserApi.md#createOrModifyUser) | **PUT** /rest/v2/user | Create a new user or modify an existing one.
[**createToken**](UserApi.md#createToken) | **POST** /rest/v2/user/token/{userId} | Create a token for a user.
[**deleteUser**](UserApi.md#deleteUser) | **DELETE** /rest/v2/user/{userId} | Delete an existing user.
[**filterUsers**](UserApi.md#filterUsers) | **POST** /rest/v2/user/filter | Load users from the database by filtering them using the provided Filter.
[**getLoggedUser**](UserApi.md#getLoggedUser) | **GET** /rest/v2/user | Get the details of the logged User.
[**getUser**](UserApi.md#getUser) | **GET** /rest/v2/user/{userId} | Get a User by id.
[**matchUsers**](UserApi.md#matchUsers) | **POST** /rest/v2/user/match | Load user ids from the database by filtering them using the provided Filter.


# **checkTokenValidity**
> boolean checkTokenValidity()

Checks that the provided token is (still) valid for the provided user id (or user login).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiCheckTokenValidityRequest = {
  // string | The UUID that identifies the user uniquely
  userId: "userId_example",
  // string | The token that will be checked
  token: "token_example",
};

apiInstance.checkTokenValidity(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**string**] | The UUID that identifies the user uniquely | defaults to undefined
 **token** | [**string**] | The token that will be checked | defaults to undefined


### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns a boolean (true/false). True if the token is valid, False otherwise |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no user with the provided userId. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createOrModifyUser**
> User createOrModifyUser(user)

A user must have a login, an email or a mobilePhone defined, a user should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an user, you must ensure that the rev obtained when getting or creating the user is present as the rev is used to guarantee that the user has not been modified by a third party.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiCreateOrModifyUserRequest = {
  // User | The user that must be created in the database.
  user: {
    id: "id_example",
    rev: "rev_example",
    deletionDate: 1,
    created: 1,
    name: "name_example",
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
    roles: [
      "roles_example",
    ],
    login: "login_example",
    passwordHash: "passwordHash_example",
    secret: "secret_example",
    use2fa: true,
    groupId: "groupId_example",
    healthcarePartyId: "healthcarePartyId_example",
    patientId: "patientId_example",
    deviceId: "deviceId_example",
    autoDelegations: {
      "key": [
        "key_example",
      ],
    },
    email: "email_example",
    mobilePhone: "mobilePhone_example",
    authenticationTokens: {
      "key": {
        token: "token_example",
        creationTime: 1,
        validity: 1,
      },
    },
  },
};

apiInstance.createOrModifyUser(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user** | **User**| The user that must be created in the database. |


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the created or modified user as a User object, with an updated rev. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no login,email or mobilePhone in the provided User |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createToken**
> string createToken()

A token is used to authenticate the user. It is just like a password but it is destined to be used by programs instead of humans. Tokens have a limited validity period (one month).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiCreateTokenRequest = {
  // string | The UUID that identifies the user uniquely
  userId: "userId_example",
};

apiInstance.createToken(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**string**] | The UUID that identifies the user uniquely | defaults to undefined


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
**200** | Returns the token that can be subsequently used to authenticate the user with id userId. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no user with the provided userId. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteUser**
> string deleteUser()

Deletes the user identified by the provided unique userId.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiDeleteUserRequest = {
  // string | The UUID that uniquely identifies the user to be deleted.
  userId: "userId_example",
};

apiInstance.deleteUser(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**string**] | The UUID that uniquely identifies the user to be deleted. | defaults to undefined


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
**400** | if there is no user with the provided userId. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **filterUsers**
> PaginatedListUser filterUsers(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns a paginated list of users (with a cursor that lets you query the following items).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiFilterUsersRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
  // string | The id of the first User in the next page (optional)
  nextUserId: "nextUserId_example",
  // number | The number of users to return in the queried page (optional)
  limit: 1,
};

apiInstance.filterUsers(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **Filter**| The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
 **nextUserId** | [**string**] | The id of the first User in the next page | (optional) defaults to undefined
 **limit** | [**number**] | The number of users to return in the queried page | (optional) defaults to undefined


### Return type

**PaginatedListUser**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/xml
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns a PaginatedList of Users. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no user with the provided userId. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getLoggedUser**
> User getLoggedUser()

When you make a call to the server, an authentication token is used to identify you. This call returns the complete User object that corresponds to your authentication credentials.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:any = {};

apiInstance.getLoggedUser(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the logged user in the body |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUser**
> User getUser()

Each user is uniquely identified by a user id. The user id is a UUID. This userId is the preferred method to retrieve one specific user.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiGetUserRequest = {
  // string | The UUID that identifies the user uniquely
  userId: "userId_example",
};

apiInstance.getUser(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**string**] | The UUID that identifies the user uniquely | defaults to undefined


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Returns the fetched user as a User object |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |
**400** | if there is no user with the provided userId. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **matchUsers**
> Array<string> matchUsers(filter)

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns the list of the ids of the users matching the filter.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiMatchUsersRequest = {
  // Filter | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
  filter: {
    description: "description_example",
  },
};

apiInstance.matchUsers(body).then((data:any) => {
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
**200** | Returns a list of all user ids matching the filter. |  -  |
**403** | if you make this call without providing an authentication token (BASIC, SesssionId). |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)



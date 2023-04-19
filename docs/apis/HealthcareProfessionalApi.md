[@icure/medical-device-sdk](../modules) / HealthcareProfessionalApi

# SDK API: HealthcareProfessionalApi

The HealthcareProfessionalApi interface provides methods to manage healthcare professionals.

## Table of contents

### Methods

- [createOrModifyHealthcareProfessional](HealthcareProfessionalApi#createormodifyhealthcareprofessional)
- [deleteHealthcareProfessional](HealthcareProfessionalApi#deletehealthcareprofessional)
- [filterHealthcareProfessionalBy](HealthcareProfessionalApi#filterhealthcareprofessionalby)
- [getHealthcareProfessional](HealthcareProfessionalApi#gethealthcareprofessional)
- [matchHealthcareProfessionalBy](HealthcareProfessionalApi#matchhealthcareprofessionalby)

## Methods

### createOrModifyHealthcareProfessional

▸ **createOrModifyHealthcareProfessional**(`healthcareProfessional`): `Promise`<[`HealthcareProfessional`](../classes/HealthcareProfessional)\>

A healthcare professional must have a login, an email or a mobilePhone defined, a healthcare professional should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an healthcare professional, you must ensure that the rev obtained when getting or creating the healthcare professional is present as the rev is used to guarantee that the healthcare professional has not been modified by a third party.
Create a new Healthcare professional or modify an existing one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `healthcareProfessional` | [`HealthcareProfessional`](../classes/HealthcareProfessional) | The healthcare professional that must be created in the database. |

#### Returns

`Promise`<[`HealthcareProfessional`](../classes/HealthcareProfessional)\>

#### Defined in

[src/apis/HealthcareProfessionalApi.ts:15](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareProfessionalApi.ts#L15)

___

### deleteHealthcareProfessional

▸ **deleteHealthcareProfessional**(`hcpId`): `Promise`<`string`\>

Deletes the healthcare professional identified by the provided unique hcpId.
Delete an existing healthcare professional.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hcpId` | `string` | The UUID that uniquely identifies the healthcare professional to be deleted. |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/apis/HealthcareProfessionalApi.ts:21](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareProfessionalApi.ts#L21)

___

### filterHealthcareProfessionalBy

▸ **filterHealthcareProfessionalBy**(`filter`, `nextHcpId?`, `limit?`): `Promise`<[`PaginatedListHealthcareProfessional`](../classes/PaginatedListHealthcareProfessional)\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcareProfessionalsFilter and HealthcareProfessionalsByIdsFilter. This method returns a paginated list of healthcare professionals (with a cursor that lets you query the following items).
Load healthcare professionals from the database by filtering them using the provided Filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`HealthcareProfessional`](../classes/HealthcareProfessional)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
| `nextHcpId?` | `string` | The id of the first Healthcare professional in the next page |
| `limit?` | `number` | The number of healthcare professionals to return in the queried page |

#### Returns

`Promise`<[`PaginatedListHealthcareProfessional`](../classes/PaginatedListHealthcareProfessional)\>

#### Defined in

[src/apis/HealthcareProfessionalApi.ts:29](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareProfessionalApi.ts#L29)

___

### getHealthcareProfessional

▸ **getHealthcareProfessional**(`hcpId`): `Promise`<[`HealthcareProfessional`](../classes/HealthcareProfessional)\>

Each healthcare professional is uniquely identified by a healthcare professional id. The healthcare professional id is a UUID. This hcpId is the preferred method to retrieve one specific healthcare professional.
Get a Healthcare professional by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hcpId` | `string` | The UUID that identifies the healthcare professional uniquely |

#### Returns

`Promise`<[`HealthcareProfessional`](../classes/HealthcareProfessional)\>

#### Defined in

[src/apis/HealthcareProfessionalApi.ts:35](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareProfessionalApi.ts#L35)

___

### matchHealthcareProfessionalBy

▸ **matchHealthcareProfessionalBy**(`filter`): `Promise`<`string`[]\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcare professionalsFilter and Healthcare professionalsByIdsFilter. This method returns the list of the ids of the healthcare professionals matching the filter.
Load healthcare professional ids from the database by filtering them using the provided Filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`HealthcareProfessional`](../classes/HealthcareProfessional)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/apis/HealthcareProfessionalApi.ts:41](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/HealthcareProfessionalApi.ts#L41)

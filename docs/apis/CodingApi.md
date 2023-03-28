[@icure/medical-device-sdk](../modules) / CodingApi

# SDK API: CodingApi

The CodingApi interface provides methods to manage codings and terminologies (like ATC, ICD-10, LOINC, SNOMED-CT,… ).

## Table of contents

### Methods

- [createOrModifyCoding](CodingApi#createormodifycoding)
- [createOrModifyCodings](CodingApi#createormodifycodings)
- [filterCoding](CodingApi#filtercoding)
- [getCoding](CodingApi#getcoding)
- [matchCoding](CodingApi#matchcoding)

## Methods

### createOrModifyCoding

▸ **createOrModifyCoding**(`coding`): `Promise`<[`Coding`](../classes/Coding)\>

When modifying a coding, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
Create or update a [Coding]

#### Parameters

| Name | Type |
| :------ | :------ |
| `coding` | [`Coding`](../classes/Coding) |

#### Returns

`Promise`<[`Coding`](../classes/Coding)\>

#### Defined in

[src/apis/CodingApi.ts:14](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/CodingApi.ts#L14)

___

### createOrModifyCodings

▸ **createOrModifyCodings**(`coding`): `Promise`<[`Coding`](../classes/Coding)[]\>

When modifying codings, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
Create or update a batch of [Coding]

#### Parameters

| Name | Type |
| :------ | :------ |
| `coding` | [`Coding`](../classes/Coding)[] |

#### Returns

`Promise`<[`Coding`](../classes/Coding)[]\>

#### Defined in

[src/apis/CodingApi.ts:20](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/CodingApi.ts#L20)

___

### filterCoding

▸ **filterCoding**(`filter`, `nextCodingId?`, `limit?`): `Promise`<[`PaginatedListCoding`](../classes/PaginatedListCoding)\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
Load codings from the database by filtering them using the provided [filter].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`Coding`](../classes/Coding)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |
| `nextCodingId?` | `string` | The id of the first coding in the next page |
| `limit?` | `number` | The maximum number of codings that should contain the returned page. By default, a page contains 1000 codings |

#### Returns

`Promise`<[`PaginatedListCoding`](../classes/PaginatedListCoding)\>

#### Defined in

[src/apis/CodingApi.ts:28](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/CodingApi.ts#L28)

___

### getCoding

▸ **getCoding**(`codingId`): `Promise`<[`Coding`](../classes/Coding)\>

Each coding is uniquely identified by a coding id. The coding id is a UUID. This [codingId] is the preferred method to retrieve one specific coding.
Get a [Coding]

#### Parameters

| Name | Type |
| :------ | :------ |
| `codingId` | `string` |

#### Returns

`Promise`<[`Coding`](../classes/Coding)\>

#### Defined in

[src/apis/CodingApi.ts:34](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/CodingApi.ts#L34)

___

### matchCoding

▸ **matchCoding**(`filter`): `Promise`<`string`[]\>

Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
Load coding ids from the database by filtering them using the provided [filter].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter`<[`Coding`](../classes/Coding)\> | The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/apis/CodingApi.ts:40](https://github.com/icure/icure-medical-device-js-sdk/blob/a61f48e/src/apis/CodingApi.ts#L40)

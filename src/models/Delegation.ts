/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export class Delegation {
constructor(json: IDelegation) {
  Object.assign(this as Delegation, json)
}

    'tags': Array<string>;
    'owner'?: string;
    'delegatedTo'?: string;
    'key'?: string;

    marshal(): IDelegation {
      return {
        ...this,
      }
    }
}

interface IDelegation {
  'tags'?: Array<string>;
  'owner'?: string;
  'delegatedTo'?: string;
  'key'?: string;
}

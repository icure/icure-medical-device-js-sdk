/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HealthcareElement } from './HealthcareElement';
import { PaginatedDocumentKeyAndIdPairObject } from './PaginatedDocumentKeyAndIdPairObject';

import {decodeBase64} from "./ModelHelper";

export class PaginatedListHealthcareElement { 
    constructor(json: JSON | any) {
        Object.assign(this as PaginatedListHealthcareElement, json)
    }

    pageSize?: number;
    totalSize?: number;
    rows?: Array<HealthcareElement>;
    nextKeyPair?: PaginatedDocumentKeyAndIdPairObject;
}


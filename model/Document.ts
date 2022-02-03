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
import { CodingReference } from './CodingReference';

import {decodeBase64} from "./ModelHelper";

export class Document { 
    constructor(json: JSON | any) {
        Object.assign(this as Document, json)
    }

    /**
     * The Id of the document. We encourage using either a v4 UUID or a HL7 Id.
     */
    id?: string;
    /**
     * The revision of the document in the database, used for conflict management / optimistic locking.
     */
    rev?: string;
    created?: number;
    modified?: number;
    author?: string;
    responsible?: string;
    medicalLocationId?: string;
    labels?: Array<CodingReference>;
    codes?: Array<CodingReference>;
    endOfLife?: number;
    deletionDate?: number;
    /**
     * Reference in object store
     */
    objectStoreReference?: string;
    /**
     * When the document is stored in an external repository, this is the uri of the document in that repository
     */
    externalUri?: string;
    /**
     * The main Uniform Type Identifier of the document (https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/understanding_utis/understand_utis_conc/understand_utis_conc.html#//apple_ref/doc/uid/TP40001319-CH202-CHDHIJDE)
     */
    mainUti?: string;
    /**
     * Name of the document
     */
    name?: string;
    /**
     * The document version
     */
    version?: string;
    /**
     * Extra Uniform Type Identifiers
     */
    otherUtis?: Array<string>;
    /**
     * A unique external id (from another external source).
     */
    externalUuid?: string;
    /**
     * Size of the document file
     */
    size?: number;
    /**
     * Hashed version of the document
     */
    hash?: string;
    /**
     * Id of attachment to this document
     */
    attachmentId?: string;
}


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

import {CodingReference} from './CodingReference';
import {Property} from "./Property";

export class Measure {
constructor(json: IMeasure) {
  const { unitCodes, ...simpleProperties } = json
  Object.assign(this as Measure, simpleProperties as IMeasure)
  this.unitCodes = unitCodes && new Set(([...unitCodes])?.map(p => new CodingReference(p)))
}

    'value'?: number;
    'min'?: number;
    'max'?: number;
    'ref'?: number;
    'severity'?: number;
    'severityCode'?: string;
    'evolution'?: number;
    'unit'?: string;
    'unitCodes'?: Set<CodingReference>;
    'comment'?: string;
    'comparator'?: string;

    marshal(): IMeasure {
      return {
        ...this,
        unitCodes: this.unitCodes?.size ? [...this.unitCodes].map(p => p.marshal()) : undefined,
      }
    }
}

interface IMeasure {
  'value'?: number;
  'min'?: number;
  'max'?: number;
  'ref'?: number;
  'severity'?: number;
  'severityCode'?: string;
  'evolution'?: number;
  'unit'?: string;
  'unitCodes'?: Set<CodingReference>;
  'comment'?: string;
  'comparator'?: string;
}

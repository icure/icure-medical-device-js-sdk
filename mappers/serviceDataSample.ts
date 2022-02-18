import {forceUuid, map, mapReduce, mapSet} from "./utils";
import {Content as ContentDto, Measure as MeasureDto, Service} from "@icure/api";
import {DataSample} from "../models/DataSample";
import {Content} from "../models/Content";
import {Measure} from "../models/Measure";
import {TimeSeriesMapper} from "./timeSeries";
import {CodeStubDtoMapper} from "./codeStubCodingReference";
import {IdentifierDtoMapper} from "./identifier";

export namespace DataSampleMapper {
  import toTimeSeries = TimeSeriesMapper.toTimeSeries;
  import toTimeSeriesDto = TimeSeriesMapper.toTimeSeriesDto;
  import toCodingReference = CodeStubDtoMapper.toCodingReference;
  import toCodeStub = CodeStubDtoMapper.toCodeStub;
  import toIdentifier = IdentifierDtoMapper.toIdentifier;
  import toIdentifierDto = IdentifierDtoMapper.toIdentifierDto;

  export const toDataSample = (obj?: Service, batchId?: string) => obj ? new DataSample({
    id: obj.id,
    identifier: map(obj.identifier, toIdentifier),
    content: mapReduce(obj.content, toContent),
    qualifiedLinks: obj.qualifiedLinks,
    codes: mapSet(new Set(obj.codes), toCodingReference),
    labels: mapSet(new Set(obj.tags), toCodingReference),
    transactionId: obj.transactionId,
    batchId: obj.contactId ?? batchId,
    healthElementsIds: obj.healthElementsIds ? new Set(obj.healthElementsIds) : undefined,
    canvasesIds: obj.formIds ? new Set(obj.formIds) : undefined,
    index: obj.index,
    valueDate: obj.valueDate,
    openingDate: obj.openingDate,
    closingDate: obj.closingDate,
    created: obj.created,
    modified: obj.modified,
    endOfLife: obj.endOfLife,
    author: obj.author,
    responsible: obj.responsible,
    comment: obj.comment
  }) : undefined;

  export const toContent = (obj?: ContentDto): Content | undefined => obj ? new Content({
    stringValue: obj.stringValue,
    numberValue: obj.numberValue,
    booleanValue: obj.booleanValue,
    instantValue: obj.instantValue,
    fuzzyDateValue: obj.fuzzyDateValue,
    binaryValue: obj.binaryValue,
    documentId: obj.documentId,
    measureValue: toMeasure(obj.measureValue),
    timeSeries: toTimeSeries(obj.timeSeries),
    compoundValue: map(obj.compoundValue, (it) => toDataSample(it)),
    ratio: map(obj.ratio, toMeasure),
    range: map(obj.ratio, toMeasure),
  }) : undefined;

  export const toMeasure = (obj?: MeasureDto) => obj ? new Measure({
    value: obj.value,
    min: obj.min,
    max: obj.max,
    ref: obj.ref,
    severity: obj.severity,
    severityCode: obj.severityCode,
    evolution: obj.evolution,
    unit: obj.unit,
    unitCodes: mapSet(new Set(obj.unitCodes), toCodingReference),
    comment: obj.comment,
    comparator: obj.comparator,
  }) : undefined;

  export const toServiceDto = (obj?: DataSample, batchId?: string) => obj ? new Service({
    id: forceUuid(obj.id),
    identifier: map(obj.identifier, toIdentifierDto),
    content: mapReduce(obj.content, toContentDto),
    qualifiedLinks: obj.qualifiedLinks,
    codes: mapSet(obj.codes, toCodeStub),
    tags: mapSet(obj.labels, toCodeStub),
    transactionId: obj.transactionId,
    contactId: obj.batchId,
    healthElementsIds: obj.healthElementsIds,
    formIds: obj.canvasesIds,
    index: obj.index,
    valueDate: obj.valueDate,
    openingDate: obj.openingDate,
    closingDate: obj.closingDate,
    created: obj.created,
    modified: obj.modified,
    endOfLife: obj.endOfLife,
    author: obj.author,
    responsible: obj.responsible,
    comment: obj.comment
  }) : undefined;

  export const toContentDto = (obj?: Content) : ContentDto | undefined => obj ? new ContentDto({
    stringValue: obj.stringValue,
    numberValue: obj.numberValue,
    booleanValue: obj.booleanValue,
    instantValue: obj.instantValue,
    fuzzyDateValue: obj.fuzzyDateValue,
    binaryValue: obj.binaryValue,
    documentId: obj.documentId,
    measureValue: toMeasureDto(obj.measureValue),
    timeSeries: toTimeSeriesDto(obj.timeSeries),
    compoundValue: map(obj.compoundValue, toServiceDto),
    ratio: map(obj.ratio, toMeasureDto),
    range: map(obj.range, toMeasureDto),
  }) : undefined;

  export const toMeasureDto = (obj?: Measure) => obj ? new MeasureDto({
    value: obj.value,
    min: obj.min,
    max: obj.max,
    ref: obj.ref,
    severity: obj.severity,
    severityCode: obj.severityCode,
    evolution: obj.evolution,
    unit: obj.unit,
    unitCodes: mapSet(obj.unitCodes, toCodeStub),
    comment: obj.comment,
    comparator: obj.comparator,
  }) : undefined;
}

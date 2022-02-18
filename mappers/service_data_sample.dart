//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

import 'package:icure_dart_sdk/api.dart';
import 'package:icure_medical_device_dart_sdk/api.dart';
import 'package:icure_medical_device_dart_sdk/utils/functional_utils.dart';
import 'package:uuid/uuid.dart';
import 'package:uuid/uuid_util.dart';

import 'code_coding.dart';
import 'code_stub_coding_reference.dart';
import 'identifier.dart';
import 'time_series.dart';

extension ServiceDtoMapper on DecryptedServiceDto {
  DataSample toDataSample(String? batchId) => DataSample(
      id: this.id,
      identifiers: this.identifier.map((it) => it.toIdentifier()).toList(),
      content: this.content.map((k, v) => MapEntry(k, v.toContent())),
      qualifiedLinks: this.qualifiedLinks.map((k, v) => MapEntry(k, v)),
      codes: this.codes.map((it) => it.toCodingReference()).toSet(),
      labels: this.tags.map((it) => it.toCodingReference()).toSet(),
      transactionId: this.transactionId,
      batchId: this.contactId ?? batchId,
      healthElementsIds: this.healthElementsIds,
      canvasesIds: this.formIds,
      index: this.index,
      valueDate: this.valueDate,
      openingDate: this.openingDate,
      closingDate: this.closingDate,
      created: this.created,
      modified: this.modified,
      endOfLife: this.endOfLife,
      author: this.author,
      responsible: this.responsible,
      comment: this.comment);
}

extension ContentDtoMapper on DecryptedContentDto {
  Content toContent() => Content(
        stringValue: this.stringValue,
        numberValue: this.numberValue,
        booleanValue: this.booleanValue,
        instantValue: this.instantValue,
        fuzzyDateValue: this.fuzzyDateValue,
        binaryValue: this.binaryValue,
        documentId: this.documentId,
        measureValue: this.measureValue?.toMeasure(),
        timeSeries: this.timeSeries?.toTimeSeries(),
        compoundValue: this.compoundValue.map((it) => it.toDataSample(null)).toList(),
        ratio: this.ratio.map((it) => it.toMeasure()).toList(),
        range: this.ratio.map((it) => it.toMeasure()).toList(),
      );
}

extension MeasureDtoMapper on MeasureDto {
  Measure toMeasure() => Measure(
        value: this.value,
        min: this.min,
        max: this.max,
        ref: this.ref,
        severity: this.severity,
        severityCode: this.severityCode,
        evolution: this.evolution,
        unit: this.unit,
        unitCodes: this.unitCodes.map((it) => it.toCodingReference()).toSet(),
        comment: this.comment,
        comparator: this.comparator,
      );
}

extension DataSampleMapper on DataSample {
    DecryptedServiceDto toServiceDto(String? batchId) => DecryptedServiceDto(
      id: this.id?.also((it) {
            if (!Uuid.isValidUUID(fromString: it)) {
              throw FormatException("Invalid id, id must be a valid UUID");
            }
          }) ??
          uuid.v4(options: {'rng': UuidUtil.cryptoRNG}),
      identifier: this.identifiers.map((it) => it.toIdentifierDto()).toList(),
      content: this.content.map((k, v) => MapEntry(k, v.toContentDto())),
      qualifiedLinks: this.qualifiedLinks,
      codes: this.codes.map((it) => it.toCodeStubDto()).toSet(),
      tags: this.labels.map((it) => it.toCodeStubDto()).toSet(),
      transactionId: this.transactionId,
      contactId: this.batchId,
      healthElementsIds: this.healthElementsIds,
      formIds: this.canvasesIds,
      index: this.index,
      valueDate: this.valueDate,
      openingDate: this.openingDate,
      closingDate: this.closingDate,
      created: this.created,
      modified: this.modified,
      endOfLife: this.endOfLife,
      author: this.author,
      responsible: this.responsible,
      comment: this.comment);
}

extension ContentMapper on Content {
    DecryptedContentDto toContentDto() => DecryptedContentDto(
        stringValue: this.stringValue,
        numberValue: this.numberValue,
        booleanValue: this.booleanValue,
        instantValue: this.instantValue,
        fuzzyDateValue: this.fuzzyDateValue,
        binaryValue: this.binaryValue,
        documentId: this.documentId,
        measureValue: this.measureValue?.toMeasureDto(),
        timeSeries: this.timeSeries?.toTimeSeriesDto(),
        compoundValue: this.compoundValue.map((it) => it.toServiceDto(null)).toList(),
        ratio: this.ratio.map((it) => it.toMeasureDto()).toList(),
        range: this.range.map((it) => it.toMeasureDto()).toList(),
      );
}

extension MeasureMapper on Measure {
  MeasureDto toMeasureDto() => MeasureDto(
        value: this.value,
        min: this.min,
        max: this.max,
        ref: this.ref,
        severity: this.severity,
        severityCode: this.severityCode,
        evolution: this.evolution,
        unit: this.unit,
        unitCodes: this.unitCodes.map((it) => it.toCodeStubDto()).toSet(),
        comment: this.comment,
        comparator: this.comparator,
      );
}

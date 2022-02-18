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

extension TimeSeriesDtoMapper on TimeSeriesDto {
  TimeSeries toTimeSeries() => TimeSeries(
        fields: this.fields,
        samples: this.samples,
        min: this.min,
        max: this.max,
        mean: this.mean,
        median: this.median,
        variance: this.variance,
      );
}

extension TimeSeriesMapper on TimeSeries {
  TimeSeriesDto toTimeSeriesDto() => TimeSeriesDto(
        fields: this.fields,
        samples: this.samples,
        min: this.min,
        max: this.max,
        mean: this.mean,
        median: this.median,
        variance: this.variance,
      );
}

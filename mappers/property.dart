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

import 'property_type.dart';
import 'typed_value_object.dart';

extension PropertyStubDtoMapper on PropertyStubDto {
  Property toProperty() => Property(
        id: this.id,
        type: this.type?.toPropertyType(),
        typedValue: this.typedValue?.toTypedValueObject(),
        deleted: this.deletionDate,
      );
}

extension PropertyMapper on Property {
  PropertyStubDto toPropertyStubDto() => PropertyStubDto(
        id: this.id,
        type: this.type?.toPropertyTypeStubDto(),
        typedValue: this.typedValue?.toTypedValueDtoObject(),
        deletionDate: this.deleted,
      );
}

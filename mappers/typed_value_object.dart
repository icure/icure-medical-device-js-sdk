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

extension TypedValueDtoObjectMapper on TypedValueDtoObject {
  TypedValueObject toTypedValueObject() => TypedValueObject(
        type: this.type?.toTypedValueObjectType(),
        booleanValue: this.booleanValue,
        integerValue: this.integerValue,
        doubleValue: this.doubleValue,
        stringValue: this.stringValue,
        dateValue: this.dateValue,
      );
}

extension TypedValueDtoObjectTypeEnumMapper on TypedValueDtoObjectTypeEnum {
  TypedValueObjectTypeEnum toTypedValueObjectType() => TypedValueObjectTypeEnum.values.firstWhere((it) => it.value == this.value);
}

extension TypedValueObjectMapper on TypedValueObject {
  TypedValueDtoObject toTypedValueDtoObject() => TypedValueDtoObject(
        type: this.type?.toTypedValueDtoObjectType(),
        booleanValue: this.booleanValue,
        integerValue: this.integerValue,
        doubleValue: this.doubleValue,
        stringValue: this.stringValue,
        dateValue: this.dateValue,
      );
}

extension TypedValueObjectTypeEnumMapper on TypedValueObjectTypeEnum {
  TypedValueDtoObjectTypeEnum toTypedValueDtoObjectType() => TypedValueDtoObjectTypeEnum.values.firstWhere((it) => it.value == this.value);
}

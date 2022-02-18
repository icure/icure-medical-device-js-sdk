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

extension PropertyTypeStubDtoMapper on PropertyTypeStubDto {
PropertyType toPropertyType() => PropertyType(
identifier: this.identifier,
type: this.type?.toPropertyTypeType(),
    );
}
extension PropertyTypeStubDtoTypeEnumMapper on PropertyTypeStubDtoTypeEnum {
    PropertyTypeTypeEnum toPropertyTypeType() => PropertyTypeTypeEnum.values.firstWhere((it) => it.value == this.value);
}

extension PropertyTypeMapper on PropertyType {
PropertyTypeStubDto toPropertyTypeStubDto() => PropertyTypeStubDto(
identifier: this.identifier,
type: this.type?.toPropertyTypeStubDtoType(),
    );
}
extension PropertyTypeTypeEnumMapper on PropertyTypeTypeEnum {
    PropertyTypeStubDtoTypeEnum toPropertyTypeStubDtoType() => PropertyTypeStubDtoTypeEnum.values.firstWhere((it) => it.value == this.value);
}

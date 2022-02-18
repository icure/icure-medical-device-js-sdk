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

extension CodeStubDtoMapper on CodeStubDto {
  CodingReference toCodingReference() => CodingReference(
        id: this.id ?? "${this.type}|${this.code}|${this.version}",
        type: this.type,
        code: this.code,
        version: this.version,
      );
}

extension CodingReferenceMapper on CodingReference {
  CodeStubDto toCodeStubDto() => CodeStubDto(
        id: this.id,
        type: this.type,
        code: this.code,
        version: this.version,
      );
}

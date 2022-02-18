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
import 'code_stub_coding_reference.dart';

extension IdentifierDtoMapper on IdentifierDto {
  Identifier toIdentifier() =>
      Identifier(
        id: this.id,
        assigner: this.assigner,
        start: this.start,
        end: this.end,
        system: this.system,
        type: this.type?.toCodingReference(),
        use: this.use,
      );
}

extension IdentifierMapper on Identifier {
  IdentifierDto toIdentifierDto() =>
      IdentifierDto(
        id: this.id,
        assigner: this.assigner,
        start: this.start,
        end: this.end,
        system: this.system,
        type: this.type?.toCodeStubDto(),
        use: this.use,
      );
}

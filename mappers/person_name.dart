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

extension PersonNameDtoMapper on PersonNameDto {
  PersonName toPersonName() => PersonName(
        firstNames: this.firstNames,
        prefix: this.prefix,
        suffix: this.suffix,
        lastName: this.lastName,
        start: this.start,
        end: this.end,
        text: this.text,
        use: this.use?.toPersonNameUse(),
      );
}

extension PersonNameDtoUseEnumMapper on PersonNameDtoUseEnum {
  PersonNameUseEnum toPersonNameUse() => PersonNameUseEnum.values.firstWhere((it) => it.value == this.value);
}

extension PersonNameMapper on PersonName {
  PersonNameDto toPersonNameDto() => PersonNameDto(
        firstNames: this.firstNames,
        prefix: this.prefix,
        suffix: this.suffix,
        lastName: this.lastName,
        start: this.start,
        end: this.end,
        text: this.text,
        use: this.use?.toPersonNameDtoUse(),
      );
}

extension PersonNameUseEnumMapper on PersonNameUseEnum {
  PersonNameDtoUseEnum toPersonNameDtoUse() => PersonNameDtoUseEnum.values.firstWhere((it) => it.value == this.value);
}

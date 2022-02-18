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

extension PartnershipDtoMapper on PartnershipDto {
  Partnership toPartnership() => Partnership(
        type: this.type?.toPartnershipType(),
        status: this.status?.toPartnershipStatus(),
        partnerId: this.partnerId,
      );
}

extension PartnershipDtoStatusEnumMapper on PartnershipDtoStatusEnum {
  PartnershipStatusEnum toPartnershipStatus() => PartnershipStatusEnum.values.firstWhere((it) => it.value == this.value);
}

extension PartnershipDtoTypeEnumMapper on PartnershipDtoTypeEnum {
  PartnershipTypeEnum toPartnershipType() => PartnershipTypeEnum.values.firstWhere((it) => it.value == this.value);
}

extension PartnershipMapper on Partnership {
  PartnershipDto toPartnershipDto() => PartnershipDto(
        type: this.type?.toPartnershipDtoType(),
        status: this.status?.toPartnershipDtoStatus(),
        partnerId: this.partnerId,
      );
}

extension PartnershipStatusEnumMapper on PartnershipStatusEnum {
  PartnershipDtoStatusEnum toPartnershipDtoStatus() => PartnershipDtoStatusEnum.values.firstWhere((it) => it.value == this.value);
}

extension PartnershipTypeEnumMapper on PartnershipTypeEnum {
  PartnershipDtoTypeEnum toPartnershipDtoType() => PartnershipDtoTypeEnum.values.firstWhere((it) => it.value == this.value);
}

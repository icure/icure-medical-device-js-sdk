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

extension AddressDtoMapper on AddressDto {
  Address toAddress() => Address(
      telecoms: this.telecoms.map((it) => it.toTelecom()).toList(),
      addressType: this.addressType?.toAddressType(),
      description: this.descr,
      street: this.street,
      houseNumber: this.houseNumber,
      postboxNumber: this.postboxNumber,
      postalCode: this.postalCode,
      city: this.city,
      state: this.state,
      country: this.country,
      note: this.note);
}

extension AddressDtoAddressTypeEnumMapper on AddressDtoAddressTypeEnum {
  AddressAddressTypeEnum toAddressType() => AddressAddressTypeEnum.values.firstWhere((it) => it.value == this.value);
}

extension TelecomMapper on TelecomDto {
  Telecom toTelecom() => Telecom(
        telecomType: this.telecomType?.toTelecomType(),
        telecomNumber: this.telecomNumber,
        telecomDescription: this.telecomDescription,
      );
}

extension TelecomDtoTelecomTypeEnumMapper on TelecomDtoTelecomTypeEnum {
  TelecomTelecomTypeEnum toTelecomType() => TelecomTelecomTypeEnum.values.firstWhere((it) => it.value == this.value);
}

extension AddressMapper on Address {
  AddressDto toAddressDto() => AddressDto(
      telecoms: this.telecoms.map((it) => it.toTelecomDto()).toList(),
      addressType: this.addressType?.toAddressTypeDto(),
      descr: this.description,
      street: this.street,
      houseNumber: this.houseNumber,
      postboxNumber: this.postboxNumber,
      postalCode: this.postalCode,
      city: this.city,
      state: this.state,
      country: this.country,
      note: this.note);
}

extension AddressAddressTypeEnumMapper on AddressAddressTypeEnum {
  AddressDtoAddressTypeEnum toAddressTypeDto() => AddressDtoAddressTypeEnum.values.firstWhere((it) => it.value == this.value);
}

extension TelecomDtoMapper on Telecom {
  TelecomDto toTelecomDto() => TelecomDto(
        telecomType: this.telecomType?.toTelecomType(),
        telecomNumber: this.telecomNumber,
        telecomDescription: this.telecomDescription,
      );
}

extension TelecomTelecomTypeEnumMapper on TelecomTelecomTypeEnum {
  TelecomDtoTelecomTypeEnum toTelecomType() => TelecomDtoTelecomTypeEnum.values.firstWhere((it) => it.value == this.value);
}

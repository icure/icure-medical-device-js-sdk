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

final Uuid uuid = Uuid();

extension DocumentDtoMapper on DecryptedDocumentDto {
  Document toDocument() => Document(
        id: this.id,
        otherUtis: this.otherUtis,
        rev: this.rev,
        created: this.created,
        modified: this.modified,
        author: this.author,
        responsible: this.responsible,
        medicalLocationId: this.medicalLocationId,
        deletionDate: this.deletionDate,
        objectStoreReference: this.objectStoreReference,
        mainUti: this.mainUti,
        name: this.name,
        version: this.version,
        externalUuid: this.externalUuid,
        size: this.size,
        hash: this.hash,
        attachmentId: this.attachmentId,
      );
}

extension DocumentMapper on Document {
      DecryptedDocumentDto toDecryptedDocumentDto() => DecryptedDocumentDto(
        id: this.id?.also((it) {
              if (!Uuid.isValidUUID(fromString: it)) {
                throw FormatException("Invalid id, id must be a valid UUID");
              }
            }) ??
            uuid.v4(options: {'rng': UuidUtil.cryptoRNG}),
        otherUtis: this.otherUtis,
        rev: this.rev,
        created: this.created,
        modified: this.modified,
        author: this.author,
        responsible: this.responsible,
        medicalLocationId: this.medicalLocationId,
        deletionDate: this.deletionDate,
        objectStoreReference: this.objectStoreReference,
        mainUti: this.mainUti,
        name: this.name,
        version: this.version,
        externalUuid: this.externalUuid,
        size: this.size,
        hash: this.hash,
        attachmentId: this.attachmentId,
      );
}

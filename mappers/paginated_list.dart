
import 'package:icure_dart_sdk/api.dart';
import 'package:icure_medical_device_dart_sdk/api.dart';

import 'medical_device.dart';
import 'service_data_sample.dart';
import 'code_coding.dart';
import 'healthcare_element.dart';
import 'healthcare_professional.dart';
import 'patient.dart';
import 'user.dart';

extension PaginatedListDeviceDtoMapper on PaginatedListDeviceDto {
    PaginatedListMedicalDevice toPaginatedListMedicalDevice() => PaginatedListMedicalDevice(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toMedicalDevice()).toList(),
        nextKeyPair: PaginatedDocumentKeyAndIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListServiceDtoMapper on DecryptedPaginatedListServiceDto {
    PaginatedListDataSample toPaginatedListDataSample() => PaginatedListDataSample(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toDataSample(null)).toList(),
        nextKeyPair: PaginatedDocumentKeyAndIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListCodeDtoMapper on PaginatedListCodeDto {
    PaginatedListCoding toPaginatedListCoding() => PaginatedListCoding(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toCoding()).toList(),
        nextKeyPair: PaginatedDocumentKeyAndIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListHealthElementDtoMapper on DecryptedPaginatedListHealthElementDto {
    PaginatedListHealthcareElement toPaginatedListHealthcareElement() => PaginatedListHealthcareElement(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toHealthcareElement()).toList(),
        nextKeyPair: PaginatedDocumentKeyAndIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListHealthcarePartyDtoMapper on PaginatedListHealthcarePartyDto {
    PaginatedListHealthcareProfessional toPaginatedListHealthcareProfessional() => PaginatedListHealthcareProfessional(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toHealthcareProfessional()).toList(),
        nextKeyPair: PaginatedDocumentKeyAndIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListPatientDtoMapper on DecryptedPaginatedListPatientDto {
    PaginatedListPatient toPaginatedListPatient() => PaginatedListPatient(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toPatient()).toList(),
        nextKeyPair: PaginatedDocumentKeyAndIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListUserDtoMapper on PaginatedListUserDto {
    PaginatedListUser toPaginatedListUser() => PaginatedListUser(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toUser()).toList(),
        nextKeyPair: PaginatedDocumentKeyAndIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListMedicalDeviceMapper on PaginatedListMedicalDevice {
    PaginatedListDeviceDto toPaginatedListDeviceDto() => PaginatedListDeviceDto(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toDeviceDto()).toList(),
        nextKeyPair: PaginatedDocumentKeyIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListDataSampleMapper on PaginatedListDataSample {
    DecryptedPaginatedListServiceDto toPaginatedListDataSample() => DecryptedPaginatedListServiceDto(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toServiceDto(null)).toList(),
        nextKeyPair: PaginatedDocumentKeyIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListCodingMapper on PaginatedListCoding {
    PaginatedListCodeDto toPaginatedListCodeDto() => PaginatedListCodeDto(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toCodeDto()).toList(),
        nextKeyPair: PaginatedDocumentKeyIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListHealthcareElementMapper on PaginatedListHealthcareElement {
    DecryptedPaginatedListHealthElementDto toPaginatedListHealthElementDto() => DecryptedPaginatedListHealthElementDto(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toHealthElementDto()).toList(),
        nextKeyPair: PaginatedDocumentKeyIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}


extension PaginatedListHealthcareProfessionalMapper on PaginatedListHealthcareProfessional {
    PaginatedListHealthcarePartyDto toPaginatedListHealthcarePartyDto() => PaginatedListHealthcarePartyDto(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toHealthcarePartyDto()).toList(),
        nextKeyPair: PaginatedDocumentKeyIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListPatientMapper on PaginatedListPatient {
    DecryptedPaginatedListPatientDto toPaginatedListPatientDto() => DecryptedPaginatedListPatientDto(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toPatientDto()).toList(),
        nextKeyPair: PaginatedDocumentKeyIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

extension PaginatedListUserMapper on PaginatedListUser {
    PaginatedListUserDto toPaginatedListUserDto() => PaginatedListUserDto(
        pageSize: this.pageSize,
        totalSize: this.totalSize,
        rows: this.rows.map((e) => e.toUserDto()).toList(),
        nextKeyPair: PaginatedDocumentKeyIdPairObject(startKey: this.nextKeyPair?.startKey, startKeyDocId: this.nextKeyPair?.startKeyDocId)
    );
}

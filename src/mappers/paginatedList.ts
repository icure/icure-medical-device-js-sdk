import {PaginatedListMedicalDevice} from "../models/PaginatedListMedicalDevice"
import {PaginatedListDataSample} from "../models/PaginatedListDataSample"
import {PaginatedListCoding} from "../models/PaginatedListCoding"
import {PaginatedListHealthcareElement} from "../models/PaginatedListHealthcareElement"
import {PaginatedListHealthcareProfessional} from "../models/PaginatedListHealthcareProfessional"
import {PaginatedListPatient} from "../models/PaginatedListPatient"
import {PaginatedListUser} from "../models/PaginatedListUser"
import {map} from "./utils";
import {PaginatedDocumentKeyAndIdPairObject} from "../models/PaginatedDocumentKeyAndIdPairObject";
import {DataSampleMapper} from "./serviceDataSample";
import {CodingMapper} from "./codeCoding";
import {HealthcareElementMapper} from "./healthcareElement";
import {MedicalDeviceMapper} from "./medicalDevice";

import {
  PaginatedDocumentKeyIdPairObject,
  PaginatedListCode as PaginatedListCodeDto,
  PaginatedListDevice as PaginatedListDeviceDto,
  PaginatedListHealthcareParty as PaginatedListHealthcarePartyDto,
  PaginatedListHealthElement as PaginatedListHealthElementDto,
  PaginatedListMaintenanceTask as PaginatedListMaintenanceTaskDto,
  PaginatedListPatient as PaginatedListPatientDto,
  PaginatedListService as PaginatedListServiceDto,
  PaginatedListUser as PaginatedListUserDto
} from "@icure/api";
import {PatientMapper} from "./patient";
import {UserMapper} from "./user";
import {CodeStubDtoMapper} from "./codeStubCodingReference";
import {HealthcareProfessionalMapper} from "./healthcareProfessional";
import {PaginatedListNotification} from "../models/PaginatedListNotification";
import {notificationMapper} from "./notification";

export namespace PaginatedListMapper {
  import toDataSample = DataSampleMapper.toDataSample;
  import toCoding = CodingMapper.toCoding;
  import toHealthcareElement = HealthcareElementMapper.toHealthcareElement;
  import toMedicalDevice = MedicalDeviceMapper.toMedicalDevice;
  import toPatient = PatientMapper.toPatient;
  import toUser = UserMapper.toUser;
  import toDeviceDto = MedicalDeviceMapper.toDeviceDto;
  import toServiceDto = DataSampleMapper.toServiceDto;
  import toCodeStub = CodeStubDtoMapper.toCodeStub;
  import toHealthElementDto = HealthcareElementMapper.toHealthElementDto;
  import toPatientDto = PatientMapper.toPatientDto;
  import toUserDto = UserMapper.toUserDto;
  import toHealthcareProfessional = HealthcareProfessionalMapper.toHealthcareProfessional;
  import toHealthcarePartyDto = HealthcareProfessionalMapper.toHealthcarePartyDto;
  import toNotification = notificationMapper.toNotification;
  import toMaintenanceTaskDto = notificationMapper.toMaintenanceTaskDto;
  export const toPaginatedListMedicalDevice = (obj?: PaginatedListDeviceDto) => obj ? new PaginatedListMedicalDevice({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toMedicalDevice),
      nextKeyPair: new PaginatedDocumentKeyAndIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListDataSample = (obj?: PaginatedListServiceDto) => obj ? new PaginatedListDataSample({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toDataSample),
      nextKeyPair: new PaginatedDocumentKeyAndIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListCoding = (obj?: PaginatedListCodeDto) => obj ? new PaginatedListCoding({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toCoding),
      nextKeyPair: new PaginatedDocumentKeyAndIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListHealthcareElement = (obj?: PaginatedListHealthElementDto) => obj ? new PaginatedListHealthcareElement({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toHealthcareElement),
      nextKeyPair: new PaginatedDocumentKeyAndIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListHealthcareProfessional = (obj?: PaginatedListHealthcarePartyDto) => obj ? new PaginatedListHealthcareProfessional({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toHealthcareProfessional),
      nextKeyPair: new PaginatedDocumentKeyAndIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListNotification = (obj?: PaginatedListMaintenanceTaskDto) => obj ? new PaginatedListNotification({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toNotification),
      nextKeyPair: new PaginatedDocumentKeyAndIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListPatient = (obj?: PaginatedListPatientDto) => obj ? new PaginatedListPatient({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toPatient),
      nextKeyPair: new PaginatedDocumentKeyAndIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListUser = (obj?: PaginatedListUserDto) => obj ? new PaginatedListUser({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toUser),
      nextKeyPair: new PaginatedDocumentKeyAndIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListDeviceDto = (obj?: PaginatedListMedicalDevice) => obj ? new PaginatedListDeviceDto({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toDeviceDto),
      nextKeyPair: new PaginatedDocumentKeyIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListServiceDto = (obj?: PaginatedListDataSample) => obj ? new PaginatedListServiceDto({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toServiceDto),
      nextKeyPair: new PaginatedDocumentKeyIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListCodeDto = (obj?: PaginatedListCoding) => obj ? new PaginatedListCodeDto({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toCodeStub),
      nextKeyPair: new PaginatedDocumentKeyIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListHealthElementDto = (obj?: PaginatedListHealthcareElement) => obj ? new PaginatedListHealthElementDto({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toHealthElementDto),
      nextKeyPair: new PaginatedDocumentKeyIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListHealthcarePartyDto = (obj?: PaginatedListHealthcareProfessional) => obj ? new PaginatedListHealthcarePartyDto({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toHealthcarePartyDto),
      nextKeyPair: new PaginatedDocumentKeyIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListMaintenanceTaskDto = (obj?: PaginatedListNotification) => obj ? new PaginatedListMaintenanceTaskDto({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toMaintenanceTaskDto),
      nextKeyPair: new PaginatedDocumentKeyIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListPatientDto = (obj?: PaginatedListPatient) => obj ? new PaginatedListPatientDto({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toPatientDto),
      nextKeyPair: new PaginatedDocumentKeyIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;

    export const toPaginatedListUserDto = (obj?: PaginatedListUser) => obj ? new PaginatedListUserDto({
      pageSize: obj.pageSize,
      totalSize: obj.totalSize,
      rows: map(obj.rows, toUserDto),
      nextKeyPair: new PaginatedDocumentKeyIdPairObject({startKey: obj.nextKeyPair?.startKey, startKeyDocId: obj.nextKeyPair?.startKeyDocId})
    }) : undefined;
}

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
import {CodingMapper} from "./CodeCoding";
import {HealthcareElementMapper} from "./HealthcareElement";
import {MedicalDeviceMapper} from "./medicalDevice";

import {
  PaginatedListDevice as PaginatedListDeviceDto,
  PaginatedListService as PaginatedListServiceDto,
  PaginatedListCode as PaginatedListCodeDto,
  PaginatedListHealthElement as PaginatedListHealthElementDto,
  PaginatedListHealthcareParty as PaginatedListHealthcarePartyDto,
  PaginatedListPatient as PaginatedListPatientDto,
  PaginatedListUser as PaginatedListUserDto, PaginatedDocumentKeyIdPairObject
} from "@icure/api";
import {PatientDtoMapper} from "./patient";
import {UserMapper} from "./user";
import {CodeStubDtoMapper} from "./CodeStubCodingReference";
import {HealthcareProfessionalMapper} from "./healthcareProfessional";

export namespace PaginatedListMapper {
    import toDataSample = DataSampleMapper.toDataSample;
  import toCoding = CodingMapper.toCoding;
  import toHealthcareElement = HealthcareElementMapper.toHealthcareElement;
  import toMedicalDevice = MedicalDeviceMapper.toMedicalDevice;
  import toPatient = PatientDtoMapper.toPatient;
  import toUser = UserMapper.toUser;
  import toDeviceDto = MedicalDeviceMapper.toDeviceDto;
  import toServiceDto = DataSampleMapper.toServiceDto;
  import toCodeStub = CodeStubDtoMapper.toCodeStub;
  import toHealthElementDto = HealthcareElementMapper.toHealthElementDto;
  import toPatientDto = PatientDtoMapper.toPatientDto;
  import toUserDto = UserMapper.toUserDto;
  import toHealthcareProfessional = HealthcareProfessionalMapper.toHealthcareProfessional;
  import toHealthcarePartyDto = HealthcareProfessionalMapper.toHealthcarePartyDto;
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

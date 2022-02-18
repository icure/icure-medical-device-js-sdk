import {Device} from "@icure/api";
import {MedicalDevice} from "../models/MedicalDevice";
import {SystemMetaDataOwner} from "../models/SystemMetaDataOwner";
import {forceUuid, map, mapSet} from "./utils";
import {CodeStubDtoMapper} from "./CodeStubCodingReference";
import {PropertyStubMapper} from "./property";

export namespace MedicalDeviceMapper {
  import toCodingReference = CodeStubDtoMapper.toCodingReference;
  import toProperty = PropertyStubMapper.toProperty;

  export const toMedicalDevice = (dto: Device) => new MedicalDevice({
      id: dto.id,
      labels: new Set(map(dto.tags, toCodingReference)),
      codes: new Set(map(dto.codes, toCodingReference)),
      properties: new Set(map(dto.properties, toProperty)),
      rev: dto.rev,
      deletionDate: dto.deletionDate,
      name: dto.name,
      externalId: dto.externalId,
      parentId: dto.parentId,
      picture: dto.picture,
      type: dto.type,
      brand: dto.brand,
      model: dto.model,
      serialNumber: dto.serialNumber,
      systemMetaData: new SystemMetaDataOwner({
        hcPartyKeys: dto.hcPartyKeys,
        privateKeyShamirPartitions: dto.privateKeyShamirPartitions,
      })
  });

  export const toDeviceDto = (obj: MedicalDevice) => new Device({
    id: forceUuid(obj.id),
    tags: mapSet(obj.labels, toCodingReference),
    codes: mapSet(obj.codes, toCodingReference),
    properties: mapSet(obj.properties, toProperty),
    rev: obj.rev,
    deletionDate: obj.deletionDate,
    name: obj.name,
    externalId: obj.externalId,
    parentId: obj.parentId,
    picture: obj.picture,
    type: obj.type,
    brand: obj.brand,
    model: obj.model,
    serialNumber: obj.serialNumber,
    hcPartyKeys: obj.systemMetaData?.hcPartyKeys,
    privateKeyShamirPartitions: obj.systemMetaData?.privateKeyShamirPartitions
  });
}

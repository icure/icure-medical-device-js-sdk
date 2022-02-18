import {Document as DocumentDto} from "@icure/api";
import {Document} from "../models/Document";
import {forceUuid, mapSet} from "./utils";

export namespace DocumentMapper {
  const toDocument = (dto: DocumentDto) => new Document({
    id: dto.id,
    otherUtis: new Set(dto.otherUtis),
    rev: dto.rev,
    created: dto.created,
    modified: dto.modified,
    author: dto.author,
    responsible: dto.responsible,
    medicalLocationId: dto.medicalLocationId,
    deletionDate: dto.deletionDate,
    objectStoreReference: dto.objectStoreReference,
    mainUti: dto.mainUti,
    name: dto.name,
    version: dto.version,
    externalUuid: dto.externalUuid,
    size: dto.size,
    hash: dto.hash,
    attachmentId: dto.attachmentId,
  });

  const toDocumentDto = (obj: Document) => new DocumentDto({
    id: forceUuid(obj.id),
    otherUtis: new Set(obj.otherUtis),
    rev: obj.rev,
    created: obj.created,
    modified: obj.modified,
    author: obj.author,
    responsible: obj.responsible,
    medicalLocationId: obj.medicalLocationId,
    deletionDate: obj.deletionDate,
    objectStoreReference: obj.objectStoreReference,
    mainUti: obj.mainUti,
    name: obj.name,
    version: obj.version,
    externalUuid: obj.externalUuid,
    size: obj.size,
    hash: obj.hash,
    attachmentId: obj.attachmentId,
  });
}

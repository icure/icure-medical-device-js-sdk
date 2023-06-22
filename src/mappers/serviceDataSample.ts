import { forceUuid, map, mapReduce, mapSet, mapSetToArray, toMapSetTransform } from './utils'
import { Content as ContentDto, Measure as MeasureDto, Service, SubContact } from '@icure/api'
import { DataSample } from '../models/DataSample'
import { Content } from '../models/Content'
import { Measure } from '../models/Measure'
import { TimeSeriesMapper } from './timeSeries'
import { CodeStubDtoMapper } from './codeStubCodingReference'
import { IdentifierDtoMapper } from './identifier'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted'
import { DelegationMapper } from './delegation'
import { filterUndefined } from '../utils/filterUndefined'
import { SystemMetaDataMapper } from './metadata'

export namespace DataSampleMapper {
  import toTimeSeries = TimeSeriesMapper.toTimeSeries
  import toTimeSeriesDto = TimeSeriesMapper.toTimeSeriesDto
  import toCodingReference = CodeStubDtoMapper.toCodingReference
  import toCodeStub = CodeStubDtoMapper.toCodeStub
  import toIdentifier = IdentifierDtoMapper.toIdentifier
  import toIdentifierDto = IdentifierDtoMapper.toIdentifierDto
  import toDelegation = DelegationMapper.toDelegation
  import toSystemMetaDataEncrypted = SystemMetaDataMapper.toSystemMetaDataEncrypted

  export const toDataSample = (obj?: Service, batchId?: string, subContacts?: SubContact[]) =>
    obj
      ? new DataSample(
          filterUndefined({
            id: obj.id,
            identifiers: map(obj.identifier, toIdentifier),
            content: mapReduce(obj.content, toContent),
            qualifiedLinks: obj.qualifiedLinks,
            codes: mapSet(new Set(obj.codes), toCodingReference),
            labels: mapSet(new Set(obj.tags), toCodingReference),
            transactionId: obj.transactionId,
            batchId: obj.contactId ?? batchId,
            healthcareElementIds: mapSet(
              new Set(
                obj.healthElementsIds
                  ? obj.healthElementsIds
                  : subContacts?.filter((subContact) => subContact.healthElementId)?.map((subContact) => subContact.healthElementId!)
              ),
              (id) => id
            ),
            canvasesIds: mapSet(
              new Set(subContacts ? subContacts.filter((subContact) => subContact.formId).map((subContact) => subContact.formId!) : obj.formIds),
              (id) => id
            ),
            index: obj.index,
            valueDate: obj.valueDate,
            openingDate: obj.openingDate,
            closingDate: obj.closingDate,
            created: obj.created,
            modified: obj.modified,
            endOfLife: obj.endOfLife,
            author: obj.author,
            responsible: obj.responsible,
            comment: obj.comment,
            systemMetaData: toSystemMetaDataEncrypted(obj),
          })
        )
      : undefined

  export const toContent = (obj?: ContentDto): Content | undefined =>
    obj
      ? new Content(
          filterUndefined({
            stringValue: obj.stringValue,
            numberValue: obj.numberValue,
            booleanValue: obj.booleanValue,
            instantValue: obj.instantValue,
            fuzzyDateValue: obj.fuzzyDateValue,
            binaryValue: obj.binaryValue,
            documentId: obj.documentId,
            measureValue: toMeasure(obj.measureValue),
            timeSeries: toTimeSeries(obj.timeSeries),
            compoundValue: map(obj.compoundValue, (it) => toDataSample(it)),
            ratio: map(obj.ratio, toMeasure),
            range: map(obj.ratio, toMeasure),
          })
        )
      : undefined

  export const toMeasure = (obj?: MeasureDto) =>
    obj
      ? new Measure(
          filterUndefined({
            value: obj.value,
            min: obj.min,
            max: obj.max,
            ref: obj.ref,
            severity: obj.severity,
            severityCode: obj.severityCode,
            evolution: obj.evolution,
            unit: obj.unit,
            unitCodes: mapSet(new Set(obj.unitCodes), toCodingReference),
            comment: obj.comment,
            comparator: obj.comparator,
          })
        )
      : undefined

  export const toServiceDto = (obj?: DataSample, batchId?: string) =>
    obj
      ? new Service(
          filterUndefined({
            id: forceUuid(obj.id),
            identifier: map(obj.identifiers, toIdentifierDto),
            content: mapReduce(obj.content, toContentDto),
            qualifiedLinks: obj.qualifiedLinks,
            codes: mapSetToArray(obj.codes, toCodeStub),
            tags: mapSetToArray(obj.labels, toCodeStub),
            healthElementsIds: mapSetToArray(obj.healthcareElementIds, (id) => id),
            formIds: mapSetToArray(obj.canvasesIds, (id) => id),
            transactionId: obj.transactionId,
            contactId: obj.batchId ?? batchId,
            index: obj.index,
            valueDate: obj.valueDate,
            openingDate: obj.openingDate,
            closingDate: obj.closingDate,
            created: obj.created,
            modified: obj.modified,
            endOfLife: obj.endOfLife,
            author: obj.author,
            responsible: obj.responsible,
            comment: obj.comment,
            /*
             * A user without encryption key may update the non-encrypted data of a service. In this case we need to
             * make sure we don't delete the encrypted data. Other metadata is ignored, we keep that of the original
             * contact
             * TODO TEST THIS
             */
            ...(obj.systemMetaData ? SystemMetaDataMapper.toSystemMetaDataEncryptedDto(obj.systemMetaData) : {}),
          })
        )
      : undefined

  export const toContentDto = (obj?: Content): ContentDto | undefined =>
    obj
      ? new ContentDto(
          filterUndefined({
            stringValue: obj.stringValue,
            numberValue: obj.numberValue,
            booleanValue: obj.booleanValue,
            instantValue: obj.instantValue,
            fuzzyDateValue: obj.fuzzyDateValue,
            binaryValue: obj.binaryValue,
            documentId: obj.documentId,
            measureValue: toMeasureDto(obj.measureValue),
            timeSeries: toTimeSeriesDto(obj.timeSeries),
            compoundValue: map(obj.compoundValue, toServiceDto),
            ratio: map(obj.ratio, toMeasureDto),
            range: map(obj.range, toMeasureDto),
          })
        )
      : undefined

  export const toMeasureDto = (obj?: Measure) =>
    obj
      ? new MeasureDto(
          filterUndefined({
            value: obj.value,
            min: obj.min,
            max: obj.max,
            ref: obj.ref,
            severity: obj.severity,
            severityCode: obj.severityCode,
            evolution: obj.evolution,
            unit: obj.unit,
            unitCodes: mapSetToArray(obj.unitCodes, toCodeStub),
            comment: obj.comment,
            comparator: obj.comparator,
          })
        )
      : undefined
}

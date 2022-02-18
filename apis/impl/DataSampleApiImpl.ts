import {DataSample} from "../../models/DataSample";
import {Filter} from "../../models/Filter";
import {PaginatedListDataSample} from "../../models/PaginatedListDataSample";
import {Document} from "../../models/Document";
import {DataSampleApi} from "../DataSampleApi";

class DataSampleApiImpl implements DataSampleApi {
  createOrModifyDataSampleFor(patientId: string, dataSample: DataSample): Promise<DataSample> {
    return Promise.resolve(undefined);
  }

  createOrModifyDataSamplesFor(patientId: string, dataSample: Array<DataSample>): Promise<Array<DataSample>> {
    return Promise.resolve(undefined);
  }

    deleteAttachment(dataSampleId: string, documentId: string): Promise<string> {
        return Promise.resolve("");
    }

    deleteDataSample(dataSampleId: string): Promise<string> {
        return Promise.resolve("");
    }

    deleteDataSamples(requestBody: Array<string>): Promise<Array<string>> {
        return Promise.resolve(undefined);
    }

    filterDataSample(filter: Filter): Promise<PaginatedListDataSample> {
        return Promise.resolve(undefined);
    }

    getDataSample(dataSampleId: string): Promise<DataSample> {
        return Promise.resolve(undefined);
    }

    getDataSampleAttachmentContent(dataSampleId: string, documentId: string, attachmentId: string): Promise<HttpFile> {
        return Promise.resolve(undefined);
    }

    getDataSampleAttachmentDocument(dataSampleId: string, documentId: string): Promise<Document> {
        return Promise.resolve(undefined);
    }

    matchDataSample(filter: Filter): Promise<Array<string>> {
        return Promise.resolve(undefined);
    }

    setDataSampleAttachment(dataSampleId: string, body: HttpFile, documentName?: string, documentVersion?: string, documentExternalUuid?: string, documentLanguage?: string): Promise<Document> {
        return Promise.resolve(undefined);
    }
}

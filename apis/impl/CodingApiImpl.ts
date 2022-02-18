import {Coding} from "../../models/Coding";
import {Filter} from "../../models/Filter";
import {PaginatedListCoding} from "../../models/PaginatedListCoding";
import {CodingApi} from "../CodingApi";
import {
  IccAuthApi,
  IccCodeApi,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHcpartyXApi,
  IccHelementXApi,
  IccPatientXApi,
  IccUserXApi
} from "@icure/api";
import {forceUuid} from "../../mappers/utils";
import {CodingMapper} from "../../mappers/codeCoding";

class CodingApiImpl implements CodingApi {
  private codeApi: IccCodeApi;

  constructor(api: { cryptoApi: IccCryptoXApi; codeApi: IccCodeApi, authApi: IccAuthApi; userApi: IccUserXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; documentApi: IccDocumentXApi; }) {
    this.codeApi = api.codeApi
  }

  async createOrModifyCoding(coding: Coding): Promise<Coding> {
    const processedCoding = (await this.createOrModifyCodings([coding])).find(e => true);
    if (processedCoding != undefined) {
      return processedCoding;
    } else {
      throw new Error("Couldn't create or update coding");
    }
  }

  async createOrModifyCodings(coding: Array<Coding>): Promise<Array<Coding>> {
    const {toCoding, toCode} = CodingMapper;
    const codingsToCreate = coding.filter(dev => dev.rev == null);
    const codingsToUpdate = coding.filter(dev => dev.rev != null);

    if (!codingsToUpdate.every(coding => coding.id != null && forceUuid(coding.id))) {
      throw Error("Update id should be provided as an UUID");
    }

    const codesToCreate = codingsToCreate.map(d => toCode(d));
    const codesToUpdate = codingsToCreate.map(d => toCode(d));

    const createdCodes = await Promise.all(codesToCreate.map(c => this.codeApi.createCode(c)));
    const updatedCodes = await Promise.all(codesToUpdate.map(c => this.codeApi.modifyCode(c)));
    return [...createdCodes, ...updatedCodes].map(c => toCoding(c));
  }

  async filterCoding(filter: Filter, nextCodingId?: string, limit?: number): Promise<PaginatedListCoding> {
    return Promise.resolve(new PaginatedListCoding({}));
  }

  async getCoding(codingId: string): Promise<Coding> {
    return CodingMapper.toCoding(await this.codeApi.getCode(codingId));
  }

  async matchCoding(filter: Filter): Promise<Array<string>> {
    return Promise.resolve([]);
  }
}

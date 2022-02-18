import {Coding} from "../../models/Coding";
import {Filter} from "../../models/Filter";
import {PaginatedListCoding} from "../../models/PaginatedListCoding";
import {CodingApi} from "../CodingApi";
import {
  IccAuthApi, IccCodeApi,
  IccContactXApi,
  IccCryptoXApi, IccDocumentXApi,
  IccHcpartyXApi,
  IccHelementXApi,
  IccPatientXApi,
  IccUserXApi
} from "@icure/api";

class CodingApiImpl implements CodingApi {
  private codeApi: IccCodeApi;

  constructor(api: { cryptoApi: IccCryptoXApi; codeApi: IccCodeApi, authApi: IccAuthApi; userApi: IccUserXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; documentApi: IccDocumentXApi; }) {
    this.codeApi = api.codeApi

  }

  async createOrModifyCoding(coding: Coding): Promise<Coding> {
      if (coding.rev) {

      }
      (await (coding.rev?.let((it) => this.codeApi.modifyCode(coding.toCodeDto())) ?? api.baseCodeApi.createCode(coding.toCodeDto())))?.toCoding();
    }

    async createOrModifyCodings(coding: Array<Coding>): Promise<Array<Coding>> {
        return Promise.resolve(undefined);
    }

    async filterCoding(filter: Filter, nextCodingId?: string, limit?: number): Promise<PaginatedListCoding> {
        return Promise.resolve(undefined);
    }

    async getCoding(codingId: string): Promise<Coding> {
        return Promise.resolve(undefined);
    }

    async matchCoding(filter: Filter): Promise<Array<string>> {
        return Promise.resolve(undefined);
    }
}

import {Coding} from "../../models/Coding";
import {Filter} from "../../filter/Filter";
import {PaginatedListCoding} from "../../models/PaginatedListCoding";
import {CodingApi} from "../CodingApi";
import {FilterChainCode, IccCodeApi, IccCodeXApi,} from "@icure/api";
import {forceUuid} from "../../mappers/utils";
import {CodingMapper} from "../../mappers/codeCoding";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {firstOrNull} from "../../utils/functionalUtils";

export class CodingApiImpl implements CodingApi {
  private readonly codeApi: IccCodeApi;

  constructor(api: { codeApi: IccCodeXApi}) {
    this.codeApi = api.codeApi
  }

  async createOrModifyCoding(coding: Coding): Promise<Coding> {
    const processedCoding = firstOrNull(await this.createOrModifyCodings([coding]));
    if (processedCoding != undefined) {
      return processedCoding;
    } else {
      throw new Error("Couldn't create or update coding");
    }
  }

  async createOrModifyCodings(coding: Array<Coding>): Promise<Array<Coding>> {
    const codingsToCreate = coding.filter(dev => !dev.rev);
    const codingsToUpdate = coding.filter(dev => !!dev.rev);

    if (!codingsToUpdate.every(c => c.id != null && forceUuid(c.id))) {
      throw Error("Update id should be provided as an UUID");
    }

    const codesToCreate = codingsToCreate.map(d => CodingMapper.toCode(d));
    const codesToUpdate = codingsToCreate.map(d => CodingMapper.toCode(d));

    const createdCodes = await Promise.all(codesToCreate.map(c => this.codeApi.createCode(c)));
    const updatedCodes = await Promise.all(codesToUpdate.map(c => this.codeApi.modifyCode(c)));
    return [...createdCodes, ...updatedCodes].map(c => CodingMapper.toCoding(c));
  }

  async filterCoding(filter: Filter<Coding>, nextCodingId?: string, limit?: number): Promise<PaginatedListCoding> {
    return PaginatedListMapper.toPaginatedListCoding(await this.codeApi.filterCodesBy(undefined, nextCodingId, limit, undefined, undefined, undefined, new FilterChainCode({
      filter: FilterMapper.toAbstractFilterDto<Coding>(filter, 'Coding')
    })))!
  }

  async getCoding(codingId: string): Promise<Coding> {
    return CodingMapper.toCoding(await this.codeApi.getCode(codingId));
  }

  async matchCoding(filter: Filter<Coding>): Promise<Array<string>> {
    return this.codeApi.matchCodesBy(FilterMapper.toAbstractFilterDto<Coding>(filter, 'Coding'));
  }
}

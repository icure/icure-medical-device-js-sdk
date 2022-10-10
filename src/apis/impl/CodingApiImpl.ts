import {Coding} from "../../models/Coding";
import {Filter} from "../../filter/Filter";
import {PaginatedListCoding} from "../../models/PaginatedListCoding";
import {CodingApi} from "../CodingApi";
import {FilterChainCode, IccCodeApi, IccCodeXApi,} from "@icure/api";
import {isCodeId} from "../../mappers/utils";
import {CodingMapper} from "../../mappers/codeCoding";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {firstOrNull} from "../../utils/functionalUtils";
import {ErrorHandler} from "../../services/ErrorHandler";

export class CodingApiImpl implements CodingApi {
  private readonly codeApi: IccCodeApi;
  private readonly errorHandler: ErrorHandler;

  constructor(api: { codeApi: IccCodeXApi }, errorHandler: ErrorHandler) {
    this.codeApi = api.codeApi
    this.errorHandler = errorHandler;
  }

  async createOrModifyCoding(coding: Coding): Promise<Coding> {
    const processedCoding = firstOrNull(await this.createOrModifyCodings([coding]).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }));
    if (processedCoding != undefined) {
      return processedCoding;
    } else {
      throw this.errorHandler.createErrorWithMessage("Couldn't create or update coding");
    }

  }

  async createOrModifyCodings(coding: Array<Coding>): Promise<Array<Coding>> {
    const codingsToCreate = coding.filter(dev => !dev.rev);
    const codingsToUpdate = coding.filter(dev => !!dev.rev);

    if (!codingsToUpdate.every(c => c.id != null && isCodeId(c.id))) {
      throw this.errorHandler.createErrorWithMessage("Update id should be provided as an String of format: type|code|version");
    }

    const codesToCreate = codingsToCreate.map(d => CodingMapper.toCode(d));
    const codesToUpdate = codingsToCreate.map(d => CodingMapper.toCode(d));

    const createdCodes = await Promise.all(codesToCreate.map(c => this.codeApi.createCode(c).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })));
    const updatedCodes = await Promise.all(codesToUpdate.map(c => this.codeApi.modifyCode(c).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })));
    return [...createdCodes, ...updatedCodes].map(c => CodingMapper.toCoding(c));
  }

  async filterCoding(filter: Filter<Coding>, nextCodingId?: string, limit?: number): Promise<PaginatedListCoding> {
    return PaginatedListMapper.toPaginatedListCoding(await this.codeApi.filterCodesBy(undefined, nextCodingId, limit, undefined, undefined, undefined, new FilterChainCode({
      filter: FilterMapper.toAbstractFilterDto<Coding>(filter, 'Coding')
    })).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }))!
  }

  async getCoding(codingId: string): Promise<Coding> {
    return CodingMapper.toCoding(await this.codeApi.getCode(codingId).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }));
  }

  async matchCoding(filter: Filter<Coding>): Promise<Array<string>> {
    return this.codeApi.matchCodesBy(FilterMapper.toAbstractFilterDto<Coding>(filter, 'Coding')).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    });
  }
}

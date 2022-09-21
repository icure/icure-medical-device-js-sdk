import {Coding} from "../../models/Coding";
import {Filter} from "../../filter/Filter";
import {PaginatedListCoding} from "../../models/PaginatedListCoding";
import {CodingApi} from "../CodingApi";
import {FilterChainCode, IccCodeApi, IccCodeXApi, XHR,} from "@icure/api";
import {forceUuid} from "../../mappers/utils";
import {CodingMapper} from "../../mappers/codeCoding";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {firstOrNull} from "../../utils/functionalUtils";

export class CodingApiImpl implements CodingApi {
  private readonly codeApi: IccCodeApi;
  private readonly errorHandler: ErrorHandler;
  private readonly sanitizer: Sanitizer;

  constructor(api: { codeApi: IccCodeXApi }, errorHandler: ErrorHandler, sanitizer: Sanitizer) {
    this.codeApi = api.codeApi
    this.errorHandler = errorHandler;
    this.sanitizer = sanitizer;
  }

  async createOrModifyCoding(coding: Coding): Promise<Coding> {
    try {
      const processedCoding = firstOrNull(await this.createOrModifyCodings([coding]));
      if (processedCoding != undefined) {
        return processedCoding;
      } else {
        throw this.errorHandler.createErrorWithMessage("Couldn't create or update coding");
      }
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e as Error);
      }
      throw e;
    }
  }

  async createOrModifyCodings(coding: Array<Coding>): Promise<Array<Coding>> {
    try {
      const codingsToCreate = coding.filter(dev => !dev.rev);
      const codingsToUpdate = coding.filter(dev => !!dev.rev);

      if (!codingsToUpdate.every(c => c.id != null && forceUuid(c.id))) {
        throw this.errorHandler.createErrorWithMessage("Update id should be provided as an UUID");
      }

      const codesToCreate = codingsToCreate.map(d => CodingMapper.toCode(d));
      const codesToUpdate = codingsToCreate.map(d => CodingMapper.toCode(d));

      const createdCodes = await Promise.all(codesToCreate.map(c => this.codeApi.createCode(c)));
      const updatedCodes = await Promise.all(codesToUpdate.map(c => this.codeApi.modifyCode(c)));
      return [...createdCodes, ...updatedCodes].map(c => CodingMapper.toCoding(c));
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e);
      }
      throw e;
    }
  }

  async filterCoding(filter: Filter<Coding>, nextCodingId?: string, limit?: number): Promise<PaginatedListCoding> {
    try {
      return PaginatedListMapper.toPaginatedListCoding(await this.codeApi.filterCodesBy(undefined, nextCodingId, limit, undefined, undefined, undefined, new FilterChainCode({
        filter: FilterMapper.toAbstractFilterDto<Coding>(filter, 'Coding')
      })))!
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e);
      }
      throw e;
    }
  }

  async getCoding(codingId: string): Promise<Coding> {
    try {
      return CodingMapper.toCoding(await this.codeApi.getCode(codingId));
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e);
      }
      throw e;
    }
  }

  async matchCoding(filter: Filter<Coding>): Promise<Array<string>> {
    try {
      return this.codeApi.matchCodesBy(FilterMapper.toAbstractFilterDto<Coding>(filter, 'Coding'));
    } catch (e) {
      if (e instanceof Error) {
        throw this.errorHandler.createError(e);
      }
      throw e;
    }
  }
}

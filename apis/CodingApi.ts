
import { Coding } from '../models/Coding';
import { Filter } from '../models/Filter';
import { PaginatedListCoding } from '../models/PaginatedListCoding';

  /**
  * no description
  */
  export interface CodingApi {

    /**
      * When modifying a coding, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
      * Create or update a [Coding]
      * @param coding 
    */
    createOrModifyCoding(coding: Coding, ): Promise<Coding >;
    /**
      * When modifying codings, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
      * Create or update a batch of [Coding]
      * @param coding 
    */
    createOrModifyCodings(coding: Array<Coding>, ): Promise<Array<Coding> >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
      * Load codings from the database by filtering them using the provided [filter].
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
      * @param nextCodingId The id of the first coding in the next page
      * @param limit The number of codings to return in the queried page
    */
    filterCoding(filter: Filter, nextCodingId?: string, limit?: number, ): Promise<PaginatedListCoding >;
    /**
      * Each coding is uniquely identified by a coding id. The coding id is a UUID. This [codingId] is the preferred method to retrieve one specific coding.
      * Get a [Coding]
      * @param codingId 
    */
    getCoding(codingId: string, ): Promise<Coding >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
      * Load coding ids from the database by filtering them using the provided [filter].
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
    */
    matchCoding(filter: Filter, ): Promise<Array<string> >;
    }

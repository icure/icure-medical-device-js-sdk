import {Filter} from '../filter/Filter';
import {HealthcareProfessional} from '../models/HealthcareProfessional';
import {PaginatedListHealthcareProfessional} from '../models/PaginatedListHealthcareProfessional';

export interface HealthcareProfessionalApi {

    /**
      * A healthcare professional must have a login, an email or a mobilePhone defined, a healthcare professional should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an healthcare professional, you must ensure that the rev obtained when getting or creating the healthcare professional is present as the rev is used to guarantee that the healthcare professional has not been modified by a third party.
      * Create a new Healthcare professional or modify an existing one.
      * @param healthcareProfessional The healthcare professional that must be created in the database.
    */
    createOrModifyHealthcareProfessional(healthcareProfessional: HealthcareProfessional, ): Promise<HealthcareProfessional >;
    /**
      * Deletes the healthcare professional identified by the provided unique hcpId.
      * Delete an existing healthcare professional.
      * @param hcpId The UUID that uniquely identifies the healthcare professional to be deleted.
    */
    deleteHealthcareProfessional(hcpId: string, ): Promise<string >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcareProfessionalsFilter and HealthcareProfessionalsByIdsFilter. This method returns a paginated list of healthcare professionals (with a cursor that lets you query the following items).
      * Load healthcare professionals from the database by filtering them using the provided Filter.
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
      * @param nextHcpId The id of the first Healthcare professional in the next page
      * @param limit The number of healthcare professionals to return in the queried page
    */
    filterHealthcareProfessionalBy(filter: Filter<HealthcareProfessional>, nextHcpId?: string, limit?: number, ): Promise<PaginatedListHealthcareProfessional >;
    /**
      * Each healthcare professional is uniquely identified by a healthcare professional id. The healthcare professional id is a UUID. This hcpId is the preferred method to retrieve one specific healthcare professional.
      * Get a Healthcare professional by id.
      * @param hcpId The UUID that identifies the healthcare professional uniquely
    */
    getHealthcareProfessional(hcpId: string, ): Promise<HealthcareProfessional >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcare professionalsFilter and Healthcare professionalsByIdsFilter. This method returns the list of the ids of the healthcare professionals matching the filter.
      * Load healthcare professional ids from the database by filtering them using the provided Filter.
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
    */
    matchHealthcareProfessionalBy(filter: Filter<HealthcareProfessional>, ): Promise<Array<string> >;
    }

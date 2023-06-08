import {Delegation, IccCryptoXApi} from "@icure/api";
import {Filter} from "../Filter";
import {DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder} from "./filterDsl";
import {Identifier} from "../../models/Identifier";
import {DataSample} from "../../models/DataSample";
import {PotentiallyEncryptedPatient} from "../../models/Patient";
import {MedTechApi} from "../../apis/MedTechApi";
import {IntersectionFilter} from "../IntersectionFilter";
import {DataSampleByHealthcarePartyFilter} from "../datasample/DataSampleByHealthcarePartyFilter";

interface BaseDataSampleFilterBuilder<F> {
  /**
   * @return the current Data Owner id or throws an exception if not yet specified.
   */
  getDataOwner(): Promise<string>

  /**
   * Includes all the data samples with the specified ids.
   * @param byIds the ids of the data samples.
   */
  byIds(byIds: string[]): F

  /**
   * Includes all the data samples that have at least one of the specified identifiers.
   * @param identifiers
   */
  byIdentifiers(identifiers: Identifier[]): F

  /**
   * Includes all the data samples with at least one of the specified tags or codes.
   * At least one parameter must be specified.
   * @param tagType the type of the tag. If undefined, it will be ignored.
   * @param tagCode the code of the tag. If undefined, it will be ignored.
   * @param codeType the type of the code. If undefined, it will be ignored.
   * @param codeCode the code of the code. If undefined, it will be ignored.
   * @param startValueDate if specified, it will include only the data samples created after this date.
   * @param endValueDate if specified, it will include only the data samples created before this date.
   * @param descending
   */
  byLabelCodeDateFilter(
    tagType?: string,
    tagCode?: string,
    codeType?: string,
    codeCode?: string,
    startValueDate?: number,
    endValueDate?: number,
    descending?: boolean
  ): F

  /**
   * Includes all the healthcare elements that were created for the patients passed as parameter.
   * @param patients
   */
  forPatients(patients: PotentiallyEncryptedPatient[]): F

  /**
   * Includes all the data samples with the specified health elements ids.
   * @param byHealthElementIds
   */
  byHealthElementIds(byHealthElementIds: string[]): F
}

export class DataSampleFilter implements DataOwnerFilterBuilder<DataSample, DataSampleFilterWithDataOwner> {
  forDataOwner(api: MedTechApi, dataOwnerId: string): DataSampleFilterWithDataOwner {
    return new DataSampleFilterWithDataOwner(api, dataOwnerId)
  }

  forSelf(api: MedTechApi): DataSampleFilterWithDataOwner {
    return new DataSampleFilterWithDataOwner(api)
  }
}

class DataSampleFilterWithDataOwner
  extends SortableFilterBuilder<DataSample, DataSampleFilterSortStepDecorator>
  implements BaseDataSampleFilterBuilder<DataSampleFilterWithDataOwner>, FilterBuilder<DataSample>
{
  _dataOwnerId: Promise<string>

  constructor(
    private api: MedTechApi,
    dataOwnerId?: string
  ) {
    super();
    this._dataOwnerId = !!dataOwnerId
      ? Promise.resolve(dataOwnerId)
      : api.userApi.getLoggedUser().then( u => api.dataOwnerApi.getDataOwnerIdOf(u))
  }

  get sort(): DataSampleFilterSortStepDecorator {
    return new DataSampleFilterSortStepDecorator(this)
  }
  getDataOwner(): Promise<string> {
    return this._dataOwnerId
  }

  byIds(byIds: string[]): DataSampleFilterWithDataOwner {
    this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'DataSampleByIdsFilter' }), "ids")
    return this
  }

  byIdentifiers(identifiers: Identifier[]): DataSampleFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        identifiers: identifiers,
        $type: 'DataSampleByHealthcarePartyIdentifiersFilter',
      }
    })
    this._builderAccumulator.addFilter(filter)
    return this
  }

  byLabelCodeDateFilter(
    tagType?: string,
    tagCode?: string,
    codeType?: string,
    codeCode?: string,
    startValueDate?: number,
    endValueDate?: number,
    descending?: boolean
  ): DataSampleFilterWithDataOwner {
    if(!tagType && !tagCode && !codeType && !codeCode && !startValueDate && !endValueDate) {
      throw new Error("At least one parameter must be specified")
    }
    const filter = this._dataOwnerId.then( id => {
      return {
        tagType,
        tagCode,
        codeType,
        codeCode,
        startValueDate,
        endValueDate,
        descending: descending ?? false,
        healthcarePartyId: id,
        $type: 'DataSampleByHealthcarePartyTagCodeDateFilter',
      }
    })
    this._builderAccumulator.addFilter(Promise.resolve(filter))
    return this
  }

  forPatients(patients: PotentiallyEncryptedPatient[]): DataSampleFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return Promise.all(
        patients.map(async (p) =>
          (
            await this.api.cryptoApi.extractKeysHierarchyFromDelegationLikes(
              id,
              p.id!,
              Object.entries(p.systemMetaData!.delegations!)
                .map(([hcpId, delegations]) => [hcpId, Array.from(delegations)] as [string, Delegation[]])
                .reduce((delegationsToDecrypt, [hcpId, delegations]) => {
                  delegationsToDecrypt[hcpId] = delegations
                  return delegationsToDecrypt
                }, {} as { [key: string]: Delegation[] })
            )
          ).map((decryptedDelegations) => decryptedDelegations.extractedKeys)
        )
      ).then( sfks => {
        return       {
          healthcarePartyId: id,
          patientSecretForeignKeys: sfks.reduce((patientSecretForeignKeys, extractedKeys) =>
            patientSecretForeignKeys.concat(extractedKeys.flat()), [] as string[]
          ),
          $type: 'DataSampleByHealthcarePartyPatientFilter',
        }
      })
    })
    this._builderAccumulator.addByIdsFilter(filter, "patientSecretForeignKeys")
    return this
  }

  byHealthElementIds(byHealthElementIds: string[]): DataSampleFilterWithDataOwner {
    const filter = this._dataOwnerId.then( id => {
      return {
        healthcarePartyId: id,
        healthcareElementIds: byHealthElementIds,
        $type: 'DataSampleByHealthcarePartyHealthcareElementIdsFilter',
      }
    })
    this._builderAccumulator.addByIdsFilter(filter, "healthcareElementIds")
    return this
  }

  async build(): Promise<Filter<DataSample>> {
    const filters = await this._builderAccumulator.getAndSortFilters()

    if(filters.some(f => f instanceof NoOpFilter)) {
      console.warn("Warning: the filter you built cannot be resolved and will return no entity")
      return new NoOpFilter()
    } else if (filters.length > 1) {
      return {
        filters: filters,
        $type: 'IntersectionFilter',
      } as IntersectionFilter<DataSample>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { hcpId: await this._dataOwnerId, $type: 'DataSampleByHealthcarePartyFilter' } as DataSampleByHealthcarePartyFilter
    }
  }
}

type NonSortableDataOwnerFilter = BaseDataSampleFilterBuilder<DataSampleFilterWithDataOwner> & FilterBuilder<DataSample>

class DataSampleFilterSortStepDecorator
  implements Omit<BaseDataSampleFilterBuilder<NonSortableDataOwnerFilter>, "getDataOwner"> {

  constructor(
    private dataSampleFilter: DataSampleFilterWithDataOwner
  ) {}

  byIds(byIds: string[]): NonSortableDataOwnerFilter {
    this.dataSampleFilter.byIds(byIds)
    this.dataSampleFilter._builderAccumulator.lastElementIsSortKey()
    return this.dataSampleFilter
  }

  byIdentifiers(identifiers: Identifier[]): NonSortableDataOwnerFilter {
    this.dataSampleFilter.byIdentifiers(identifiers)
    this.dataSampleFilter._builderAccumulator.lastElementIsSortKey()
    return this.dataSampleFilter
  }

  byLabelCodeDateFilter(
    tagType?: string,
    tagCode?: string,
    codeType?: string,
    codeCode?: string,
    startValueDate?: number,
    endValueDate?: number,
    descending?: boolean
  ): NonSortableDataOwnerFilter {
    this.dataSampleFilter.byLabelCodeDateFilter(tagType, tagCode, codeType, codeCode, startValueDate, endValueDate, descending)
    this.dataSampleFilter._builderAccumulator.lastElementIsSortKey()
    return this.dataSampleFilter
  }

  forPatients(patients: PotentiallyEncryptedPatient[]): NonSortableDataOwnerFilter {
    this.dataSampleFilter.forPatients(patients)
    this.dataSampleFilter._builderAccumulator.lastElementIsSortKey()
    return this.dataSampleFilter
  }

  byHealthElementIds(byHealthElementIds: string[]): NonSortableDataOwnerFilter {
    this.dataSampleFilter.byHealthElementIds(byHealthElementIds)
    this.dataSampleFilter._builderAccumulator.lastElementIsSortKey()
    return this.dataSampleFilter
  }

}

import { IccCryptoXApi, IccDeviceApi, IccHcpartyXApi, IccPatientXApi, IccUserXApi, KeyStorageFacade } from '@icure/api'
import { DataOwnerApi } from '../DataOwnerApi'
import { User } from '../../models/User'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { ErrorHandler } from '../../services/ErrorHandler'
import { IccMaintenanceTaskXApi } from '@icure/api/icc-x-api/icc-maintenance-task-x-api'
import { DataOwnerTypeEnum, DataOwnerWithType } from '../../models/DataOwner'
import { DataOwnerTypeEnum as DataOwnerTypeEnumDto } from '@icure/api/icc-api/model/DataOwnerTypeEnum'
import { MedicalDeviceMapper } from '../../mappers/medicalDevice'
import { HealthcareProfessional } from '../../models/HealthcareProfessional'
import { HealthcareProfessionalMapper } from '../../mappers/healthcareProfessional'
import { PatientMapper } from '../../mappers/patient'
import { IccIcureMaintenanceXApi } from '@icure/api/icc-x-api/icc-icure-maintenance-x-api'
import { KeyPairUpdateRequest } from '@icure/api/icc-x-api/maintenance/KeyPairUpdateRequest'
import { DataOwnerMapper } from '../../mappers/dataOwner'

export class DataOwnerApiImpl implements DataOwnerApi {
  private readonly cryptoApi: IccCryptoXApi
  private readonly userApi: IccUserXApi
  private readonly dataOwnerApi: IccDataOwnerXApi
  private readonly patientApi: IccPatientXApi
  private readonly hcPartyApi: IccHcpartyXApi
  private readonly deviceApi: IccDeviceApi
  private readonly icureMaintenanceTaskApi: IccIcureMaintenanceXApi
  private readonly errorHandler: ErrorHandler
  private readonly keyStorage: KeyStorageFacade

  constructor(
    api: {
      cryptoApi: IccCryptoXApi
      userApi: IccUserXApi
      dataOwnerApi: IccDataOwnerXApi
      patientApi: IccPatientXApi
      healthcarePartyApi: IccHcpartyXApi
      deviceApi: IccDeviceApi
      icureMaintenanceTaskApi: IccIcureMaintenanceXApi
    },
    errorHandler: ErrorHandler,
    keyStorage: KeyStorageFacade
  ) {
    this.cryptoApi = api.cryptoApi
    this.userApi = api.userApi
    this.dataOwnerApi = api.dataOwnerApi
    this.patientApi = api.patientApi
    this.hcPartyApi = api.healthcarePartyApi
    this.deviceApi = api.deviceApi
    this.errorHandler = errorHandler
    this.keyStorage = keyStorage
    this.icureMaintenanceTaskApi = api.icureMaintenanceTaskApi
  }

  getDataOwnerIdOf(user: User): string {
    const dataOwnerId = user.healthcarePartyId ?? user.patientId ?? user.deviceId
    if (dataOwnerId == undefined) {
      throw this.errorHandler.createErrorWithMessage(
        `The current user is not a data owner. You must be either a patient, a device or a healthcare professional to call this method.`
      )
    }
    return dataOwnerId
  }

  async giveAccessBackTo(ownerId: string, ownerNewPublicKey: string): Promise<void> {
    try {
      await this.icureMaintenanceTaskApi.applyKeyPairUpdate({
        concernedDataOwnerId: ownerId,
        newPublicKey: ownerNewPublicKey,
      })
    } catch (e) {
      console.error(e)
      throw this.errorHandler.createErrorWithMessage(
        `Could not give access back to owner ${ownerId} with public key ${ownerNewPublicKey}. Try again later`
      )
    }
  }

  async getDataOwner(ownerId: string): Promise<DataOwnerWithType> {
    const retrieved = await this.dataOwnerApi.getDataOwner(ownerId)
    return DataOwnerMapper.toDataOwnerWithTypeDecryptingPatient(retrieved, async (p) => (await this.patientApi.tryDecryptOrReturnOriginal([p]))[0])
  }
}

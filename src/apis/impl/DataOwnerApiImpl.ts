import {
  Device,
  HealthcareParty,
  hex2ua,
  IccCryptoXApi,
  IccDeviceApi,
  IccHcpartyXApi,
  IccPatientXApi,
  IccUserXApi,
  KeyStorageFacade,
  Patient,
  pkcs8ToJwk,
  spkiToJwk,
  ua2hex,
} from '@icure/api'
import { DataOwnerApi } from '../DataOwnerApi'
import { User } from '../../models/User'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { UserMapper } from '../../mappers/user'
import { ErrorHandler } from '../../services/ErrorHandler'
import { IccMaintenanceTaskXApi } from '@icure/api/icc-x-api/icc-maintenance-task-x-api'

export class DataOwnerApiImpl implements DataOwnerApi {
  private readonly cryptoApi: IccCryptoXApi
  private readonly userApi: IccUserXApi
  private readonly dataOwnerApi: IccDataOwnerXApi
  private readonly patientApi: IccPatientXApi
  private readonly hcPartyApi: IccHcpartyXApi
  private readonly deviceApi: IccDeviceApi
  private readonly maintenanceTaskApi: IccMaintenanceTaskXApi
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
      maintenanceTaskApi: IccMaintenanceTaskXApi
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
    this.maintenanceTaskApi = api.maintenanceTaskApi
    this.keyStorage = keyStorage
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

  async initCryptoFor(
    user: User,
    overwriteExistingKeys: boolean = false,
    keyPair?: { publicKey: string; privateKey: string }
  ): Promise<{ publicKey: string; privateKey: string }> {
    const dataOwnerId = this.getDataOwnerIdOf(user)

    const { publicKey, privateKey } = keyPair ?? (await this._generateKeyPair())
    const jwk = {
      publicKey: spkiToJwk(hex2ua(publicKey)),
      privateKey: pkcs8ToJwk(hex2ua(privateKey)),
    }
    await this.cryptoApi.cacheKeyPair(jwk)
    await this.keyStorage.storeKeyPair(`${dataOwnerId}.${publicKey.slice(-32)}`, jwk)

    const dataOwner = await this.cryptoApi.getDataOwner(dataOwnerId).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })
    if (dataOwner == null) {
      throw this.errorHandler.createErrorWithMessage(
        `The current user is not a data owner. You must be either a patient, a device or a healthcare professional to call this method.`
      )
    }

    if (dataOwner.dataOwner.publicKey == undefined) {
      await this._updateUserToAddNewlyCreatedPublicKey(user, dataOwner.dataOwner, publicKey)
    } else if (dataOwner.dataOwner.publicKey != publicKey && overwriteExistingKeys) {
      console.log(`Adding a new RSA Key Pair to user ${user.id}`)
      await this.cryptoApi.addRawKeyPairForOwner(this.maintenanceTaskApi, UserMapper.toUserDto(user)!, dataOwner, {
        publicKey: publicKey,
        privateKey: privateKey,
      })
    }

    return { publicKey: publicKey, privateKey: privateKey }
  }

  private async _generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    const { publicKey, privateKey } = await this.cryptoApi.RSA.generateKeyPair()
    const publicKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(publicKey!, 'spki'))
    const privKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(privateKey!, 'pkcs8'))

    return { publicKey: publicKeyHex, privateKey: privKeyHex }
  }

  private async _updateUserToAddNewlyCreatedPublicKey(user: User, dataOwner: Patient | Device | HealthcareParty, dataOwnerPublicKey: string) {
    dataOwner.publicKey = dataOwnerPublicKey

    if (dataOwner instanceof Patient) {
      await this.patientApi.modifyPatientRaw(dataOwner).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    } else if (dataOwner instanceof HealthcareParty) {
      await this.hcPartyApi.modifyHealthcareParty(dataOwner).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    } else {
      await this.deviceApi.updateDevice(dataOwner).catch((e) => {
        throw this.errorHandler.createErrorFromAny(e)
      })
    }

    this.cryptoApi.emptyHcpCache(dataOwner.id!)

    if (user.patientId != undefined) {
      await this._initPatientDelegationsAndSave(user)
    }
  }

  private async _initPatientDelegationsAndSave(user: User) {
    const userDto = UserMapper.toUserDto(user)
    if (userDto == undefined) {
      throw this.errorHandler.createErrorWithMessage(`Could not map user to iCure Base User version : Make sure your user info are valid`)
    }

    const patientToUpdate = await this.patientApi
      .getPatientRaw(user.patientId!)
      .then((patient) => this.patientApi.initDelegationsAndEncryptionKeys(patient, userDto))
      .then(async (patientWithDelsAndEncKeys) => {
        const currentPatient = await this.patientApi.getPatientRaw(user.patientId!)
        return new Patient({
          ...currentPatient,
          delegations: Object.assign(patientWithDelsAndEncKeys.delegations ?? {}, currentPatient.delegations),
          encryptionKeys: Object.assign(patientWithDelsAndEncKeys.encryptionKeys ?? {}, currentPatient.encryptionKeys),
        })
      })

    await this.patientApi.modifyPatientWithUser(userDto, patientToUpdate)
    this.cryptoApi.emptyHcpCache(patientToUpdate.id!)
  }

  async giveAccessBackTo(ownerId: string, ownerNewPublicKey: string): Promise<boolean> {
    try {
      const currentUser = await this.userApi.getCurrentUser()
      await this.cryptoApi.giveAccessBackTo(currentUser, ownerId, ownerNewPublicKey)
      return Promise.resolve(true)
    } catch (e) {
      throw this.errorHandler.createErrorWithMessage(
        `Could not give access back to owner ${ownerId} with public key ${ownerNewPublicKey}. Try again later`
      )
    }

    return Promise.resolve(false)
  }
}

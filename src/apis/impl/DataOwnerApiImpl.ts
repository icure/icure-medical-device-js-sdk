import {
  Device,
  HealthcareParty,
  IccCryptoXApi,
  IccDeviceApi,
  IccHcpartyXApi,
  IccPatientXApi,
  IccUserXApi,
  jwk2pkcs8,
  jwk2spki,
  KeyStorageFacade,
  Patient,
  ua2hex,
} from '@icure/api'
import { DataOwnerApi } from '../DataOwnerApi'
import { User } from '../../models/User'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { ErrorHandler } from '../../services/ErrorHandler'

export type DataOwner = Patient | Device | HealthcareParty

export class DataOwnerApiImpl implements DataOwnerApi {
  private readonly cryptoApi: IccCryptoXApi
  private readonly userApi: IccUserXApi
  private readonly dataOwnerApi: IccDataOwnerXApi
  private readonly patientApi: IccPatientXApi
  private readonly hcPartyApi: IccHcpartyXApi
  private readonly deviceApi: IccDeviceApi
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

  /**
   * @deprecated this method is no longer needed as the api will automatically perform all necessary checks on startup
   * and ask for a new key if necessary through the provided crypto strategies.
   */
  async initCryptoFor(user: User, keyPair?: { publicKey: string; privateKey: string }): Promise<{ publicKey: string; privateKey: string }[]> {
    const dataOwnerId = this.getDataOwnerIdOf(user)
    const dataOwner = await this.dataOwnerApi.getDataOwner(dataOwnerId).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    if (dataOwner == null) {
      throw this.errorHandler.createErrorWithMessage(
        `The current user is not a data owner. You must be either a patient, a device or a healthcare professional to call this method.`
      )
    }

    const userKeyPairs = await Promise.all(
      Object.values(this.cryptoApi.userKeysManager.getDecryptionKeys()).map(async (pair) => ({
        privateKey: ua2hex(await this.cryptoApi.primitives.RSA.exportKey(pair.privateKey, 'pkcs8')),
        publicKey: ua2hex(await this.cryptoApi.primitives.RSA.exportKey(pair.publicKey, 'spki')),
      }))
    )

    if (userKeyPairs?.length && !!keyPair) {
      const isProvidedKeyPairAlreadyPresent = userKeyPairs
        .filter((k) => k.publicKey === keyPair.publicKey)
        .some((k) => k.privateKey === keyPair.privateKey)

      if (!isProvidedKeyPairAlreadyPresent) {
        throw this.errorHandler.createErrorWithMessage(`The provided key pair is not present on the device and other key pairs are already present.`)
      }
    }

    if (!userKeyPairs?.length) {
      throw this.errorHandler.createErrorWithMessage('Illegal state: data owner keys should have been initialised.')
    }

    return userKeyPairs
  }

  async giveAccessBackTo(ownerId: string, ownerNewPublicKey: string) {
    try {
      await this.cryptoApi.exchangeKeys.base.giveAccessBackTo(ownerId, ownerNewPublicKey, this.cryptoApi.userKeysManager.getDecryptionKeys())
    } catch (e) {
      throw this.errorHandler.createErrorWithMessage(
        `Could not give access back to owner ${ownerId} with public key ${ownerNewPublicKey}. Try again later`
      )
    }
  }
}

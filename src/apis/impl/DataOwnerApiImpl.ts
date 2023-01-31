import {
  Device,
  HealthcareParty,
  hex2ua,
  IccCryptoXApi,
  IccDeviceApi,
  IccHcpartyXApi,
  IccPatientXApi,
  IccUserXApi,
  jwk2pkcs8,
  jwk2spki,
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

export type DataOwner = Patient | Device | HealthcareParty

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

  async initCryptoFor(user: User, keyPair?: { publicKey: string; privateKey: string }): Promise<{ publicKey: string; privateKey: string }[]> {
    const dataOwnerId = this.getDataOwnerIdOf(user)
    const dataOwner = await this.cryptoApi.getDataOwner(dataOwnerId).catch((e) => {
      throw this.errorHandler.createErrorFromAny(e)
    })

    if (dataOwner == null) {
      throw this.errorHandler.createErrorWithMessage(
        `The current user is not a data owner. You must be either a patient, a device or a healthcare professional to call this method.`
      )
    }

    const userKeyPairs = await this._loadCurrentUserKeyPairsOnDevice(dataOwner.dataOwner)
    const hasExistingKeys = userKeyPairs !== undefined && userKeyPairs.length > 0

    if (hasExistingKeys && !!keyPair) {
      const isProvidedKeyPairAlreadyPresent = userKeyPairs
        .filter((k) => jwk2spki(k.publicKey) === keyPair.publicKey)
        .some((k) => jwk2pkcs8(k.privateKey) === keyPair.privateKey)

      if (!isProvidedKeyPairAlreadyPresent) {
        throw this.errorHandler.createErrorWithMessage(`The provided key pair is not present on the device and other key pairs are already present.`)
      }
    }

    await Promise.all(userKeyPairs?.map((kp) => this.cryptoApi.cacheKeyPair(kp)) ?? [])

    if (!hasExistingKeys) {
      const { publicKey, privateKey } = keyPair ?? (await this._generateKeyPair())
      const jwks = {
        publicKey: spkiToJwk(hex2ua(publicKey)),
        privateKey: pkcs8ToJwk(hex2ua(privateKey)),
      }

      await this.keyStorage.storeKeyPair(`${dataOwnerId}.${publicKey.slice(-32)}`, jwks)
      await this.cryptoApi.cacheKeyPair(jwks)

      if (dataOwner.dataOwner.publicKey == undefined) {
        await this._updateUserToAddNewlyCreatedPublicKey(user, dataOwner.dataOwner, publicKey)
      } else if (dataOwner.dataOwner.publicKey != publicKey) {
        console.log(`Adding a new RSA Key Pair to user ${user.id}`)
        await this.cryptoApi.addKeyPairForOwner(this.maintenanceTaskApi, UserMapper.toUserDto(user)!, dataOwner, {
          publicKey: await this.cryptoApi.RSA.importKey('jwk', jwks.publicKey, ['encrypt']),
          privateKey: await this.cryptoApi.RSA.importKey('jwk', jwks.privateKey, ['decrypt']),
        })
      }
      return [{ publicKey, privateKey }]
    }
    return userKeyPairs.map((kp) => ({ publicKey: jwk2spki(kp.publicKey), privateKey: jwk2pkcs8(kp.privateKey) }))
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

    const patientToUpdate = await this.patientApi.getPatientRaw(user.patientId!).then(async (patient) => {
      if (Object.keys(patient.encryptionKeys ?? {}).length || Object.keys(patient.delegations ?? {}).length) {
        return new Patient(
          await this.cryptoApi.addDelegationsAndEncryptionKeys(null, patient, user.patientId!, user.patientId!, this.cryptoApi.randomUuid(), null)
        )
      } else {
        const initialised = await this.patientApi.initDelegationsAndEncryptionKeys(patient, userDto)
        const currentPatient = await this.patientApi.getPatientRaw(user.patientId!)
        return new Patient({
          ...currentPatient,
          delegations: Object.assign(initialised.delegations ?? {}, currentPatient.delegations),
          encryptionKeys: Object.assign(initialised.encryptionKeys ?? {}, currentPatient.encryptionKeys),
        })
      }
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

  private _getDataOwnerPublicKeys(dataOwner: Patient | Device | HealthcareParty): string[] {
    return [...new Set(Object.keys(dataOwner.aesExchangeKeys ?? {}).concat(dataOwner.publicKey ?? ''))].filter((k) => k != '')
  }

  private async _loadCurrentUserKeyPairsOnDevice(dataOwner: DataOwner): Promise<{ publicKey: JsonWebKey; privateKey: JsonWebKey }[] | undefined> {
    const dataOwnerPublicKeys = this._getDataOwnerPublicKeys(dataOwner)

    if (dataOwnerPublicKeys.length <= 0) {
      return undefined
    }
    return (await Promise.all(dataOwnerPublicKeys.map((pub) => this.keyStorage.getKeypair(`${dataOwner.id}.${pub.slice(-32)}`)))).filter(
      (kp) => kp !== undefined
    ) as { publicKey: JsonWebKey; privateKey: JsonWebKey }[]
  }

  private async _generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    const { publicKey, privateKey } = await this.cryptoApi.RSA.generateKeyPair()
    const publicKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(publicKey!, 'spki'))
    const privKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(privateKey!, 'pkcs8'))

    return { publicKey: publicKeyHex, privateKey: privKeyHex }
  }
}

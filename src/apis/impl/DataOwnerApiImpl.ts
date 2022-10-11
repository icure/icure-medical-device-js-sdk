import { Device, HealthcareParty, hex2ua, IccCryptoXApi, IccDeviceApi, IccHcpartyXApi, IccPatientXApi, Patient, ua2hex } from '@icure/api'
import { DataOwnerApi } from '../DataOwnerApi'
import { User } from '../../models/User'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { UserMapper } from '../../mappers/user'
import { ErrorHandler } from '../../services/ErrorHandler'

export class DataOwnerApiImpl implements DataOwnerApi {
  private readonly cryptoApi: IccCryptoXApi
  private readonly dataOwnerApi: IccDataOwnerXApi
  private readonly patientApi: IccPatientXApi
  private readonly hcPartyApi: IccHcpartyXApi
  private readonly deviceApi: IccDeviceApi
  private readonly errorHandler: ErrorHandler

  constructor(
    api: {
      cryptoApi: IccCryptoXApi
      dataOwnerApi: IccDataOwnerXApi
      patientApi: IccPatientXApi
      healthcarePartyApi: IccHcpartyXApi
      deviceApi: IccDeviceApi
    },
    errorHandler: ErrorHandler
  ) {
    this.dataOwnerApi = api.dataOwnerApi
    this.cryptoApi = api.cryptoApi
    this.patientApi = api.patientApi
    this.hcPartyApi = api.healthcarePartyApi
    this.deviceApi = api.deviceApi
    this.errorHandler = errorHandler
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
    await this.cryptoApi.RSA.storeKeyPair(dataOwnerId, {
      publicKey: this.cryptoApi.utils.spkiToJwk(hex2ua(publicKey)),
      privateKey: this.cryptoApi.utils.pkcs8ToJwk(hex2ua(privateKey)),
    })

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
      console.log(`Generating a new RSA Key Pair for user ${user.id}`)
      //TODO User lost his key
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
      .then((patient) => this.patientApi.initDelegations(patient, userDto))
      .then(async (patientWithDelegations) => {
        const currentPatient = await this.patientApi.getPatientRaw(user.patientId!)
        return new Patient({ ...currentPatient, delegations: Object.assign(patientWithDelegations.delegations ?? {}, currentPatient.delegations) })
      })
      .then((patientWithDelegations) => this.patientApi.initEncryptionKeys(userDto, patientWithDelegations))

    await this.patientApi.modifyPatientWithUser(userDto, patientToUpdate)
    this.cryptoApi.emptyHcpCache(patientToUpdate.id!)
  }
}

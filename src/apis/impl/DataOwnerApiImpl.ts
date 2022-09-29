import {
  Device,
  HealthcareParty,
  hex2ua,
  IccCryptoXApi,
  IccDeviceApi,
  IccHcpartyXApi,
  IccPatientXApi,
  Patient,
  ua2hex
} from "@icure/api";
import {DataOwnerApi} from "../DataOwnerApi";
import {User} from "../../models/User";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {UserMapper} from "../../mappers/user";


export class DataOwnerApiImpl implements DataOwnerApi {
  private readonly cryptoApi: IccCryptoXApi;
  private readonly dataOwnerApi: IccDataOwnerXApi;
  private readonly patientApi: IccPatientXApi;
  private readonly hcPartyApi: IccHcpartyXApi;
  private readonly deviceApi: IccDeviceApi;

  constructor(api: { cryptoApi: IccCryptoXApi, dataOwnerApi: IccDataOwnerXApi, patientApi: IccPatientXApi,
    healthcarePartyApi: IccHcpartyXApi, deviceApi: IccDeviceApi }) {
    this.dataOwnerApi = api.dataOwnerApi
    this.cryptoApi = api.cryptoApi
    this.patientApi = api.patientApi
    this.hcPartyApi = api.healthcarePartyApi
    this.deviceApi = api.deviceApi
  }

  getDataOwnerIdOf(user: User): string {
    const dataOwnerId = user.healthcarePartyId?? user.patientId ?? user.deviceId
    if (dataOwnerId == undefined) {
      throw Error(`User ${user.id} is not a data owner : Make sure he is linked either to a healthcare party, a patient or a medical device`);
    }
    return dataOwnerId;
  }

  async initCryptoFor(user: User, overwriteExistingKeys: boolean = false, keyPair?: { publicKey: string, privateKey: string}): Promise<{ publicKey: string, privateKey: string}> {
    const dataOwnerId = this.getDataOwnerIdOf(user);

    const { publicKey, privateKey } = keyPair ?? await this._generateKeyPair()
    await this.cryptoApi.RSA.storeKeyPair(dataOwnerId, {
      publicKey: this.cryptoApi.utils.spkiToJwk(hex2ua(publicKey)),
      privateKey: this.cryptoApi.utils.pkcs8ToJwk(hex2ua(privateKey))
    })

    const dataOwner = await this.cryptoApi.getDataOwner(dataOwnerId);
    if (dataOwner == null) {
      throw Error("User ${user.id} is not a data owner : Make sure he is linked either to a healthcare party, a patient or a medical device");
    }

    if (dataOwner.dataOwner.publicKey == undefined) {
      await this._updateUserToAddNewlyCreatedPublicKey(user, dataOwner.dataOwner, publicKey);
    } else if (dataOwner.dataOwner.publicKey != publicKey && overwriteExistingKeys) {
      console.log(`Generating a new RSA Key Pair for user ${user.id}`)
      //TODO User lost his key
    }

    return { publicKey: publicKey, privateKey: privateKey};
  }

  private async _generateKeyPair(): Promise<{ publicKey: string, privateKey: string}> {
    const { publicKey, privateKey } = await this.cryptoApi.RSA.generateKeyPair()
    const publicKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(publicKey!, 'spki'))
    const privKeyHex = ua2hex(await this.cryptoApi.RSA.exportKey(privateKey!, 'pkcs8'))

    return { publicKey: publicKeyHex, privateKey: privKeyHex }
  }

  private async _updateUserToAddNewlyCreatedPublicKey(user: User, dataOwner: Patient | Device | HealthcareParty, dataOwnerPublicKey: string) {
    dataOwner.publicKey = dataOwnerPublicKey;

    if (dataOwner instanceof Patient) {
      await this.patientApi.modifyPatientRaw(dataOwner)
    } else if (dataOwner instanceof HealthcareParty) {
      await this.hcPartyApi.modifyHealthcareParty(dataOwner)
    } else {
      await this.deviceApi.updateDevice(dataOwner)
    }

    this.cryptoApi.emptyHcpCache(dataOwner.id!)

    if (user.patientId != undefined) {
      await this._initPatientDelegationsAndSave(user);
    }
  }

  private async _initPatientDelegationsAndSave(user: User) {
    const userDto = UserMapper.toUserDto(user)
    if (userDto == undefined) {
      throw Error(`Could not map user to iCure Base User version : Make sure your user info are valid`)
    }

    const patientToUpdate = await this.patientApi.getPatientRaw(user.patientId!)
      .then((patient) => this.patientApi.initDelegations(patient, userDto))
      .then(async (patientWithDelegations) => {
        const currentPatient = await this.patientApi.getPatientRaw(user.patientId!)
        return new Patient({...currentPatient, delegations: Object.assign(patientWithDelegations.delegations ?? {}, currentPatient.delegations)});
      })
      .then((patientWithDelegations) => this.patientApi.initEncryptionKeys(userDto, patientWithDelegations))

    await this.patientApi.modifyPatientWithUser(userDto, patientToUpdate)
    this.cryptoApi.emptyHcpCache(patientToUpdate.id!)
  }
}

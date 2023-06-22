import { MedTechApi } from '../apis/MedTechApi'

export class AuthenticationResult {
  constructor(json: IAuthenticationResult) {
    Object.assign(this as AuthenticationResult, json)
  }

  'medTechApi': MedTechApi
  /**
   * Available key pairs for the data owner using the api. Hex-encoded byte representation of the private key and public
   * key in pkcs8 and spki format respectively. Note that the key pairs are automatically saved in the key storage
   * implementation provided by iCure. This includes both verified and unverified key pairs.
   */
  'keyPairs': { privateKey: string; publicKey: string }[]
  'token': string
  'groupId': string
  'userId': string
}

interface IAuthenticationResult {
  medTechApi?: MedTechApi
  keyPairs?: { privateKey: string; publicKey: string }[]
  token?: string
  groupId?: string
  userId?: string
}

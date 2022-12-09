import { MedTechApi } from '../apis/MedTechApi'

export class AuthenticationResult {
  constructor(json: IAuthenticationResult) {
    Object.assign(this as AuthenticationResult, json)
  }

  'medTechApi': MedTechApi
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

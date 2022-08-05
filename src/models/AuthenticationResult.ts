import {MedTechApi} from "../apis/medTechApi";

export class AuthenticationResult {
  constructor(json: IAuthenticationResult) {
    Object.assign(this as AuthenticationResult, json)
  }

  'medTechApi': MedTechApi;
  'keyPair': [string, string];
  'token': string;
  'groupId': string;
  'userId': string;

}

interface IAuthenticationResult {
  'medTechApi'?: MedTechApi;
  'keyPair'?: [string, string];
  'token'?: string;
  'groupId'?: string;
  'userId'?: string;}

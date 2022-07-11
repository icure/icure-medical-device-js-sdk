import {medTechApi, MedTechApi} from '../src/apis/medTechApi';
import {User} from '../src/models/User';
import {webcrypto} from 'crypto';
import {hex2ua, ua2hex} from '@icure/api';
import {AnonymousMedTechApiBuilder} from '../src/apis/AnonymousMedTechApi';
import axios, {Method} from 'axios';
import {v4 as uuid} from 'uuid';
import * as md5 from 'md5';
import {Patient} from '../src/models/Patient';
import {assert} from "chai";
import {HealthcareElement} from "../src/models/HealthcareElement";
import {DataSample} from "../src/models/DataSample";
import {CodingReference} from "../src/models/CodingReference";

const apiKey = process.env.ICURE_TS_TEST_RAPID_API_KEY!;

const delay = (delay: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), delay));

let cachedHcpApi: MedTechApi | undefined;
let cachedHcpLoggedUser: User | undefined;
let cachedPatient: Patient | undefined;
let cachedHealthcareElement: HealthcareElement | undefined;

export class TestUtils {

  static async createDefaultPatient(medTechApi: MedTechApi): Promise<Patient> {
    return medTechApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'John',
        lastName: 'Snow',
        note: 'Winter is coming',
      })
    );
  }
  
  static async createMedTechApiAndLoggedUserFor(iCureUrl: string, userName: string, password: string, dataOwnerKey: string): Promise<{api: MedTechApi, user: User}> {
    const medtechApi = await medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build();

    const foundUser = await medtechApi.userApi.getLoggedUser();
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      foundUser.healthcarePartyId ?? foundUser.patientId ?? foundUser.deviceId!,
      hex2ua(dataOwnerKey)
    );

    return {api: medtechApi, user: foundUser};
  }

  static async signUpUserUsingEmail(iCureUrl: string, msgGtwUrl: string, authProcessId: string, hcpId: string): Promise<{api: MedTechApi, user: User}> {
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureUrlPath(iCureUrl)
      .withAuthServerUrl(msgGtwUrl)
      .withCrypto(webcrypto as any)
      .withAuthProcessId(authProcessId)
      .build();

    const domainOptions = {
      method: 'GET' as Method,
      url: 'https://privatix-temp-mail-v1.p.rapidapi.com/request/domains/',
      headers: {
        'X-RapidAPI-Host': 'privatix-temp-mail-v1.p.rapidapi.com',
        'X-RapidAPI-Key': apiKey,
      },
    };

    const { data: domains } = await axios.request(domainOptions);
    const email = `${uuid()}${domains[0]}`;
    const emailMd5 = md5(email);
    const process =
      await anonymousMedTechApi.authenticationApi.startAuthentication(
        hcpId,
        'Antoine',
        'Duchâteau',
        email,
        'a58afe0e-02dc-431b-8155-0351140099e4'
      );

    const { publicKey, privateKey } =
      await anonymousMedTechApi.cryptoApi.RSA.generateKeyPair();
    const publicKeyHex = ua2hex(
      await anonymousMedTechApi.cryptoApi.RSA.exportKey(publicKey, 'spki')
    );
    const privateKeyHex = ua2hex(
      await anonymousMedTechApi.cryptoApi.RSA.exportKey(privateKey, 'pkcs8')
    );

    await delay(10000);

    const emailOptions = {
      method: 'GET' as Method,
      url: `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${emailMd5}/`,
      headers: {
        'X-RapidAPI-Host': 'privatix-temp-mail-v1.p.rapidapi.com',
        'X-RapidAPI-Key': apiKey,
      },
    };
    const { data: emails } = await axios.request(emailOptions);

    const subjectCode = emails[0].mail_subject!.replace(/.*?(\d+).*/, '$1');
    const result =
      await anonymousMedTechApi.authenticationApi.completeAuthentication(
        process!,
        subjectCode,
        [privateKeyHex, publicKeyHex],
        () => undefined
      );
    if (result?.medTechApi == undefined) {
      throw Error(`Couldn't sign up user by email for current test`)
    }

    const foundUser = await result.medTechApi.userApi.getLoggedUser();
    await result.medTechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      foundUser.healthcarePartyId ?? foundUser.patientId ?? foundUser.deviceId!,
      hex2ua(privateKeyHex)
    );
    assert(result);
    assert(result!.token != null);
    assert(result!.userId != null);

    return {api: result.medTechApi, user: foundUser};
  }

  static async getOrCreateHcpApiAndLoggedUser(iCureUrl: string, hcpUserName: string, hcpPassword: string, hcpPrivKey: string): Promise<{api: MedTechApi, user: User}> {
    if (cachedHcpApi == undefined && cachedHcpLoggedUser == undefined) {
      const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey);
      cachedHcpApi = apiAndUser.api;
      cachedHcpLoggedUser = apiAndUser.user;
    }

    return {api: cachedHcpApi!, user: cachedHcpLoggedUser!};
  }

  static async getOrCreatePatient(medtechApi: MedTechApi): Promise<Patient> {
    if (cachedPatient == undefined) {
      cachedPatient = await medtechApi.patientApi.createOrModifyPatient(
        new Patient({
          firstName: "John",
          lastName: "Snow",
          note: "Winter is coming",
        })
      );
    }
    return cachedPatient
  }

  static async getOrCreateHealthElement(
    medtechApi: MedTechApi,
    patient: Patient
  ): Promise<HealthcareElement> {
    if (cachedHealthcareElement == undefined) {
      cachedHealthcareElement = await medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
        new HealthcareElement({
          note: "Hero Syndrome",
        }),
        patient!.id!
      );
    }
    return cachedHealthcareElement;
  }

  static createDataSampleForPatient(medtechApi: MedTechApi, patient: Patient) {
    return medtechApi.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([
          new CodingReference({type: "IC-TEST", code: "TEST"}),
        ]),
        content: {en: {stringValue: "Hello world"}},
      })
    );
  }
}


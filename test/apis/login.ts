import {assert} from "chai";
import axios, {Method} from "axios";
import "mocha";
import "isomorphic-fetch";
import {webcrypto} from "crypto";
import {v4 as uuid} from "uuid";
import {ua2hex} from "@icure/api";
import * as md5 from "md5";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {AnonymousMedTechApiBuilder} from "../../src/apis/AnonymousMedTechApi";

const tmp = os.tmpdir();
console.log("Saving keys in " + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = "";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
const msgGtwUrl =
  process.env.ICURE_TS_TEST_MSG_GTW_URL ?? "https://msg-gw.icure.cloud/ic";
const authProcessId =
  process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ??
  "6a355458dbfa392cb5624403190c6a19";
const apiKey = process.env.ICURE_TS_TEST_RAPID_API_KEY!;
const hcpId = process.env.ICURE_TS_TEST_HCP_ID!;

const delay = (delay: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), delay));

describe("Login / Sign-Up", () => {
  it("HCP should be capable of logging in / sign up using email", async () => {
    const anonymousMedTechApi = new AnonymousMedTechApiBuilder()
      .withICureUrlPath(iCureUrl)
      .withAuthServerUrl(msgGtwUrl)
      .withCrypto(webcrypto as any)
      .withAuthProcessId(authProcessId)
      .build();

    const domainOptions = {
      method: "GET" as Method,
      url: "https://privatix-temp-mail-v1.p.rapidapi.com/request/domains/",
      headers: {
        "X-RapidAPI-Host": "privatix-temp-mail-v1.p.rapidapi.com",
        "X-RapidAPI-Key": apiKey,
      },
    };

    const { data: domains } = await axios.request(domainOptions);
    const email = `${uuid()}${domains[0]}`;
    const emailMd5 = md5(email);
    const process =
      await anonymousMedTechApi.authenticationApi.startAuthentication(
        hcpId,
        "Antoine",
        "Duchâteau",
        email,
        "process.env.ICURE_RECAPTCHA"
      );
    assert(process);

    const { publicKey, privateKey } =
      await anonymousMedTechApi.cryptoApi.RSA.generateKeyPair();
    const publicKeyHex = ua2hex(
      await anonymousMedTechApi.cryptoApi.RSA.exportKey(publicKey!, "spki")
    );
    const privateKeyHex = ua2hex(
      await anonymousMedTechApi.cryptoApi.RSA.exportKey(privateKey!, "pkcs8")
    );

    await delay(10000);

    const emailOptions = {
      method: "GET" as Method,
      url: `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${emailMd5}/`,
      headers: {
        "X-RapidAPI-Host": "privatix-temp-mail-v1.p.rapidapi.com",
        "X-RapidAPI-Key": apiKey,
      },
    };
    const { data: emails } = await axios.request(emailOptions);

    const subjectCode = emails[0].mail_subject!.replace(/.*?([0-9]+).*/, "$1");
    const result =
      await anonymousMedTechApi.authenticationApi.completeAuthentication(
        process!,
        subjectCode,
        [privateKeyHex, publicKeyHex],
        () => undefined
      );

    assert(result);
    assert(result!.token != null);
    assert(result!.userId != null);

    const currentUser = await result!.medTechApi.userApi.getLoggedUser();
    assert(currentUser);
    assert(currentUser.email == email);
    assert(currentUser.healthcarePartyId != null);

    const currentHcp =
      await result!.medTechApi.healthcareProfessionalApi.getHealthcareProfessional(
        currentUser.healthcarePartyId!
      );
    assert(currentHcp);
    assert(currentHcp.firstName == "Antoine");
    assert(currentHcp.lastName == "Duchâteau");
  }).timeout(60000);
});

import {assert, expect} from "chai";
import "mocha";
import "isomorphic-fetch";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {TestUtils} from "../test-utils";
import {AnonymousMedTechApiBuilder} from "../../src/apis/AnonymousMedTechApi";
import {webcrypto} from "crypto";
import {MedTechApiBuilder} from "../../src/apis/medTechApi";

const tmp = os.tmpdir();
console.log("Saving keys in " + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = "";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
const msgGtwUrl =
  process.env.ICURE_TS_TEST_MSG_GTW_URL ?? "https://msg-gw.icure.cloud";
const msgGtwSpecId =
  process.env.ICURE_TS_TEST_MSG_GTW_SPEC_ID ?? "ic";
const authProcessHcpId = process.env.ICURE_TS_TEST_AUTH_PROCESS_HCP_ID!;

describe("Authentication API", () => {

  it("AnonymousMedTechApi shouldn't be instantiated if both authServerUrl and specId aren't passed", async () => {
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ??
      "6a355458dbfa392cb5624403190c6a19"; // pragma: allowlist secret

    try {
      await new AnonymousMedTechApiBuilder()
        .withICureUrlPath(iCureUrl)
        .withAuthServerUrl(msgGtwUrl)
        .withCrypto(webcrypto as any)
        .withAuthProcessId(authProcessId)
        .build();
      expect(true, "promise should fail").eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq("authSpecId is required")
    }

    try {
      const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
        .withICureUrlPath(iCureUrl)
        .withAuthServerUrl(msgGtwUrl)
        .withAuthSpecId(msgGtwSpecId)
        .withCrypto(webcrypto as any)
        .withAuthProcessId(authProcessId)
        .build();

      expect(anonymousMedTechApi, "anonymousMedTechApi shouldn't be null").not.null
    } catch (e) {
      expect(true, "promise should not fail").eq(false)
    }

    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureUrlPath(iCureUrl)
      .withAuthServerUrl(msgGtwUrl)
      .withAuthSpecId(msgGtwSpecId)
      .withCrypto(webcrypto as any)
      .withAuthProcessId(authProcessId)
      .build();
  })

  it("MedTechApi shouldn't be instantiated if both authServerUrl and specId aren't passed", async () => {
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ??
      "6a355458dbfa392cb5624403190c6a19"; // pragma: allowlist secret

    try {
      await new MedTechApiBuilder()
        .withICureBasePath(iCureUrl)
        .withAuthServerUrl(msgGtwUrl)
        .withCrypto(webcrypto as any)
        .withAuthProcessId(authProcessId)
        .build();
      expect(true, "promise should fail").eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq("Don't forget to provide the specId you received in the Cockpit alongside the authServerUrl")
    }

    try {
      await new MedTechApiBuilder()
        .withICureBasePath(iCureUrl)
        .withAuthSpecId(msgGtwSpecId)
        .withCrypto(webcrypto as any)
        .withAuthProcessId(authProcessId)
        .build();
      expect(true, "promise should fail").eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq("Don't forget to provide the specId you received in the Cockpit alongside the authServerUrl")
    }

    try {
      const medTechApi = await new MedTechApiBuilder()
        .withICureBasePath(iCureUrl)
        .withAuthServerUrl(msgGtwUrl)
        .withAuthSpecId(msgGtwSpecId)
        .withCrypto(webcrypto as any)
        .withAuthProcessId(authProcessId)
        .build();

      expect(medTechApi, "medTechApi shouldn't be null").not.null
    } catch (e) {
      expect(true, "promise should not fail").eq(false)
    }
  })

  it("User should not be able to start authentication if he didn't provide any email and mobilePhone", async () => {
    // Given
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ??
      "6a355458dbfa392cb5624403190c6a19"; // pragma: allowlist secret

    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureUrlPath(iCureUrl)
      .withAuthServerUrl(msgGtwUrl)
      .withAuthSpecId(msgGtwSpecId)
      .withCrypto(webcrypto as any)
      .withAuthProcessId(authProcessId)
      .build();

    // When
    try {
      await anonymousMedTechApi.authenticationApi.startAuthentication(authProcessHcpId, 'Tom', 'Gideon', 'a58afe0e-02dc-431b-8155-0351140099e4', undefined, undefined);
      expect(true, "promise should fail").eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq("In order to start authentication of a user, you should at least provide its email OR its mobilePhone")
    }
  });

  it("User should not be able to start authentication if he provided an empty email and mobilePhone", async () => {
    // Given
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ??
      "6a355458dbfa392cb5624403190c6a19"; // pragma: allowlist secret

    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureUrlPath(iCureUrl)
      .withAuthServerUrl(msgGtwUrl)
      .withAuthSpecId(msgGtwSpecId)
      .withCrypto(webcrypto as any)
      .withAuthProcessId(authProcessId)
      .build();

    // When
    try {
      await anonymousMedTechApi.authenticationApi.startAuthentication(authProcessHcpId, 'Tom', 'Gideon', 'a58afe0e-02dc-431b-8155-0351140099e4', '', '');
      expect(true, "promise should fail").eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq("In order to start authentication of a user, you should at least provide its email OR its mobilePhone")
    }
  });

  it("HCP should be capable of signing up using email", async () => {
    // Given
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ??
      "6a355458dbfa392cb5624403190c6a19"; // pragma: allowlist secret

    // When
    const hcpApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, msgGtwSpecId, authProcessId, authProcessHcpId);
    const currentUser = hcpApiAndUser.user;

    // Then
    assert(currentUser);
    assert(currentUser.healthcarePartyId != null);

    const currentHcp =
      await hcpApiAndUser.api.healthcareProfessionalApi.getHealthcareProfessional(
        currentUser.healthcarePartyId!
      );
    assert(currentHcp);
    assert(currentHcp.firstName == "Antoine");
    assert(currentHcp.lastName == "Duchâteau");
  }).timeout(60000);



  it("Patient should be able to signing up through email", async () => {
    // Given
    const patAuthProcessId = process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ?? "6a355458dbfa392cb5624403190c39e5";

    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, msgGtwSpecId, patAuthProcessId, authProcessHcpId);

    // Then
    const currentUser = patApiAndUser.user;
    assert(currentUser);
    assert(currentUser.patientId != null);

    const currentPatient =
      await patApiAndUser.api.patientApi.getPatient(
        currentUser.patientId!
      );
    assert(currentPatient);
    assert(currentPatient.firstName == "Antoine");
    assert(currentPatient.lastName == "Duchâteau");
  }).timeout(60000);
});

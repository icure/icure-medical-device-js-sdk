import {assert} from "chai";
import "mocha";
import "isomorphic-fetch";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {TestUtils} from "../test-utils";

const tmp = os.tmpdir();
console.log("Saving keys in " + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = "";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
const msgGtwUrl =
  process.env.ICURE_TS_TEST_MSG_GTW_URL ?? "https://msg-gw.icure.cloud/ic";
const authProcessHcpId = process.env.ICURE_TS_TEST_AUTH_PROCESS_HCP_ID!;

describe("Login / Sign-Up", () => {
  it("HCP should be capable of logging in / sign up using email", async () => {
    // Given
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ??
      "6a355458dbfa392cb5624403190c6a19";

    // When
    const hcpApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, authProcessId, authProcessHcpId);
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

  it("Patient should be able to login / sign up through email", async () => {
    // Given
    const patAuthProcessId = process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ?? "6a355458dbfa392cb5624403190c39e5";

    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, patAuthProcessId, authProcessHcpId);

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

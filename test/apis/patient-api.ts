import "mocha";
import {medTechApi} from "../../src/apis/medTechApi";
import "isomorphic-fetch";
import {webcrypto} from "crypto";

import {hex2ua} from "@icure/api";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {assert} from "chai";
import {Patient} from "../../src/models/Patient";
import {HealthcareElement} from "../../src/models/HealthcareElement";

const tmp = os.tmpdir();
console.log("Saving keys in " + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = "";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
const userName = process.env.ICURE_TS_TEST_USER!;
const password = process.env.ICURE_TS_TEST_PWD!;
const privKey = process.env.ICURE_TS_TEST_PRIV_KEY!;

describe("Patient API", () => {
  it("Can create a patient and a related Healthcare Element", async () => {
    const medtechApi = medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build();

    const loggedUser = await medtechApi.userApi.getLoggedUser();
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    );

    const patientToCreate = new Patient({
      firstName: "John",
      lastName: "Snow",
      note: "Winter is coming",
    });

    // when
    const patient = await medtechApi.patientApi.createOrModifyPatient(
      patientToCreate
    );

    // Then
    assert(patient.id != undefined);
    assert(patient.firstName == "John");
    assert(patient.lastName == "Snow");
    assert(patient.note == "Winter is coming");
    assert(
      patient.systemMetaData?.delegations[loggedUser.healthcarePartyId!] !=
        undefined
    );
    assert(
      patient.systemMetaData?.encryptionKeys[loggedUser.healthcarePartyId!] !=
        undefined
    );

    // Init
    const healthElementToCreate = new HealthcareElement({
      note: "Hero Syndrome",
    });

    const createdHealthElement =
      await medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
        healthElementToCreate,
        patient.id
      );

    // Then
    assert(createdHealthElement.id != undefined);
    assert(createdHealthElement.note == "Hero Syndrome");
    assert(createdHealthElement.systemMetaData?.secretForeignKeys != undefined);
    assert(
      createdHealthElement.systemMetaData?.delegations[
        loggedUser.healthcarePartyId!
      ] != undefined
    );
  });
});

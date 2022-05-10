import "mocha";
import {medTechApi} from "../apis/medTechApi";
import "isomorphic-fetch";
import {webcrypto} from "crypto";

import {hex2ua, sleep} from "@icure/api";
import {DataSampleFilter} from "../filter";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {assert} from "chai";
import {DataSample} from "../models/DataSample";
import {CodingReference} from "../models/CodingReference";
import {Patient} from "../models/Patient";

const tmp = os.tmpdir();
console.log("Saving keys in " + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = "";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v2";
const userName = process.env.ICURE_TS_TEST_USER!;
const password = process.env.ICURE_TS_TEST_PWD!;
const privKey = process.env.ICURE_TS_TEST_PRIV_KEY!;

describe("Subscription API", () => {
  it("Can subscribe to Data Samples", async () => {
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

    const hcp =
      await medtechApi.healthcareProfessionalApi.getHealthcareProfessional(
        loggedUser.healthcarePartyId!
      );
    const events = [];
    const statuses = [];
    const connection = (
      await medtechApi.dataSampleApi.subscribeToDataSampleEvents(
        ["CREATE"],
        await new DataSampleFilter()
          .forDataOwner(hcp.id!)
          .byTagCodeFilter("IC-TEST", "TEST")
          .build(),
        async (ds) => {
          events.push(ds);
        }
      )
    )
      .onConnected(() => statuses.push("CONNECTED"))
      .onClosed(() => statuses.push("CLOSED"));

    const patient = await medtechApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: "John",
        lastName: "Snow",
        note: "Winter is coming",
      })
    );
    await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([
          new CodingReference({ type: "IC-TEST", code: "TEST" }),
        ]),
        content: { en: { stringValue: "Hello world" } },
      })
    );

    sleep(2000);
    connection.close();
    sleep(1000);

    assert(events.length === 1, "The events have not been recorded");
    assert(statuses.length === 2, "The statuses have not been recorded");
  }).timeout(60000);
});

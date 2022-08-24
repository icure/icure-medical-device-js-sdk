import "mocha";
import {medTechApi, MedTechApi} from "../../src/apis/medTechApi";
import "isomorphic-fetch";
import {webcrypto} from "crypto";

import {hex2ua, sleep} from "@icure/api";
import {DataSampleFilter} from "../../src/filter";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {assert} from "chai";
import {DataSample} from "../../src/models/DataSample";
import {CodingReference} from "../../src/models/CodingReference";
import {Patient} from "../../src/models/Patient";

const tmp = os.tmpdir();
console.log("Saving keys in " + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = "";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v2";
const userName = process.env.ICURE_TS_TEST_HCP_3_USER!;
const password = process.env.ICURE_TS_TEST_HCP_3_PWD!;
const privKey = process.env.ICURE_TS_TEST_HCP_3_PRIV_KEY!;
let medtechApi: MedTechApi | undefined = undefined;
const testType = "IC-TEST";
const testCode = "TEST";

describe("Subscription API", () => {

  before(async () => {
    medtechApi = await medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build();
  });

  async function createDataSamplesAndSubscribe(api: MedTechApi, options: {}) {
    const loggedUser = await api.userApi.getLoggedUser();
    await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    );

    const hcp =
      await api.healthcareProfessionalApi.getHealthcareProfessional(
        loggedUser.healthcarePartyId!
      );
    const events: DataSample[] = [];
    const statuses: string[] = [];
    const connection = (
      await api.dataSampleApi.subscribeToDataSampleEvents(
        ["CREATE"],
        await new DataSampleFilter()
          .forDataOwner(hcp.id!)
          .byTagCodeFilter(testType, testCode)
          .build(),
        async (ds) => {
          events.push(ds);
        },
        options
      )
    )
      .onConnected(() => statuses.push("CONNECTED"))
      .onClosed(() => statuses.push("CLOSED"));

    const patient = await api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: "John",
        lastName: "Snow",
        note: "Winter is coming",
      })
    );
    await api.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([
          new CodingReference({type: testType, code: testCode}),
        ]),
        content: {en: {stringValue: "Hello world"}},
      })
    );

    await sleep(2000);
    connection.close();
    await sleep(1000);

    events?.forEach((event) => console.log(`Event : ${event}`))
    statuses?.forEach((event) => console.log(`Status : ${event}`))

    assert(events.length === 1, "The events have not been recorded");
    assert(statuses.length === 2, "The statuses have not been recorded");
  }

  it("Can subscribe to Data Samples", async () => {
    await createDataSamplesAndSubscribe(medtechApi!, {});
  }).timeout(60000);

  it("Can subscribe to Data Samples with options", async () => {
    await createDataSamplesAndSubscribe(medtechApi!, {keepAlive: 100, lifetime: 10000});
  }).timeout(60000);
});

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
const userName = process.env.ICURE_TS_TEST_HCP_USER!;
const password = process.env.ICURE_TS_TEST_HCP_PWD!;
const privKey = process.env.ICURE_TS_TEST_HCP_PRIV_KEY!;
let medtechApi: MedTechApi | undefined = undefined;
const testType = "IC-TEST";
const testCode = "TEST";

async function createPatientAndDataSample(api: MedTechApi, codeType: string, codeCode: string) {
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
        new CodingReference({type: codeType, code: codeCode}),
      ]),
      content: {en: {stringValue: "Hello world"}},
    })
  );
}

function checkStatusesAndEvents(events: DataSample[], statuses: string[], expectedEventsNumber: number, expectedStatusesNumber: number) {
  events?.forEach((event) => console.log(`Event : ${event}`))
  statuses?.forEach((event) => console.log(`Status : ${event}`))

  assert(events.length === expectedEventsNumber, "The events have not been recorded");
  assert(statuses.length === expectedStatusesNumber, "The statuses have not been recorded");
}

describe("Subscription API", () => {

  before(async () => {
    medtechApi = await medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build();
  });

  it("Can subscribe to Data Samples", async () => {
    const loggedUser = await medtechApi!.userApi.getLoggedUser();
    await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    );

    const hcp =
      await medtechApi!.healthcareProfessionalApi.getHealthcareProfessional(
        loggedUser.healthcarePartyId!
      );
    const events: DataSample[] = [];
    const statuses: string[] = [];
    const connection = (
      await medtechApi!.dataSampleApi.subscribeToDataSampleEvents(
        ["CREATE"],
        await new DataSampleFilter()
          .forDataOwner(hcp.id!)
          .byTagCodeFilter(testType, testCode)
          .build(),
        async (ds) => {
          events.push(ds);
        }
      )
    )
      .onConnected(() => statuses.push("CONNECTED"))
      .onClosed(() => statuses.push("CLOSED"));

    await createPatientAndDataSample(medtechApi!, testType, testCode);

    await sleep(2000);
    connection.close();
    await sleep(1000);

    checkStatusesAndEvents(events, statuses, 1, 2);

  }).timeout(60000);

  it("Can subscribe to Data Samples with options", async () => {
    const loggedUser = await medtechApi!.userApi.getLoggedUser();
    await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    );

    const hcp =
      await medtechApi!.healthcareProfessionalApi.getHealthcareProfessional(
        loggedUser.healthcarePartyId!
      );

    const events: DataSample[] = [];
    const statuses: string[] = [];
    const connection = (
      await medtechApi!.dataSampleApi.subscribeToDataSampleEvents(
        ["CREATE"],
        await new DataSampleFilter()
          .forDataOwner(hcp.id!)
          .byTagCodeFilter(testType, testCode)
          .build(),
        async (ds) => {
          events.push(ds);
        },
        {
          keepAlive: 100,
          lifetime: 10000
        }
      )
    )
      .onConnected(() => statuses.push("CONNECTED"))
      .onClosed(() => statuses.push("CLOSED"));

    await createPatientAndDataSample(medtechApi!, testType, testCode);

    await sleep(2000);
    connection.close();
    await sleep(1000);

    checkStatusesAndEvents(events, statuses, 1, 2);

  }).timeout(60000);
});

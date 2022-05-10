import "mocha";
import {MedTechApi, medTechApi} from "../../src/apis/medTechApi";
import "isomorphic-fetch";
import {webcrypto} from "crypto";

import {hex2ua} from "@icure/api";
import {DataSampleFilter} from "../../src/filter";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {assert} from "chai";
import {Patient} from "../../src/models/Patient";
import {DataSample} from "../../src/models/DataSample";
import {CodingReference} from "../../src/models/CodingReference";
import {HealthcareElement} from "../../src/models/HealthcareElement";
import {User} from "../../src/models/User";

const tmp = os.tmpdir();
console.log("Saving keys in " + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = "";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
const userName = process.env.ICURE_TS_TEST_USER!;
const password = process.env.ICURE_TS_TEST_PWD!;
const privKey = process.env.ICURE_TS_TEST_PRIV_KEY!;

let api: MedTechApi | undefined;
let loggedUser: User | undefined;
let patient: Patient | undefined;
let healthElement: HealthcareElement | undefined;

async function getOrCreateMedTechApiAndLoggedUser(): Promise<{api: MedTechApi, user: User}> {
  if (api == undefined && loggedUser == undefined) {
    const medtechApi = medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build();

    const foundUser = await medtechApi.userApi.getLoggedUser();
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      foundUser.healthcarePartyId!,
      hex2ua(privKey)
    );

    api = medtechApi;
    loggedUser = foundUser;
  }

  return {api: api!, user: loggedUser!};
}

async function getOrCreatePatient(medtechApi: MedTechApi): Promise<Patient> {
  if (patient == undefined) {
    patient = await medtechApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: "John",
        lastName: "Snow",
        note: "Winter is coming",
      })
    );
  }
  return patient!
}

async function getOrCreateHealthElement(
  medtechApi: MedTechApi,
  patient: Patient
): Promise<HealthcareElement> {
  if (healthElement == undefined) {
    healthElement = await medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({
        note: "Hero Syndrome",
      }),
      patient!.id!
    );
  }
  return healthElement;
}

describe("Data Samples API", () => {
  it("Create Data Sample - Success", async () => {
    // Given
    const apiAndUser = await getOrCreateMedTechApiAndLoggedUser()
    const medtechApi = apiAndUser.api;

    const patient = await getOrCreatePatient(medtechApi);
    const dataSampleToCreate = new DataSample({
      labels: new Set([new CodingReference({ type: "IC-TEST", code: "TEST" })]),
      content: { en: { stringValue: "Hello world" } },
    });

    // When
    const createdDataSample =
      await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
        patient.id!,
        dataSampleToCreate
      );

    // Then
    assert(createdDataSample != undefined);
    assert(createdDataSample.id != undefined);
  });

  it("Create Data Sample linked to HealthElement - Success", async () => {
    // Given
    const apiAndUser = await getOrCreateMedTechApiAndLoggedUser()
    const medtechApi = apiAndUser.api;

    const patient = await getOrCreatePatient(medtechApi);
    const healthElement = await getOrCreateHealthElement(medtechApi, patient);
    const dataSampleToCreate = new DataSample({
      labels: new Set([new CodingReference({ type: "IC-TEST", code: "TEST" })]),
      content: { en: { stringValue: "Hello world" } },
      healthcareElementIds: new Set([healthElement!.id!]),
    });

    // When creating a data sample, linked to this healthcare element
    const createdDataSample =
      await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
        patient.id!,
        dataSampleToCreate
      );

    // Then
    assert(createdDataSample != undefined);
    assert(createdDataSample.id != undefined);
    assert(
      createdDataSample.healthcareElementIds?.has(healthElement.id!) == true
    );
  });

  it("Create Data Sample and modify it to link it to HealthElement - Success", async () => {
    // Given
    const apiAndUser = await getOrCreateMedTechApiAndLoggedUser()
    const medtechApi = apiAndUser.api;

    const patient = await getOrCreatePatient(medtechApi);
    const createdDataSample = await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          labels: new Set([
            new CodingReference({ type: "IC-TEST", code: "TEST" }),
          ]),
          content: { en: { stringValue: "Hello world" } },
        })
      );
    const healthElement = await getOrCreateHealthElement(medtechApi, patient);

    // When
    const modifiedDataSample =
      await medtechApi.dataSampleApi.createOrModifyDataSampleFor(patient.id!, {
        ...createdDataSample,
        healthcareElementIds: new Set([healthElement!.id!]),
      });

    // Then
    assert(modifiedDataSample != undefined);
    assert(modifiedDataSample.id == createdDataSample.id);
    assert(
      modifiedDataSample.healthcareElementIds?.has(healthElement.id!) == true
    );
  });

  it("Can not create Data Sample with invalid healthElementId", async () => {
    // Given
    const apiAndUser = await getOrCreateMedTechApiAndLoggedUser()
    const medtechApi = apiAndUser.api;
    const loggedUser = apiAndUser.user;
    const patient = await getOrCreatePatient(medtechApi);

    // When
    const createdDataSample = await medtechApi.dataSampleApi
      .createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          labels: new Set([
            new CodingReference({ type: "IC-TEST", code: "TEST" }),
          ]),
          content: { en: { stringValue: "Hello world" } },
          healthcareElementIds: new Set(["I-DO-NOT-EXIST"]),
        })
      )
      .catch((e) => {
        assert(
          (e as Error).message ==
            `Health elements I-DO-NOT-EXIST do not exist or user ${loggedUser.id} may not access them`
        );
      });

    // Then
    assert(createdDataSample == undefined);
  });

  it("Filter Data Samples", async () => {
    const apiAndUser = await getOrCreateMedTechApiAndLoggedUser()
    const medtechApi = apiAndUser.api;
    const loggedUser = apiAndUser.user;

    const hcp =
      await medtechApi.healthcareProfessionalApi.getHealthcareProfessional(
        loggedUser.healthcarePartyId!
      );
    const patient = await getOrCreatePatient(medtechApi);
    const createdDataSample =
      await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          labels: new Set([
            new CodingReference({ type: "IC-TEST", code: "TEST" }),
          ]),
          content: { en: { stringValue: "Hello world" } },
        })
      );

    const filter = await new DataSampleFilter()
      .forDataOwner(hcp.id!)
      .byTagCodeFilter("IC-TEST", "TEST")
      .forPatients(medtechApi.cryptoApi, [patient])
      .build();

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(
      filter
    );
    assert(filteredDataSamples.rows.find((ds) => ds.id == createdDataSample.id));
  });

  it("Filter data samples by HealthElementIds - Success", async () => {
    // Given
    const apiAndUser = await getOrCreateMedTechApiAndLoggedUser()
    const medtechApi = apiAndUser.api;
    const loggedUser = apiAndUser.user;

    const patient = await getOrCreatePatient(medtechApi);
    const healthElement = await getOrCreateHealthElement(medtechApi, patient);
    const createdDataSample =
      await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          labels: new Set([
            new CodingReference({ type: "IC-TEST", code: "TEST" }),
          ]),
          content: { en: { stringValue: "Hello world" } },
          healthcareElementIds: new Set([healthElement!.id!]),
        })
      );

    const filter = await new DataSampleFilter()
      .forDataOwner(loggedUser.healthcarePartyId!)
      .byHealthElementIds([healthElement!.id!])
      .build();

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(
      filter
    );

    const testedDataSample = filteredDataSamples.rows.find((ds) => ds.id == createdDataSample.id);
    assert(testedDataSample != undefined)
    assert(testedDataSample!.healthcareElementIds!.has(healthElement.id!));
  });
});

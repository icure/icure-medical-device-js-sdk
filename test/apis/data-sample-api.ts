import "mocha";
import {MedTechApi} from "../../src/apis/medTechApi";
import "isomorphic-fetch";

import {DataSampleFilter} from "../../src/filter";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {assert} from "chai";
import {Patient} from "../../src/models/Patient";
import {DataSample} from "../../src/models/DataSample";
import {CodingReference} from "../../src/models/CodingReference";
import {HealthcareElement} from "../../src/models/HealthcareElement";
import {User} from "../../src/models/User";
import {TestUtils} from "../test-utils";

const tmp = os.tmpdir();
console.log("Saving keys in " + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = "";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
const hcpUserName = process.env.ICURE_TS_TEST_HCP_USER!;
const hcpPassword = process.env.ICURE_TS_TEST_HCP_PWD!;
const hcpPrivKey = process.env.ICURE_TS_TEST_HCP_PRIV_KEY!;
const patUserName = process.env.ICURE_TS_TEST_PAT_USER!;
const patPassword = process.env.ICURE_TS_TEST_PAT_PWD!;
const patPrivKey = process.env.ICURE_TS_TEST_PAT_PRIV_KEY!;
const hcp2UserName = process.env.ICURE_TS_TEST_HCP_2_USER!;
const hcp2Password = process.env.ICURE_TS_TEST_HCP_2_PWD!;
const hcp2PrivKey = process.env.ICURE_TS_TEST_HCP_2_PRIV_KEY!;

let hcpApi: MedTechApi | undefined;
let hcpLoggedUser: User | undefined;
let defaultPatient: Patient | undefined;
let defaultHealthcareElement: HealthcareElement | undefined;

async function getOrCreateHcpApiAndLoggedUser(): Promise<{api: MedTechApi, user: User}> {
  if (hcpApi == undefined && hcpLoggedUser == undefined) {
    const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    hcpApi = apiAndUser.api;
    hcpLoggedUser = apiAndUser.user;
  }

  return {api: hcpApi!, user: hcpLoggedUser!};
}

async function getOrCreatePatient(medtechApi: MedTechApi): Promise<Patient> {
  if (defaultPatient == undefined) {
    defaultPatient = await medtechApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: "John",
        lastName: "Snow",
        note: "Winter is coming",
      })
    );
  }
  return defaultPatient!
}

async function getOrCreateHealthElement(
  medtechApi: MedTechApi,
  patient: Patient
): Promise<HealthcareElement> {
  if (defaultHealthcareElement == undefined) {
    defaultHealthcareElement = await medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({
        note: "Hero Syndrome",
      }),
      patient!.id!
    );
  }
  return defaultHealthcareElement;
}

async function createDataSampleForPatient(medtechApi: MedTechApi, patient: Patient) {
  return await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
    patient.id!,
    new DataSample({
      labels: new Set([
        new CodingReference({type: "IC-TEST", code: "TEST"}),
      ]),
      content: {en: {stringValue: "Hello world"}},
    })
  );
}

describe("Data Samples API", () => {
  it("Create Data Sample - Success", async () => {
    // Given
    const apiAndUser = await getOrCreateHcpApiAndLoggedUser()
    const medtechApi = apiAndUser.api;

    const patient = await getOrCreatePatient(medtechApi);

    // When
    const createdDataSample = await createDataSampleForPatient(medtechApi, patient);

    // Then
    assert(createdDataSample != undefined);
    assert(createdDataSample.id != undefined);
  });

  it("Create Data Sample linked to HealthElement - Success", async () => {
    // Given
    const apiAndUser = await getOrCreateHcpApiAndLoggedUser()
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
    const apiAndUser = await getOrCreateHcpApiAndLoggedUser()
    const medtechApi = apiAndUser.api;

    const patient = await getOrCreatePatient(medtechApi);
    const createdDataSample = await createDataSampleForPatient(medtechApi, patient);
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
    const apiAndUser = await getOrCreateHcpApiAndLoggedUser()
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
    const apiAndUser = await getOrCreateHcpApiAndLoggedUser()
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
            new CodingReference({ type: "FILTER-IC-TEST", code: "TEST" }),
          ]),
          content: { en: { stringValue: "Hello world" } },
        })
      );

    const filter = await new DataSampleFilter()
      .forDataOwner(hcp.id!)
      .byTagCodeFilter("FILTER-IC-TEST", "TEST")
      .forPatients(medtechApi.cryptoApi, [patient])
      .build();

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(
      filter
    );
    assert(filteredDataSamples.rows.length == 1);
    assert(filteredDataSamples.rows.find((ds) => ds.id == createdDataSample.id));
  });

  it("Filter data samples by HealthElementIds - Success", async () => {
    // Given
    const apiAndUser = await getOrCreateHcpApiAndLoggedUser()
    const medtechApi = apiAndUser.api;
    const loggedUser = apiAndUser.user;

    const patient = await getOrCreatePatient(medtechApi);
    const healthElement = await getOrCreateHealthElement(medtechApi, patient);
    const createdDataSample =
      await medtechApi.dataSampleApi.createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          labels: new Set([
            new CodingReference({ type: "FILTER-HE-IC-TEST", code: "TEST" }),
          ]),
          content: { en: { stringValue: "Hello world" } },
          healthcareElementIds: new Set([healthElement!.id!]),
        })
      );

    const filter = await new DataSampleFilter()
      .forDataOwner(loggedUser.healthcarePartyId!)
      .byTagCodeFilter("FILTER-HE-IC-TEST", "TEST")
      .byHealthElementIds([healthElement!.id!])
      .build();

    const filteredDataSamples = await medtechApi.dataSampleApi.filterDataSample(
      filter
    );
    assert(filteredDataSamples.rows.length == 1);

    const testedDataSample = filteredDataSamples.rows.find((ds) => ds.id == createdDataSample.id);
    assert(testedDataSample != undefined)
    assert(testedDataSample!.healthcareElementIds!.has(healthElement.id!));
  });

  it('Patient sharing data sample with HCP', async () => {
    // Given
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patApi = patApiAndUser.api;
    const patUser = patApiAndUser.user;
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!);

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcpApi = hcpApiAndUser.api;
    const hcpUser = hcpApiAndUser.user;
    const currentHcp = await hcpApi.healthcareProfessionalApi.getHealthcareProfessional(hcpUser.healthcarePartyId!);

    const createdDataSample = await createDataSampleForPatient(patApi, currentPatient);

    // When
    const sharedDataSample = await patApi.dataSampleApi.giveAccessTo(createdDataSample, currentHcp.id!);

    // Then
    const hcpDataSample = await hcpApi.dataSampleApi.getDataSample(sharedDataSample.id!);
    assert(hcpDataSample != null);
    assert(hcpDataSample.id == sharedDataSample.id);
  }).timeout(20000);

  it('HCP sharing data sample with patient', async () => {
    // Given
    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcpApi = hcpApiAndUser.api;

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patApi = patApiAndUser.api;
    const patUser = patApiAndUser.user;
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!);

    const createdDataSample = await createDataSampleForPatient(hcpApi, currentPatient);

    // When
    const sharedDataSample = await hcpApi.dataSampleApi.giveAccessTo(createdDataSample, currentPatient.id!);

    // Then
    const patDataSample = await patApi.dataSampleApi.getDataSample(sharedDataSample.id!);
    assert(patDataSample != null);
    assert(patDataSample.id == sharedDataSample.id);
  }).timeout(20000);

  it('HCP sharing data sample with another HCP', async () => {
    // Given
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api;

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcp2Api = hcp2ApiAndUser.api;
    const hcp2User = hcp2ApiAndUser.user;
    const currentHcp2 = await hcp2Api.healthcareProfessionalApi.getHealthcareProfessional(hcp2User.healthcarePartyId!);

    const patient = await getOrCreatePatient(hcp1Api);

    const createdDataSample = await createDataSampleForPatient(hcp1Api, patient);

    // When
    const sharedDataSample = await hcp1Api.dataSampleApi.giveAccessTo(createdDataSample, currentHcp2.id!);

    // Then
    const hcpDataSample = await hcp2Api.dataSampleApi.getDataSample(sharedDataSample.id!);
    assert(hcpDataSample != null);
    assert(hcpDataSample.id == sharedDataSample.id);
  }).timeout(20000);
});

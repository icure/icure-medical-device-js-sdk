import "mocha";
import {MedTechApi} from "../../src/apis/medTechApi";
import "isomorphic-fetch";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {assert} from "chai";
import {Patient} from "../../src/models/Patient";
import {HealthcareElement} from "../../src/models/HealthcareElement";
import {TestUtils} from "../test-utils";

const tmp = os.tmpdir();
console.log('Saving keys in ' + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = '';

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? 'https://kraken.icure.dev/rest/v1';
const hcpUserName = process.env.ICURE_TS_TEST_HCP_USER!;
const hcpPassword = process.env.ICURE_TS_TEST_HCP_PWD!;
const hcpPrivKey = process.env.ICURE_TS_TEST_HCP_PRIV_KEY!;
const patUserName = process.env.ICURE_TS_TEST_PAT_USER!;
const patPassword = process.env.ICURE_TS_TEST_PAT_PWD!;
const patPrivKey = process.env.ICURE_TS_TEST_PAT_PRIV_KEY!;
const hcp2UserName = process.env.ICURE_TS_TEST_HCP_2_USER!;
const hcp2Password = process.env.ICURE_TS_TEST_HCP_2_PWD!;
const hcp2PrivKey = process.env.ICURE_TS_TEST_HCP_2_PRIV_KEY!;

async function createHealthcareElementForPatient(medtechApi: MedTechApi, patient: Patient): Promise<HealthcareElement> {
  return await medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
    new HealthcareElement({
      note: "Hero Syndrome",
    }),
    patient!.id!
  );
}

describe('Healthcare Element API', () => {
  it('Patient sharing healthcare element with HCP', async () => {
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patApi = patApiAndUser.api;
    const patUser = patApiAndUser.user;
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!);

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcpApi = hcpApiAndUser.api;
    const hcpUser = hcpApiAndUser.user;
    const currentHcp = await hcpApi.healthcareProfessionalApi.getHealthcareProfessional(hcpUser.healthcarePartyId!);

    const createdHealthcareElement = await createHealthcareElementForPatient(patApi, currentPatient);
    const sharedHealthcareElement = await patApi.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentHcp.id!);

    assert(sharedHealthcareElement.systemMetaData!.delegations[currentHcp.id!] != undefined);
    assert(sharedHealthcareElement.systemMetaData!.encryptionKeys[currentHcp.id!] != undefined);
    assert(sharedHealthcareElement.systemMetaData!.cryptedForeignKeys[currentHcp.id!] != undefined);

    const hcpHealthcareElement = await hcpApi.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!);
    assert(hcpHealthcareElement != null);
    assert(hcpHealthcareElement.id == sharedHealthcareElement.id);
  });

  it('HCP sharing healthcare element with patient', async () => {
    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcpApi = hcpApiAndUser.api;

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patApi = patApiAndUser.api;
    const patUser = patApiAndUser.user;
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!);

    const createdHealthcareElement = await createHealthcareElementForPatient(hcpApi, currentPatient);
    const sharedHealthcareElement = await hcpApi.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentPatient.id!);

    assert(sharedHealthcareElement.systemMetaData!.delegations[currentPatient.id!] != undefined);
    assert(sharedHealthcareElement.systemMetaData!.encryptionKeys[currentPatient.id!] != undefined);
    assert(sharedHealthcareElement.systemMetaData!.cryptedForeignKeys[currentPatient.id!] != undefined);

    const patHealthcareElement = await patApi.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!);
    assert(patHealthcareElement != null);
    assert(patHealthcareElement.id == sharedHealthcareElement.id);
  });

  it('HCP sharing healthcare element with another HCP', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api;

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcp2Api = hcp2ApiAndUser.api;
    const hcp2User = hcp2ApiAndUser.user;
    const currentHcp2 = await hcp2Api.healthcareProfessionalApi.getHealthcareProfessional(hcp2User.healthcarePartyId!);

    const patient = await TestUtils.createDefaultPatient(hcp1Api);

    const createdHealthcareElement = await createHealthcareElementForPatient(hcp1Api, patient);
    const sharedHealthcareElement = await hcp1Api.healthcareElementApi.giveAccessTo(createdHealthcareElement, currentHcp2.id!);

    assert(sharedHealthcareElement.systemMetaData!.delegations[currentHcp2.id!] != undefined);
    assert(sharedHealthcareElement.systemMetaData!.encryptionKeys[currentHcp2.id!] != undefined);
    assert(sharedHealthcareElement.systemMetaData!.cryptedForeignKeys[currentHcp2.id!] != undefined);

    const hcp2HealthcareElement = await hcp2Api.healthcareElementApi.getHealthcareElement(sharedHealthcareElement.id!);
    assert(hcp2HealthcareElement != null);
    assert(hcp2HealthcareElement.id == sharedHealthcareElement.id);
  });
});

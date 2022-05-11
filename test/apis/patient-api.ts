import 'mocha';
import 'isomorphic-fetch';

import {LocalStorage} from 'node-localstorage';
import * as os from 'os';
import {assert} from 'chai';
import {Patient} from '../../src/models/Patient';
import {HealthcareElement} from '../../src/models/HealthcareElement';
import {TestUtils} from "../test-utils";

const tmp = os.tmpdir();
console.log('Saving keys in ' + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = '';

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? 'https://kraken.icure.dev/rest/v1';
const msgGtwUrl =
  process.env.ICURE_TS_TEST_MSG_GTW_URL ?? "https://msg-gw.icure.cloud/ic";
const patAuthProcessId =
  process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ??
  "6a355458dbfa392cb5624403190c39e5";
const authProcessHcpId = process.env.ICURE_TS_TEST_AUTH_PROCESS_HCP_ID!;
const hcpUserName = process.env.ICURE_TS_TEST_HCP_USER!;
const hcpPassword = process.env.ICURE_TS_TEST_HCP_PWD!;
const hcpPrivKey = process.env.ICURE_TS_TEST_HCP_PRIV_KEY!;
const patUserName = process.env.ICURE_TS_TEST_PAT_USER!;
const patPassword = process.env.ICURE_TS_TEST_PAT_PWD!;
const patPrivKey = process.env.ICURE_TS_TEST_PAT_PRIV_KEY!;
const hcp2UserName = process.env.ICURE_TS_TEST_HCP_2_USER!;
const hcp2Password = process.env.ICURE_TS_TEST_HCP_2_PWD!;
const hcp2PrivKey = process.env.ICURE_TS_TEST_HCP_2_PRIV_KEY!;

describe('Patient API', () => {
  it('Can create a patient and a related Healthcare Element', async () => {
    const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const medtechApi = apiAndUser.api;
    const loggedUser = apiAndUser.user;

    const patientToCreate = new Patient({
      firstName: 'John',
      lastName: 'Snow',
      note: 'Winter is coming',
    });

    // when
    const patient = await medtechApi.patientApi.createOrModifyPatient(
      patientToCreate
    );

    // Then
    assert(patient.id != undefined);
    assert(patient.firstName == 'John');
    assert(patient.lastName == 'Snow');
    assert(patient.note == 'Winter is coming');
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
      note: 'Hero Syndrome',
    });

    const createdHealthElement =
      await medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
        healthElementToCreate,
        patient.id
      );

    // Then
    assert(createdHealthElement.id != undefined);
    assert(createdHealthElement.note == 'Hero Syndrome');
    assert(createdHealthElement.systemMetaData?.secretForeignKeys != undefined);
    assert(
      createdHealthElement.systemMetaData?.delegations[
        loggedUser.healthcarePartyId!
      ] != undefined
    );
  });

  it('Patient sharing its own information with HCP', async () => {
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, patAuthProcessId, authProcessHcpId)
    const patApi = patApiAndUser.api;
    const patUser = patApiAndUser.user;

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcpApi = hcpApiAndUser.api;
    const hcpUser = hcpApiAndUser.user;
    const currentHcp = await hcpApi.healthcareProfessionalApi.getHealthcareProfessional(hcpUser.healthcarePartyId!);

    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!);
    const sharedPatient = await patApi.patientApi.giveAccessTo(currentPatient, currentHcp.id!);

    assert(sharedPatient.systemMetaData!.delegations[currentHcp.id!] != undefined);
    assert(sharedPatient.systemMetaData!.encryptionKeys[currentHcp.id!] != undefined);

    const hcpPatient = await hcpApi.patientApi.getPatient(sharedPatient.id!);
    assert(hcpPatient != null);
    assert(hcpPatient.id == sharedPatient.id);
  }).timeout(60000);

  it('Patient may not access info of another patient', async () => {
    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcpApi = hcpApiAndUser.api;

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patApi = patApiAndUser.api;
    const patUser = patApiAndUser.user;
    const currentPatient = await patApi.patientApi.getPatient(patUser.patientId!);

    const createdPatient = await TestUtils.createDefaultPatient(hcpApi);
    const sharedPatient = await hcpApi.patientApi.giveAccessTo(createdPatient, currentPatient.id!);

    assert(sharedPatient.systemMetaData!.delegations[currentPatient.id!] != undefined);
    assert(sharedPatient.systemMetaData!.encryptionKeys[currentPatient.id!] != undefined);

    await patApi.patientApi.getPatient(sharedPatient.id!)
      .then(
        () => {
          throw Error(`Patient ${currentPatient.id} should not be able to access info of another patient !!`)
        }, 
        (e) => assert(e != undefined)
      );
  }).timeout(20000);

  it('HCP sharing healthcare element with another HCP', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api;

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcp2Api = hcp2ApiAndUser.api;
    const hcp2User = hcp2ApiAndUser.user;

    const createdPatient = await TestUtils.createDefaultPatient(hcp1Api);
    const sharedPatient = await hcp1Api.patientApi.giveAccessTo(createdPatient, hcp2User.healthcarePartyId!);

    assert(sharedPatient.systemMetaData!.delegations[hcp2User.healthcarePartyId!] != undefined);
    assert(sharedPatient.systemMetaData!.encryptionKeys[hcp2User.healthcarePartyId!] != undefined);

    const hcp2Patient = await hcp2Api.patientApi.getPatient(sharedPatient.id!);
    assert(hcp2Patient != null);
    assert(hcp2Patient.id == sharedPatient.id);
  }).timeout(20000);
});

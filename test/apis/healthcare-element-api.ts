import "mocha";
import {MedTechApi} from "../../src/apis/MedTechApi";
import "isomorphic-fetch";

import {assert, expect} from "chai";
import {Patient} from "../../src/models/Patient";
import {HealthcareElement} from "../../src/models/HealthcareElement";
import {getEnvVariables, setLocalStorage, TestUtils} from "../test-utils";

setLocalStorage(fetch);

const {iCureUrl: iCureUrl, hcpUserName: hcpUserName, hcpPassword: hcpPassword, hcpPrivKey: hcpPrivKey,
  hcp2UserName: hcp2UserName, hcp2Password: hcp2Password, hcp2PrivKey: hcp2PrivKey,
  hcp3UserName: hcp3UserName, hcp3Password: hcp3Password, hcp3PrivKey: hcp3PrivKey,
  patUserName: patUserName, patPassword: patPassword, patPrivKey: patPrivKey} = getEnvVariables()

function createHealthcareElementForPatient(medtechApi: MedTechApi, patient: Patient): Promise<HealthcareElement> {
  return medtechApi.healthcareElementApi.createOrModifyHealthcareElement(
    new HealthcareElement({
      note: "Hero Syndrome",
    }),
    patient.id
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

  it('Optimization - No delegation sharing if delegated already has access to HE', async () => {
    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)

    const patient = await patApiAndUser.api.patientApi.getPatient(patApiAndUser.user.patientId!);
    const createdHealthcareElement = await createHealthcareElementForPatient(patApiAndUser.api, patient);

    // When
    const sharedHealthcareElement = await patApiAndUser.api.healthcareElementApi.giveAccessTo(createdHealthcareElement, hcp1ApiAndUser.user.healthcarePartyId!)

    // Then
    assert(createdHealthcareElement === sharedHealthcareElement);
  });

  it('Delegator may not share info of Healthcare element', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api;

    const hcp2ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcp2UserName, hcp2Password, hcp2PrivKey)
    const hcp2Api = hcp2ApiAndUser.api;

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, patUserName, patPassword, patPrivKey)
    const patUser = patApiAndUser.user;

    const patient = await TestUtils.createDefaultPatient(hcp1Api);
    const createdHealthcareElement = await createHealthcareElementForPatient(hcp1Api, patient);

    // When
    await hcp2Api.healthcareElementApi.giveAccessTo(createdHealthcareElement, patUser.patientId!)
      .then(
        () => {
          throw Error(`HCP ${hcp2ApiAndUser.user.id} should not be able to access info of healthcare element !!`)
        },
        (e) => assert(e != undefined)
      );
  });

  it('Data Owner can filter all the Healthcare Elements for a Patient - Success', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api;

    const newPatient = await TestUtils.createDefaultPatient(hcp1Api);
    expect(!!newPatient).to.eq(true);

    const newHealthElement = await createHealthcareElementForPatient(hcp1Api, newPatient);
    expect(!!newHealthElement).to.eq(true);

    const filteredElements = await hcp1Api.healthcareElementApi.getHealthcareElementsForPatient(newPatient);
    expect(!!filteredElements).to.eq(true);
    expect(filteredElements.length).to.eq(1);
    expect(filteredElements[0].id).to.eq(newHealthElement.id);
  });

  it('getHealthcareElementsForPatient returns no Healthcare Elements for a Patient with no Healthcare Elements', async () => {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey)
    const hcp1Api = hcp1ApiAndUser.api;

    const newPatient = await TestUtils.createDefaultPatient(hcp1Api);
    expect(!!newPatient).to.eq(true);

    const filteredElements = await hcp1Api.healthcareElementApi.getHealthcareElementsForPatient(newPatient);
    expect(!!filteredElements).to.eq(true);
    expect(filteredElements.length).to.eq(0);
  });
});

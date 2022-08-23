import "isomorphic-fetch";
import {medTechApi, MedTechApi} from "../../src/apis/medTechApi";
import {User} from "../../src/models/User";
import {Patient} from "../../src/models/Patient";
import {webcrypto} from "crypto";
import {hex2ua, ua2hex} from "@icure/api";
import {delay, getEnvVariables, ICureTestEmail, setLocalStorage, TestUtils} from "../test-utils";
import {Address} from "../../src/models/Address";
import {Telecom} from "../../src/models/Telecom";
import {assert, expect} from "chai";
import {ICureRegistrationEmail} from "../../src/utils/messageGatewayUtils";
import {HealthcareProfessional} from "../../src/models/HealthcareProfessional";
import {AnonymousMedTechApiBuilder} from "../../src/apis/AnonymousMedTechApi";
import {NotificationFilter} from "../../src/filter";
import {DataSample} from "../../src/models/DataSample";

setLocalStorage(fetch);

const {iCureUrl: iCureUrl, hcpUserName: hcpUserName, hcpPassword: hcpPassword, hcpPrivKey: hcpPrivKey,
      hcp3UserName: hcp3UserName, hcp3Password: hcp3Password, hcp3PrivKey: hcp3PrivKey,
      patUserName: patUserName, patPassword: patPassword, patPrivKey: patPrivKey,
      msgGtwUrl: msgGtwUrl, authProcessHcpId: authProcessHcpId, specId: specId} = getEnvVariables()

let hcp1Api: MedTechApi;
let hcp1User: User;
let hcp3Api: MedTechApi;
let hcp3User: User;
let patApi: MedTechApi;
let patUser: User;

describe("A Healthcare Party", () => {

  before(async () => {
    hcp1Api = await medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(hcpUserName)
      .withPassword(hcpPassword)
      .withMsgGtwUrl(msgGtwUrl)
      .withMsgGtwSpecId(specId)
      .withCrypto(webcrypto as any)
      .build();

    hcp1User = await hcp1Api.userApi.getLoggedUser();
    await hcp1Api.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      hcp1User.healthcarePartyId ?? hcp1User.patientId ?? hcp1User.deviceId!,
      hex2ua(hcpPrivKey)
    );

    const hcpApi3AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      hcp3UserName,
      hcp3Password,
      hcp3PrivKey)
    hcp3Api = hcpApi3AndUser.api;
    hcp3User = hcpApi3AndUser.user;

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      patUserName,
      patPassword,
      patPrivKey)
    patApi = patApiAndUser.api;
    patUser = patApiAndUser.user;
  });

  async function userFromPatient(api: MedTechApi, patient: Patient) {
    const existingPatient = await api.patientApi.createOrModifyPatient(patient);
    assert(!!existingPatient);

    const messageFactory = new ICureRegistrationEmail(
      hcp,
      "test",
      "iCure",
      existingPatient
    )
    const createdUser = await api.userApi.createAndInviteUser(existingPatient, messageFactory);
    assert(!!createdUser);
    assert(createdUser.patientId === existingPatient.id);
  }

  it("should be able to create a new User from an existing Patient", async () => {
    // PRECONDITIONS:

    // The Patient exists
    const email = await TestUtils.getTempEmail();
    const newPatient = await hcp1Api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: "Marc",
        lastName: "Specter",
        addresses: [new Address({
          addressType: "home",
          description: "London",
          telecoms: [
            new Telecom({
              telecomType: "email",
              telecomNumber: email
            })
          ]
        })]
      })
    );
    assert(!!newPatient);

    // The Patient has some delegations
    const patientFirstDelegation = await hcp1Api.patientApi.giveAccessTo(newPatient, hcp3User.healthcarePartyId!);
    assert(!!patientFirstDelegation);
    const patientSecondDelegation = await hcp1Api.patientApi.giveAccessTo(patientFirstDelegation, patUser.patientId!);
    assert(!!patientSecondDelegation);

    // Some Data Samples and Healthcare Elements were created for the Patient
    const newDS1 = await TestUtils.createDataSampleForPatient(hcp1Api, newPatient);
    assert(!!newDS1);
    const newDS2 = await TestUtils.createDataSampleForPatient(hcp1Api, newPatient);
    assert(!!newDS2);
    const newDS3 = await TestUtils.createDataSampleForPatient(hcp1Api, newPatient);
    assert(!!newDS3);
    const newHE1 = await TestUtils.getOrCreateHealthElement(hcp1Api, newPatient);
    assert(!!newHE1);
    const newHE2 = await TestUtils.getOrCreateHealthElement(hcp1Api, newPatient);
    assert(!!newHE2);
    const newHE3 = await TestUtils.getOrCreateHealthElement(hcp1Api, newPatient);
    assert(!!newHE3);

    // When HCP_1 creates user for patient PAT_1
    // And HCP_1 is sending an invitation email to patient PAT_1
    const messageFactory = new ICureTestEmail(newPatient);
    await hcp1Api.userApi.createAndInviteUser(newPatient, messageFactory, false);

    await delay(10000);

    // And PAT_1 accepts this invitation and changes his credentials
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureUrlPath(iCureUrl)
      .withAuthServerUrl(msgGtwUrl)
      .withCrypto(webcrypto as any)
      .withAuthProcessId(authProcessHcpId)
      .build();

    const { publicKey, privateKey } =
      await anonymousMedTechApi.cryptoApi.RSA.generateKeyPair();
    const publicKeyHex = ua2hex(
      await anonymousMedTechApi.cryptoApi.RSA.exportKey(publicKey, 'spki')
    );
    const privateKeyHex = ua2hex(
      await anonymousMedTechApi.cryptoApi.RSA.exportKey(privateKey, 'pkcs8')
    );
    const loginAndPassword = (await TestUtils.getEmail(email, 0)).subject!

    const authTimestamp = new Date().getTime();

    // When PAT_1 generates a key pair for himself
    // Then maintenance task is created for HCP_1 in order to give back access to PAT_1 to his data
    // Then PAT_1 is able to log as a user
    const authResult = await anonymousMedTechApi.authenticationApi.authenticateAndAskForAccess(
      loginAndPassword.split('|')[0],
      loginAndPassword.split('|')[1],
      [privateKeyHex, publicKeyHex],
      () => undefined
    );

    const userApi = authResult!.medTechApi;
    const createdNotification = await userApi.notificationApi.filterNotifications(
      await new NotificationFilter()
        .afterDateFilter(authTimestamp)
        .build()
    );
    assert(!!createdNotification);
    assert(createdNotification.rows.length === 2);
    const notificationDelegates = createdNotification.rows
      .map( it => Object.keys(it.systemMetaData?.delegations ?? {}))
      .flat();
    assert(notificationDelegates.includes(hcp1User.healthcarePartyId!));
    assert(notificationDelegates.includes(hcp3User.healthcarePartyId!));

    // But PAT_1 may not access data sample DATA_SAMPLE_1
    await TestUtils.retrieveDataSampleAndExpectError(userApi, newDS1.id!);
    await TestUtils.retrieveDataSampleAndExpectError(userApi, newDS2.id!);
    await TestUtils.retrieveDataSampleAndExpectError(userApi, newDS3.id!);
    await TestUtils.retrieveHealthcareElementAndExpectError(userApi, newHE1.id!);
    await TestUtils.retrieveHealthcareElementAndExpectError(userApi, newHE2.id!);
    await TestUtils.retrieveHealthcareElementAndExpectError(userApi, newHE3.id!);

    // When HCP_1 gives access to PAT_1
    const newNotifications = await hcp1Api.notificationApi.getPendingNotificationsFromNewUsers();
    expect(!!newNotifications).to.eq(true);
    const newPatientNotification = newNotifications.filter( notification => notification.responsible === newPatient.id)[0];
    expect(!!newPatientNotification).to.eq(true);

    const ongoingStatusUpdate = await hcp1Api.notificationApi.updateNotificationStatus(newPatientNotification, "ongoing");
    expect(!!ongoingStatusUpdate).to.eq(true);
    expect(ongoingStatusUpdate?.status).to.eq("ongoing");

    const existingDS = await hcp1Api.dataSampleApi.getDataSamplesForPatient(newPatient);
    expect(!!existingDS).to.eq(true);
    expect(existingDS.rows.length).to.eq(3);

    const sharedDSId = await hcp1Api.dataSampleApi.giveAccessToMany(
      existingDS.rows.filter( ds => ds.id !== newDS2.id),
      newPatient.id!
    )
    expect(sharedDSId.length).to.eq(2);
    expect(sharedDSId).to.contain(newDS1.id);
    expect(sharedDSId).to.not.contain(newDS2.id);
    expect(sharedDSId).to.contain(newDS3.id);

    const existingHE = await hcp1Api.healthcareElementApi.getHealthcareElementsForPatient(newPatient);
    expect(!!existingHE).to.eq(true);
    expect(existingHE.rows.length).to.eq(3);

    const sharedHEId = await hcp1Api.healthcareElementApi.giveAccessToMany(
      existingHE.rows.filter( he => he.id !== newHE3.id),
      newPatient.id!
    )
    expect(sharedHEId.length).to.eq(2);
    expect(sharedHEId).to.contain(newHE1.id);
    expect(sharedHEId).to.contain(newHE2.id);
    expect(sharedHEId).to.not.contain(newHE3.id);

    const completedStatusUpdate = await hcp1Api.notificationApi.updateNotificationStatus(newPatientNotification, "completed");
    expect(!!completedStatusUpdate).to.eq(true);
    expect(completedStatusUpdate?.status).to.eq("completed");

    // Then PAT_1 may access data sample DATA_SAMPLE_1
    await TestUtils.retrieveDataSampleAndExpectSuccess(userApi, newDS1.id!);
    await TestUtils.retrieveDataSampleAndExpectError(userApi, newDS2.id!);
    await TestUtils.retrieveDataSampleAndExpectSuccess(userApi, newDS3.id!);
    await TestUtils.retrieveDataSampleAndExpectSuccess(userApi, newHE1.id!);
    await TestUtils.retrieveDataSampleAndExpectSuccess(userApi, newHE2.id!);
    await TestUtils.retrieveHealthcareElementAndExpectError(userApi, newHE3.id!);
  });

  // it("should not be able to create a new User if the Patient has no firstname", async () => {
  //     const newPatient = new Patient({
  //       lastName: "Specter"
  //     });
  //
  //     let error = undefined;
  //     try {
  //       await userFromPatient(newPatient);
  //     } catch (e) {
  //       error = e;
  //     }
  //     assert(!!error);
  //   });
  //
  // it("should not be able to create a new User if the Patient has no lastname", async () => {
  //   const newPatient = new Patient({
  //     firstName: "Marc"
  //   });
  //
  //   let error = undefined;
  //   try {
  //     await userFromPatient(newPatient);
  //   } catch (e) {
  //     error = e;
  //   }
  //   assert(!!error);
  // });
  //
  // it("should not be able to create a new User if the Patient has no contact information", async () => {
  //   const newPatient = new Patient({
  //     firstName: "Marc",
  //     lastName: "Specter"
  //   });
  //
  //   let error = undefined;
  //   try {
  //     await userFromPatient(newPatient);
  //   } catch (e) {
  //     error = e;
  //   }
  //   assert(!!error);
  // });
  //
  // it("should not be able to create a new User if it already exists for that Patient", async () => {
  //   const email = await TestUtils.getTempEmail();
  //   const newPatient = await hcp1Api.patientApi.createOrModifyPatient(
  //     new Patient({
  //       firstName: "Marc",
  //       lastName: "Specter"
  //     })
  //   );
  //   assert(!!newPatient);
  //   const newUser = await hcp1Api.userApi.createOrModifyUser(new User({
  //     login: email,
  //     patientId: newPatient.id,
  //     email: email
  //   }))
  //   assert(!!newUser)
  //
  //   let error = undefined;
  //   try {
  //     await hcp1Api.userApi.createAndInviteUser(newPatient, new ICureTestEmail(newPatient),false);
  //   } catch (e) {
  //     error = e;
  //   }
  //   assert(!!error);
  // });


});

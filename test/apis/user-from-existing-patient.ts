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

  it("should be able to create a new User from an existing Patient with an Email", async () => {
    const email = await TestUtils.getTempEmail();
    const newPatient = new Patient({
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
    });
    await userFromPatient(medtechApi, newPatient);
  }).timeout(300000);

  it("should not be able to invite a new user if the developer didn't provide msgGtw info in its API", async () => {
    // Given
    const apiWithoutMsgGtw = await medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(hcpUserName)
      .withPassword(hcpPassword)
      .withMsgGtwUrl(undefined)
      .withCrypto(webcrypto as any)
      .build()

    const newPatient = new Patient({
      firstName: "Marc",
      lastName: "Specter"
    });

    try {
      await userFromPatient(apiWithoutMsgGtw, newPatient);
      expect(true, "promise should fail").eq(false);
    } catch (e) {
      expect((e as Error).message).to.eq("Can not invite a user, as no msgGtwUrl and/or specId have been provided : Make sure to call .withMsgGtwUrl and .withMsgGtwSpecId when creating your MedTechApi");
    }
  })

  it("should not be able to create a new User if the Patient has no contact information", async () => {
    const newPatient = new Patient({
      firstName: "Marc",
      lastName: "Specter"
    });

    try {
      await userFromPatient(medtechApi, newPatient);
      expect(true, "promise should fail").eq(false);
    } catch (e) {
      expect((e as Error).message).to.eq("No email or mobile phone information provided in patient");
    }
  });

  it("should not be able to create a new User if it already exists for that Patient", async () => {
    const email = await TestUtils.getTempEmail();
    const newPatient = await medtechApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: "Marc",
        lastName: "Specter"
      })
    );
    assert(!!newPatient);
    const patientFirstDelegation = await hcp1Api.patientApi.giveAccessTo(newPatient, hcp3User.healthcarePartyId!);
    assert(!!patientFirstDelegation);
    const patientSecondDelegation = await hcp1Api.patientApi.giveAccessTo(patientFirstDelegation, patUser.patientId!);
    assert(!!patientSecondDelegation);

    const newDataSample = await TestUtils.createDataSampleForPatient(hcp1Api, newPatient);
    assert(!!newDataSample);
    const newHealthcareElement = await TestUtils.getOrCreateHealthElement(hcp1Api, newPatient);
    assert(!!newHealthcareElement);

    const messageFactory = new ICureTestEmail(newPatient);
    await hcp1Api.userApi.createAndInviteUser(newPatient, messageFactory, false);

    // Then the user can log in
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

    try {
      await userApi.dataSampleApi.getDataSample(newDataSample.id!);
      expect(true, "promise should fail").eq(false);
    } catch (e) {
      expect((e as Error).message).to.eq("Cannot read properties of undefined (reading 'replace')");
    }

    const currentPatient = await userApi.patientApi.getPatient(newPatient.id!);
    const delegatedPatient = await userApi.patientApi.giveAccessTo(currentPatient, currentPatient.id!);
    const delegatedDs = await hcp1Api.dataSampleApi.giveAccessTo(newDataSample, currentPatient.id!);

    const ds = await userApi.dataSampleApi.getDataSample(newDataSample.id!);
    assert(!!ds);

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

import "mocha";
import {medTechApi, MedTechApi} from "../../src/apis/medTechApi";
import "isomorphic-fetch";
import {webcrypto} from "crypto";

import {hex2ua, sleep} from "@icure/api";
import {
  DataSampleFilter,
  HealthcareElementFilter,
  NotificationFilter,
  PatientFilter,
  UserFilter
} from "../../src/filter";

import {LocalStorage} from "node-localstorage";
import * as os from "os";
import {assert} from "chai";
import {DataSample} from "../../src/models/DataSample";
import {CodingReference} from "../../src/models/CodingReference";
import {Patient} from "../../src/models/Patient";
import {Notification, NotificationTypeEnum} from "../../src/models/Notification";
import {getEnvVariables, TestUtils} from "../test-utils";
import {User} from "../../src/models/User";
import {v4 as uuid} from "uuid";
import {HealthcareElement} from "../../src/models/HealthcareElement";

const tmp = os.tmpdir();
console.log("Saving keys in " + tmp);
(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024);
(global as any).Storage = "";

const {
  iCureUrl: iCureUrl,
  hcpUserName: hcpUserName,
  hcpPassword: hcpPassword,
  hcpPrivKey: hcpPrivKey,
  hcp2UserName: hcp2UserName,
  hcp2Password: hcp2Password,
  hcp2PrivKey: hcp2PrivKey,
  hcp3UserName: userName,
  hcp3Password: password,
  hcp3PrivKey: privKey,
  specId: specId,
  msgGtwUrl: msgGtwUrl,
  patAuthProcessId: patAuthProcessId
} = getEnvVariables()

let medtechApi: MedTechApi | undefined = undefined;
const testType = "IC-TEST";
const testCode = "TEST";

let hcp1Api: MedTechApi | undefined = undefined;
let hcp1User: User | undefined = undefined;

describe("Subscription API", () => {

  before(async () => {
    medtechApi = await medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build();

    const hcpApi1AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      hcpUserName,
      hcpPassword,
      hcpPrivKey)
    hcp1Api = hcpApi1AndUser.api;
    hcp1User = hcpApi1AndUser.user;
  });

  async function createNotificationWithApi(api: MedTechApi, delegateId: string) {
    const notificationId = uuid();
    const notification = new Notification({
      id: notificationId,
      status: "pending",
      type: NotificationTypeEnum.KEY_PAIR_UPDATE
    })
    const createdNotification = await api.notificationApi.createOrModifyNotification(
      notification,
      delegateId
    )
    assert(!!createdNotification);
    return createdNotification;
  }

  async function createNotificationAndSubscribe(api: MedTechApi, options: {}) {
    const loggedUser = await api.userApi.getLoggedUser();

    const hcp =
      await api.healthcareProfessionalApi.getHealthcareProfessional(
        loggedUser.healthcarePartyId!
      );

    const events: Notification[] = [];
    const statuses: string[] = [];

    const connection = (await api.notificationApi.subscribeToNotificationEvents(
        ["CREATE"],
        await new NotificationFilter().forDataOwner(hcp1User!.healthcarePartyId!).withType(NotificationTypeEnum.KEY_PAIR_UPDATE).build(),
        async (notification) => {
          events.push(notification);
        },
        options
      )
    )
      .onConnected(() => {
        statuses.push("CONNECTED");
      })
      .onClosed(() => {
        statuses.push("CLOSED");
      });
    await sleep(5000);

    await createNotificationWithApi(
      api,
      hcp1User!.healthcarePartyId!
    )

    await sleep(10000);
    await connection.close();

    events?.forEach((event) => console.log(`Event : ${event}`))
    statuses?.forEach((event) => console.log(`Status : ${event}`))

    assert(events.length === 1, "The events have not been recorded");
    assert(statuses.length === 2, "The statuses have not been recorded");
  }

  async function createDataSamplesAndSubscribe(api: MedTechApi, options: {}) {
    const loggedUser = await api.userApi.getLoggedUser();
    await api!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
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

    await sleep(5000);

    await api.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([
          new CodingReference({type: testType, code: testCode}),
        ]),
        content: {en: {stringValue: "Hello world"}},
      })
    );

    await sleep(5000);
    connection.close();

    events?.forEach((event) => console.log(`Event : ${event}`))
    statuses?.forEach((event) => console.log(`Status : ${event}`))

    assert(events.length === 1, "The events have not been recorded");
    assert(statuses.length === 2, "The statuses have not been recorded");
  }

  async function createPatientAndSubscribe(api: MedTechApi, options: {}) {
    const loggedUser = await api.userApi.getLoggedUser();
    await api!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    );

    const events: Patient[] = [];
    const statuses: string[] = [];
    const connection = (
      await api.patientApi.subscribeToPatientEvents(
        ["CREATE"],
        await new PatientFilter()
          .forDataOwner(loggedUser.healthcarePartyId!)
          .containsFuzzy("John")
          .build(),
        async (pat) => {
          events.push(pat);
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
    )

    await sleep(5000)
    connection.close()

    events?.forEach((event) => console.log(`Event : ${event}`))
    statuses?.forEach((event) => console.log(`Status : ${event}`))

    assert(events.length === 1, "The events have not been recorded");
    assert(statuses.length === 2, "The statuses have not been recorded");
  }

  async function createUserAndSubscribe(api: MedTechApi, options: {}) {
    const loggedUser = await api.userApi.getLoggedUser();
    await api!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    );

    const events: User[] = [];
    const statuses: string[] = [];
    const connection = (
      await api.userApi.subscribeToUserEvents(
        ["CREATE"],
        await new UserFilter().build(),
        async (user) => {
          events.push(user);
        },
        options
      )
    )
      .onConnected(() => statuses.push("CONNECTED"))
      .onClosed(() => statuses.push("CLOSED"));

    await sleep(5000)
    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, specId, patAuthProcessId, loggedUser.healthcarePartyId!);

    // Then
    const currentUser = patApiAndUser.user;
    assert(currentUser);

    await sleep(5000)
    connection.close()

    events?.forEach((event) => console.log(`Event : ${event}`))
    statuses?.forEach((event) => console.log(`Status : ${event}`))

    assert(events.length === 1, "The events have not been recorded");
    assert(statuses.length === 2, "The statuses have not been recorded");
  }

  async function createHealthcareElementAndSubscribe(api: MedTechApi, options: {}) {
    const loggedUser = await api.userApi.getLoggedUser();
    await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    );

    const hcp =
      await api.healthcareProfessionalApi.getHealthcareProfessional(
        loggedUser.healthcarePartyId!
      );
    const events: HealthcareElement[] = [];
    const statuses: string[] = [];
    const connection = (
      await api.healthcareElementApi.subscribeToHealthcareElementEvents(
        ["CREATE"],
        await new HealthcareElementFilter()
          .forDataOwner(hcp.id!)
          .byTagCodeFilter(testType, testCode)
          .build(),
        async (he) => {
          events.push(he);
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

    await sleep(5000);

    await api.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({
        note: "Hero Syndrome",
      }),
      patient.id
    );

    await sleep(5000);
    connection.close();

    events?.forEach((event) => console.log(`Event : ${event}`))
    statuses?.forEach((event) => console.log(`Status : ${event}`))

    assert(events.length === 1, "The events have not been recorded");
    assert(statuses.length === 2, "The statuses have not been recorded");
  }

  async function deleteDataSamplesAndSubscribe(api: MedTechApi, options: {}) {
    const loggedUser = await api.userApi.getLoggedUser();
    await api!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
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
        ["CREATE"], // TODO: A contact deleted is a CREATE event, because we replace it, should be a DELETE event
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

    await sleep(5000);

    const dataSample = await api.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([
          new CodingReference({type: testType, code: testCode}),
        ]),
        content: {en: {stringValue: "Hello world"}},
      })
    );

    await sleep(5000);

    await api.dataSampleApi.deleteDataSample(dataSample.id!);

    await sleep(5000);
    connection.close();

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

  it("Can subscribe to deleted Data Samples", async () => {
    await deleteDataSamplesAndSubscribe(medtechApi!, {});
  }).timeout(60000);

  it("Can subscribe to deleted Data Samples with options", async () => {
    await deleteDataSamplesAndSubscribe(medtechApi!, {keepAlive: 100, lifetime: 10000});
  }).timeout(60000);

  it("Can subscribe to Notifications", async () => {
    await createNotificationAndSubscribe(medtechApi!, {});
  }).timeout(60000);

  it("Can subscribe to Notifications with options", async () => {
    await createNotificationAndSubscribe(medtechApi!, {keepAlive: 100, lifetime: 10000});
  }).timeout(60000);

  it("Can subscribe to HealthcareElement", async () => {
    await createHealthcareElementAndSubscribe(medtechApi!, {});
  }).timeout(60000);

  it("Can subscribe to HealthcareElement with options", async () => {
    await createHealthcareElementAndSubscribe(medtechApi!, {keepAlive: 100, lifetime: 10000});
  }).timeout(60000);

  it("Can subscribe to Patient", async () => {
    await createPatientAndSubscribe(medtechApi!, {});
  }).timeout(60000);

  it("Can subscribe to Patient with options", async () => {
    await createPatientAndSubscribe(medtechApi!, {keepAlive: 100, lifetime: 10000});
  }).timeout(60000);

  it("Can subscribe to User", async () => {
    await createUserAndSubscribe(medtechApi!, {});
  }).timeout(60000);

  it("Can subscribe to User with options", async () => {
    await createUserAndSubscribe(medtechApi!, {keepAlive: 100, lifetime: 10000});
  }).timeout(60000);
});

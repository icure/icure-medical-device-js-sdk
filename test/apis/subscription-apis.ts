import "mocha";
import {medTechApi, MedTechApi} from "../../src/apis/MedTechApi";
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
import {Connection} from "../../src/models/Connection";

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
      .withICureBaseUrl(iCureUrl)
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

  async function doXOnYAndSubscribe<Y>(api: MedTechApi, options: {}, connectionPromise: Promise<Connection>, x: () => Promise<Y>, statusListener: (status: string) => void) {
    const loggedUser = await api.userApi.getLoggedUser();
    await api!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      loggedUser.healthcarePartyId!,
      hex2ua(privKey)
    );

    const connection = (await connectionPromise)
      .onConnected(() => statusListener("CONNECTED"))
      .onClosed(() => statusListener("CLOSED"));

    await sleep(3000)

    await x()

    await sleep(10000)
    connection.close()
    await sleep(5000)
  }

  describe("Can subscribe to Data Samples", async () => {
    const createDataSampleAndSubscribe = async (options: {}, eventTypes: ("CREATE" | "DELETE" | "UPDATE")[], supplier: () => Promise<void>) => {
      const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (ds: DataSample) => Promise<void>) => medtechApi!.dataSampleApi.subscribeToDataSampleEvents(
        eventTypes,
        await new DataSampleFilter()
          .forDataOwner(dataOwnerId)
          .build(),
        eventListener,
        options,
      )

      const loggedUser = await medtechApi!!.userApi.getLoggedUser();
      await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
        loggedUser.healthcarePartyId!,
        hex2ua(privKey)
      );

      const events: DataSample[] = [];
      const statuses: string[] = [];

      await doXOnYAndSubscribe(
        medtechApi!!,
        options,
        connectionPromise({}, loggedUser.healthcarePartyId!, async (ds) => {
          events.push(ds);
        }),
        supplier,
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, "The events have not been recorded");
      assert(statuses.length === 2, "The statuses have not been recorded");
    }

    const createDataSample = async () => {
      const patient = await medtechApi!!.patientApi.createOrModifyPatient(
        new Patient({
          firstName: "John",
          lastName: "Snow",
          note: "Winter is coming",
        })
      );

      return await medtechApi!!.dataSampleApi.createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          labels: new Set([
            new CodingReference({type: testType, code: testCode}),
          ]),
          content: {en: {stringValue: "Hello world"}},
        })
      );
    }

    const deleteDataSample = async () => {
      const ds = await createDataSample()

      await medtechApi!!.dataSampleApi.deleteDataSample(ds.id!)
    }

    it("CREATE DataSample without options", async () => {
      await createDataSampleAndSubscribe({}, ["CREATE"], async () => {
        await createDataSample()
      })
    }).timeout(60000);

    it("CREATE DataSample with options", async () => {
      await createDataSampleAndSubscribe({
          keepAlive: 100,
          lifetime: 10000,
        },
        ["CREATE"],
        async () => {
          await createDataSample()
        });
    }).timeout(60000);

    it("DELETE DataSample without options", async () => {
      await createDataSampleAndSubscribe({}, ["DELETE"], async () => deleteDataSample())
    }).timeout(60000);

    it("DELETE DataSample with options", async () => {
      await createDataSampleAndSubscribe({keepAlive: 100, lifetime: 10000}, ["DELETE"], async () => deleteDataSample())
    }).timeout(60000);
  })

  describe("Can subscribe to Notifications", async () => {
    const createNotificationAndSubscribe = async (options: {}, eventTypes: ("CREATE" | "DELETE" | "UPDATE")[]) => {
      const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (notification: Notification) => Promise<void>) => medtechApi!.notificationApi.subscribeToNotificationEvents(
        eventTypes,
        await new NotificationFilter().forDataOwner(hcp1User!.healthcarePartyId!).withType(NotificationTypeEnum.KEY_PAIR_UPDATE).build(),
        eventListener,
        options,
      )

      const loggedUser = await medtechApi!!.userApi.getLoggedUser()
      await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
        loggedUser.healthcarePartyId!,
        hex2ua(privKey)
      );

      const events: Notification[] = [];
      const statuses: string[] = [];

      await doXOnYAndSubscribe(
        medtechApi!!,
        options,
        connectionPromise({}, loggedUser.healthcarePartyId!, async (notification) => {
          events.push(notification);
        }),
        async () => {

          const notificationId = uuid();
          const notification = new Notification({
            id: notificationId,
            status: "pending",
            type: NotificationTypeEnum.KEY_PAIR_UPDATE
          })
          const createdNotification = await medtechApi!!.notificationApi.createOrModifyNotification(
            notification,
            hcp1User!.healthcarePartyId!
          )
          assert(!!createdNotification);
          return createdNotification;
        },
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, "The events have not been recorded");
      assert(statuses.length === 2, "The statuses have not been recorded");
    }

    it("CREATE Notification without options", async () => {
      await createNotificationAndSubscribe({}, ["CREATE"]);
    }).timeout(60000);

    it("CREATE Notification with options", async () => {
      await createNotificationAndSubscribe({keepAlive: 100, lifetime: 10000}, ["CREATE"]);
    }).timeout(60000);
  });

  describe("Can subscribe to HealthcareElements", async () => {
    const createHealthcareElementAndSubscribe = async (options: {}, eventTypes: ("CREATE" | "DELETE" | "UPDATE")[]) => {
      const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (healthcareElement: HealthcareElement) => Promise<void>) => medtechApi!.healthcareElementApi.subscribeToHealthcareElementEvents(
        eventTypes,
        await new HealthcareElementFilter()
          .forDataOwner(dataOwnerId)
          .byLabelCodeFilter(testType, testCode)
          .build(),
        eventListener,
        options,
      )

      const loggedUser = await medtechApi!!.userApi.getLoggedUser()
      await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
        loggedUser.healthcarePartyId!,
        hex2ua(privKey)
      );

      const events: HealthcareElement[] = [];
      const statuses: string[] = [];

      await doXOnYAndSubscribe(
        medtechApi!!,
        options,
        connectionPromise({}, loggedUser.healthcarePartyId!, async (healthcareElement) => {
          events.push(healthcareElement);
        }),
        async () => {
          const patient = await medtechApi!!.patientApi.createOrModifyPatient(
            new Patient({
              firstName: "John",
              lastName: "Snow",
              note: "Winter is coming",
            })
          );

          await medtechApi!!.healthcareElementApi.createOrModifyHealthcareElement(
            new HealthcareElement({
              note: "Hero Syndrome",
            }),
            patient.id
          );
        },
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, "The events have not been recorded");
      assert(statuses.length === 2, "The statuses have not been recorded");
    }

    it("CREATE HealthcareElement without options", async () => {
      await createHealthcareElementAndSubscribe({}, ["CREATE"]);
    }).timeout(60000);

    it("CREATE HealthcareElement with options", async () => {
      await createHealthcareElementAndSubscribe({keepAlive: 100, lifetime: 10000}, ["CREATE"]);
    }).timeout(60000);
  });

  describe("Can subscribe to Patients", async () => {
    const createPatientAndSubscribe = async (options: {}, eventTypes: ("CREATE" | "DELETE" | "UPDATE")[]) => {
      const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (patient: Patient) => Promise<void>) => {
        await sleep(2000)
        return medtechApi!.patientApi.subscribeToPatientEvents(
          eventTypes,
          await new PatientFilter()
            .forDataOwner(loggedUser.healthcarePartyId!)
            .containsFuzzy("John")
            .build(),
          eventListener,
          options,
        );
      }

      const loggedUser = await medtechApi!!.userApi.getLoggedUser()
      await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
        loggedUser.healthcarePartyId!,
        hex2ua(privKey)
      );

      const events: Patient[] = [];
      const statuses: string[] = [];

      await doXOnYAndSubscribe(
        medtechApi!!,
        options,
        connectionPromise(options, loggedUser.healthcarePartyId!, async (patient) => {
          events.push(patient);
        }),
        async () => {
          await medtechApi!!.patientApi.createOrModifyPatient(
            new Patient({
              firstName: "John",
              lastName: "Snow",
              note: "Winter is coming",
            })
          );
        },
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, "The events have not been recorded");
      assert(statuses.length === 2, "The statuses have not been recorded");
    }

    it("CREATE Patient without option", async () => {
      await createPatientAndSubscribe({}, ["CREATE"]);
    }).timeout(60000);

    it("CREATE Patient with options", async () => {
      await createPatientAndSubscribe({keepAlive: 100, lifetime: 10000}, ["CREATE"]);
    }).timeout(60000);
  });

  describe("Can subscribe to User", async () => {
    const createUserAndSubscribe = async (options: {}, eventTypes: ("CREATE" | "DELETE" | "UPDATE")[]) => {
      const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (user: User) => Promise<void>) => {
        await sleep(2000)
        return medtechApi!.userApi.subscribeToUserEvents(
          eventTypes,
          await new UserFilter().build(),
          eventListener,
          options,
        )
      }

      const loggedUser = await medtechApi!!.userApi.getLoggedUser()

      await sleep(2000)

      const events: User[] = [];
      const statuses: string[] = [];

      await doXOnYAndSubscribe(
        medtechApi!!,
        options,
        connectionPromise(options, loggedUser.healthcarePartyId!, async (user) => {
          events.push(user);
        }),
        async () => {
          const patApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, specId, patAuthProcessId, loggedUser.healthcarePartyId!);

          const currentUser = patApiAndUser.user;
          assert(currentUser);
        },
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, "The events have not been recorded");
      assert(statuses.length === 2, "The statuses have not been recorded");
    }

    it("CREATE User without options", async () => {
      await createUserAndSubscribe({}, ["CREATE"]);
    }).timeout(60000);

    it("CREATE User with options", async () => {
      await createUserAndSubscribe({keepAlive: 100, lifetime: 10000}, ["CREATE"]);
    }).timeout(60000);
  });
});

import 'isomorphic-fetch';
import {MedTechApi} from "../../src/apis/MedTechApi";
import {User} from "../../src/models/User";
import {
  getEnvironmentInitializer,
  getEnvVariables,
  hcp1Username,
  setLocalStorage,
  TestUtils,
  TestVars
} from "../test-utils";
import {NotificationFilter} from "../../src/filter";
import {expect} from "chai";
import {Notification, NotificationTypeEnum} from "../../src/models/Notification";

setLocalStorage(fetch);

let env: TestVars;
let hcp1Api: MedTechApi
let hcp1User: User

let notification1: Notification
let notification2: Notification
let notification3: Notification

let startingDate: Date

describe("Notification Filters Tests", function () {

  before(async function () {
    this.timeout(60000)
    const initializer = await getEnvironmentInitializer();
    env = await initializer.execute(getEnvVariables());

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails[hcp1Username]);
    hcp1Api = hcp1ApiAndUser.api;
    hcp1User = hcp1ApiAndUser.user;

    startingDate = new Date()

    notification1 = (await hcp1Api.notificationApi.createOrModifyNotification(
      new Notification({
        status: "pending",
        created: startingDate.getTime() - 10000,
        type: NotificationTypeEnum.KEY_PAIR_UPDATE
      }),
      hcp1User.healthcarePartyId!
    ))!

    notification2 = (await hcp1Api.notificationApi.createOrModifyNotification(
      new Notification({
        status: "pending",
        created: startingDate.getTime() - 10000,
        type: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS
      }),
      hcp1User.healthcarePartyId!
    ))!

    notification3 = (await hcp1Api.notificationApi.createOrModifyNotification(
      new Notification({
        status: "ongoing",
        created: startingDate.getTime() + 10000,
        type: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS
      }),
      hcp1User.healthcarePartyId!
    ))!

  });

  it("If no parameter is specified, all the Notifications are returned", async function () {
    const notes = await hcp1Api.notificationApi.filterNotifications(
      await new NotificationFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .build()
    )

    expect(notes.rows.length).to.be.greaterThan(0)
  })

  it("Can filter Notifications by ids", async function () {
    const notes = await hcp1Api.notificationApi.filterNotifications(
      await new NotificationFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .byIds([notification1.id!, notification2.id!])
        .build()
    )

    expect(notes.rows.length).to.be.equal(2)
    expect(notes.rows.map( (it) => it.id )).to.contain(notification1.id)
    expect(notes.rows.map( (it) => it.id )).to.contain(notification2.id)
  })

  it("Can filter Notifications by type", async function () {
    const notes = await hcp1Api.notificationApi.filterNotifications(
      await new NotificationFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .withType(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
        .build()
    )

    expect(notes.rows.length).to.be.greaterThan(0)
    notes.rows.forEach( (note) => {
      expect(note.type).to.be.equal(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
    })
  })

  it("Can filter Notifications after date", async function () {
    const notes = await hcp1Api.notificationApi.filterNotifications(
      await new NotificationFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .afterDate(startingDate.getTime())
        .build()
    )

    expect(notes.rows.length).to.be.greaterThan(0)
    notes.rows.forEach( (note) => {
      expect(note.created).to.be.greaterThanOrEqual(startingDate.getTime())
    })
  })

  it("Can filter Notifications by union filter", async function () {
    const afterDateFilter = new NotificationFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .afterDate(startingDate.getTime())

    const filterAfterDateOrType = await new NotificationFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .withType(NotificationTypeEnum.KEY_PAIR_UPDATE)
      .union([afterDateFilter])
      .build()

    const notes = await hcp1Api.notificationApi.filterNotifications(filterAfterDateOrType)

    expect(notes.rows.length).to.be.greaterThan(0)
    notes.rows.forEach( (note) => {
      expect(note).to.satisfy( (n: Notification) => {
        return (!!n.created && n.created >= startingDate.getTime() )
          || n.type === NotificationTypeEnum.KEY_PAIR_UPDATE
      })
    })
  })

  it("Can filter Notifications by implicit intersection filter", async function () {
    const filterAfterDateOrType = await new NotificationFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .withType(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
      .afterDate(startingDate.getTime())
      .build()

    const notes = await hcp1Api.notificationApi.filterNotifications(filterAfterDateOrType)

    expect(notes.rows.length).to.be.greaterThan(0)
    notes.rows.forEach( (note) => {
      expect(note.type).to.be.equal(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
      expect(note.created).to.be.greaterThanOrEqual(startingDate.getTime())
    })
  })

  it("Can filter Notifications by explicit intersection filter", async function () {
    const afterDateFilter = new NotificationFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .afterDate(startingDate.getTime())

    const filterAfterDateOrType = await new NotificationFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .withType(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
      .intersection([afterDateFilter])
      .build()

    const notes = await hcp1Api.notificationApi.filterNotifications(filterAfterDateOrType)

    expect(notes.rows.length).to.be.greaterThan(0)
    notes.rows.forEach( (note) => {
      expect(note.type).to.be.equal(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
      expect(note.created).to.be.greaterThanOrEqual(startingDate.getTime())
    })
  })

  it("Intersection between disjoint sets return empty result", async function () {
    const notes = await hcp1Api.notificationApi.filterNotifications(
      await new NotificationFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .withType(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
        .byIds([notification1.id!])
        .build()
    )

    expect(notes.rows.length).to.be.equal(0)
  })

});

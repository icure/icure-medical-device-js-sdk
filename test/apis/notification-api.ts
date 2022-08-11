import {before, describe, it} from 'mocha'
import 'isomorphic-fetch'
import {assert} from "chai";
import {v4 as uuid} from "uuid";
import {MedTechApi} from "../../src/apis/medTechApi";
import {Notification, notificationTypeEnum} from "../../src/models/Notification";
import {tmpdir} from "os";
import {TextDecoder, TextEncoder} from "util";
import {TestUtils} from "../test-utils";
import {User} from "../../src/models/User";
import {NotificationFilter} from "../../src/filter";
import {PaginatedListNotification} from "../../src/models/PaginatedListNotification";
import {SystemMetaDataEncrypted} from "../../src/models/SystemMetaDataEncrypted";

(global as any).localStorage = new (require('node-localstorage').LocalStorage)(tmpdir(), 5 * 1024 * 1024 * 1024)
;(global as any).fetch = fetch
;(global as any).Storage = ''
;(global as any).TextDecoder = TextDecoder
;(global as any).TextEncoder = TextEncoder

const iCureUrl = process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
let hcp1Api: MedTechApi | undefined = undefined;
let hcp1User: User | undefined = undefined;
let hcp2Api: MedTechApi | undefined = undefined;
let hcp2User: User | undefined = undefined;
let hcp3Api: MedTechApi | undefined = undefined;
let hcp3User: User | undefined = undefined;
let idFilterNotification1: Notification | undefined = undefined;
let idFilterNotification2: Notification | undefined = undefined;
let idFilterNotification3: Notification | undefined = undefined;

async function createNotificationWithApi(api: MedTechApi, delegateId: string) {
  const notificationId = uuid();
  const notification = new Notification({
    id: notificationId,
    status: "pending",
    type: notificationTypeEnum.KEY_PAIR_UPDATE
  })
  const createdNotification = await api.notificationApi.createOrModifyNotification(
    notification,
    delegateId
  )
  assert(!!createdNotification);
  return createdNotification;
}

function checkThatPaginatedListHasId(paginatedList: PaginatedListNotification, expectedLength: number, includedIds: string[], excludedIds: string[]) {
  assert(paginatedList.rows.length == expectedLength);
  includedIds.forEach( id => {
    assert(paginatedList.rows.map(el => el.id).includes(id));
  });
  excludedIds.forEach( id => {
    assert(!paginatedList.rows.map(el => el.id).includes(id));
  });
}

describe('Notification API', async function () {

  before(async function () {
    const hcpApi1AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      process.env.ICURE_TS_TEST_HCP_USER!,
      process.env.ICURE_TS_TEST_HCP_PWD!,
      process.env.ICURE_TS_TEST_HCP_PRIV_KEY!)
    hcp1Api = hcpApi1AndUser.api;
    hcp1User = hcpApi1AndUser.user;

    const hcpApi2AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      process.env.ICURE_TS_TEST_HCP_2_USER!,
      process.env.ICURE_TS_TEST_HCP_2_PWD!,
      process.env.ICURE_TS_TEST_HCP_2_PRIV_KEY!)
    hcp2Api = hcpApi2AndUser.api;
    hcp2User = hcpApi2AndUser.user;

    const hcpApi3AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      process.env.ICURE_TS_TEST_HCP_3_USER!,
      process.env.ICURE_TS_TEST_HCP_3_PWD!,
      process.env.ICURE_TS_TEST_HCP_3_PRIV_KEY!)
    hcp3Api = hcpApi3AndUser.api;
    hcp3User = hcpApi3AndUser.user;

    idFilterNotification1 = await hcp1Api.notificationApi.createOrModifyNotification(
      new Notification({
        id: uuid(),
        status: "pending",
        type: notificationTypeEnum.KEY_PAIR_UPDATE
      }),
      hcp2User.healthcarePartyId
    )
    assert(!!idFilterNotification1);
    idFilterNotification2 = await hcp1Api.notificationApi.createOrModifyNotification(
      new Notification({
        id: uuid(),
        status: "pending",
        type: notificationTypeEnum.NEW_USER_OWN_DATA_ACCESS
      }),
      hcp2User.healthcarePartyId
    )
    assert(!!idFilterNotification2);
    idFilterNotification3 = await hcp1Api.notificationApi.createOrModifyNotification(
      new Notification({
        id: uuid(),
        status: "pending",
        type: notificationTypeEnum.OTHER
      }),
      hcp2User.healthcarePartyId
    )
    assert(!!idFilterNotification3);

    console.log('All prerequisites are started');
  });

  it('should be able to create a new Notification with a logged in user', async () => {
    const notification = new Notification({
      id: uuid(),
      status: "pending",
      type: notificationTypeEnum.KEY_PAIR_UPDATE
    })
    const createdNotification = await hcp1Api!.notificationApi.createOrModifyNotification(
      notification,
      hcp2User!.healthcarePartyId
    )
    assert(!!createdNotification);
    assert(createdNotification.id === notification.id);
    assert(createdNotification.status === notification.status);
    assert(!!createdNotification.rev);
    assert(!!createdNotification.created);
    assert(createdNotification.type === notification.type);
    assert(createdNotification.author === hcp1User!.id!);
    assert(createdNotification.responsible === hcp1User!.healthcarePartyId);
    assert(hcp1User!.healthcarePartyId! in createdNotification.systemMetaData?.delegations!);
    assert(hcp2User!.healthcarePartyId! in createdNotification.systemMetaData?.delegations!);
  });

  it('should be able to get an existing Notification by Id as the creator', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    const retrievedNotification = await hcp1Api!.notificationApi.getNotification(createdNotification.id!);
    assert(!!retrievedNotification);
    assert(createdNotification.id === retrievedNotification.id);
    assert(createdNotification.rev === retrievedNotification.rev);
  });

  it('should be able to get an existing Notification by Id as a delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    const retrievedNotification = await hcp2Api!.notificationApi.getNotification(createdNotification.id!);
    assert(!!retrievedNotification);
    assert(createdNotification.id === retrievedNotification.id);
    assert(createdNotification.rev === retrievedNotification.rev);
  });

  it('should not be able to get an existing Notification if not author or delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    hcp3Api!.notificationApi.getNotification(createdNotification.id!).then(
      () => {
        throw Error(`You should not be able to get this notification!!`);
      },
      (e) => assert(e != undefined)
    );
  });

  it('should be able to modify an existing Notification as the creator', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.status = "ongoing";
    const modifiedNotification = await hcp1Api!.notificationApi.createOrModifyNotification(createdNotification);
    assert(!!modifiedNotification);
    assert(createdNotification.id === modifiedNotification.id);
    assert(createdNotification.rev !== modifiedNotification.rev);
    assert(modifiedNotification.status === "ongoing");
  });

  it('should be able to modify an existing Notification as the delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.status = "ongoing";
    const modifiedNotification = await hcp2Api!.notificationApi.createOrModifyNotification(createdNotification);
    assert(!!modifiedNotification);
    assert(createdNotification.id === modifiedNotification.id);
    assert(createdNotification.rev !== modifiedNotification.rev);
    assert(modifiedNotification.status === "ongoing");
  });

  async function modifyNotificationAndExpectFailure(api: MedTechApi, notification: Notification) {
    api.notificationApi.createOrModifyNotification(notification).then(
      () => {throw new Error("Illegal state");},
      (e) => assert(e != undefined)
    );
  }

  it('should not be able to modify an existing Notification if not author or delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.status = "ongoing";
    await modifyNotificationAndExpectFailure(hcp3Api!, createdNotification);
  });

  it('should not be able to modify an existing Notification if rev changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.rev = 'NOPE';
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification);
  });

  it('should not be able to modify an existing Notification if created changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.created = 12234;
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification);
  });

  it('should not be able to modify an existing Notification if endOfLife changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.endOfLife = 12234;
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification);
  });

  it('should not be able to modify an existing Notification if deletionDate changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.deletionDate = 12234;
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification);
  });

  it('should not be able to modify an existing Notification if modified changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.modified = 12234;
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification);
  });

  it('should not be able to modify an existing Notification if author changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.author = "FAIL";
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification);
  });

  it('should not be able to modify an existing Notification if responsible changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.responsible = "FAIL";
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification);
  });

  it('should not be able to modify an existing Notification if type changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.type = notificationTypeEnum.OTHER;
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification);
  });

  it('should not be able to modify an existing Notification if systemMetaData changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    createdNotification.systemMetaData = new SystemMetaDataEncrypted({
      secretForeignKeys: ["NOPE", "SHOULD", "FAIL"]
    })
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification);
  });

  it('should be able to delete an existing Notification as the creator', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    const deletedId = await hcp1Api!.notificationApi.deleteNotification(createdNotification.id!);
    assert(!!deletedId);
    const deletedNotification = await hcp1Api!.notificationApi.getNotification(createdNotification.id!);
    assert(!!deletedNotification);
    assert(!!deletedNotification.deletionDate);
  });

  it('should be able to delete an existing Notification as the delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    const deletedId = await hcp2Api!.notificationApi.deleteNotification(createdNotification.id!);
    assert(!!deletedId);
    const deletedNotification = await hcp2Api!.notificationApi.getNotification(createdNotification.id!);
    assert(!!deletedNotification);
    assert(!!deletedNotification.deletionDate);
  });

  it('should not be able to delete an existing Notification if not author or delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!);
    hcp3Api!.notificationApi.deleteNotification(createdNotification.id!).then(
      () => {
        throw Error(`You should not be here`);
      },
      (e) => assert(e != undefined)
    );
  });

  it('should be able to filter Notifications by id as the creator',
    async () => {
      const result = await hcp1Api!.notificationApi.filterNotifications(
        await new NotificationFilter()
          .byIdFilter([idFilterNotification1!.id!, idFilterNotification2!.id!])
          .build()
      );
      checkThatPaginatedListHasId(result, 2, [idFilterNotification1!.id!, idFilterNotification2!.id!], [idFilterNotification3!.id!]);
    });

  it('should be able to filter Notifications by id as the delegate', async () => {
    const result = await hcp2Api!.notificationApi.filterNotifications(
      await new NotificationFilter()
        .byIdFilter([idFilterNotification1!.id!, idFilterNotification2!.id!])
        .build()
    );
    checkThatPaginatedListHasId(result, 2, [idFilterNotification1!.id!, idFilterNotification2!.id!], [idFilterNotification3!.id!]);
  });

  it('should be able to filter Notifications by HcParty id and type as the creator', async () => {
    const result = await hcp1Api!.notificationApi.filterNotifications(
      await new NotificationFilter()
        .forHcParty(hcp1User!.healthcarePartyId!)
        .withType(notificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
        .build()
    );
    assert(result.rows.length > 0);
    result.rows.forEach( notification => {
      assert(notification.type === notificationTypeEnum.NEW_USER_OWN_DATA_ACCESS);
      assert(Object.keys(notification.systemMetaData?.delegations!).includes(hcp1User!.healthcarePartyId!));
    })
  });

  it('should be able to filter Notifications by HcParty id and type as the delegate', async () => {
    const result = await hcp1Api!.notificationApi.filterNotifications(
      await new NotificationFilter()
        .forHcParty(hcp2User!.healthcarePartyId!)
        .withType(notificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
        .build()
    );
    assert(result.rows.length > 0);
    result.rows.forEach( notification => {
      assert(notification.type === notificationTypeEnum.NEW_USER_OWN_DATA_ACCESS);
      assert(Object.keys(notification.systemMetaData?.delegations!).includes(hcp2User!.healthcarePartyId!));
    })
  });

  it('should be able to filter Notifications after date', async () => {
    const startTimestamp = new Date().getTime() - 100000;
    const result = await hcp1Api!.notificationApi.filterNotifications(
      await new NotificationFilter()
        .afterDateFilter(startTimestamp)
        .build()
    );
    assert(result.rows.length > 0);
    result.rows.forEach( notification => {
      assert(notification.created! >= startTimestamp);
    })
  });

  it('should be able to get all the Notifications as the creator', async () => {
    const result = await hcp1Api!.notificationApi.filterNotifications(
      await new NotificationFilter()
        .build()
    );
    assert(result.rows.length > 0);
  });
});
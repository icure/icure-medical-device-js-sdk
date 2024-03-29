import { before, describe, it } from 'mocha'
import 'isomorphic-fetch'
import { assert, expect } from 'chai'
import { v4 as uuid } from 'uuid'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { Notification, NotificationTypeEnum } from '../../src/models/Notification'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, hcp3Username, patUsername, setLocalStorage, TestUtils } from '../test-utils'
import { User } from '../../src/models/User'
import { PaginatedListNotification } from '../../src/models/PaginatedListNotification'
import { SystemMetaDataEncrypted } from '../../src/models/SystemMetaDataEncrypted'
import { NotificationApiImpl } from '../../src/apis/impl/NotificationApiImpl'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { NotificationFilter } from '../../src/filter/dsl/NotificationFilterDsl'

setLocalStorage(fetch)

let env: TestVars
let hcp1Api: MedTechApi | undefined = undefined
let hcp1User: User | undefined = undefined
let hcp2Api: MedTechApi | undefined = undefined
let hcp2User: User | undefined = undefined
let hcp3Api: MedTechApi | undefined = undefined
let hcp3User: User | undefined = undefined
let patApi: MedTechApi | undefined = undefined
let patUser: User | undefined = undefined
let idFilterNotification1: Notification | undefined = undefined
let idFilterNotification2: Notification | undefined = undefined
let idFilterNotification3: Notification | undefined = undefined

async function createNotificationWithApi(api: MedTechApi, delegateId: string) {
  const notification = new Notification({
    type: NotificationTypeEnum.KEY_PAIR_UPDATE,
  })
  const createdNotification = await api.notificationApi.createOrModifyNotification(notification, delegateId)
  assert(!!createdNotification)
  return createdNotification
}

function checkThatPaginatedListHasId(paginatedList: PaginatedListNotification, expectedLength: number, includedIds: string[], excludedIds: string[]) {
  assert(paginatedList.rows.length == expectedLength)
  includedIds.forEach((id) => {
    assert(paginatedList.rows.map((el) => el.id).includes(id))
  })
  excludedIds.forEach((id) => {
    assert(!paginatedList.rows.map((el) => el.id).includes(id))
  })
}

describe('Notification API', async function () {
  before(async function () {
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    const hcpApi1AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcp1Api = hcpApi1AndUser.api
    hcp1User = hcpApi1AndUser.user

    const hcpApi2AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp2Username])
    hcp2Api = hcpApi2AndUser.api
    hcp2User = hcpApi2AndUser.user

    const hcpApi3AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp3Username])
    hcp3Api = hcpApi3AndUser.api
    hcp3User = hcpApi3AndUser.user

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
    patApi = patApiAndUser.api
    patUser = patApiAndUser.user

    idFilterNotification1 = await hcp1Api.notificationApi.createOrModifyNotification(
      new Notification({
        type: NotificationTypeEnum.KEY_PAIR_UPDATE,
      }),
      hcp2User.healthcarePartyId
    )
    assert(!!idFilterNotification1)
    idFilterNotification2 = await hcp1Api.notificationApi.createOrModifyNotification(
      new Notification({
        type: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS,
      }),
      hcp2User.healthcarePartyId
    )
    assert(!!idFilterNotification2)
    idFilterNotification3 = await hcp1Api.notificationApi.createOrModifyNotification(
      new Notification({
        type: NotificationTypeEnum.OTHER,
      }),
      hcp2User.healthcarePartyId
    )
    assert(!!idFilterNotification3)

    console.log('All prerequisites are started')
  })

  it('should be able to create a new Notification with a logged in HCP', async () => {
    const notification = new Notification({
      id: uuid(),
      type: NotificationTypeEnum.KEY_PAIR_UPDATE,
    })
    const createdNotification = await hcp1Api!.notificationApi.createOrModifyNotification(notification, hcp2User!.healthcarePartyId)
    assert(!!createdNotification)
    expect(createdNotification).to.be.not.undefined
    expect(createdNotification.id).to.be.equal(notification.id)
    expect(createdNotification.status).to.be.equal('pending')
    expect(!!createdNotification.rev).to.be.true
    assert(!!createdNotification.created)
    expect(createdNotification.type).to.be.equal(notification.type)
    expect(createdNotification.author).to.be.equal(hcp1User!.id!)
    expect(createdNotification.responsible).to.be.equal(hcp1User!.healthcarePartyId)
    const retrievedNotification = await hcp1Api!.notificationApi.getNotification(createdNotification.id!)
    expect(retrievedNotification).to.deep.equal(createdNotification)
    const retrievedByHcp2Notification = await hcp2Api!.notificationApi.getNotification(createdNotification.id!)
    expect(retrievedByHcp2Notification).to.deep.equal(createdNotification)
  })

  it('should be able to create a new Notification with a logged in Patient', async () => {
    const notification = new Notification({
      id: uuid(),
      type: NotificationTypeEnum.KEY_PAIR_UPDATE,
    })
    const createdNotification = await patApi!.notificationApi.createOrModifyNotification(notification, hcp3User!.healthcarePartyId)
    assert(!!createdNotification)
    expect(createdNotification.id).to.be.equal(notification.id)
    expect(createdNotification.status).to.be.equal('pending')
    assert(!!createdNotification.rev)
    assert(!!createdNotification.created)
    expect(createdNotification.type).to.be.equal(notification.type)
    expect(createdNotification.author).to.be.equal(patUser!.id!)
    expect(createdNotification.responsible).to.be.equal(patUser!.patientId)
    const retrievedNotification = await patApi!.notificationApi.getNotification(createdNotification.id!)
    expect(retrievedNotification).to.deep.equal(createdNotification)
    const retrievedByHcp3Notification = await hcp3Api!.notificationApi.getNotification(createdNotification.id!)
    expect(retrievedByHcp3Notification).to.deep.equal(createdNotification)
  })

  it('should not be able to create a new Notification if the responsible is another Patient', async () => {
    const notification = new Notification({
      type: NotificationTypeEnum.KEY_PAIR_UPDATE,
      responsible: 'SOMEONE_ELSE',
    })
    patApi!.notificationApi.createOrModifyNotification(notification, hcp2User!.healthcarePartyId).then(
      () => {
        throw new Error('Illegal state')
      },
      (e) => assert(e != undefined)
    )
  })

  it('should be able to get an existing Notification by Id as the creator', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    const retrievedNotification = await hcp1Api!.notificationApi.getNotification(createdNotification.id!)
    assert(!!retrievedNotification)
    assert(createdNotification.id === retrievedNotification.id)
    assert(createdNotification.rev === retrievedNotification.rev)
  })

  it('should be able to get an existing Notification by Id as a delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    const retrievedNotification = await hcp2Api!.notificationApi.getNotification(createdNotification.id!)
    assert(!!retrievedNotification)
    assert(createdNotification.id === retrievedNotification.id)
    assert(createdNotification.rev === retrievedNotification.rev)
  })

  it('should not be able to get an existing Notification if not author or delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    hcp3Api!.notificationApi.getNotification(createdNotification.id!).then(
      () => {
        throw Error(`You should not be able to get this notification!!`)
      },
      (e) => assert(e != undefined)
    )
  })

  it('should be able to modify an existing Notification as the creator', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.status = 'ongoing'
    const modifiedNotification = await hcp1Api!.notificationApi.createOrModifyNotification(createdNotification)
    assert(!!modifiedNotification)
    assert(createdNotification.id === modifiedNotification.id)
    assert(createdNotification.rev !== modifiedNotification.rev)
    assert(modifiedNotification.status === 'ongoing')
  })

  it('should be able to modify an existing Notification as the delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.status = 'ongoing'
    const modifiedNotification = await hcp2Api!.notificationApi.createOrModifyNotification(createdNotification)
    assert(!!modifiedNotification)
    assert(createdNotification.id === modifiedNotification.id)
    assert(createdNotification.rev !== modifiedNotification.rev)
    assert(modifiedNotification.status === 'ongoing')
  })

  async function modifyNotificationAndExpectFailure(api: MedTechApi, notification: Notification) {
    api.notificationApi.createOrModifyNotification(notification).then(
      () => {
        throw new Error('Illegal state')
      },
      (e) => assert(e != undefined)
    )
  }

  it('should not be able to modify an existing Notification if not author or delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.status = 'ongoing'
    await modifyNotificationAndExpectFailure(hcp3Api!, createdNotification)
  })

  it('should not be able to modify an existing Notification if rev changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.rev = 'NOPE'
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification)
  })

  it('should not be able to modify an existing Notification if created changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.created = 12234
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification)
  })

  it('should not be able to modify an existing Notification if endOfLife changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.endOfLife = 12234
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification)
  })

  it('should not be able to modify an existing Notification if deletionDate changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.deletionDate = 12234
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification)
  })

  it('should not be able to modify an existing Notification if modified changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.modified = 12234
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification)
  })

  it('should not be able to modify an existing Notification if author changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.author = 'FAIL'
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification)
  })

  it('should not be able to modify an existing Notification if responsible changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.responsible = 'FAIL'
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification)
  })

  it('should not be able to modify an existing Notification if type changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.type = NotificationTypeEnum.OTHER
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification)
  })

  it('should not be able to modify an existing Notification if systemMetaData changes', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    createdNotification.systemMetaData = new SystemMetaDataEncrypted({
      secretForeignKeys: ['NOPE', 'SHOULD', 'FAIL'],
    })
    await modifyNotificationAndExpectFailure(hcp1Api!, createdNotification)
  })

  it('should be able to delete an existing Notification as the creator', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    const deletedId = await hcp1Api!.notificationApi.deleteNotification(createdNotification.id!)
    assert(!!deletedId)
    const deletedNotification = await hcp1Api!.notificationApi.getNotification(createdNotification.id!)
    assert(!!deletedNotification)
    assert(!!deletedNotification.deletionDate)
  })

  it('should be able to delete an existing Notification as the delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    const deletedId = await hcp2Api!.notificationApi.deleteNotification(createdNotification.id!)
    assert(!!deletedId)
    const deletedNotification = await hcp2Api!.notificationApi.getNotification(createdNotification.id!)
    assert(!!deletedNotification)
    assert(!!deletedNotification.deletionDate)
  })

  it('should not be able to delete an existing Notification if not author or delegate', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    hcp3Api!.notificationApi.deleteNotification(createdNotification.id!).then(
      () => {
        throw Error(`You should not be here`)
      },
      (e) => assert(e != undefined)
    )
  })

  it('should be able to filter Notifications by id as the creator', async () => {
    const result = await hcp1Api!.notificationApi.filterNotifications(
      await new NotificationFilter(hcp1Api!)
        .forDataOwner(hcp1User?.healthcarePartyId!)
        .byIds([idFilterNotification1!.id!, idFilterNotification2!.id!])
        .build()
    )
    checkThatPaginatedListHasId(result, 2, [idFilterNotification1!.id!, idFilterNotification2!.id!], [idFilterNotification3!.id!])
  })

  it('should be able to filter Notifications by id as the delegate', async () => {
    const result = await hcp2Api!.notificationApi.filterNotifications(
      await new NotificationFilter(hcp2Api!)
        .forDataOwner(hcp2User?.healthcarePartyId!)
        .byIds([idFilterNotification1!.id!, idFilterNotification2!.id!])
        .build()
    )
    checkThatPaginatedListHasId(result, 2, [idFilterNotification1!.id!, idFilterNotification2!.id!], [idFilterNotification3!.id!])
  })

  it('should be able to filter Notifications by HcParty id and type as the creator', async () => {
    const result = await hcp1Api!.notificationApi.filterNotifications(
      await new NotificationFilter(hcp1Api!)
        .forDataOwner(hcp1User!.healthcarePartyId!)
        .withType(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
        .build()
    )
    expect(result.rows.length).to.be.greaterThan(0)
    for (const notification of result.rows) {
      expect(notification.type).to.equal(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
      const retrievedIndividually = await hcp1Api!.notificationApi.getNotification(notification.id!)
      expect(retrievedIndividually).to.deep.equal(notification)
    }
  })

  it('should be able to filter Notifications by HcParty id and type as the delegate', async () => {
    const result = await hcp1Api!.notificationApi.filterNotifications(
      await new NotificationFilter(hcp1Api!)
        .forDataOwner(hcp2User!.healthcarePartyId!)
        .withType(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
        .build()
    )
    expect(result.rows.length).to.be.greaterThan(0)
    for (const notification of result.rows) {
      expect(notification.type).to.equal(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
      const retrievedIndividually = await hcp1Api!.notificationApi.getNotification(notification.id!)
      expect(retrievedIndividually).to.deep.equal(notification)
    }
  })

  it('should be able to filter Notifications after date', async () => {
    const startTimestamp = new Date().getTime() - 100000
    const result = await hcp1Api!.notificationApi.filterNotifications(
      await new NotificationFilter(hcp1Api!).forDataOwner(hcp1User?.healthcarePartyId!).afterDate(startTimestamp).build()
    )
    expect(result.rows.length).to.be.greaterThan(0)
    result.rows.forEach((notification) => {
      assert(notification.created! >= startTimestamp)
    })
  })

  it('should be able to get all the Notifications as the creator', async () => {
    const result = await hcp1Api!.notificationApi.filterNotifications(
      await new NotificationFilter(hcp1Api!).forDataOwner(hcp1User?.healthcarePartyId!).build()
    )
    assert(result.rows.length > 0)
  })

  it('should be able to get all the Notifications from multiple paginated lists', async () => {
    const filter = await new NotificationFilter(hcp1Api!)
      .forDataOwner(hcp1User!.healthcarePartyId!)
      .withType(NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS)
      .build()
    let nextId = undefined
    let page = undefined
    let existingNotifications: string[] = []
    do {
      page = await hcp1Api!.notificationApi.filterNotifications(filter, nextId)
      existingNotifications = existingNotifications.concat(page.rows.map((it) => it.id!) ?? [])
      nextId = page?.nextKeyPair?.startKeyDocId
    } while (!!nextId)

    const result = await (hcp1Api!.notificationApi as NotificationApiImpl).concatenateFilterResults(
      filter,
      undefined,
      Math.floor(existingNotifications.length / 3)
    )
    expect(result.length).to.eq(existingNotifications.length)
    result.forEach((notification) => {
      expect(existingNotifications).to.contain(notification.id)
    })
  })

  it('should be able to get all the pending Notification of Users asking for data access', async () => {
    const createdNotification = await hcp2Api!.notificationApi.createOrModifyNotification(
      new Notification({
        type: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS,
      }),
      hcp1User?.healthcarePartyId!
    )
    expect(!!createdNotification).to.eq(true)

    const notifications = await hcp1Api!.notificationApi.getPendingNotificationsAfter()
    expect(notifications.length).to.gt(0)
    for (const notification of notifications) {
      expect(notification.status).to.eq('pending')
      const retrievedIndividually = await hcp1Api!.notificationApi.getNotification(notification.id!)
      expect(retrievedIndividually).to.deep.equal(notification)
    }
  }).timeout(30000)

  it('should be able to update the status of a Notification', async () => {
    const createdNotification = await createNotificationWithApi(hcp1Api!, hcp2User!.healthcarePartyId!)
    expect(!!createdNotification).to.eq(true)
    const updatedNotification = await hcp1Api?.notificationApi.updateNotificationStatus(createdNotification, 'completed')
    expect(!!updatedNotification).to.eq(true)
    expect(updatedNotification!.status).to.eq('completed')
  })

  // it('close all pending notifications', async() => {
  //   const notifications = await hcp1Api!.notificationApi.getPendingNotifications()
  //   expect(notifications.length).to.gt(0);
  //
  //   console.log(notifications.map((notif) => notif.id).join(","))
  // }).timeout(600000);
})

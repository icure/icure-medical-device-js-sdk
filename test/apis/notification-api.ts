import {before, describe, it} from 'mocha'
import 'isomorphic-fetch'
import {Api, HealthcareParty, IccCryptoXApi, ua2hex, User} from "@icure/api";
import {webcrypto} from "crypto";
import {assert} from "chai";
import {v4 as uuid} from "uuid";
import {RemoteTestBackend} from "../test-utils-backend";
import {MedTechApi, medTechApi} from "../../src/apis/medTechApi";
import {Notification, notificationTypeEnum} from "../../src/models/Notification";
import {tmpdir} from "os";
import {TextDecoder, TextEncoder} from "util";

(global as any).localStorage = new (require('node-localstorage').LocalStorage)(tmpdir(), 5 * 1024 * 1024 * 1024)
;(global as any).fetch = fetch
;(global as any).Storage = ''
;(global as any).TextDecoder = TextDecoder
;(global as any).TextEncoder = TextEncoder

const backend = RemoteTestBackend.getInstance(
  process.env.ICURE_USR!,
  process.env.ICURE_PWD!,
  process.env.TEST_ICURE_URL!
);

let mtApiHcp1: MedTechApi | undefined = undefined;
let mtApiHcp2: MedTechApi | undefined = undefined;
const privateKeys = {} as Record<string, Record<string, string>>

async function makeKeyPair(cryptoApi: IccCryptoXApi, login: string) {
  const { publicKey, privateKey } = await cryptoApi.RSA.generateKeyPair()
  const publicKeyHex = ua2hex(await cryptoApi.RSA.exportKey(publicKey!, 'spki'))
  privateKeys[login] = { [publicKeyHex]: ua2hex((await cryptoApi.RSA.exportKey(privateKey!, 'pkcs8')) as ArrayBuffer) }
  return publicKeyHex
}

describe('Notification API', async function () {

  before(async function () {
    this.timeout(300000)

    await backend.init();

    const hcpId = uuid();
    const hcpLogin = `hcp-${hcpId}-delegate`;
    const api = await Api(backend.iCureURL, backend.iCureUser, backend.iCurePwd, webcrypto as unknown as Crypto);
    const { userApi, healthcarePartyApi, cryptoApi } = api;

    const publicKeyDelegate = await makeKeyPair(cryptoApi, hcpLogin);
    const delegateHcp = await healthcarePartyApi.createHealthcareParty(
      new HealthcareParty({ id: hcpId, publicKey: publicKeyDelegate, firstName: 'test', lastName: 'test' })
    )
    const delegateUser = await userApi.createUser(
      new User({
        id: `user-${hcpId}-hcp`,
        login: hcpLogin,
        status: 'ACTIVE',
        healthcarePartyId: delegateHcp.id,
      })
    );
    assert(delegateUser);
    const delegateToken = await userApi.getToken(delegateUser.id!, uuid(), 60*60*1000);
    assert(delegateToken);

    mtApiHcp1 = await medTechApi()
      .withICureBasePath(backend.iCureURL)
      .withUserName(hcpLogin)
      .withPassword(delegateToken!)
      .withCrypto(webcrypto as any)
      .preventCookieUsage()
      .build();

    await mtApiHcp1.addKeyPair(
      delegateUser.healthcarePartyId!,
      {
        publicKey: publicKeyDelegate,
        privateKey: privateKeys[hcpLogin][publicKeyDelegate]
      }
    )

    const hcpId2 = uuid();
    const hcpLogin2 = `hcp-${hcpId2}-delegate`;
    const publicKeyDelegate2 = await makeKeyPair(cryptoApi, hcpLogin2);
    const delegateHcp2 = await healthcarePartyApi.createHealthcareParty(
      new HealthcareParty({ id: hcpId2, publicKey: publicKeyDelegate2, firstName: 'test', lastName: 'test' })
    )
    const delegateUser2 = await userApi.createUser(
      new User({
        id: `user-${hcpId2}-hcp`,
        login: hcpLogin2,
        status: 'ACTIVE',
        healthcarePartyId: delegateHcp2.id,
      })
    );
    assert(delegateUser2);
    const delegateToken2 = await userApi.getToken(delegateUser2.id!, uuid(), 60*60*1000);
    assert(delegateToken2);

    mtApiHcp2 = await medTechApi()
      .withICureBasePath(backend.iCureURL)
      .withUserName(hcpLogin2)
      .withPassword(delegateToken2!)
      .withCrypto(webcrypto as any)
      .preventCookieUsage()
      .build();

    await mtApiHcp2.addKeyPair(
      delegateUser2.healthcarePartyId!,
      {
        publicKey: publicKeyDelegate2,
        privateKey: privateKeys[hcpLogin2][publicKeyDelegate2]
      }
    )

    console.log('All prerequisites are started')
  })

  it('should be able to create a new Notification with a logged in user', async () => {
    const user1 = await mtApiHcp1!.userApi.getLoggedUser();
    const user2 = await mtApiHcp2!.userApi.getLoggedUser();
    assert(!!user1);
    assert(!!user2);
    const notification = new Notification({
      id: uuid(),
      status: "pending",
      type: notificationTypeEnum.KEY_PAIR_UPDATE
    })
    const createdNotification = await mtApiHcp1!.notificationApi.createOrModifyNotification(
      notification,
      user2.healthcarePartyId!
    )
    assert(!!createdNotification);
    assert(createdNotification.id === notification.id);
    assert(createdNotification.status === notification.status);
    assert(!!createdNotification.rev);
    assert(!!createdNotification.created);
    assert(createdNotification.type === notification.type);
    assert(createdNotification.author === user1.id);
    assert(createdNotification.responsible === user1.healthcarePartyId);
    assert(user2.healthcarePartyId! in createdNotification.systemMetadata?.delegations!);
    assert(user1.healthcarePartyId! in createdNotification.systemMetadata?.delegations!);
  });

});

import { spawn, execSync } from 'child_process'
import { before, describe, it } from 'mocha'

import 'isomorphic-fetch'
import { tmpdir } from 'os'

import { TextDecoder, TextEncoder } from 'util'
  ;
import {
  Api,
  b2a, HealthcareParty, hex2ua, IccCryptoXApi,
  retry, ua2hex, User,
  XHR
} from "@icure/api";
import {medTechApi, Patient, SystemMetaDataOwnerEncrypted} from "../../dist";
import {webcrypto} from "crypto";
import axios, {Method} from "axios";
import {AnonymousMedTechApiBuilder} from "../../src/apis/AnonymousMedTechApi";
import { v4 as uuid } from 'uuid'
import {assert} from "chai";

(global as any).localStorage = new (require('node-localstorage').LocalStorage)(tmpdir(), 5 * 1024 * 1024 * 1024)
;(global as any).fetch = fetch
;(global as any).Storage = ''
;(global as any).TextDecoder = TextDecoder
;(global as any).TextEncoder = TextEncoder

const DB_PORT = 15984
const AS_PORT = 16044
const iCureUrl = `http://127.0.0.1:${AS_PORT}/rest/v1`
const hashedAdmin = '{R0DLKxxRDxdtpfY542gOUZbvWkfv1KWO9QOi9yvr/2c=}39a484cbf9057072623177422172e8a173bd826d68a2b12fa8e36ff94a44a0d7'

let delegateUser: User | undefined = undefined
let delegateHcp: HealthcareParty | undefined = undefined
const privateKeys = {} as Record<string, Record<string, string>>

async function getTempEmailAddress() {
  const emailOptions = {
    method: 'GET' as Method,
    url: 'https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1'
  };

  const { data: emails } = await axios.request(emailOptions)
  return { email: emails[0], login: emails[0].split('@')[0], domain: emails[0].split('@')[1] }
}

async function makeKeyPair(cryptoApi: IccCryptoXApi, login: string) {
  const { publicKey, privateKey } = await cryptoApi.RSA.generateKeyPair()
  const publicKeyHex = ua2hex(await cryptoApi.RSA.exportKey(publicKey!, 'spki'))
  privateKeys[login] = { [publicKeyHex]: ua2hex((await cryptoApi.RSA.exportKey(privateKey!, 'pkcs8')) as ArrayBuffer) }
  return publicKeyHex
}

describe('Testing use case for mdt-69', async function () {
  this.timeout(600000)

  before(async function () {
    this.timeout(300000)

    const couchdbUser = process.env['ICURE_COUCHDB_USERNAME'] ?? 'icure'
    const couchdbPassword = process.env['ICURE_COUCHDB_PASSWORD'] ?? 'icure'

    try {
      execSync('docker network create network-test')
    } catch (e) {}

    let dbLaunched = false
    try {
      dbLaunched = !!(await XHR.sendCommand('GET', `http://127.0.0.1:${DB_PORT}`, null))
    } catch (e) {}

    if (!dbLaunched) {
      const couchdb = spawn('docker', [
        'run',
        '--network',
        'network-test',
        '-p',
        `${DB_PORT}:5984`,
        '-e',
        `COUCHDB_USER=${couchdbUser}`,
        '-e',
        `COUCHDB_PASSWORD=${couchdbPassword}`,
        '-d',
        '--name',
        'couchdb-test-ts',
        'couchdb:3.2.2',
      ])
      couchdb.stdout.on('data', (data) => console.log(`stdout: ${data}`))
      couchdb.stderr.on('data', (data) => console.error(`stderr: ${data}`))
      couchdb.on('close', (code) => console.log(`child process exited with code ${code}`))

      await retry(() => XHR.sendCommand('GET', `http://127.0.0.1:${DB_PORT}`, null), 10)
    } else {
      try {
        //Cleanup
        const tbd = (
          await XHR.sendCommand('GET', `http://127.0.0.1:${DB_PORT}/icure-base/_all_docs`, [
            new XHR.Header('Content-type', 'application/json'),
            new XHR.Header('Authorization', `Basic ${b2a(`${couchdbUser}:${couchdbPassword}`)}`),
          ])
        ).body.rows
          .filter((r: any) => r.id.startsWith('user-'))
          .map((it: any) => ({ _id: it.id, _rev: it.value.rev, deleted: true }))
        await XHR.sendCommand(
          'POST',
          `http://127.0.0.1:${DB_PORT}/icure-base/_bulk_docs`,
          [new XHR.Header('Content-type', 'application/json'), new XHR.Header('Authorization', `Basic ${b2a(`${couchdbUser}:${couchdbPassword}`)}`)],
          { docs: tbd }
        )
      } catch (e) {
        //ignore
      }
    }

    let asLaunched = false
    try {
      asLaunched = !!(await XHR.sendCommand('GET', `http://127.0.0.1:${AS_PORT}/rest/v1/icure/v`, null))
    } catch (e) {}

    if (!asLaunched) {
      const icureOss = spawn('docker', [
        'run',
        '--network',
        'network-test',
        '-p',
        `5005:5005`,
        '-p',
        `${AS_PORT}:16043`,
        '-e',
        'JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005',
        '-e',
        `ICURE_COUCHDB_URL=http://couchdb-test-ts:5984`,
        '-e',
        `ICURE_COUCHDB_USERNAME=${couchdbUser}`,
        '-e',
        `ICURE_COUCHDB_PASSWORD=${couchdbPassword}`,
        '-e',
        'ICURE_AUTHENTICATION_LOCAL=true',
        '-d',
        '--name',
        'icure-oss-test',
        'docker.taktik.be/icure-oss:2.4.23-kraken.c1b1db7acc',
      ])
      icureOss.stdout.on('data', (data) => console.log(`stdout: ${data}`))
      icureOss.stderr.on('data', (data) => console.error(`stderr: ${data}`))
      icureOss.on('close', (code) => console.log(`child process exited with code ${code}`))

      await retry(() => XHR.sendCommand('GET', `http://127.0.0.1:${AS_PORT}/rest/v1/icure/v`, null), 100, 5000)
    }

    await retry(
      () =>
        XHR.sendCommand(
          'POST',
          `http://127.0.0.1:${DB_PORT}/icure-base`,
          [new XHR.Header('Content-type', 'application/json'), new XHR.Header('Authorization', `Basic ${b2a(`${couchdbUser}:${couchdbPassword}`)}`)],
          { _id: uuid(), login: 'admin', status: 'ACTIVE', java_type: 'org.taktik.icure.entities.User', passwordHash: hashedAdmin }
        ),
      100
    )

    const api = await Api(`http://127.0.0.1:${AS_PORT}/rest/v1`, 'admin', 'admin', webcrypto as unknown as Crypto)
    const { userApi, healthcarePartyApi, cryptoApi } = api

    const publicKeyDelegate = await makeKeyPair(cryptoApi, `hcp-delegate`)
    delegateHcp = await healthcarePartyApi.createHealthcareParty(
      new HealthcareParty({ id: uuid(), publicKey: publicKeyDelegate, firstName: 'test', lastName: 'test' }) //FIXME Shouldn't we call addNewKeyPair directly, instead of initialising like before ?
    )
    delegateUser = await userApi.createUser(
      new User({
        id: `user-${uuid()}-hcp`,
        login: `hcp-delegate`,
        status: 'ACTIVE',
        passwordHash: hashedAdmin,
        healthcarePartyId: delegateHcp.id,
      })
    )

    console.log('All prerequisites are started')
  })

  after(async () => {
    // try {
    //   execSync('docker rm -f couchdb-test-ts')
    // } catch (e) {}
    // try {
    //   execSync('docker rm -f icure-oss-test')
    // } catch (e) {}
    // try {
    //   execSync('docker network rm network-test')
    // } catch (e) {}
    console.log('Cleanup complete')
  })

  it("As a doctor, I'm creating an account to a patient and gives him access back to his data", async () => {
    // Given the medTechApi, login as Healthcare Professional
    const mtApi = await medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName('hcp-delegate')
      .withPassword('admin')
      .withCrypto(webcrypto as any)
      .preventCookieUsage()
      .build();
    const currentUser = await mtApi.userApi.getLoggedUser();
    const healthcareParty = await mtApi.healthcareProfessionalApi.getHealthcareProfessional(currentUser.healthcarePartyId!)

    await mtApi.addKeyPair(
      currentUser.healthcarePartyId!,
      {
        publicKey: healthcareParty.systemMetaData!.publicKey!,
        privateKey: privateKeys['hcp-delegate'][healthcareParty.systemMetaData!.publicKey!]
      }
    )

    // A temp email address for the patient, that will be also the login
    const patientEmail = await getTempEmailAddress();

    // The healthcare professional creates the key pair for the user
    const publicKeyUser = await makeKeyPair(mtApi.cryptoApi, patientEmail.email)

    const createdPatient = await mtApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: "Giskard",
        lastName: "Reventlov",
        note: "Bip bup I'm a robot",
        addresses: [{
          addressType: "home",
          description: "Solaria",
          telecoms: [{
            telecomType: "email",
            telecomNumber: patientEmail.email,
            telecomDescription: "Do androids use electrical mails?"
          }]
        }],
        systemMetaData: new SystemMetaDataOwnerEncrypted(
          {
            publicKey: publicKeyUser
          }
        )
      })
    );

    // Then the HCP creates a User for the patient
    const newUser = await mtApi.userApi.newUserFromPatient(createdPatient);

    const createdUser = await mtApi.userApi.createOrModifyUser(newUser);
    assert(createdUser)

    const token = await mtApi.userApi.createToken(createdUser.id!)
    assert(token)

    const user = await mtApi.userApi.getUser(createdUser.id!)
    assert(user)

    // Now I log the user in
    const mtApiUser = await medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(user.login!)
      .withPassword(token)
      .withCrypto(webcrypto as any)
      .preventCookieUsage()
      .build();

    const loggedUser = await mtApiUser.userApi.getLoggedUser();
    assert(loggedUser)

    /* Do I need to simulate the sign in?
    // And sends an invitation to the user
    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureUrlPath(iCureUrl)
      .withAuthServerUrl(msgGtwUrl)
      .withCrypto(webcrypto as any)
      .withAuthProcessId(authProcessId)
      .build();

    const process = await anonymousMedTechApi.authenticationApi.startAuthentication(
      delegateHcp?.id,
      'Giskard',
      'Reventlov',
      patientEmail.email,
      'a58afe0e-02dc-431b-8155-0351140099e4'
    );

    await delay(100)

    const { publicKey, privateKey } =
      await anonymousMedTechApi.cryptoApi.RSA.generateKeyPair();
    const publicKeyHex = ua2hex(
      await anonymousMedTechApi.cryptoApi.RSA.exportKey(publicKey, 'spki')
    );
    const privateKeyHex = ua2hex(
      await anonymousMedTechApi.cryptoApi.RSA.exportKey(privateKey, 'pkcs8')
    );

    await delay(10000);

    // The user than accepts the invitation and logins
    const emailOptions = {
      method: 'GET' as Method,
      url: 'https://www.1secmail.com/api/v1/?action=getMessages&login='+patientEmail.login+'&domain='+patientEmail.domain
    };
    const { data: emails } = await axios.request(emailOptions);

    const result = await anonymousMedTechApi.authenticationApi.completeAuthentication(
      process!,
      subjectCode,
      [privateKeyHex, publicKeyHex],
      () => undefined
    );
    assert(!!result?.medTechApi);
    const foundUser = await result.medTechApi.userApi.getLoggedUser();


  });

*/

    // Now a maintenance task must be created in order to allow the delegation between Patient and Hcp
    const maintenanceTask = await mtApi.healthcareProfessionalApi.createMaintenanceTask((await currentUser).healthcarePartyId, createdUser.id);
    assert(maintenanceTask)

  });
});

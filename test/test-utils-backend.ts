import {execSync, spawn} from "child_process";
import {b2a, retry, XHR} from "@icure/api";
import {v4 as uuid} from "uuid";

interface TestBackend {
  readonly iCureUser: string;
  readonly iCurePwd: string;
  readonly iCureURL: string;

  init: () => void;
  shutdown: () => void;

}

export class RemoteTestBackend implements TestBackend{

  private static instance: TestBackend | undefined = undefined;
  readonly iCureUser: string;
  readonly iCurePwd: string;
  readonly iCureURL: string;
  readonly hashedAdmin = '{R0DLKxxRDxdtpfY542gOUZbvWkfv1KWO9QOi9yvr/2c=}39a484cbf9057072623177422172e8a173bd826d68a2b12fa8e36ff94a44a0d7';

  private constructor(iCureUser: string, iCurePwd: string, iCureURL?: string) {
    this.iCureUser = iCureUser;
    this.iCurePwd = iCurePwd;
    if(!!iCureURL) this.iCureURL = iCureURL;
    else this.iCureURL = "https://kraken.icure.dev";
  }

  static getInstance(iCureUser: string, iCurePwd: string, iCureURL?: string) : TestBackend {
    if(!RemoteTestBackend.instance) RemoteTestBackend.instance = new RemoteTestBackend(iCureUser, iCurePwd, iCureURL);
    return RemoteTestBackend.instance;
  }

  async init() {}

  async shutdown() {}

}

export class DockerTestBackend implements TestBackend{

  private static instance: TestBackend | undefined = undefined;
  readonly DB_PORT: number;
  readonly AS_PORT: number;
  readonly couchdbUser: string;
  readonly couchdbPassword: string;
  readonly iCureUser: string;
  readonly iCurePwd: string;
  readonly iCureURL: string;
  readonly hashedAdmin = '{R0DLKxxRDxdtpfY542gOUZbvWkfv1KWO9QOi9yvr/2c=}39a484cbf9057072623177422172e8a173bd826d68a2b12fa8e36ff94a44a0d7';

  private constructor(DB_PORT: number, AS_PORT: number, couchdbUser: string, couchdbPassword: string, iCureUser: string, iCurePwd: string) {
    this.DB_PORT = DB_PORT;
    this.AS_PORT = AS_PORT;
    this.couchdbUser = couchdbUser;
    this.couchdbPassword = couchdbPassword;
    this.iCureUser = iCureUser;
    this.iCurePwd = iCurePwd;
    this.iCureURL = `http://127.0.0.1:${this.AS_PORT}/rest/v1`
  }

  static getInstance(DB_PORT: number, AS_PORT: number, couchdbUser: string, couchdbPassword: string, iCureUser: string, iCurePwd: string) : TestBackend {
    if(!!DockerTestBackend.instance) return DockerTestBackend.instance;
    else {
      DockerTestBackend.instance = new DockerTestBackend(DB_PORT, AS_PORT, couchdbUser, couchdbPassword, iCureUser, iCurePwd);
      return DockerTestBackend.instance;
    }
  }

  async init() {

    try {
      execSync('docker network create network-test')
    } catch (e) {}

    let dbLaunched = false
    try {
      dbLaunched = !!(await XHR.sendCommand('GET', `http://127.0.0.1:${(this.DB_PORT)}`, null))
    } catch (e) {}

    if (!dbLaunched) {
      const couchdb = spawn('docker', [
        'run',
        '--network',
        'network-test',
        '-p',
        `${(this.DB_PORT)}:5984`,
        '-e',
        `COUCHDB_USER=${(this.couchdbUser)}`,
        '-e',
        `COUCHDB_PASSWORD=${(this.couchdbPassword)}`,
        '-d',
        '--name',
        'couchdb-test-ts',
        'couchdb:3.2.2',
      ])
      couchdb.stdout.on('data', (data) => console.log(`stdout: ${data}`))
      couchdb.stderr.on('data', (data) => console.error(`stderr: ${data}`))
      couchdb.on('close', (code) => console.log(`child process exited with code ${code}`))

      await retry(() => XHR.sendCommand('GET', `http://127.0.0.1:${(this.DB_PORT)}`, null), 10)
    } else {
      try {
        //Cleanup
        const tbd = (
          await XHR.sendCommand('GET', `http://127.0.0.1:${(this.DB_PORT)}/icure-base/_all_docs`, [
            new XHR.Header('Content-type', 'application/json'),
            new XHR.Header('Authorization', `Basic ${b2a(`${(this.couchdbUser)}:${(this.couchdbPassword)}`)}`),
          ])
        ).body.rows
          .filter((r: any) => r.id.startsWith('user-'))
          .map((it: any) => ({ _id: it.id, _rev: it.value.rev, deleted: true }))
        await XHR.sendCommand(
          'POST',
          `http://127.0.0.1:${(this.DB_PORT)}/icure-base/_bulk_docs`,
          [new XHR.Header('Content-type', 'application/json'), new XHR.Header('Authorization', `Basic ${b2a(`${(this.couchdbUser)}:${(this.couchdbPassword)}`)}`)],
          { docs: tbd }
        )
      } catch (e) {
        //ignore
      }
    }

    let asLaunched = false
    try {
      asLaunched = !!(await XHR.sendCommand('GET', `http://127.0.0.1:${(this.AS_PORT)}/rest/v1/icure/v`, null))
    } catch (e) {}

    if (!asLaunched) {
      const icureOss = spawn('docker', [
        'run',
        '--network',
        'network-test',
        '-p',
        `5005:5005`,
        '-p',
        `${(this.AS_PORT)}:16043`,
        '-e',
        'JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005',
        '-e',
        `ICURE_COUCHDB_URL=http://couchdb-test-ts:5984`,
        '-e',
        `ICURE_COUCHDB_USERNAME=${(this.couchdbUser)}`,
        '-e',
        `ICURE_COUCHDB_PASSWORD=${(this.couchdbPassword)}`,
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

      await retry(() => XHR.sendCommand('GET', `http://127.0.0.1:${(this.AS_PORT)}/rest/v1/icure/v`, null), 100, 5000)
    }

    await retry(
      () =>
        XHR.sendCommand(
          'POST',
          `http://127.0.0.1:${(this.DB_PORT)}/icure-base`,
          [new XHR.Header('Content-type', 'application/json'), new XHR.Header('Authorization', `Basic ${b2a(`${(this.couchdbUser)}:${(this.couchdbPassword)}`)}`)],
          { _id: uuid(), login: 'admin', status: 'ACTIVE', java_type: 'org.taktik.icure.entities.User', passwordHash: this.hashedAdmin }
        ),
      100
    );
  }

  async shutdown() {
    try {
      execSync('docker rm -f couchdb-test-ts')
    } catch (e) {}
    try {
      execSync('docker rm -f icure-oss-test')
    } catch (e) {}
    try {
      execSync('docker network rm network-test')
    } catch (e) {}
  }

}


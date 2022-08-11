import 'isomorphic-fetch';
import {MedTechApi} from "../../src/apis/medTechApi";
import {User} from "../../src/models/User";
import {TestUtils} from "../test-utils";
import {UserFilter} from "../../src/filter/filterDsl";
import {assert} from "chai";
import {tmpdir} from "os";
import {TextDecoder, TextEncoder} from "util";

(global as any).localStorage = new (require('node-localstorage').LocalStorage)(tmpdir(), 5 * 1024 * 1024 * 1024)
;(global as any).fetch = fetch
;(global as any).Storage = ''
;(global as any).TextDecoder = TextDecoder
;(global as any).TextEncoder = TextEncoder

const iCureUrl = process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
let hcp1Api: MedTechApi | undefined = undefined;
let hcp1User: User | undefined = undefined;
let patApi: MedTechApi | undefined = undefined;
let patUser: User | undefined = undefined;

describe("User Filters Test", function () {

  before(async function () {
    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      process.env.ICURE_TS_TEST_HCP_USER!,
      process.env.ICURE_TS_TEST_HCP_PWD!,
      process.env.ICURE_TS_TEST_HCP_PRIV_KEY!)
    hcp1Api = hcp1ApiAndUser.api;
    hcp1User = hcp1ApiAndUser.user;

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      process.env.ICURE_TS_TEST_PAT_USER!,
      process.env.ICURE_TS_TEST_PAT_PWD!,
      process.env.ICURE_TS_TEST_PAT_PRIV_KEY!)
    patApi = patApiAndUser.api;
    patUser = patApiAndUser.user;
  });

  it("UsersByPatientIdFilter test - Success", async function () {
    const users = await hcp1Api!.userApi.filterUsers(
      await new UserFilter()
        .byPatientId(patUser!.patientId!)
        .build()
    );

    assert(!!users)
    assert(users.rows.length == 1)
    assert(users.rows[0]!.id === patUser?.id)
  })

  it("UsersByPatientIdFilter test - Failure", async function () {
    const users = await hcp1Api!.userApi.filterUsers(
      await new UserFilter()
        .byPatientId("THIS IS DOOMED TO FAIL")
        .build()
    );

    assert(!!users)
    assert(users.rows.length == 0)
  })

});

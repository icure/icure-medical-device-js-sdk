import 'isomorphic-fetch';
import {MedTechApi} from "../../src/apis/MedTechApi";
import {User} from "../../src/models/User";
import {
  getEnvironmentInitializer,
  getEnvVariables,
  hcp1Username, patUsername,
  setLocalStorage,
  TestUtils,
  TestVars
} from "../test-utils";
import {UserFilter} from "../../src/filter";
import {assert, expect} from "chai";

setLocalStorage(fetch);

let env: TestVars | undefined;
let hcp1Api: MedTechApi | undefined = undefined;
let hcp1User: User | undefined = undefined;
let patApi: MedTechApi | undefined = undefined;
let patUser: User | undefined = undefined;

describe("User Filters Test", function () {

  before(async function () {
    const initializer = await getEnvironmentInitializer();
    env = await initializer.execute(getEnvVariables());

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails[hcp1Username]);
    hcp1Api = hcp1ApiAndUser.api;
    hcp1User = hcp1ApiAndUser.user;

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails[patUsername]);
    patApi = patApiAndUser.api;
    patUser = patApiAndUser.user;
  });

  it("UsersByPatientIdFilter test - Success", async function () {
    const users = await hcp1Api!.userApi.filterUsers(
      await new UserFilter()
        .byPatientId(patUser!.patientId!)
        .build()
    );

    expect(!!users).to.eq(true);
    expect(users.rows.length).to.gt(0);
    users.rows.forEach( (user) => {
      expect(user.patientId).to.eq(patUser!.patientId!);
    });
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

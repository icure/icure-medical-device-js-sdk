import 'isomorphic-fetch';
import {MedTechApi} from "../../src/apis/MedTechApi";
import {User} from "../../src/models/User";
import {getEnvironmentInitializer, getEnvVariables, setLocalStorage, TestUtils} from "../test-utils";
import {UserFilter} from "../../src/filter";
import {assert, expect} from "chai";

setLocalStorage(fetch);

const {iCureUrl: iCureUrl, hcpUserName: hcpUserName, hcpPassword: hcpPassword, hcpPrivKey: hcpPrivKey,
  patUserName: patUserName, patPassword: patPassword, patPrivKey: patPrivKey} = getEnvVariables()

let hcp1Api: MedTechApi | undefined = undefined;
let hcp1User: User | undefined = undefined;
let patApi: MedTechApi | undefined = undefined;
let patUser: User | undefined = undefined;

describe("User Filters Test", function () {

  before(async function () {
    const initializer = await getEnvironmentInitializer();
    await initializer.execute();

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      hcpUserName,
      hcpPassword,
      hcpPrivKey)
    hcp1Api = hcp1ApiAndUser.api;
    hcp1User = hcp1ApiAndUser.user;

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      iCureUrl,
      patUserName,
      patPassword,
      patPrivKey)
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

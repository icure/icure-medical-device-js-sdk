import 'isomorphic-fetch';
import {MedTechApi} from "../../src/apis/MedTechApi";
import {User} from "../../src/models/User";
import {
  getEnvironmentInitializer,
  getEnvVariables, getTempEmail,
  hcp1Username, patUsername,
  setLocalStorage,
  TestUtils,
  TestVars
} from "../test-utils";
import {UserFilter} from "../../src/filter";
import {expect} from "chai";

setLocalStorage(fetch);

let env: TestVars;
let hcp1Api: MedTechApi
let hcp1User: User
let patApi: MedTechApi
let patUser: User
let newUser: User

describe("User Filters Test", function () {

  before(async function () {
    this.timeout(60000)
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

    newUser = await hcp1Api.userApi.createOrModifyUser(
      new User({
        name: 'Marvin',
        login: getTempEmail()
      })
    )

  });

  it("UsersByPatientIdFilter test - Success", async function () {
    const users = await hcp1Api.userApi.filterUsers(
      await new UserFilter()
        .byPatientId(patUser.patientId!)
        .build()
    )

    expect(!!users).to.eq(true)
    expect(users.rows.length).to.gt(0)
    users.rows.forEach( (user) => {
      expect(user.patientId).to.eq(patUser.patientId!)
    })
  })

  it("UsersByPatientIdFilter test - Failure", async function () {
    const users = await hcp1Api.userApi.filterUsers(
      await new UserFilter()
        .byPatientId("THIS IS DOOMED TO FAIL")
        .build()
    )

    expect(users.rows.length).to.be.equal(0)
  })

  it("If no parameter is specified, all users are returned", async function () {
    const filter = await new UserFilter().build()
    const users = await hcp1Api.userApi.filterUsers(filter)

    expect(users.rows.length).to.be.greaterThan(0)
  }).timeout(60000)

  it("Can filter User by Id", async function () {
    const users = await hcp1Api.userApi.filterUsers(
      await new UserFilter()
        .byIds([patUser.id!, newUser.id!])
        .build()
    )

    expect(users.rows.length).to.be.equal(2)
    expect(users.rows.map( (it) => it.id)).to.contain(patUser.id!)
    expect(users.rows.map( (it) => it.id)).to.contain(newUser.id!)
  }).timeout(60000)

  it("Can filter User by union filter", async function () {
    const idFilter = new UserFilter().byIds([newUser.id!])
    const filterByIdOrPatient = await new UserFilter()
      .byPatientId(patUser.patientId!)
      .union([idFilter])
      .build()

    const users = await hcp1Api.userApi.filterUsers(filterByIdOrPatient)

    expect(users.rows.length).to.be.greaterThan(0)
    expect(users.rows.map( (it) => it.id)).to.contain(patUser.id!)
    expect(users.rows.map( (it) => it.id)).to.contain(newUser.id!)
  }).timeout(60000)

  it("Can filter user by implicit intersection filter", async function () {
    const users = await hcp1Api.userApi.filterUsers(
      await new UserFilter()
        .byPatientId(patUser.patientId!)
        .byIds([patUser.id!, newUser.id!])
        .build()
    )

    expect(users.rows.length).to.be.equal(1)
    expect(users.rows.map( (it) => it.id)).to.contain(patUser.id!)
  }).timeout(60000)

  it("Can filter user by explicit intersection filter", async function () {
    const patientIdFilter = new UserFilter().byPatientId(patUser.patientId!)

    const users = await hcp1Api.userApi.filterUsers(
      await new UserFilter()
        .intersection([patientIdFilter])
        .byIds([patUser.id!, newUser.id!])
        .build()
    )

    expect(users.rows.length).to.be.equal(1)
    expect(users.rows.map( (it) => it.id)).to.contain(patUser.id!)
  }).timeout(60000)

  it("Intersection between disjoint sets return empty result", async function () {
    const patientIdFilter = new UserFilter().byPatientId(patUser.patientId!)

    const users = await hcp1Api.userApi.filterUsers(
      await new UserFilter()
        .intersection([patientIdFilter])
        .byIds([newUser.id!])
        .build()
    )

    expect(users.rows.length).to.be.equal(0)
  }).timeout(60000)

});

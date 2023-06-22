import 'isomorphic-fetch'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { User } from '../../src/models/User'
import { getEnvironmentInitializer, getTempEmail, hcp1Username, patUsername, setLocalStorage, TestUtils } from '../test-utils'
import { UserFilter } from '../../src/filter/dsl/UserFilterDsl'
import { FilterComposition, NoOpFilter } from '../../src/filter/dsl/filterDsl'
import { expect } from 'chai'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { v4 as uuid } from 'uuid'

setLocalStorage(fetch)

let env: TestVars
let hcp1Api: MedTechApi
let hcp1User: User
let patApi: MedTechApi
let patUser: User
let newUser: User

describe('User Filters Test', function () {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcp1Api = hcp1ApiAndUser.api
    hcp1User = hcp1ApiAndUser.user

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
    patApi = patApiAndUser.api
    patUser = patApiAndUser.user

    newUser = await hcp1Api.userApi.createOrModifyUser(
      new User({
        name: 'Marvin',
        login: getTempEmail(),
      })
    )
  })

  it('UsersByPatientIdFilter test - Success', async function () {
    const users = await hcp1Api.userApi.filterUsers(await new UserFilter(hcp1Api).byPatientId(patUser.patientId!).build())

    expect(!!users).to.eq(true)
    expect(users.rows.length).to.gt(0)
    users.rows.forEach((user) => {
      expect(user.patientId).to.eq(patUser.patientId!)
    })
  })

  it('UsersByPatientIdFilter test - Failure', async function () {
    const users = await hcp1Api.userApi.filterUsers(await new UserFilter(hcp1Api).byPatientId('THIS IS DOOMED TO FAIL').build())

    expect(users.rows.length).to.be.equal(0)
  })

  it('If no parameter is specified, all users are returned', async function () {
    const filter = await new UserFilter(hcp1Api).build()
    const users = await hcp1Api.userApi.filterUsers(filter)

    expect(users.rows.length).to.be.greaterThan(0)
  }).timeout(60000)

  it('Can filter User by Id', async function () {
    const users = await hcp1Api.userApi.filterUsers(await new UserFilter(hcp1Api).byIds([patUser.id!, newUser.id!]).build())

    expect(users.rows.length).to.be.equal(2)
    expect(users.rows.map((it) => it.id)).to.contain(patUser.id!)
    expect(users.rows.map((it) => it.id)).to.contain(newUser.id!)
  }).timeout(60000)

  it('Can filter User by union filter', async function () {
    const filterById = await new UserFilter(hcp1Api).byIds([newUser.id!]).build()
    const filterByPatient = await new UserFilter(hcp1Api).byPatientId(patUser.patientId!).build()
    const unionFilter = FilterComposition.union(filterById, filterByPatient)

    const users = await hcp1Api.userApi.filterUsers(unionFilter)

    expect(users.rows.length).to.be.greaterThan(0)
    expect(users.rows.map((it) => it.id)).to.contain(patUser.id!)
    expect(users.rows.map((it) => it.id)).to.contain(newUser.id!)
  }).timeout(60000)

  it('Can filter user by implicit intersection filter', async function () {
    const filter = await new UserFilter(hcp1Api).byPatientId(patUser.patientId!).byIds([patUser.id!, newUser.id!]).build()
    const users = await hcp1Api.userApi.filterUsers(filter)

    expect(users.rows.length).to.be.equal(1)
    expect(users.rows.map((it) => it.id)).to.contain(patUser.id!)
  }).timeout(60000)

  it('Can filter user by explicit intersection filter', async function () {
    const filterByPatientId = await new UserFilter(hcp1Api).byPatientId(patUser.patientId!).build()
    const filterByIds = await new UserFilter(hcp1Api).byIds([patUser.id!, newUser.id!]).build()

    const intersectionFilter = FilterComposition.intersection(filterByIds, filterByPatientId)
    const users = await hcp1Api.userApi.filterUsers(intersectionFilter)

    expect(users.rows.length).to.be.equal(1)
    expect(users.rows.map((it) => it.id)).to.contain(patUser.id!)
  }).timeout(60000)

  it('Intersection between disjoint sets return empty result', async function () {
    const filterByPatientId = await new UserFilter(hcp1Api).byPatientId(patUser.patientId!).build()
    const filterByIds = await new UserFilter(hcp1Api).byIds([newUser.id!]).build()

    const intersectionFilter = FilterComposition.intersection(filterByIds, filterByPatientId)

    const users = await hcp1Api.userApi.filterUsers(intersectionFilter)

    expect(users.rows.length).to.be.equal(0)
  }).timeout(60000)

  it('If a NoOpFilter is generated as result, an empty result is returned', async function () {
    const noOpFilter = await new UserFilter(hcp1Api).byIds([uuid()]).byIds([uuid()]).build()

    expect(NoOpFilter.isNoOp(noOpFilter)).to.be.true

    const users = await hcp1Api.userApi.filterUsers(noOpFilter)
    expect(users.rows.length).to.be.equal(0)
  })
})

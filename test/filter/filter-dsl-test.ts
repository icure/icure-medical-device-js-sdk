import 'isomorphic-fetch'
import { v4 as uuid } from 'uuid'
import { getEnvironmentInitializer, hcp1Username, setLocalStorage, TestUtils } from '../test-utils'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { PatientFilter } from '../../src/filter/dsl/PatientFilterDsl'
import { expect } from 'chai'
import { PatientByHealthcarePartyFilter } from '../../src/filter/patient/PatientByHealthcarePartyFilter'
import { PatientByHealthcarePartyDateOfBirthBetweenFilter } from '../../src/filter/patient/PatientByHealthcarePartyDateOfBirthBetweenFilter'
import { format } from 'date-fns'
import { NoOpFilter } from '../../src/filter/dsl/filterDsl'
import { IntersectionFilter, Patient } from '@icure/api'
import { PatientByHealthcarePartyNameContainsFuzzyFilter } from '../../src/filter/patient/PatientByHealthcarePartyNameContainsFuzzyFilter'
import { PatientByHealthcarePartySsinsFilter } from '../../src/filter/patient/PatientByHealthcarePartySsinsFilter'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'

setLocalStorage(fetch)

let env: TestVars
let hcp1Api: MedTechApi

function ageToFuzzyDate(age: number): number {
  const now = new Date()
  return parseInt(format(new Date(now.getFullYear() - age, now.getMonth(), now.getDay()), 'yyyyMMdd'))
}

describe('Coding Filters Test', function () {
  before(async function () {
    this.timeout(60000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcp1Api = hcp1ApiAndUser.api
  })

  it('Can specify a filter for another data owner', async () => {
    const fakeDataOwnerId = uuid()
    const filter = await new PatientFilter(hcp1Api).forDataOwner(fakeDataOwnerId).build()

    expect(filter.$type).to.be.eq('PatientByHealthcarePartyFilter')
    expect((filter as PatientByHealthcarePartyFilter).healthcarePartyId).to.be.eq(fakeDataOwnerId)
  })

  it('Can specify a filter for the current data owner', async () => {
    const currentDataOwner = await hcp1Api.userApi.getLoggedUser().then((u) => hcp1Api.dataOwnerApi.getDataOwnerIdOf(u))
    const filter = await new PatientFilter(hcp1Api).forSelf().build()

    expect(filter.$type).to.be.eq('PatientByHealthcarePartyFilter')
    expect((filter as PatientByHealthcarePartyFilter).healthcarePartyId).to.be.eq(currentDataOwner)
  })

  it('A singleton filter can be added more than once with the same value', async () => {
    const age = 42
    const filter = await new PatientFilter(hcp1Api).forSelf().ofAge(age).ofAge(age).build()

    expect(filter.$type).to.be.eq('PatientByHealthcarePartyDateOfBirthBetweenFilter')
    expect((filter as PatientByHealthcarePartyDateOfBirthBetweenFilter).maxDateOfBirth).to.be.eq(ageToFuzzyDate(age))
    expect(NoOpFilter.isNoOp(filter)).to.be.false
  })

  it('If a singleton filter is added multiple times with different values, a NoOpFilter is instantiated instead', async () => {
    const filter = await new PatientFilter(hcp1Api).forSelf().ofAge(42).ofAge(43).build()

    expect(NoOpFilter.isNoOp(filter)).to.be.true
  })

  it('The same filter can be added more than once with different strategies', async () => {
    const age = 42
    const filter = await new PatientFilter(hcp1Api).forSelf().ofAge(age).dateOfBirthBetween(20221010, 20221010).build()

    expect(filter.$type).to.be.eq('IntersectionFilter')

    const intersectionFilter = filter as IntersectionFilter<Patient>
    expect(intersectionFilter.filters).to.be.of.length(2)
    expect(intersectionFilter.filters.find((f) => (f as PatientByHealthcarePartyDateOfBirthBetweenFilter).minDateOfBirth === 20221010)).to.not.be
      .undefined
    expect(intersectionFilter.filters.find((f) => (f as PatientByHealthcarePartyDateOfBirthBetweenFilter).maxDateOfBirth === ageToFuzzyDate(age))).to
      .not.be.undefined
  })

  it('Multiple simple filters of the same type can be added', async () => {
    const firstQuery = uuid()
    const secondQuery = uuid()
    const filter = await new PatientFilter(hcp1Api).forSelf().containsFuzzy(firstQuery).containsFuzzy(secondQuery).build()

    expect(filter.$type).to.be.eq('IntersectionFilter')

    const intersectionFilter = filter as IntersectionFilter<Patient>
    expect(intersectionFilter.filters).to.be.of.length(2)
    expect(intersectionFilter.filters.find((f) => (f as PatientByHealthcarePartyNameContainsFuzzyFilter).searchString === firstQuery)).to.not.be
      .undefined
    expect(intersectionFilter.filters.find((f) => (f as PatientByHealthcarePartyNameContainsFuzzyFilter).searchString === secondQuery)).to.not.be
      .undefined
  })

  it('When the same filter with by id strategy is added more than once, the intersection of the results is taken', async () => {
    const firstId = uuid()
    const secondId = uuid()
    const thirdId = uuid()
    const filter = await new PatientFilter(hcp1Api).forSelf().withSsins([firstId, secondId, thirdId]).withSsins([secondId]).build()

    expect(filter.$type).to.be.eq('PatientByHealthcarePartySsinsFilter')

    const ids = (filter as PatientByHealthcarePartySsinsFilter).ssins
    expect(ids).to.be.of.length(1)
    expect(ids[0]).to.be.eq(secondId)
  })

  it('When the same filter with by id strategy is added more than once but the intersection is empty, a NoOpFilter is returned', async () => {
    const firstId = uuid()
    const secondId = uuid()
    const thirdId = uuid()
    const filter = await new PatientFilter(hcp1Api).forSelf().withSsins([firstId, thirdId]).withSsins([secondId]).build()

    expect(NoOpFilter.isNoOp(filter)).to.be.true
  })

  it('Can sort filters by a simple filter', async () => {
    const firstQuery = uuid()
    const filter = await new PatientFilter(hcp1Api).forSelf().ofAge(42).sort.containsFuzzy(firstQuery).withSsins([uuid(), uuid()]).build()

    expect(filter.$type).to.be.eq('IntersectionFilter')

    const intersectionFilter = filter as IntersectionFilter<Patient>
    expect(intersectionFilter.filters).to.be.of.length(3)

    const sortKey = intersectionFilter.filters[0] as PatientByHealthcarePartyNameContainsFuzzyFilter
    expect(sortKey.searchString).to.be.eq(firstQuery)
  })

  it('Can sort filters by a singleton filter', async () => {
    const age = 42
    const filter = await new PatientFilter(hcp1Api).forSelf().containsFuzzy(uuid()).sort.ofAge(age).withSsins([uuid(), uuid()]).build()

    expect(filter.$type).to.be.eq('IntersectionFilter')

    const intersectionFilter = filter as IntersectionFilter<Patient>
    expect(intersectionFilter.filters).to.be.of.length(3)

    const sortKey = intersectionFilter.filters[0] as PatientByHealthcarePartyDateOfBirthBetweenFilter
    expect(sortKey.maxDateOfBirth).to.be.eq(ageToFuzzyDate(age))
  })

  it('Can sort filters by a id filter, and if it is added more than once the sort key order of ids is kept', async () => {
    const firstId = uuid()
    const secondId = uuid()
    const thirdId = uuid()
    const filter = await new PatientFilter(hcp1Api)
      .forSelf()
      .containsFuzzy(uuid())
      .withSsins([firstId, secondId, thirdId])
      .sort.withSsins([thirdId, secondId])
      .ofAge(42)
      .build()

    expect(filter.$type).to.be.eq('IntersectionFilter')

    const intersectionFilter = filter as IntersectionFilter<Patient>
    expect(intersectionFilter.filters).to.be.of.length(3)

    const ids = (intersectionFilter.filters[0] as PatientByHealthcarePartySsinsFilter).ssins
    expect(ids).to.be.of.length(2)
    expect(ids[0]).to.be.eq(thirdId)
    expect(ids[1]).to.be.eq(secondId)
  })
})

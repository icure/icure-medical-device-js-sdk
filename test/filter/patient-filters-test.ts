import 'isomorphic-fetch'
import { getEnvironmentInitializer, hcp1Username, setLocalStorage, TestUtils } from '../test-utils'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { User } from '../../src/models/User'
import { Patient } from '../../src/models/Patient'
import { expect } from 'chai'
import { PatientFilter } from '../../src/filter/dsl/PatientFilterDsl'
import { FilterComposition, NoOpFilter } from '../../src/filter/dsl/filterDsl'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { PatientMapper } from '../../src/mappers/patient'
import { v4 as uuid } from 'uuid'

setLocalStorage(fetch)

let env: TestVars
let api: MedTechApi
let user: User

const now = new Date()

function getYear(dateOfBirth?: number) {
  expect(!!dateOfBirth).to.be.true
  return Math.floor(dateOfBirth! / 10000)
}

describe('Patient Filters Test', function () {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env.dataOwnerDetails[hcp1Username])
    api = apiAndUser.api
    user = apiAndUser.user

    await api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Arthur',
        lastName: 'Dent',
        gender: 'male',
        dateOfBirth: parseInt(`${now.getFullYear() - 42}0101`),
      })
    )

    await api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Trillian',
        lastName: 'Astra',
        gender: 'female',
        dateOfBirth: parseInt(`${now.getFullYear() - 42}0101`),
      })
    )

    await api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Zaphod',
        lastName: 'Beeblebrox',
        gender: 'indeterminate',
        dateOfBirth: parseInt(`${now.getFullYear() - 50}0101`),
      })
    )
  })

  it('Can filter Patients', async () => {
    const filter = await new PatientFilter(api).forDataOwner(user.healthcarePartyId!).ofAge(42).build()
    const patients = await api.patientApi.filterPatients(filter)
    expect(patients.rows.length).to.be.greaterThan(0)
    patients.rows.forEach((p) => {
      expect(!!p.dateOfBirth).to.be.true
      const year = Math.floor(p.dateOfBirth! / 10000)
      expect(now.getFullYear() - year).to.be.eq(42)
    })
  })

  it('Can filter Specifying only data owner', async () => {
    const filter = await new PatientFilter(api).forDataOwner(user.healthcarePartyId!).build()
    const patients = await api.patientApi.filterPatients(filter)
    expect(patients.rows.length).to.be.greaterThan(0)
    for (const p of patients.rows) {
      const accessInfo = await api.cryptoApi.entities.getDataOwnersWithAccessTo(PatientMapper.toPatientDto(p)!)
      expect(Object.keys(accessInfo.permissionsByDataOwnerId)).to.contain(user.healthcarePartyId!)
    }
  })

  it('Can filter Patients with implicit intersection filter', async () => {
    const intersectionFilter = await new PatientFilter(api)
      .forDataOwner(user.healthcarePartyId!)
      .ofAge(42)
      .byGenderEducationProfession('female')
      .build()

    const patients = await api.patientApi.filterPatients(intersectionFilter)
    expect(patients.rows.length).to.be.greaterThan(0)
    patients.rows.forEach((p) => {
      expect(p.gender).to.be.eq('female')
      const year = getYear(p.dateOfBirth)
      expect(now.getFullYear() - year).to.be.eq(42)
    })
  })

  it('Can filter Patients with explicit intersection filter', async () => {
    const filterByAge = await new PatientFilter(api).forDataOwner(user.healthcarePartyId!).ofAge(42).build()

    const filterByGender = await new PatientFilter(api).forDataOwner(user.healthcarePartyId!).byGenderEducationProfession('female').build()

    const intersectionFilter = FilterComposition.intersection(filterByGender, filterByAge)

    const patients = await api.patientApi.filterPatients(intersectionFilter)
    expect(patients.rows.length).to.be.greaterThan(0)
    patients.rows.forEach((p) => {
      expect(p.gender).to.be.eq('female')
      const year = getYear(p.dateOfBirth)
      expect(now.getFullYear() - year).to.be.eq(42)
    })
  })

  it('If the set are disjoint, the intersection result is empty', async () => {
    const filterByMale = await new PatientFilter(api).forDataOwner(user.healthcarePartyId!).byGenderEducationProfession('male').build()

    const filterByFemale = await new PatientFilter(api).forDataOwner(user.healthcarePartyId!).byGenderEducationProfession('female').build()

    const intersectionFilter = FilterComposition.intersection(filterByFemale, filterByMale)

    const patients = await api.patientApi.filterPatients(intersectionFilter)
    expect(patients.rows.length).to.be.equal(0)
  })

  it('Can filter Patients with union filter', async () => {
    const filterFemales = await new PatientFilter(api).forDataOwner(user.healthcarePartyId!).byGenderEducationProfession('female').build()

    const filterIndeterminate = await new PatientFilter(api)
      .forDataOwner(user.healthcarePartyId!)
      .byGenderEducationProfession('indeterminate')
      .build()

    const unionFilter = FilterComposition.union(filterIndeterminate, filterFemales)

    const patients = await api.patientApi.filterPatients(unionFilter)
    expect(patients.rows.length).to.be.greaterThan(0)
    patients.rows.forEach((p) => {
      expect(p.gender).to.be.oneOf(['female', 'indeterminate'])
    })
  })

  it('If a NoOpFilter is generated as result, an empty result is returned', async function () {
    const noOpFilter = await new PatientFilter(api).forSelf().byIds([uuid()]).byIds([uuid()]).build()

    expect(NoOpFilter.isNoOp(noOpFilter)).to.be.true

    const patients = await api.patientApi.filterPatients(noOpFilter)
    expect(patients.rows.length).to.be.equal(0)
  })
})

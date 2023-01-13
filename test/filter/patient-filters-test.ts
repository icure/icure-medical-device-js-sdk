import 'isomorphic-fetch';
import {
  getEnvironmentInitializer,
  getEnvVariables,
  hcp1Username, setLocalStorage,
  TestUtils,
  TestVars
} from "../test-utils";
import {MedTechApi} from "../../src/apis/MedTechApi";
import {User} from "../../src/models/User";
import {Patient} from "../../src/models/Patient";
import {expect} from "chai";
import {PatientFilter} from "../../src/filter";

setLocalStorage(fetch)

let env: TestVars
let api: MedTechApi
let user: User

const now = new Date()

function getYear(dateOfBirth?: number) {
  expect(!!dateOfBirth).to.be.true
  return Math.floor(dateOfBirth! / 10000)
}

describe("Patient Filters Test", function () {

  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer();
    env = await initializer.execute(getEnvVariables());

    const apiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env!.iCureUrl,
      env.dataOwnerDetails[hcp1Username])
    api = apiAndUser.api
    user = apiAndUser.user

    await api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Arthur',
        lastName: 'Dent',
        gender: "male",
        dateOfBirth: parseInt(`${now.getFullYear() - 42}0101`)
      })
    )

    await api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Trillian',
        lastName: 'Astra',
        gender: "female",
        dateOfBirth: parseInt(`${now.getFullYear() - 42}0101`)
      })
    )

    await api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Zaphod',
        lastName: 'Beeblebrox',
        gender: "indeterminate"
      })
    )
  });

  it("Can filter Patients", async () => {
    const filter = await new PatientFilter()
      .forDataOwner(user.healthcarePartyId!)
      .ofAge(42)
      .build()
    const patients = await api.patientApi.filterPatients(filter)
    expect(patients.rows.length).to.be.greaterThan(0)
    patients.rows.forEach( (p) => {
      expect(!!p.dateOfBirth).to.be.true
      const year = Math.floor(p.dateOfBirth! / 10000)
      expect(now.getFullYear() - year).to.be.eq(42)
    })
  })

  it("Can filter Specifying only data owner", async () => {
    const filter = await new PatientFilter()
      .forDataOwner(user.healthcarePartyId!)
      .build()
    const patients = await api.patientApi.filterPatients(filter)
    expect(patients.rows.length).to.be.greaterThan(0)
    patients.rows.forEach( (p) => {
      expect(Object.keys(p.systemMetaData?.delegations ?? {})).to.contain(user.healthcarePartyId!)
    })
  })

  it("Can filter Patients with implicit intersection filter", async () => {
    const intersectionFilter = await new PatientFilter()
      .forDataOwner(user.healthcarePartyId!)
      .ofAge(42)
      .byGenderEducationProfession("female")
      .build()

    const patients = await api.patientApi.filterPatients(intersectionFilter)
    expect(patients.rows.length).to.be.greaterThan(0)
    patients.rows.forEach( (p) => {
      expect(p.gender).to.be.eq("female")
      const year = getYear(p.dateOfBirth)
      expect(now.getFullYear() - year).to.be.eq(42)
    })
  })


  it("Can filter Patients with explicit intersection filter", async () => {
    const filterByAge = new PatientFilter()
      .forDataOwner(user.healthcarePartyId!)
      .ofAge(42)

    const filterByGenderAndAge = await new PatientFilter()
      .forDataOwner(user.healthcarePartyId!)
      .byGenderEducationProfession("female")
      .intersection([filterByAge])
      .build()

    const patients = await api.patientApi.filterPatients(filterByGenderAndAge)
    expect(patients.rows.length).to.be.greaterThan(0)
    patients.rows.forEach( (p) => {
      expect(p.gender).to.be.eq("female")
      const year = getYear(p.dateOfBirth)
      expect(now.getFullYear() - year).to.be.eq(42)
    })
  })

  it("If the set are disjoint, the intersection result is empty", async () => {
    const filterByMale = new PatientFilter()
      .forDataOwner(user.healthcarePartyId!)
      .byGenderEducationProfession("male")

    const filterByFemaleAndMale = await new PatientFilter()
      .forDataOwner(user.healthcarePartyId!)
      .byGenderEducationProfession("female")
      .intersection([filterByMale])
      .build()

    const patients = await api.patientApi.filterPatients(filterByFemaleAndMale)
    expect(patients.rows.length).to.be.equal(0)
  })

  it("Can filter Patients with union filter", async () => {
    const filterFemales = new PatientFilter()
      .forDataOwner(user.healthcarePartyId!)
      .byGenderEducationProfession("female")

    const filterFemaleOrIndeterminate = await new PatientFilter()
      .forDataOwner(user.healthcarePartyId!)
      .byGenderEducationProfession("indeterminate")
      .union([filterFemales])
      .build()

    const patients = await api.patientApi.filterPatients(filterFemaleOrIndeterminate)
    expect(patients.rows.length).to.be.greaterThan(0)
    patients.rows.forEach( (p) => {
      expect(p.gender).to.be.oneOf(["female", "indeterminate"])
    })
  })

})

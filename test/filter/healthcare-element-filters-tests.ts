import 'isomorphic-fetch'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { User } from '../../src/models/User'
import { getEnvironmentInitializer, hcp1Username, setLocalStorage, TestUtils } from '../test-utils'
import { HealthcareElementFilter } from '../../src/filter/dsl/HealthcareElementFilterDsl'
import { FilterComposition, NoOpFilter } from '../../src/filter/dsl/filterDsl'
import { expect } from 'chai'
import { HealthcareElement } from '../../src/models/HealthcareElement'
import { CodingReference } from '../../src/models/CodingReference'
import { Patient } from '../../src/models/Patient'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { HealthcareElementMapper } from '../../src/mappers/healthcareElement'
import { v4 as uuid } from 'uuid'

setLocalStorage(fetch)

let env: TestVars
let hcp1Api: MedTechApi
let hcp1User: User

let patient: Patient
let he1: HealthcareElement
let he2: HealthcareElement
let he3: HealthcareElement

describe('Healthcare Element Filters Test', function () {
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcp1Api = hcp1ApiAndUser.api
    hcp1User = hcp1ApiAndUser.user

    patient = await hcp1Api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Dirk',
        lastName: 'Gently',
      })
    )

    he1 = await hcp1Api.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({
        description: 'The patient has been diagnosed Pararibulitis',
        codes: new Set([
          new CodingReference({
            id: 'SNOMEDCT|617|20020131',
            type: 'SNOMEDCT',
            code: '617',
            version: '20020131',
          }),
        ]),
      }),
      patient.id!
    )

    he2 = await hcp1Api.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({
        description: 'The patient has been diagnosed Pararibulitis',
        labels: new Set([
          new CodingReference({
            id: 'SNOMEDCT|617|20020131',
            type: 'SNOMEDCT',
            code: '617',
            version: '20020131',
          }),
        ]),
      }),
      patient.id!
    )

    he3 = await hcp1Api.healthcareElementApi.createOrModifyHealthcareElement(
      new HealthcareElement({
        description: 'The patient is allergic to Vogon poetry',
      }),
      patient.id!
    )
  })

  it('If no parameter is specified, all healthcare Elements for the HCP are returned', async function () {
    const filter = await new HealthcareElementFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).build()
    const elements = await hcp1Api.healthcareElementApi.filterHealthcareElement(filter)

    expect(elements.rows.length).to.be.greaterThan(0)
    for (const e of elements.rows) {
      const accessInfo = await hcp1Api.cryptoApi.entities.getDataOwnersWithAccessTo(HealthcareElementMapper.toHealthElementDto(e)!)
      expect(Object.keys(accessInfo.permissionsByDataOwnerId)).to.contain(hcp1User.healthcarePartyId!)
    }
  })

  it('Can filter Healthcare Elements by patient', async function () {
    const elements = await hcp1Api.healthcareElementApi.filterHealthcareElement(
      await new HealthcareElementFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).forPatients([patient]).build()
    )

    expect(!!elements).to.eq(true)
    expect(elements.rows.length).to.be.greaterThan(0)
  }).timeout(60000)

  it('Can filter Healthcare Elements by code', async function () {
    const elements = await hcp1Api.healthcareElementApi.filterHealthcareElement(
      await new HealthcareElementFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).byLabelCodeFilter('SNOMEDCT', '617').build()
    )

    expect(!!elements).to.eq(true)
    expect(elements.rows.length).to.be.greaterThan(0)
    elements.rows.forEach((he) => {
      expect(Array.from(he.labels).map((it) => it.code)).to.contain('617')
      expect(Array.from(he.labels).map((it) => it.type)).to.contain('SNOMEDCT')
    })
  }).timeout(60000)

  it('Can filter Healthcare Elements by tag', async function () {
    const elements = await hcp1Api.healthcareElementApi.filterHealthcareElement(
      await new HealthcareElementFilter(hcp1Api)
        .forDataOwner(hcp1User.healthcarePartyId!)
        .byLabelCodeFilter(undefined, undefined, 'SNOMEDCT', '617')
        .build()
    )

    expect(!!elements).to.eq(true)
    expect(elements.rows.length).to.be.greaterThan(0)
    elements.rows.forEach((he) => {
      expect(Array.from(he.codes).map((it) => it.type)).to.contain('SNOMEDCT')
      expect(Array.from(he.codes).map((it) => it.code)).to.contain('617')
    })
  })

  it('Can filter Healthcare Elements by union filter', async function () {
    const tagFilter = await new HealthcareElementFilter(hcp1Api)
      .forDataOwner(hcp1User.healthcarePartyId!)
      .byLabelCodeFilter('SNOMEDCT', '617')
      .build()
    const codeFilter = await new HealthcareElementFilter(hcp1Api)
      .forDataOwner(hcp1User.healthcarePartyId!)
      .byLabelCodeFilter(undefined, undefined, 'SNOMEDCT', '617')
      .build()

    const unionFilter = FilterComposition.union(tagFilter, codeFilter)

    const elements = await hcp1Api.healthcareElementApi.filterHealthcareElement(unionFilter)

    expect(elements.rows.length).to.be.greaterThan(0)
    elements.rows.forEach((he) => {
      expect(he).to.satisfy((e: HealthcareElement) => {
        return (
          Array.from(e.codes).some((it) => it.type === 'SNOMEDCT' && it.code === '617') ||
          Array.from(e.labels).some((it) => it.type === 'SNOMEDCT' && it.code === '617')
        )
      })
    })
  }).timeout(60000)

  it('Can filter Healthcare Elements by implicit intersection filter', async function () {
    const elements = await hcp1Api.healthcareElementApi.filterHealthcareElement(
      await new HealthcareElementFilter(hcp1Api)
        .forDataOwner(hcp1User.healthcarePartyId!)
        .byIds([he1.id!, he2.id!, he3.id!])
        .byLabelCodeFilter('SNOMEDCT', '617')
        .build()
    )
    expect(elements.rows.length).to.be.equal(1)
    elements.rows.forEach((he) => {
      expect(Array.from(he.labels).map((it) => it.code)).to.contain('617')
      expect(Array.from(he.labels).map((it) => it.type)).to.contain('SNOMEDCT')
    })
  })

  it('Can filter Healthcare Elements by explicit intersection filter', async function () {
    const tagFilter = await new HealthcareElementFilter(hcp1Api)
      .forDataOwner(hcp1User.healthcarePartyId!)
      .byLabelCodeFilter('SNOMEDCT', '617')
      .build()
    const idsFilter = await new HealthcareElementFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).byIds([he1.id!, he2.id!, he3.id!]).build()

    const intersectionFilter = FilterComposition.intersection(tagFilter, idsFilter)

    const elements = await hcp1Api.healthcareElementApi.filterHealthcareElement(intersectionFilter)
    expect(elements.rows.length).to.be.equal(1)
    elements.rows.forEach((he) => {
      expect(Array.from(he.labels).map((it) => it.code)).to.contain('617')
      expect(Array.from(he.labels).map((it) => it.type)).to.contain('SNOMEDCT')
    })
  })

  it('Intersection between disjoint sets return empty result', async function () {
    const tagFilter = await new HealthcareElementFilter(hcp1Api)
      .forDataOwner(hcp1User.healthcarePartyId!)
      .byLabelCodeFilter('SNOMEDCT', '617')
      .build()
    const labelCodeFilter = await new HealthcareElementFilter(hcp1Api)
      .forDataOwner(hcp1User.healthcarePartyId!)
      .byLabelCodeFilter(undefined, undefined, 'SNOMEDCT', '617')
      .build()

    const intersectionFilter = FilterComposition.intersection(tagFilter, labelCodeFilter)

    const elements = await hcp1Api.healthcareElementApi.filterHealthcareElement(intersectionFilter)

    expect(elements.rows.length).to.be.equal(0)
  })

  it('If a NoOpFilter is generated as result, an empty result is returned', async function () {
    const noOpFilter = await new HealthcareElementFilter(hcp1Api).forSelf().byIds([uuid()]).byIds([uuid()]).build()

    expect(NoOpFilter.isNoOp(noOpFilter)).to.be.true

    const elements = await hcp1Api.healthcareElementApi.filterHealthcareElement(noOpFilter)
    expect(elements.rows.length).to.be.equal(0)
  })
})

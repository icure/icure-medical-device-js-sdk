import 'isomorphic-fetch';
import {MedTechApi} from "../../src/apis/MedTechApi";
import {User} from "../../src/models/User";
import {
  getEnvironmentInitializer,
  getEnvVariables,
  hcp1Username,
  setLocalStorage,
  TestUtils,
  TestVars
} from "../test-utils";
import {DataSampleFilter} from "../../src/filter";
import {expect} from "chai";
import {DataSample} from "../../src/models/DataSample";
import {CodingReference} from "../../src/models/CodingReference";
import {Patient} from "../../src/models/Patient";
import {HealthcareElement} from "../../src/models/HealthcareElement";
import {Content} from "../../src/models/Content";

setLocalStorage(fetch);

let env: TestVars;
let hcp1Api: MedTechApi
let hcp1User: User

let ds1: DataSample
let ds2: DataSample
let ds3: DataSample
let he1: HealthcareElement

let patient: Patient

describe("Data Sample Filters Tests", function () {

  before(async function () {
    this.timeout(60000)
    const initializer = await getEnvironmentInitializer();
    env = await initializer.execute(getEnvVariables());

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails[hcp1Username]);
    hcp1Api = hcp1ApiAndUser.api;
    hcp1User = hcp1ApiAndUser.user;

    patient = await hcp1Api.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'Dirk',
        lastName: 'Gently'
      })
    )

    ds1 = await hcp1Api.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        codes: new Set([
          new CodingReference({
            id: 'SNOMEDCT|617|20020131',
            type: 'SNOMEDCT',
            code: '617',
            version: '20020131',
          }),
        ]),
        content: { en: new Content({ stringValue: 'Hello world' }) }
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

    ds2 = await hcp1Api.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        healthcareElementIds: new Set([he1.id!]),
        codes: new Set([
          new CodingReference({
            id: 'SNOMEDCT|617|20020131',
            type: 'SNOMEDCT',
            code: '617',
            version: '20020131',
          }),
        ]),
        content: { en: new Content({ stringValue: 'Hello world' }) }
      })
    )

    ds3 = await hcp1Api.dataSampleApi.createOrModifyDataSampleFor(
      patient.id!,
      new DataSample({
        labels: new Set([
          new CodingReference({
            id: 'SNOMEDCT|617|20020131',
            type: 'SNOMEDCT',
            code: '617',
            version: '20020131',
          }),
        ]),
        content: { en: new Content({ stringValue: 'Hello world' }) }
      })
    )

  });

  it("If no parameter is specified, all the Data Samples for a HCP are returned", async function () {
    const samples = await hcp1Api.dataSampleApi.filterDataSample(
      await new DataSampleFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .build()
    )

    expect(samples.rows.length).to.be.greaterThan(0)
  })

  it("Can filter Data Samples by ids", async function () {
    const samples = await hcp1Api.dataSampleApi.filterDataSample(
      await new DataSampleFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .byIds([ds1.id!, ds2.id!])
        .build()
    )

    expect(samples.rows.length).to.be.equal(2)
    expect(samples.rows.map( (it) => it.id )).to.contain(ds1.id)
    expect(samples.rows.map( (it) => it.id )).to.contain(ds1.id)
  })

  it("Can filter Data Samples by patient", async function () {
    const samples = await hcp1Api.dataSampleApi.filterDataSample(
      await new DataSampleFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .forPatients(hcp1Api.cryptoApi, [patient])
        .build()
    )

    expect(samples.rows.length).to.be.greaterThan(0)
  })

  it("Can filter Data Samples by Healthcare Element id", async function () {
    const samples = await hcp1Api.dataSampleApi.filterDataSample(
      await new DataSampleFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .byHealthElementIds([he1.id!])
        .build()
    )

    expect(samples.rows.length).to.be.equal(1)
    samples.rows.forEach( (sample) => {
      expect(sample.healthcareElementIds).to.contain(he1.id)
    })
  })

  it("Can filter Data Samples by labels", async function () {
    const samples = await hcp1Api.dataSampleApi.filterDataSample(
      await new DataSampleFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .byLabelCodeDateFilter(
          'SNOMEDCT',
          '617'
        )
        .build()
    )

    expect(samples.rows.length).to.be.greaterThan(0)
    samples.rows.forEach( (sample) => {
      expect(Array.from(sample.labels).map( (it) => it.code)).to.contain('617')
      expect(Array.from(sample.labels).map( (it) => it.type)).to.contain('SNOMEDCT')
    })
  }).timeout(60000)

  it("Can filter Data Samples by codes", async function () {
    const samples = await hcp1Api.dataSampleApi.filterDataSample(
      await new DataSampleFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .byLabelCodeDateFilter(
          undefined,
          undefined,
          'SNOMEDCT',
          '617'
        )
        .build()
    )

    expect(samples.rows.length).to.be.greaterThan(0)
    samples.rows.forEach( (sample) => {
      expect(Array.from(sample.codes).map( (it) => it.code)).to.contain('617')
      expect(Array.from(sample.codes).map( (it) => it.type)).to.contain('SNOMEDCT')
    })
  }).timeout(60000)

  it("Can filter Data Samples by union filter", async function () {
    const byHEFilter = new DataSampleFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .byHealthElementIds([he1.id!])

    const filterByHeOrId = await new DataSampleFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .byIds([ds1.id!])
      .union([byHEFilter])
      .build()

    const samples = await hcp1Api.dataSampleApi.filterDataSample(filterByHeOrId)

    expect(samples.rows.length).to.be.greaterThan(0)
    samples.rows.forEach( (sample) => {
      expect(sample).to.satisfy( (s: DataSample) => {
        return s.id === ds1.id! || Array.from(s.healthcareElementIds ?? []).includes(he1.id!)
      })
    })
  })

  it("Can filter Data Samples by explicit intersection filter", async function () {
    const filterByPatient = new DataSampleFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .forPatients(hcp1Api.cryptoApi, [patient])

    const filterByPatientAndByHe = await new DataSampleFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .byHealthElementIds([he1.id!])
      .intersection([filterByPatient])
      .build()

    const samples = await hcp1Api.dataSampleApi.filterDataSample(filterByPatientAndByHe)

    expect(samples.rows.length).to.be.greaterThan(0)
    samples.rows.forEach( (sample) => {
      expect(sample.healthcareElementIds).to.contain(he1.id)
    })
  })

  it("Can filter Data Samples by implicit intersection filter", async function () {
    const filterByPatientAndByHe = await new DataSampleFilter()
      .forDataOwner(hcp1User.healthcarePartyId!)
      .byHealthElementIds([he1.id!])
      .forPatients(hcp1Api.cryptoApi, [patient])
      .build()

    const samples = await hcp1Api.dataSampleApi.filterDataSample(filterByPatientAndByHe)

    expect(samples.rows.length).to.be.greaterThan(0)
    samples.rows.forEach( (sample) => {
      expect(sample.healthcareElementIds).to.contain(he1.id)
    })
  })

  it("Intersection between disjoint sets return empty result", async function () {
    const samples = await hcp1Api.dataSampleApi.filterDataSample(
      await new DataSampleFilter()
        .forDataOwner(hcp1User.healthcarePartyId!)
        .byHealthElementIds([he1.id!])
        .byIds([ds1.id!])
        .build()
    )

    expect(samples.rows.length).to.be.equal(0)
  })

});

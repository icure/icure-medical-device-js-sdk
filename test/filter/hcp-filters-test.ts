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
import {HealthcareProfessionalFilter} from "../../src/filter";
import {expect} from "chai";
import {HealthcareProfessional} from "../../src/models/HealthcareProfessional";
import {v4 as uuid} from "uuid";
import {CodingReference} from "../../src/models/CodingReference";

setLocalStorage(fetch)

let env: TestVars

let hcp1Api: MedTechApi
let hcp1User: User
let patApi: MedTechApi
let patUser: User
let hcp1: HealthcareProfessional
let hcp2: HealthcareProfessional
let hcp3: HealthcareProfessional

describe("HealthcareProfessional Filters Test", function () {
  const id = uuid();
  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer();
    env = await initializer.execute(getEnvVariables());

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails[hcp1Username])
    hcp1Api = hcp1ApiAndUser.api;
    hcp1User = hcp1ApiAndUser.user;

    const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails[patUsername])
    patApi = patApiAndUser.api;
    patUser = patApiAndUser.user;

    //Create more hcps
    hcp1 = await hcp1Api.healthcareProfessionalApi.createOrModifyHealthcareProfessional(new HealthcareProfessional({
      name: 'HCP_01',
      labels: new Set([new CodingReference({type: 'hcp-type', code: `physician-${id}`})]),
      codes: new Set([new CodingReference({type: 'practitioner-specialty', code: `gastroenterologist-${id}`})])
    }))

    hcp2 = await hcp1Api.healthcareProfessionalApi.createOrModifyHealthcareProfessional(new HealthcareProfessional({
      name: 'HCP_02',
      labels: new Set([new CodingReference({type: 'hcp-type', code: `physician-${id}`})]),
      codes: new Set([new CodingReference({type: 'practitioner-specialty', code: `cardiologist-${id}`})])
    }))

    hcp3 = await hcp1Api.healthcareProfessionalApi.createOrModifyHealthcareProfessional(new HealthcareProfessional({
      firstName: 'John',
      lastName: 'Keats',
      labels: new Set([new CodingReference({type: 'hcp-type', code: `physician-${id}`})]),
      codes: new Set([new CodingReference({type: 'practitioner-specialty', code: `cardiologist-${id}`})])
    }))

  });

  it("HcpsByPatientIdFilter test - Success", async function () {
    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', `cardiologist-${id}`)
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.be.greaterThanOrEqual(2)
    hcps.rows.forEach( (hcp) => {
      expect([...hcp.codes][0].code).to.eq(`cardiologist-${id}`)
    });
  })

  it("HcpsByNameFilter test - Success", async function () {
    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byMatches('eat')
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.be.greaterThanOrEqual(1)
    hcps.rows.forEach( (hcp) => {
      expect(hcp.lastName?.toLowerCase()).to.include("eat")
    });
  })

  it("HcpsByNameFilter on firstname as well test - Success", async function () {
    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byMatches('eatsjo')
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.be.greaterThanOrEqual(1)
    hcps.rows.forEach( (hcp) => {
      expect(`${hcp.lastName?.toLowerCase()}${hcp.firstName?.toLowerCase()}`).to.include("eatsjo")
    });
  })


  it("HcpsByPatientIdFilter by type test - Success", async function () {
    const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter('hcp-type', `physician-${id}`)
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.be.greaterThanOrEqual(1)
    hcps.rows.forEach( (hcp) => {
      expect([...hcp.labels][0].code).to.eq(`physician-${id}`)
    });
  })

  it("HcpsByPatientIdFilter by combination test - Success", async function () {
    const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter('hcp-type', `physician-${id}`, 'practitioner-specialty', `gastroenterologist-${id}`)
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.be.greaterThanOrEqual(1)
    hcps.rows.forEach( (hcp) => {
      expect([...hcp.codes][0].code).to.eq(`gastroenterologist-${id}`)
    });
  })


  it("HcpsByPatientIdFilter test - Failure", async function () {
    const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', 'acrobat')
        .build()
    );

    expect(!!hcps).to.be.true
    expect(hcps.rows.length).to.be.equal(0)
  })

  it("If no criteria is specified, all the HCPs are returned", async function () {
    const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .build()
    );

    expect(!!hcps).to.be.true
    expect(hcps.rows.length).to.be.greaterThan(0)
  })

  it("Can filter HCPs by union filter", async function () {
    const hcpIdFilter = new HealthcareProfessionalFilter().byIds([hcp2.id!])

    const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter('hcp-type', `physician-${id}`, 'practitioner-specialty', `gastroenterologist-${id}`)
        .union([hcpIdFilter])
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.be.greaterThanOrEqual(2)
    hcps.rows.forEach( (hcp) => {
      expect(hcp).to.satisfy( (h: HealthcareProfessional) => {
        return [...h.codes][0].code === `gastroenterologist-${id}` || h.id === hcp2.id
      })
    });
  })

  it("Can filter HCPs by implicit intersection filter", async function () {
    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', `cardiologist-${id}`)
        .byIds([hcp2.id!])
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.be.equal(1)
    hcps.rows.forEach( (hcp) => {
      expect([...hcp.codes][0].code).to.eq(`cardiologist-${id}`)
      expect(hcp.id).to.eq(hcp2.id)
    });
  })

  it("Can filter HCPs by explicit intersection filter", async function () {
    const hcpByIdFilter = new HealthcareProfessionalFilter().byIds([hcp3.id!])

    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', `cardiologist-${id}`)
        .intersection([hcpByIdFilter])
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.be.equal(1)
    hcps.rows.forEach( (hcp) => {
      expect(hcp.id).to.eq(hcp3.id)
      expect([...hcp.codes][0].code).to.eq(`cardiologist-${id}`)
    });
  })

  it("Can filter HCPs using disjoint sets with intersection filter returns empty result", async function () {
    const hcpByIdFilter = new HealthcareProfessionalFilter().byIds([hcp1.id!])

    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', `cardiologist-${id}`)
        .intersection([hcpByIdFilter])
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.be.equal(0)
  })

});

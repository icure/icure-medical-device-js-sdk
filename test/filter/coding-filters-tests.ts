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
import {CodingFilter} from "../../src/filter";
import {expect} from "chai";
import {Coding} from "../../src/models/Coding";
import { v4 as uuid } from 'uuid'

setLocalStorage(fetch);

let env: TestVars;
let hcp1Api: MedTechApi
let hcp1User: User

let code1: Coding
let code2: Coding
let code3: Coding

describe("Coding Filters Test", function () {

  before(async function () {
    this.timeout(60000)
    const initializer = await getEnvironmentInitializer();
    env = await initializer.execute(getEnvVariables());

    const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
      env.iCureUrl,
      env.dataOwnerDetails[hcp1Username]);
    hcp1Api = hcp1ApiAndUser.api;
    hcp1User = hcp1ApiAndUser.user;

    code1 = await hcp1Api.codingApi.createOrModifyCoding(
      new Coding({
        type: 'ICURE',
        code: 'PARARIBULITIS',
        version: uuid().substring(0,6),
        regions: ["be"],
        description: { 'fr': 'Pararibulitis' }
      })
    )

    code2 = await hcp1Api.codingApi.createOrModifyCoding(
      new Coding({
        type: 'ICURE',
        code: 'UNIVERSE THERMAL DEATH',
        version: uuid().substring(0,6),
        regions: ["ir", "gb"],
        description: { 'en': 'That is bad' }
      })
    )

    code3 = await hcp1Api.codingApi.createOrModifyCoding(
      new Coding({
        type: 'SNOMED',
        code: 'HEADACHE',
        version: uuid().substring(0,6),
        regions: ["ir", "gb"],
        description: { 'en': 'Ouch' }
      })
    )

  });

  it("If no parameter is specified, all the Codings are returned", async function () {
    const codes = await hcp1Api.codingApi.filterCoding(await new CodingFilter().build())

    expect(codes.rows.length).to.be.greaterThan(0)
  })

  it("Can filter Codings by ids", async function () {
    const codes = await hcp1Api.codingApi.filterCoding(
      await new CodingFilter()
        .byIds([code1.id!, code2.id!])
        .build()
    )

    expect(codes.rows.length).to.be.equal(2)
    expect(codes.rows.map( (it) => it.id )).to.contain(code1.id)
    expect(codes.rows.map( (it) => it.id )).to.contain(code2.id)
  }).timeout(60000)

  it("Can filter Codings by language", async function () {
    const codes = await hcp1Api.codingApi.filterCoding(
      await new CodingFilter()
        .byRegionLanguageTypeLabel('be')
        .build()
    )

    expect(codes.rows.length).to.be.greaterThan(0)
    codes.rows.forEach( (code) => {
      expect(code.regions ?? []).to.contain('be')
    })
  }).timeout(60000)

  it("Can filter Codings by union filter", async function () {
    const codeByIdFilter = new CodingFilter()
      .byIds([code1.id!])

    const filterByIdOrType = await new CodingFilter()
      .byRegionLanguageTypeLabel('gb', 'en', 'SNOMED')
      .union([codeByIdFilter])
      .build()

    const codes = await hcp1Api.codingApi.filterCoding(filterByIdOrType)

    expect(codes.rows.length).to.be.greaterThan(0)
    codes.rows.forEach( (code) => {
      expect(code).to.satisfy( (c: Coding) => {
        return c.id === code1.id! || (
          (c.regions ?? []).includes('gb') &&
          Object.keys(c.description ?? {}).includes('en') &&
          c.type === 'SNOMED'
        )
      })
    })
  }).timeout(60000)

  it("Can filter Codings by implicit intersection filter", async function () {
    const codes = await hcp1Api.codingApi.filterCoding(
      await new CodingFilter()
        .byRegionLanguageTypeLabel('gb', 'en', 'SNOMED')
        .byIds([code1.id!, code2.id!, code3.id!])
        .build()
    )
    expect(codes.rows.length).to.be.equal(1)
    codes.rows.forEach( (code) => {
      expect(code.id).to.be.oneOf([code1.id!, code2.id!, code3.id!])
      expect(code).to.satisfy( (c: Coding) => {
        return (c.regions ?? []).includes('gb') &&
          Object.keys(c.description ?? {}).includes('en') &&
          c.type === 'SNOMED'
      })
    })
  })

  it("Can filter Codings by explicit intersection filter", async function () {
    const codesByIdFilter = new CodingFilter().byIds([code1.id!, code2.id!, code3.id!])

    const codes = await hcp1Api.codingApi.filterCoding(
      await new CodingFilter()
        .byRegionLanguageTypeLabel('gb', 'en', 'SNOMED')
        .intersection([codesByIdFilter])
        .build()
    )
    expect(codes.rows.length).to.be.equal(1)
    codes.rows.forEach( (code) => {
      expect(code.id).to.be.oneOf([code1.id!, code2.id!, code3.id!])
      expect(code).to.satisfy( (c: Coding) => {
        return (c.regions ?? []).includes('gb') &&
          Object.keys(c.description ?? {}).includes('en') &&
          c.type === 'SNOMED'
      })
    })
  })

  it("Intersection between disjoint sets return empty result", async function () {
    const codesByIdFilter = new CodingFilter().byIds([code1.id!])

    const codes = await hcp1Api.codingApi.filterCoding(
      await new CodingFilter()
        .byRegionLanguageTypeLabel('gb', 'en', 'SNOMED')
        .intersection([codesByIdFilter])
        .build()
    )
    expect(codes.rows.length).to.be.equal(0)
  })

});

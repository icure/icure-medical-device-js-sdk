import 'isomorphic-fetch';
import {MedTechApi} from "../../src/apis/medTechApi";
import {User} from "../../src/models/User";
import {getEnvVariables, setLocalStorage, TestUtils} from "../test-utils";
import {HealthcareProfessionalFilter, UserFilter} from "../../src/filter";
import {assert, expect} from "chai";
import {HealthcareProfessional} from "../../src/models/HealthcareProfessional";
import {v4 as uuid} from "uuid";
setLocalStorage(fetch);

const {iCureUrl: iCureUrl, hcpUserName: hcpUserName, hcpPassword: hcpPassword, hcpPrivKey: hcpPrivKey,
  patUserName: patUserName, patPassword: patPassword, patPrivKey: patPrivKey} = getEnvVariables()

let hcp1Api: MedTechApi | undefined = undefined;
let hcp1User: User | undefined = undefined;
let patApi: MedTechApi | undefined = undefined;
let patUser: User | undefined = undefined;

describe("HealthcareProfessional Filters Test", function () {
  const id = uuid();
  before(async function () {
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

    //Create more hcps
    await hcp1Api.healthcareProfessionalApi.createOrModifyHealthcareProfessional(new HealthcareProfessional({
      name: 'HCP_01',
      labels: new Set([{type: 'hcp-type', code: `physician-${id}`}]),
      codes: new Set([{type: 'practitioner-specialty', code: `gastroenterologist-${id}`}])
    }))

    await hcp1Api.healthcareProfessionalApi.createOrModifyHealthcareProfessional(new HealthcareProfessional({
      name: 'HCP_02',
      labels: new Set([{type: 'hcp-type', code: `physician-${id}`}]),
      codes: new Set([{type: 'practitioner-specialty', code: `cardiologist-${id}`}])
    }))

    await hcp1Api.healthcareProfessionalApi.createOrModifyHealthcareProfessional(new HealthcareProfessional({
      name: 'HCP_03',
      labels: new Set([{type: 'hcp-type', code: `physician-${id}`}]),
      codes: new Set([{type: 'practitioner-specialty', code: `cardiologist-${id}`}])
    }))

  });

  it("HcpsByPatientIdFilter test - Success", async function () {
    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', `cardiologist-${id}`)
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.equal(2);
    hcps.rows.forEach( (hcp) => {
      expect([...hcp.codes][0].code).to.eq(`cardiologist-${id}`)
    });
  })

  it("HcpsByPatientIdFilter by type test - Success", async function () {
    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter('hcp-type', `physician-${id}`)
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.equal(3);
    hcps.rows.forEach( (hcp) => {
      expect([...hcp.labels][0].code).to.eq(`physician-${id}`)
    });
  })

  it("HcpsByPatientIdFilter by combination test - Success", async function () {
    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter('hcp-type', `physician-${id}`, 'practitioner-specialty', `gastroenterologist-${id}`)
        .build()
    );

    expect(!!hcps).to.equal(true);
    expect(hcps.rows.length).to.equal(1);
    hcps.rows.forEach( (hcp) => {
      expect([...hcp.codes][0].code).to.eq(`gastroenterologist-${id}`)
    });
  })


  it("HcpsByPatientIdFilter test - Failure", async function () {
    const hcps = await hcp1Api!.healthcareProfessionalApi.filterHealthcareProfessionalBy(
      await new HealthcareProfessionalFilter()
        .byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', 'acrobat')
        .build()
    );

    assert(!!hcps)
    assert(hcps.rows.length == 0)
  })

});

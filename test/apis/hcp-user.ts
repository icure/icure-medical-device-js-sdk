import { assert, expect } from 'chai'
import { v4 as uuid } from 'uuid'
import 'mocha'
import { medTechApi } from '../../src/apis/MedTechApi'
import 'isomorphic-fetch'
import { webcrypto } from 'crypto'
import { User } from '../../src/models/User'
import { HealthcareProfessional } from '../../src/models/HealthcareProfessional'
import { SystemMetaDataOwner } from '../../src/models/SystemMetaDataOwner'
import { Patient } from '../../src/models/Patient'
import { setLocalStorage } from '../test-utils'
import * as os from 'os'
import {jwk2spki} from "@icure/api";
import {getEnvironmentInitializer, getEnvVariables} from "../test-utils";

setLocalStorage(fetch)

const {iCureUrl: iCureUrl, hcpUserName: hcpUserName, hcpPassword: hcpPassword} = getEnvVariables()

describe("Healthcare professional", () => {

  before(async () => {
    const initializer = await getEnvironmentInitializer();
    await initializer.execute();
  });

  it("should be capable of creating a healthcare professional from scratch", async () => {
    const medtechApi = await medTechApi()
      .withICureBaseUrl(iCureUrl)
      .withUserName(hcpUserName)
      .withPassword(hcpPassword)
      .withCrypto(webcrypto as any)
      .build()

    const rawKeyPair: CryptoKeyPair = await medtechApi.cryptoApi.RSA.generateKeyPair()
    const keyPair = await medtechApi.cryptoApi.RSA.exportKeys(rawKeyPair as { publicKey: CryptoKey; privateKey: CryptoKey }, 'jwk', 'jwk')

    const hcp = await medtechApi.healthcareProfessionalApi.createOrModifyHealthcareProfessional(
      new HealthcareProfessional({
        name: `Med-ts-ic-test-${uuid()}`,
        systemMetaData: new SystemMetaDataOwner({
          publicKey: jwk2spki(keyPair.publicKey),
          hcPartyKeys: {},
          privateKeyShamirPartitions: {},
        }),
      })
    )

    assert(hcp)

    let userEmail = `${uuid()}@med-ts-ic-test.com`
    let userPwd = `${uuid()}`
    const user = await medtechApi.userApi.createOrModifyUser(
      new User({
        login: userEmail,
        passwordHash: userPwd,
        email: userEmail,
        healthcarePartyId: hcp.id,
      })
    )

    assert(user.id != null)
    assert(user.login == userEmail)
    assert(user.email == userEmail)
    assert(user.healthcarePartyId == hcp.id)
    assert(user.passwordHash != userPwd)
  })

  it('should be capable of initializing crypto of a healthcare professional from scratch', async () => {
    const medtechApi = await medTechApi()
      .withICureBaseUrl(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build()

    const hcp = await medtechApi.healthcareProfessionalApi.createOrModifyHealthcareProfessional(
      new HealthcareProfessional({
        name: `Med-ts-ic-test-${uuid()}`,
        systemMetaData: new SystemMetaDataOwner({
          hcPartyKeys: {},
          privateKeyShamirPartitions: {},
        }),
      })
    )

    assert(hcp)

    let userEmail = `${uuid()}@med-ts-ic-test.com`
    let userPwd = `${uuid()}`
    const user = await medtechApi.userApi.createOrModifyUser(
      new User({
        login: userEmail,
        passwordHash: userPwd,
        email: userEmail,
        healthcarePartyId: hcp.id,
      })
    )

    assert(user.id != null)
    assert(user.login == userEmail)
    assert(user.email == userEmail)
    assert(user.healthcarePartyId == hcp.id)
    assert(user.passwordHash != userPwd)

    // When HCP wants to init a RSA KeyPair
    const hcpApi = await medTechApi()
      .withICureBaseUrl(iCureUrl)
      .withUserName(userEmail)
      .withPassword(userPwd)
      .withCrypto(webcrypto as any)
      .build()

    const generatedKey = await hcpApi.initUserCrypto()
    expect(generatedKey).to.be.not.undefined
    expect(generatedKey).to.be.not.null

    // Then, HCP can create data
    const createdPatient = await hcpApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: 'John',
        lastName: 'Snow',
        note: 'Winter is coming',
      })
    )

    expect(createdPatient.firstName).to.be.equal('John')
    expect(createdPatient.lastName).to.be.equal('Snow')
    expect(createdPatient.note).to.be.equal('Winter is coming')
  })
})

import { expect } from 'chai'
import { v4 as uuid } from 'uuid'
import 'mocha'
import { medTechApi } from '../../src/apis/MedTechApi'
import 'isomorphic-fetch'
import { webcrypto } from 'crypto'
import { User } from '../../src/models/User'
import { HealthcareProfessional } from '../../src/models/HealthcareProfessional'
import { SystemMetaDataOwner } from '../../src/models/SystemMetaDataOwner'
import { getEnvironmentInitializer, hcp1Username, setLocalStorage, TestUtils } from '../test-utils'
import { Patient } from '../../src/models/Patient'
import { jwk2spki } from '@icure/api'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { SimpleMedTechCryptoStrategies } from '../../src/services/impl/SimpleMedTechCryptoStrategies'
import { DataOwnerTypeEnum } from '../../src/models/DataOwner'

setLocalStorage(fetch)

let env: TestVars

describe('Healthcare professional', () => {
  before(async () => {
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())
  })

  it('should be capable of creating a healthcare professional from scratch', async () => {
    const medtechApi = (await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])).api

    const rawKeyPair: CryptoKeyPair = await medtechApi.cryptoApi.primitives.RSA.generateKeyPair('sha-256')
    const keyPair = await medtechApi.cryptoApi.primitives.RSA.exportKeys(rawKeyPair as { publicKey: CryptoKey; privateKey: CryptoKey }, 'jwk', 'jwk')

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

    expect(!!hcp).to.be.true

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

    expect(user.id).to.not.be.null
    expect(user.login).to.equal(userEmail)
    expect(user.email).to.equal(userEmail)
    expect(user.healthcarePartyId).to.equal(hcp.id)
    expect(user.passwordHash).to.not.equal(userPwd)
  })

  it('should be capable of initializing crypto of a healthcare professional from scratch', async () => {
    const medtechApi = (await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username])).api

    const hcp = await medtechApi.healthcareProfessionalApi.createOrModifyHealthcareProfessional(
      new HealthcareProfessional({
        name: `Med-ts-ic-test-${uuid()}`,
        systemMetaData: new SystemMetaDataOwner({}),
      })
    )

    expect(!!hcp).to.be.true

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

    expect(user.id).to.not.be.null
    expect(user.login).to.equal(userEmail)
    expect(user.email).to.equal(userEmail)
    expect(user.healthcarePartyId).to.equal(hcp.id)
    expect(user.passwordHash).to.not.equal(userPwd)

    // When HCP wants to init a RSA KeyPair
    const hcpApi = await medTechApi()
      .withICureBaseUrl(env!.iCureUrl)
      .withUserName(userEmail)
      .withPassword(userPwd)
      .withCrypto(webcrypto as any)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([], new Set([DataOwnerTypeEnum.Patient])))
      .build()

    const initialisedHcp = await hcpApi.dataOwnerApi.getDataOwner(user.healthcarePartyId!)
    expect(hcpApi.dataOwnerApi.getPublicKeysOf(initialisedHcp)).to.have.length(1)

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

    const retrievedPatient = await hcpApi.patientApi.getPatient(createdPatient.id!)
    expect(retrievedPatient).to.deep.equal(createdPatient)
  })
})

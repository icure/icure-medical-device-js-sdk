import { assert, expect } from 'chai'
import 'mocha'
import 'isomorphic-fetch'

import { getEnvVariables, setLocalStorage, TestUtils } from '../test-utils'
import { AnonymousMedTechApiBuilder } from '../../src/apis/AnonymousMedTechApi'
import { webcrypto } from 'crypto'
import { MedTechApiBuilder } from '../../src/apis/medTechApi'

setLocalStorage(fetch)

const { iCureUrl: iCureUrl, msgGtwUrl: msgGtwUrl, authProcessHcpId: authProcessHcpId, specId: specId } = getEnvVariables()

describe('Authentication API', () => {
  it("AnonymousMedTechApi shouldn't be instantiated if authServerUrl, authProcessId and specId aren't passed", async () => {
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ?? '6a355458dbfa392cb5624403190c6a19' // pragma: allowlist secret

    try {
      await new AnonymousMedTechApiBuilder()
        .withICureBaseUrl(iCureUrl)
        .withCrypto(webcrypto as any)
        .withMsgGwUrl(msgGtwUrl)
        .withAuthProcessByEmailId(authProcessId)
        .withAuthProcessBySmsId(authProcessId)
        .build()
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq('msgGtwSpecId is required')
    }

    try {
      const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
        .withICureBaseUrl(iCureUrl)
        .withCrypto(webcrypto as any)
        .withMsgGwUrl(msgGtwUrl)
        .withMsgGwSpecId(specId)
        .withAuthProcessByEmailId('fake-process-id')
        .withAuthProcessBySmsId('fake-process-id')
        .build()

      expect(anonymousMedTechApi, "anonymousMedTechApi shouldn't be null").not.null
    } catch (e) {
      expect(true, 'promise should not fail').eq(false)
    }
  })

  it("Impossible to use authenticationApi if msgGtwUrl, msgGtwSpecId and authProcessId haven't been provided", async () => {
    // Given
    let api = await new MedTechApiBuilder()
      .withUserName('fake-user-name')
      .withPassword('fake-pwd')
      .withICureBaseUrl(iCureUrl)
      .withMsgGwUrl(msgGtwUrl)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId('fake-process-id')
      .withAuthProcessBySmsId('fake-process-id')
      .build()

    try {
      await api.authenticationApi.startAuthentication('recaptcha',
        'email',
        undefined,
        'firstname',
        'lastname',
        'fake-prof-id',
        false
      )
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq(
        "authenticationApi couldn't be initialized. Make sure you provided the following arguments : msgGwUrl, msgGwSpecId, authProcessByEmailId and authProcessBySMSId"
      )
    }
  })

  it("User should not be able to start authentication if he didn't provide any email and mobilePhone", async () => {
    // Given
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ?? '6a355458dbfa392cb5624403190c6a19' // pragma: allowlist secret

    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(iCureUrl)
      .withMsgGwUrl(msgGtwUrl)
      .withMsgGwSpecId(specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(authProcessId)
      .withAuthProcessBySmsId(authProcessId)
      .build()

    // When
    try {
      await anonymousMedTechApi.authenticationApi.startAuthentication(
        'process.env.ICURE_RECAPTCHA',
        undefined,
        undefined,
        'Tom',
        'Gideon',
        authProcessHcpId,
        false,
      )
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq('In order to start authentication of a user, you should at least provide its email OR its phone number')
    }
  })

  it('User should not be able to start authentication if he provided an empty email and mobilePhone', async () => {
    // Given
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ?? '6a355458dbfa392cb5624403190c6a19' // pragma: allowlist secret

    const anonymousMedTechApi = await new AnonymousMedTechApiBuilder()
      .withICureBaseUrl(iCureUrl)
      .withMsgGwUrl(msgGtwUrl)
      .withMsgGwSpecId(specId)
      .withCrypto(webcrypto as any)
      .withAuthProcessByEmailId(authProcessId)
      .withAuthProcessBySmsId(authProcessId)
      .build()

    // When
    try {
      await anonymousMedTechApi.authenticationApi.startAuthentication(
        'process.env.ICURE_RECAPTCHA',
        '',
        '',
        'Tom',
        'Gideon',
        authProcessHcpId,
        false,
      )
      expect(true, 'promise should fail').eq(false)
    } catch (e) {
      expect((e as Error).message).to.eq('In order to start authentication of a user, you should at least provide its email OR its phone number')
    }
  })

  it('HCP should be capable of signing up using email', async () => {
    // Given
    const authProcessId = process.env.ICURE_TS_TEST_HCP_AUTH_PROCESS_ID ?? '6a355458dbfa392cb5624403190c6a19' // pragma: allowlist secret

    // When
    const hcpApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, specId, authProcessId, authProcessHcpId)
    const currentUser = hcpApiAndUser.user

    // Then
    assert(currentUser)
    assert(currentUser.healthcarePartyId != null)

    const currentHcp = await hcpApiAndUser.api.healthcareProfessionalApi.getHealthcareProfessional(currentUser.healthcarePartyId!)
    assert(currentHcp)
    assert(currentHcp.firstName == 'Antoine')
    assert(currentHcp.lastName == 'Duchâteau')
  }).timeout(60000)

  it('Patient should be able to signing up through email', async () => {
    // Given
    const patAuthProcessId = process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ?? '6a355458dbfa392cb5624403190c39e5'

    // When
    const patApiAndUser = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, specId, patAuthProcessId, authProcessHcpId)

    // Then
    const currentUser = patApiAndUser.user
    assert(currentUser)
    assert(currentUser.patientId != null)

    const currentPatient = await patApiAndUser.api.patientApi.getPatient(currentUser.patientId!)
    assert(currentPatient)
    assert(currentPatient.firstName == 'Antoine')
    assert(currentPatient.lastName == 'Duchâteau')
  }).timeout(60000)
})

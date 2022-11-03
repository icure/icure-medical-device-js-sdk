  import {
  getEnvironmentInitializer,
  getEnvVariables,
    hcp1Username,
  setLocalStorage,
  TestUtils,
  TestVars
} from '../test-utils'
import { v4 as uuid } from 'uuid'
import { assert } from 'chai'
import 'isomorphic-fetch'

setLocalStorage(fetch)

let env: TestVars | undefined;
let hcpId: string | undefined;

describe('User API', () => {

  before(async function () {
    const initializer = await getEnvironmentInitializer();
    env = await initializer.execute(getEnvVariables());

    if (env.backendType === "oss") this.skip()

    const hcpApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env!.iCureUrl, env!.dataOwnerDetails[hcp1Username]);
    hcpId = hcpApiAndUser.user.healthcarePartyId;
  });

  it('If sharedDataType already shared with ownerIds : 200 ok, return user (no treatment needed)', async () => {
    const delegation = uuid()

    const { api } = await TestUtils.signUpUserUsingEmail(env!.iCureUrl, env!.msgGtwUrl, env!.specId, env!.patAuthProcessId, hcpId!)

    // When a user shares data with the provided dataOwner, the user is returned successfully, with additional data sharing entries only and no duplicates
    const userUpdatedWithUpdatedDelegationsOnMedicalInformation = await api.userApi.shareAllFutureDataWith([delegation], 'medicalInformation')
    assert(userUpdatedWithUpdatedDelegationsOnMedicalInformation.sharingDataWith.medicalInformation.has(delegation))

    // When a user already shares data with the provided dataOwner, the user is returned successfully, without any additional request to iCure
    const userUpdatedWithUpdatedDelegationsOnMedicalInformationButNoChanges = await api.userApi.shareAllFutureDataWith(
      [delegation],
      'medicalInformation'
    )

    assert(userUpdatedWithUpdatedDelegationsOnMedicalInformationButNoChanges.sharingDataWith.medicalInformation.has(delegation))
    assert(
      JSON.stringify(userUpdatedWithUpdatedDelegationsOnMedicalInformation) ===
        JSON.stringify(userUpdatedWithUpdatedDelegationsOnMedicalInformationButNoChanges)
    )
  })

  it('A user should be able to share data with another dataOwner, and stop sharing data with him later', async () => {
    const delegation = uuid()

    const { api } = await TestUtils.signUpUserUsingEmail(env!.iCureUrl, env!.msgGtwUrl, env!.specId, env!.patAuthProcessId, hcpId!)

    // When a user shares data with the provided dataOwner, the user is returned successfully, with additional data sharing entries only on the right type
    const userUpdatedWithUpdatedDelegationsOnAll = await api.userApi.shareAllFutureDataWith([delegation], 'all')

    assert(userUpdatedWithUpdatedDelegationsOnAll.sharingDataWith.all.has(delegation))
    assert(!userUpdatedWithUpdatedDelegationsOnAll.sharingDataWith?.medicalInformation?.has(delegation))

    // When a user want to stop to share data with the provided dataOwner, the user is returned successfully, with removed data sharing entries only on provided type
    const userUpdatedWithRemovedDelegationsOnMedicalInformation = await api.userApi.stopSharingDataWith([delegation], 'medicalInformation')

    assert(userUpdatedWithRemovedDelegationsOnMedicalInformation.sharingDataWith.all.has(delegation))
    assert(!userUpdatedWithRemovedDelegationsOnMedicalInformation.sharingDataWith?.medicalInformation?.has(delegation))
  })
})

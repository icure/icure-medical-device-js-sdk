import {getEnvVariables, setLocalStorage, TestUtils} from "../test-utils";
import {v4 as uuid} from 'uuid'
import {assert} from "chai"
import 'isomorphic-fetch'

setLocalStorage(fetch)

const {iCureUrl: iCureUrl, msgGtwUrl: msgGtwUrl, authProcessHcpId: authProcessHcpId, specId: specId} = getEnvVariables()

describe('User API', () => {
  it('A user should be able to share data with another dataOwner, and stop sharing data with him later', async () => {
    const patAuthProcessId = process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ?? "6a355458dbfa392cb5624403190c39e5";
    const delegation = uuid()

  const {
      api
    } = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, specId, patAuthProcessId, authProcessHcpId);

    // When a user shares data with the provided dataOwner, the user is returned successfully, with additional data sharing entries only on the right type
    const userUpdatedWithUpdatedDelegationsOnAll = await api.userApi.shareAllFutureDataWith('all', [delegation])

    assert(userUpdatedWithUpdatedDelegationsOnAll.sharingDataWith.all.has(delegation))
    assert(!userUpdatedWithUpdatedDelegationsOnAll.sharingDataWith?.medicalInformation?.has(delegation))

    // When a user shares data with the provided dataOwner, the user is returned successfully, with additional data sharing entries only and no duplicates
    let userUpdatedWithUpdatedDelegationsOnMedicalInformation = await api.userApi.shareAllFutureDataWith('medicalInformation', [delegation])

    assert(userUpdatedWithUpdatedDelegationsOnMedicalInformation.sharingDataWith.medicalInformation.has(delegation))

    // When a user already shares data with the provided dataOwner, the user is returned successfully, without any additional request to iCure
    const userUpdatedWithUpdatedDelegationsOnMedicalInformationButNoChanges = await api.userApi.shareAllFutureDataWith('medicalInformation', [delegation])

    assert(userUpdatedWithUpdatedDelegationsOnMedicalInformationButNoChanges.sharingDataWith.medicalInformation.has(delegation))
    assert(userUpdatedWithUpdatedDelegationsOnMedicalInformation == userUpdatedWithUpdatedDelegationsOnMedicalInformationButNoChanges)

    // When a user want to stop to share data with the provided dataOwner, the user is returned successfully, with removed data sharing entries only on provided type
    const userUpdatedWithRemovedDelegationsOnMedicalInformation = await api.userApi.stopSharingDataWith('medicalInformation', [delegation])

    assert(userUpdatedWithRemovedDelegationsOnMedicalInformation.sharingDataWith.all.has(delegation))
    assert(!userUpdatedWithRemovedDelegationsOnMedicalInformation.sharingDataWith?.medicalInformation?.has(delegation))
  });
})

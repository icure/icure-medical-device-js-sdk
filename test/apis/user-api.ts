import {TestUtils} from "../test-utils";
import {v4 as uuid} from 'uuid';
import {assert} from "chai";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? 'https://kraken.icure.dev/rest/v1';
const msgGtwUrl =
  process.env.ICURE_TS_TEST_MSG_GTW_URL ?? "https://msg-gw.icure.cloud/ic";
const patAuthProcessId =
  process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ??
  "6a355458dbfa392cb5624403190c39e5"; // pragma: allowlist secret
const authProcessHcpId = process.env.ICURE_TS_TEST_AUTH_PROCESS_HCP_ID!;

describe('User API', () => {
  it('Management of auto-delegations', async () => {
    const {api, user} = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, patAuthProcessId, authProcessHcpId);

    const delegation = uuid()
    const userUpdatedWithUpdatedDelegationsOnAll = await api.userApi.addAutoDelegationsTo('all', user, [delegation])

    assert(userUpdatedWithUpdatedDelegationsOnAll.autoDelegations.all.has(delegation))
    assert(!userUpdatedWithUpdatedDelegationsOnAll.autoDelegations.medicalInformation.has(delegation))

    const userUpdatedWithUpdatedDelegationsOnMedicalInformation = await api.userApi.addAutoDelegationsTo('medicalInformation', user, [delegation])

    assert(!userUpdatedWithUpdatedDelegationsOnMedicalInformation.autoDelegations.medicalInformation.has(delegation))

    const userUpdatedWithRemovedDelegationsOnMedicalInformation = await api.userApi.addAutoDelegationsTo('medicalInformation', user, [delegation])

    assert(userUpdatedWithRemovedDelegationsOnMedicalInformation.autoDelegations.all.has(delegation))
    assert(!userUpdatedWithRemovedDelegationsOnMedicalInformation.autoDelegations.medicalInformation.has(delegation))
  })
})

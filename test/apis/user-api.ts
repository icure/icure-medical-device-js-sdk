import {TestUtils} from "../test-utils";
import {v4 as uuid} from 'uuid';
import {assert} from "chai";
import 'isomorphic-fetch'
import {tmpdir} from "os";
import {TextDecoder, TextEncoder} from "util";

(global as any).localStorage = new (require('node-localstorage').LocalStorage)(tmpdir(), 5 * 1024 * 1024 * 1024)
;(global as any).fetch = fetch
;(global as any).Storage = ''
;(global as any).TextDecoder = TextDecoder
;(global as any).TextEncoder = TextEncoder

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
const msgGtwUrl =
  process.env.ICURE_TS_TEST_MSG_GTW_URL ?? "https://msg-gw.icure.cloud/ic";
const authProcessHcpId = process.env.ICURE_TS_TEST_AUTH_PROCESS_HCP_ID!;
const patAuthProcessId = process.env.ICURE_TS_TEST_PAT_AUTH_PROCESS_ID ?? "6a355458dbfa392cb5624403190c39e5"; // pragma: allowlist secret

describe('User API', () => {
  it('Management of auto-delegations', async () => {
    try {
      const {api, user} = await TestUtils.signUpUserUsingEmail(iCureUrl, msgGtwUrl, patAuthProcessId, authProcessHcpId);

      const currentUser = await api.userApi.getLoggedUser()

      const delegation = uuid()
      const userUpdatedWithUpdatedDelegationsOnAll = await api.userApi.addAutoDelegationsTo('all', currentUser, [delegation])

      assert(userUpdatedWithUpdatedDelegationsOnAll.autoDelegations.all.has(delegation))
      assert(!userUpdatedWithUpdatedDelegationsOnAll.autoDelegations?.medicalInformation?.has(delegation))

      const userUpdatedWithUpdatedDelegationsOnMedicalInformation = await api.userApi.addAutoDelegationsTo('medicalInformation', userUpdatedWithUpdatedDelegationsOnAll, [delegation])

      assert(userUpdatedWithUpdatedDelegationsOnMedicalInformation.autoDelegations.medicalInformation.has(delegation))

      const userUpdatedWithRemovedDelegationsOnMedicalInformation = await api.userApi.removeAutoDelegationsTo('medicalInformation', userUpdatedWithUpdatedDelegationsOnMedicalInformation, [delegation])

      assert(userUpdatedWithRemovedDelegationsOnMedicalInformation.autoDelegations.all.has(delegation))
      assert(!userUpdatedWithRemovedDelegationsOnMedicalInformation.autoDelegations?.medicalInformation?.has(delegation))
    } catch (e) {
      console.error(e)
    }
  })
})

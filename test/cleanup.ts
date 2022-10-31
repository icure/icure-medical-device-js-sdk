import { Api } from '@icure/api'
import 'isomorphic-fetch'
import { hardDeleteGroup } from '@icure/test-setup/groups'
import { cleanup } from '@icure/test-setup'
import { webcrypto } from 'crypto'

export {}

const testEnvironment = process.env.TEST_ENVIRONMENT ?? 'docker'
const composeFileUrl = process.env.COMPOSE_FILE_URL ?? 'https://raw.githubusercontent.com/icure/icure-e2e-test-setup/master/docker-compose-cloud.yaml'
const adminLogin = process.env.ICURE_TEST_ADMIN_LOGIN ?? 'john'
const adminPassword = process.env.ICURE_TEST_ADMIN_PWD ?? 'LetMeIn'
const groupId = process.env.ICURE_TEST_GROUP_ID ?? 'test-group'
const iCureUrl = process.env.ICURE_TS_TEST_URL ?? 'http://127.0.0.1:16044'

if (testEnvironment === 'docker') {
  cleanup('test/scratch', composeFileUrl, 'mock', 'haproxy').then(() => {
    console.log('OK')
  })
} else if (testEnvironment === 'acceptance') {
  Api(iCureUrl, adminLogin, adminPassword, webcrypto as any, fetch).then((api) => {
    hardDeleteGroup(api, groupId).then(() => {
      console.log('OK')
    })
  })
}

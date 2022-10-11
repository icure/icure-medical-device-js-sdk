export {}

import 'isomorphic-fetch'
import {hardDeleteGroup} from "@icure/test-setup/groups";
import { cleanup } from "@icure/test-setup";

const testEnvironment = process.env.TEST_ENVIRONMENT ?? "docker"
const composeFileUrl = process.env.COMPOSE_FILE_URL ?? "https://raw.githubusercontent.com/icure/icure-e2e-test-setup/master/docker-compose-cloud.yaml"
const adminLogin = process.env.ICURE_TEST_ADMIN_LOGIN ?? "john"
const adminPassword = process.env.ICURE_TEST_ADMIN_PWD ?? "LetMeIn"
const adminId = process.env.ICURE_TEST_ADMIN_ID ?? "2aadbf66-2761-4e87-97e9-431ad5a72bec"
const couchDbUrl = process.env.ICURE_COUCHDB_URL ?? "http://127.0.0.1:15984"

if (testEnvironment === "docker") {
  cleanup('test/scratch', composeFileUrl, 'mock', 'haproxy')
    .then(() => {console.log('OK')})
} else if (testEnvironment === "acceptance") {
  hardDeleteGroup(
    adminLogin,
    adminPassword,
    adminId,
    couchDbUrl
  ).then(() => {console.log("OK")})
}





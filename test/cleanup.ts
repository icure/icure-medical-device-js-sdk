export {}

import 'isomorphic-fetch'
import {hardDeleteGroup} from "@icure/test-setup/groups";
import { cleanup } from "@icure/test-setup";

if (process.env.TEST_ENVIRONMENT! === "docker") {
  cleanup('test/scratch', process.env.COMPOSE_FILE_URL!, 'mock', 'haproxy')
    .then(() => {console.log('OK')})
} else if (process.env.TEST_ENVIRONMENT! === "acceptance") {
  hardDeleteGroup(
    process.env.ICURE_TEST_ADMIN_LOGIN!,
    process.env.ICURE_TEST_ADMIN_PWD!,
    process.env.ICURE_TEST_GROUP_ID!,
    process.env.ICURE_COUCHDB_URL ?? "https://couch.svcacc.icure.cloud"
  ).then(() => {console.log("OK")})
}





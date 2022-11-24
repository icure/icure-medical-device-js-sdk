## @

This generator creates TypeScript/JavaScript client that utilizes fetch-api.

### Building

To build and compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Running tests
To run all the tests use:
```
yarn run test
```
By default, the SDK will be tested using the iCure Kraken Cloud version. 
 The corresponding jar will be downloaded on developer computer and will run on a local docker, along with the CouchDB 
 instance and a mock Message Gateway instance. To change these settings, 
 you can use the following environment variables:
```bash
# Set it to docker to run the tests on a local docker
# Set it to acceptance to run the tests on the remote acceptance instance
TEST_ENVIRONMENT="docker" #acceptance

# Set it to kraken to run the tests on the closed-source version
# Set it to oss to run the tests on the oss version
BACKEND_TYPE="kraken" #oss

# The URL of the compose file to use to run the system locally
# Only used if TEST_ENVIRONMENT is set to docker
COMPOSE_FILE_URL="https://raw.githubusercontent.com/icure/icure-e2e-test-setup/master/docker-compose-cloud.yaml"

# The credential of an Admin Kraken user
# Must be the credential of a real admin if TEST_ENVIRONMENT is set to acceptance
ICURE_TEST_ADMIN_LOGIN="john"
ICURE_TEST_ADMIN_PWD="LetMeIn"

# The name of the group that will contain the test data on CouchDB
# Only used if TEST_ENVIRONMENT is set to docker
# Should contain only digits, lowercase letters and dash
ICURE_TEST_GROUP_ID="test-group"

# The URL of the Kraken instance
ICURE_TS_TEST_URL="http://127.0.0.1:16044/rest/v1"

# The URL of the Message Gateway instance
ICURE_TS_TEST_MSG_GTW_URL="http://127.0.0.1:8081/msggtw"

# The URL of the CouchDB Instance
ICURE_COUCHDB_URL="http://127.0.0.1:15984"

# To enable the automatic cleanup of the docker after that all tests finished, you can set
CLEANUP=1
```

#### Advanced Settings
You can customize further your tests by setting these environment variables.

```bash
# The username, password, private key and public key of the HCP that will be used
# to create all the other users.
# If any of them is not set, they will be generated at runtime
ICURE_TEST_MASTER_LOGIN
ICURE_TEST_MASTER_PWD
ICURE_TEST_MASTER_PRIV
ICURE_TEST_MASTER_PUB

# The spec id of the Message Gateway (both for the real one and the mock one)
ICURE_TS_TEST_MSG_GTW_SPEC_ID="ic"
```

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install @ --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save

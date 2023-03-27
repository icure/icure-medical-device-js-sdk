import 'mocha'
import { medTechApi, MedTechApi } from '../../src/apis/MedTechApi'
import 'isomorphic-fetch'
import { webcrypto } from 'crypto'

import { hex2ua, sleep } from '@icure/api'
import { DataSampleFilter, HealthcareElementFilter, NotificationFilter, PatientFilter, UserFilter } from '../../src/filter'

import { assert } from 'chai'
import { DataSample } from '../../src/models/DataSample'
import { Content } from '../../src/models/Content'
import { CodingReference } from '../../src/models/CodingReference'
import { Patient } from '../../src/models/Patient'
import { getEnvironmentInitializer, getEnvVariables, hcp1Username, hcp3Username, setLocalStorage, TestUtils, TestVars } from '../test-utils'
import { Notification, NotificationTypeEnum } from '../../src/models/Notification'
import { User } from '../../src/models/User'
import { v4 as uuid } from 'uuid'
import { HealthcareElement } from '../../src/models/HealthcareElement'
import { Connection } from '../../src/models/Connection'
import { WebSocketWrapper } from '../../src/utils/websocket'

setLocalStorage(fetch)

let env: TestVars | undefined
let medtechApi: MedTechApi | undefined = undefined
const testType = 'IC-TEST'
const testCode = 'TEST'

let hcp1Api: MedTechApi | undefined = undefined
let hcp1User: User | undefined = undefined

describe('Subscription API', () => {
  const initialiseMedTechApi = async (username: string) => {
    const mApi = await medTechApi()
      .withICureBaseUrl(env!!.iCureUrl)
      .withUserName(env!!.dataOwnerDetails[username].user)
      .withPassword(env!!.dataOwnerDetails[username].password)
      .withCrypto(webcrypto as any)
      .build()

    const loggedUser = await mApi.userApi.getLoggedUser()
    await mApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(loggedUser.healthcarePartyId!, hex2ua(env!.dataOwnerDetails[username].privateKey))

    return mApi
  }

  before(async function () {
    this.timeout(600000)
    const initializer = await getEnvironmentInitializer()
    env = await initializer.execute(getEnvVariables())

    if (env.backendType === 'oss') this.skip()

    medtechApi = await initialiseMedTechApi(hcp3Username)

    const hcpApi1AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
    hcp1Api = hcpApi1AndUser.api
    hcp1User = hcpApi1AndUser.user
  })

  async function doXOnYAndSubscribe<Y>(
    api: MedTechApi,
    privateKey: string,
    options: {},
    connectionPromise: Promise<Connection>,
    x: () => Promise<Y>,
    statusListener: (status: string) => void
  ) {
    const loggedUser = await api.userApi.getLoggedUser()
    await api!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(loggedUser.healthcarePartyId!, hex2ua(privateKey))

    const connection = (await connectionPromise)
      .onClosed(async () => {
        statusListener('CLOSED')
        await sleep(3_000)
      })
      .onConnected(async () => {
        statusListener('CONNECTED')
        await x()
      })

    await sleep(20_000)

    connection.close()

    await sleep(3_000)
  }

  describe('Can subscribe to Data Samples', async () => {
    const subscribeAndCreateDataSample = async (
      options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
      eventTypes: ('CREATE' | 'DELETE' | 'UPDATE')[],
      creationApi: MedTechApi,
      subscriptionApi: MedTechApi,
      supplier: () => Promise<void>
    ) => {
      const connectionPromise = async (
        options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
        dataOwnerId: string,
        eventListener: (ds: DataSample) => Promise<void>
      ) =>
        subscriptionApi!.dataSampleApi.subscribeToDataSampleEvents(
          eventTypes,
          await new DataSampleFilter().forDataOwner(dataOwnerId).build(),
          eventListener,
          options
        )

      const loggedUser = await creationApi!!.userApi.getLoggedUser()
      await creationApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
        loggedUser.healthcarePartyId!,
        hex2ua(env!.dataOwnerDetails[hcp3Username].privateKey)
      )

      const events: DataSample[] = []
      const statuses: string[] = []

      await doXOnYAndSubscribe(
        creationApi!!,
        env!.dataOwnerDetails[hcp3Username].privateKey,
        options,
        connectionPromise({}, loggedUser.healthcarePartyId!, async (ds) => {
          events.push(ds)
        }),
        supplier,
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, 'The events have not been recorded')
      assert(statuses.length === 2, 'The statuses have not been recorded')
    }

    const createDataSample = async () => {
      const patient = await medtechApi!!.patientApi.createOrModifyPatient(
        new Patient({
          firstName: 'John',
          lastName: 'Snow',
          note: 'Winter is coming',
        })
      )

      return await medtechApi!!.dataSampleApi.createOrModifyDataSampleFor(
        patient.id!,
        new DataSample({
          labels: new Set([new CodingReference({ type: testType, code: testCode })]),
          content: { en: new Content({ stringValue: 'Hello world' }) },
        })
      )
    }

    const deleteDataSample = async () => {
      const ds = await createDataSample()

      await medtechApi!!.dataSampleApi.deleteDataSample(ds.id!)
    }

    it('CREATE DataSample without options', async () => {
      await subscribeAndCreateDataSample({}, ['CREATE'], medtechApi!!, medtechApi!!, async () => {
        await createDataSample()
      })
    }).timeout(60000)

    it('CREATE DataSample with options', async () => {
      await subscribeAndCreateDataSample(
        {
          connectionRetryIntervalMs: 10_000,
          connectionMaxRetry: 5,
        },
        ['CREATE'],
        medtechApi!!,
        medtechApi!!,
        async () => {
          await createDataSample()
        }
      )
    }).timeout(60000)

    it('CREATE DataSample without options with another instance of medtechApi', async () => {
      const subscriptionApi = await initialiseMedTechApi(hcp3Username)

      await subscribeAndCreateDataSample({}, ['CREATE'], medtechApi!!, subscriptionApi!!, async () => {
        await createDataSample()
      })
    }).timeout(60000)

    it('CREATE DataSample with options with another instance of medtechApi', async () => {
      const subscriptionApi = await initialiseMedTechApi(hcp3Username)

      await subscribeAndCreateDataSample(
        {
          connectionRetryIntervalMs: 10_000,
          connectionMaxRetry: 5,
        },
        ['CREATE'],
        medtechApi!!,
        subscriptionApi!!,
        async () => {
          await createDataSample()
        }
      )
    }).timeout(60000)

    it('DELETE DataSample without options', async () => {
      await subscribeAndCreateDataSample({}, ['DELETE'], medtechApi!!, medtechApi!!, async () => deleteDataSample())
    }).timeout(60000)

    it('DELETE DataSample with options', async () => {
      await subscribeAndCreateDataSample(
        {
          connectionRetryIntervalMs: 10_000,
          connectionMaxRetry: 5,
        },
        ['DELETE'],
        medtechApi!!,
        medtechApi!!,
        async () => deleteDataSample()
      )
    }).timeout(60000)
  })

  describe('Can subscribe to Notifications', async () => {
    const subscribeAndCreateNotification = async (options: {}, eventTypes: ('CREATE' | 'DELETE' | 'UPDATE')[]) => {
      const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (notification: Notification) => Promise<void>) =>
        medtechApi!.notificationApi.subscribeToNotificationEvents(
          eventTypes,
          await new NotificationFilter().forDataOwner(hcp1User!.healthcarePartyId!).withType(NotificationTypeEnum.KEY_PAIR_UPDATE).build(),
          eventListener,
          options
        )

      const loggedUser = await medtechApi!!.userApi.getLoggedUser()
      await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
        loggedUser.healthcarePartyId!,
        hex2ua(env!.dataOwnerDetails[hcp3Username].privateKey)
      )

      const events: Notification[] = []
      const statuses: string[] = []

      await doXOnYAndSubscribe(
        medtechApi!!,
        env!.dataOwnerDetails[hcp3Username].privateKey,
        options,
        connectionPromise({}, loggedUser.healthcarePartyId!, async (notification) => {
          events.push(notification)
        }),
        async () => {
          const notificationId = uuid()
          const notification = new Notification({
            id: notificationId,
            status: 'pending',
            type: NotificationTypeEnum.KEY_PAIR_UPDATE,
          })
          const createdNotification = await medtechApi!!.notificationApi.createOrModifyNotification(notification, hcp1User!.healthcarePartyId!)
          assert(!!createdNotification)
          return createdNotification
        },
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, 'The events have not been recorded')
      assert(statuses.length === 2, 'The statuses have not been recorded')
    }

    it('CREATE Notification without options', async () => {
      await subscribeAndCreateNotification({}, ['CREATE'])
    }).timeout(60000)

    it('CREATE Notification with options', async () => {
      await subscribeAndCreateNotification(
        {
          connectionRetryIntervalMs: 10_000,
          connectionMaxRetry: 5,
        },
        ['CREATE']
      )
    }).timeout(60000)
  })

  describe('Can subscribe to HealthcareElements', async () => {
    const subscribeAndCreateHealthcareElement = async (options: {}, eventTypes: ('CREATE' | 'DELETE' | 'UPDATE')[]) => {
      const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (healthcareElement: HealthcareElement) => Promise<void>) =>
        medtechApi!.healthcareElementApi.subscribeToHealthcareElementEvents(
          eventTypes,
          await new HealthcareElementFilter().forDataOwner(dataOwnerId).byLabelCodeFilter(testType, testCode).build(),
          eventListener,
          options
        )

      const loggedUser = await medtechApi!!.userApi.getLoggedUser()
      await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
        loggedUser.healthcarePartyId!,
        hex2ua(env!.dataOwnerDetails[hcp3Username].privateKey)
      )

      const events: HealthcareElement[] = []
      const statuses: string[] = []

      await doXOnYAndSubscribe(
        medtechApi!!,
        env!.dataOwnerDetails[hcp3Username].privateKey,
        options,
        connectionPromise({}, loggedUser.healthcarePartyId!, async (healthcareElement) => {
          events.push(healthcareElement)
        }),
        async () => {
          const patient = await medtechApi!!.patientApi.createOrModifyPatient(
            new Patient({
              firstName: 'John',
              lastName: 'Snow',
              note: 'Winter is coming',
            })
          )

          await medtechApi!!.healthcareElementApi.createOrModifyHealthcareElement(
            new HealthcareElement({
              note: 'Hero Syndrome',
            }),
            patient.id
          )
        },
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, 'The events have not been recorded')
      assert(statuses.length === 2, 'The statuses have not been recorded')
    }

    it('CREATE HealthcareElement without options', async () => {
      await subscribeAndCreateHealthcareElement({}, ['CREATE'])
    }).timeout(60000)

    it('CREATE HealthcareElement with options', async () => {
      await subscribeAndCreateHealthcareElement(
        {
          connectionRetryIntervalMs: 10_000,
          connectionMaxRetry: 5,
        },
        ['CREATE']
      )
    }).timeout(60000)
  })

  describe('Can subscribe to Patients', async () => {
    const subscribeAndCreatePatient = async (options: {}, eventTypes: ('CREATE' | 'DELETE' | 'UPDATE')[]) => {
      const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (patient: Patient) => Promise<void>) => {
        await sleep(2000)
        return medtechApi!.patientApi.subscribeToPatientEvents(
          eventTypes,
          await new PatientFilter().forDataOwner(loggedUser.healthcarePartyId!).containsFuzzy('John').build(),
          eventListener,
          options
        )
      }

      const loggedUser = await medtechApi!!.userApi.getLoggedUser()
      await medtechApi!.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
        loggedUser.healthcarePartyId!,
        hex2ua(env!.dataOwnerDetails[hcp3Username].privateKey)
      )

      const events: Patient[] = []
      const statuses: string[] = []

      await doXOnYAndSubscribe(
        medtechApi!!,
        env!.dataOwnerDetails[hcp3Username].privateKey,
        options,
        connectionPromise(options, loggedUser.healthcarePartyId!, async (patient) => {
          events.push(patient)
        }),
        async () => {
          await medtechApi!!.patientApi.createOrModifyPatient(
            new Patient({
              firstName: 'John',
              lastName: 'Snow',
              note: 'Winter is coming',
            })
          )
        },
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, 'The events have not been recorded')
      assert(statuses.length === 2, 'The statuses have not been recorded')
    }

    it('CREATE Patient without option', async () => {
      await subscribeAndCreatePatient({}, ['CREATE'])
    }).timeout(60000)

    it('CREATE Patient with options', async () => {
      await subscribeAndCreatePatient(
        {
          connectionRetryIntervalMs: 10_000,
          connectionMaxRetry: 5,
        },
        ['CREATE']
      )
    }).timeout(60000)
  })

  describe('Can subscribe to User', async () => {
    const subscribeAndCreateUser = async (options: {}, eventTypes: ('CREATE' | 'DELETE' | 'UPDATE')[]) => {
      const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (user: User) => Promise<void>) => {
        await sleep(2000)
        return medtechApi!.userApi.subscribeToUserEvents(eventTypes, await new UserFilter().build(), eventListener, options)
      }

      const loggedUser = await medtechApi!!.userApi.getLoggedUser()

      await sleep(2000)

      const events: User[] = []
      const statuses: string[] = []

      await doXOnYAndSubscribe(
        medtechApi!!,
        env!.dataOwnerDetails[hcp3Username].privateKey,
        options,
        connectionPromise(options, loggedUser.healthcarePartyId!, async (user) => {
          events.push(user)
        }),
        async () => {
          const patApiAndUser = await TestUtils.signUpUserUsingEmail(
            env!.iCureUrl,
            env!.msgGtwUrl,
            env!.specId,
            env!.patAuthProcessId,
            loggedUser.healthcarePartyId!,
            env!.recaptcha,
            'recaptcha'
          )

          const currentUser = patApiAndUser.user
          assert(currentUser)
        },
        (status) => {
          statuses.push(status)
        }
      )

      events?.forEach((event) => console.log(`Event : ${event}`))
      statuses?.forEach((status) => console.log(`Status : ${status}`))

      assert(events.length === 1, 'The events have not been recorded')
      assert(statuses.length === 2, 'The statuses have not been recorded')
    }

    it('CREATE User without options', async () => {
      await subscribeAndCreateUser({}, ['CREATE'])
    }).timeout(60000)

    it('CREATE User with options', async () => {
      await subscribeAndCreateUser(
        {
          connectionRetryIntervalMs: 10_000,
          connectionMaxRetry: 5,
        },
        ['CREATE']
      )
    }).timeout(60000)
  })

  describe('Retry mechanism', async () => {
    it('Should fails 10 times and then cut', async () => {
      const statuses: string[] = []

      const ws = await WebSocketWrapper.create(
        env!.iCureUrl.replace('http', 'ws').replace('rest', 'ws') + '/notification/subscribe',
        async () => 'fake-token',
        10,
        500,
        {
          CONNECTED: [() => statuses.push('CONNECTED')],
          CLOSED: [() => statuses.push('CLOSED')],
          ERROR: [(ws, error) => statuses.push('ERROR')],
        },
        (data) => {
          throw new Error('Test')
        }
      )

      await sleep(20000)

      assert(statuses.length === 20, 'The statuses have not been recorded')
      assert(statuses.filter((status) => status === 'ERROR').length === 10, 'There should be 10 errors status')
      assert(statuses.filter((status) => status === 'CLOSED').length === 10, 'There should be 10 closed status')
    }).timeout(60000)
  })
})

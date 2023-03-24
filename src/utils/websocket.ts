import * as WebSocket from 'ws'
import { Filter } from '../filter/Filter'
import { Patient } from '../models/Patient'
import { DataSample } from '../models/DataSample'
import { User } from '../models/User'
import { Notification } from '../models/Notification'
import { FilterMapper } from '../mappers/filter'
import { UserMapper } from '../mappers/user'
import { HealthElement, MaintenanceTask, Patient as PatientDto, Service, User as UserDto } from '@icure/api'
import { PatientMapper } from '../mappers/patient'
import { DataSampleMapper } from '../mappers/serviceDataSample'
import { HealthcareElement } from '../models/HealthcareElement'
import { HealthcareElementMapper } from '../mappers/healthcareElement'
import { NotificationMapper } from '../mappers/notification'
import log, { LogLevelDesc } from 'loglevel'
export type EventTypes = 'CREATE' | 'UPDATE' | 'DELETE'
type Subscribable = 'Patient' | 'DataSample' | 'User' | 'HealthcareElement' | 'Notification'

log.setLevel((process.env.WEBSOCKET_LOG_LEVEL as LogLevelDesc) ?? 'info')

export function subscribeToEntityEvents(
  basePath: string,
  tokenProvider: () => Promise<string>,
  entityClass: 'Patient',
  eventTypes: EventTypes[],
  filter: Filter<Patient> | undefined,
  eventFired: (entity: Patient) => Promise<void>,
  options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
  decryptor: (encrypted: PatientDto) => Promise<PatientDto>
): Promise<WebSocketWrapper>
export function subscribeToEntityEvents(
  basePath: string,
  tokenProvider: () => Promise<string>,
  entityClass: 'DataSample',
  eventTypes: EventTypes[],
  filter: Filter<DataSample> | undefined,
  eventFired: (entity: DataSample) => Promise<void>,
  options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
  decryptor: (encrypted: Service) => Promise<Service>
): Promise<WebSocketWrapper>
export function subscribeToEntityEvents(
  basePath: string,
  tokenProvider: () => Promise<string>,
  entityClass: 'HealthcareElement',
  eventTypes: EventTypes[],
  filter: Filter<HealthcareElement> | undefined,
  eventFired: (entity: HealthcareElement) => Promise<void>,
  options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
  decryptor: (encrypted: HealthElement) => Promise<HealthElement>
): Promise<WebSocketWrapper>
export function subscribeToEntityEvents(
  basePath: string,
  tokenProvider: () => Promise<string>,
  entityClass: 'User',
  eventTypes: EventTypes[],
  filter: Filter<User> | undefined,
  eventFired: (entity: User) => Promise<void>,
  options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
): Promise<WebSocketWrapper>
export function subscribeToEntityEvents(
  basePath: string,
  tokenProvider: () => Promise<string>,
  entityClass: 'Notification',
  eventTypes: EventTypes[],
  filter: Filter<Notification> | undefined,
  eventFired: (entity: Notification) => Promise<void>,
  options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
  decryptor: (encrypted: MaintenanceTask) => Promise<MaintenanceTask>
): Promise<WebSocketWrapper>

export function subscribeToEntityEvents<
  O extends Patient | DataSample | User | HealthcareElement | Notification,
  T extends PatientDto | Service | HealthElement | MaintenanceTask
>(
  basePath: string,
  tokenProvider: () => Promise<string>,
  entityClass: Subscribable,
  eventTypes: EventTypes[],
  filter: Filter<O> | undefined,
  eventFired: (entity: O) => Promise<void>,
  options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number } = {},
  decryptor?: (encrypted: T) => Promise<T>
): Promise<WebSocketWrapper> {
  const config = {
    User: {
      qualifiedName: 'org.taktik.icure.entities.User',
      filter: (filter: Filter<User>) => FilterMapper.toAbstractFilterDto<User>(filter, 'User'),
      mapper: (data: UserDto) => Promise.resolve(UserMapper.toUser(data as UserDto)! as O),
    },
    Patient: {
      qualifiedName: 'org.taktik.icure.entities.Patient',
      filter: (filter: Filter<Patient>) => FilterMapper.toAbstractFilterDto<Patient>(filter, 'Patient'),
      mapper: (data: PatientDto) => decryptor!(data as PatientDto as T).then((p) => PatientMapper.toPatient(p as PatientDto)! as O),
    },
    DataSample: {
      qualifiedName: 'org.taktik.icure.entities.embed.Service',
      filter: (filter: Filter<DataSample>) => FilterMapper.toAbstractFilterDto<DataSample>(filter, 'DataSample'),
      mapper: (data: Service) => decryptor!(data as Service as T).then((s) => DataSampleMapper.toDataSample(s as Service)! as O),
    },
    HealthcareElement: {
      qualifiedName: 'org.taktik.icure.entities.HealthElement',
      filter: (filter: Filter<HealthcareElement>) => FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement'),
      mapper: (data: HealthElement) =>
        decryptor!(data as HealthElement as T).then((h) => HealthcareElementMapper.toHealthcareElement(h as HealthElement)! as O),
    },
    Notification: {
      qualifiedName: 'org.taktik.icure.entities.MaintenanceTask',
      filter: (filter: Filter<Notification>) => FilterMapper.toAbstractFilterDto<Notification>(filter, 'Notification'),
      mapper: (data: MaintenanceTask) =>
        decryptor!(data as MaintenanceTask as T).then((n) => NotificationMapper.toNotification(n as MaintenanceTask)! as O),
    },
  }

  return WebSocketWrapper.create(
    basePath.replace('http', 'ws').replace('rest', 'ws') + '/notification/subscribe',
    tokenProvider,
    options.connectionMaxRetry ?? 5,
    options.connectionRetryIntervalMs ?? 1_000,
    {
      CONNECTED: [
        async (ws: WebSocketWrapper) => {
          const subscription = {
            eventTypes,
            entityClass: config[entityClass].qualifiedName,
            filter: filter
              ? {
                  filter: config[entityClass].filter(filter),
                }
              : undefined,
          }

          ws.send(JSON.stringify(subscription))
        },
      ],
    },
    async (data: any) => {
      try {
        await config[entityClass].mapper(data).then((o) => eventFired(o))
      } catch (e) {
        log.error(e)
      }
    }
  )
}

export type ConnectionStatus = 'NOT_CONNECTED' | 'CONNECTED' | 'CLOSED' | 'ERROR'
export type StatusCallback = (ws: WebSocketWrapper) => void
export type ErrorStatusCallback = (ws: WebSocketWrapper, error?: Error) => void
export type ConnectionStatusFunction = {
  [K in ConnectionStatus]: K extends 'ERROR' ? ErrorStatusCallback : StatusCallback
}
export type ConnectionStatusFunctions = {
  [K in ConnectionStatus]?: K extends 'ERROR' ? Array<ErrorStatusCallback> : Array<StatusCallback>
}
export type WebSocketWrapperMessageCallback = (data: any) => void

export class WebSocketWrapper {
  private readonly pingLifetime: number = 20_000
  private socket: WebSocket | null = null
  private retries = 0
  private closed = false
  private lastPingReceived = Date.now()
  private intervalIds: (NodeJS.Timeout | number)[] = []

  private constructor(
    private readonly url: string,
    private readonly tokenProvider: () => Promise<string>,
    private readonly maxRetries = 3,
    private readonly retryDelay = 1000,
    private readonly statusCallbacks: ConnectionStatusFunctions = {},
    private readonly messageCallback: WebSocketWrapperMessageCallback = () => {}
  ) {}

  public static async create(
    url: string,
    tokenProvider: () => Promise<string>,
    maxRetries?: number,
    retryDelay?: number,
    statusCallbacks?: ConnectionStatusFunctions,
    messageCallback?: WebSocketWrapperMessageCallback
  ): Promise<WebSocketWrapper> {
    const ws = new WebSocketWrapper(url, tokenProvider, maxRetries, retryDelay, statusCallbacks, messageCallback)
    await ws.connect()
    return ws
  }

  public send(data: Buffer | ArrayBuffer | string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data)
    }
  }

  public close() {
    if (this.socket) {
      this.closed = true
      this.socket.close(1001, 'Client closed connection')
    }
  }

  public addStatusCallback(status: ConnectionStatus, callback: ConnectionStatusFunction[ConnectionStatus]) {
    switch (status) {
      case 'CONNECTED':
      case 'CLOSED':
        if (!this.statusCallbacks[status]) this.statusCallbacks[status] = []
        this.statusCallbacks?.[status]?.push(callback)
        break
      case 'ERROR':
        this.statusCallbacks?.ERROR?.push(callback)
        break
    }
  }

  private async connect() {
    if (this.retries >= this.maxRetries) {
      throw new Error('WebSocket connection failed after ' + this.maxRetries + ' retries')
    }

    this.socket = new WebSocket(`${this.url};tokenid=${await this.tokenProvider()}`)

    this.socket.on('open', async () => {
      log.debug('WebSocket connection opened')

      this.intervalIds.push(
        setTimeout(() => {
          this.retries = 0
        }, (this.maxRetries + 1) * this.retryDelay)
      )

      this.callStatusCallbacks('CONNECTED')
    })

    this.socket.on('message', (event: Buffer) => {
      log.debug('WebSocket message received', event)

      const dataAsString = event.toString('utf8')

      // Handle ping messages
      if (dataAsString === 'ping') {
        log.debug('Received ping, sending pong')

        this.send('pong')
        this.lastPingReceived = Date.now()

        this.intervalIds.push(
          setTimeout(() => {
            if (Date.now() - this.lastPingReceived > this.pingLifetime) {
              log.error(`No ping received in the last ${this.pingLifetime} ms`)
              this.socket?.close()
            }
          }, this.pingLifetime)
        )

        return
      }

      // Call the message callback for other messages
      try {
        const data = JSON.parse(dataAsString)
        this.messageCallback(data)
      } catch (error) {
        log.error('Failed to parse WebSocket message', error)
      }
    })

    this.socket.on('close', (code, reason) => {
      log.debug('WebSocket connection closed', code, reason.toString('utf8'))

      this.callStatusCallbacks('CLOSED')

      this.intervalIds.forEach((id) => clearTimeout(id as number))
      this.intervalIds = []

      if (this.closed) {
        return
      }

      setTimeout(async () => {
        ++this.retries
        return await this.connect()
      }, this.retryDelay)
    })

    this.socket.on('error', async (err) => {
      log.error('WebSocket error', err)

      this.callStatusCallbacks('ERROR', err)

      if (this.socket) {
        this.socket.close()
      }
    })
  }

  private callStatusCallbacks(event: ConnectionStatus, error?: Error) {
    switch (event) {
      case 'CONNECTED':
      case 'CLOSED':
        this.statusCallbacks?.[event]?.forEach((callback) => callback(this))
        break
      case 'ERROR':
        this.statusCallbacks?.ERROR?.forEach((callback) => callback(this, error))
        break
    }
  }
}

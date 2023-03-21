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

export type EventTypes = 'CREATE' | 'UPDATE' | 'DELETE'
type Subscribable = 'Patient' | 'DataSample' | 'User' | 'HealthcareElement' | 'Notification'
type SubscribableEntity = Patient | DataSample | User | HealthcareElement | Notification

export function subscribeToEntityEvents(
  basePath: string,
  username: string,
  password: string,
  entityClass: 'Patient',
  eventTypes: EventTypes[],
  filter: Filter<Patient> | undefined,
  eventFired: (entity: Patient) => Promise<void>,
  options: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
  decryptor: (encrypted: PatientDto) => Promise<PatientDto>
): Promise<WebSocketWrapper>
export function subscribeToEntityEvents(
  basePath: string,
  username: string,
  password: string,
  entityClass: 'DataSample',
  eventTypes: EventTypes[],
  filter: Filter<DataSample> | undefined,
  eventFired: (entity: DataSample) => Promise<void>,
  options: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
  decryptor: (encrypted: Service) => Promise<Service>
): Promise<WebSocketWrapper>
export function subscribeToEntityEvents(
  basePath: string,
  username: string,
  password: string,
  entityClass: 'HealthcareElement',
  eventTypes: EventTypes[],
  filter: Filter<HealthcareElement> | undefined,
  eventFired: (entity: HealthcareElement) => Promise<void>,
  options: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
  decryptor: (encrypted: HealthElement) => Promise<HealthElement>
): Promise<WebSocketWrapper>
export function subscribeToEntityEvents(
  basePath: string,
  username: string,
  password: string,
  entityClass: 'User',
  eventTypes: EventTypes[],
  filter: Filter<User> | undefined,
  eventFired: (entity: User) => Promise<void>,
  options: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
): Promise<WebSocketWrapper>
export function subscribeToEntityEvents(
  basePath: string,
  username: string,
  password: string,
  entityClass: 'Notification',
  eventTypes: EventTypes[],
  filter: Filter<Notification> | undefined,
  eventFired: (entity: Notification) => Promise<void>,
  options: { keepAlive?: number; lifetime?: number; connectionMaxRetry?: number; connectionRetryIntervalMs?: number },
  decryptor: (encrypted: MaintenanceTask) => Promise<MaintenanceTask>
): Promise<WebSocketWrapper>
export function subscribeToEntityEvents<
  O extends Patient | DataSample | User | HealthcareElement | Notification,
  T extends PatientDto | Service | HealthElement | MaintenanceTask
>(
  basePath: string,
  username: string,
  password: string,
  entityClass: Subscribable,
  eventTypes: EventTypes[],
  filter: Filter<O> | undefined,
  eventFired: (entity: O) => Promise<void>,
  options: {} = {},
  decryptor?: (encrypted: T) => Promise<T>
): Promise<WebSocketWrapper> {
  return new Promise((resolve, reject) => {
    new WebSocketWrapper(
      basePath,
      username,
      password,
      5,
      1000,
      {
        CONNECTED: [
          (ws: WebSocketWrapper) => {
            const subscription = {
              entityClass:
                entityClass === 'User'
                  ? 'org.taktik.icure.entities.User'
                  : entityClass === 'Patient'
                  ? 'org.taktik.icure.entities.Patient'
                  : entityClass === 'DataSample'
                  ? 'org.taktik.icure.entities.embed.Service'
                  : entityClass === 'HealthcareElement'
                  ? 'org.taktik.icure.entities.HealthElement'
                  : entityClass === 'Notification'
                  ? 'org.taktik.icure.entities.MaintenanceTask'
                  : undefined,
              eventTypes,
              filter: filter
                ? {
                    filter:
                      entityClass === 'User'
                        ? FilterMapper.toAbstractFilterDto<User>(filter, 'User')
                        : entityClass === 'Patient'
                        ? FilterMapper.toAbstractFilterDto<Patient>(filter, 'Patient')
                        : entityClass === 'DataSample'
                        ? FilterMapper.toAbstractFilterDto<DataSample>(filter, 'DataSample')
                        : entityClass === 'HealthcareElement'
                        ? FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement')
                        : entityClass === 'Notification'
                        ? FilterMapper.toAbstractFilterDto<Notification>(filter, 'Notification')
                        : undefined,
                  }
                : undefined,
            }

            ws.send(JSON.stringify(subscription))
          },
        ],
        CLOSED: [
          (ws: WebSocketWrapper) => {
            resolve(ws)
          },
        ],
        ERROR: [
          (ws: WebSocketWrapper, error?: string) => {
            reject(error)
          },
        ],
      },
      (data: any) => {
        try {
          if (entityClass === 'User') {
            eventFired(UserMapper.toUser(JSON.parse(data) as UserDto)! as O).catch((e) => console.error(e))
          }
          if (entityClass === 'Patient') {
            decryptor!(JSON.parse(data) as PatientDto as T)
              .then((p) => eventFired(PatientMapper.toPatient(p)! as O))
              .catch((e) => console.error(e))
          }
          if (entityClass === 'DataSample') {
            decryptor!(JSON.parse(data) as Service as T)
              .then((s) => eventFired(DataSampleMapper.toDataSample(s as Service)! as O))
              .catch((e) => console.error(e))
          }
          if (entityClass === 'HealthcareElement') {
            decryptor!(JSON.parse(data) as HealthElement as T)
              .then((he) => eventFired(HealthcareElementMapper.toHealthcareElement(he as HealthElement)! as O))
              .catch((e) => console.error(e))
          }
          if (entityClass === 'Notification') {
            decryptor!(JSON.parse(data) as MaintenanceTask as T)
              .then((mt) => eventFired(NotificationMapper.toNotification(mt as MaintenanceTask)! as O))
              .catch((e) => console.error(e))
          }
        } catch (e) {
          console.error(e)
        }
      }
    )
  })
}

export type ConnectionStatus = 'NOT_CONNECTED' | 'CONNECTED' | 'CLOSED' | 'ERROR'
type ConnectionStatusFunctions = {
  [K in ConnectionStatus]: K extends 'ERROR' ? (ws: WebSocketWrapper, error?: string) => void : (ws: WebSocketWrapper) => void
}
export type StatusFunctions = {
  [K in ConnectionStatus]?: K extends 'ERROR' ? Array<(ws: WebSocketWrapper, error?: string) => void> : Array<(ws: WebSocketWrapper) => void>
}
export type WebSocketWrapperMessageCallback = (data: any) => void

export class WebSocketWrapper {
  private readonly url: string
  private readonly username: string
  private readonly password: string
  private readonly maxRetries: number
  private readonly retryDelay: number
  private readonly pingLifetime: number = 10_000
  private statusCallbacks: StatusFunctions = {}
  private readonly messageCallback: WebSocketWrapperMessageCallback
  private socket: WebSocket | null = null
  private retries = 0
  private closed = false
  private lastPingReceived = Date.now()

  constructor(
    url: string,
    username: string,
    password: string,
    maxRetries = 3,
    retryDelay = 1000,
    statusCallback?: StatusFunctions,
    messageCallback?: WebSocketWrapperMessageCallback
  ) {
    this.url = url
    this.username = username
    this.password = password
    this.maxRetries = maxRetries
    this.retryDelay = retryDelay

    this.statusCallbacks = statusCallback || {}

    this.messageCallback = messageCallback || (() => {})

    // Check if a ping has been received in the last 10 seconds
    setInterval(() => {
      if (Date.now() - this.lastPingReceived > this.pingLifetime) {
        console.error(`No ping received in the last ${this.pingLifetime} ms`)
        this.socket?.close()
      }
    }, this.pingLifetime)

    this.connect()
  }

  public send(data: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data))
    }
  }

  public close() {
    if (this.socket) {
      closed = true
      this.socket.close()
    }
  }

  public addStatusCallback(status: ConnectionStatus, callback: ConnectionStatusFunctions[ConnectionStatus]) {
    switch (status) {
      case 'NOT_CONNECTED':
      case 'CONNECTED':
      case 'CLOSED':
        this.statusCallbacks?.[status]?.push(callback)
        break
      case 'ERROR':
        this.statusCallbacks?.ERROR?.push(callback)
        break
    }
  }

  private connect() {
    if (this.retries >= this.maxRetries) {
      console.error('WebSocket connection failed after', this.maxRetries, 'retries')
      return
    }

    this.socket = new WebSocket(this.url, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64'),
      },
    })

    this.socket.on('open', () => {
      console.debug('WebSocket connection opened')
      // Reset the retry counter
      this.retries = 0
      // Call all status callbacks
      this.callStatusCallbacks('CONNECTED')
    })

    this.socket.on('message', (event: any) => {
      console.debug('WebSocket message received:', event.data)

      // Handle ping messages
      if (event.data === 'ping') {
        console.debug('Received ping, sending pong')
        this.send('pong')
        this.lastPingReceived = Date.now()
        return
      }

      // Call the message callback for other messages
      try {
        const data = JSON.parse(event.data)
        this.messageCallback(data)
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    })

    this.socket.on('close', (event: any) => {
      console.debug('WebSocket connection closed:', event)

      this.callStatusCallbacks('CLOSED')

      if (this.closed) {
        return
      }

      setTimeout(() => {
        ++this.retries
        return this.connect()
      }, this.retryDelay)
    })

    this.socket.on('error', (event: any) => {
      console.error('WebSocket error:', event)

      this.callStatusCallbacks('ERROR')

      if (this.socket) {
        this.socket.close()
      }
    })
  }

  private callStatusCallbacks(event: ConnectionStatus, error?: string) {
    switch (event) {
      case 'NOT_CONNECTED':
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

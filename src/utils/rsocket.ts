import * as WebSocket from "ws";
import RSocketWebSocketClient from "rsocket-websocket-client";
import {
  APPLICATION_JSON,
  BufferEncoders,
  encodeCompositeMetadata,
  encodeRoute,
  encodeSimpleAuthMetadata,
  IdentitySerializer,
  JsonSerializer,
  MESSAGE_RSOCKET_AUTHENTICATION,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  MESSAGE_RSOCKET_ROUTING,
  RSocketClient
} from "rsocket-core";
import type {ConnectionStatus, ISubscriber, ISubscription, Payload} from 'rsocket-types';
import {Flowable, Single} from 'rsocket-flowable';
import {ReactiveSocket} from "rsocket-types/ReactiveSocketTypes";
import {Filter} from "../filter/Filter";
import {Patient} from "../models/Patient";
import {DataSample} from "../models/DataSample";
import {User} from "../models/User";
import {Notification} from "../models/Notification";
import {FilterMapper} from "../mappers/filter";
import {UserMapper} from "../mappers/user";
import {HealthElement, MaintenanceTask, Patient as PatientDto, Service, sleep, User as UserDto} from "@icure/api";
import {PatientMapper} from "../mappers/patient";
import {DataSampleMapper} from "../mappers/serviceDataSample";
import {HealthcareElement} from "../models/HealthcareElement";
import {HealthcareElementMapper} from "../mappers/healthcareElement";
import {NotificationMapper} from "../mappers/notification";

export const MAX_REQUEST_N = 2147483647;

export function subscribeToEntityEvents(basePath: string, username: string, password: string, entityClass: 'Patient',
                                        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<Patient> | undefined,
                                        eventFired: (entity: Patient) => Promise<void>,
                                        options: { keepAlive?: number, lifetime?: number, connectionMaxRetry?: number, connectionRetryIntervalMs?: number },
                                        decryptor: (encrypted: PatientDto) => Promise<PatientDto>): Promise<ICureRSocket<any, any>>
export function subscribeToEntityEvents(basePath: string, username: string, password: string, entityClass: 'DataSample',
                                        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<DataSample> | undefined,
                                        eventFired: (entity: DataSample) => Promise<void>,
                                        options: { keepAlive?: number, lifetime?: number, connectionMaxRetry?: number, connectionRetryIntervalMs?: number },
                                        decryptor: (encrypted: Service) => Promise<Service>): Promise<ICureRSocket<any, any>>
export function subscribeToEntityEvents(basePath: string, username: string, password: string, entityClass: 'HealthcareElement',
                                        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<HealthcareElement> | undefined,
                                        eventFired: (entity: HealthcareElement) => Promise<void>,
                                        options: { keepAlive?: number, lifetime?: number, connectionMaxRetry?: number, connectionRetryIntervalMs?: number },
                                        decryptor: (encrypted: HealthElement) => Promise<HealthElement>): Promise<ICureRSocket<any, any>>
export function subscribeToEntityEvents(basePath: string, username: string, password: string, entityClass: 'User',
                                        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<User> | undefined,
                                        eventFired: (entity: User) => Promise<void>,
                                        options: { keepAlive?: number, lifetime?: number, connectionMaxRetry?: number, connectionRetryIntervalMs?: number }): Promise<ICureRSocket<any, any>>
export function subscribeToEntityEvents(basePath: string, username: string, password: string, entityClass: 'Notification',
                                        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<Notification> | undefined,
                                        eventFired: (entity: Notification) => Promise<void>,
                                        options: { keepAlive?: number, lifetime?: number, connectionMaxRetry?: number, connectionRetryIntervalMs?: number },
                                        decryptor: (encrypted: MaintenanceTask) => Promise<MaintenanceTask>): Promise<ICureRSocket<any, any>>
export function subscribeToEntityEvents<O extends Patient | DataSample | User | HealthcareElement | Notification, T extends PatientDto | Service | HealthElement | MaintenanceTask>(
  basePath: string, username: string, password: string, entityClass: 'Patient' | 'DataSample' | 'User' | 'HealthcareElement' | 'Notification',
  eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<O> | undefined, eventFired: (entity: O) => Promise<void>,
  options: { keepAlive?: number, lifetime?: number, connectionMaxRetry?: number, connectionRetryIntervalMs?: number } = {},
  decryptor?: (encrypted: T) => Promise<T>): Promise<ICureRSocket<any, any>> {

  const auth = encodeSimpleAuthMetadata(username, password)
  const setup = {
    keepAlive: 1000000,
    lifetime: 100000,
    dataMimeType: APPLICATION_JSON.string,
    metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
    ...options
  };
  const transportWsUrl = `${basePath.startsWith('https:')?'wss':'ws'}://${basePath.replace(/https?:\/\/([^\/]+)(\/rest\/v[123])?\/?/,'$1')}/rsocket`;

  const clientFactory = () => new RSocketClient({
    serializers: {
      data: {
        deserialize: JsonSerializer.deserialize,
        serialize: (x) => Buffer.from(JSON.stringify(x))
      },
      metadata: IdentitySerializer,
    },
    setup,
    transport: new RSocketWebSocketClient({
      url: transportWsUrl,
      debug: true,
      wsCreator: (url) => {
        return new WebSocket(url) as any;
      },
    }, BufferEncoders)
  });

  const requestStreamFlowable = <O>(socket: ICureRSocket<unknown, string | Buffer | Uint8Array>, eventTypes: ("CREATE" | "UPDATE" | "DELETE")[], entityClass: "Patient" | "DataSample" | "User" | "HealthcareElement" | "Notification", filter: Filter<O> | undefined, auth: Buffer) => {
    return new Flowable((subscriber) => {
      socket.requestStream({
        data: {
          eventTypes,
          entityClass: (
            entityClass === 'User' ? 'org.taktik.icure.entities.User' :
              entityClass === 'Patient' ? 'org.taktik.icure.entities.Patient' :
                entityClass === 'DataSample' ? 'org.taktik.icure.entities.embed.Service' :
                  entityClass === 'HealthcareElement' ? 'org.taktik.icure.entities.HealthElement' :
                    entityClass === 'Notification' ? 'org.taktik.icure.entities.MaintenanceTask' : undefined
            ),
            filter: filter ? {
              filter: (
                entityClass === 'User' ? FilterMapper.toAbstractFilterDto<User>(filter, 'User') :
                  entityClass === 'Patient' ? FilterMapper.toAbstractFilterDto<Patient>(filter, 'Patient') :
                    entityClass === 'DataSample' ? FilterMapper.toAbstractFilterDto<DataSample>(filter, 'DataSample') :
                      entityClass === 'HealthcareElement' ? FilterMapper.toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement') :
                        entityClass === 'Notification' ? FilterMapper.toAbstractFilterDto<Notification>(filter, 'Notification') : undefined
              )
            } : undefined
          },
          metadata: encodeCompositeMetadata([
            [MESSAGE_RSOCKET_ROUTING, encodeRoute('v2.notification.subscribe')],
            [MESSAGE_RSOCKET_AUTHENTICATION, auth]
          ])
        }
      ).subscribe(subscriber)
    });
  };

  return new Promise(async (resolve, reject) => {
    const socket = new ICureRSocket(clientFactory, reject);
    await socket.connect(options.connectionMaxRetry, options.connectionRetryIntervalMs)

    console.log('websocket connection established.');

    const request = requestStreamFlowable(socket, eventTypes, entityClass, filter, auth);

    request
      .lift(actual => new ResubscribeOperator(request, actual))
      .subscribe({
        onSubscribe: (sub) => sub.request(MAX_REQUEST_N),
        onComplete: () => console.log(`Request-Stream Completed`),
        onNext: (payload: any) => {
          try {
            if (entityClass === 'User') {
              eventFired(UserMapper.toUser(payload.data as UserDto)! as O).catch(e => console.error(e))
            }
            if (entityClass === 'Patient') {
              decryptor!(payload.data as PatientDto as T).then(p => eventFired(PatientMapper.toPatient(p)! as O)).catch(e => console.error(e))
            }
            if (entityClass === 'DataSample') {
              decryptor!(payload.data as Service as T).then(s => eventFired(DataSampleMapper.toDataSample(s as Service)! as O)).catch(e => console.error(e))
            }
            if (entityClass === 'HealthcareElement') {
              decryptor!(payload.data as HealthElement as T).then(he => eventFired(HealthcareElementMapper.toHealthcareElement(he as HealthElement)! as O)).catch(e => console.error(e))
            }
            if (entityClass === 'Notification') {
              decryptor!(payload.data as MaintenanceTask as T).then(mt => eventFired(NotificationMapper.toNotification(mt as MaintenanceTask)! as O)).catch(e => console.error(e))
            }
          } catch (e) {
            console.error(e)
          }
        },
        onError: error => {
          console.log(`Request-Stream Error ${error}`)
        }
      })

    resolve(socket)
  })
}


class ResubscribeOperator<T> implements ISubscriber<T>, ISubscription {
  source: Flowable<T>;
  actual: ISubscriber<T>;

  done: boolean | undefined;
  once: boolean | undefined;

  upstream: ISubscription | undefined;

  requested: number;

  constructor(source: Flowable<T>, actual: ISubscriber<T>) {
    this.source = source;
    this.actual = actual;
    this.requested = 0;
    this.done = undefined;
    this.once = undefined;
  }

  onSubscribe(subscription: ISubscription) {
    if (this.done) {
      subscription.cancel();
      return;
    }

    this.upstream = subscription;

    if (!this.once) {
      this.once = true;
      this.actual.onSubscribe(this);
      return;
    }

    subscription.request(this.requested);
  }

  onComplete() {
    if (this.done) {
      return;
    }

    this.done = true;
    this.actual.onComplete();
  }

  onError(error: Error) {
    if (this.done) {
      return;
    }

    this.upstream = undefined;
    setTimeout(() => this.source.subscribe(this));
  }

  onNext(value: T) {
    if (this.done) {
      return;
    }

    this.requested--;
    this.actual.onNext(value);
  }

  cancel() {
    if (this.done) {
      return;
    }

    this.done = true;

    if (this.upstream) {
      this.upstream.cancel();
      this.upstream = undefined;
    }
  }

  request(n: number) {
    this.requested += n;
    if (this.upstream) {
      this.upstream.request(n);
    }
  }
}


export class ICureRSocket<D, M> implements ReactiveSocket<D, M> {
  _socket: ReactiveSocket<D, M> | undefined;
  _socketStatus: string | undefined;
  _socketStatusCallbacks: Array<(cs: ConnectionStatus) => void>
  _closed: boolean;

  _clientFactory: () => RSocketClient<D, M>;
  _reject: (reason?: any) => void

  constructor(clientFactory: () => RSocketClient<D, M>,
              reject: (reason?: any) => void = () => {}) {
    this._clientFactory = clientFactory;
    this._reject = reject;
    this._socketStatus = undefined
    this._socketStatusCallbacks = []
    this._closed = false
  }

  async connect(maxRetry: number = 5, retryIntervalMs: number = 10000) {
    await this.reconnectWithRetry(maxRetry, retryIntervalMs)
  }

  private async reconnectWithRetry(maxRetry: number = 5, retryIntervalMs: number = 10000,
                                   exponentialFactor: number = 1.8) {
    this._clientFactory().connect()
      .then((socket) => {
        this._socket = socket;

        socket.connectionStatus().subscribe(async event => {
          if (event.kind == this._socketStatus) {
            return;
          }

          this._socketStatus = event.kind;
          this._socketStatusCallbacks.forEach((callback) => callback(event))

          if (event.kind !== 'CONNECTED' && !this._closed) {
            this._socket = undefined;
            await sleep(retryIntervalMs * (Math.random() + 1))
            await this.reconnectWithRetry(maxRetry - 1, retryIntervalMs * exponentialFactor, exponentialFactor);
          }
        });
    }, async (error) => {
        if (maxRetry === 1) {
          this._socket?.close()
          this._reject(error);
        } else if (!this._closed) {
          await sleep(retryIntervalMs * (Math.random() + 1))
          await this.reconnectWithRetry(maxRetry - 1, retryIntervalMs * exponentialFactor, exponentialFactor);
        }
    });
  }

  fireAndForget(payload: Payload<D, M>): void {
    if (!this._socket) {
      throw new Error('Not Connected yet. Retry later');
    }

    this._socket.fireAndForget(payload);
  }

  requestResponse(payload: Payload<D, M>): Single<Payload<D, M>> {
    if (!this._socket) {
      return Single.error(new Error('Not Connected yet. Retry later'));
    }

    return this._socket.requestResponse(payload);
  }

  requestStream(payload: Payload<D, M>): Flowable<Payload<D, M>> {
    if (!this._socket) {
      return Flowable.error(new Error('Not Connected yet. Retry later'));
    }

    return this._socket.requestStream(payload);
  }

  requestChannel(payloads: Flowable<Payload<D, M>>): Flowable<Payload<D, M>> {
    if (!this._socket) {
      return Flowable.error(new Error('Not Connected yet. Retry later'));
    }

    return this._socket.requestChannel(payloads);
  }

  metadataPush(payload: Payload<D, M>): Single<void> {
    if (!this._socket) {
      return Single.error(new Error('Not Connected yet. Retry later'));
    }

    return this._socket.metadataPush(payload);
  }

  connectionStatusWithCallback(callback: (cs: ConnectionStatus) => void) {
      this._socketStatusCallbacks.push(callback)
  }

  connectionStatus(): Flowable<ConnectionStatus> {
    if (!this._socket) {
      return Flowable.error(new Error('Not Connected yet. Retry later'));
    }

    return this._socket.connectionStatus();
  }

  availability(): number {
    return this._socket?.availability() ?? 0.0;
  }

  close() {
    this._closed = true
    this._socket?.close()
  }
}

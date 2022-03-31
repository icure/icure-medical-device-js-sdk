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
import {ReactiveSocket} from "rsocket-types/ReactiveSocketTypes";
import {Filter} from "../filter/Filter";
import {Patient} from "../models/Patient";
import {DataSample} from "../models/DataSample";
import {User} from "../models/User";
import {FilterMapper} from "../mappers/filter";
import {UserMapper} from "../mappers/user";
import {Patient as PatientDto, Service, User as UserDto} from "@icure/api";
import {PatientMapper} from "../mappers/patient";
import {DataSampleMapper} from "../mappers/serviceDataSample";


export function subscribeToEntityEvents(basePath: string, username: string, password: string, entityClass: 'Patient', eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<Patient> | undefined, eventFired: (entity: Patient) => void, decryptor: (encrypted: PatientDto) => Promise<PatientDto>): Promise<ReactiveSocket<any, any>>
export function subscribeToEntityEvents(basePath: string, username: string, password: string, entityClass: 'DataSample', eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<DataSample> | undefined, eventFired: (entity: DataSample) => void, decryptor: (encrypted: Service) => Promise<Service>): Promise<ReactiveSocket<any, any>>
export function subscribeToEntityEvents(basePath: string, username: string, password: string, entityClass: 'User', eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<User> | undefined, eventFired: (entity: User) => void): Promise<ReactiveSocket<any, any>>
export function subscribeToEntityEvents<O extends Patient | DataSample | User, T extends PatientDto | Service>(basePath: string, username: string, password: string, entityClass: 'Patient' | 'DataSample' | 'User', eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<O> | undefined, eventFired: (entity: O) => void, decryptor?: (encrypted: T) => Promise<T>): Promise<ReactiveSocket<any, any>> {
  const auth = encodeSimpleAuthMetadata(username, password)
  const setup = {
    keepAlive: 1000000,
    lifetime: 100000,
    dataMimeType: APPLICATION_JSON.string,
    metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
  };
  const transport = new RSocketWebSocketClient({
    url: `${basePath.startsWith('https:')?'wss':'ws'}://${basePath.replace(/https?:\/\/([^\/]+)(\/rest\/v[123])?\/?/,'$1')}/rsocket`,
    debug: true,
    wsCreator: (url) => {
      return new WebSocket(url) as any;
    },
  }, BufferEncoders);

  const client = new RSocketClient({
    serializers: {
      data: {
        deserialize: JsonSerializer.deserialize,
        serialize: (x) => Buffer.from(JSON.stringify(x))
      },
      metadata: IdentitySerializer,
    },
    setup,
    transport
  });

  return new Promise((resolve, reject) => {
    client.connect().then((connection) => {
      console.log('websocket connection established.');

      connection.requestStream({
        data: {
          eventTypes,
          entityClass: (
            entityClass === 'User' ? 'org.taktik.icure.entities.User' :
              entityClass === 'Patient' ? 'org.taktik.icure.entities.Patient' :
                entityClass === 'DataSample' ? 'org.taktik.icure.entities.embed.Service' : undefined
          ),
          filter: filter ? {
            filter: (
              entityClass === 'User' ? FilterMapper.toAbstractFilterDto<User>(filter, 'User') :
                entityClass === 'Patient' ? FilterMapper.toAbstractFilterDto<Patient>(filter, 'Patient') :
                  entityClass === 'DataSample' ? FilterMapper.toAbstractFilterDto<DataSample>(filter, 'DataSample') : undefined
            )
          } : undefined
        },
        metadata: encodeCompositeMetadata([
          [MESSAGE_RSOCKET_ROUTING, encodeRoute('v2.notification.subscribe')],
          [MESSAGE_RSOCKET_AUTHENTICATION, auth]
        ])
      }).subscribe((payload) => {
        if (entityClass === 'User') {
          eventFired(UserMapper.toUser(payload.data as UserDto)! as O)
        }
        if (entityClass === 'Patient') {
          decryptor!(payload.data as PatientDto as T).then(p => eventFired(PatientMapper.toPatient(p)! as O))
        }
        if (entityClass === 'DataSample') {
          decryptor!(payload.data as Service as T).then(ds => eventFired(DataSampleMapper.toDataSample(ds)! as O))
        }
      })

      resolve(connection)
    }, (error) => {
      console.error('could not connect websocket', error);
      reject(error)
    })
  })

}

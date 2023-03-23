import { ConnectionStatus, WebSocketWrapper } from '../utils/websocket'

export interface Connection {
  close(): void
  onConnected(callback: () => void): Connection
  onClosed(callback: () => void): Connection
  onError(callback: (e?: string) => void): Connection
}

export class ConnectionImpl implements Connection {
  wsw: WebSocketWrapper
  connectionStatus: ConnectionStatus

  constructor(rs: WebSocketWrapper) {
    this.wsw = rs
    this.connectionStatus = 'NOT_CONNECTED'
  }

  close() {
    this.wsw.close()
  }

  onConnected(callback: () => void): Connection {
    this.wsw?.addStatusCallback('CONNECTED', (ws: WebSocketWrapper) => {
      this.connectionStatus = 'CONNECTED'
      callback()
    })
    return this
  }

  onClosed(callback: () => void): Connection {
    this.wsw?.addStatusCallback('CLOSED', (ws: WebSocketWrapper) => {
      this.connectionStatus = 'CLOSED'
      callback()
    })
    return this
  }

  onError(callback: (e?: string) => void): Connection {
    this.wsw?.addStatusCallback('ERROR', (ws: WebSocketWrapper, e?: string) => {
      this.connectionStatus = 'ERROR'
      callback(e)
    })
    return this
  }
}

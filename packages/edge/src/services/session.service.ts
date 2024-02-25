import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';
import { AbstractService } from './abstract.service';

import type {
  ISchemaService,
  ISessionService,
  NSessionService,
  IStorageProvider,
} from '@Edge/Types';
import { container } from '@Edge/Container';

@injectable()
export class SessionService extends AbstractService implements ISessionService {
  protected _SERVICE_NAME = SessionService.name;

  constructor(
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(EdgeSymbols.StorageProvider)
    private readonly _storagePort: IStorageProvider
  ) {
    super();
  }

  protected init(): boolean {
    try {
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  protected destroy(): void {}

  private _events: NSessionService.Events = {
    handshake: async (socket, payload) => this._handshake(socket, payload),
    'handshake.error': async (socket, payload) => this._handshakeError(socket, payload),
    authenticate: async (socket, payload) => this._authenticate(socket, payload),
    'authenticate.error': async (socket, payload) => this._authenticateError(socket, payload),
    'upload:page': async (socket, payload) => this._uploadPage(socket, payload),
    'session:to:session': async (socket, payload) => this._sessionToSession(socket, payload),
    'broadcast:to:service': async (socket, payload) => this._broadcastToService(socket, payload),
  };

  public async useMediator<E extends NSessionService.ClientEvent = NSessionService.ClientEvent>(
    socket: WebSocket,
    event: E,
    payload: NSessionService.EventPayload<E>
  ): Promise<void> {
    try {
      await this._events[event](socket, payload);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async _handshake(
    socket: WebSocket,
    payload: NSessionService.HandShakePayload
  ): Promise<void> {
    try {
      const ioc = container.get<IStorageProvider>(EdgeSymbols.StorageProvider);

      if (ioc.localStorage) {
        ioc.localStorage.setItem<string>('websocket-connection-id', payload.connectionId);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async _handshakeError(
    socket: WebSocket,
    payload: NSessionService.HandshakeErrorPayload
  ): Promise<void> {
    console.log('_handshakeError', payload);
  }

  private async _authenticate(
    socket: WebSocket,
    payload: NSessionService.AuthenticatePayload
  ): Promise<void> {
    console.log('_authenticate', payload);
  }

  private async _authenticateError(
    socket: WebSocket,
    payload: NSessionService.AuthenticateErrorPayload
  ): Promise<void> {
    console.log('_authenticateError', payload);
  }

  private async _uploadPage(
    socket: WebSocket,
    payload: NSessionService.UploadPagePayload
  ): Promise<void> {
    console.log('_uploadPage', payload);
  }

  private async _sessionToSession(
    socket: WebSocket,
    payload: NSessionService.SessionToSessionPayload
  ): Promise<void> {
    console.log('_sessionToSession', payload);
  }

  private async _broadcastToService(socket: WebSocket, payload: any): Promise<void> {
    console.log('_broadcastToService', payload);
  }

  private _send<E extends NSessionService.ServerEvent>(
    socket: WebSocket,
    event: E,
    payload: any
  ): void {
    socket.send(JSON.stringify({ event, payload }));
  }
}

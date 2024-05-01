import { injectable, inject } from '~package';
import { container } from '~container';
import { CoreSymbols } from '~symbols';
import { AbstractService } from './abstract.service';

import type { ISessionService, NSessionService, IStorageProvider, IWsAdapter } from '~types';

@injectable()
export class SessionService extends AbstractService implements ISessionService {
  protected _SERVICE_NAME = SessionService.name;

  constructor(
    @inject(CoreSymbols.WsAdapter)
    private readonly _wsAdapter: IWsAdapter
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

  protected destroy(): void {
    console.log('');
  }

  private async _handshake(
    socket: WebSocket,
    payload: NSessionService.HandShakePayload
  ): Promise<void> {
    try {
      const ioc = container.get<IStorageProvider>(CoreSymbols.StorageProvider);

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

  public async sessionToSession<
    P = never,
    S extends string = string,
    D extends string = string,
    E extends string = string,
  >(service: S, domain: D, event: E, sessionId: string, payload?: P): Promise<void> {
    this._send(this._wsAdapter.socket, 'session:to:session', {
      service,
      domain,
      event,
      data: {
        sessionId,
        payload,
      },
    });
  }

  public async sessionToSessionError<
    P = never,
    S extends string = string,
    D extends string = string,
    E extends string = string,
  >(service: S, domain: D, event: E, sessionId: string, payload?: P): Promise<void> {
    this._send(this._wsAdapter.socket, 'session:to:session.error', {
      service,
      domain,
      event,
      data: {
        sessionId,
        payload,
      },
    });
  }

  private async _broadcastToService(socket: WebSocket, payload: any): Promise<void> {
    console.log('_broadcastToService', payload);
  }

  private _send<E extends NSessionService.ClientEvent>(
    socket: WebSocket,
    event: E,
    payload: any
  ): void {
    socket.send(JSON.stringify({ event, payload }));
  }
}

import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { AbstractService } from './abstract.service';
import { Guards } from '@Edge/Utils';

import type { ISchemaService, ISessionService, NSessionService, IStoragePort } from '@Edge/Types';
import { SessionStorageKeys } from '@Edge/Common';

@injectable()
export class SessionService extends AbstractService implements ISessionService {
  protected _SERVICE_NAME = SessionService.name;
  private _SOCKET: WebSocket | undefined;

  constructor(
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(EdgeSymbols.StoragePort)
    private readonly _storagePort: IStoragePort
  ) {
    super();
  }

  private get _socket(): WebSocket {
    if (!this._SOCKET) {
      throw new Error('Websocket connection not initialize.');
    }

    return this._SOCKET;
  }

  public get one() {
    return true;
  }
  protected init(): boolean {
    this._SOCKET = new WebSocket('ws://localhost:11043');

    this._SOCKET.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (Guards.isEventStructure(payload)) {
          this._eventMediator[payload.event](payload.payload);
        } else {
          // TODO: set error
        }
      } catch (e) {
        console.log(e);
      }
    };

    return true;
  }

  protected destroy(): void {
    this._socket.close();
    this._SOCKET = undefined;
  }

  private _eventMediator: NSessionService.EventHandlers = {
    'server:handshake': (payload) => {
      this._listenServerHandshake(payload);
    },
  };

  private _listenServerHandshake = (payload: NSessionService.ServerHandshakePayload) => {
    if (typeof window !== 'undefined') {
      this._storagePort.sessionStorage.setItem(
        SessionStorageKeys.SERVER_HANDSHAKE_PAYLOAD,
        payload
      );
    }
  };
}

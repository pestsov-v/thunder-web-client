import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { SessionStorageKeys } from '@Edge/Common';
import { AbstractService } from './abstract.service';
import { Guards } from '@Edge/Utils';

import type {
  ISchemaService,
  ISessionService,
  NSessionService,
  IStorageProvider,
  IDiscoveryService,
} from '@Edge/Types';

@injectable()
export class SessionService extends AbstractService implements ISessionService {
  protected _SERVICE_NAME = SessionService.name;
  private _SOCKET: WebSocket | undefined;
  private _CONFIG: NSessionService.Config | undefined;

  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(EdgeSymbols.StorageProvider)
    private readonly _storagePort: IStorageProvider
  ) {
    super();
  }

  private _setConfig(): void {
    this._CONFIG = {
      protocol: this._discoveryService.getString('services.sessions.protocol', 'ws'),
      host: this._discoveryService.getString('services.sessions.host', 'localhost'),
      port: this._discoveryService.getNumber('services.sessions.port', 11073),
    };
  }

  private get _config(): NSessionService.Config {
    if (!this._CONFIG) {
      throw new Error('Configuration not set.');
    }

    return this._CONFIG;
  }

  private get _socket(): WebSocket {
    if (!this._SOCKET) {
      throw new Error('Websocket connection not initialize.');
    }

    return this._SOCKET;
  }

  protected init(): boolean {
    this._setConfig();

    const { protocol, host, port } = this._config;
    this._SOCKET = new WebSocket(`${protocol}://${host}:${port}`);

    this._SOCKET.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (Guards.isEventStructure(payload)) {
          this._eventMediator[payload.event](payload.payload);
        } else {
          // TODO: set error
        }
      } catch (e) {
        console.error(e);
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

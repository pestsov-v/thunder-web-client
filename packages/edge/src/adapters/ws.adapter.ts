import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';
import {
  IDiscoveryService,
  ISessionService,
  IStorageProvider,
  IWsAdapter,
  type NSessionService,
  NWsAdapter,
} from '@Edge/Types';
import { ErrorCode, LocalStorageKeys } from '../common';
import { Guards } from '../utils';
import { container } from '@Edge/Container';

@injectable()
export class WsAdapter implements IWsAdapter {
  private _SOCKET: WebSocket | undefined;
  private _CONFIG: NWsAdapter.Config | undefined;

  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(EdgeSymbols.SessionService)
    private readonly _sessionService: ISessionService
  ) {}

  private _setConfig() {
    this._CONFIG = {
      enable: this._discoveryService.getBoolean('adapters.ws.enable', false),
      connect: {
        protocol: this._discoveryService.getString('adapters.ws.connect.protocol', 'ws'),
        host: this._discoveryService.getString('adapters.ws.connect.host', '0.0.0.0'),
        port: this._discoveryService.getNumber('adapters.ws.connect.port', 15015),
      },
    };
  }

  private get _config() {
    if (!this._CONFIG) {
      throw new Error('Config not initialize.');
    }

    return this._CONFIG;
  }

  private get _socket() {
    if (!this._SOCKET) {
      throw new Error(`Websocket connection is undefined.`);
    }

    return this._SOCKET;
  }

  public init(): boolean {
    this._setConfig();

    if (!this._config.enable) return false;

    const { protocol, port, host } = this._config.connect;

    if (protocol !== 'ws' && protocol !== 'wss') {
      throw new Error(`Websocket protocol must be "ws" or "wss" but define - "${protocol}"`);
    }

    try {
      this._SOCKET = new WebSocket(`${protocol}://${host}:${port}`);
      this._SOCKET.addEventListener('message', async (event) => this._listenMessage(event));

      if (window) {
        window.addEventListener('beforeunload', () => this._listenBeforeUnload());
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public destroy(): void {
    this._CONFIG = undefined;

    if (this._SOCKET) {
      this._SOCKET.close();
      this._SOCKET = undefined;
    }
  }

  private async _listenMessage(event: MessageEvent): Promise<void> {
    let data: object | null;
    try {
      data = JSON.parse(event.data);
    } catch {
      data = null;
    }

    if (!data) {
      this._send('handshake.error', {
        code: ErrorCode.handshake.INVALID_STRINGIFY_OBJECT,
        message: 'WebSocket data must me stringify object',
      });

      return;
    }

    if (Guards.isEventStructure(data)) {
      if (Guards.isCorrectEvent(data.event)) {
        try {
          await this._sessionService.useMediator(this._socket, data.event, data.payload);
        } catch (e) {
          console.error(e);
          throw e;
        }
      }
    }
  }

  private _listenBeforeUnload(): void {
    const { localStorage } = container.get<IStorageProvider>(EdgeSymbols.StorageProvider);

    const connectionId = localStorage.getString('websocket-connection-id', '');
    if (connectionId && connectionId.length > 0) {
      this._send('upload:page', { connectionId });
      localStorage.removeItem('websocket-connection-id');
    }
  }

  private _send<E extends NSessionService.ClientEvent>(
    event: E,
    payload: NSessionService.EventPayload<E>
  ): void {
    this._socket.send(JSON.stringify({ event, payload }));
  }
}

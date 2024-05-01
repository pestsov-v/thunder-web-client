import { injectable, inject } from '~package';
import { container } from '~container';
import { CoreSymbols } from '~symbols';
import type {
  IDiscoveryService,
  IFunctionalityAgent,
  ISchemaAgent,
  ISchemaService,
  IStorageProvider,
  IWsAdapter,
  NSchemaService,
  NSessionService,
  NWsAdapter,
} from '~types';
import { ErrorCode } from '../common';
import { Guards } from '../utils';

@injectable()
export class WsAdapter implements IWsAdapter {
  private _SOCKET: WebSocket | undefined;
  private _CONFIG: NWsAdapter.Config | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.SchemaService)
    private readonly _schemaService: ISchemaService
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

  public get socket() {
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
      if (Guards.isCorrectEvent(data.type)) {
        const sStorage = this._schemaService.services.get(data.service);
        if (!sStorage) {
          this._send('session:to:session.error', {
            type: 'EXCEPTION',
            code: ErrorCode.type.UNKNOWN_SERVICE,
            message: `Service "${data.service}" not found.`,
          });
          return;
        }

        const dStorage = sStorage.get(data.domain);
        if (!dStorage) {
          this._send('session:to:session.error', {
            type: 'EXCEPTION',
            code: ErrorCode.type.UNKNOWN_DOMAIN,
            message: `Domain "${data.domain}" not found in service "${data.service}".`,
          });
          return;
        }

        const eStorage = dStorage.events.get(data.event);
        if (!eStorage) {
          this._send('session:to:session.error', {
            type: 'EXCEPTION',
            code: ErrorCode.type.UNKNOWN_EVENT,
            message: `Event "${data.event}" not found in domain "${data.domain}" in service "${data.service}".`,
          });
          return;
        }

        if (eStorage.scope === 'private:user') {
          const ioc = container.get<IStorageProvider>(CoreSymbols.StorageProvider);
          const token = ioc.localStorage.getString('x-user-access-token', '');
          if (token && token.length > 0) {
            return;
          }
        }

        const agents: NSchemaService.Agents = {
          fnAgent: container.get<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent),
          schemaAgent: container.get<ISchemaAgent>(CoreSymbols.SchemaAgent),
        };

        try {
          switch (eStorage.event) {
            case 'session:to:session':
              if (Guards.isSessionToSessionEvent(data.payload)) {
                await eStorage.handler(agents, {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  data: data.payload,
                  sessionId: data.payload.sessionId,
                });
              } else {
                this._send('session:to:session.error', {
                  type: 'ERROR',
                  code: ErrorCode.session.toSession.INVALID_EVENT_STRUCTURE,
                  message:
                    'Payload structure for session:to:session event type is invalid. SessionId is required. ',
                });
              }
              break;
            case 'session:to:session.error':
              break;
            case 'broadcast:to:service':
              break;
            case 'broadcast:to:service.error':
              break;
            default:
            // Helpers.switchCaseChecker(eStorage.type);
          }
        } catch (e) {
          console.error(e);
          throw e;
        }
      }
    }
  }

  private _listenBeforeUnload(): void {
    const { localStorage } = container.get<IStorageProvider>(CoreSymbols.StorageProvider);

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
    this.socket.send(JSON.stringify({ event, payload }));
  }
}

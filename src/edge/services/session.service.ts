import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { AbstractService } from './abstract.service';

import type { ISchemaService, ISessionService } from '@Edge/Types';

@injectable()
export class SessionService extends AbstractService implements ISessionService {
  protected _SERVICE_NAME = SessionService.name;
  private _SOCKET: WebSocket | undefined;

  constructor(
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService
  ) {
    super();
  }

  protected init(): boolean {
    this._SOCKET = new WebSocket('ws://localhost:11043');

    this._SOCKET.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        console.log(payload);
        // this._eventMediator(payload);
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

  private get _socket(): WebSocket {
    if (!this._SOCKET) {
      throw new Error('Websocket connection not initialize.');
    }

    return this._SOCKET;
  }
}

export interface IWsAdapter {
  socket: WebSocket;

  init(): boolean;
  destroy(): void;
}

export namespace NWsAdapter {
  export type Config = {
    enable: boolean;
    connect: {
      protocol: string;
      host: string;
      port: number;
    };
  };
}

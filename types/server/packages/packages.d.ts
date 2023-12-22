import express from 'express';
import config from 'config';
import { NextServer as LibNextServer } from 'next/dist/server/next';

export namespace Express {
  export type ServerInstance = express.Express;
  export type Request = express.Request;
  export type Response = express.Response;
}

export namespace Config {
  export type IConfig = config.IConfig;
}

export namespace Next {
  export type NextServer = LibNextServer;
}

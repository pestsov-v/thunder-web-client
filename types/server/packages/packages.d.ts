import express from 'express';
import config from 'config';
import c from 'config';

export namespace Express {
  export type Request = express.Request;
  export type Response = express.Response;
}

export namespace Config {
  export type IConfig = config.IConfig;
}

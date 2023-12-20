export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE' | 'HEAD';
export type EnvironmentKind = 'edge' | 'server' | 'all';

export type StringObject = Record<string, string>;
export type UnknownObject = Record<string, unknown>;

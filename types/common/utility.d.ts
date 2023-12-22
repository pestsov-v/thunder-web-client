export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE' | 'HEAD';
export type EnvironmentKind = 'edge' | 'server' | 'all';
export type StrSym = string | symbol;

export type StringObject = Record<string, string>;
export type NestedObject = Record<string, NestedObject | string>;
export type UnknownObject = Record<string, unknown>;
export type AnyObject = Record<string, any>;
export type Nullable<T> = T | null;

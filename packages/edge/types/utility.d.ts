export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE' | 'HEAD';
export type EnvironmentKind = 'edge' | 'server' | 'all';
export type StrSym = string | symbol;
export type ExtendedRecordObject = Record<string, ExtendedObject | string>;

export type StringObject = Record<string, string>;
export type NestedObject = Record<string, NestedObject | string>;
export type UnknownObject = Record<string, unknown>;
export type AnyObject = Record<string, any>;
export type Nullable<T> = T | null;

export type AnyFnWithArgs = (...args: any[]) => void;
export type AnyFnWithoutArgs = (...args: any[]) => void;
export type AnyFunction = AnyFnWithArgs | AnyFnWithoutArgs;

export type KeyConfigLiteralBuilder<T, F extends string | boolean | number> = T extends Record<
  string,
  unknown
>
  ? {
      [K in keyof T]: T[K] extends F
        ? `${string & K}`
        : K extends string
          ? `${string & K}.${KeyConfigLiteralBuilder<T[K], F>}`
          : never;
    }[keyof T]
  : string;

export type KeyStringLiteralBuilder<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: T[K] extends Record<string, unknown>
        ? `${string & K}.${KeyStringLiteralBuilder<T[K]>}`
        : `${string & K}`;
    }[keyof T]
  : string;

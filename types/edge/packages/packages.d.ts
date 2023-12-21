import axios from 'axios';

export namespace Axios {
  export type AxiosRequestConfig<DATA = any> = axios.AxiosRequestConfig<DATA>;
  export type AxiosInstance = axios.AxiosInstance;
  export type AxiosError = axios.AxiosError;
  export type AxiosResponse<T> = axios.AxiosResponse<T>;
}

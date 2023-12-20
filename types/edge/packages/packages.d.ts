import axios from 'axios';

export namespace Axios {
  export type AxiosRequestConfig<DATA = any> = axios.AxiosRequestConfig<DATA>;
  export type AxiosInstance = axios.AxiosInstance;
}


import { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import _axios from 'axios'

export interface IResponse<T>{
  value: T
  errors: string[]
  success: boolean
}


const onRequest = (config: InternalAxiosRequestConfig<any>) => {
  const apikey = localStorage.getItem("ApiKey");
  if (apikey) {
    config.headers.Authorization = `Bearer ${apikey}`
  }
  return config;
}

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest);
  return axiosInstance;
}

const axiosInstance = _axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface AxiosInstanceSetup {
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

export const axios = setupInterceptorsTo(axiosInstance)
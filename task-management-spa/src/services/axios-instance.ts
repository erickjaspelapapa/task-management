import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from "axios";
  
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const onRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    // console.info(`[request] [${JSON.stringify(config)}]`);
  
    return config;
  };
  
  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };
  
  const onResponse = (response: AxiosResponse): AxiosResponse => {
    // console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
  };
  
  const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[response error] [${JSON.stringify(error.response?.data)}]`);
    return Promise.reject(error.response?.data);
  };
  
  export function setupInterceptorsTo(
    axiosInstance: AxiosInstance
  ): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
  }
  
  export default setupInterceptorsTo(instance);
  
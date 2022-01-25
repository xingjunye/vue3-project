import axios, { AxiosRequestConfig, Method, CancelTokenStatic, AxiosInstance, AxiosResponse, AxiosError } from "axios"

import { ElNotification } from 'element-plus'
import { errorCodes, PendingType } from "./module";
import { cookie } from "@/utils/Application"

/** 取消重复请求 */
const pending: Array<PendingType> = [];
const CancelToken: CancelTokenStatic = axios.CancelToken;

/** 移除重复请求 */
const removePending: Function = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];

    if (
        list.url === config.url &&
        list.method === config.method &&
        JSON.stringify(list.params) === JSON.stringify(config.params) &&
        JSON.stringify(list.data) === JSON.stringify(config.data)
      ) {
        list.cancel("操作太频繁，请稍后在再试");
        pending.slice(item, 1);
      }
  }
}

/** 实例化请求配置 */

const instance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  responseType: 'json'
});

/**
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token
 * @param status  
 * @param other
 */

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config);
    const token = cookie.get("accessToken");


    
    const headers: any = {
      "Authorization": `Basic ${token}`
    }

    if(config.method === 'post') {
      headers["Content-type"] = "application/json; charset=UTF-8"
    }

    config.headers = {...headers, ...(config.headers)};

    console.log("config:", config);
    config.cancelToken = new CancelToken( (c: Function) => {
      pending.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c 
      });
    });
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
);

/** 添加响应拦截 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    removePending(response.config);
    return response;
  },
  (error: AxiosError) => {
    errorHandle(error.response?.status as number, error.response?.statusText);
  }
);

// 错误处理
const errorHandle = (status: number, other?: string) => {
  if(Object.keys(errorCodes).includes(status.toString())) {
    ElNotification({
      type: "error",
      duration: 0,
      title: status?.toString(),
      message: errorCodes[status]
    });
  } else {
    ElNotification({
      type: "error",
      title: status?.toString(),
      message: "服务器请求出错!"
    });
  }
}

export default instance;
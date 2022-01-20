import axios, { AxiosRequestConfig, Method, CancelTokenStatic, AxiosInstance, AxiosResponse, AxiosError } from "axios"
import { ElNotification, ElLoading } from 'element-plus'

/** 定义接口 */
interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: Function
}

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
    errorHandle(parseInt(error.code as string));
  }
);

const errorHandle: Function = (status: number, other: string) => {
  switch (status) {

    case 302:
      ElNotification.error("接口重定向了！");
      break

    case 400:
      ElNotification.error("发出的请求有错误！");
      break

    case 401:
      ElNotification.error("请求有误！");
      break

    case 403:
      ElNotification.error("请求有误！");
      break

    case 404:
      ElNotification.error("网络请求不存在！");
      break

    case 406:
      ElNotification.error("网络请求不存在！");
      break

    case 410:
      ElNotification.error("网络请求不存在！");
      break

    case 422:
      ElNotification.error("网络请求不存在！");
      break

    case 500:
      ElNotification.error("服务器发生错误！");
      break

    case 502:
      ElNotification.error("网关错误！");
      break

    case 503:
      ElNotification.error("服务器不可用！");
      break

    case 504:
      ElNotification.error("请求超时！");
      break

    case 504:
      ElNotification.error("请求超时！");
      break
    default: 
      ElNotification.error("其他错误！");
  }
}

export default instance;
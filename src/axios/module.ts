import { Method } from "axios"

/** 错误码json */
export const errorCodes: Record<number, string> = {
  302: "接口重定向了!",
  400: "参数错误",
  401: "用户认证不通过!",
  403: "用户无权访问此页面!",
  404: "请求的路径不存在!",
  406: "此服务禁止访问!",
  410: "请求的资源不存在",
  500: "服务器内部错误，无法完成请求!",
  502: "网关错误，服务器无响应",
  503: "由于超载或系统维护，服务器暂时的无法处理客户端的请求。",
  504: "网关或代理的服务器，未及时从远端服务器获取请求",
  505: "服务器不支持HTTP协议，无法完成处理"
}

/** 定义接口 */
export interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: Function
}

/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-22 14:06:01
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-22 14:26:58
 */
/** 默认的请求错误code */
export const DEFAULT_REQUEST_ERROR_CODE = "DEFAULT";

/** 默认的请求错误文本 */
export const DEFAULT_REQUEST_ERROR_MSG = "请求错误~";
export const ERROR_MAP = {
  400: "非法参数~",
  401: "用户未授权~",
  403: "服务器拒绝访问~",
  404: "请求的资源不存在~",
  405: "请求方法未允许~",
  408: "网络请求超时~",
  500: "服务器内部错误~",
  501: "系统异常~",
  502: "错误网关~",
  503: "服务不可用~",
  504: "网关超时~",
  505: "http版本不支持该请求~",
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG,
};

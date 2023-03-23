/*
 * @Description: 请求实例 统一出口
 * @Author: ZHang jia hui
 * @Date: 2023-03-20 13:15:07
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 13:13:14
 */
//创建实例导出
import HttpRequest from "./request/index";
import { BASE_URL, TIME_OUT } from "./request/config";
import type { AxiosRequestConfig } from "axios";
//
/**
 * 定义一个 实例，可以自定义 实例的拦截器
 * 目的：有时候，项目会有多个后台服务地址 或者说 对于不同的请求有不同的拦截器
 *      此时，就可以通过创建多个实例，去解决
 */
const httpRequest = new HttpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

// 实例二
export const commonRequest = new HttpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //自定义 实例的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      console.log("实例请求成功");
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log("请求失败拦截", err);
      return err;
    },
    responseInterceptor: (res) => {
      console.log("实例响应成功拦截");
      return res;
    },
    responseInterceptorCatch: (error) => {
      console.log("响应失败拦截", error);
      return error;
    },
  },
});

// 请求
//指定返回的类型为Promise，不然在使用接口的时候报错： 类型“AxiosResponse<any, any>”上不存在属性“user”
function request(config: AxiosRequestConfig): Promise<any> {
  return httpRequest.instance.request(config);
}
export default request;

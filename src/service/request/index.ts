/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-20 13:38:26
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 14:43:39
 */
//封装axios实例
import axios, { AxiosRequestConfig } from "axios";
import type { AxiosInstance } from "axios";
import { ElLoading, ElMessage } from "element-plus";
import type { HttpRequestInterceptor, HttpRequestConfig } from "./type";
import {
  ERROR_MAP,
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
} from "./error";
import { getToken } from "@/utils/auth";
import store from "@/store/index";
type ErrorStatus = keyof typeof ERROR_MAP;

// // 定义一个 拦截器接口
// interface HttpRequestInterceptor{
//     requestInterceptor:(config:InternalAxiosRequestConfig)=>InternalAxiosRequestConfig,
//     requestInterceptorCatch:(error:any)=>any,
//     responseInterceptor:(res:AxiosResponse)=>AxiosResponse,
//     responseInterceptorCatch:(error:any)=>any,
// }
// //定义一个 接口类型，包含AxiosRequestConfig + 其他属性
// 扩展 axios，目的是能够使用户 传进来定义的拦截器
// interface HttpRequestConfig extends AxiosRequestConfig{
//    interceptors:HttpRequestInterceptor
// }

class HttpRequest {
  instance: AxiosInstance;
  interceptors?: HttpRequestInterceptor;
  loadingInstance: any;
  loadingCount: number;
  // loading开启
  showLoading() {
    if (this.loadingInstance == null) {
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: "rgba(0,0,0,.3)",
        fullscreen: true,
        text: "正在加载...",
      });
    }
    this.loadingCount++;
  }
  // loading 隐藏
  hideLoading() {
    this.loadingCount--;
    this.loadingCount = Math.max(this.loadingCount, 0); //保证loading次数》=0
    if (this.loadingCount == 0) {
      this.loadingInstance.close();
      this.loadingInstance = null;
    }
  }

  constructor(config: HttpRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.loadingCount = 0;
    //axios实例 拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 拦截器
    this.setInterceptor();
  }
  setInterceptor() {
    this.setRequestInterceptor();
    this.setResponseInterceptor();
  }

  setRequestInterceptor() {
    // 添加公有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //loading 开始
        this.showLoading();
        console.log("store");
        // console.log("公有的请求拦截器", config);
        config.headers.Authorization = getToken() || store.state.user.token;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  setResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => {
        // console.log("响应拦截器--响应结果", response);
        // 合并loading请求效果 避免重复请求
        setTimeout(() => {
          this.hideLoading();
        }, 100);
        const res = response.data;
        const { code } = response.data;
        if (code == 200) {
          return res.data;
        } else {
          const errorCode: ErrorStatus = code as ErrorStatus;
          const error_msg = ERROR_MAP[errorCode] || DEFAULT_REQUEST_ERROR_MSG;
          console.log("errorCode", errorCode, "error_msg", error_msg);
          ElMessage.error(error_msg);
          return Promise.reject(error_msg);
        }
      },
      (error) => {
        setTimeout(() => {
          this.hideLoading();
        }, 100);
        const errorCode: ErrorStatus = error.status as ErrorStatus;
        const error_msg = ERROR_MAP[errorCode] || DEFAULT_REQUEST_ERROR_MSG;
        console.log("响应错误", error_msg);
        ElMessage.error(error_msg);
        return Promise.reject(error_msg);
      }
    );
  }
  // // 请求
  // //指定返回的类型为Promise，不然在使用接口的时候报错： 类型“AxiosResponse<any, any>”上不存在属性“user”
  // async request(config: AxiosRequestConfig): Promise<any> {
  //   return await this.instance.request(config);
  // }
}
export default HttpRequest;

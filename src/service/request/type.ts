/*
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-20 14:50:47
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-22 13:58:22
 */
import type {InternalAxiosRequestConfig,AxiosResponse,AxiosRequestConfig} from 'axios'
// 定义一个 拦截器接口 
 interface HttpRequestInterceptor{
    requestInterceptor?:(config:InternalAxiosRequestConfig)=>InternalAxiosRequestConfig,
    requestInterceptorCatch?:(error:any)=>any,
    responseInterceptor?:(res:AxiosResponse)=>AxiosResponse,
    responseInterceptorCatch?:(error:any)=>any,
}
//定义一个 数据类型，包含AxiosRequestConfig + 其他属性
// 扩展 axios，目的是能够使用户 传进来自定义的拦截器
 interface HttpRequestConfig extends AxiosRequestConfig{
   interceptors?:HttpRequestInterceptor
}
export type {HttpRequestInterceptor,HttpRequestConfig}
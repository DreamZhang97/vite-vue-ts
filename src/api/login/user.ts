/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-22 16:43:04
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 13:13:32
 */
import request from "../../service";
import type { ILogin, IGetUserInfo } from "./types";

enum loginAPIl {
  loginURL = "/bpm/org/login_new/valid",
  userInfoUrl = "/bpm/org/user_new/userMsg",
}

// 登录
export function login(params: ILogin) {
  return request({
    url: loginAPIl.loginURL,
    method: "get",
    params,
  });
}
//获取用户信息
export function getUserInfo() {
  console.log("VITE_SYSTEM", import.meta.env.VITE_SYSTEM);
  return request({
    url: loginAPIl.userInfoUrl,
    method: "post",
    data: { system: import.meta.env.VITE_SYSTEM },
  });
}

// export function getList() {
//   return httpRequest.request({
//     url: "/agro-brain-cms/api/sysDictionary/list",
//     method: "get",
//     params: { type: "service_income_type" },
//   });
// }

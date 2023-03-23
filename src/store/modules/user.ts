/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 11:15:24
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 14:13:43
 */
import type { ILogin } from "@/api/login/types";
import { login, getUserInfo } from "@/api/login/user";
import type { IUSerStore } from "@/types/global";
import { setToken } from "@/utils/auth";
const defaultState = (): IUSerStore => {
  return {
    token: "",
    name: "",
    account: "",
    userId: "",
    userInfo: {},
  };
};
const state = defaultState();
const mutations = {
  RESET_STATE: (state: object) => {
    Object.assign(state, defaultState());
  },
  SET_TOKEN: (state: IUSerStore, token: string) => {
    setToken(token)
    state.token = token;
  },
  SET_NAME: (state: IUSerStore, name: string) => {
    state.name = name;
  },
  SET_USERINFO: (state: IUSerStore, userInfo: object) => {
    state.userInfo = userInfo;
  },
  SET_USER_ID: (state: IUSerStore, id: string) => {
    state.userId = id;
  },
};
const getters = {};
const actions = {
  login({ commit }, userInfo: ILogin) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await login(userInfo);
        commit("SET_TOKEN", token);
        //获取用户信息
        const userData = await getUserInfo();
        console.log("用户信息", userData);
        const { fullname, userId } = userData.user;
        commit("SET_NAME", fullname);
        commit("SET_USER_ID", userId);
        commit("SET_USERINFO", userData);
        resolve("登录成功");
      } catch (error) {
        reject();
      }
    });
  },
};
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

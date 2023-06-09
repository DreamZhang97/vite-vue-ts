/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-20 11:09:06
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 14:40:05
 */
import { createStore } from "vuex";
import user from "./modules/user";
import app from './modules/app'
const store = createStore({
  modules: {
    user,
    app
  },
});
export default store;

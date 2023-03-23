/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-09 09:52:16
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 17:09:41
 */
import { createApp } from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router/routes";
import "@/router/index";
import store from "./store";
// 按需加载elementPlus 导致 loading样式 message样式 不生效，因此需要手动导入
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
const app = createApp(App);

app.config.globalProperties.$title = "VITE项目";
app.use(router);
app.use(store);
app.mount("#app");

// 打印环境变量
// console.log("import.env", import.meta.env.VITE_BASE_URL);
// console.log("import.env.title", import.meta.env.VITE_APP_TITLE);

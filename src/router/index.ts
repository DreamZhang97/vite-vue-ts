/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 09:44:37
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 14:44:44
 */
import router from "./routes";
import { getToken } from "@/utils/auth";
const whiteList: string[] = ["/login"];
router.beforeEach((to, from, next) => {
  const TITLE = import.meta.env.VITE_APP_TITLE;
  document.title = `${TITLE}-${to.meta.title}`;
  if (getToken()) {
    next();
  } else {
    if (to.path != "/login") {
      next({ path: "/login", query: { redirect: encodeURI(to.fullPath) } });
    }
    //白名单
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    }
  }
});

router.afterEach(() => {
  // console.log("路由进入");
});

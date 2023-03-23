/*
 * @Description: 路由配置
 * @Author: ZHang jia hui
 * @Date: 2023-03-09 09:54:40
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 17:02:17
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/home",
    name: "home",
    component: Layout,
    redirect: "/home/item",
    meta: {
      title: "主页",
    },
    children: [
      {
        path: "item",
        name: "item",
        component: () => import("@/views/home.vue"),
        meta: { title: "总览", icon: "el-icon-data-analysis" },
      },
    ],
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("../views/manage/index.vue"),
    meta: {
      title: "管理页",
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
export default router;

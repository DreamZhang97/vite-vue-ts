/*
 * @Description: 路由配置
 * @Author: ZHang jia hui
 * @Date: 2023-03-09 09:54:40
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-24 18:20:50
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/manage",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: Layout,
    redirect: "/main/home",
    meta: { title: "菜单一" },
    children: [
      {
        path: "/main/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "首页", icon: "HomeFilled", affix: true },
      },
      {
        path: "/main/setting",
        name: "setting",
        component: () => import("@/views/table/index.vue"),
        meta: { title: "表格", icon: "Tools" },
      },
      {
        path: "/main/menu",
        name: "menu",
        meta: { title: "菜单", icon: "Menu" },
        redirect: "/main/menu/menu1",
        // component: { render: (c: any) => c("router-view") },
        children: [
          {
            path: "/main/menu/menu1",
            name: "menu1",
            meta: { title: "菜单1", icon: "el-icon-data-analysis" },
            // component: { render: (c: any) => c("router-view") },
            children: [
              {
                path: "/main/menu/menu1-1",
                component: () => import("@/views/manage/manage-item/index.vue"),
                name: "menu1-1",
                meta: { title: "菜单1-1", icon: "el-icon-data-analysis" },
              },
              {
                path: "/main/menu/menu1-2",
                name: "menu1-2",
                component: () => import("@/views/manage/manage-item/index.vue"),
                meta: { title: "菜单1-2", icon: "el-icon-data-analysis" },
              },
            ],
          },
        ],
      },
      {
        path: "/main/star",
        name: "star",
        component: () => import("@/views/star/index.vue"),
        meta: { title: "图表", icon: "Histogram" },
      },
    ],
  },
  {
    path: "/manage",
    name: "manage",
    component: Layout,
    meta: { title: "管理页" },
    redirect: "/manage/manage-item",
    children: [
      {
        path: "/manage/manage-item",
        name: "manage-item",
        component: () => import("../views/manage/index.vue"),
        meta: { title: "管理页" },
      },
    ],
  },
  {
    path: "/m",
    name: "m",
    component: Layout,
    meta: { title: "管理页12" },
    redirect: "/m/manage-item2",
    children: [
      {
        path: "/m/manage-item2",
        name: "manage-item2",
        component: () => import("../views/manage/index.vue"),
        meta: { title: "管理页12", icon: "el-icon-data-analysis" },
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;

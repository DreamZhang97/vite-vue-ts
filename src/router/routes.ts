/*
 * @Description: 路由配置
 * @Author: ZHang jia hui
 * @Date: 2023-03-09 09:54:40
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 17:02:17
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: '/main',
    component: () => import('@/layout/index.vue'),
    redirect: '/main/home',
    meta: {
      title: "菜单一",
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'HomeFilled', affix: true }
      },
      {
        path: 'setting',
        component: () => import('@/views/home/index.vue'),
        name: 'setting',
        meta: { title: '设置', icon: 'Tools' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/manage/index.vue'),
        meta: { title: '菜单', icon: 'Menu', },
        redirect: '/menu/menu1',
        children: [
          {
            path: 'menu1',
            name: 'Menu1',
            component: () => import('@/views/manage/manage-item/index.vue'),
            meta: { title: '菜单1', roles: ['admin', 'editor'] },
            redirect: '/menu1/menu1-2',
            children: [
              {
                path: 'menu1-1',
                component: () => import('@/views/manage/manage-item/index.vue'),
                name: 'Menu1-1',
                meta: { title: '菜单1-1', roles: ['admin'] }
              },
              {
                path: 'menu1-2',
                component: () => import('@/views/manage/manage-item/index.vue'),
                name: 'Menu1-2',
                meta: { title: '菜单1-2', roles: ['admin', 'editor'] }
              }
            ]
          },
        ]
      },
      {
        path: '/star',
        component: () => import('@/views/star/index.vue'),
        name: 'Star',
        meta: { title: '图表', icon: 'Histogram' }
      },
    ]
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import('@/layout/index.vue'),
    meta: {
      title: "管理页",
    },
    children: [
      {
        path: "/manage-item",
        name: "manage-item",
        component: () => import("../views/manage/index.vue"),
        meta: {
          title: "管理页",
        },
      }
    ]
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;

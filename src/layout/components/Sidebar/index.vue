<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-24 09:36:22
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-24 17:02:40
-->
<template>
  <div class="sidebar-container">
    <div class="logo" @click="$router.push('/')">
      <img class="logo-img" :src="logoUrl" alt="logo" />
      <transition name="fade-transform" mode="out-in">
        <h1 v-show="opened" class="logo-text">
          {{ getCurrentInstance()?.appContext.config.globalProperties.$title }}
        </h1>
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        class="v-enter-to"
        :default-active="$route.path"
        name="$route.path"
        :collapse="isCollapse"
        :show-timeout="200"
        text-color="#fff"
        background-color="#4a5a74"
        active-text-color="#409EFF"
      >
        <SidebarItem
          v-for="item in constRouterList"
          :key="item.path"
          :nav="item"
          :basePath="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  ref,
  computed,
  onMounted,
  readonly,
  getCurrentInstance,
} from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";
import store from "@/store";
import logoUrl from "@/assets/images/logo.png";
import SidebarItem from "./SidebarItem.vue";
// import { routes } from '@/router/routes'

const constRouterList = computed(() => useRouter().options.routes);

console.log("constRouterList", constRouterList);
const opened = computed(() => store.state.app.sidebar.opened);
const isCollapse = computed(() => !opened.value);
</script>

<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  background-color: #2b2f3a;

  .logo-img {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    display: inline-block;
    height: 50px;
    margin-left: 12px;
    font-size: 14px;
    line-height: 50px;
    color: #fff;
  }
}
</style>

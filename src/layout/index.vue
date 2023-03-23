<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 15:02:49
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 17:38:42
-->
<template>
  <div class="app-wrapper">
    <div v-if="sidebar.opened" class="topTitle">{{ getCurrentInstance()?.appContext.config.globalProperties.$title }}
    </div>
    <div v-else class="topTitle_active">{{ getCurrentInstance()?.appContext.config.globalProperties.$title[0] }}</div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Navbar, Sidebar, AppMain } from "./components/";
import { computed, ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const sidebar = ref({
  opened: true
})
// const sidebar = computed(() => store.state.app.sidebar);
const fixedHeader = ref(true)
</script>

<style lang="scss" scoped>
@import "./styles/sider.scss";
// @import "~@/styles/variables.scss";

.app-wrapper {
  // @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #304156;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .topTitle {
    position: absolute;
    left: 0;
    width: 227px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #304156;
    color: #ffffff;
  }

  .topTitle_active {
    position: absolute;
    left: 0;
    width: 54px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #304156;
    color: #ffffff;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
